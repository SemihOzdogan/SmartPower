import React, { Component } from 'react';
import { View, TouchableOpacity, SafeAreaView, FlatList, Text, RefreshControl } from 'react-native';
import { Container, Root, Spinner, Icon } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { GetDeviceAuth, PostDeviceAuth } from '../../../../backend/TumcihazController/GetCihazAuthorization';
import * as Animatable from 'react-native-animatable';

class CihazNoAuthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSourceNoAuth: [],
            dataLoading: true,
            UserID: "",
            refresing: false
        };
    };

    UNSAFE_componentWillMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({ dataLoading: true })
            this.PageDidFocus()
        });
    }

    PageDidFocus = async () => {
        await GetDeviceAuth(this, this.props.deviceNo);
    }

    refreshDataNoAuth = async () => {
        this.setState({ dataLoading: true })
        await GetDeviceAuth(this, this.props.deviceNo);
        this.setState({ dataLoading: false })

    }

    render() {
        return (
            <Root>
                <Container>
                    <View style={{ flex: 1 }} >
                        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
                            {this.state.dataLoading &&
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                                    <Spinner color='#aaa' style={{ width: "100%" }} />
                                </View>
                            }
                            {!this.state.dataLoading &&
                                <SafeAreaView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 10 }}>
                                    {this.state.dataSourceNoAuth == "" &&
                                        < View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                            <Text style={{ fontSize: 20, fontFamily: 'Poppins-Light', textAlign: 'center', color: '#111' }}>Yetkisiz kullanıcı bulunmamaktadır</Text>
                                        </View>
                                    }
                                    {this.state.dataSourceNoAuth != "" &&
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            data={this.state.dataSourceNoAuth}
                                            keyExtractor={(index, id) => id.toString()}
                                            refreshControl={
                                                <RefreshControl refreshing={this.state.refresing} onRefresh={() => this.refreshDataNoAuth()} />
                                            }
                                            renderItem={({ item }) =>
                                                <Animatable.View animation="fadeInDown" iterationCount={1} direction="alternate">
                                                    <View style={{ flex: 1 }}>
                                                        <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} colors={['#ADE5FE', '#FFFFFF']} style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 5, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 5, borderRadius: 4 }}>
                                                            <View style={{ borderLeftWidth: 5, borderColor: '#80d8ff', flexDirection: 'row', marginTop: 5 }}>
                                                                <View style={{ flex: 1, backgroundColor: 'white', borderColor: '#80d8ff', height: 50, justifyContent: 'center' }}>
                                                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', color: "#111", paddingLeft: 3, paddingRight: 3 }}>{item.user_str}</Text>
                                                                </View>
                                                                <View style={{ width: 50, height: 50, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <TouchableOpacity onPress={() => { PostDeviceAuth(item.user_id, this.props.deviceNo, this.props.modemNo); this.refreshDataNoAuth() }}>
                                                                        <Icon type="FontAwesome5" name="user-plus" style={{ fontSize: 27, color: '#82ED71' }} />
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        </LinearGradient>
                                                    </View>
                                                </Animatable.View>
                                            }
                                        >
                                        </FlatList>
                                    }

                                </SafeAreaView>
                            }
                        </View>
                    </View>

                </Container>
            </Root>
        );
    }
}

export default CihazNoAuthScreen;

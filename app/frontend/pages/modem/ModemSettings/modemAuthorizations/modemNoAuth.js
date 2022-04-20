import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, SafeAreaView, FlatList, Text, TextInput, RefreshControl } from 'react-native';
import { Container, Root, Spinner, Icon, } from 'native-base';
import { GetComdeviceAuth, PostComdeviceAuth, } from '../../../../../backend/modemController/GetModemAuth';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';

class ModemNoAuthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSourceNoAuth: [],
            dataLoading: true,
            preferences: false,
            UserID: "",
            refresing: false
        };
    }
    UNSAFE_componentWillMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({ dataLoading: true })
            this.PageDidFocus()
        });
    }

    preferences(visible) {
        this.setState({ preferences: visible });
    }

    PageDidFocus = async () => {
        await GetComdeviceAuth(this, this.props.modemNo);
    }


    refreshDataNoAuth = () => {
        this.setState({ dataLoading: true })
        GetComdeviceAuth(this, this.props.modemNo);
    }

    _renderItemDataNoAuth = ({ item }) => (
        <Animatable.View animation="fadeInDown" iterationCount={1} direction="alternate">
            <View style={{ flex: 1}}>
                <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} colors={['#ADE5FE', '#FFFFFF']} style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 5, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 5, borderRadius: 4 }}>
                    <View style={{ borderLeftWidth: 5, borderColor: '#80d8ff', flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, backgroundColor: 'white', borderColor: '#80d8ff', height: 50, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', color: "#111", paddingLeft: 3, paddingRight: 3 }}>{item.user_str}</Text>
                        </View>
                        <View style={{ width: 50, height: 50, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { PostComdeviceAuth(item.user_id, this.props.modemNo); this.refreshDataNoAuth() }}>
                                <Icon type="FontAwesome5" name="user-plus" style={{ fontSize: 27, color: '#82ED71' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </Animatable.View>
    )
    render() {
        return (
            <Root>
                <Container >
                    <Modal
                        isVisible={this.state.preferences}
                        onSwipeComplete={() => this.setState({ preferences: false })}
                        backdropOpacity={0.4}
                        animationIn="zoomInDown"
                        animationOut="zoomOutUp"
                        animationInTiming={600}
                        animationOutTiming={600}
                        backdropTransitionInTiming={600}
                        backdropTransitionOutTiming={600}
                        swipeDirection={['up', 'left', 'right', 'down']}>
                        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0)", justifyContent: "center", alignItems: "center" }}>
                            <View style={{ width: "100%", height: 120, backgroundColor: "white", padding: 15 }}>
                                <View style={{ width: 30, height: 30, position: 'absolute', right: 0, }}>
                                    <TouchableOpacity style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.preferences(false)}>
                                        <Icon type="FontAwesome5" name="times" style={{ color: 'gray' }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                                    <View style={{ width: '100%', height: 50, backgroundColor: 'white', borderRadius: 16, alignItems: 'center', }}>
                                        <View style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', }}>
                                            <View style={{ flex: 1, borderWidth: 1.5, borderColor: '#FFEABD', borderRadius: 10, flexDirection: 'row' }}>
                                                <View style={{ flex: 3 }}>
                                                    <TextInput
                                                        underlineColorAndroid="transparent"
                                                        placeholder="Kullanıcı ID Giriniz"
                                                        style={{ alignItems: 'center', justifyContent: 'center', color: '#DA7C62', padding: 10 }}
                                                        placeholderTextColor="#DA7C62"
                                                        fontSize={18}
                                                        maxLength={14}
                                                        value={this.state.UserID}
                                                        onChangeText={(value) => this.setState({ UserID: value })}
                                                        autoCapitalize='characters'
                                                    >
                                                    </TextInput>
                                                </View>
                                                <TouchableOpacity onPress={() => { PostComdeviceAuth(this, this.props.modemNo); this.preferences(!this.state.preferences) }}
                                                    style={{ flex: 1, backgroundColor: '#FFEABD', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 8.5, borderBottomLeftRadius: 8.5 }}>
                                                    <Icon type="FontAwesome5" name="plus-square" style={{ color: '#DA7C62', fontSize: 30 }}></Icon>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <View style={{ flex: 1, }} >
                        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
                            {this.state.dataLoading &&
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                                    <Spinner color='#aaa' style={{ width: "100%" }} />
                                </View>
                            }

                            {!this.state.dataLoading &&
                                <SafeAreaView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: '#f5f5f5', paddingVertical: 10, paddingHorizontal: 10 }}>
                                    {this.state.dataSourceNoAuth == "" &&
                                        < View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                            <Text style={{ fontSize: 16, borderRadius: 6,padding:10, backgroundColor: '#FCF8E3', fontFamily: 'Poppins-Light', textAlign: 'center', color: '#8a6d3b' }}>Yetkisiz kullanıcı bulunmamaktadır</Text>
                                        </View>
                                    }
                                    {this.state.dataSourceNoAuth != "" &&
                                        <FlatList
                                            data={this.state.dataSourceNoAuth}
                                            keyExtractor={(index, id) => id.toString()}
                                            refreshControl={<RefreshControl refreshing={this.state.refresing} onRefresh={() => this.refreshDataAuth()} />}
                                            renderItem={this._renderItemDataNoAuth}
                                            showsVerticalScrollIndicator={false}
                                        >
                                        </FlatList>
                                    }
                                </SafeAreaView>
                            }
                        </View>
                    </View>
                </Container>
            </Root >
        );
    }
}

export default ModemNoAuthScreen;

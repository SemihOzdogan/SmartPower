import React, { Component } from "react";
import { Image, FlatList, RefreshControl, TouchableOpacity, SafeAreaView } from "react-native";
import { Text, View, Col, Grid, Row, ListItem, Button, Spinner, Icon, Badge, } from "native-base";
import { GetComdevice } from '../../../backend/modemController/GetModemList';
import ModemToolBar from '../../components/CustomToolBar/CustomToolBar';

class ModemListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            ModemSayisi: '',
            startHere: 0,
            stopHere: 10,
            btnLoadMore: "flex",
            loading: false,
            dataLoading: true,
            refresing: false,
            type: '',
            location: '',
            measuringID: "",
            filter_active: false
        };
        this.onEndReachedCalledDuringMomentum = true;
    }

    UNSAFE_componentWillMount() {
        GetComdevice(this, 0, this.state.stopHere, 0);
    }

    refreshData() {
        this.setState({
            dataLoading: true,
            dataSource: [],
            stopHere: 10,
            startHere: 0
        })
        GetComdevice(this, 0, this.state.stopHere, 0);
    }

    loadMore = () => {

        if ((this.state.dataSource.length > 4) && (this.state.ModemSayisi != this.state.dataSource.length))
            if (!this.state.loading) {
                const varStartHere = (this.state.startHere + 10)
                const varStopHere = this.state.stopHere
                this.setState({
                    loading: true,
                    stopHere: varStopHere,
                    startHere: varStartHere
                })
                GetComdevice(this, varStartHere, varStopHere, 0);
            }
    }


    loadMoreSpinner = () => {
        if (this.state.dataSource.length != this.state.ModemSayisi) {
            return (
                <View style={{ flex: 1, paddingBottom: 20 }}>
                    <Button transparent block style={{ width: "100%", padding: 20, textAlign: "center", marginTop: 20, display: (this.state.btnLoadMore) }}>
                        <Spinner color='#aaa' style={{ width: "100%" }} />
                    </Button>
                </View>
            )
        }
        else {
            return (
                <View style={{ flex: 1, paddingBottom: 20 }}>
                    <Text style={{ width: "100%", padding: 20, textAlign: "center", marginTop: 20, fontFamily: 'Poppins-Light', color: '#999' }}>Daha fazla modeminiz bulunmamaktadır</Text>
                </View>
            )
        }
    }

    _renderItem = ({ item }) => (
        <ListItem style={{
            backgroundColor: "white", marginRight: 10, marginLeft: 10, marginBottom: 5, marginTop: 5, borderRadius: 6, borderBottomColor: "#ddd", borderBottomWidth: 20
        }}>
            <Grid>
                <Row>
                    <Col style={{ width: 80 }}>
                        <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                            <Image source={item.imageURL} style={{ width: 80, height: 80 }}></Image>
                            <View style={{ position: 'absolute', bottom: -8 }}>
                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.navigate('ModemSettings', {
                                    modemNo: item.comm_device_id,
                                    url: '/commDeviceAlarmRuleList'
                                })}>
                                    <Icon type="FontAwesome5" name="cog" style={{ fontSize: 18, color: '#ccc' }} />
                                    <Text style={{ color: '#ccc', fontSize: 14 }}>Ayarlar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ backgroundColor: "#80d8ff", width: 20, height: 20, position: "absolute", top: -10, left: 3, justifyContent: 'center', alignItems: 'center', borderRadius: 20 / 2 }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>{item.temp_id}</Text>
                        </View>
                    </Col>

                    <Col>
                        <Row style={{ padding: 5, left: 5 }}>
                            <Col style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                <Icon type="FontAwesome5" name="map-marker-alt" style={{ color: '#DA7C62', fontSize: 20 }} />
                                <Text style={{ fontSize: 14, color: "#666", fontFamily: 'Poppins-Regular', textAlign: "center", fontWeight: '500' }} numberOfLines={1}> {item.location_name}</Text>
                            </Col>
                        </Row>

                        <Row style={{ borderTopColor: '#ddd', borderTopWidth: 1, }}>
                            <Col style={{ borderRightColor: '#ddd', borderRightWidth: 1, marginTop: 5 }}>
                                <Text style={{ fontSize: 12, textAlign: "left", fontFamily: 'Poppins-Light' }}>Modem ID</Text>
                                <Row style={{ justifyContent: 'center' }}><Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: "#999" }}>{item.comm_device_id}</Text></Row>
                            </Col>
                            <Col style={{ marginTop: 5 }}>
                                <Text style={{ fontSize: 12, textAlign: "left", fontFamily: 'Poppins-Light' }}>Tip</Text>
                                <Row style={{ justifyContent: 'center' }}><Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: "#999" }}>{item.communication_type}</Text></Row>
                            </Col>
                        </Row>

                        <Row style={{ marginTop: 5, borderWidth: 0.5, borderColor: '#ddd', borderBottomRightRadius: 6, borderBottomLeftRadius: 6 }}>
                            <Col>
                                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}>Son Bağlantı <Text style={{ fontSize: 14, color: "#999", fontFamily: 'Poppins-Light' }}>{item.last_packet_time}</Text> </Text>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Grid>
        </ListItem>
    )

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>

                {this.state.dataLoading &&
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                        <Spinner color='#aaa' style={{ width: "100%" }} />
                    </View>
                }
                {!this.state.dataLoading &&
                    <View style={{ flex: 1 }}>

                        <ModemToolBar
                            ListCount={this.state.ModemSayisi}
                            onPressFilter={() => this.props.navigation.navigate('Filter', {
                                redirectPage: 'Modems',
                                modemListObj: this,
                                key: Math.random().toString()
                            })}
                            onPressRefresh={() => { this.refreshData(); this.setState({ dataLoading: true }) }}
                            FilterActive={this.state.filter_active}
                        />

                        <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>

                            <FlatList
                                data={this.state.dataSource}
                                keyExtractor={(index, id) => id.toString()}
                                refreshControl={<RefreshControl refreshing={this.state.refresing} onRefresh={() => this.refreshData()} />}
                                renderItem={this._renderItem}
                                onEndReached={() => this.loadMore()}
                                ListFooterComponent={() => this.loadMoreSpinner()}
                                onEndReachedThreshold={0.5}
                                showsVerticalScrollIndicator={false}
                            >
                            </FlatList>

                        </SafeAreaView >
                    </View>
                }
            </View>
        );
    }

}

export default ModemListScreen;

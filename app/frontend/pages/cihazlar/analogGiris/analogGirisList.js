import React, { Component } from "react";
import { FlatList, RefreshControl, SafeAreaView, TouchableOpacity } from "react-native";
import { Text, View, Col, Grid, Row, Spinner, Container, Button, Icon } from "native-base";
import { GetAnalogGiris, GetAnalogData } from '../../../../backend/analogGirisController/GetAnalogGirisList';
import AnalogGirisToolBar from '../../../components/CustomToolBar/CustomToolBar';
import Modal from 'react-native-modal';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);
var pay, auth, getdata, role;
class AnalogGirisListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            analogData: [],
            AnalogGirisSayisi: '',
            startHere: 0,
            stopHere: 10,
            btnLoadMore: "flex",
            loading: false,
            dataLoading: true,
            refresing: false,
            device_id: "",
            location: "",
            measuringID: "",
            filter_active: false,
            count: 0,
            preferences: false,
            currentDataItem: {},
            loading: false
        };
        (async () => {
            await AsyncStorage.getItem("RoleStatus").then((keyValue) => {
                role = keyValue
            }, (error) => {
                console.log(error)
            });
        })()
        this.onEndReachedCalledDuringMomentum = true;
    }
    UNSAFE_componentWillMount() {
        GetAnalogGiris(this, 0, this.state.stopHere, 0);
    }
    preferences(visible) {
        this.setState({ preferences: visible });
    }
    refreshData() {
        this.setState({
            dataLoading: true,
            dataSource: [],
            stopHere: 10,
            startHere: 0
        })
        GetAnalogGiris(this, 0, this.state.stopHere, 0);
    }
    loadMore = () => {
        if ((this.state.dataSource.length > 4) && (this.state.AnalogGirisSayisi != this.state.dataSource.length))
            if (!this.state.loading) {
                const varStartHere = (this.state.startHere + 10)
                const varStopHere = this.state.stopHere

                this.setState({
                    loading: true,
                    stopHere: varStopHere,
                    startHere: varStartHere
                })
                GetAnalogGiris(this, varStartHere, varStopHere, 0);
            }
    }
    loadMoreSpinner = () => {
        if (this.state.dataSource.length != this.state.AnalogGirisSayisi) {
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
                    <Text style={{ width: "100%", padding: 20, textAlign: "center", marginTop: 20, fontFamily: 'Poppins-Light', color: '#999' }}>Daha fazla analog giriş bulunmamaktadır</Text>
                </View>
            )
        }
    }
    statusChange = (data) => {
        if (role == "admin") {
            if (data == "close") {
                pay = false
                auth = true
                getdata = true
            } else {
                pay = false
                auth = true
                getdata = true
            }
        } else {
            if (data != "close") {
                pay = false
                auth = true
                getdata = true
            } else {
                pay = true
                auth = false
                getdata = false
            }
        }
    }
    _renderItem = ({ item }) => {
        this.statusChange(item.payment_state)
        return (
            <View style={{ backgroundColor: 'white', marginRight: 10, marginLeft: 10, marginBottom: 5, marginTop: 5, borderRadius: 6, }}>
                <Grid>
                    <Col>
                        <Row>
                            <View style={{ position: 'absolute', left: 2, top: 2, backgroundColor: "#80d8ff", width: 20, height: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 20 / 2 }}>
                                <Text style={{ color: 'white', fontSize: 10 }}>{item.temp_id}</Text>
                            </View>
                            <Col style={{ padding: 10 }}>
                                <Row style={{ marginTop: 10, padding: 2, left: 5, }}>
                                    <Col style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                        <Icon type="FontAwesome5" name="map-marker-alt" style={{ color: '#DA7C62', fontSize: 20 }} />
                                        <Text style={{ fontSize: 14, color: "#666", fontFamily: 'Poppins-Regular', textAlign: "center", fontWeight: '500' }} numberOfLines={1}> {item.measuring_location_name}</Text>
                                    </Col>
                                </Row>
                                <Row style={{ borderTopColor: '#ddd', borderTopWidth: 1, }}>
                                    <Col style={{ borderRightColor: '#ddd', borderRightWidth: 1, marginTop: 5, }}>
                                        <Text style={{ fontSize: 12, textAlign: "center", fontFamily: 'Poppins-Light' }}>Modem No</Text>
                                        <Row style={{ justifyContent: 'center' }}><Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', color: "#ccc", fontWeight: '500' }}>{item.comm_device_id}</Text></Row>
                                    </Col>
                                    <Col style={{ marginTop: 5 }}>
                                        <Text style={{ fontSize: 12, textAlign: "center", fontFamily: 'Poppins-Light' }}>Cihaz No</Text>
                                        <Row style={{ justifyContent: 'center' }}><Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', color: "#ccc", fontWeight: '500' }}>{item.measuring_device_id}</Text></Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row style={{ backgroundColor: '#ddd', borderBottomLeftRadius: 6, borderBottomRightRadius: 6, padding: 3 }}>
                            <Col style={{ alignItems: 'flex-start', marginLeft: 5 }}>
                                {
                                    pay == true &&
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon type="FontAwesome5" name="exclamation-circle" style={{ fontSize: 14, color: 'red', }} />
                                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', textAlign: 'center' }}> Ödemesi yapılmamış cihaz</Text>
                                    </View>
                                }
                                {
                                    auth == true &&
                                    <View style={{ flex: 1, }}>
                                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('AnalogGirisSettings', {
                                            analogGirisNo: item.measuring_device_id,
                                            url: '/deviceAlarmRuleList'
                                        })}>
                                            < Icon type="FontAwesome5" name="cog" style={{ fontSize: 18, color: '#80d8ff' }} />
                                            <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}> Ayarlar</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </Col>
                            <Col style={{ alignItems: 'flex-end', marginRight: 5 }}>
                                {
                                    getdata == true &&
                                    <View style={{ flex: 1, }}>
                                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }} onPress={() => this.getAnalogData(item.measuring_device_id, item.device_type)}>
                                            < Icon type="FontAwesome5" name="chart-line" style={{ fontSize: 18, color: '#ADDA5E' }} />
                                            <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}> Veri Getir</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Grid>
            </View>
        )
    }
    _renderItemAnalogData = (item) => {
        return (
            <View style={{ flex: 1 }}>
                {
                    this.state.loading == true ?
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Spinner color='#aaa' style={{ width: "100%" }} />
                        </View > :
                        <View style={{ flex: 1, }}>
                            <View style={{ width: '100%', height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ccc', }}>
                                <Text style={{ fontSize: 16, fontFamily: 'Poppins-Light', marginTop: 3 }}>Veri Durumu</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', }}>
                                <View style={{ marginHorizontal: 10 }}>
                                    {
                                        item.channel_name.map((data) => {
                                            return (
                                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: 12, color: "#555", fontFamily: 'Poppins-Regular' }}>{data}</Text>
                                                </View>

                                            )
                                        })
                                    }
                                </View>
                                <View style={{ marginHorizontal: 10 }}>
                                    {
                                        Object.keys(item.last_value).map((data) => {
                                            return (
                                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: 12, color: "#555", fontFamily: 'Poppins-Regular' }}>{item.last_value[data]}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                <View style={{ marginHorizontal: 10 }}>
                                    {
                                        item.unit.map((data) => {
                                            return (
                                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: 12, color: "#555", fontFamily: 'Poppins-Regular', }}>{data}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                            <View style={{ width: '100%', height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ccc', }}>
                                <Text style={{ fontSize: 13, fontFamily: 'Poppins-Light', }}>Son Veri Zamanı <Text style={{ fontSize: 14, color: "#73A715", fontFamily: 'Poppins-Light' }}>{moment(item.last_packet_time).format('L')}</Text> </Text>
                            </View>
                        </View>
                }
            </View >
        )
    }
    getAnalogData = async (ID, TYPE) => {
        this.setState({ preferences: true, loading: true })
        await GetAnalogData(this, ID, TYPE);
    }
    render() {
        return (
            <Container>
                <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
                    {this.state.dataLoading &&
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                            <Spinner color='#aaa' style={{ width: "100%" }} />
                        </View>
                    }
                    {!this.state.dataLoading &&
                        <View style={{ flex: 1 }}>
                            <Modal
                                isVisible={this.state.preferences}
                                backdropOpacity={0.4}
                                animationIn="zoomInDown"
                                animationOut="zoomOutUp"
                                animationInTiming={600}
                                animationOutTiming={600}
                                backdropTransitionInTiming={600}
                                backdropTransitionOutTiming={600}
                            >
                                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0)", justifyContent: "center", alignItems: "center" }}>
                                    <View style={{ width: "100%", height: "30%", backgroundColor: "white", padding: 5, borderRadius: 4 }}>
                                        {/* <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 20 }}>Eklenecek Alarm Tipini Seç</Text> */}
                                        <View style={{ flex: 1, }}>
                                            <Row style={{ flexDirection: 'column' }}>
                                                {
                                                    this.state.preferences == true ? this._renderItemAnalogData(this.state.analogData) : null
                                                }
                                            </Row>
                                        </View>
                                        <View style={{ width: '100%', height: 30, }}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3 }}>
                                                <TouchableOpacity onPress={() => { this.preferences(false) }} style={{ width: '50%', backgroundColor: '#ddd', height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                                                    <Text style={{ color: '#444', fontSize: 14, fontFamily: 'Poppins-Light', }}>Kapat</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            <AnalogGirisToolBar
                                ListCount={this.state.AnalogGirisSayisi}
                                onPressFilter={() => this.props.navigation.navigate('Filter', {
                                    redirectPage: 'Devices',
                                    activeTab: this.props.activeTab,
                                    analogGirisListObj: this,
                                    key: Math.random().toString()
                                })}
                                onPressRefresh={() => this.refreshData()}
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
            </Container >
        );
    }
}

export default AnalogGirisListScreen;

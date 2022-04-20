import React, { Component } from "react";
import { FlatList, RefreshControl, SafeAreaView,TouchableOpacity } from "react-native";
import { Text, View, Col, Grid, Row, ListItem, Spinner, Container, Button, Icon } from "native-base";
import { GetSayıcı } from '../../../../backend/sayıcıController/GetSayıcıList';
import SayıcıToolBar from '../../../components/CustomToolBar/CustomToolBar';


class SayıcıListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            SayıcıSayisi: '',
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
            currentDataItem: {}
        };
        this.onEndReachedCalledDuringMomentum = true;
    }

    UNSAFE_componentWillMount() {
        GetSayıcı(this, 0, this.state.stopHere, 0);
    }

    refreshData() {
        this.setState({
            dataLoading: true,
            dataSource: [],
            stopHere: 10,
            startHere: 0
        })
        GetSayıcı(this, 0, this.state.stopHere, 0);
    }

    loadMore = () => {
        if ((this.state.dataSource.length > 4) && (this.state.SayıcıSayisi != this.state.dataSource.length))
            if (!this.state.loading) {
                const varStartHere = (this.state.startHere + 10)
                const varStopHere = this.state.stopHere

                this.setState({
                    loading: true,
                    stopHere: varStopHere,
                    startHere: varStartHere
                })
                GetSayıcı(this, varStartHere, varStopHere, 0);
            }
    }

    loadMoreSpinner = () => {
        if (this.state.dataSource.length != this.state.SayıcıSayisi) {
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
                    <Text style={{ width: "100%", padding: 20, textAlign: "center", marginTop: 20, fontFamily: 'Poppins-Light', color: '#999' }}>Daha fazla sayıcınız bulunmamaktadır</Text>
                </View>
            )
        }
    }

    _renderItem = ({ item }) => (
        <ListItem style={{
            backgroundColor: "white", marginRight: 10, marginLeft: 10, marginBottom: 5, marginTop: 5, borderRadius: 16, borderBottomColor: "#ddd", borderBottomWidth: 20, paddingLeft: 15
        }}>
            <Grid>
                <Row>
                    {
                        item.payment_state != "close" &&
                        <View style={{ width: 100, height: 20, position: "absolute", bottom: -33, }}>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.navigate('SayıcıSettings', {
                                sayıcıNo: item.measuring_device_id,
                                url: '/deviceAlarmRuleList'
                            })}>
                                <Icon type="FontAwesome5" name="cog" style={{ fontSize: 16, color: '#80d8ff', top: 2 }} />
                                <Text style={{ fontSize: 14, fontFamily: 'Poppins-Light', textAlign: 'center' }}> Ayarlar</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        item.payment_state == "close" &&
                        <View style={{ width: '100%', left: 0, right: 0, position: "absolute", bottom: -33, flexDirection: 'row' }}>
                            <Icon type="FontAwesome5" name="exclamation-circle" style={{ fontSize: 14, color: 'red', }} />
                            <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', textAlign: 'center' }}> Ödemesi yapılmamış cihaz</Text>
                        </View>
                    }
                    <View style={{ backgroundColor: "#80d8ff", width: 20, height: 20, position: "absolute", top: -11, left: -13, justifyContent: 'center', alignItems: 'center', borderRadius: 20 / 2 }}>
                        <Text style={{ color: 'white', fontSize: 10 }}>{item.temp_id}</Text>
                    </View>

                    <Col>
                        <Row style={{ padding: 5 }}>
                            <Col style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                <Icon type="FontAwesome5" name="map-marker-alt" style={{ color: '#DA7C62', fontSize: 20 }} />
                                <Text style={{ fontSize: 14, color: "#999", fontFamily: 'Poppins-Light', textAlign: "center" }} numberOfLines={1}> {item.measuring_location_name}</Text>
                            </Col>
                        </Row>
                        <Row style={{ borderTopColor: '#ddd', borderTopWidth: 1, }}>
                            <Col style={{ borderRightColor: '#ddd', borderRightWidth: 1, marginTop: 5 }}>
                                <Text style={{ fontSize: 12, textAlign: "left", fontFamily: 'Poppins-Light' }}>Modem No</Text>
                                <Row style={{ justifyContent: 'center' }}><Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: "#999" }}>{item.comm_device_id}</Text></Row>
                            </Col>
                            <Col style={{ marginTop: 5 }}>
                                <Text style={{ fontSize: 12, textAlign: "left", fontFamily: 'Poppins-Light' }}>Cihaz No</Text>
                                <Row style={{ justifyContent: 'center' }}><Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: "#999" }}>{item.measuring_device_id}</Text></Row>
                            </Col>
                        </Row>
                        {
                            item.payment_state != "close" &&
                            <Row style={{ flex: 1, marginTop: 5, borderWidth: 0.5, borderColor: '#ddd', borderBottomRightRadius: 16, borderBottomLeftRadius: 16, justifyContent: 'center', }}>
                                <Col style={{ flex: 1 }}>
                                    <Text style={{ flex: 1, fontSize: 10, fontFamily: 'Poppins-Light', marginTop: 3 }}>Son Veri Zamanı <Text style={{ fontSize: 10, color: "#999", fontFamily: 'Poppins-Light' }}>{item.last_packet_time}</Text> </Text>
                                </Col>
                            </Row>
                        }
                        {
                            item.payment_state == "close" &&
                            <View style={{ width: '100%', left: 0, right: 0, position: "absolute", bottom: -33, flexDirection: 'row' }}>
                                <Icon type="FontAwesome5" name="exclamation-circle" style={{ fontSize: 14, color: 'red', }} />
                                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', textAlign: 'center' }}> Ödemesi yapılmamış cihaz</Text>
                            </View>
                        }

                    </Col>
                </Row>
            </Grid>
        </ListItem>
    )

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

                            <SayıcıToolBar
                                ListCount={this.state.SayıcıSayisi}
                                onPressFilter={() => this.props.navigation.navigate('Filter', {
                                    redirectPage: 'Devices',
                                    activeTab: this.props.activeTab,
                                    sayıcıListObj: this,
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

export default SayıcıListScreen;

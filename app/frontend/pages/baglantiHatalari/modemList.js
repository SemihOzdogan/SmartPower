import React, { Component } from "react";
import { FlatList, TouchableOpacity, RefreshControl, SafeAreaView } from "react-native";
import { Text, View, Col, Grid, Row, ListItem, Button, Spinner, Icon, Badge } from "native-base";
import { GetNoConnectionCommDevices } from '../../../backend/baglantiHatalariController/GetNoConnectionCommDevices';
import LinearGradient from 'react-native-linear-gradient';
import CheckInternet from '../../../backend/InternetController/CheckInternet';

class ModemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            bk_ModemSayisi: '',
            startHere: 0,
            stopHere: 10,
            btnLoadMore: "flex",
            loading: false,
            dataLoading: true,
            refresing: false,
        }
        this.onEndReachedCalledDuringMomentum = true;

    }

    UNSAFE_componentWillMount() {
        this.setState({ dataLoading: true })
        GetNoConnectionCommDevices(this, 0, this.state.stopHere, 0);
    }

    refreshData() {
        this.setState({
            dataLoading: true,
            dataSource: [],
            stopHere: 10,
            startHere: 0
        })
        GetNoConnectionCommDevices(this, 0, this.state.stopHere, 0);
    }

    loadMore = () => {
        if ((this.state.dataSource.length > 4) && (this.state.bk_ModemSayisi != this.state.dataSource.length))
            if (!this.state.loading) {
                const varStartHere = (this.state.startHere + 10)
                const varStopHere = this.state.stopHere

                this.setState({
                    loading: true,
                    stopHere: varStopHere,
                    startHere: varStartHere
                })
                GetNoConnectionCommDevices(this, varStartHere, varStopHere, 0);
            }
    }

    loadMoreSpinner = () => {
        if (this.state.dataSource.length != this.state.bk_ModemSayisi) {
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
                    <Text style={{ width: "100%", padding: 20, textAlign: "center", marginTop: 20, fontFamily: 'Poppins-Light', color: '#999' }}>Daha fazla hatalı modeminiz bulunmamaktadır</Text>
                </View>
            )
        }

    }

    _renderItem = ({ item }) => (
        <ListItem style={{
            backgroundColor: "white", marginRight: 10, marginLeft: 10, marginBottom: 5, marginTop: 5, borderRadius: 6, borderBottomColor: "#ddd", borderBottomWidth: 20, paddingLeft: 15
        }}>
            <Grid>
                <Row>
                    <Col>
                        <View style={{ backgroundColor: "#DA7C62", width: 20, height: 20, position: "absolute", left: -12, top: -10, justifyContent: 'center', alignItems: 'center', borderRadius: 20 / 2 }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>{item.temp_id}</Text>
                        </View>
                        <Row style={{ marginTop: 10, borderWidth: 0.5, borderColor: '#ddd', backgroundColor: '#eee', borderTopRightRadius: 6, borderTopLeftRadius: 6 }}>
                            <Col style={{ alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', textAlign: "center" }}>Modem No  <Text style={{ fontSize: 10, color: '#999' }}>{item.comm_device_id}</Text></Text>
                            </Col>
                        </Row>
                        <Row style={{ paddingVertical: 5, }}>
                            <Col style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                <Icon type="FontAwesome5" name="map-marker-alt" style={{ color: '#DA7C62', fontSize: 20 }} />
                                <Text style={{ fontSize: 14, color: "#666", fontFamily: 'Poppins-Regular', textAlign: "center", fontWeight: '500' }} numberOfLines={1}> {item.location_name}</Text>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 5, borderWidth: 0.5, borderColor: '#ddd', borderBottomRightRadius: 6, borderBottomLeftRadius: 6 }}>

                            <Col style={{ alignItems: 'center' }}>
                                <Icon type="FontAwesome5" name="clock" style={{ color: '#DA7C62', fontSize: 18 }}><Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}> Son Bağlantı <Text style={{ fontSize: 14, color: "#999", fontFamily: 'Poppins-Light' }}>{item.last_packet_time}</Text> </Text></Icon>
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
                <CheckInternet />
                {this.state.dataLoading &&
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                        <Spinner color='#aaa' style={{ width: "100%" }} />
                    </View>
                }
                {!this.state.dataLoading &&
                    <View style={{ flex: 1, backgroundColor: '#eee' }}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 2 }} colors={['white', '#BDBDD7']} style={{ width: '100%', height: 50, flexDirection: 'row' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 25 }}>
                                <Badge style={{ backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white' }}>{this.state.bk_ModemSayisi}</Text>
                                </Badge>
                            </View>

                            <View style={{ flex: 1 }}></View>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                </View>
                                <View style={{}}></View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                                    <TouchableOpacity transparent onPress={() => this.refreshData()} style={{ justifyContent: 'center', alignItems: 'center', position: "absolute", }}>
                                        <Icon type="FontAwesome5" name='sync-alt' style={{ color: "gray", fontSize: 22, padding: 8 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </LinearGradient>

                        <Text style={{ padding: 10, textAlign: 'center', fontSize: 16, fontFamily: 'Poppins-Light' }}>Aşağıda listelenmiş <Text style={{ color: 'red', fontFamily: 'Poppins-Light' }}> {this.state.bk_ModemSayisi} adet </Text><Text style={{ fontWeight: '700' }}>modemde</Text > internet veya güç bağlantısı yok</Text>

                        <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
                            <FlatList
                                data={this.state.dataSource}
                                keyExtractor={(index, id) => id.toString()}
                                refreshControl={<RefreshControl refreshing={this.state.refresing} onRefresh={() => this.refreshData()} />}
                                renderItem={this._renderItem}
                                onEndReached={() => this.loadMore()}
                                ListFooterComponent={() => this.loadMoreSpinner()}
                                showsVerticalScrollIndicator={false}
                                onEndReachedThreshold={0.5}
                            >
                            </FlatList>
                        </SafeAreaView>
                    </View>
                }
            </View >
        );
    }
}

export default ModemList;

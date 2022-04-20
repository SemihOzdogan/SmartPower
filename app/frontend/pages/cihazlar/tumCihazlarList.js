import React, { Component } from "react";
import { FlatList, RefreshControl, SafeAreaView, } from "react-native";
import { Text, View, Spinner, Button, Root } from "native-base";
import { GetDevice } from '../../../backend/TumcihazController/GetTumCihazList';
import CihazToolBar from '../../components/CustomToolBar/CustomToolBar';
import RaporModal from '../../components/RaporModal/RaporModal';
import CardList from '../../components/CardListComponent/CardList';

class TumCihazListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            CihazSayisi: '',
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
        GetDevice(this, 0, this.state.stopHere, 0);
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
        GetDevice(this, 0, this.state.stopHere, 0);
    }

    loadMore = () => {
        if ((this.state.dataSource.length > 4) && (this.state.CihazSayisi != this.state.dataSource.length))
            if (!this.state.loading) {
                const varStartHere = (this.state.startHere + 10)
                const varStopHere = this.state.stopHere

                this.setState({
                    loading: true,
                    stopHere: varStopHere,
                    startHere: varStartHere
                })
                GetDevice(this, varStartHere, varStopHere, 0);
            }
    }

    loadMoreSpinner = () => {
        if (this.state.dataSource.length != this.state.CihazSayisi) {
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
                    <Text style={{ width: "100%", padding: 20, textAlign: "center", marginTop: 20, fontFamily: 'Poppins-Light', color: '#999' }}>Daha fazla cihazınız bulunmamaktadır</Text>
                </View>
            )
        }

    }



    _renderItem = ({ item }) => (
        <CardList
            report={true}
            id={item.temp_id}
            payStatus={item.payment_state}
            location={item.measuring_location_name}
            modemID={item.comm_device_id}
            DeviceName="Cihaz"
            deviceID={item.measuring_device_id}
            lastDataTime={item.measuring_last_packet_time}
            onPressReport={() => { this.preferences(!this.state.preferences); this.setState({ currentDataItem: item }) }}
            routeTitle="Cihaz Yetkileri"
            onPressDeviceAuthOrSettings={() => this.props.navigation.navigate('CihazAuth', {
                deviceNo: item.measuring_device_id,
                modemNo: item.comm_device_id
            })}
            routeIcon="users"
        />
    )

    render() {
        return (
            <Root>
                <RaporModal
                    isVisible={this.state.preferences}
                    onSwipeComplete={() => this.setState({ preferences: false })}
                    OnClose={() => this.preferences(false)}
                    onPressReaktif={() => {
                        this.props.navigation.navigate('ReaktifRapor', {
                            measuring_device_id: this.state.currentDataItem.measuring_device_id,
                            comm_device_id: this.state.currentDataItem.comm_device_id,
                            measuring_location_name: this.state.currentDataItem.measuring_location_name,
                            key: Math.random().toString()
                        }); this.preferences(!this.state.preferences)
                    }}
                    onPressTuketim={() => {
                        this.props.navigation.navigate('TuketimRapor', {
                            measuring_device_id: this.state.currentDataItem.measuring_device_id,
                            comm_device_id: this.state.currentDataItem.comm_device_id,
                            measuring_location_name: this.state.currentDataItem.measuring_location_name,
                            key: Math.random().toString()
                        }); this.preferences(!this.state.preferences)
                    }}
                    onPressAkımGerilim={() => {
                        this.props.navigation.navigate('AkımGerilimRapor', {
                            measuring_device_id: this.state.currentDataItem.measuring_device_id,
                            comm_device_id: this.state.currentDataItem.comm_device_id,
                            measuring_location_name: this.state.currentDataItem.measuring_location_name,
                            key: Math.random().toString()
                        }); this.preferences(!this.state.preferences)
                    }}
                />
                <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
                    {this.state.dataLoading &&
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                            <Spinner color='#aaa' style={{ width: "100%" }} />
                        </View>
                    }
                    {!this.state.dataLoading &&
                        <View style={{ flex: 1 }}>

                            <CihazToolBar
                                ListCount={this.state.CihazSayisi}
                                onPressFilter={() => this.props.navigation.navigate('Filter', {
                                    redirectPage: 'Devices',
                                    activeTab: this.props.activeTab,
                                    cihazListObj: this,
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
                                    ListFooterComponent={() => this.loadMoreSpinner()}
                                    onEndReached={() => this.loadMore()}
                                    onEndReachedThreshold={0.5}
                                    showsVerticalScrollIndicator={false}
                                >
                                </FlatList>
                            </SafeAreaView >
                        </View>
                    }
                </View>
            </Root >
        );
    }

}

export default TumCihazListScreen;

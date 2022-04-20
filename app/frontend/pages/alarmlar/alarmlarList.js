import React, { Component } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Spinner, Icon, Container } from 'native-base';
import AlarmTypeContent from '../../../backend/alarmController/getAlarmTypeFunc';
import { GetAlarm } from '../../../backend/alarmController/getAlarm';
import AlarmToolBar from '../../components/CustomToolBar/CustomToolBar';

class Alarmlar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            AlarmSayisi: '',
            dataSource: [],
            startHere: 0,
            stopHere: 10,
            btnLoadMore: "flex",
            loading: false,
            dataLoading: true,
            refresing: false,
            filter_active: false,
            type: '',
            location: '',
            measuringID: "",
            filter_active: false
        };
        this.onEndReachedCalledDuringMomentum = true;
    }

    UNSAFE_componentWillMount() {
        GetAlarm(this, 0, this.state.stopHere, 0);
    }

    refreshData() {
        this.setState({
            dataLoading: true,
            dataSource: [],
            stopHere: 10,
            startHere: 0
        })
        GetAlarm(this, 0, this.state.stopHere, 0);
    }

    loadMore = () => {

        if ((this.state.dataSource.length > 4) && (this.state.AlarmSayisi != this.state.dataSource.length))
            if (!this.state.loading) {
                const varStartHere = (this.state.startHere + 10)
                const varStopHere = this.state.stopHere
                this.setState({
                    loading: true,
                    stopHere: varStopHere,
                    startHere: varStartHere
                })
                GetAlarm(this, varStartHere, varStopHere, 0);
            }
    }

    loadMoreSpinner = () => {
        if (this.state.dataSource.length != this.state.AlarmSayisi) {
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
                    <Text style={{ width: "100%", padding: 20, textAlign: "center", marginTop: 20, fontFamily: 'Poppins-Light', color: '#999' }}>Daha fazla alarmınız bulunmamaktadır</Text>
                </View>
            )
        }
    }

    _renderContent(item) {
        var MyClass = new AlarmTypeContent();
        switch (item.AlarmType) {
            case 1:
                return MyClass.Function1(item);
            case 2:
                return MyClass.Function1(item);
            case 3:
                return MyClass.Function3(item);
            case 4:
                return MyClass.Function3(item);
            // case 5:
            // case 6:
            //     return MyClass.Function5(item);
            case 7:
                return MyClass.Function7(item);
            case 8:
                return MyClass.Function7(item);
            case 9:
                return MyClass.Function9(item);
            case 10:
                return MyClass.Function10(item);
            case 11:
                return MyClass.Function11(item);
            case 12:
                return MyClass.Function12(item);
            case 13:
                return MyClass.Function13(item);
            case 14:
                return MyClass.Function14(item);
            case 15:
            case 16:
                return MyClass.Function15(item);
            case 17:
                return MyClass.Function17(item);
            case 18:
                return MyClass.Function18(item);
            case 21:
                return MyClass.Function21(item);
            case 22:
                return MyClass.Function22(item);
            case 23:
                return MyClass.Function23(item);
            case 24:
                return MyClass.Function24(item);
            case 31:
                return MyClass.Function31(item);
            case 32:
                return MyClass.Function32(item);
            case 36:
                return MyClass.Function36(item);
            case 37:
                return MyClass.Function37(item);
            case 38:
                return MyClass.Function38(item);
            case 39:
                return MyClass.Function39(item);
            case 41:
                return MyClass.Function41(item);
            case 43:
                return MyClass.Function43(item);
            case 44:
                return MyClass.Function44(item);
            default:
                return MyClass.FunctionDefault(item);
        }
    }

    reportPageRouter = async (item) => {
        var pageName;
        if (pageName == "NULL") {
            return false
        }

        else {
            pageName = this.reportPage(item)
            this.props.navigation.navigate(pageName, {
                measuring_device_id: item.DeviceId,
                comm_device_id: item.CommDeviceId,
                measuring_location_name: item.Location,
            })
        }

    }

    reportPage = (item) => {
        var pageName;
        if (item.AlarmType != 1 && item.AlarmType != 2 && item.AlarmType != 9 && item.AlarmType != 10 && item.AlarmType != 11 && item.AlarmType != 19 &&
            item.AlarmType != 20 && item.AlarmType != 30 && item.AlarmType != 31 && item.AlarmType != 32 && item.AlarmType != 36 && item.AlarmType != 37 && item.AlarmType != 43) {
            return pageName = "NULL"
        }
        else {
            switch (item.AlarmType) {
                case 1:
                case 2:
                case 36:
                case 37:
                    pageName = "ReaktifRapor";
                    break;
                case 9:
                case 10:
                case 11:
                case 19:
                case 20:
                case 30:
                case 31:
                case 32:
                    pageName = "AkımGerilimRapor";
                    break;
                case 43:
                    pageName = "TuketimRapor";
                    break;
            }
            return pageName;
        }

    }

    _renderItem = ({ item }) => (
        <View style={[styles.container, { borderColor: item.AlarmColor }]}>
            <View style={{ flex: 1, backgroundColor: '#f2f2e5', flexDirection: 'column' }}>
                <View style={{ flex: 1, height: 40, flexDirection: 'row' }}>
                    <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e0e0e0', borderRadius: 50 / 2, margin: 5 }}>
                        <Icon type="FontAwesome5" name={item.AlarmIcon} style={{ color: item.AlarmColor, fontSize: 18, }} />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}>{item.message.title}</Text>
                        <Text style={{ fontSize: 10, color: "black", fontFamily: 'Poppins-Light', marginTop: -5 }}>
                            <Icon type="FontAwesome5" name="map-marker-alt" style={{ fontSize: 15, color: 'rgba(238, 65, 53, 0.5)' }} numberOflines={1} /> {item.Location}
                        </Text>
                    </View>
                </View>
                <View style={{ width: 20, height: 20, backgroundColor: item.AlarmColor, position: 'absolute', right: 0, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: '#f2f2e5', fontSize: 9 }}>{item.temp_id}</Text>
                </View>
            </View>
            <View>
                {this._renderContent(item)}
            </View>
            <View style={{ width: '100%', height: 20, backgroundColor: '#f5f5f5', justifyContent: 'center', flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 10, color: "black", fontFamily: 'Poppins-Light' }}><Icon type="FontAwesome5" name="clock" style={{ color: "black", fontSize: 15 }} /> {item.EndDate}</Text>
                </View>
                <View style={{ backgroundColor: 'gray', width: 0.5, height: 20 }}></View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.reportPageRouter(item)}>
                        <Text style={{ fontSize: 10, color: "black", fontFamily: 'Poppins-Light' }}>
                            <Icon type="FontAwesome5" name={item.AlarmIcon} style={{ fontSize: 15, color: item.AlarmColor, }} numberOflines={1} /> {item.DeviceId}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

    render() {
        return (
            <Container>
                {this.state.dataLoading &&
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                        <Spinner color='#aaa' style={{ width: "100%" }} />
                    </View>
                }

                {!this.state.dataLoading &&

                    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>

                        <AlarmToolBar
                            ListCount={this.state.AlarmSayisi}
                            onPressFilter={() => this.props.navigation.navigate('Filter', {
                                redirectPage: 'Alarms',
                                alarmListObj: this,
                                key: Math.random().toString()
                            })}
                            onPressRefresh={() => { this.refreshData(); this.setState({ dataLoading: true }) }}
                            FilterActive={this.state.filter_active}
                        />

                        <FlatList
                            data={this.state.dataSource}
                            keyExtractor={(index, id) => id.toString()}
                            refreshControl={<RefreshControl refreshing={this.state.refresing} onRefresh={() => this.refreshData()} />}
                            renderItem={this._renderItem}
                            onEndReachedThreshold={0.5}
                            onEndReached={() => this.loadMore()}
                            ListFooterComponent={() => this.loadMoreSpinner()}
                            showsVerticalScrollIndicator={false}
                        />

                    </View>
                }

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: "white",
        borderLeftWidth: 3,
        marginVertical: 10,
        marginRight:10,
        marginLeft:10,
        flexDirection: 'column',
        shadowColor: "#444",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 5,
    },

});

export default Alarmlar;
import React, { Component } from "react";
import { FlatList, RefreshControl, SafeAreaView, TouchableOpacity, Alert, Dimensions } from "react-native";
import { Text, View, Col, Grid, Row, ListItem, Spinner, Container, Button, Icon, Root, Toast } from "native-base";
import { GetIO } from '../../../../backend/IoController/getIoList';
import AnalogGirisToolBar from '../../../components/CustomToolBar/CustomToolBar';
import { G1ModuleComponent, C1ModuleComponent, GRPModuleInputComponent, GRPModuleOutputComponent, D1ModuleComponent, DontPay } from '../../../components/IoModules/IoModuleComponent';
import moment from 'moment';
import { UpdateDesiredStatus } from '../../../../backend/IoController/getOutputSettings';
import AsyncStorage from '@react-native-community/async-storage';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

var height = Dimensions.get('window').height
var width = Dimensions.get('window').width


var pay, auth, getDataAndtime, role;
class AnalogGirisListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            OnOffArray: [],
            dataSource: [],
            IOSayisi: '',
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
            warning: false
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
        GetIO(this, 0, this.state.stopHere, 0);
    }
    refreshData() {
        this.setState({
            dataLoading: true,
            dataSource: [],
            stopHere: 10,
            startHere: 0
        })
        GetIO(this, 0, this.state.stopHere, 0);
    }
    loadMore = () => {
        if ((this.state.dataSource.length > 4) && (this.state.IOSayisi != this.state.dataSource.length))
            if (!this.state.loading) {
                const varStartHere = (this.state.startHere + 10)
                const varStopHere = this.state.stopHere

                this.setState({
                    loading: true,
                    stopHere: varStopHere,
                    startHere: varStartHere
                })
                GetIO(this, varStartHere, varStopHere, 0);
            }
    }
    loadMoreSpinner = () => {
        if (this.state.dataSource.length != this.state.IOSayisi) {
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
                    <Text style={{ width: "100%", padding: 20, textAlign: "center", marginTop: 20, fontFamily: 'Poppins-Light', color: '#999' }}>Daha fazla input/output bulunmamaktadır</Text>
                </View>
            )
        }
    }
    changeStatus = async (moduleID, moduleType, val, index, data, mod) => {
        if (mod == "M") {
            Alert.alert(
                "Çıkış " + (index + 1) + " Durumu",
                "Durum değiştirilsin mi ?",
                [
                    {
                        text: "İptal",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "Evet", onPress: async () => {
                            const tempData = data
                            tempData[index] = val;
                            this.setState({ OnOffArray: tempData });
                            await UpdateDesiredStatus(this, moduleID, moduleType, index + 1, mod, tempData[index])
                        }
                    }
                ],
                { cancelable: false }
            );
        }
        else {
            gunluk = "günlük çizelge"
            haftalık = "haftalık çizelge"
            sıcaklık = "sıcaklık kontrolü"
            analog = "analog kontrolü"
            kural = "kural tabanlı"
            var text, value, value1 = ""

            var strLength = mod.length
            if (strLength > 1) {
                var str = mod.split("")
                switch (str[1]) {
                    case '&':
                        switch (str[0]) {
                            case 'E': value = kural; break;
                            case 'T': value = sıcaklık; break;
                            case 'W': value = haftalık; break;
                            case 'D': value = gunluk; break;
                        }
                        switch (str[2]) {
                            case 'E': value1 = kural; break;
                            case 'T': value1 = sıcaklık; break;
                            case 'W': value1 = haftalık; break;
                            case 'D': value1 = gunluk; break;
                        }
                        break;
                    case '|':
                        switch (str[0]) {
                            case 'E': value = kural; break;
                            case 'T': value = sıcaklık; break;
                            case 'W': value = haftalık; break;
                            case 'D': value = gunluk; break;
                        }
                        switch (str[2]) {
                            case 'E': value1 = kural; break;
                            case 'T': value1 = sıcaklık; break;
                            case 'W': value1 = haftalık; break;
                            case 'D': value1 = gunluk; break;
                        }
                        break;
                }
                text = value + (str[1] == "&" ? " ve " : " veya ") + value1
            } else {
                switch (mod) {
                    case "A":
                        text = analog
                        break;
                    case "E":
                        text = kural
                        break;
                    case "T":
                        text = sıcaklık
                        break;
                    case "W":
                        text = haftalık
                        break;
                    case "D":
                        text = gunluk
                        break;
                    default:
                        break;
                }
            }
            Toast.show({
                text: "Çıkış " + (index + 1) + " durumu önceden düzenlenen " + text + " olduğu için değiştirilemez!",
                duration: 2000,
                textStyle: { color: "white", fontSize: 14, textAlign: 'center' },
                type: "warning",
            })
        }
    }
    statusChange = (data) => {
        if (role == "admin") {
            if (data == "close") {
                pay = true
                auth = false
                getDataAndtime = false
            } else {
                pay = false
                auth = true
                getDataAndtime = true
            }
        } else {
            if (data == "close") {
                pay = true
                auth = false
                tigetDataAndtimeme = false
            } else {
                pay = false
                auth = true
                getDataAndtime = true
            }
        }
    }
    _renderItem = ({ item }) => {
        this.statusChange(item.payment_state)
        return (
            <View style={{ backgroundColor: item.conn_status ? '#FF6633' : '#99CCCC', marginRight: 10, marginLeft: 10, marginBottom: 5, marginTop: 5, borderRadius: 6, }}>
                <Grid>
                    <Col>
                        <Row>
                            <View style={{ position: 'absolute', left: 2, top: 2, backgroundColor: "#80d8ff", width: 20, height: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 20 / 2 }}>
                                <Text style={{ color: 'white', fontSize: 10 }}>{item.temp_id}</Text>
                            </View>
                            <Col style={{ padding: 10 }}>
                                <Row style={{ marginTop: 10, padding: 2, left: 5, }}>
                                    <Col style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                        <Icon type="FontAwesome5" name="map-marker-alt" style={{ color: item.conn_status ? '#666' : '#DA7C62', fontSize: 20 }} />
                                        <Text style={{ fontSize: 14, color: "#666", fontFamily: 'Poppins-Regular', textAlign: "center", fontWeight: '500' }} numberOfLines={1}> {item._location}</Text>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Col style={{ padding: 10 }}>
                            {
                                item.module_type == 0 && getDataAndtime == true &&
                                item.input_status.map((data, index) => {
                                    return (
                                        <G1ModuleComponent
                                            GirisSayi={index + 1}
                                            GirisBilgi={data == 1 ? item.status_1_name[index] : item.status_0_name[index]}
                                            GirisDurumRengi={data == 1 ? item.status_1_color[index] : item.status_0_color[index]}
                                        />
                                    )
                                })
                            }

                            {
                                item.module_type == 1 && getDataAndtime == true &&
                                item.output_status.map((x, index) => {
                                    return (
                                        <C1ModuleComponent
                                            CıkısSayi={index + 1}
                                            CıkısBilgi={item.output_name[index]}
                                            CıkısDurum={item.output_desired_status[index] == 1 ? true : false}
                                            onValueChangeCıkısDurum={(value) => this.changeStatus(item.module_id, item.module_type, value, index, item.output_desired_status, item.output_mod[index])}
                                            iconStatus={item.iconVar[index]}
                                        />
                                    )
                                })
                            }

                            {
                                item.module_type == 3 && getDataAndtime == true &&
                                item.input_status.map((data, index) => {
                                    return (
                                        <GRPModuleInputComponent
                                            GirisSayi={index + 1}
                                            GirisBilgi={data == 1 ? item.status_1_name[index] : item.status_0_name[index]}
                                            GirisDurumRengi={data == 1 ? item.status_1_color[index] : item.status_0_color[index]}
                                        />
                                    )
                                })

                            }
                            {
                                item.module_type == 3 && getDataAndtime == true &&
                                item.output_status.map((data, index) => {
                                    return (
                                        <GRPModuleOutputComponent
                                            CıkısSayi={index + 1}
                                            CıkısBilgi={item.output_name[index]}
                                            CıkısDurum={item.output_desired_status[index] == 1 ? true : false}
                                            onValueChangeCıkısDurum={(value) => this.changeStatus(item.module_id, item.module_type, value, index, item.output_desired_status, item.output_mod[index])}
                                        />
                                    )
                                })
                            }

                            {
                                item.module_type == 4 && getDataAndtime == true &&
                                item.input_status.map((data, index) => {
                                    return (
                                        <D1ModuleComponent
                                            GirisSayi={index + 1}
                                            GirisBilgi={data == 1 ? item.status_1_name[index] : item.status_0_name[index]}
                                            GirisDurumRengi={data == 1 ? item.status_1_color[index] : item.status_0_color[index]}
                                        />
                                    )
                                })
                            }

                            {
                                pay == true &&
                                <DontPay />
                            }
                        </Col>
                        {
                            getDataAndtime == true &&
                            <Row style={{ marginVertical: 5, marginHorizontal: 10, borderWidth: 0.5, borderColor: '#ddd', borderBottomRightRadius: 6, borderBottomLeftRadius: 6, justifyContent: 'center', }}>
                                <Col style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ flex: 1, fontSize: 11, fontFamily: 'Poppins-Light', marginTop: 3, textAlign: 'center' }}>Son Veri Zamanı {'\n'}<Text style={{ fontSize: 13, color: 'white', fontFamily: 'Poppins-Regular', textAlign: 'center' }}>{item.last_status_time}</Text> </Text>
                                </Col>
                                <Col style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ flex: 1, fontSize: 11, fontFamily: 'Poppins-Light', marginTop: 3, textAlign: 'center' }}>Son Değişiklik Zamanı {'\n'}<Text style={{ fontSize: 13, color: 'white', fontFamily: 'Poppins-Regular', textAlign: 'center' }}>{item.last_change_time}</Text> </Text>
                                </Col>
                            </Row>
                        }
                        <Row style={{ marginVertical: 5, marginHorizontal: 10, borderWidth: 0.5, borderColor: '#ddd', borderBottomRightRadius: 6, borderBottomLeftRadius: 6, justifyContent: 'center', }}>
                            <Col style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ flex: 1, fontSize: 11, fontFamily: 'Poppins-Light', marginTop: 3 }}>Modül No <Text style={{ fontSize: 13, color: 'white', fontFamily: 'Poppins-Regular' }}>{item.module_id}</Text> </Text>
                            </Col>
                        </Row>

                        <Row style={{ backgroundColor: item.conn_status ? '#FF6633' : '#99CCCC', borderBottomLeftRadius: 6, borderBottomRightRadius: 6, padding: 3 }}>
                            <Col style={{ alignItems: 'flex-start', marginLeft: 5, flex: 1, }}>
                                {/* {
                                    pay == true &&
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon type="FontAwesome5" name="exclamation-circle" style={{ fontSize: 14, color: 'red', }} />
                                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', textAlign: 'center' }}> Ödemesi yapılmamış cihaz</Text>
                                    </View>
                                } */}
                                {
                                    auth == true &&
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                        <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#ddd', borderRadius: 4, width: width / 4, padding: 3, justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('IOSettings', {
                                            inputOutputID: item.module_id,
                                            inputOutputType: item.module_type,
                                            inputOutputLocation: item._location
                                        })}>
                                            <Icon type="FontAwesome5" name="cog" style={{ fontSize: 18, color: '#80d8ff' }} />
                                            <Text style={{ fontSize: 13, fontFamily: 'Poppins-Light', color: 'black' }}> Ayarlar</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </Col>
                            <Col style={{ marginLeft: 5, flex: 2 }}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ textAlign: 'center', fontSize: 13, fontFamily: 'Poppins-Light', color: 'black' }}>{item.last_user}</Text>
                                </View>
                            </Col>
                        </Row>

                    </Col>
                </Grid>
            </View>

        )
    }
    render() {
        return (
            <Root>
                <Container>
                    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
                        {this.state.dataLoading &&
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                                <Spinner color='#aaa' style={{ width: "100%" }} />
                            </View>
                        }
                        {!this.state.dataLoading &&
                            <View style={{ flex: 1 }}>

                                <AnalogGirisToolBar
                                    ListCount={this.state.IOSayisi}
                                    onPressFilter={() => this.props.navigation.navigate('Filter', {
                                        redirectPage: 'Devices',
                                        activeTab: this.props.activeTab,
                                        IoListObj: this,
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
            </Root>
        );
    }
}

export default AnalogGirisListScreen;

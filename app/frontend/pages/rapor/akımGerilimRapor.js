import React, { Component } from 'react';
import { View, TouchableOpacity, Text, BackHandler, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Right, Body, Title, Left, Header, Container, Icon, Spinner, Root, Row, Grid, Col, DatePicker } from 'native-base';
import CheckInternet from '../../../backend/InternetController/CheckInternet';
import { GetAkımGerilimRapor } from '../../../backend/raporController/akımGerilimRapor'
import RaporHeader from '../../components/rapor/raporHeader';
import RaporData from '../../components/rapor/raporData';
import moment from 'moment';

var height = Dimensions.get('window').height
var width = Dimensions.get('window').width


var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export class AkımGerilimRaporScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            dataLoading: true,
            nextMonth: moment().add(1, 'days').format('YYYY-MM-DD'),
            prevMonth: moment().subtract(1, 'days').format('YYYY-MM-DD'),
            nextDisabled: true,
            nextColor: '#9e9e9e',
            prevColor: '#80d8ff',
            prevDisabled: false,
            dataNotFound: false,
            deviceUnpaid: false,
            current_period: "",
            ct_ratio: "",
            vt_ratio: "",
            stopFirstTime: "",
            lastTime: "",
            show: false,
            reaktifShow: true,
            AkımTrafoShow: true,
            tarihMin: new Date(2015, 1, 1),
            tarihMax: new Date()
        }
        this.FilterReport = this.FilterReport.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack()
        return true;
    }

    UNSAFE_componentWillMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.PageDidFocus()
        });
    }

    FilterReport = (newDate) => {
        this.setState({ dataLoading: true, dataSource: [], dataNotFound: false, deviceUnpaid: false })
        var dateFormat = moment(newDate).format('YYYY-MM-DD')
        GetAkımGerilimRapor(this, this.props.measuring_device_id, dateFormat)
    }

    NextMonth = () => {
        this.setState({
            dataNotFound: false,
            dataLoading: true,
            dataSource: [],
            prevDisabled: false,
            prevColor: '#80d8ff',
        })
        if (this.state.nextMonth > moment().format('YYYY-MM-DD')) {
            this.setState({ dataError: true, dataLoading: false, nextDisabled: true, nextColor: '#9e9e9e' })
            return false;
        }
        GetAkımGerilimRapor(this, this.props.measuring_device_id, this.state.nextMonth)
    }

    PageDidFocus = async () => {
        this.setState({
            dataNotFound: false,
            deviceUnpaid: false,
            ct_ratio: "",
            vt_ratio: "",
            dataLoading: true,
            dataSource: [],
            nextDisabled: true,
            nextColor: '#9e9e9e',
            prevDisabled: false,
            prevColor: '#80d8ff',
        })
        await GetAkımGerilimRapor(this, this.props.measuring_device_id, moment().format('YYYY-MM-DD'));
    }

    PrevMonth = () => {
        this.setState({
            dataNotFound: false,
            dataLoading: true,
            dataSource: [],
            nextDisabled: false,
            nextColor: '#80d8ff'
        })
        if (moment(this.state.stopFirstTime, 'DD.MM.YYYY') > moment(this.state.prevMonth, 'YYYY-MM-DD')) {
            this.setState({ prevDisabled: true, prevColor: '#9e9e9e', dataLoading: false, dataError: true })
            return false
        }
        GetAkımGerilimRapor(this, this.props.measuring_device_id, this.state.prevMonth)
    }

    _renderItem = ({ item }) => (
        <View style={{ backgroundColor: "white", margin: 10, paddingHorizontal: 10 }}>
            <Grid>
                <Row style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#80d8ff', marginTop: 5, padding: 5 }}><Text>{item.date_record}</Text></Row>
                <Row style={{ flex: 1, flexDirection: 'column', marginBottom: 5 }}>

                    <Row style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
                        <Col style={{ justifyContent: 'flex-start', margin: 5 }}>
                            <Text></Text>
                        </Col>
                        <Col style={styles.titleText}>
                            <Text>L1</Text>
                        </Col>
                        <Col style={styles.titleText}>
                            <Text>L2</Text>
                        </Col>
                        <Col style={styles.titleText}>
                            <Text>L3</Text>
                        </Col>
                    </Row>

                    <RaporData
                        raporTitle="Akım"
                        dataSymbol="(A)"
                        dataL1={item.current_l1}
                        subdataL1={item.current_L1Raw}
                        dataL2={item.current_l2}
                        subdataL2={item.current_L2Raw}
                        dataL3={item.current_l3}
                        subdataL3={item.current_L3Raw}
                    />

                    <RaporData
                        raporTitle="Gerilim"
                        dataSymbol="(V)"
                        dataL1={item.voltage_l1}
                        subdataL1={item.voltage_L1Raw}
                        dataL2={item.voltage_l2}
                        subdataL2={item.voltage_L2Raw}
                        dataL3={item.voltage_l3}
                        subdataL3={item.voltage_L3Raw}
                    />

                    <RaporData
                        raporTitle="Cos Φ"
                        dataL1={item.cosphi_l1.toFixed(3)}
                        dataL2={item.cosphi_l2.toFixed(3)}
                        dataL3={item.cosphi_l3.toFixed(3)}
                    />
                    <RaporData
                        raporTitle="Aktif Güç"
                        dataSymbol="(kW)"
                        dataL1={item.aktif_l1.toFixed(3)}
                        dataL2={item.aktif_l2.toFixed(3)}
                        dataL3={item.aktif_l3.toFixed(3)}
                    />

                    {this.state.reaktifShow &&
                        <RaporData
                            raporTitle="Reaktif Güç"
                            dataSymbol="(kVAr)"
                            dataL1={item.reaktif_l1.toFixed(3)}
                            dataL2={item.reaktif_l2.toFixed(3)}
                            dataL3={item.reaktif_l3.toFixed(3)}
                        />
                    }

                    {this.state.show &&
                        <RaporData
                            raporTitle="Endüktif"
                            dataSymbol="(kVAr)"
                            dataL1={item.inductive_power_l1.toFixed(3)}
                            dataL2={item.inductive_power_l2.toFixed(3)}
                            dataL3={item.inductive_power_l3.toFixed(3)}
                        />
                    }

                    {this.state.show &&
                        <RaporData
                            raporTitle="Kapasitif"
                            dataSymbol="(kVAr)"
                            dataL1={item.capacitive_power_l1.toFixed(3)}
                            dataL2={item.capacitive_power_l2.toFixed(3)}
                            dataL3={item.capacitive_power_l3.toFixed(3)}
                        />
                    }

                    {this.state.show &&
                        <RaporData
                            raporTitle="THDI"
                            dataSymbol="(%)"
                            dataL1={item.thdi_l1.toFixed(3)}
                            dataL2={item.thdi_l2.toFixed(3)}
                            dataL3={item.thdi_l3.toFixed(3)}
                        />
                    }

                </Row>
            </Grid>
        </View>
    )

    render() {
        return (
            <Root>
                <Container>
                    <CheckInternet />
                    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
                        <RaporHeader
                            konum={this.props.measuring_location_name}
                            modemNo={this.props.comm_device_id}
                            cihazNo={this.props.measuring_device_id}
                            ilkOkuma={this.state.stopFirstTime}
                            sonOkuma={this.state.lastTime}
                        />
                        {this.state.AkımTrafoShow &&
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', marginTop: 3, borderRadius: 16, marginHorizontal: 5, flexDirection: 'row' }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                    <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: 12 }}>Akım Trafo Oranı : </Text>
                                    <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 12, fontWeight: '400' }}> {this.state.ct_ratio}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                    <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: 12 }}>Gerilim Trafo Oranı : </Text>
                                    <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 12, fontWeight: '400' }}> {this.state.vt_ratio}</Text>
                                </View>
                            </View>}

                        <View style={{ flex: 0.5, flexDirection: 'row', marginTop: 5, }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 5 }}>
                                <TouchableOpacity color={this.state.prevColor} disabled={this.state.prevDisabled} onPress={() => this.PrevMonth()} style={{ backgroundColor: this.state.prevColor, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 8, padding: 5 }}>
                                    <Icon type="FontAwesome5" name="chevron-left" style={{ fontSize: 20, color: 'white', marginTop: -5 }} />
                                    <Text style={{ marginLeft: 5, color: 'white', fontFamily: 'Poppins-Light', fontSize: 12 }}> Önceki </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}>
                                    <DatePicker
                                        defaultDate={new Date()}
                                        minimumDate={this.state.tarihMin}
                                        maximumDate={this.state.tarihMax}
                                        locale={"tr"}
                                        modalTransparent={false}
                                        animationType={"slide"}
                                        androidMode={"default"}
                                        placeHolderText={<Icon type="FontAwesome5" name="calendar-alt" style={{ fontSize: width / 15, color: '#80d8ff', bottom: 10 }} />}
                                        textStyle={{ color: "#80d8ff", fontSize: 14, textAlign: 'center', right: 5 }}
                                        placeHolderTextStyle={{ color: "#80d8ff", fontSize: 14, textAlign: 'center' }}
                                        onDateChange={this.FilterReport}
                                        disabled={false}
                                        style={{ margin: 10 }}
                                    />
                                </View>
                                <View style={{ flex: 1, justifyContent: 'flex-end', }}>
                                    <Text style={{ fontSize: 13, fontFamily: 'Poppins-Regular', textAlign: 'center' }}>{this.state.current_period}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 5 }}>
                                <TouchableOpacity color={this.state.nextColor} disabled={this.state.nextDisabled} onPress={() => this.NextMonth()} style={{ backgroundColor: this.state.nextColor, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 8, padding: 5 }}>
                                    <Text style={{ marginLeft: 5, color: 'white', fontFamily: 'Poppins-Light', fontSize: 12 }}> Sonraki </Text>
                                    <Icon type="FontAwesome5" name="chevron-right" style={{ fontSize: 20, color: 'white', marginTop: -5 }} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flex: 3, backgroundColor: 'white', marginTop: 5, borderRadius: 16, marginHorizontal: 5, marginBottom: 5 }}>
                            {this.state.dataLoading &&
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                                    <Spinner color='#aaa' style={{ width: "100%" }} />
                                </View>
                            }
                            {this.state.dataNotFound &&
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%", position: 'absolute', marginTop: 30 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Poppins-Light', color: '#aaa' }}>Dönem bilgisi bulunamadı</Text>
                                </View>
                            }
                            {this.state.deviceUnpaid &&
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%", position: 'absolute' }}>
                                    <Icon type="FontAwesome5" name="exclamation-circle" style={{ fontSize: 40, color: 'red' }} />
                                    <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Poppins-Light', color: '#aaa' }}>Cihazın ödemesi yapılmamıştır.</Text>
                                </View>
                            }
                            {!this.state.dataLoading && !this.state.dataNotFound && !this.state.deviceUnpaid &&
                                <FlatList
                                    data={this.state.dataSource}
                                    keyExtractor={(index, id) => id.toString()}
                                    style={{ backgroundColor: "#fff", borderRadius: 16 }}
                                    renderItem={this._renderItem}
                                    onEndReachedThreshold={0.5}
                                    showsVerticalScrollIndicator={false}
                                >
                                </FlatList>
                            }
                        </View>
                    </View>
                </Container >
            </Root >
        )
    }
}

export default AkımGerilimRaporScreen

const styles = StyleSheet.create({

    dataText: {
        justifyContent: 'center',
        margin: 5,
        alignItems: 'center',
        backgroundColor: '#EBEBEB'
    },
    dataSubText: {
        fontSize: 10,
        color: 'gray',
        textAlign: 'center'
    },
    titleText: {
        justifyContent: 'flex-start',
        margin: 5,
        alignItems: 'center',
    }

});


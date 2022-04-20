import React, { Component } from 'react';
import { View, TouchableOpacity, BackHandler, Text, FlatList, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Right, Body, Title, Left, Header, Container, Icon, Spinner, Root, Row, Col, Grid, ListItem, DatePicker } from 'native-base';
import CheckInternet from '../../../backend/InternetController/CheckInternet';
import { GetTuketimRapor } from '../../../backend/raporController/tuketimRapor';
import RaporHeader from '../../components/rapor/raporHeader';
import moment from 'moment';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

var height = Dimensions.get('window').height
var width = Dimensions.get('window').width

export class TuketimRaporScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            dataLoading: true,
            nextDisabled: true,
            nextHour: moment().add(1, 'days').format('YYYY-MM-DD'),
            prevHour: moment().subtract(1, 'days').format('YYYY-MM-DD'),
            nextDay: moment().add(1, 'months').format('YYYY-MM'),
            prevDay: moment().subtract(1, 'months').format('YYYY-MM'),
            nextMonth: moment().add(1, 'years').format('YYYY-01'),
            prevMonth: moment().subtract(1, 'years').format('YYYY-01'),
            nextColor: '#9e9e9e',
            prevColor: '#80d8ff',
            prevDisabled: false,
            stopFirstTime: '',
            dataNotFound: false,
            deviceUnpaid: false,
            current_period: "",
            lastTime: "",
            report_name: "",
            saat_active: false,
            gun_active: false,
            ay_active: false,
            activeColor: '#C4F542',
            rapor: "consumptionReportDaily",
            chosenDate: new Date(),
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

    //datepicker için filtreleme
    FilterReport = async (newDate) => {
        await this.setState({ chosenDate: newDate, deviceUnpaid: false, dataNotFound: false, });
        if (this.state.stopFirstTime != " - " || this.state.lastTime != " - ") {
            this.setState({
                tarihMin: new Date(moment(this.state.stopFirstTime)),
                tarihMax: new Date(moment(this.state.lastTime)),
            })
        }
        if (this.state.gun_active == true) {

            this.setState({
                chosenDate: moment(this.state.chosenDate).format('YYYY-MM'),
                dataSource: [],
                dataLoading: true,
                rapor: "consumptionReportDaily",
                report_name: "Günlük Rapor"
            })
            GetTuketimRapor(this, this.props.measuring_device_id, this.state.chosenDate)
        } else if (this.state.ay_active == true) {
            this.setState({
                chosenDate: moment(this.state.chosenDate).format('YYYY-01'),
                dataSource: [],
                dataLoading: true,
                rapor: "consumptionReportMonthly",
                report_name: "Aylık Rapor"
            })
            GetTuketimRapor(this, this.props.measuring_device_id, this.state.chosenDate)
            if (moment(this.state.stopFirstTime).format('YYYY-MM') > moment(this.state.chosenDate).format('YYYY-MM')) {
                this.setState({ prevDisabled: true, prevColor: '#9e9e9e', nextDisabled: false, nextColor: '#80d8ff' })
            } else {
                this.setState({ prevDisabled: false, prevColor: '#80d8ff' })
            }
            if (moment(this.state.lastTime).format('YYYY-MM') > moment(this.state.chosenDate).format('YYYY-MM')) {
                this.setState({ prevDisabled: false, prevColor: '#80d8ff', nextDisabled: false, nextColor: '#80d8ff' })
            } else {
                this.setState({ prevDisabled: false, prevColor: '#80d8ff' })
            }
        }
        else if (this.state.saat_active == true) {
            this.setState({
                chosenDate: moment(this.state.chosenDate).format('YYYY-MM-DD'),
                dataSource: [],
                dataLoading: true,
                rapor: "consumptionReportHourly",
                report_name: "Saatlik Rapor"
            })
            GetTuketimRapor(this, this.props.measuring_device_id, this.state.chosenDate)
        }
    }

    NextTime = () => {
        this.setState({
            dataLoading: true,
            dataNotFound: false,
            prevDisabled: false,
            prevColor: '#80d8ff',
            dataSource: []
        })

        if (this.state.saat_active == true) {
            if (this.state.nextHour > moment().format('YYYY-MM-DD')) {
                this.setState({ nextDisabled: true, nextColor: '#9e9e9e', dataLoading: false, dataError: true })
                return false
            }
            GetTuketimRapor(this, this.props.measuring_device_id, this.state.nextHour)
        }
        else if (this.state.gun_active == true) {
            if (this.state.nextDay > moment().format('YYYY-MM')) {
                this.setState({ nextDisabled: true, nextColor: '#9e9e9e', dataLoading: false, dataError: true })
                return false
            }
            GetTuketimRapor(this, this.props.measuring_device_id, this.state.nextDay)
        }
        else if (this.state.ay_active == true) {
            if (this.state.nextMonth > moment().format('YYYY-MM')) {
                this.setState({ nextDisabled: true, nextColor: '#9e9e9e', dataLoading: false, dataError: true })
                return false
            }
            GetTuketimRapor(this, this.props.measuring_device_id, this.state.nextMonth)
        }
    }

    PrevTime = () => {

        this.setState({ dataLoading: true, dataNotFound: false, })
        this.state.dataSource = []
        if (this.state.saat_active == true) {
            if (this.state.stopFirstTime > this.state.prevHour) {
                this.setState({ prevDisabled: true, prevColor: '#9e9e9e', dataLoading: false, dataError: true })
                return false
            }
            GetTuketimRapor(this, this.props.measuring_device_id, this.state.prevHour)
        }
        else if (this.state.gun_active == true) {
            if (this.state.stopFirstTime > this.state.prevDay) {
                this.setState({ prevDisabled: true, prevColor: '#9e9e9e', dataLoading: false, dataError: true })
                return false
            }
            GetTuketimRapor(this, this.props.measuring_device_id, this.state.prevDay)
        }
        else if (this.state.ay_active == true) {

            if (moment(this.state.stopFirstTime, 'YYYY-MM').format('YYYY') > moment(this.state.prevMonth, 'YYYY-MM').format('YYYY')) {
                this.setState({ prevDisabled: true, prevColor: '#9e9e9e', dataLoading: false, dataError: true, })
                return false
            }
            GetTuketimRapor(this, this.props.measuring_device_id, this.state.prevMonth)
        }
        this.setState({ nextDisabled: false, nextColor: "#80d8ff" })
    }

    //saatlik tüketim raporu
    hourlyReported = () => {
        this.setState({
            deviceUnpaid: false,
            dataNotFound: false,
            saat_active: true,
            gun_active: false,
            ay_active: false,
            prevDisabled: false,
            nextDisabled: true,
            prevColor: '#80d8ff',
            nextColor: '#9e9e9e',
            report_name: "Saatlik Rapor",
            rapor: "consumptionReportHourly",
            dataSource: [],
            dataLoading: true,
        })

        GetTuketimRapor(this, this.props.measuring_device_id, moment().format('YYYY-MM-DD'))
    }

    //günlük tüketim raporu
    dailyReported = async () => {
        this.setState({
            deviceUnpaid: false,
            dataNotFound: false,
            gun_active: true,
            saat_active: false,
            ay_active: false,
            report_name: "Günlük Rapor",
            rapor: "consumptionReportDaily",
            prevDisabled: false,
            nextDisabled: true,
            prevColor: '#80d8ff',
            nextColor: '#9e9e9e',
            dataSource: [],
            dataLoading: true,
        })
        await GetTuketimRapor(this, this.props.measuring_device_id, moment().format('YYYY-MM'))
    }

    //aylık tüketim raporu
    monthlyReported = () => {
        this.setState({
            deviceUnpaid: false,
            dataNotFound: false,
            ay_active: true,
            gun_active: false,
            saat_active: false,
            prevDisabled: false,
            nextDisabled: true,
            prevColor: '#80d8ff',
            nextColor: '#9e9e9e',
            report_name: "Aylık Rapor",
            rapor: "consumptionReportMonthly",
            dataSource: [],
            dataLoading: true,
        })
        GetTuketimRapor(this, this.props.measuring_device_id, moment().format('YYYY-01'))
    }

    PageDidFocus = async () => {
        this.setState({
            deviceUnpaid: false,
            dataNotFound: false,
            prevDisabled: false,
            prevColor: '#80d8ff',
            nextDisabled: true,
            nextColor: "#9e9e9e",
            nextHour: moment().format('YYYY-MM-DD'),
            prevHour: moment().format('YYYY-MM-DD'),
            nextDay: moment().format('YYYY-MM'),
            prevDay: moment().format('YYYY-MM'),
            nextMonth: moment().format('YYYY-01'),
            prevMonth: moment().format('YYYY-01'),
            chosenDate: new Date(),
            tarihMin: new Date(2015, 1, 1),
            tarihMax: new Date()
        })
        await this.dailyReported()
    }

    _renderItem = ({ item }) => (
        <ListItem style={styles.dataListContainer}>
            <ScrollView style={{ flex: 1, height: 15 }} alwaysBounceVertical={true}>
                <Grid>
                    <Row style={{ height: 15 }}>
                        <Col style={{ paddingTop: 5 }}>
                            <Row style={{ }}>
                                <Col>
                                    <Text style={styles.dataText}>{item.date_record}</Text>
                                </Col>
                                <Col>
                                    <Text style={styles.dataText}>{item.active_consump}</Text>
                                </Col>
                                <Col>
                                    <Text style={styles.dataText}>{item.t1_consump}</Text>
                                </Col>
                                <Col>
                                    <Text style={styles.dataText}>{item.t2_consump}</Text>
                                </Col>
                                <Col>
                                    <Text style={styles.dataText}>{item.t3_consump}</Text>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </ScrollView>
        </ListItem>
    )

    render() {
        return (
            <Root>
                <Container>
                    <CheckInternet />
                    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
                        {/*Rapor Header */}
                        <RaporHeader
                            konum={this.props.measuring_location_name}
                            modemNo={this.props.comm_device_id}
                            cihazNo={this.props.measuring_device_id}
                            ilkOkuma={this.state.stopFirstTime}
                            sonOkuma={this.state.lastTime}
                        />
                        <View style={styles.butonRaporContainer}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                <View style={styles.butonRapor}>
                                    <TouchableOpacity style={{ backgroundColor: this.state.saat_active ? this.state.activeColor : '#80d8ff', borderRadius: 8 }}
                                        onPress={() => this.hourlyReported()}>
                                        <Text style={styles.butonRaporText}>Saatlik</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.butonRapor}>
                                    <TouchableOpacity style={{ backgroundColor: this.state.gun_active ? this.state.activeColor : '#80d8ff', borderRadius: 8 }}
                                        onPress={() => this.dailyReported()}>
                                        <Text style={styles.butonRaporText}>Günlük</Text>
                                    </TouchableOpacity>

                                </View>
                                <View style={styles.butonRapor}>
                                    <TouchableOpacity style={{ backgroundColor: this.state.ay_active ? this.state.activeColor : '#80d8ff', borderRadius: 8 }}
                                        onPress={() => this.monthlyReported()}>
                                        <Text style={styles.butonRaporText}>Aylık</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.butonRapor}>
                                    <DatePicker
                                        defaultDate={new Date()}
                                        minimumDate={this.state.tarihMin}
                                        maximumDate={this.state.tarihMax}
                                        locale={"tr"}
                                        modalTransparent={false}
                                        animationType={"slide"}
                                        androidMode={"default"}
                                        placeHolderText={<Icon type="FontAwesome5" name="calendar-alt" style={{ fontSize: 30, color: '#80d8ff' }} />}
                                        textStyle={{ color: "#80d8ff", fontSize: 14, textAlign: 'center', right: 5 }}
                                        placeHolderTextStyle={{ color: "#80d8ff", fontSize: 14, textAlign: 'center', bottom: 5, right: 5 }}
                                        onDateChange={this.FilterReport}
                                        disabled={false}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ flex: 0.3, flexDirection: 'row', marginTop: 5 }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10 }}>
                                <TouchableOpacity color={this.state.prevColor} disabled={this.state.prevDisabled} onPress={() => this.PrevTime()} style={{ backgroundColor: this.state.prevColor, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 8, padding: 5 }}>
                                    <Icon type="FontAwesome5" name="chevron-left" style={{ fontSize: 20, color: 'white', marginTop: -5 }} />
                                    <Text style={{ marginLeft: 5, color: 'white', fontFamily: 'Poppins-Light', fontSize: 12 }}> Önceki </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', textAlign: 'center' }}>{this.state.report_name}</Text>
                                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', textAlign: 'center' }}>{this.state.current_period}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                <TouchableOpacity color={this.state.nextColor} disabled={this.state.nextDisabled} onPress={() => this.NextTime()} style={{ backgroundColor: this.state.nextColor, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 8, padding: 5 }}>
                                    <Text style={{ marginLeft: 5, color: 'white', fontFamily: 'Poppins-Light', fontSize: 12 }}> Sonraki </Text>
                                    <Icon type="FontAwesome5" name="chevron-right" style={{ fontSize: 20, color: 'white', marginTop: -5 }} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.dataMainContainer}>
                            {this.state.dataLoading &&
                                <View style={styles.loadingContainer}>
                                    <Spinner color='#aaa' style={{ width: "100%" }} />
                                </View>
                            }
                            {this.state.dataNotFound &&
                                <View style={styles.dataErrorContainer}>
                                    <Text style={styles.dataErrorText}>Dönem bilgisi bulunamadı</Text>
                                </View>
                            }
                            {this.state.deviceUnpaid &&
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%", position: 'absolute' }}>
                                    <Icon type="FontAwesome5" name="exclamation-circle" style={{ fontSize: 40, color: 'red' }} />
                                    <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Poppins-Light', color: '#aaa' }}>Cihazın ödemesi yapılmamıştır.</Text>
                                </View>
                            }
                            {!this.state.dataLoading && !this.state.dataNotFound && !this.state.deviceUnpaid &&
                                < View style={{ flex: 1 }}>
                                    <View>
                                        <View style={{ height: 50 }}>
                                            <Grid>
                                                <Row>
                                                    <Col style={{ paddingTop: 5 }}>
                                                        <Row>
                                                            <Col style={{ padding: 5 }}>
                                                                <Text style={[styles.dataHeadText, { left: 5 }]}>Tarih</Text>
                                                            </Col>
                                                            <Col style={{ padding: 5 }}>
                                                                <Text style={styles.dataHeadText}>Aktif <Text style={styles.dataHeadSymbolText}>kW.h</Text></Text>
                                                            </Col>
                                                            <Col style={{ padding: 5 }}>
                                                                <Text style={styles.dataHeadText}>T1<Text style={styles.dataHeadSymbolText}> kW.h</Text><Text style={{ fontSize: 8, }}>{"\n"}(06-17)</Text></Text>
                                                            </Col>
                                                            <Col style={{ padding: 5 }}>
                                                                <Text style={styles.dataHeadText}>T2<Text style={styles.dataHeadSymbolText}> kW.h</Text><Text style={{ fontSize: 8, }}>{"\n"}(17-22)</Text></Text>
                                                            </Col>
                                                            <Col style={{ padding: 5 }}>
                                                                <Text style={styles.dataHeadText}>T3<Text style={styles.dataHeadSymbolText}> kW.h</Text><Text style={{ fontSize: 8, }}>{"\n"}(22-06)</Text></Text>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Grid>
                                        </View>
                                    </View >
                                    <FlatList
                                        data={this.state.dataSource}
                                        keyExtractor={(index, id) => id.toString()}
                                        style={{ backgroundColor: "#fff", borderRadius: 16 }}
                                        renderItem={this._renderItem}
                                        onEndReachedThreshold={0.5}
                                        showsVerticalScrollIndicator={false}
                                    >
                                    </FlatList>
                                </View>
                            }
                        </View>
                    </View>
                </Container>
            </Root >
        )
    }
}

export default TuketimRaporScreen

const styles = StyleSheet.create({
    butonRaporContainer: {
        height: 40,
        backgroundColor: 'white',
        marginTop: 5,
        borderRadius: 16,
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    butonRapor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    butonRaporText: {
        paddingHorizontal: 15,
        paddingVertical: 3,
        color: 'white'
    },
    dataErrorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        position: 'absolute',
        marginTop: 30
    },
    dataErrorText: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Poppins-Light',
        color: '#aaa'
    },
    dataHeadText: {
        fontSize: 10,
        fontWeight: "bold",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: 'Poppins-Light'
    },
    dataHeadSymbolText: {
        fontSize: 8,
        fontFamily: 'Poppins-Thin',
        color: '#ccc'
    },
    dataText: {
        fontSize: 8,
        textAlign: "center",
    },
    dataMainContainer: {
        flex: 3,
        backgroundColor: 'white',
        marginTop: 5,
        borderRadius: 16,
        marginHorizontal: 5,
        marginBottom: 5
    },
    dataListContainer: {
        height: 15,
        backgroundColor: "white",
        marginTop: 4,
        marginLeft: 0,
        paddingLeft: 10,
        paddingRight: 10,
        borderTopWidth: 1,
        borderBottomWidth: 0,
        borderColor: "#80d8ff"
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    }
});
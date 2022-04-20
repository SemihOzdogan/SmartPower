import React, { Component } from 'react';
import { View, TouchableOpacity, Text, BackHandler, FlatList } from 'react-native';
import { Container, Icon, Spinner, Root, Row, Col, Grid, ListItem, DatePicker } from 'native-base';
import { GetReaktifRapor } from '../../../backend/raporController/reaktifRapor'
import CheckInternet from '../../../backend/InternetController/CheckInternet';
import RaporHeader from '../../components/rapor/raporHeader';
import moment from 'moment';


var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export class ReaktifRaporScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            dataLoading: true,
            nextMonth: moment().add(1, 'months').format('YYYY-MM'),
            prevMonth: moment().subtract(1, 'months').format('YYYY-MM'),
            inductiveRatio: '',
            capacitivie_ratio: '',
            nextDisabled: true,
            nextColor: '#9e9e9e',
            prevColor: '#80d8ff',
            prevDisabled: false,
            stopFirstTime: '',
            dataNotFound: false,
            deviceUnpaid: false,
            current_period: "",
            lastTime: "",
            tarihMin: new Date(2015, 1, 1),
            tarihMax: new Date()
        }
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
        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            await this.PageDidFocus()
        });
    }

    FilterReport = async (newDate) => {
        this.setState({ dataLoading: true, dataSource: [], deviceUnpaid: false, dataNotFound: false, })
        var dateFormat = moment(newDate).format('YYYY-MM')
        GetReaktifRapor(this, this.props.measuring_device_id, dateFormat)
    }

    NextMonth = () => {
        this.setState({
            dataNotFound: false,
            dataLoading: true,
            dataSource: [],
            prevDisabled: false,
            prevColor: '#80d8ff',
        })
        if (this.state.nextMonth > moment().format('YYYY-MM')) {
            this.setState({ nextDisabled: true, nextColor: '#9e9e9e', dataLoading: false, dataError: true })
            return false
        }
        GetReaktifRapor(this, this.props.measuring_device_id, this.state.nextMonth)
    }

    PrevMonth = () => {
        this.setState({
            dataNotFound: false,
            dataLoading: true,
            dataSource: [],
            nextDisabled: false,
            nextColor: '#80d8ff',
        })
        if (moment(this.state.stopFirstTime, 'DD.MM.YYYY') > moment(this.state.prevMonth, 'YYYY-MM')) {
            this.setState({ prevDisabled: true, prevColor: '#9e9e9e', dataLoading: false, dataError: true })
            return false
        }
        GetReaktifRapor(this, this.props.measuring_device_id, this.state.prevMonth)
    }

    PageDidFocus = async () => {

        this.setState({
            deviceUnpaid: false,
            dataNotFound: false,
            dataLoading: true,
            capacitivie_ratio: "",
            inductiveRatio: "",
            dataSource: [],
            nextDisabled: true,
            nextColor: '#9e9e9e',
            prevDisabled: false,
            prevColor: '#80d8ff',
        })
        await GetReaktifRapor(this, this.props.measuring_device_id, moment().format('YYYY-MM'));
    }

    _renderItem = ({ item }) => (
        <ListItem style={{ height: 15, backgroundColor: "white", marginTop: 2, marginLeft: 0, paddingLeft: 10, paddingRight: 10, borderBottomWidth: 1, borderColor: "#80d8ff" }}>
            <Grid>
                <Row style={{ height: 15 }}>
                    <Col style={{ paddingTop: 5 }}>
                        <Row>
                            <Col>
                                <Text style={{ fontSize: 10, textAlign: "center" }}>{item.date_str}</Text>
                            </Col>
                            <Col>
                                <Text style={{ fontSize: 10, textAlign: "center" }}>% {item.ind_ratio}</Text>
                            </Col>
                            <Col>
                                <Text style={{ fontSize: 10, textAlign: "center" }}>% {item.cap_ratio}</Text>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
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
                        {/*Oranlar */}
                        <View style={{ backgroundColor: 'white', marginTop: 5, borderRadius: 16, marginHorizontal: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: 12 }}>Endüktif Oran </Text>
                                <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: 12 }}>% {this.state.inductiveRatio}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: 12 }}>Kapasitif Oran </Text>
                                <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: 12 }}>% {this.state.capacitivie_ratio}</Text>
                            </View>
                        </View>

                        <View style={{ width:'100%', height: 70, flexDirection: 'row', marginTop: 5,  }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10 }}>
                                <TouchableOpacity color={this.state.prevColor} disabled={this.state.prevDisabled} onPress={() => this.PrevMonth()} style={{ backgroundColor: this.state.prevColor, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 8, padding: 5 }}>
                                    <Icon type="FontAwesome5" name="chevron-left" style={{ fontSize: 20, color: 'white', marginTop: -5 }} />
                                    <Text style={{ marginLeft: 5, color: 'white', fontFamily: 'Poppins-Light', fontSize: 12 }}> Önceki </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, height: 40, }}>
                                <View style={{ width: '100%', height: 40, justifyContent: 'center', alignItems: 'center', }}>
                                    <DatePicker
                                        defaultDate={new Date()}
                                        minimumDate={this.state.tarihMin} 
                                        maximumDate={this.state.tarihMax}
                                        locale={"tr"}
                                        modalTransparent={false}
                                        animationType={"slide"}
                                        androidMode={"default"}
                                        placeHolderText={<Icon type="FontAwesome5" name="calendar-alt" style={{ fontSize: 25, color: '#80d8ff' }} />}
                                        textStyle={{ color: "#80d8ff", fontSize: 14, textAlign: 'center', right: 5 }}
                                        placeHolderTextStyle={{ color: "#80d8ff", fontSize: 14, textAlign: 'center' }}
                                        onDateChange={this.FilterReport}
                                        disabled={false}
                                    />
                                </View>
                                <View style={{ width: '100%', height: 30, }}>
                                    <Text style={{ fontSize: 13, fontFamily: 'Poppins-Regular', textAlign: 'center' }}>{this.state.current_period}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
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
                                    <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Poppins-Light', color: '#aaa' }}>Cihazın ödemesi yapılmamıştır</Text>
                                </View>
                            }

                            {!this.state.dataLoading && !this.state.dataNotFound && !this.state.deviceUnpaid &&
                                <View style={{ flex: 1 }}>
                                    <View>
                                        <View style={{ height: 20 }}>
                                            <Grid>
                                                <Row>
                                                    <Col style={{ paddingTop: 5 }}>
                                                        <Row>
                                                            <Col>
                                                                <Text style={{ fontSize: 12, fontWeight: "bold", textAlign: "center", alignItems: "center", justifyContent: "center", left: 5 }}>Tarih</Text>
                                                            </Col>
                                                            <Col>
                                                                <Text style={{ fontSize: 12, fontWeight: "bold", textAlign: "center", alignItems: "center", justifyContent: "center" }}>Endüktif Oran</Text>
                                                            </Col>
                                                            <Col>
                                                                <Text style={{ fontSize: 12, fontWeight: "bold", textAlign: "center", alignItems: "center", justifyContent: "center" }}>Kapasitif Oran</Text>
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
            </Root>
        )
    }
}

export default ReaktifRaporScreen

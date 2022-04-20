import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';
import moment from 'moment';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export const GetAkımGerilimRapor = async (x, cihazID, date) => {

    let token = await AsyncStorage.getItem('access_token');
    const url = await GetServerSettings().then((keyValue) => { return keyValue; });

    var URL = url + '/devices/instantValues/' + cihazID + "?period=" + date
    console.log(URL)

    return fetch(URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            
            if (responseJson.isSuccess == false && responseJson.code == "2105") {
                x.setState({
                    deviceUnpaid: true,
                    dataNotFound: false,
                    dataLoading: false,
                    prevDisabled: true,
                    prevColor: '#9e9e9e',
                    stopFirstTime: 'veri izni yok',
                    lastTime: 'veri izni yok',
                })
                return false
            }

            if (responseJson.Data.first_and_last.first_packet_time == " --" || responseJson.Data.first_and_last.last_packet_time == " --") {
                x.setState({
                    deviceUnpaid:false,
                    dataNotFound: true,
                    dataLoading: false,
                    prevDisabled: true,
                    prevColor: '#9e9e9e',
                    stopFirstTime: 'veri yok',
                    lastTime: 'veri yok',
                })
                return false
            }

            var stopFirstTime = moment(responseJson.Data.first_and_last.first_packet_time, 'DD/MM/YYYY').format('YYYY-MM')
            var lastTime = moment(responseJson.Data.first_and_last.last_packet_time, 'DD/MM/YYYY').format('YYYY-MM')

            var nextMonthFormated = moment(date, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD')
            var prevMonthFormated = moment(date, 'YYYY-MM-DD').subtract(1, 'days').format('YYYY-MM-DD')

            x.setState({
                deviceUnpaid: false,
                nextMonth: nextMonthFormated,
                prevMonth: prevMonthFormated,
                current_period: moment(date, 'YYYY-MM-DD').format('DD MMMM YYYY'),
                ct_ratio: responseJson.Data.device_info.current_transformer_ratio,
                vt_ratio: responseJson.Data.device_info.voltage_transformer_ratio,
                stopFirstTime: stopFirstTime,
                lastTime: lastTime
            })

            //SAYAÇ -> AKIM-GERİLİM RAPORU
            if (responseJson.Data.device_info.device_category == 1) {
                x.setState({ show: false, AkımTrafoShow: true })
                if (responseJson.Data.device_info.current_transformer_ratio == 1) {
                    responseJson.Data.instant_values.forEach(element => {
                        element.current_L1Raw == ""
                        element.current_L2Raw == ""
                        element.current_L3Raw == ""
                    })
                }
                else {
                    responseJson.Data.instant_values.forEach(element => {
                        element.current_L1Raw = (element.current_l1).toFixed(3)
                        element.current_L2Raw = (element.current_l2).toFixed(3)
                        element.current_L3Raw = (element.current_l3).toFixed(3)
                        var currentRatio = responseJson.Data.device_info.current_transformer_ratio
                        element.current_l1 = (element.current_l1 * currentRatio).toFixed(3)
                        element.current_l2 = (element.current_l2 * currentRatio).toFixed(3)
                        element.current_l3 = (element.current_l3 * currentRatio).toFixed(3)
                    })
                }
                if (responseJson.Data.device_info.voltage_transformer_ratio == 1) {
                    responseJson.Data.instant_values.forEach(element => {
                        element.voltage_L1Raw == ""
                        element.voltage_L2Raw == ""
                        element.voltage_L3Raw == ""
                    })
                }
                else {
                    responseJson.Data.instant_values.forEach(element => {
                        element.voltage_L1Raw = (element.voltage_l1).toFixed(3)
                        element.voltage_L2Raw = (element.voltage_l2).toFixed(3)
                        element.voltage_L3Raw = (element.voltage_l3).toFixed(3)
                        var voltageRatio = responseJson.Data.device_info.voltage_transformer_ratio
                        element.voltage_l1 = element.voltage_l1 * voltageRatio
                        element.voltage_l2 = element.voltage_l2 * voltageRatio
                        element.voltage_l3 = element.voltage_l3 * voltageRatio
                    })
                }
            }

            //RÖLE VE ANALİZÖR -> AKIM_GERİLİM RAPORU
            if (responseJson.Data.device_info.device_category == 2 || responseJson.Data.device_info.device_category == 3) {
                x.setState({ show: true, reaktifShow: false, AkımTrafoShow: false })
                responseJson.Data.instant_values.forEach(element => {
                    element.current_l1 = element.current_l1.toFixed(3)
                    element.current_l2 = element.current_l2.toFixed(3)
                    element.current_l3 = element.current_l3.toFixed(3)
                    element.voltage_l1 = element.voltage_l1.toFixed(3)
                    element.voltage_l2 = element.voltage_l2.toFixed(3)
                    element.voltage_l3 = element.voltage_l3.toFixed(3)
                })
            }

            responseJson.Data.instant_values.forEach(element => {
                element.date_record = moment(element.date_record, 'YYYY-MM-DD h:mm:ss').format('h:mm:ss')
            })

            for (let i = 0; i < responseJson.Data.instant_values.length; i++) {
                x.state.dataSource.push(responseJson.Data.instant_values[i]);
            }

            if (responseJson.Data.instant_values == "" || responseJson.Data.device_info == "") {
                x.setState({ dataNotFound: true, deviceUnpaid: false, dataLoading: false });
                return false
            }
            x.setState({ dataLoading: false, deviceUnpaid: false, dataNotFound: false })
        })

        .catch((error) => {
            console.error(error);
        });

}
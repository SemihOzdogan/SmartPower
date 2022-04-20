import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';
import moment from 'moment';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export const GetTuketimRapor = async (x, cihazID, date) => {

    let token = await AsyncStorage.getItem('access_token');
    const url = await GetServerSettings().then((keyValue) => { return keyValue; });

    var URL = url + '/devices/' + x.state.rapor + '/' + cihazID + "?period=" + date
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
                    deviceUnpaid: false,
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

            x.setState({ stopFirstTime: stopFirstTime, lastTime: lastTime })

            if (x.state.saat_active == true) {
                var nextHourFormated = moment(date, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD')
                var prevHourFormated = moment(date, 'YYYY-MM-DD').subtract(1, 'days').format('YYYY-MM-DD')
                x.setState({
                    nextHour: nextHourFormated,
                    prevHour: prevHourFormated,
                    current_period: moment(date, 'YYYY-MM-DD').format('DD MMMM YYYY'),
                })
                responseJson.Data.hourly_table.forEach(element => {
                    element.date_record = moment(element.date_record).format('LT')
                })
                for (let i = 0; i < responseJson.Data.hourly_table.length; i++) {
                    x.state.dataSource.push(responseJson.Data.hourly_table[i]);
                }
            } else if (x.state.gun_active == true) {
                var nextDayFormated = moment(date, 'YYYY-MM-DD').add(1, 'months').format('YYYY-MM')
                var prevDayFormated = moment(date, 'YYYY-MM-DD').subtract(1, 'months').format('YYYY-MM')
                x.setState({
                    nextDay: nextDayFormated,
                    prevDay: prevDayFormated,
                    current_period: moment(date, 'YYYY-MM').format('MMMM YYYY'),
                })
                responseJson.Data.daily_table.forEach(element => {
                    element.date_record = moment(element.date_record).format('L')
                })
                for (let i = 0; i < responseJson.Data.daily_table.length; i++) {
                    x.state.dataSource.push(responseJson.Data.daily_table[i]);
                }
            }
            else if (x.state.ay_active == true) {
                var nextMonthFormated = moment(date, 'YYYY-01').add(1, 'years').format('YYYY-01')
                var prevMonthFormated = moment(date, 'YYYY-01').subtract(1, 'years').format('YYYY-01')
                x.setState({
                    deviceUnpaid: false,
                    nextMonth: nextMonthFormated,
                    prevMonth: prevMonthFormated,
                    current_period: moment(date, 'YYYY-01').format('YYYY'),
                })
                responseJson.Data.monthly_table.forEach(element => {
                    element.date_record = moment(element.date_record, 'MMMM YYYY').format('MMM')
                })
                for (let i = 0; i < responseJson.Data.monthly_table.length; i++) {
                    x.state.dataSource.push(responseJson.Data.monthly_table[i]);
                }
            }

            if (responseJson.Data.first_and_last == "" || responseJson.Data.hourly_table == "" || responseJson.Data.daily_table == "" || responseJson.Data.monthly_table == "") {
                x.setState({ dataNotFound: true, deviceUnpaid: false, dataLoading: false });
                return false
            }
            x.setState({ dataLoading: false, deviceUnpaid: false, dataNotFound: false })
        })
        .catch((error) => {
            console.error(error);

        });
}
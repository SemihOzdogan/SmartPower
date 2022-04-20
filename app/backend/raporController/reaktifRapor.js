import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';
import moment from 'moment';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export const GetReaktifRapor = async (x, cihazID, date) => {

    let token = await AsyncStorage.getItem('access_token');
    const url = await GetServerSettings().then((keyValue) => { return keyValue; });

    var URL = url + '/devices/report/' + cihazID + "?period=" + date
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
                    dataLoading: false,
                    deviceUnpaid: true,
                    dataNotFound: false,
                    prevDisabled: true,
                    prevColor: '#9e9e9e',
                    stopFirstTime: 'veri izni yok',
                    lastTime: 'veri izni yok',
                })
                return false
            }
            
            if (responseJson.Data.first_and_last.first_packet_time == " --" || responseJson.Data.first_and_last.last_packet_time == " --") {
                x.setState({
                    dataLoading: false,
                    deviceUnpaid: false,
                    dataNotFound: true,
                    prevDisabled: true,
                    prevColor: '#9e9e9e',
                    stopFirstTime: 'veri yok',
                    lastTime: 'veri yok',
                })

                return false
            }

            var stopFirstTime = moment(responseJson.Data.first_and_last.first_packet_time, 'DD/MM/YYYY').format('DD.MM.YYYY')
            var lastTime = moment(responseJson.Data.first_and_last.last_packet_time, 'DD/MM/YYYY').format('DD.MM.YYYY')

            var nextMonthFormated = moment(date, 'YYYY-MM').add(1, 'months').format('YYYY-MM')
            var prevMonthFormated = moment(date, 'YYYY-MM').subtract(1, 'months').format('YYYY-MM')
            x.setState({
                deviceUnpaid: false,
                nextMonth: nextMonthFormated,
                prevMonth: prevMonthFormated,
                current_period: moment(date, 'YYYY-MM').format('MMMM YYYY'),
                stopFirstTime: stopFirstTime,
                lastTime: lastTime,
            })

            if (responseJson.Data.first_and_last == "" || responseJson.Data.reactive_table == "") {
                x.setState({ dataNotFound: true, deviceUnpaid: false, dataLoading: false });
                return false
            }

            x.setState({
                inductiveRatio: responseJson.Data.first_and_last.inductive_ratio,
                capacitivie_ratio: responseJson.Data.first_and_last.capacitive_ratio,
            })

            for (let i = 0; i < responseJson.Data.reactive_table.length; i++) {
                x.state.dataSource.push(responseJson.Data.reactive_table[i]);
            }
            x.setState({ dataLoading: false, deviceUnpaid: false, dataNotFound: false })
        })

        .catch((error) => {
            console.error(error);
        });

}
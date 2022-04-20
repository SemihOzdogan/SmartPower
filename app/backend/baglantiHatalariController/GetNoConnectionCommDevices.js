import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export const GetNoConnectionCommDevices = async (x, start, length, refreshPage) => {

    if (refreshPage == 1) {
        start = 0
    }
    let token = await AsyncStorage.getItem('access_token');
    const url = await GetServerSettings().then((keyValue) => { return keyValue; });

    var URL = url + '/noConnectionCommDevices' + '?start=' + start + '&length=' + length
    console.log(URL)

    return fetch(URL, {

        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {

            x.setState({
                bk_ModemSayisi: responseJson.Data.records_total,
                dataLoading: false
            });

            responseJson.Data.data.forEach(element => {
                if (element.last_packet_time != null && element.last_packet_time != "") {
                    element.last_packet_time = moment(element.last_packet_time).format('L')
                } else {
                    element.last_packet_time = '-'
                }

                if (element.location_name != null && element.location_name != '' && element.location_name != "undefined") {
                    var dizi = element.location_name.split();
                    var uzunluk = dizi[0].length;
                    if (uzunluk >= 30) {
                        element.location_name = element.location_name.slice(0, 30) + '...';
                    }
                } else {
                    element.location_name = '-'
                }
            })

            if (refreshPage == 1) {
                x.setState({ dataSource: x.state.dataSource });
            } else {
                if (x.state.dataSource.length < responseJson.Data.records_total) {
                    for (let i = 0; i < responseJson.Data.data.length; i++) {
                        x.state.dataSource.push(responseJson.Data.data[i]);
                    }
                    for (let i = 0; i < x.state.dataSource.length; i++) {
                        x.state.dataSource[i].temp_id = (i + 1)
                    }
                }
            }

            x.setState({ loading: false, refresing: false });
        })
        .catch((error) => {
            console.error(error);
            x.setState({ loading: false, refresing: false })
        });
}

import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export const GetNoConnectionDevices = async (x, start, length, refreshPage) => {

    if (refreshPage == 1) {
        start = 0
    }
    let token = await AsyncStorage.getItem('access_token');
    const url = await GetServerSettings().then((keyValue) => { return keyValue; });

    var URL = url + '/noConnectionDevices' + '?start=' + start + '&length=' + length
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
                bk_CihazSayisi: responseJson.Data.records_total,
                dataLoading: false
            });

            responseJson.Data.data.forEach(element => {
                if (element.measuring_last_packet_time != null && element.measuring_last_packet_time != "" && element.measuring_last_packet_time != "undefined") {
                    element.measuring_last_packet_time = moment(element.measuring_last_packet_time).format('L')
                } else {
                    element.measuring_last_packet_time = '-'
                }

                if (element.measuring_location_name != null && element.measuring_location_name != '' && element.measuring_location_name != "undefined") {
                    var dizi = element.measuring_location_name.split();
                    var uzunluk = dizi[0].length;
                    if (uzunluk >= 30) {
                        element.measuring_location_name = element.measuring_location_name.slice(0, 30) + '...';
                    }
                } else {
                    element.measuring_location_name = '-'
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

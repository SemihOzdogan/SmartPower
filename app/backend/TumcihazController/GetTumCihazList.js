import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';
import moment from 'moment';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

// export const PagesNames = (device_category) => {
//     var ReportPageName;
//     var SettingsPageName;
//     switch (device_category) {
//         case 1:
//         case 2:
//             ReportPageName = 'ReaktifRapor'
//             SettingsPageName = 'SettingsPage'
//             break;
//         case 3:
//             ReportPageName = 'TuketimRapor';
//             SettingsPageName = 'SettingsPage'
//             break;
//         default:
//             ReportPageName = 'BlankPage';
//             SettingsPageName = 'BlankPage'
//             break;
//     }

//     return { 'settingsPageName': SettingsPageName, 'ReportPageName': ReportPageName };
// }

export const GetDevice = async (x, start, length, refreshPage) => {

    if (refreshPage == 1) {
        start = 0
    }

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var device_id = x.state.device_id
    var location = x.state.location
    var mesauringDevice = x.state.measuringID;

    if ((device_id == null || device_id == 'undefined' || device_id == "") && (location == null || location == 'undefined' || location == "") && (mesauringDevice == null || mesauringDevice == 'undefined' || mesauringDevice == "")) {
        device_id = "";
        location = "";
        mesauringDevice = "";

    } else {
        device_id = x.state.device_id;
        location = x.state.location;
        mesauringDevice = x.state.measuringID;
    }

    var URL = url + '/devices' + '?start=' + start + '&length=' + length + '&filter[measuring_location_name]=' + location + '&filter[comm_device_id]=' + device_id + '&filter[measuring_device_id]=' + mesauringDevice
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
                CihazSayisi: responseJson.Data.records_total,
                dataLoading: false
            });

            responseJson.Data.data.forEach(element => {

                // var pagesNames = PagesNames(element.device_category);

                // element.report_pagename = pagesNames.ReportPageName;
                // element.settings_pagename = pagesNames.SettingsPageName;

                if (element.device_last_packet_time != null) {
                    element.device_last_packet_time = moment(element.device_last_packet_time).format('L')
                } else {
                    element.device_last_packet_time = '-'
                }
                if (element.measuring_last_packet_time != null) {
                    element.measuring_last_packet_time = moment(element.measuring_last_packet_time).format('L')
                } else {
                    element.measuring_last_packet_time = '-'
                }
                if (element.measuring_location_name == null || element.measuring_location_name == "" || element.measuring_location_name == 'undefined') {
                    element.measuring_location_name = '-'
                }
            });


            if (refreshPage == 1) {
                x.setState({ dataSource: x.state.dataSource });
            } else {
                if (x.state.dataSource != undefined && x.state.dataSource.length < responseJson.Data.records_total) {
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
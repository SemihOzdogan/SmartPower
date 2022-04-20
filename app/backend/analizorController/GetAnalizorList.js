import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export const GetAnalyzers = async (x, start, length, refreshPage) => {

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    if (refreshPage == 1) {
        start = 0
    }

    var device_id = x.state.device_id
    var location = x.state.location
    var mesauringDevice = x.state.measuringID

    if ((device_id == null || device_id == 'undefined' || device_id == "") && (location == null || location == 'undefined' || location == "") && (mesauringDevice == null || mesauringDevice == 'undefined' || mesauringDevice == "")) {
        device_id = "";
        location = "";
        mesauringDevice = "";

    } else {
        device_id = x.state.device_id;
        location = x.state.location;
        mesauringDevice = x.state.measuringID;
    }
    
    var URL = url + '/analyzers' + '?start=' + start + '&length=' + length + '&filter[measuring_location_name]=' + location + '&filter[comm_device_id]=' + device_id + '&filter[measuring_device_id]=' + mesauringDevice
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
                AnalizorSayisi: responseJson.Data.records_total,
                dataLoading: false
            });

            responseJson.Data.data.forEach(element => {

                element.measuring_last_packet_time = moment(element.measuring_last_packet_time).format('L')
                if (element.capacitive_ratio >= element.capacitive_limit) {
                    element.capacitiveTextColor = "white";
                    element.capacitiveBackgroundColor = "#E15E5E";
                } else {
                    element.capacitiveTextColor = "black";
                    element.capacitiveBackgroundColor = "transparent";
                }
                if (element.inductive_ratio >= element.inductive_limit) {
                    element.inductiveTextColor = "white";
                    element.inductiveBackgroundColor = "#E15E5E";
                } else {
                    element.inductiveTextColor = "black";
                    element.inductiveBackgroundColor = "transparent";
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
                        x.state.dataSource[i].temp_id = (i + 1);
                    }
                }

            }
            x.setState({ loading: false, refresing: false });
        })
        .catch((error) => {
            console.error(error);
            x.setState({ loading: false, refresing: false });
        });
}
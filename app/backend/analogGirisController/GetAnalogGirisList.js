import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';
import moment from 'moment';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export const GetAnalogGiris = async (x, start, length, refreshPage) => {

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

    var URL = url + '/analogSensors' + '?start=' + start + '&length=' + length + '&filter[measuring_location_name]=' + location + '&filter[comm_device_id]=' + device_id + '&filter[measuring_device_id]=' + mesauringDevice
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
                AnalogGirisSayisi: responseJson.Data.data.records_total,
                dataLoading: false
            });

            responseJson.Data.data.data.forEach(element => {
                // if (element.last_packet_time != null) {
                //     element.last_packet_time = moment(element.last_packet_time).format('L')
                // } else {
                //     element.last_packet_time = '-'
                // }
                if (element.measuring_location_name == null || element.measuring_location_name == '' || element.measuring_location_name == 'undefined') {
                    element.measuring_location_name = '-'
                }
            });

            if (refreshPage == 1) {
                x.setState({ dataSource: x.state.dataSource });
            } else {
                if (x.state.dataSource.length < responseJson.Data.data.records_total) {
                    for (let i = 0; i < responseJson.Data.data.data.length; i++) {
                        x.state.dataSource.push(responseJson.Data.data.data[i]);
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
export const GetAnalogData = async (x, Id, Type) => {

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + '/analogSensorsLastValues/' + Id + '?device_type=' + Type
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
                analogData: responseJson.Data,
                loading: false
            });
        })
        .catch((error) => {
            console.error(error);
        });
}
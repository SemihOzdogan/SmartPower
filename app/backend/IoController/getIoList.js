import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export const GetIO = async (x, start, length, refreshPage) => {

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

    var URL = url + '/io' + '?start=' + start + '&length=' + length + '&measuring_device_id=' + mesauringDevice + '&comm_device_id=' + device_id + '&location_name=' + location
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
                IOSayisi: responseJson.Data.recordsTotal,
                dataLoading: false
            });
            responseJson.Data.io_modules.forEach(element => {
                if (element.modem_location == null || element.modem_location == "" || element.modem_location == 'undefined') {
                    element.modem_location = '-'
                }

                if (element.module_type == 3) {
                    if (element.modem_location == null || element.modem_location == "" || element.modem_location == 'undefined') {
                        element._location = "-"
                    }
                    else {
                        element._location = element.modem_location
                    }
                }

                if (element.module_type != 3) {
                    if (element.location == null || element.location == "" || element.location == 'undefined') {
                        element._location = "-"
                    }
                    else {
                        element._location = element.location
                    }
                }

                if (element.last_status_time == null || element.last_status_time == "" || element.last_status_time == 'undefined') {
                    element.last_status_time = '-'
                }
                else {
                    element.last_status_time = moment(element.last_status_time, 'YYYY-MM-D hh:mm:ss').format('MMMM YYYY')
                }
                if (element.last_change_time == null || element.last_change_time == "" || element.last_change_time == 'undefined') {
                    element.last_change_time = '-'
                }
                let iconArray = []
                if (element.payment_state != "close") {
                    element.output_status.forEach(outputStatus => {
                        element.output_desired_status.forEach(desiredStatus => {
                            if (outputStatus != desiredStatus) {
                                iconArray.push(true)
                            } else {
                                iconArray.push(false)
                            }
                        });
                    });
                    element.iconVar = iconArray
                }
            });
            if (refreshPage == 1) {
                x.setState({ dataSource: x.state.dataSource });
            } else {
                if (x.state.dataSource != undefined) {
                    for (let i = 0; i < responseJson.Data.io_modules.length; i++) {
                        x.state.dataSource.push(responseJson.Data.io_modules[i]);
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
import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';
import moment from 'moment';
import { Toast } from 'native-base';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export const GetConnectDevicesSettings = async (x, modemNo) => {

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + '/commdevice/commDeviceSettings' + '?comm_device_id=' + modemNo
    console.log(URL)

    return fetch(URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {

            x.setState({ meterStatus: responseJson.Data.modem_info.is_transparent })
            if (responseJson.Data.measuring_devices_info.measuring_devices == "") {
                x.setState({ isDevices: true, dataLoading: false })
                return false;
            }
            else {
                responseJson.Data.measuring_devices_info.measuring_devices.forEach(element => {
                    if (element.payment_date != null && element.payment_date != '' && element.payment_state != "free") {
                        element.warningColor = "white"
                        element.warningTextColor = "black"
                        element.payment_date = moment(element.payment_date).format('L')
                    } else {
                        element.payment_date = '--'
                        if (element.payment_state == "free") {
                            element.payment_date = 'Ödemeden Muaf'
                            element.warningColor = "#581845"
                            element.warningTextColor = "white"
                        }
                    }
                    if (element.first_data_time != null && element.first_data_time != '') {
                        element.first_data_time = moment(element.first_data_time).format('L')
                    } else {
                        element.first_data_time = '--'
                    }
                    if (element.last_data_time != null && element.last_data_time != '') {
                        element.last_data_time = moment(element.last_data_time).format('L')
                    } else {
                        element.last_data_time = '--'
                    }
                    if (element.location != null && element.location != '' && element.location != 'undefined') {
                    } else {
                        element.location = '-'
                    }
                });
                x.setState({
                    isDevices: false,
                    dataSource: responseJson.Data.measuring_devices_info.measuring_devices,
                    dataLoading: false,
                })
                for (let i = 0; i < x.state.dataSource.length; i++) {
                    x.state.dataSource[i].temp_id = (i + 1)
                }
            }

        })
        .catch((error) => {
            console.error(error);
        });
}

export const PostAddMeters = async (x, modemNo) => {

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');
    var URL = url + '/commdevice/insertMeter' + '?comm_device_id=' + modemNo + '&meter_id=' + x.state.meterID
    if (x.state.meterID != "") {
        if (x.state.meterID.length == 11 || x.state.meterID == 14) {
            data = x.state.meterID.slice(0, 3)
            var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
            for (i = 0; i < 3; i++) {
                if (alphabet.includes(data[i])) {
                    if (i == 2) {
                        return fetch(URL, {
                            method: 'POST',
                            headers: {
                                'Authorization': 'Bearer ' + token
                            }
                        })
                            .then((response) => response.json())
                            .then((responseJson) => {
                                Toast.show({
                                    text: responseJson.Data.message,
                                    duration: 3000,
                                    textStyle: { color: "white", fontSize: 14, textAlign: 'center' },
                                    type: responseJson.IsSuccess == true ? "success" : "danger",
                                })
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }
                }
                else {
                    console.log('ilk 3 karakter harf olmalıdır.');
                }
            }
        }
    }
}

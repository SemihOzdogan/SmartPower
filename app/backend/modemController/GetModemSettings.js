import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';
import { Toast } from 'native-base';
import moment from 'moment';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export const GetComdeviceSettings = async (x, modemNo) => {

    x.setState({ dataLoading: true })

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

            var DATA = responseJson.Data.modem_info
            var _deviceLastTime, _deviceUretim, _signalStatus, _IOEnabled;

            if (DATA.last_packet_time != "" && DATA.last_packet_time != null) {
                var _deviceLastTime = moment(DATA.last_packet_time).format('L')
            } else {
                var _deviceLastTime = "---"
            }
            if (DATA.date_device_sold != "" && DATA.date_device_sold != null) {
                var _deviceUretim = moment(DATA.date_device_sold).format('L')
            } else {
                var _deviceUretim = "---"
            }
            if (responseJson.Data.signal_quality_info == "") {
                _signalStatus = "---"
            } else {
                _signalStatus = responseJson.Data.signal_quality_info.signal_level_str
            }
            if (DATA.io_enabled == 1) {
                _IOEnabled = true
            } else {
                _IOEnabled = false
            }

            x.setState({
                dataLoading: false,
                modemInfo: responseJson.Data.modem_info,
                location: DATA.location_name,
                deviceUretim: _deviceUretim,
                deviceLastTime: _deviceLastTime,
                signalStatus: _signalStatus,
                IOCheck: _IOEnabled
            })

            if (DATA.lat == null || DATA.lng == null) {
                x.setState({ latitude: '', longitude: '' })
                return false;
            }

            var _lat = DATA.lat.toString()
            var _lng = DATA.lng.toString()
            x.setState({ latitude: _lat, longitude: _lng })

        })
        .catch((error) => {
            console.error(error);
        });
}

export const GetComdeviceSettingsUpdate = async (x, modemNo) => {

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + '/commdevice/commDeviceSettings' + '?comm_device_id=' + modemNo + '&location_name=' + x.state.location + '&lat=' + x.state.latitude + '&lng=' + x.state.longitude + '&io_enabled=' + x.state.SubmitIO
    console.log(URL)

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
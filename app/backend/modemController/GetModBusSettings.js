import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';
import moment from 'moment';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export const GetModBusSettings = async (x, modemNo) => {

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

            
            // x.setState({ dataType: responseJson.Data.device_type_list_info, })

            // for (let index = 1; index < 248; index++) {
            //     x.state.dataAdress.push(index.toString())
            // }
            
            var data = responseJson.Data.modbus_devices_info.modbus_devices;
            if (data == "" || data == null || data == undefined) {
                x.setState({ isModbus: true, dataLoading: false })
                return false
            }

            x.setState({
                isModbus: false,
                dataSource: data,
                dataLoading: false,
            })

        })
        .catch((error) => {
            console.error(error);
        });
}

export const PostModBusSettings = async (x, modemNo, modbusSTR) => {

    x.setState({ dataLoading: true })

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');
    var data = JSON.stringify(modbusSTR)
    var URL = url + '/commdevice/updateModemModbusDevice' + '?comm_device_id=' + modemNo + '&modbus_str=' + data

    return fetch(URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {

            x.setState({ dataLoading: false })
        })
        .catch((error) => {
            console.error(error);
        });
}
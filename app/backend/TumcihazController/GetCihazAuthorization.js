import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';
import moment from 'moment';
import { Toast } from 'native-base';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export const GetDeviceAuth = async (x, deviceNo) => {


    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + '/devices/authUser' + '?device_id=' + deviceNo
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
                dataSourceAuth: responseJson.Data.auth,
                dataSourceNoAuth: responseJson.Data.no_auth,
                dataLoading: false,
            })
        })
        .catch((error) => {
            console.error(error);
            x.setState({ dataLoading: false, refresing: false })
        });
}
export const PostDeviceAuth = async (UserID, deviceNo, modemNo) => {



    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + '/devices/authUser' + '?device_id=' + deviceNo + '&user_id=' + UserID + '&comm_device_id=' + modemNo
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
                duration: 1500,
                textStyle: { color: "white", fontSize: 12, textAlign: 'center' },
                type: responseJson.IsSuccess == true ? "success" : "danger",
            })
        })
        .catch((error) => {
            console.error(error);
        });
}
export const DeleteDeviceAuth = async (UserID, deviceNo, modemNo) => {

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + '/devices/authUser' + '?device_id=' + deviceNo + '&user_id=' + UserID + '&comm_device_id=' + modemNo
    console.log(URL)

    return fetch(URL, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {

            Toast.show({
                text: responseJson.Data.message,
                duration: 1500,
                textStyle: { color: "white", fontSize: 12, textAlign: 'center' },
                type: responseJson.IsSuccess == true ? "success" : "danger",
            })
        })
        .catch((error) => {
            console.error(error);
            x.setState({ dataLoading: false, refresing: false })
        });
}
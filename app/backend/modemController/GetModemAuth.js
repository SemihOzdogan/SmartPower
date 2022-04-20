import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';
import moment from 'moment';
import { Toast } from 'native-base';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export const GetComdeviceAuth = async (x, modemNo) => {


    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + '/commdevice/authUser' + '?comm_device_id=' + modemNo
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
            x.setState({ loading: false, refresing: false })
        });
}
export const PostComdeviceAuth = async (UserID, modemNo) => {


    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + '/commdevice/authUser' + '?comm_device_id=' + modemNo + '&user_id=' + UserID
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
                type: responseJson.IsSuccess ? "success" : "danger",
            })
        })
        .catch((error) => {
            x.setState({ loading: false, refresing: false })
        });
}
export const DeleteComdeviceAuth = async (UserID, modemNo) => {


    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + '/commdevice/authUser' + '?comm_device_id=' + modemNo + '&user_id=' + UserID
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
                type: responseJson.IsSuccess ? "success" : "danger",
            })
        })
        .catch((error) => {
            console.error(error);
            x.setState({ loading: false, refresing: false })
        });
}
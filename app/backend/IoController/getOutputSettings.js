import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';
import { Toast } from 'native-base';

export const GetOutputSettings = async (x, type, ID) => {

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');
    var URL = url + '/io/ioOutputSettings' + '?module_id=' + ID + '&module_type=' + type
    console.log(URL)

    return fetch(URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            var data = responseJson.Data.ioOutputSettingsInfo
            var devices = responseJson.Data.analyzerInfo
            x.setState({
                dataLoading: false,
                dataSource: data,
                dataDevices: devices
            })
        })
        .catch((error) => {
            console.error(error);
        });
}

export const UpdateDesiredStatus = async (x, ID, type, channel, mod, status) => {
    x.setState({ dataLoading: true })
    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');
    var _status = status == true ? 1 : 0
    var URL = url + '/io/ioDesiredStatusUpdate' + '?module_id=' + ID + '&module_type=' + type + '&channel=' + channel + '&control_mode=' + mod + '&desired_status=' + _status
    console.log(URL)

    return fetch(URL, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            x.setState({ dataLoading: false })
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

export const OutputUpdate = async (type, ID, outputInfo) => {
    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');
    var postData = JSON.stringify(outputInfo)
    const data = { module_id: ID, module_type: type, output_info: postData };
    var URL = url + '/io/ioOutputSettings'
    return fetch(URL, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
            console.log(error);
        });
}


import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';
import { Toast } from 'native-base';
import moment from 'moment';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export const GetTemperatureSensorSettings = async (x, sıcaklıkSensorNo) => {

    x.setState({ dataLoading: true })

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + '/temperatureSensorsSettings' + '?sensor_id=' + sıcaklıkSensorNo
    console.log(URL)

    return fetch(URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            var DataSource = responseJson.Data.sensor_settings;

            x.setState({
                data: DataSource,
                locationAdress: DataSource.location_address,
                isletmeAd: DataSource.location_name,
                not: DataSource.notes,
                veriGondermeAralıgı: DataSource.period.toString(),
                tesisatNo: DataSource.tesisat_no,
                dataLoading: false
            })
        })
        .catch((error) => {
            console.error(error);
        });
}

export const PostTemperatureSensorSettingsUpdate = async (x, sıcaklıkSensorNo) => {

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var paramArray = {
        sensor_id: sıcaklıkSensorNo,
        location_name: x.state.isletmeAd,
        tesisat_no: x.state.tesisatNo,
        location_address: x.state.locationAdress,
        notes: x.state.not,
        period: x.state.veriGondermeAralıgı
    }

    let formdata = new FormData();
    Object.keys(paramArray).forEach(function (key) {
        formdata.append(key, paramArray[key]);
    })

    var URL = url + '/temperatureSensorsSettings'
    console.log(URL)

    return fetch(URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formdata
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
import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';
import { Toast } from 'native-base';
import moment from 'moment';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export const GetAnalizorSettings = async (x, analizorNo) => {

    x.setState({ dataLoading: true })

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + '/analyzersSettings' + '?analyzers_id=' + analizorNo
    console.log(URL)

    return fetch(URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            var DataSource = responseJson.Data.device_settings;
            var _lat = DataSource.lat.toString()
            var _lng = DataSource.lon.toString()
            var _aboneNo = DataSource.tesisat_no.toString()
            var _faturaGunu = DataSource.day_of_invoice.toString()
            var _sozlesmeGucu = DataSource.sozlesme_gucu.toString()
            var _exportData = DataSource.export_data_visible.toString()
            var _MailAlert;

            if (DataSource.mail_alert == 1) {
                _MailAlert = true
            } else {
                _MailAlert = false
            }
            x.setState({
                data: DataSource,
                location: DataSource.location_name,
                latitude: _lat,
                longitude: _lng,
                aboneNo: _aboneNo,
                locationAdress: DataSource.location_address,
                not: DataSource.notes,
                faturaGunu: _faturaGunu,
                sozlesmeGucu: _sozlesmeGucu,
                exportData: _exportData,
                mailAlert: _MailAlert,
                dataLoading: false
            })
        })
        .catch((error) => {
            console.error(error);
        });
}

export const PostAnalizorSettingsUpdate = async (x, relayNo) => {

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');
    var paramArray = {
        relay_id: relayNo,
        location_name: x.state.location,
        lon: x.state.longitude,
        lat: x.state.latitude,
        tesisat_no: x.state.aboneNo,
        location_address: x.state.locationAdress,
        notes: x.state.not,
        day_of_invoice: x.state.faturaGunu,
        sozlesme_gucu: x.state.sozlesmeGucu,
        export_data_visible: x.state.exportData == "Evet" ? 1 : 0,
        mail_alert: x.state.submitMailAlert,
    }

    let formdata = new FormData();
    Object.keys(paramArray).forEach(function (key) {
        formdata.append(key, paramArray[key]);
    })

    var URL = url + '/relaysSettings'
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
            console.log(responseJson)
        })
        .catch((error) => {
            console.error(error);
        });
}
import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';
import moment from 'moment';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export const GetAlarm = async (x, start, length, refreshPage) => {

    if (refreshPage == 1) {
        start = 0
    }

    let token = await AsyncStorage.getItem('access_token');
    const url = await GetServerSettings().then((keyValue) => { return keyValue; });

    var type = x.state.type
    var location = x.state.location
    var device_ID = x.state.measuringID

    if ((type == null || type == 'undefined' || type == "") && (location == null || location == 'undefined' || location == "") && (device_ID == null || device_ID == 'undefined' || device_ID == "")) {
        type = "";
        location = "";
        device_ID = "";

    } else {
        type = x.state.type;
        location = x.state.location;
        device_ID = x.state.measuringID;
    }

    var URL = url + '/alarms' + '?start=' + start + '&length=' + length + '&filter[AlarmType]=' + type + '&filter[Location]=' + location + '&filter[DeviceId]=' + device_ID
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
                AlarmSayisi: responseJson.Data.records_total,
                dataLoading: false
            });

            responseJson.Data.data.forEach(element => {
                if (element.BeginDate != null) {
                    element.BeginDate = moment(element.BeginDate).format('L')
                } else {
                    element.BeginDate = '-'
                }

                if (element.EndDate !== null) {
                    element.EndDate = moment(element.EndDate).format('L')
                }
                else {
                    element.EndDate = 'Alarmınız Aktif Durumdadır'
                }

                if (element.Location != null && element.Location != '' && element.Location != "undefined") {
                    var dizi = element.Location.split();
                    var uzunluk = dizi[0].length;
                    if (uzunluk > 35) {
                        element.Location = element.Location.slice(0, 35) + '...'
                        element.shortLocation = element.Location.slice(0, 25) + '...'
                    }
                    else if (uzunluk <= 35 && uzunluk >= 25) {
                        element.Location = element.Location.slice(0, 35)
                        element.shortLocation = element.Location.slice(0, 25) + '...'
                    }
                    else if (uzunluk <= 25) {
                        element.Location = element.Location.slice(0, 25)
                        element.shortLocation = element.Location.slice(0, 25)

                    }
                } else {
                    element.Location = 'Konum Bilgisi Yok'
                    element.shortLocation = 'Konum Bilgisi Yok'
                }
            })

            if (refreshPage == 1) {
                x.setState({ dataSource: x.state.dataSource });
            } else {
                if (x.state.dataSource.length < responseJson.Data.records_total) {
                    for (let i = 0; i < responseJson.Data.data.length; i++) {
                        x.state.dataSource.push(responseJson.Data.data[i]);
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

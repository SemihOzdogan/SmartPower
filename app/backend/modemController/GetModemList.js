import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';
import moment from 'moment';


var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export const GetComdevice = async (x, start, length, refreshPage) => {

    if (refreshPage == 1) {
        start = 0
    }

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var type = x.state.type
    var location = x.state.location
    var commdevice_ID = x.state.measuringID;


    if ((type == null || type == 'undefined' || type == "") && (location == null || location == 'undefined' || location == "") && (commdevice_ID == null || commdevice_ID == 'undefined' || commdevice_ID == "")) {
        type = "";
        location = "";
        commdevice_ID = "";

    } else {
        type = x.state.type;
        location = x.state.location;
        commdevice_ID = x.state.measuringID;
    }

    var URL = url + '/commdevice' + '?start=' + start + '&length=' + length + '&filter[communication_type]=' + type + '&filter[location_name]=' + location + '&filter[comm_device_id]=' + commdevice_ID
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
                ModemSayisi: responseJson.Data.records_total,
                dataLoading: false
            });

            responseJson.Data.data.forEach(element => {
                if (element.last_packet_time != null) {
                    element.last_packet_time = moment(element.last_packet_time).format('L')
                } else {
                    element.last_packet_time = '-'
                }
                if (element.location_name != null && element.location_name != '') {
                } else {
                    element.location_name = '-'
                }
                if (element.communication_type == "Ethernet") {
                    element.imageURL = require('../../frontend/images/Ethernet.png');
                } else if (element.communication_type == "GPRS") {
                    element.imageURL = require('../../frontend/images/GPRS.png');
                }
                else {
                    element.imageURL = require('../../frontend/images/GSM.png');
                }
            });

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
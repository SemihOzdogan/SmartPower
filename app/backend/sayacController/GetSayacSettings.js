import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';
import { Toast } from 'native-base';
import moment from 'moment';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export const GetMeterSettings = async (x, meterNo) => {

    x.setState({ dataLoading: true })

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + '/metersSettings' + '?meter_id=' + meterNo
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
            var _gerilimOran = DataSource.vt_ratio.toString()
            var _akımOran = DataSource.ct_ratio.toString()
            var _faturaGunu = DataSource.day_of_invoice.toString()
            var _baglantıTuru = DataSource.meter_connection_type.toString()
            var _sozlesmeGucu = DataSource.sozlesme_gucu.toString()
            var _veriGondermeAralıgı = DataSource.data_read_period.toString()
            var _PTF = DataSource.is_ptf.toString()
            var _veriZamanı = DataSource.is_server_time.toString()
            var _exportData = DataSource.export_data_visible.toString()
            var _tipKodu = DataSource.meter_type_code.toString()

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
                gerilimOran: _gerilimOran,
                akımOran: _akımOran,
                faturaGunu: _faturaGunu,
                baglantıTuru: _baglantıTuru,
                sozlesmeGucu: _sozlesmeGucu,
                veriGondermeAralıgı: _veriGondermeAralıgı,
                mailAlert: _MailAlert,
                PTFUyumlu: _PTF,
                veriZamanı: _veriZamanı,
                exportData: _exportData,
                tipKodu: _tipKodu,
                not: DataSource.notes,
                dataLoading: false
            })
        })
        .catch((error) => {
            console.error(error);
        });
}

export const PostMeterSettingsUpdate = async (x, meterNo) => {

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');
    var _ct_ratio = x.state.akımOran.split("/")
    var paramArray = {
        meter_id: meterNo,
        location_name: x.state.location,
        lon: x.state.longitude,
        lat: x.state.latitude,
        tesisat_no: x.state.aboneNo,
        location_address: x.state.locationAdress,
        notes: x.state.not,
        vt_ratio: x.state.gerilimOran,
        ct_ratio: _ct_ratio[0],
        day_of_invoice: x.state.faturaGunu,
        meter_connection_type: x.state.baglantıTuru,
        sozlesme_gucu: x.state.sozlesmeGucu,
        data_read_period: x.state.veriGondermeAralıgı,
        mail_alert: x.state.submitMailAlert,
        is_ptf: x.state.PTFUyumlu == "Evet" ? 1 : 0,
        is_server_time: x.state.veriZamanı == "Sunucu Saati" ? 1 : 0,
        export_data_visible: x.state.exportData == "Evet" ? 1 : 0,
        meter_type_code: x.state.tipKodu
    }

    let formdata = new FormData();
    Object.keys(paramArray).forEach(function (key) {
        formdata.append(key, paramArray[key]);
    })

    var URL = url + '/metersSettings'
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
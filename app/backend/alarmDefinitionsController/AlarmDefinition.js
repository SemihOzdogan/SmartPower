import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';
import moment from 'moment';
import { Toast } from 'native-base';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export const AlarmDefinitions = async (x, _url, productNo) => {

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + _url + '?device_id=' + productNo
    console.log(URL)

    return fetch(URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.code == 2104) {
                x.setState({
                    dataLoading: false,
                    dataError: responseJson.msg,
                })
                return false;
            }

            var data = responseJson.Data
            if (data.defined_rules != undefined && data.defined_sms_rules != undefined) {

                if (data.sms_number_info == null) {
                    x.setState({
                        dataLoading: false,
                        dataError: "",
                        DefinedEmailRules: data.defined_rules,
                        UndefinedEmailRules: data.undefined_rules,
                        definedSmsRules: data.defined_sms_rules,
                    })
                    return false;
                }

                x.setState({
                    dataLoading: false,
                    dataError: "",
                    DefinedEmailRules: data.defined_rules,
                    UndefinedEmailRules: data.undefined_rules,
                    definedSmsRules: data.defined_sms_rules,
                    phone1: data.sms_number_info.sms1,
                    phone2: data.sms_number_info.sms2,
                    phone3: data.sms_number_info.sms3
                })
            } else {
                x.setState({
                    dataLoading: false,
                    dataError: data.message
                })
                return false;
            }
        })
        .catch((error) => {
            x.setState({
                dataLoading: false,
                dataError: "Beklenmedik bir hata oluştu"
            })
            console.log(error)
        });
}
export const AlarmSmsNumberUpdate = async (x, productNo) => {

    x.setState({ spinner: true })

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + '/alarmSmsNumberUpdate' + '?device_id=' + productNo + '&add_number=' + 1
    console.log(URL)
    var paramArray = {
        sms1: x.state.phone1,
        sms2: x.state.phone2,
        sms3: x.state.phone3
    }
    let formdata = new FormData();
    Object.keys(paramArray).forEach(function (key) {
        formdata.append(key, paramArray[key]);
    })
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
                duration: 1500,
                textStyle: { color: "white", fontSize: 12, textAlign: 'center' },
                type: responseJson.IsSuccess ? "success" : "danger",
            })
            x.setState({ spinner: false })
        })
        .catch((error) => {
            x.setState({ loading: false, refresing: false })
        });
}
export const DeleteAlarmDefinitions = async (x, alarmType, alarmID) => {

    x.setState({ dataLoading: true })

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + '/alarmRuleDelete' + '?alarm_type_id=' + alarmType + '&alarm_id=' + alarmID
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
            x.setState({ dataLoading: false })
        })
        .catch((error) => {
            console.error(error);
            x.setState({ refresing: false })
        });
}
export const AlarmDefinitionsStatusChange = async (x, alarmType, alarmID, status) => {

    x.setState({ dataLoading: true })

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + '/alarmRuleStatus' + '?alarm_type_id=' + alarmType + '&alarm_id=' + alarmID + '&status=' + status
    console.log(URL)

    return fetch(URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            x.setState({ dataLoading: false })
            Toast.show({
                text: responseJson.Data.message,
                duration: 1500,
                textStyle: { color: "white", fontSize: 12, textAlign: 'center' },
                type: responseJson.IsSuccess ? "success" : "danger",
            })
        })
        .catch((error) => {
            console.error(error);
            x.setState({ refresing: false })
        });
}
export const AlarmDefinitionsRuleInfo = async (x, deviceID, alarmID, alarmTypeID) => {

    x.setState({ dataLoading: true })

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + '/alarmRuleInfo' + '?device_id=' + deviceID + '&alarm_id=' + alarmID + '&alarm_type_id=' + alarmTypeID
    console.log(URL)

    return fetch(URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            var data = responseJson.Data.alarm_rule_info;
            x.setState({
                alarmTitle: data.rule_name,
                alarmStatus: data.status == 1 ? true : false,
                alarmEmail: data.email_status == 1 ? true : false,
                alarmMobile: data.notification_status == 1 ? true : false,
                dataLoading: false
            })
            if (alarmTypeID == 1) {
                x.setState({
                    reaktif_enduktifResult: parseInt(data.inductive_limit),
                    reaktif_kapasitifResult: parseInt(data.capacitive_limit),
                    reaktif_tuketimResult: parseInt(data.consumption_limit),
                    reaktif_periyodResult: parseInt(data.period),
                    reaktif_hesaplamaAralıgı: parseInt(data.calculation_interval),
                })

            } else if (alarmTypeID == 3) {
                x.setState({
                    haberlesme_veriAlınamama: parseInt(data.communication_timeout),
                    haberlesme_periyodResult: parseInt(data.period)
                })
            }
            else if (alarmTypeID == 9) {
                x.setState({
                    gerilim_altLimit: parseInt(data.low_limit),
                    gerilim_ustLimit: parseInt(data.high_limit),
                    gerilim_alarmSuresi: parseInt(data.tolerance),
                    gerilim_periyodResult: parseInt(data.period)
                })
            }
            else if (alarmTypeID == 10) {
                x.setState({
                    dengesizAkım_alarmOlusma: parseInt(data.tolerance),
                    dengesizAkım_periyodResult: parseInt(data.period),
                    dengesizAkım_AkımYoksa: data.is_phase_cute_open == 1 ? true : false,
                })
            }
            else if (alarmTypeID == 11) {
                x.setState({
                    _5aYüksekAkım_alarmOlusma: data.tolerance == "" ? 0 : parseInt(data.tolerance),
                    _5aYüksekAkım_periyodResult: data.period,
                })
            }
            else if (alarmTypeID == 16) {
                var high = parseFloat(data.high_limit)
                x.setState({
                    yuksekAkım_ustLimit: high,
                    yuksekAkım_tekrarlama: data.iteration,
                })
            }
            else if (alarmTypeID == 17) {
                var high = parseFloat(data.high_limit)
                var low = parseFloat(data.low_limit)
                x.setState({
                    sıcaklık_ustLimit: high.toFixed(2),
                    sıcaklık_altLimit: low.toFixed(2),
                    sıcaklık_tekrarlama: data.iteration,
                    sıcaklık_limitTipi: parseInt(data.sub_type_id)
                })
            }

            else if (alarmTypeID == 30) {
                var ofsetL1 = parseFloat(data.ofset_current_L1)
                var ofsetL2 = parseFloat(data.ofset_current_L2)
                var ofsetL3 = parseFloat(data.ofset_current_L3)
                var idleL1 = parseFloat(data.idle_current_limit_L1)
                var idleL2 = parseFloat(data.idle_current_limit_L2)
                var idleL3 = parseFloat(data.idle_current_limit_L3)
                x.setState({
                    astronomikAydınlatma_gecikmeSuresi: parseInt(data.delay_time),
                    astronomikAydınlatma_akımOran: parseInt(data.current_tolerance_ratio),
                    astronomikAydınlatma_ofsetAkım1: ofsetL1,
                    astronomikAydınlatma_ofsetAkım2: ofsetL2,
                    astronomikAydınlatma_ofsetAkım3: ofsetL3,
                    astronomikAydınlatma_bosAkım1: idleL1,
                    astronomikAydınlatma_bosAkım2: idleL2,
                    astronomikAydınlatma_bosAkım3: idleL3,
                    astronomikAydınlatma_Lat: parseInt(data.lat),
                    astronomikAydınlatma_Lon: parseInt(data.lon)
                })
            }

            else if (alarmTypeID == 31) {
                var ofsetL1 = parseFloat(data.ofset_current_L1)
                var ofsetL2 = parseFloat(data.ofset_current_L2)
                var ofsetL3 = parseFloat(data.ofset_current_L3)
                x.setState({
                    suresizAydınlatma_akımOran: parseInt(data.current_tolerance_ratio),
                    suresizAydınlatma_ofsetAkım1: ofsetL1,
                    suresizAydınlatma_ofsetAkım2: ofsetL2,
                    suresizAydınlatma_ofsetAkım3: ofsetL3,
                    suresizAydınlatma_mesajMetni: data.text_to_send
                })
            }

            else if (alarmTypeID == 32) {
                var ofsetL1 = parseFloat(data.ofset_current_L1)
                var ofsetL2 = parseFloat(data.ofset_current_L2)
                var ofsetL3 = parseFloat(data.ofset_current_L3)
                var sourceData = data.begin_time.split(":")
                var sourceData2 = data.end_time.split(":")
                var timeData = data.days
                x.setState({
                    zamanaBaglıAkım_akımOran: parseInt(data.current_tolerance_ratio),
                    zamanaBaglıAkım_ofsetAkım1: ofsetL1,
                    zamanaBaglıAkım_ofsetAkım2: ofsetL2,
                    zamanaBaglıAkım_ofsetAkım3: ofsetL3,
                    zamanaBaglıAkım_mesajMetni: data.text_to_send,
                    zamanaBaglıAkım_fazSayısı: data.phase_count,
                    zamanaBaglıAkım_baslangıcSaat: sourceData[0],
                    zamanaBaglıAkım_baslangıcDakika: sourceData[1],
                    zamanaBaglıAkım_bitisSaat: sourceData2[0],
                    zamanaBaglıAkım_bitisDakika: sourceData2[1],
                    zamanaBaglıAkım_Pazartesi: timeData[0] == 1 ? true : false,
                    zamanaBaglıAkım_Salı: timeData[1] == 1 ? true : false,
                    zamanaBaglıAkım_Carsamba: timeData[2] == 1 ? true : false,
                    zamanaBaglıAkım_Persembe: timeData[3] == 1 ? true : false,
                    zamanaBaglıAkım_Cuma: timeData[4] == 1 ? true : false,
                    zamanaBaglıAkım_Cumartesi: timeData[5] == 1 ? true : false,
                    zamanaBaglıAkım_Pazar: timeData[6] == 1 ? true : false,
                })
            }

            else if (alarmTypeID == 36) {
                x.setState({
                    demandAsım_saatlikLimit: data.demand_limit,
                    demandAsım_periyodResult: data.period,
                })
            }
            else if (alarmTypeID == 37) {
                x.setState({
                    exportDemandAsım_saatlikLimit: data.demand_limit,
                    exportDemandAsım_periyodResult: data.period,
                })
            }
            else if (alarmTypeID == 43) {
                sourceData = data.rules.split(":")
                sourceData2 = sourceData[2].split(";")
                sourceData3 = sourceData2[2].split("|")
                sourceData4 = sourceData[4].split(";")
                x.setState({
                    enerjiTuketim_baslangicSaat1: parseInt(sourceData[0]),
                    enerjiTuketim_baslangicDakika1: parseInt(sourceData[1]),
                    enerjiTuketim_hesaplanacakSure1: parseInt(sourceData2[1]),
                    enerjiTuketim_tuketimLimit1: parseFloat(sourceData2[2]),
                    enerjiTuketim_baslangicSaat2: parseInt(sourceData3[1]),
                    enerjiTuketim_baslangicDakika2: parseInt(sourceData[3]),
                    enerjiTuketim_hesaplanacakSure2: parseInt(sourceData4[1]),
                    enerjiTuketim_tuketimLimit2: parseFloat(sourceData4[2])
                })
            }

        })
        .catch((error) => {
            console.error(error);
        });
}
export const AlarmDefinitionsRuleUpdate = async (x, deviceID, alarmID, alarmTypeID) => {

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + '/alarmRuleUpdate'
    console.log(URL)

    var alarmDefinitionObjects = {
        device_id: deviceID,
        alarm_id: alarmID,
        alarm_type_id: alarmTypeID,
        status: x.state.alarmStatus == true ? 1 : 0,
        email_status: x.state.alarmEmail == true ? 1 : 0,
        notification_status: x.state.alarmMobile == true ? 1 : 0,
        rule_name: x.state.alarmTitle,
    }

    if (alarmTypeID == 1) {

        var reaktifObjects = {
            inductive_limit: x.state.reaktif_enduktifResult,
            capacitive_limit: x.state.reaktif_kapasitifResult,
            consumption_limit: x.state.reaktif_tuketimResult,
            calculation_interval: x.state.reaktif_hesaplamaAralıgı,
            period: x.state.reaktif_periyodResult,
        }
        Object.entries(reaktifObjects).forEach(([key, value]) => { alarmDefinitionObjects[key] = value })

    } else if (alarmTypeID == 3) {
        var haberlesmeObjects = {
            period: x.state.haberlesme_periyodResult,
            communication_timeout: x.state.haberlesme_veriAlınamama
        }
        Object.entries(haberlesmeObjects).forEach(([key, value]) => { alarmDefinitionObjects[key] = value })
    }
    else if (alarmTypeID == 9) {
        var gerilimObjects = {
            low_limit: x.state.gerilim_altLimit,
            high_limit: x.state.gerilim_ustLimit,
            tolerance: x.state.gerilim_alarmSuresi,
            period: x.state.gerilim_periyodResult,
        }
        Object.entries(gerilimObjects).forEach(([key, value]) => { alarmDefinitionObjects[key] = value })
    }
    else if (alarmTypeID == 10) {
        var dengesizAkımObjects = {
            tolerance: x.state.dengesizAkım_alarmOlusma,
            period: x.state.dengesizAkım_periyodResult,
            is_phase_cute_open: x.state.dengesizAkım_AkımYoksa == true ? 1 : 0,
        }
        Object.entries(dengesizAkımObjects).forEach(([key, value]) => { alarmDefinitionObjects[key] = value })
    }

    else if (alarmTypeID == 11) {
        var _5aYüksekAkımObjects = {
            tolerance: x.state._5aYüksekAkım_alarmOlusma,
            period: x.state._5aYüksekAkım_periyodResult,
        }
        Object.entries(_5aYüksekAkımObjects).forEach(([key, value]) => { alarmDefinitionObjects[key] = value })
    }

    else if (alarmTypeID == 16) {
        var YüksekAkımObjects = {
            high_limit: x.state.yuksekAkım_ustLimit,
            iteration: x.state.yuksekAkım_tekrarlama,
        }
        Object.entries(YüksekAkımObjects).forEach(([key, value]) => { alarmDefinitionObjects[key] = value })
    }

    else if (alarmTypeID == 17) {
        var SıcaklıkObjects = {
            high_limit: x.state.sıcaklık_ustLimit,
            low_limit: x.state.sıcaklık_altLimit,
            iteration: x.state.sıcaklık_tekrarlama,
            sub_type_id: x.state.sıcaklık_limitTipi
        }
        Object.entries(SıcaklıkObjects).forEach(([key, value]) => { alarmDefinitionObjects[key] = value })
    }

    else if (alarmTypeID == 30) {
        var AstronomikAydınlatmaObjects = {
            delay_time: x.state.astronomikAydınlatma_gecikmeSuresi,
            current_tolerance_ratio: x.state.astronomikAydınlatma_akımOran,
            ofset_current_L1: x.state.astronomikAydınlatma_ofsetAkım1,
            ofset_current_L2: x.state.astronomikAydınlatma_ofsetAkım2,
            ofset_current_L3: x.state.astronomikAydınlatma_ofsetAkım3,
            idle_current_limit_L1: x.state.astronomikAydınlatma_bosAkım1,
            idle_current_limit_L2: x.state.astronomikAydınlatma_bosAkım2,
            idle_current_limit_L3: x.state.astronomikAydınlatma_bosAkım3
        }
        Object.entries(AstronomikAydınlatmaObjects).forEach(([key, value]) => { alarmDefinitionObjects[key] = value })
    }

    else if (alarmTypeID == 31) {
        var SuresizAydınlatmaObjects = {
            current_tolerance_ratio: x.state.suresizAydınlatma_akımOran,
            ofset_current_L1: x.state.suresizAydınlatma_ofsetAkım1,
            ofset_current_L2: x.state.suresizAydınlatma_ofsetAkım2,
            ofset_current_L3: x.state.suresizAydınlatma_ofsetAkım3,
            text_to_send: x.state.suresizAydınlatma_mesajMetni
        }
        Object.entries(SuresizAydınlatmaObjects).forEach(([key, value]) => { alarmDefinitionObjects[key] = value })
    }

    else if (alarmTypeID == 32) {

        baslangıcData = x.state.zamanaBaglıAkım_baslangıcSaat + ":" + x.state.zamanaBaglıAkım_baslangıcDakika + ":00"
        bitisData = x.state.zamanaBaglıAkım_bitisSaat + ":" + x.state.zamanaBaglıAkım_bitisDakika + ":00"
        gunData = (x.state.zamanaBaglıAkım_Pazartesi == true ? 1 : 0) + "" + (x.state.zamanaBaglıAkım_Salı == true ? 1 : 0) + "" + (x.state.zamanaBaglıAkım_Carsamba == true ? 1 : 0) + "" + (x.state.zamanaBaglıAkım_Persembe == true ? 1 : 0) + "" + (x.state.zamanaBaglıAkım_Cuma == true ? 1 : 0) + "" + (x.state.zamanaBaglıAkım_Cumartesi == true ? 1 : 0) + "" + (x.state.zamanaBaglıAkım_Pazar == true ? 1 : 0)
        var ZamanaBaglıAkımObjects = {
            current_tolerance_ratio: x.state.zamanaBaglıAkım_akımOran,
            ofset_current_L1: x.state.zamanaBaglıAkım_ofsetAkım1,
            ofset_current_L2: x.state.zamanaBaglıAkım_ofsetAkım2,
            ofset_current_L3: x.state.zamanaBaglıAkım_ofsetAkım3,
            text_to_send: x.state.zamanaBaglıAkım_mesajMetni,
            phase_count: x.state.zamanaBaglıAkım_fazSayısı,
            begin_time: baslangıcData.toString(),
            end_time: bitisData.toString(),
            days: gunData.toString()
        }
        Object.entries(ZamanaBaglıAkımObjects).forEach(([key, value]) => { alarmDefinitionObjects[key] = value })
    }

    else if (alarmTypeID == 36) {
        var DemandAsımObjects = {
            demand_limit: x.state.demandAsım_saatlikLimit,
            period: x.state.demandAsım_periyodResult,
        }
        Object.entries(DemandAsımObjects).forEach(([key, value]) => { alarmDefinitionObjects[key] = value })
    }

    else if (alarmTypeID == 37) {
        var ExportDemandAsımObjects = {
            demand_limit: x.state.exportDemandAsım_saatlikLimit,
            period: x.state.exportDemandAsım_periyodResult,
        }
        Object.entries(ExportDemandAsımObjects).forEach(([key, value]) => { alarmDefinitionObjects[key] = value })
    }
    else if (alarmTypeID == 43) {

        data = x.state.enerjiTuketim_baslangicSaat1 + ":" + x.state.enerjiTuketim_baslangicDakika1 + ":00;" + x.state.enerjiTuketim_hesaplanacakSure1 + ";" + x.state.enerjiTuketim_tuketimLimit1 + "|" + x.state.enerjiTuketim_baslangicSaat2 + ":" + x.state.enerjiTuketim_baslangicDakika2 + ":00;" + x.state.enerjiTuketim_hesaplanacakSure2 + ";" + x.state.enerjiTuketim_tuketimLimit2;
        var EnerjiTuketimObjects = {
            rules: data.toString(),
        }
        Object.entries(EnerjiTuketimObjects).forEach(([key, value]) => { alarmDefinitionObjects[key] = value })
    }


    let formdata = new FormData();
    Object.keys(alarmDefinitionObjects).forEach(function (key) {
        formdata.append(key, alarmDefinitionObjects[key]);
    })
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

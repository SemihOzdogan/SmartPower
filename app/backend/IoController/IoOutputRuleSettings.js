import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';
import moment from 'moment';
import { Toast } from 'native-base';

var inputTypeGrp = ["Giriş 1", "Giriş 2"]
var inputTypeG1 = ["Giriş 1", "Giriş 2", "Giriş 3", "Giriş 4", "Giriş 5", "Giriş 6", "Giriş 7", "Giriş 8"]
var inputTypeAnalog = ["Giriş 1", "Giriş 2", "Giriş 3", "Giriş 4", "Giriş 5", "Giriş 6"]

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

inputType = (device) => {
    var type;
    if (device.search('GRP') == 0) {
        type = inputTypeGrp
    }
    else if (device.search('GRP') == -1) {
        type = inputTypeG1
    }
    return type
}
inputSelect = (channel) => {
    return "Giriş " + channel.toString()
}
gunSelect = (index) => {
    var gun;
    switch (index) {
        case 1:
            gun = "Pazartesi"
            break;
        case 2:
            gun = "Salı"
            break;
        case 3:
            gun = "Çarşamba"
            break;
        case 4:
            gun = "Perşembe"
            break;
        case 5:
            gun = "Cuma"
            break;
        case 6:
            gun = "Cumartesi"
            break;
        case 7:
            gun = "Pazar"
            break;
        default:
            break;
    }
    return gun;
}
export const GetOutputRuleSettings = async (x, ID, type, channel) => {
    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');
    var URL = url + '/io/ioOutputRuleESettings' + '?module_id=' + ID + '&module_type=' + type + '&channel=' + channel
    console.log(URL)

    return fetch(URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            var data = responseJson.Data.ioOutputRuleESettingsInfo
            var device = data.source_id.split(",")
            var _inversion = data.inversion.split(",")
            var sourceChannel = data.source_channel.split(",")
            x.setState({
                timeShow: false,
                weekShow: false,
                allDevices: responseJson.Data.deviceInfo,
                selectedDevice1: device[0] == "" ? "Hiçbiri" : device[0],
                selectedDevice2: device[1] == undefined ? "Hiçbiri" : device[1],
                selectedDevice3: device[2] == undefined ? "Hiçbiri" : device[2],
                selectedIndex: data.rule_type == "&" ? 1 : 0,
                selectedTersle1: _inversion[0] == 1 ? true : false,
                selectedTersle2: _inversion[1] == 1 ? true : false,
                selectedTersle3: _inversion[2] == 1 ? true : false,
                inputType1: device[0] == undefined ? [] : inputType(device[0]),
                inputType2: device[1] == undefined ? [] : inputType(device[1]),
                inputType3: device[2] == undefined ? [] : inputType(device[2]),
                selectedGiris1: sourceChannel[0] == "" ? "Hiçbiri Seçilmedi" : inputSelect(sourceChannel[0]),
                selectedGiris2: sourceChannel[1] == undefined ? "Hiçbiri Seçilmedi" : inputSelect(sourceChannel[1]),
                selectedGiris3: sourceChannel[2] == undefined ? "Hiçbiri Seçilmedi" : inputSelect(sourceChannel[2])
            })
        })
        .catch((error) => {
            console.error(error);
        });
}
export const GetOutputTemperatureSettings = async (x, nodeID) => {

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');
    var URL = url + '/io/ioOutputRuleTSettings' + '?node_id=' + nodeID
    console.log(URL)

    return fetch(URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            var data = responseJson.Data.ioOutputRuleTSettingsInfo
            var high = parseFloat(data.high_limit == "" ? 0.00 : data.high_limit)
            var low = parseFloat(data.low_limit == "" ? 0.00 : data.low_limit)
            var selectedDevice = data.device_ids.split(",")
            x.state.selectedDevices = []
            selectedDevice.forEach(element => {
                if (element == "") {
                    x.state.selectedDevices = []
                    return false;
                }
                x.state.selectedDevices.push(element)
            });
            x.setState({
                timeShow: false,
                weekShow: false,
                sıcaklık_ustLimit: high.toFixed(2),
                sıcaklık_altLimit: low.toFixed(2),
                histerezis: data.hysteresis,
                sıcaklık: data.output_status,
                sıcaklıkDevices: responseJson.Data.temperatureInfo,
            })
        })
        .catch((error) => {
            console.error(error);
        });
}
export const GetOutputDayWeekSettings = async (x, nodeID) => {

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');
    var URL = url + '/io/ioOutputRuleTimelineSettings' + '?node_id=' + nodeID
    console.log(URL)

    return fetch(URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            var data = responseJson.Data.ioOutputRuleTimelineSettingsInfo
            var _data = {}
            x.state.alldata = []
            data.forEach(element => {
                if (element.day_of_week == 0) {
                    _data = {
                        "baslangıc": moment(element.output_on_begin_date).format('LT'),
                        "baslangıcTarih": element.output_on_begin_date,
                        "bitis": moment(element.output_on_end_date).format('LT'),
                        "bitisTarih": element.output_on_end_date
                    }
                    x.state.alldata.push(_data)
                    x.setState({ timeShow: true, weekShow: false })
                }
            });
        })
        .catch((error) => {
            console.error(error);
        });
}
export const GetOutputWeekSettings = async (x, nodeID) => {

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');
    var URL = url + '/io/ioOutputRuleTimelineSettings' + '?node_id=' + nodeID
    console.log(URL)

    return fetch(URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            var data = responseJson.Data.ioOutputRuleTimelineSettingsInfo
            var _data = {}
            x.state.allWeek = []
            data.forEach(element => {
                if (element.day_of_week != 0) {
                    _data = {
                        "gun": gunSelect(element.day_of_week),
                        "baslangıc": moment(element.output_on_begin_date).format('LT'),
                        "baslangıcTarih": element.output_on_begin_date,
                        "bitis": moment(element.output_on_end_date).format('LT'),
                        "bitisTarih": element.output_on_end_date
                    }
                    x.state.allWeek.push(_data)
                    x.setState({ weekShow: true, timeShow: false })
                }
            });
        })
        .catch((error) => {
            console.error(error);
        });
}
export const GetOutputAnalogSettings = async (x, nodeID) => {

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');
    var URL = url + '/io/ioOutputRuleASettings' + '?node_id=' + nodeID
    console.log(URL)

    return fetch(URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            var data = responseJson.Data.ioOutputRuleASettingsInfo
            var device = data.device_ids.split(",")
            var device_channels = data.device_channels.split(",")
            var high = parseFloat(data.high_limit == "" ? 0.00 : data.high_limit)
            var low = parseFloat(data.low_limit == "" ? 0.00 : data.low_limit)
            x.setState({
                timeShow: false,
                weekShow: false,
                sıcaklık_ustLimit: high.toFixed(2),
                sıcaklık_altLimit: low.toFixed(2),
                sıcaklık: data.output_status,
                allDevices: responseJson.Data.analogInfo,
                selectedDevice1: device[0] == "" ? "Hiçbiri" : device[0],
                selectedDevice2: device[1] == undefined ? "Hiçbiri" : device[1],
                selectedDevice3: device[2] == undefined ? "Hiçbiri" : device[2],
                inputType1: device[0] == undefined ? [] : inputTypeAnalog,
                inputType2: device[1] == undefined ? [] : inputTypeAnalog,
                inputType3: device[2] == undefined ? [] : inputTypeAnalog,
                selectedGiris1: device_channels[0] == "" ? "Hiçbiri Seçilmedi" : inputSelect(device_channels[0]),
                selectedGiris2: device_channels[1] == undefined ? "Hiçbiri Seçilmedi" : inputSelect(device_channels[1]),
                selectedGiris3: device_channels[2] == undefined ? "Hiçbiri Seçilmedi" : inputSelect(device_channels[2])
            })

        })
        .catch((error) => {
            console.error(error);
        });
}
export const PutOutputDayWeekSettings = async (x, ID, type, node) => {
    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');
    var timeData = {}
    var updateData = []
    x.state.alldata.forEach(element => {
        timeData = {
            "day_of_week": 0,
            "output_on_begin_date": element.baslangıcTarih,
            "output_on_end_date": element.bitisTarih
        }
        updateData.push(timeData)
    });
    var postData = JSON.stringify(updateData)
    const data = { module_id: ID, module_type: type, node_id: node, timeline_info: postData, timeline_type: 'D' };
    var URL = url + '/io/ioOutputRuleTimelineSettings'
    console.log(URL)

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
            console.error(error);
        });
}
export const PutOutputWeekSettings = async (x, ID, type, node) => {
    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');
    var weekData = {}
    var updateData = []
    var index;
    x.state.allWeek.forEach(element => {
        switch (element.gun) {
            case "Pazartesi":
                index = 1
                break;
            case "Salı":
                index = 2
                break;
            case "Çarşamba":
                index = 3
                break;
            case "Perşembe":
                index = 4
                break;
            case "Cuma":
                index = 5
                break;
            case "Cumartesi":
                index = 6
                break;
            case "Pazar":
                index = 7
                break;
            default:
                break;
        }
        weekData = {
            "day_of_week": index,
            "output_on_begin_date": element.baslangıcTarih,
            "output_on_end_date": element.bitisTarih
        }
        updateData.push(weekData)
    });
    var postData = JSON.stringify(updateData)

    const data = {
        module_id: ID, module_type: type, node_id: node, timeline_info: postData, timeline_type: 'W'
    };
    var URL = url + '/io/ioOutputRuleTimelineSettings'
    console.log(URL)

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
            console.error(error);
        });
}
export const PutOutputTemperatureSettings = async (x, ID, type, node) => {
    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');
    const data = {
        module_id: ID,
        module_type: type,
        node_id: node,
        device_ids: x.state.selectedDevices.toString(),
        low_limit: x.state.sıcaklık_altLimit,
        high_limit: x.state.sıcaklık_ustLimit,
        output_status: x.state.sıcaklık,
        hysteresis: x.state.histerezis,
    };
    var URL = url + '/io/ioOutputRuleTSettings'
    console.log(URL)
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
            console.error(error);
        });
}
export const PutOutputAnalogSettings = async (x, ID, type, node) => {
    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');
    const data = {
        module_id: ID,
        module_type: type,
        node_id: node,
        device_ids: (x.state.selectedDevice1 == "Hiçbiri" ? "" : x.state.selectedDevice1) + (x.state.selectedDevice2 == "Hiçbiri" ? "" : ("," + x.state.selectedDevice2)) + (x.state.selectedDevice3 == "Hiçbiri" ? "" : ("," + x.state.selectedDevice3)),
        low_limit: x.state.sıcaklık_altLimit,
        high_limit: x.state.sıcaklık_ustLimit,
        output_status: x.state.sıcaklık,
        device_channels: (x.state.selectedGiris1 == "Hiçbiri Seçilmedi" ? "" : x.state.selectedGiris1.replace("Giriş ", "")) + (x.state.selectedGiris2 == "Hiçbiri Seçilmedi" ? "" : ("," + x.state.selectedGiris2.replace("Giriş ", ""))) + (x.state.selectedGiris3 == "Hiçbiri Seçilmedi" ? "" : ("," + x.state.selectedGiris3.replace("Giriş ", ""))),
    };
    var URL = url + '/io/ioOutputRuleASettings'
    console.log(URL)
    console.log(data)

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
            console.error(error);
        });
}
export const PutOutputRuleSettings = async (x, ID, type, chnl) => {
    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');
    var modems = [
        {
            'comm_device_id': x.state.selectedModem1,
        },
        {
            'comm_device_id': x.state.selectedModem2,
        },
        {
            'comm_device_id': x.state.selectedModem3,
        }
    ]
    var strModems = JSON.stringify(modems)
    const data = {
        module_id: ID,
        module_type: type,
        channel: chnl,
        source_id: (x.state.selectedDevice1 == "Hiçbiri" ? "" : x.state.selectedDevice1) + (x.state.selectedDevice2 == "Hiçbiri" ? "" : ("," + x.state.selectedDevice2)) + (x.state.selectedDevice3 == "Hiçbiri" ? "" : ("," + x.state.selectedDevice3)),
        source_channel: (x.state.selectedGiris1 == "Hiçbiri Seçilmedi" ? "" : x.state.selectedGiris1.replace("Giriş ", "")) + (x.state.selectedGiris2 == "Hiçbiri Seçilmedi" ? "" : ("," + x.state.selectedGiris2.replace("Giriş ", ""))) + (x.state.selectedGiris3 == "Hiçbiri Seçilmedi" ? "" : ("," + x.state.selectedGiris3.replace("Giriş ", ""))),
        inversion: (x.state.selectedTersle1 == true ? 1 : 0).toString() + "," + (x.state.selectedTersle2 == true ? 1 : 0).toString() + "," + (x.state.selectedTersle3 == true ? 1 : 0).toString(),
        rule_type: x.state.selectedIndex == 1 ? "&" : "|",
        comm_device_info: strModems
    };
    var URL = url + '/io/ioOutputRuleESettings'
    console.log(URL)
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
            console.error(error);
        });
}
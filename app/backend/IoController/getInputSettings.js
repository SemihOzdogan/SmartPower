import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';
import { Toast } from 'native-base';
import moment from 'moment';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

export const GetInputSettings = async (x, type, ID) => {

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');
    var URL = url + '/io/ioInputSettings' + '?module_id=' + ID + '&module_type=' + type
    console.log(URL)

    return fetch(URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            var data = responseJson.Data.ioInputSettingsInfo
            x.setState({
                dataLoading: false,
            })

            if (type == 3) {
                x.setState({
                    Grp1Status1: data[0].status_1_name,
                    Grp1Status1Color: data[0].status_1_color,
                    Grp1Status0: data[0].status_0_name,
                    Grp1Status0Color: data[0].status_0_color,
                    Grp2Status1: data[1].status_1_name,
                    Grp2Status1Color: data[1].status_1_color,
                    Grp2Status0: data[1].status_0_name,
                    Grp2Status0Color: data[1].status_0_color,

                })
            }
            if (type == 0) {
                x.setState({
                    G1Status1: data[0].status_1_name,
                    G1Status1Color: data[0].status_1_color,
                    G1Status0: data[0].status_0_name,
                    G1Status0Color: data[0].status_0_color,

                    G2Status1: data[1].status_1_name,
                    G2Status1Color: data[1].status_1_color,
                    G2Status0: data[1].status_0_name,
                    G2Status0Color: data[1].status_0_color,

                    G3Status1: data[2].status_1_name,
                    G3Status1Color: data[2].status_1_color,
                    G3Status0: data[2].status_0_name,
                    G3Status0Color: data[2].status_0_color,

                    G4Status1: data[3].status_1_name,
                    G4Status1Color: data[3].status_1_color,
                    G4Status0: data[3].status_0_name,
                    G4Status0Color: data[3].status_0_color,

                    G5Status1: data[4].status_1_name,
                    G5Status1Color: data[4].status_1_color,
                    G5Status0: data[4].status_0_name,
                    G5Status0Color: data[4].status_0_color,

                    G6Status1: data[5].status_1_name,
                    G6Status1Color: data[5].status_1_color,
                    G6Status0: data[5].status_0_name,
                    G6Status0Color: data[5].status_0_color,

                    G7Status1: data[6].status_1_name,
                    G7Status1Color: data[6].status_1_color,
                    G7Status0: data[6].status_0_name,
                    G7Status0Color: data[6].status_0_color,

                    G8Status1: data[7].status_1_name,
                    G8Status1Color: data[7].status_1_color,
                    G8Status0: data[7].status_0_name,
                    G8Status0Color: data[7].status_0_color,


                })
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

export const GetInputSettingsUpdate = async (x, type, ID) => {

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');
    var postData;
    if (type == 3) {
        var GrpSettings = [
            //Buradaki sorun invalid karakter sorunu # işaretini stringe çeviremiyor bununla ilgili çalışma yapılacak süloynan
            {
                channel: 1,
                status_1_name: x.state.Grp1Status1,
                status_1_color: x.state.Grp1Status1Color.replace("#", ""),
                status_0_name: x.state.Grp1Status0,
                status_0_color: x.state.Grp1Status0Color.replace("#", ""),
            },
            {
                channel: 2,
                status_1_name: x.state.Grp2Status1,
                status_1_color: x.state.Grp2Status1Color.replace("#", ""),
                status_0_name: x.state.Grp2Status0,
                status_0_color: x.state.Grp2Status0Color.replace("#", ""),
            }
        ]
        postData = JSON.stringify(GrpSettings)
    }

    if (type == 0) {
        var G1Settings = [
            {
                channel: 1,
                status_1_name: x.state.G1Status1,
                status_1_color: x.state.G1Status1Color.replace("#", ""),
                status_0_name: x.state.G1Status0,
                status_0_color: x.state.G1Status0Color.replace("#", ""),
            },
            {
                channel: 2,
                status_1_name: x.state.G2Status1,
                status_1_color: x.state.G2Status1Color.replace("#", ""),
                status_0_name: x.state.G2Status0,
                status_0_color: x.state.G2Status0Color.replace("#", ""),
            },
            {
                channel: 3,
                status_1_name: x.state.G3Status1,
                status_1_color: x.state.G3Status1Color.replace("#", ""),
                status_0_name: x.state.G3Status0,
                status_0_color: x.state.G3Status0Color.replace("#", ""),
            },
            {
                channel: 4,
                status_1_name: x.state.G4Status1,
                status_1_color: x.state.G4Status1Color.replace("#", ""),
                status_0_name: x.state.G4Status0,
                status_0_color: x.state.G4Status0Color.replace("#", ""),
            },
            {
                channel: 5,
                status_1_name: x.state.G5Status1,
                status_1_color: x.state.G5Status1Color.replace("#", ""),
                status_0_name: x.state.G5Status0,
                status_0_color: x.state.G5Status0Color.replace("#", ""),
            },
            {
                channel: 6,
                status_1_name: x.state.G6Status1,
                status_1_color: x.state.G6Status1Color.replace("#", ""),
                status_0_name: x.state.G6Status0,
                status_0_color: x.state.G6Status0Color.replace("#", ""),
            },
            {
                channel: 7,
                status_1_name: x.state.G7Status1,
                status_1_color: x.state.G7Status1Color.replace("#", ""),
                status_0_name: x.state.G7Status0,
                status_0_color: x.state.G7Status0Color.replace("#", ""),
            },
            {
                channel: 8,
                status_1_name: x.state.G8Status1,
                status_1_color: x.state.G8Status1Color.replace("#", ""),
                status_0_name: x.state.G8Status0,
                status_0_color: x.state.G8Status0Color.replace("#", ""),
            }
        ]
        postData = JSON.stringify(G1Settings)
    }

    var URL = url + '/io/ioInputSettings' + '?module_id=' + ID + '&module_type=' + type + "&input_info=" + postData
    console.log(URL)
    return fetch(URL, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        body: postData
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

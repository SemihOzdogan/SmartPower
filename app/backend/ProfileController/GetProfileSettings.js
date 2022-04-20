import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';


export const GetProfile = async (x) => {
    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + '/updateProfile'
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
                change_name: responseJson.Data.name,
                change_surname: responseJson.Data.surname,
                change_email: responseJson.Data.email,
                change_phone: responseJson.Data.gsm,
                buton_spinner: false
            })
        })
        .catch((error) => {
            x.setState({ refresing: false })

        });
}

export const GetProfileUpdate = async (x) => {
    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');
    
    var URL = url + '/updateProfile' + '?name=' + x.state.change_name + '&surname=' + x.state.change_surname + '&email=' + x.state.change_email + '&gsm=' + x.state.change_phone
    console.log(URL)
    
    return fetch(URL, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {

            if (responseJson.IsSuccess == true) {
                x.setState({ textError: "Profil bilgileriniz güncellendi ✓ ", Type: "success", })
            }
            else {
                x.setState({ textError: "Profil bilgileriniz güncellenemedi ! ", Type: "danger", })
            }
            x.setState({
                msg: responseJson.Data.message,
            })
        })
        .catch((error) => {
            console.log(error);
        });
}
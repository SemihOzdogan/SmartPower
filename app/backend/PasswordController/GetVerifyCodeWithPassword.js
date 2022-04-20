import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';


export const GetVerifyCodeWithPassword = async (x) => {
    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + '/verification' + '?email=' + x.state.email + '&token=' + x.state.verifyCode + '&password=' + x.state.password + '&password_2=' + x.state.tkrpassword
    console.log(URL)

    return fetch(URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            var message;
            if (responseJson.IsSuccess == true) {
                x.setState({ error: message, Type: "success", status: true })
            }
            else {
                responseJson.Data.password.forEach(element => {
                    element = responseJson.Data.password
                    message = element
                });
                x.setState({ error: message, Type: "danger", status: false })
            }
        })
        .catch((error) => {
            console.error(error);
        });

}

import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';


export const GetPassword = async (x) => {
    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    let token = await AsyncStorage.getItem('access_token');

    var URL = url + '/securityProfile' + '?password=' + x.state.valid_password + '&new_password=' + x.state.change_password + '&new_password_again=' + x.state.repeat_change_password
    console.log(URL)

    return fetch(URL, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {

            if (responseJson.Message.Code == 1) {
                var message;
                responseJson.Data.new_password.forEach(element => {
                    element = responseJson.Data.new_password
                    message = element
                });
                x.setState({ textError: message, Type: "danger", status: false })
            } else {
                if (responseJson.IsSuccess == true) {
                    x.setState({ textError: responseJson.Data.message, Type: "success", status: false })
                } else {
                    x.setState({ textError: responseJson.Data.message, Type: "danger", status: false })
                }
               
            }


        })
        .catch((error) => {
            console.error(error);
        });

}

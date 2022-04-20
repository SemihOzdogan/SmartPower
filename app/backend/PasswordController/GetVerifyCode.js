import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';
import { Toast } from 'native-base';


export const GetVerifyCode = async (x) => {
    const url = await GetServerSettings().then((keyValue) => { return keyValue; });

    var URL = url + '/verificationCode' + '?email=' + x.state.email
    console.log(URL)

    return fetch(URL, {
        method: 'POST',
    })
        .then((response) => response.json())
        .then((responseJson) => {

            if (responseJson.IsSuccess == true) {
                x.setState({ Message: responseJson.Data.message, Type: "success", IsSuccess: true })
            }
            else {
                x.setState({ Message: responseJson.Data.message, Type: "danger", IsSuccess: false })
            }
        })
        .catch((error) => {
            console.error(error);
        });

}

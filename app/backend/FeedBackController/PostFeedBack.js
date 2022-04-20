import AsyncStorage from '@react-native-community/async-storage';
import { Alert, Keyboard } from 'react-native';
import { GetServerSettings } from '../serverSettingsController/getServerSettings';


export const PostFeedBack = async (x) => {

    x.setState({ butonSpinner: true })

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    Keyboard.dismiss();
    var res = x.state.msg.split("");
    if (res.length > 20) {
        let token = await AsyncStorage.getItem('access_token');
        var paramArray = {
            msg: x.state.msg
        }

        let formdata = new FormData();
        Object.keys(paramArray).forEach(function (key) {
            formdata.append(key, paramArray[key]);
        })
      
        fetch(url + '/feedBack', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            },
            body: formdata
        })
            .then((res) => res.json())
            .then((res) => {
                Alert.alert(
                    'SMARTPOWER',
                    'Geri bildiriminiz başarıyla gönderildi. \nDesteğiniz için teşekkürler...\nGrup Arge Enerji Ve Kontrol Sistemleri',
                    [
                        { text: 'Tamam' },
                    ],
                    { cancelable: false },
                );
                x.setState({ msg: "" });
            })
            .catch((error) => {
                console.log(error);
            });

    } else {
        Alert.alert(
            'UYARI',
            'Lütfen kutucuğu kontrol edin. \n(Minimum 20 karakter olmalı)',
            [
                { text: 'Tamam' },
            ],
            { cancelable: false },
        );
    }
    x.setState({ butonSpinner: false })
}
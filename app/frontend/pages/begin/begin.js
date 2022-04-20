/* Modules and Components */
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CheckInternet from '../../../backend/InternetController/CheckInternet';

class BeginScreen extends Component {

    constructor(props) {
        super(props);
        NetInfo.isConnected.fetch().then(isConnected => {
        });
        function handleFirstConnectivityChange(isConnected) {
            NetInfo.isConnected.removeEventListener(
                'connectionChange',
                handleFirstConnectivityChange
            );
        }
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            handleFirstConnectivityChange
        );
    }
    UNSAFE_componentWillMount() {

        AsyncStorage.getItem('isLogin').then((keyValue) => {
            if (keyValue == 1) {
                setTimeout(() => {
                    this.props.navigation.navigate("Home");
                }, 500);
            } else {
                setTimeout(() => {
                    this.props.navigation.navigate("Login");
                }, 500);

                //TANITIM SAYFASI TASARIMI TAMAMLANINCA AÇILACAK 


                // const status = AsyncStorage.getItem('watched').then((keyValue) => {     
                //     if (keyValue == "on") {
                //         setTimeout(() => {
                //             this.props.navigation.navigate("Login");
                //         }, 1000)
                //     } else {
                //         setTimeout(() => {
                //             this.props.navigation.navigate("Tanitim");
                //         }, 1000)
                //         return true;
                //     }
                // }, (error) => {
                //     console.log('on' + error) //Display error
                // });

                // if (status == false) {
                //     setTimeout(() => {
                //         this.props.navigation.navigate("Login");
                //     }, 1000);
                // }
            }
        }, (error) => {
            console.log('off' + error) //Display error
        });

    }
    render() {

        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                <CheckInternet />
                <Image
                    style={{ width: 60, height: 60 }}
                    source={require('../../images/load.gif')}
                />
            </View>
        );
    }
}
export default BeginScreen;
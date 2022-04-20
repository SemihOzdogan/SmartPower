import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../../../backend/serverSettingsController/getServerSettings';

var key = ""

class oneSignal extends Component {
    constructor(props) {
        super(props);
        (async () => {
            key = await AsyncStorage.getItem('OneSignal');
            OneSignal.init(key);
            OneSignal.inFocusDisplaying(2);
            OneSignal.addEventListener('opened', this.onOpened);
            OneSignal.addEventListener('ids', this.onIds);
        })()
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    savePlayerId = async () => {
        const url = await GetServerSettings().then((keyValue) => { return keyValue; });
        let token = await AsyncStorage.getItem('access_token');
        let player_ID = await AsyncStorage.getItem('playerID');
        var status = 1
        var URL = url + '/notificationSettings' + '?status=' + status + '&player_id=' + player_ID
        fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.IsSuccess == true) {
                    this.props.navigation.navigate('Home')
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onIds = async (device) => {
        try {
            await AsyncStorage.setItem('playerID', device.userId);
            await this.savePlayerId()
        } catch (error) {

        }
    }
    onReceived(notification) {
        // console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
        // console.log('Data: ', openResult.notification.payload.additionalData);
        // this.props.navigation.navigate('Alarms')
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }} >
                <Image
                    style={{ width: 60, height: 60 }}
                    source={require('../../images/load.gif')}
                />
            </View >
        );
    }
}

export default oneSignal;



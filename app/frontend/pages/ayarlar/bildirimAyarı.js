import React, { Component } from 'react';
import { View, Switch, Text,BackHandler } from 'react-native';
import { Container, Root, Toast } from 'native-base';
import CheckInternet from '../../../backend/InternetController/CheckInternet';
import { GetServerSettings } from '../../../backend/serverSettingsController/getServerSettings'
import AsyncStorage from '@react-native-community/async-storage';

var url, token, player_ID, status;

class BildirimScreen extends Component {

    constructor(props) {
        super(props);
        (async () => {
            url = await GetServerSettings().then((keyValue) => { return keyValue; });
            token = await AsyncStorage.getItem('access_token');
            player_ID = await AsyncStorage.getItem("playerID");
            status = await AsyncStorage.getItem("notificationStatus");
            enabled = status == 1 ? true : false;
            this.setState({ enabled: enabled })
        })()
        this.state = {
            enabled: status,
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack()
        return true;
    }

    notificationSettings = async (value) => {
        var status = value == true ? 1 : 0;
        this.setState({ enabled: value });
        var URL = url + '/notificationSettings' + '?status=' + status + '&player_id=' + player_ID
        console.log(URL)

        fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if (value == 1) {
                    Toast.show({
                        text: 'Bildirimler açıldı',
                        duration: 1500,
                        textStyle: { color: "white", fontSize: 12, textAlign: 'center' },
                        type: "success",
                    })
                } else {
                    Toast.show({
                        text: 'Bildirimler kapatıldı',
                        duration: 1500,
                        textStyle: { color: "white", fontSize: 12, textAlign: 'center' },
                        type: "warning",
                    })
                }
                AsyncStorage.setItem('notificationStatus', status.toString())
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <Root>
                <Container>
                    <CheckInternet />
                    <View style={{ flex: 1, backgroundColor: "#f5f5f5", }}>
                        <View style={{ flex: 1, backgroundColor: '#eee', borderRadius: 6, margin: 15, }} showsVerticalScrollIndicator={false}>
                            <View style={{ backgroundColor: '#ddd', flexDirection: 'row', margin: 10, borderRadius: 6 }}>
                                <View style={{ flex: 2, height: 50, marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, fontFamily: 'Poppins-Medium' }}>Bildirimlere İzin Ver</Text>
                                </View>
                                <View style={{ flex: 1, height: 50, marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                        thumbColor={this.state.enabled ? "#f5dd4b" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={this.notificationSettings}
                                        value={this.state.enabled}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Container>
            </Root>
        );
    }
}

export default BildirimScreen;
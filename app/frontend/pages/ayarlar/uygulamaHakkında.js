import React, { Component } from 'react';
import { View, Text, Image, Platform, ScrollView, BackHandler } from 'react-native';
import { Container, Root } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import CheckInternet from '../../../backend/InternetController/CheckInternet';
import DeviceInfo from 'react-native-simple-device-info';
import { GetServerSettings } from '../../../backend/serverSettingsController/getServerSettings'
import AsyncStorage from '@react-native-community/async-storage';

class UygulamaHakkındaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            URL: '',
            bildirimID: ''
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

    getURL = async () => {
        const url = await GetServerSettings().then((keyValue) => { return keyValue; });
        const player_ID = await AsyncStorage.getItem('playerID');
        this.setState({ URL: url, bildirimID: player_ID })
    }

    UNSAFE_componentWillMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            await this.getURL()
        });
    }
   

    render() {
        const AppVersion = DeviceInfo.getVersion();
        const SystemVersion = DeviceInfo.getSystemVersion();
        const buildNumber = DeviceInfo.getBuildNumber();
        const apiLevel = DeviceInfo.getAPILevel();
        let model = DeviceInfo.getModel();

        return (
            <Root>
                <Container>
                    <CheckInternet />
                    <View style={{ flex: 1, backgroundColor: "#f5f5f5", }}>

                        <ScrollView style={{ flex: 1, backgroundColor: '#eee', borderRadius: 6, margin: 15, }} showsVerticalScrollIndicator={false}>

                            <LinearGradient start={{ x: 0, y: 3 }} end={{ x: 0, y: 0 }} colors={['black', 'white']} style={{ width: '90%', height: 50, borderRadius: 6, margin: 15 }}>
                                <Text style={{ textAlign: 'center', paddingVertical: 3, fontFamily: 'Poppins-Light', fontSize: 14 }}>Uygulama Versiyonu</Text>
                                <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: 13 }}>v {AppVersion}</Text>
                            </LinearGradient>

                            <LinearGradient start={{ x: 0, y: 3 }} end={{ x: 0, y: 0 }} colors={['black', 'white']} style={{ width: '90%', height: 50, borderRadius: 6, margin: 15 }}>
                                <Text style={{ textAlign: 'center', paddingVertical: 3, fontFamily: 'Poppins-Light', fontSize: 14 }}>Uygulama Yapı Numarası</Text>
                                <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: 13 }}>{buildNumber}</Text>
                            </LinearGradient>

                            <LinearGradient start={{ x: 0, y: 3 }} end={{ x: 0, y: 0 }} colors={['black', 'white']} style={{ width: '90%', height: 50, borderRadius: 6, margin: 15 }}>
                                <Text style={{ textAlign: 'center', paddingVertical: 3, fontFamily: 'Poppins-Light', fontSize: 14 }}>Sunucu Adresi</Text>
                                <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: 13 }}>{this.state.URL}</Text>
                            </LinearGradient>

                            <LinearGradient start={{ x: 0, y: 3 }} end={{ x: 0, y: 0 }} colors={['black', 'white']} style={{ width: '90%', height: 50, borderRadius: 6, margin: 15 }}>
                                <Text style={{ textAlign: 'center', paddingVertical: 3, fontFamily: 'Poppins-Light', fontSize: 14 }}>Cihaz Model</Text>
                                <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: 13 }}>{model}</Text>
                            </LinearGradient>
                            {
                                Platform.OS == 'android' &&
                                <LinearGradient start={{ x: 0, y: 3 }} end={{ x: 0, y: 0 }} colors={['black', 'white']} style={{ width: '90%', height: 60, borderRadius: 6, margin: 15 }}>
                                    <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: 14 }}>Cihaz Bilgileri</Text>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: 13 }}>Android Versiyonu {'\n'} {SystemVersion}</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: 13 }}>Android API Düzeyi  {'\n'} {apiLevel}</Text>
                                        </View>
                                    </View>
                                </LinearGradient>
                            }
                            <LinearGradient start={{ x: 0, y: 3 }} end={{ x: 0, y: 0 }} colors={['black', 'white']} style={{ width: '90%', height: 50, borderRadius: 6, margin: 15 }}>
                                <Text style={{ textAlign: 'center', paddingVertical: 3, fontFamily: 'Poppins-Light', fontSize: 14 }}>Bildirim ID</Text>
                                <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: 13 }}>{this.state.bildirimID == null ? "-" : this.state.bildirimID}</Text>
                            </LinearGradient>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
                                <Image source={require('../../images/logo.png')} style={{ width: 60, height: 60, alignItems: 'center' }}></Image>
                                <Image source={require('../../images/login_logo.png')} style={{ width: 150, height: 45, alignItems: 'center' }}></Image>

                            </View>
                        </ScrollView>

                    </View>
                </Container>
            </Root>
        );
    }
}

export default UygulamaHakkındaScreen;

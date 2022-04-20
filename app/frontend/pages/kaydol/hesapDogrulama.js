import React, { Component } from 'react';
import { TextInput, TouchableOpacity, Image, BackHandler } from 'react-native';
import { View, Button, Text, Icon, Toast, Root, Spinner } from 'native-base';
import moment from 'moment';
import { GetVerifyCode } from '../../../backend/PasswordController/GetVerifyCode';
import CheckInternet from '../../../backend/InternetController/CheckInternet';

var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

class HesapDogrulamaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verificationCode: '',
            eventDate: moment.duration().add({ minutes: 5, seconds: 0 }), // add 9 full days
            mins: 0,
            secs: 0,
            email: '',
            Message: '',
            Type: '',
            spinner: false
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack()
        return true;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.updateTimer()
        this.setState({ email: this.props.verifyEmail })

    }

    againTimer = () => {
        this.setState({ eventDate: moment.duration().add({ minutes: 5, seconds: 0, }) })
    }

    againVerificationCode = async () => {
        await this.againTimer()
        await GetVerifyCode(this)
        Toast.show({
            text: this.state.Message,
            duration: 5000,
            position: 'bottom',
            textStyle: { color: "white", fontSize: 14, textAlign: 'center' },
            type: this.state.Type,
        })
    }

    goVerificationCode = async () => {

        if (this.state.verificationCode.length == 5) {

            this.props.navigation.navigate('PasswordCoding', {
                verifyCode: this.state.verificationCode,
                verifyEmail: this.state.email
            })
        }
        else {
            Toast.show({
                text: "Doğrulama kodunu giriniz",
                duration: 3000,
                position: 'bottom',
                textStyle: { color: "white", fontSize: 14, textAlign: 'center' },
                type: "warning",
            })
        }
    }

    updateTimer = () => {

        const x = setInterval(() => {
            let { eventDate } = this.state

            if (eventDate <= 0) {
                clearInterval(x)
            } else {
                eventDate = eventDate.subtract(1, "s")
                const mins = eventDate.minutes()
                const secs = eventDate.seconds()

                this.setState({
                    mins,
                    secs,
                    eventDate
                })
            }
        }, 1000)

    }

    render() {
        const { mins, secs } = this.state
        return (
            <Root>
                <CheckInternet />
                <View style={{ flex: 1, backgroundColor: 'white', }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: -20, marginTop: 20 }}>
                        <Image
                            style={{ width: 50, height: 50, marginTop: 10 }}
                            source={require('../../images/logo.png')}
                        />
                        <Image
                            style={{ width: 150, height: 40, marginTop: 5 }}
                            source={require('../../images/login_logo.png')}
                        />
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'white', padding: 10, justifyContent: 'flex-start', marginTop: 30 }} >
                        <View style={{ width: '100%', height: 50, flexDirection: 'row', }}>
                            <View style={{ flex: 1, borderWidth: 1.5, borderColor: '#00AEEF', borderRadius: 6, flexDirection: 'row' }}>
                                <View style={{ flex: 1, backgroundColor: '#f3f3f3', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 4.5, borderBottomLeftRadius: 4.5 }}>
                                    <Icon type="FontAwesome5" name="user-check" style={{ color: '#9CCD6D', fontSize: 30 }}></Icon>
                                </View>
                                <View style={{ flex: 3 }}>
                                    <TextInput
                                        autoCompleteType="off"
                                        maxLength={5}
                                        underlineColorAndroid="transparent"
                                        placeholder="Doğrulama Kodu"
                                        style={{ alignItems: 'center', color: '#9CCD6D', justifyContent: 'center', padding: 10, top: 2 }}
                                        placeholderTextColor="#9CCD6D"
                                        fontSize={18}
                                        value={this.state.verificationCode}
                                        onChangeText={(value) => { this.setState({ verificationCode: value }) }}
                                        onSubmitEditing={() => this.goVerificationCode()}
                                        returnKeyType="send"
                                    >
                                    </TextInput>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '40%', height: 40, flexDirection: 'row', backgroundColor: '#f3f3f3', justifyContent: 'center', alignItems: 'center', marginVertical: 10, }}>
                                <Icon type="FontAwesome5" name="clock" style={{ fontSize: 25, color: '#bbb' }} />
                                <Text style={{ color: '#bbb' }}> {`${mins} : ${secs}`}</Text>
                            </View>
                            <View style={{ width: '60%', height: 40, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                                <TouchableOpacity style={{}} onPress={() => this.againVerificationCode()}>
                                    <Text style={{ color: '#00AEEF' }}>Kodu Tekrar Gönder</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: 40 }}>
                            <Button style={{ flex: 1, backgroundColor: '#00AEEF', width: '80%', height: 40, borderRadius: 6, justifyContent: 'center' }} onPress={() => this.goVerificationCode()}>
                                <Text style={{ color: 'white', textAlign: 'center' }}>Hesabı Doğrula</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Root>
        );
    }
}

export default HesapDogrulamaScreen;

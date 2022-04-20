import React, { Component } from 'react';
import { TextInput, TouchableOpacity, Image, BackHandler } from 'react-native';
import { View, Button, Text, Icon, Toast, Root, Spinner } from 'native-base';
import moment from 'moment';
import { GetVerifyCode } from '../../../backend/PasswordController/GetVerifyCode';
import CheckInternet from '../../../backend/InternetController/CheckInternet';

class SifreSıfırlaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            spinner: false,
            IsSuccess: ""
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


    messageShow = async () => {
        Toast.show({
            text: this.state.Message,
            duration: 3000,
            position: 'bottom',
            textStyle: { color: "white", fontSize: 14, textAlign: 'center' },
            type: this.state.Type,
        })
    }

    goVerifyCode = async () => {
        this.setState({ spinner: true })
        await GetVerifyCode(this)
        this.setState({ spinner: false })

        if (this.state.IsSuccess == true) {
            await this.messageShow()
            setTimeout(() => {
                this.props.navigation.navigate('AccountVerification', {
                    verifyEmail: this.state.email.toLowerCase()
                })
            }, 2000);
        } else {
            await this.messageShow()
        }


    }

    render() {
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
                                    <Icon type="FontAwesome5" name="envelope-open-text" style={{ color: '#9CCD6D', fontSize: 30 }}></Icon>
                                </View>
                                <View style={{ flex: 3 }}>
                                    <TextInput
                                        autoCompleteType="off"
                                        underlineColorAndroid="transparent"
                                        keyboardType="email-address"
                                        returnKeyType="send"
                                        placeholder="Email adresi"
                                        style={{ alignItems: 'center', color: '#9CCD6D', justifyContent: 'center', padding: 10, top: 2 }}
                                        placeholderTextColor="#9CCD6D"
                                        fontSize={18}
                                        value={this.state.email}
                                        onChangeText={(value) => { this.setState({ email: value }) }}
                                        onSubmitEditing={() => this.goVerifyCode()}
                                    >
                                    </TextInput>
                                </View>
                            </View>
                        </View>
                        {this.state.spinner == true &&
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: 40, marginVertical: 10 }}>
                                <Button style={{ flex: 1, backgroundColor: '#00AEEF', width: '80%', height: 40, borderRadius: 6, justifyContent: 'center' }}>
                                    <Spinner color='#fff' style={{ width: "100%" }} />
                                </Button>
                            </View>
                        }
                        {this.state.spinner == false &&
                            < View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: 40, marginVertical: 10 }}>
                                <Button style={{ flex: 1, backgroundColor: '#00AEEF', width: '80%', height: 40, borderRadius: 6, justifyContent: 'center' }} onPress={() => this.goVerifyCode()}>
                                    <Text style={{ color: 'white', textAlign: 'center' }}>ŞİFRE SIFIRLA</Text>
                                </Button>
                            </View>
                        }

                    </View>
                </View>
            </Root >
        );
    }
}

export default SifreSıfırlaScreen;


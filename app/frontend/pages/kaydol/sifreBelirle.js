import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput, Text, BackHandler, Image } from 'react-native';
import { Container, Icon, Spinner, Toast, Root } from 'native-base';
import CheckInternet from '../../../backend/InternetController/CheckInternet';
import AsyncStorage from '@react-native-community/async-storage';
import { GetVerifyCodeWithPassword } from '../../../backend/PasswordController/GetVerifyCodeWithPassword'

export class SifreUnuttum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            email: "",
            password: "",
            tkrpassword: "",
            verifyCode: "",
            error: "",
            Type: "",
            status: false
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

    ErrorShow() {
        Toast.show({
            text: this.state.error,
            duration: 10000,
            position: 'bottom',
            textStyle: { color: "white", fontSize: 14, textAlign: 'center' },
            type: this.state.Type,
        })
    }

    goChangepassword = async () => {
        await this.setState({ email: this.props.verifyEmail, verifyCode: this.props.verifyCode, spinner: true })
        if (this.state.email != "" && this.state.password != "" && this.state.tkrpassword != "" && this.state.verifyCode != "") {
            if (this.state.password == this.state.tkrpassword) {
                await GetVerifyCodeWithPassword(this)
                this.setState({ spinner: false })
                if (this.state.status == true) {
                    Toast.show({
                        text: "Oluşturduğunuz şifre ile giriş yapabilirsiniz.Giriş sayfasına yönlendiriliyorsunuz",
                        duration: 5000,
                        position: 'bottom',
                        textStyle: { color: "white", fontSize: 14, textAlign: 'center' },
                        type: this.state.Type,
                    })
                    setTimeout(() => {
                        this.props.navigation.navigate('Login')
                    }, 3000);
                }
                else {
                    this.ErrorShow()
                }
            } else {
                this.setState({ spinner: false })
                Toast.show({
                    text: "Şifreler uyuşmuyor",
                    duration: 3000,
                    position: 'bottom',
                    textStyle: { color: "white", fontSize: 14, textAlign: 'center' },
                    type: "warning",
                })
            }

        } else {
            this.setState({ spinner: false })
            Toast.show({
                text: "Alanlar boş bırakılamaz",
                duration: 3000,
                position: 'bottom',
                textStyle: { color: "white", fontSize: 14, textAlign: 'center' },
                type: "warning",

            })
        }
    }

    render() {
        return (
            <Root>
                <Container >
                    <CheckInternet />
                    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
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
                            <View style={{ width: '100%', height: 50, flexDirection: 'row', marginVertical: 5 }}>
                                <View style={{ flex: 1, borderWidth: 1.5, borderColor: '#00AEEF', borderRadius: 6, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, backgroundColor: '#f3f3f3', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 4.5, borderBottomLeftRadius: 4.5 }}>
                                        <Icon type="FontAwesome5" name="key" style={{ color: '#9CCD6D', fontSize: 30 }}></Icon>
                                    </View>
                                    <View style={{ flex: 3 }}>
                                        <TextInput
                                            autoCompleteType="off"
                                            underlineColorAndroid="transparent"
                                            placeholder="Şifre"
                                            style={{ alignItems: 'center', color: '#9CCD6D', justifyContent: 'center', padding: 10, top: 2 }}
                                            placeholderTextColor="#9CCD6D"
                                            fontSize={18}
                                            value={this.state.password}
                                            onChangeText={(value) => { this.setState({ password: value }) }}
                                            returnKeyType="next"
                                            onSubmitEditing={() => this.secondTextInput.focus()}
                                            blurOnSubmit={false}
                                        >
                                        </TextInput>
                                    </View>
                                </View>
                            </View>

                            <View style={{ width: '100%', height: 50, flexDirection: 'row', marginVertical: 5 }}>
                                <View style={{ flex: 1, borderWidth: 1.5, borderColor: '#00AEEF', borderRadius: 6, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, backgroundColor: '#f3f3f3', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 4.5, borderBottomLeftRadius: 4.5 }}>
                                        <Icon type="FontAwesome5" name="redo" style={{ color: '#9CCD6D', fontSize: 25 }}></Icon>
                                    </View>
                                    <View style={{ flex: 3 }}>
                                        <TextInput
                                            autoCompleteType="off"
                                            underlineColorAndroid="transparent"
                                            placeholder="Tekrar Şifre"
                                            style={{ alignItems: 'center', color: '#9CCD6D', justifyContent: 'center', padding: 10, top: 2 }}
                                            placeholderTextColor="#9CCD6D"
                                            fontSize={18}
                                            value={this.state.tkrpassword}
                                            onChangeText={(value) => { this.setState({ tkrpassword: value }) }}
                                            returnKeyType="send"
                                            onSubmitEditing={() => this.goChangepassword()}
                                            ref={(input) => this.secondTextInput = input}
                                        >
                                        </TextInput>
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 6, flexDirection: 'row', backgroundColor: '#FCF8E3', marginVertical: 5 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon type="FontAwesome5" name="exclamation-circle" style={{ fontSize: 30, color: 'red' }} />
                                </View>
                                <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                    <Text style={{ fontSize: 12, color: '#8a6d3b' }}>Şifreniz en az 1 büyük harf, 1 küçük harf, 1 rakam ve 1 sembol olmak üzere 8 karakter ve üzerinden oluşmalıdır.</Text>
                                </View>
                            </View>
                            {this.state.spinner == true &&
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                                    <TouchableOpacity style={{ backgroundColor: "#00AEEF", borderRadius: 6, height: 40, width: 200, justifyContent: 'center' }}>
                                        <Spinner color='#fff' style={{ width: "100%" }} />
                                    </TouchableOpacity>
                                </View>
                            }
                            {this.state.spinner == false &&
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                                    <TouchableOpacity onPress={() => this.goChangepassword()} style={{ backgroundColor: "#00AEEF", borderRadius: 6, height: 40, width: 200, justifyContent: 'center' }}>
                                        <Text style={{ color: "#fff", textAlign: 'center' }}>ŞİFRE BELİRLE</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </View>
                </Container>
            </Root >
        )
    }
}


export default SifreUnuttum

/* Modules and Components */
import React, { Component } from 'react';
import { Image, TouchableOpacity, Alert, BackHandler, Modal, Keyboard, TextInput, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Form, Item, Input, Button, Text, Label, Icon, Root, Toast, Spinner, CheckBox, Picker, H1 } from 'native-base';
import styles from './loginStyle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckInternet from '../../../backend/InternetController/CheckInternet';
import { GetServerSettings } from '../../../backend/serverSettingsController/getServerSettings';
import DeviceInfo from 'react-native-simple-device-info';
import Animated, { Easing } from 'react-native-reanimated';

const { height } = Dimensions.get("screen")

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: '',
            pushStatus: 1,
            checkUser: false,
            isLogin: 0,
            rememberMe: false,
            showPass: true,
            press: false,
            preferences: false,
            validity: true,
            phoneID: '',
            protocol: "http",
            serverURL: "app.enerjitakibi.com",
            serverPORT: "80",
            alignment: new Animated.Value(height),
            wait: false
        };

        this.setToAsyncStorage()
        AsyncStorage.getItem('USER').then((keyValue) => {
            if (keyValue != "" || keyValue != null || keyValue != "undefined") {
                this.setState({ user: keyValue })
            }
        }, (error) => {
            console.log(error)
        });
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = async () => {
        BackHandler.exitApp()
    }

    /* Set 1 if login correct */
    _loginControl = async (value, token, username) => {
        try {
            await AsyncStorage.setItem('isLogin', value.toString());
            await AsyncStorage.setItem('access_token', token.toString());
            await AsyncStorage.setItem('user', username.toString());
        } catch (error) {
            alert("Giriş Yapılamadı" + error);
        }
    }

    getProtocol() {
        AsyncStorage.getItem("protocol").then((keyValue) => {
            if (keyValue == null) {
                this.setState({ protocol: 'http' });
            } else {
                this.setState({ protocol: keyValue });
            }
        }, (error) => {
            console.log(error)
        });
    }
    getServerURL() {
        AsyncStorage.getItem("serverURL").then((keyValue) => {
            if (keyValue == null) {
                this.setState({ serverURL: "app.enerjitakibi.com" });
            } else {
                this.setState({ serverURL: keyValue });
            }
        }, (error) => {
            console.log(error)
        });
    }
    getServerPORT() {
        AsyncStorage.getItem("serverPORT").then((keyValue) => {
            if (keyValue == null) {
                this.setState({ serverPORT: '80' });
            } else {
                this.setState({ serverPORT: keyValue.toString() });
            }
        }, (error) => {
            console.log(error)
        });
    }
    getRole = async (role) => {
        try {
            await AsyncStorage.setItem("RoleStatus", role)
        } catch (e) {
            console.log(e)
        }
    }

    goLogin = async () => {

        Keyboard.dismiss();

        try {
            await AsyncStorage.setItem('USER', this.state.user.toString());
        } catch (error) {
            console.log(error);
        }

        if (this.state.user == "" || this.state.pass == "") {
            Toast.show({
                text: 'Kullanıcı adı ve şifre alanları gereklidir',
                duration: 5000,
                textStyle: { color: "white", fontSize: 12, textAlign: 'center' },
                type: "danger",
            })
            return false;
        }

        const url = await GetServerSettings().then((keyValue) => { return keyValue; });

        var serverPORT = '';
        if (this.state.protocol == null) {
            this.setState({ protocol: "http" })
        } else if (this.state.serverURL == null) {
            this.setState({ serverURL: "app.enerjitakibi.com" });
        }

        if (this.state.serverPORT == null) {
            this.setState({ serverPORT: '' })
            serverPORT = '80';
        } else {
            serverPORT = ":" + this.state.serverPORT;
        }


        this.setState({ checkUser: true });
        var paramArray = {
            username: this.state.user.toLowerCase(),
            password: this.state.pass,
        }
        let formdata = new FormData();
        Object.keys(paramArray).forEach(function (key) {
            formdata.append(key, paramArray[key]);
        })
        console.log(url)
        fetch(url + '/login', {

            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formdata
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.IsSuccess == false) {
                    this.setState({ checkUser: false });
                    if (res.Message.Code == 601) {
                        Alert.alert(
                            'Üyelik Aktivasyonu Hatası',
                            'Üyeliğinizi aktive etmek için şifremi unuttum sayfasına gidiniz.',
                            [
                                { text: 'Şifremi Unuttum ', onPress: () => this.props.navigation.navigate('ForgotPassword') },
                            ],
                            { cancelable: false },
                        );
                    }
                    Toast.show({
                        text: res.Message.Body,
                        duration: 5000,
                        buttonText: 'Tekrar Dene',
                        textStyle: { color: "white", fontSize: 12 },
                        type: "warning"
                    })
                }
                else if (res.IsSuccess == true) {
                    (async () => {
                        await this.getRole(res.Data.Role)
                    })()
                    const tkn = res.Data.token.access_token
                    fetch(url + '/oneSignalAppId', {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + tkn,
                        },
                    })
                        .then((rsp) => rsp.json())
                        .then((rsp) => {
                            (async () => {
                                await AsyncStorage.setItem("OneSignal", rsp.Data.oneSignalAppId).then((keyValue) => {
                                    this.setState({ isLogin: 1 });
                                    this._loginControl(0, tkn, this.state.user);

                                    if (this.state.rememberMe) {
                                        this._loginControl(this.state.isLogin, tkn, this.state.user);
                                    }

                                    if (keyValue != "") {
                                        this.setState({ checkUser: false });
                                        this.props.navigation.navigate('OneSignal')
                                    }
                                }, (error) => {
                                    console.log(error)
                                });
                            })()
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                } else {
                    this.setState({ checkUser: false });
                    Alert.alert(
                        'Giriş Hatası',
                        'Beklenmedik bir hata oluştu',
                        [
                            { text: 'Tamam', onPress: () => console.log("error") },
                        ],
                        { cancelable: false },
                    );
                }

            })
            .catch((error) => {
                this.setState({ checkUser: false });
                Alert.alert("Bağlantı Hatası", "Sunucuyla bağlantı kurulamıyor.\nLütfen internet bağlantınızı kontrol edin veya sunucu ayarlarınızı değiştirin.");
                console.log(error);
            });
    }

    UNSAFE_componentWillMount() {
        AsyncStorage.getItem('isLogin').then((keyValue) => {
            if (keyValue == 1) {
                this.props.navigation.navigate('Home');
            }
        }, (error) => {
            console.log(error) //Display error
        });

        this.getProtocol();
        this.getServerURL();
        this.getServerPORT();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    rememberMe(value) {
        this.setState({ rememberMe: value });
    }

    showPass = () => {
        if (this.state.press == false) {
            this.setState({ showPass: false, press: true })
        }
        else {
            this.setState({ showPass: true, press: false })
        }
    }

    preferences(visible) {
        this.setState({ preferences: visible });
    }

    /* Set 1 if login correct */
    setToAsyncStorage = async (protocol, serverURL, serverPORT) => {
        try {

            let serverURL_tmp = await AsyncStorage.getItem('serverURL');
            let protocol_tmp = await AsyncStorage.getItem('protocol');
            let serverPORT_tmp = await AsyncStorage.getItem('serverPORT');

            await AsyncStorage.setItem('protocol', this.state.protocol.toString());
            await AsyncStorage.setItem('serverURL', this.state.serverURL.toString());
            await AsyncStorage.setItem('serverPORT', this.state.serverPORT.toString());
            let serverURL = await AsyncStorage.getItem('serverURL');
            let serverPORT = await AsyncStorage.getItem('serverPORT');
            let protocol = await AsyncStorage.getItem('protocol');

            if (serverURL_tmp != serverURL || serverPORT_tmp != serverPORT || protocol_tmp != protocol) {
                Toast.show({
                    text: 'Sunucu Ayarları Güncellendi',
                    duration: 5000,
                    buttonText: 'Tamam',
                    textStyle: { color: "white", fontSize: 12 },
                })
            }

            this.setState({ preferences: false, checkUser: false });

        } catch (error) {
            Toast.show({
                text: 'Sunucu Ayarlarını Kontrol Ediniz',
                duration: 5000,
                buttonText: 'Tamam',
                textStyle: { color: "white", fontSize: 12 },
            })
            console.log(error);
        }
    }

    onValueChange2(value) {
        this.setState({
            protocol: value
        });
    }

    AnimateHeader = () => {
        Animated.timing(this.state.alignment, {
            toValue: 200,
            duration: 700,
            easing: Easing.linear
        }).start();
        setTimeout(() => {
            this.setState({ wait: true })
        }, 50);
    }

    componentDidMount() {
        this.AnimateHeader()
        this.setToAsyncStorage();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    render() {
        const AnimatedHeader = {
            height: this.state.alignment,
        }
        const AppVersion = DeviceInfo.getVersion();
        const { contentBackground, logo, form, loginButton, loginInput, loginInputIcon } = styles;
        return (
            <Root >
                <CheckInternet />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.preferences}
                >
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", padding: 20, }}>
                        <View style={{ width: "100%", height: 420, backgroundColor: "white", padding: 25, position: "relative", borderRadius: 6 }}>
                            <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
                                <H1 style={{ textAlign: 'center' }}>Sunucu Ayarları</H1>
                                <Form style={{ flex: 1, paddingVertical: 15 }}>
                                    <Item picker>
                                        <Label style={{ padding: 8 }}>Protocol:</Label>
                                        <Picker
                                            headerBackButtonText="Geri"
                                            iosHeader="Protokol Seçin"
                                            mode="dropdown"
                                            iosIcon={<Icon name="arrow-down" />}
                                            style={{ width: undefined }}
                                            placeholder="Protocol Seçin:"
                                            placeholderStyle={{ color: "#7777" }}
                                            placeholderIconColor="#777"
                                            selectedValue={this.state.protocol}
                                            onValueChange={this.onValueChange2.bind(this)}
                                        >
                                            <Picker.Item label="HTTP" value="http" />
                                            <Picker.Item label="HTTPS" value="https" />
                                        </Picker>
                                    </Item>
                                    <Item style={{ marginLeft: 0 }}>
                                        <Label style={{ padding: 8 }}>Sunucu:</Label>
                                        <Input
                                            autoCompleteType="off"
                                            autoCapitalize='none'
                                            placeholder="Örn: app.enerjitakibi.com"
                                            placeholderTextColor="#bbb"
                                            onChangeText={(value) => this.setState({ serverURL: value })}
                                            value={this.state.serverURL}
                                        />
                                    </Item>
                                    <Item style={{ marginLeft: 0 }}>
                                        <Label style={{ padding: 8 }}>Port:</Label>
                                        <Input
                                            autoCompleteType="off"
                                            placeholder="Varsayılan 80"
                                            keyboardType="decimal-pad"
                                            placeholderTextColor="#bbb"
                                            onChangeText={(value) => this.setState({ serverPORT: value })}
                                            value={this.state.serverPORT}
                                        />
                                    </Item>
                                </Form>
                                <View style={{ marginVertical: 20, height: 100 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setToAsyncStorage()
                                        }}
                                        style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#62B1F6", padding: 15, borderRadius: 16 }}>
                                        <Text style={{ color: "#fff" }}>KAYDET</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        transparent
                                        onPress={() => {
                                            this.preferences(!this.state.preferences);
                                        }} style={{ alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                                        <Text>İptal</Text>
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAwareScrollView>
                        </View>
                    </View>
                </Modal>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                    <View style={contentBackground}>
                        <View>
                            <Animated.View style={[logo, AnimatedHeader]}>
                                <Image
                                    style={{ width: 70, height: 70, marginTop: 10 }}
                                    source={require('../../images/logo.png')}
                                />
                                <Image
                                    style={{ width: 170, height: 50, marginTop: 5 }}
                                    source={require('../../images/login_logo.png')}
                                />
                            </Animated.View>
                            {this.state.wait == true &&
                                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
                                    <View style={form}>
                                        <Form>
                                            <Item style={{ borderColor: 'transparent', }}>
                                                <Icon type="FontAwesome" name="user" style={loginInputIcon} />
                                                <TextInput
                                                    underlineColorAndroid="transparent"
                                                    autoCompleteType="off"
                                                    placeholderTextColor={'#bbb'}
                                                    style={loginInput}
                                                    keyboardType={"email-address"}
                                                    onChangeText={(value) => this.setState({ user: value })}
                                                    value={this.state.user}
                                                    placeholder="Kullanıcı Adı"
                                                    returnKeyType="next"
                                                    onSubmitEditing={() => this.secondTextInput.focus()}
                                                    blurOnSubmit={false}
                                                    autoCapitalize='none'
                                                />
                                            </Item>
                                            <Item style={{ borderColor: 'transparent', }}>
                                                <Icon type="FontAwesome" name='lock' style={loginInputIcon} />
                                                <TextInput placeholderTextColor={'#bbb'} style={loginInput}
                                                    autoCompleteType="off"
                                                    secureTextEntry={this.state.showPass}
                                                    onChangeText={(value) => this.setState({ pass: value })}
                                                    value={this.state.pass}
                                                    autoCapitalize='none'
                                                    placeholder="Şifre"
                                                    returnKeyType="go"
                                                    onSubmitEditing={() => this.goLogin()}
                                                    ref={(input) => this.secondTextInput = input}
                                                />
                                                <TouchableOpacity onPress={() => this.showPass()} style={{ right: 25, top: 15, width: 48, height: 48 }} >
                                                    <Icon type="FontAwesome" name={this.state.showPass == true ? "eye" : "eye-slash"} style={{ color: '#bbb', fontSize: 22 }} />
                                                </TouchableOpacity>
                                            </Item>

                                            <View style={{ width: '100%', height: 50, flexDirection: 'row' }}>
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <TouchableOpacity onPress={() => this.rememberMe(!this.state.rememberMe)} style={{ flexDirection: 'row', marginLeft: -7 }}>
                                                        <CheckBox checked={this.state.rememberMe} color="#bbb" onPress={() => this.rememberMe(!this.state.rememberMe)} />
                                                        <Text style={{ marginLeft: 15 }}><Text style={{ color: "#bbb", fontSize: 15 }}>Beni Hatırla</Text></Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <TouchableOpacity transparent style={{ textAlign: "center", }} onPress={() => {
                                                        this.props.navigation.navigate('ForgotPassword')
                                                    }}>
                                                        <Text style={{ color: "#bbb", fontSize: 15 }}> Şifremi Unuttum</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>


                                            {this.state.checkUser &&
                                                <Button info style={loginButton}>
                                                    <Spinner color='#fff' style={{ width: "100%" }} />
                                                </Button>
                                            }
                                            {!this.state.checkUser &&
                                                <Button info style={loginButton} onPress={this.goLogin.bind(this)} block>
                                                    <Text style={{ width: "100%", textAlign: "center" }}>GİRİŞ YAP</Text>
                                                </Button>
                                            }
                                        </Form>
                                        <View style={{ width: '100%', height: 50, flexDirection: 'row' }}>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                                                <TouchableOpacity transparent style={{ textAlign: "center", width: "100%", justifyContent: "center", alignItems: "center" }} onPress={() => {
                                                    this.preferences(!this.state.preferences);
                                                }}>
                                                    <Text style={{ color: "#bbb", fontSize: 15 }}><Icon type="FontAwesome5" name="cogs" style={{ color: "#bbb", fontSize: 20 }} /> Ayarlar</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')} style={{}}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Icon type="FontAwesome" name="sign-in" style={{ color: '#bbb', fontSize: 20 }} />
                                                        <Text style={{ color: '#bbb', fontSize: 15 }}>  Üye Ol</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>

                                </KeyboardAwareScrollView>


                            }
                            {
                                this.state.wait == true &&
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, color: '#bbb' }}>v {AppVersion}</Text>
                                </View>
                            }

                        </View>
                    </View>
                </View>
            </Root>
        );
    }
}

export default LoginScreen;
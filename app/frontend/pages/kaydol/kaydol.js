/* Modules and Components */
import React, { Component } from 'react';
import { Image, Alert, TextInput, BackHandler, ScrollView, TouchableOpacity } from 'react-native';
import { View, Form, Item, Button, Text, Icon, Spinner, Root } from 'native-base';
import styles from '../login/loginStyle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckInternet from '../../../backend/InternetController/CheckInternet';
import { GetServerSettings } from '../../../backend/serverSettingsController/getServerSettings';
import { StandardTextInputComponent } from '../../components/CustomTextInput/CustomTextInput';
import { Keyboard } from 'react-native';

class KaydolScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signName: "",
            signSurname: "",
            signMail: "",
            signTel: "",
            signSifre: "",
            signTkrSifre: '',
            checkUser: false
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.navigate('Login')
        return true;
    }

    goSignUp = async () => {
        this.setState({ checkUser: true });

        const url = await GetServerSettings().then((keyValue) => { return keyValue; });

        if (this.state.signSurname == "" || this.state.signName == "" || this.state.signTel == "" || this.state.signMail == "") {
            Alert.alert(
                'Form Hatası',
                'Boş Bırakılamaz !',
                [
                    { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
            this.setState({ checkUser: false })
        }

        else {

            var paramArray = {
                name: this.state.signName,
                surname: this.state.signSurname,
                email: this.state.signMail.toLowerCase(),
                tel_1: this.state.signTel,
            }
            let formdata = new FormData();
            Object.keys(paramArray).forEach(function (key) {
                formdata.append(key, paramArray[key]);
            })
            fetch(url + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formdata
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.IsSuccess == false) {
                        this.setState({ checkUser: false })
                        let ErrorMsg = "";

                        if (res.Data.email) {
                            res.Data.email.forEach(element => {
                                ErrorMsg += element + "\n"
                            })
                        }
                        if (res.Data.name) {
                            res.Data.name.forEach(element => {
                                ErrorMsg += element + "\n"
                            })
                        }
                        if (res.Data.surname) {
                            res.Data.surname.forEach(element => {
                                ErrorMsg += element + "\n"
                            })
                        }

                        Alert.alert(
                            'Üyelik Hatası',
                            ErrorMsg,
                            [
                                { text: 'Tamam', onPress: () => console.log('Ok') },
                                // { text: 'Şifre Belirle', onPress: () => this.props.navigation.navigate('ForgotPassword') },
                            ],
                            { cancelable: false },
                        );
                    }
                    else {
                        this.setState({ checkUser: false });
                        Alert.alert(
                            'Üyeliğiniz Tamamlandı',
                            res.Message.Msg,

                            [
                                { text: 'Hesabı Doğrula', onPress: () => this.props.navigation.navigate('AccountVerification', { verifyEmail: this.state.signMail }) },
                            ],
                            { cancelable: false },
                        );
                    }
                    this.setState({ checkUser: false });
                })
        }
    }

    render() {
        return (
            <Root>
                <CheckInternet />
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps='always' style={{ backgroundColor: 'white', }} showsVerticalScrollIndicator={false}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ width: 50, height: 50, marginTop: 20 }}
                                    source={require('../../images/logo.png')}
                                />
                                <Image
                                    style={{ width: 150, height: 40, marginTop: 5 }}
                                    source={require('../../images/login_logo.png')}
                                />
                            </View>

                            <View style={{ width: '100%', marginTop: 5 }}>
                                <View style={{ flex: 1, backgroundColor: 'white', padding: 10, borderRadius: 6, justifyContent: 'center', marginVertical: 5 }} >
                                    <StandardTextInputComponent
                                        returnKeyType="next"
                                        icon="user"
                                        placeholder="Ad"
                                        onChangeText={(value) => this.setState({ signName: value })}
                                        value={this.state.signName}
                                    />
                                    <StandardTextInputComponent
                                        autoCapitalize="words"
                                        returnKeyType="next"
                                        icon="user-circle"
                                        placeholder="Soyad"
                                        onChangeText={(value) => this.setState({ signSurname: value })}
                                        value={this.state.signSurname}
                                    />

                                    <StandardTextInputComponent
                                        autoCapitalize="none"
                                        returnKeyType="next"
                                        icon="envelope"
                                        placeholder="Email"
                                        onChangeText={(value) => this.setState({ signMail: value })}
                                        value={this.state.signMail}
                                        keyboardType="email-address"
                                    />

                                    <StandardTextInputComponent
                                        icon="phone-square"
                                        placeholder="5XX-XXX-XX-XX"
                                        onChangeText={(value) => this.setState({ signTel: value })}
                                        value={this.state.signTel}
                                        maxLength={10}
                                        keyboardType="phone-pad"
                                    />
                                </View>

                                {this.state.checkUser &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                        <TouchableOpacity disabled={true} style={{ backgroundColor: "#00AEEF", borderRadius: 6, height: 40, width: '70%', justifyContent: 'center' }}>
                                            <Spinner color="#fff" style={{ width: "100%" }} />
                                        </TouchableOpacity>
                                    </View>
                                }
                                {!this.state.checkUser &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                        <TouchableOpacity onPress={() => this.goSignUp()} style={{ backgroundColor: "#00AEEF", borderRadius: 6, height: 40, width: '70%', justifyContent: 'center' }}>
                                            <Text style={{ color: "#fff", textAlign: 'center' }}>KAYDET</Text>
                                        </TouchableOpacity>
                                    </View>
                                }

                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={{ borderRadius: 6, height: 40, justifyContent: 'center' }}>
                                        <Text style={{ textAlign: "center", color: '#00AEEF', }}>GİRİŞ YAP</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView >
            </Root>
            // <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' style={{ backgroundColor: 'white', }}>
            //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            //         <CheckInternet />
            //         <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
            //             <View style={{ flex: 1 }}>
            //                 <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", marginTop: "5%" }}>
            //                     <Image
            //                         style={{ width: 50, height: 50, marginTop: 10 }}
            //                         source={require('../../images/logo.png')}
            //                     />
            //                     <Image
            //                         style={{ width: 150, height: 40, marginTop: 5 }}
            //                         source={require('../../images/login_logo.png')}
            //                     />
            //                     <Text style={{ textAlign: 'center', fontSize: 20, color: 'black', fontFamily: 'Poppins-Light', marginTop: 20 }}>Üyelik Formu</Text>
            //                     <View style={form}>
            //                         <Form>
            //                             <Item style={{ marginBottom: 10 }}>
            //                                 <Icon type="FontAwesome" name="user" style={[loginInputIcon, { fontSize: 20 }]} />
            //                                 <TextInput placeholderTextColor={'#aaa'} style={loginInput}
            //                                     autoCompleteType="off"
            //                                     onChangeText={(value) => this.setState({ signName: value })}
            //                                     value={this.state.signName}
            //                                     placeholder="Ad"
            //                                     returnKeyType="next"
            //                                     onSubmitEditing={() => this.emailInput.focus()}
            //                                     blurOnSubmit={false}
            //                                 />
            //                             </Item>
            //                             <Item style={{ marginBottom: 10 }}>
            //                                 <Icon type="FontAwesome" name="user-circle" style={[loginInputIcon, { fontSize: 15 }]} />
            //                                 <TextInput placeholderTextColor={'#aaa'} style={loginInput}
            //                                     autoCompleteType="off"
            //                                     onChangeText={(value) => this.setState({ signSurname: value })}
            //                                     value={this.state.signSurname}
            //                                     placeholder="Soyad"
            //                                     returnKeyType="next"
            //                                     onSubmitEditing={() => this.phoneInput.focus()}
            //                                     ref={(input) => this.emailInput = input}
            //                                 />
            //                             </Item>

            //                             <Item style={{ margin: 5 }}>
            //                                 <Icon type="FontAwesome" name="envelope" style={[loginInputIcon, { fontSize: 16 }]} />
            //                                 <TextInput placeholderTextColor={'#aaa'} style={loginInput}
            //                                     autoCompleteType="off"
            //                                     keyboardType={"email-address"}
            //                                     onChangeText={(value) => this.setState({ signMail: value })}
            //                                     value={this.state.signMail}
            //                                     placeholder="Email"
            //                                     returnKeyType="next"
            //                                     onSubmitEditing={() => this.goInput.focus()}
            //                                     ref={(input) => this.phoneInput = input}
            //                                 />
            //                             </Item>

            //                             <Item style={{ margin: 10 }}>
            //                                 <Icon type="FontAwesome" name="phone-square" style={[loginInputIcon, { fontSize: 18 }]} />
            //                                 <TextInput type="numeric" placeholderTextColor={'#aaa'} style={loginInput}
            //                                     autoCompleteType="off"
            //                                     maxLength={10}
            //                                     keyboardType={"phone-pad"}
            //                                     onChangeText={(value) => this.setState({ signTel: value })}
            //                                     value={this.state.signTel}
            //                                     placeholder="5XX-XXX-XX-XX"
            //                                     onSubmitEditing={() => this.goSignUp()}
            //                                     ref={(input) => this.goInput = input}
            //                                 />
            //                             </Item>


            //                             {this.state.checkUser &&
            //                                 <Button info style={loginButton}>
            //                                     <Spinner color='#fff' style={{ width: "100%" }} />
            //                                 </Button>
            //                             }
            //                             {!this.state.checkUser &&
            //                                 <Button info style={loginButton} onPress={() => this.goSignUp()} block>
            //                                     <Text style={{ width: "100%", textAlign: "center" }}>Üye Ol</Text>
            //                                 </Button>
            //                             }

            //                             <Button info style={loginButton} block transparent onPress={() => this.props.navigation.navigate('Login')}>
            //                                 <Text style={{ width: "100%", textAlign: "center" }}>GİRİŞ YAP</Text>
            //                             </Button>
            //                         </Form>
            //                     </View>
            //                 </View>
            //             </View>

            //         </View>
            //     </View>
            // </KeyboardAwareScrollView>
        );
    }
}

export default KaydolScreen;
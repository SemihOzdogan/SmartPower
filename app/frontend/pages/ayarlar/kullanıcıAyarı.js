import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, RefreshControl, BackHandler, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckInternet from '../../../backend/InternetController/CheckInternet';
import { Form, Spinner, Toast, Root, Button } from 'native-base';
import Styles from '../login/loginStyle';
import LinearGradient from 'react-native-linear-gradient';
import { GetProfile, GetProfileUpdate } from '../../../backend/ProfileController/GetProfileSettings';
import AsyncStorage from '@react-native-community/async-storage';
import { StandardTextInputComponent } from '../../components/CustomTextInput/CustomTextInput';
import * as Animatable from 'react-native-animatable';


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buton_spinner: "flex",
      change_name: '',
      change_surname: '',
      change_email: '',
      change_phone: '',
      user: '',
      textError: '',
      refresing: false,
      butonSpinner: false
    };
    this.getUsername()
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack()
    return true;
  }


  UNSAFE_componentWillMount() {
    GetProfile(this);
  }

  getUsername() {
    AsyncStorage.getItem("user").then((keyValue) => {
      this.setState({ user: keyValue });
    });
  }

  ErrorShow() {
    Toast.show({
      text: this.state.textError,
      duration: 5000,
      textStyle: { color: "white", fontSize: 14, textAlign: 'center' },
      type: this.state.Type,
      buttonTextStyle: { color: "white" },
      buttonStyle: { borderRadius: 8, borderWidth: 1, borderColor: 'white' }
    })
  }

  async formValidate() {
    if (this.state.change_name == "" && this.state.change_surname == "" && this.state.change_email == "" && this.state.change_phone == "") {
      await this.setState({ textError: "Tüm alanlarını doldurunuz !", Type: "danger" })
      this.ErrorShow()
    }
    else if (this.state.change_name == "") {
      await this.setState({ textError: "Ad alanını doldurunuz !", Type: "danger" })
      this.ErrorShow()
    }
    else if (this.state.change_surname == "") {
      await this.setState({ textError: "Soyad alanını doldurunuz !", Type: "danger" })
      this.ErrorShow()
    }
    else if (this.state.change_email == "") {
      await this.setState({ textError: "Email alanını doldurunuz !", Type: "danger" })
      this.ErrorShow()
    }
    else if (this.state.change_phone == "") {
      await this.setState({ textError: "Telefon numarası alanını doldurunuz !", Type: "danger" })
      this.ErrorShow()
    }
    else {

    }
  }

  async goUserSettings() {
    this.setState({ butonSpinner: true })
    await this.formValidate()
    if (this.state.change_name != "" && this.state.change_surname != "" && this.state.change_email != "" && this.state.change_phone != "") {
      await GetProfileUpdate(this)
      this.ErrorShow()
    }
    this.setState({ butonSpinner: false })
  }

  refreshData() {
    this.setState({ refresing: true })
    GetProfile(this)
    this.setState({ refresing: false })

  }

  render() {
    const { loginInput, loginInputIcon } = Styles;
    return (
      <Root>
        <CheckInternet />
        <KeyboardAwareScrollView
          refreshControl={
            <RefreshControl style={{ justifyContent: 'center', alignItems: 'center', }} refreshing={this.state.refresing} onRefresh={() => this.refreshData()} />
          }
          keyboardShouldPersistTaps='always' style={styles.container} showsVerticalScrollIndicator={false}>
          <LinearGradient start={{ x: 0, y: 3 }} end={{ x: 0, y: 0 }} colors={['black', 'white']} style={{ height: 220, flexDirection: 'row' }}>

          </LinearGradient>
          <Image style={styles.avatar} source={require('../../images/user-profile.png')} />
          <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>

            <View style={styles.bodyContent}>

              <Text style={styles.name}>{this.state.user}</Text>
              {
                this.state.buton_spinner &&
                <Form>
                  <Button transparent block style={{ width: "100%", padding: 20, textAlign: "center", marginTop: 20 }}>
                    <Spinner color='#aaa' style={{ width: "100%" }} />
                  </Button>
                </Form>
              }
              {
                !this.state.buton_spinner &&
                <View style={{ width: '100%', marginTop: 5 }}>

                  <View style={{ flex: 1, backgroundColor: 'white', padding: 10, borderRadius: 6, justifyContent: 'center', marginVertical: 5 }} >
                    <Animatable.View animation="fadeInUp" iterationCount={1} direction="alternate">
                      <StandardTextInputComponent
                        secureTextEntry={false}
                        icon="user"
                        placeholder="Ad"
                        onChangeText={(value) => this.setState({ change_name: value })}
                        value={this.state.change_name}
                      />
                    </Animatable.View>
                    <Animatable.View animation="fadeInUp" iterationCount={1} direction="alternate">
                      <StandardTextInputComponent
                        secureTextEntry={false}
                        icon="user-circle"
                        placeholder="Soyad"
                        onChangeText={(value) => this.setState({ change_surname: value })}
                        value={this.state.change_surname}
                      />
                    </Animatable.View>

                    <Animatable.View animation="fadeInUp" iterationCount={1} direction="alternate">
                      <StandardTextInputComponent
                        secureTextEntry={false}
                        icon="envelope"
                        placeholder="Email"
                        onChangeText={(value) => this.setState({ change_email: value })}
                        value={this.state.change_email}
                      />
                    </Animatable.View>

                    <Animatable.View animation="fadeInUp" iterationCount={1} direction="alternate">
                      <StandardTextInputComponent
                        secureTextEntry={false}
                        icon="phone-square"
                        placeholder="Telefon"
                        onChangeText={(value) => this.setState({ change_phone: value })}
                        value={this.state.change_phone}
                        maxLength={10}
                      />
                    </Animatable.View>

                  </View>
                  {this.state.butonSpinner &&
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                      <TouchableOpacity disabled={true} style={{ backgroundColor: "#00AEEF", borderRadius: 6, height: 40, width: 200, justifyContent: 'center' }}>
                        <Spinner color="#fff" style={{ width: "100%" }} />
                      </TouchableOpacity>
                    </View>
                  }
                  {!this.state.butonSpinner &&
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                      <TouchableOpacity onPress={() => this.goUserSettings()} style={{ backgroundColor: "#00AEEF", borderRadius: 6, height: 40, width: 200, justifyContent: 'center' }}>
                        <Text style={{ color: "#fff", textAlign: 'center' }}>KAYDET</Text>
                      </TouchableOpacity>
                    </View>
                  }

                </View>
              }
            </View>
          </ScrollView>
        </KeyboardAwareScrollView >
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 150
  },
  loginInput: {
    width: "100%",
    marginTop: 5,
    marginLeft: -15,
    paddingLeft: 16,
    color: '#696969',
    fontSize: 16,
    fontWeight: "500",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  name: {
    fontSize: 16,
    color: "#696969",
    fontWeight: "600",
    textTransform: 'lowercase',
    top: 5
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});

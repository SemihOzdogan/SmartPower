import React, { Component } from 'react';
import { View, TouchableOpacity, Text, BackHandler, StyleSheet, ScrollView } from 'react-native';
import { Spinner, Toast, Root, Icon } from 'native-base';
import CheckInternet from '../../../backend/InternetController/CheckInternet';
import { GetPassword } from '../../../backend/PasswordController/GetPasswordSettings';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StandardTextInputComponent } from '../../components/CustomTextInput/CustomTextInput';
import * as Animatable from 'react-native-animatable';

class GuvenlikAyarıScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check_submit: false,
      valid_password: "",
      change_password: "",
      repeat_change_password: "",
      textError: "",
      Type: "",
      butonSpinner: false
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
      text: this.state.textError,
      duration: 5000,
      textStyle: { color: "white", fontSize: 14, textAlign: 'center' },
      type: this.state.Type,
      buttonTextStyle: { color: "white" },
      buttonStyle: { borderRadius: 8, borderWidth: 1, borderColor: 'white' }
    })
  }

  async goPasswordSettings() {
    this.setState({ butonSpinner: true })
    if (((this.state.valid_password != "" && this.state.change_password != "" && this.state.repeat_change_password) && (this.state.change_password == this.state.repeat_change_password)) && (this.state.valid_password.length > 8 || this.state.change_password.length > 8 || this.state.repeat_change_password.length > 8)) {
      await GetPassword(this)
      this.ErrorShow()
    }
    this.setState({ butonSpinner: false })
  }


  render() {
    return (
      <Root>
        <CheckInternet />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps='always' style={styles.container} showsVerticalScrollIndicator={false}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.bodyContent}>
              <View style={{ width: '100%', marginTop: 5 }}>
                <View style={{ flex: 1, backgroundColor: 'white', padding: 10, borderRadius: 6, justifyContent: 'center', marginVertical: 5 }} >
                  <Animatable.View animation="fadeInUp" iterationCount={1} direction="alternate">
                    <StandardTextInputComponent
                      secureTextEntry={true}
                      icon="user-lock"
                      placeholder="Mevcut şifre"
                      onChangeText={(value) => this.setState({ valid_password: value })}
                      value={this.state.valid_password}
                      returnKeyType="next"
                    />
                  </Animatable.View>

                  <Animatable.View animation="fadeInUp" iterationCount={1} direction="alternate">
                    <StandardTextInputComponent
                      secureTextEntry={true}
                      icon="unlock-alt"
                      placeholder="Yeni şifre"
                      onChangeText={(value) => this.setState({ change_password: value })}
                      value={this.state.change_password}
                      returnKeyType="next"
                    />
                  </Animatable.View>

                  <Animatable.View animation="fadeInUp" iterationCount={1} direction="alternate">
                    <StandardTextInputComponent
                      secureTextEntry={true}
                      icon="unlock"
                      placeholder="Tekrar yeni şifre"
                      onChangeText={(value) => this.setState({ repeat_change_password: value })}
                      value={this.state.repeat_change_password}
                      returnKeyType="send"
                    />
                  </Animatable.View>

                  <Animatable.View animation="fadeInUp" iterationCount={1} direction="alternate" style={{ width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 6, flexDirection: 'row', backgroundColor: '#FCF8E3', marginVertical: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Icon type="FontAwesome5" name="exclamation-circle" style={{ fontSize: 30, color: 'red' }} />
                    </View>
                    <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                      <Text style={{ fontSize: 12, color: '#8a6d3b' }}>Şifreniz en az 1 büyük harf, 1 küçük harf, 1 rakam ve 1 sembol olmak üzere 8 karakter ve üzerinden oluşmalıdır.</Text>
                    </View>
                  </Animatable.View>

                </View>

                {this.state.butonSpinner &&
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity disabled={true} style={{ backgroundColor: "#00AEEF", borderRadius: 6, height: 40, width: 200, justifyContent: 'center' }}>
                      <Spinner color='#fff' style={{ width: "100%" }} />
                    </TouchableOpacity>
                  </View>
                }
                {!this.state.butonSpinner &&
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity onPress={() => this.goPasswordSettings()} style={{ backgroundColor: "#00AEEF", borderRadius: 6, height: 40, width: 200, justifyContent: 'center' }}>
                      <Text style={{ color: "#fff", textAlign: 'center' }}>KAYDET</Text>
                    </TouchableOpacity>
                  </View>
                }

              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView >
      </Root>
    );
  }
}

export default GuvenlikAyarıScreen;

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

  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  name: {
    fontSize: 16,
    color: "#696969",
    fontWeight: "600",
    textTransform: 'lowercase'
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

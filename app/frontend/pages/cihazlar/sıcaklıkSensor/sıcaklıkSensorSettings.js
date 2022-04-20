import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Container, Root, Text, Spinner, Icon } from 'native-base';
import { GetTemperatureSensorSettings, PostTemperatureSensorSettingsUpdate } from '../../../../backend/sıcaklıkSensorController/GetSıcaklıkSensorSettings';
import SıcaklıkSensorInput from '../../../components/CustomTextInput/CustomTextInput';
import Picker from '../../../components/CustomPicker/CustomPicker';
import LinearGradient from 'react-native-linear-gradient'


class SıcaklıkSensorSettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataLoading: true,
      butonSpinner: false,
      locationAdress: '',
      not: '',
      veriGondermeAralıgı: "",
      isletmeAd: "",
      tesisatNo: ""
    }
    this._onChangeVeriGondermeAralıgı = this._onChangeVeriGondermeAralıgı.bind(this)
  }

  UNSAFE_componentWillMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.PageDidFocus()
    });
  }

  PageDidFocus = async () => {
    await GetTemperatureSensorSettings(this, this.props.sıcaklıkSensorNo);
  }

  goTemperatureSettingsUpdate = async () => {
    this.setState({ butonSpinner: true })
    await PostTemperatureSensorSettingsUpdate(this, this.props.sıcaklıkSensorNo)
    this.setState({ butonSpinner: false })
  }

  _onChangeVeriGondermeAralıgı = (getVeriGonderme) => {
    this.setState({ veriGondermeAralıgı: getVeriGonderme });
  }

  render() {
    const { data } = this.state;
    return (
      <Root>
        <Container>
          <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
            {this.state.dataLoading &&
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                <Spinner color='#aaa' style={{ width: "100%" }} />
              </View>
            }
            {!this.state.dataLoading &&

              <ScrollView style={{ flex: 1, backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 5 }}>

                <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} colors={['#ADE5FE', '#FFFFFF']} style={styles.dataContainer}>

                  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-Thin', left: 5 }}>Sıcaklık Sensör No : <Text style={{ color: '#DA7C62', fontSize: 12, fontFamily: 'Poppins-Thin', fontWeight: 'bold' }}>{data.measuring_device_id}</Text></Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-Thin', left: 5 }}> Modem No : <Text style={{ color: '#DA7C62', fontSize: 12, fontFamily: 'Poppins-Thin', fontWeight: 'bold' }}>{data.comm_device_id}</Text></Text>
                  </View>

                  <View style={{ height: 30, padding: 2, marginBottom: 10 }}>
                    <View style={{ height: 30, borderRadius: 8, backgroundColor: '#ddd', }}>
                      <Text style={{ bottom: -5, left: 3, fontFamily: 'Poppins-Thin', bottom: -2, fontSize: 15 }}>
                        <Icon type="FontAwesome5" name="map" style={{ fontSize: 15, color: '#DA7C62' }}> </Icon>Modbus Adresi : <Text style={{ color: '#DA7C62', fontSize: 14, fontFamily: 'Poppins-Thin', fontWeight: 'bold' }}>{data.modbus_adr}</Text></Text>
                    </View>
                  </View>


                  <SıcaklıkSensorInput
                    title="Adres"
                    icon="map-pin"
                    placeholder="Adres"
                    value={this.state.locationAdress}
                    onChangeText={(value) => this.setState({ locationAdress: value })}
                  />

                  <SıcaklıkSensorInput
                    title="Notlar"
                    icon="clipboard"
                    placeholder="Notlar"
                    value={this.state.not}
                    onChangeText={(value) => this.setState({ not: value })}
                  />

                  <SıcaklıkSensorInput
                    title="İşletme Adı"
                    icon="map-pin"
                    placeholder="İşletme Adı"
                    value={this.state.isletmeAd}
                    onChangeText={(value) => this.setState({ isletmeAd: value })}
                  />
                  <SıcaklıkSensorInput
                    title="Tesisat No"
                    icon="map-pin"
                    placeholder="Tesisat No"
                    value={this.state.tesisatNo}
                    onChangeText={(value) => this.setState({ tesisatNo: value })}
                  />

                  <Picker
                    title="Veri Gönderme Aralığı "
                    icon="calendar-alt"
                    inputTitle="Veri Gönderme Aralığı "
                    mainTitle="Veri Gönderme Aralığı "
                    navigation={this.props.navigation}
                    onValueChange={this._onChangeVeriGondermeAralıgı}
                    selectedValue={this.state.veriGondermeAralıgı}
                  />

                </LinearGradient>

                {this.state.butonSpinner &&
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
                    <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} colors={['#ADE5FE', '#FFFFFF']} style={styles.buttonView}>
                      <TouchableOpacity style={styles.button}>
                        <Spinner color='#fff' style={{ width: "100%" }} />
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                }

                {!this.state.butonSpinner &&
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
                    <LinearGradient start={{ x: 1, y: 1 }} end={{ x: -1, y: 0 }} colors={['#ADE5FE', '#FFFFFF']} style={styles.buttonView}>
                      <TouchableOpacity onPress={() => this.goTemperatureSettingsUpdate()} style={styles.button}>
                        <Text style={{ color: "#fff", textAlign: 'center' }}>KAYDET</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                }
              </ScrollView>
            }
          </View>
        </Container>
      </Root>
    );
  }
}

export default SıcaklıkSensorSettingsScreen;

const styles = StyleSheet.create({
  dataContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
    marginTop: 5,
    padding: 10
  },
  buttonView: {
    borderRadius: 8,
    height: 40,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  button: {
    borderRadius: 8,
    height: 40,
    width: 200,
    justifyContent: 'center'
  }

});

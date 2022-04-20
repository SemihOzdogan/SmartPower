import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Container, Root, Text, Spinner } from 'native-base';
import { GetMeterSettings, PostMeterSettingsUpdate } from '../../../../backend/sayacController/GetSayacSettings';
import SayacSettingsInput from '../../../components/CustomTextInput/CustomTextInput';
import Picker from '../../../components/CustomPicker/CustomPicker';
import CheckBox from '../../../components/CustomCheckBox/CustomCheckBox';
import LinearGradient from 'react-native-linear-gradient';

class MeterSettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataLoading: true,
      butonSpinner: false,
      location: '',
      latitude: '',
      longitude: '',
      aboneNo: '',
      locationAdress: '',
      not: '',
      gerilimOran: '',
      akımOran: '',
      faturaGunu: '',
      baglantıTuru: '',
      sozlesmeGucu: '',
      veriGondermeAralıgı: '',
      mailAlert: false,
      submitMailAlert: '',
      PTFUyumlu: '',
      veriZamanı: '',
      exportData: '',
      tipKodu: ''
    }
    this._onChangeGerilimOran = this._onChangeGerilimOran.bind(this)
    this._onChangeAkımOran = this._onChangeAkımOran.bind(this)
    this._onChangeFaturaGunu = this._onChangeFaturaGunu.bind(this)
    this._onChangeBaglantıTuru = this._onChangeBaglantıTuru.bind(this)
    this._onChangeVeriGondermeAralıgı = this._onChangeVeriGondermeAralıgı.bind(this)
    this._onChangePTF = this._onChangePTF.bind(this)
    this._onChangeVeriZamanı = this._onChangeVeriZamanı.bind(this)
    this._onChangeExportData = this._onChangeExportData.bind(this)

  }

  _onChangeGerilimOran = (getGerilim) => {
    this.setState({ gerilimOran: getGerilim });
  }
  _onChangeAkımOran = (getAkımOran) => {
    this.setState({ akımOran: getAkımOran });
  }
  _onChangeFaturaGunu = (getFaturaGunu) => {
    this.setState({ faturaGunu: getFaturaGunu });
  }
  _onChangeBaglantıTuru = (getBaglantıTuru) => {
    this.setState({ baglantıTuru: getBaglantıTuru });
  }
  _onChangeVeriGondermeAralıgı = (getVeriGondermeAralıgı) => {
    this.setState({ veriGondermeAralıgı: getVeriGondermeAralıgı });
  }
  _onChangePTF = (getPTF) => {
    this.setState({ PTFUyumlu: getPTF });
  }
  _onChangeVeriZamanı = (getVeriZamanı) => {
    this.setState({ veriZamanı: getVeriZamanı });
  }
  _onChangeExportData = (getExportData) => {
    this.setState({ exportData: getExportData });
  }

  isMailAlertChecked = async () => {
    await this.setState({ mailAlert: !this.state.mailAlert })
    if (this.state.mailAlert == true) {
      this.setState({ submitMailAlert: 1 })
    } else {
      this.setState({ submitMailAlert: 0 })
    }
  }


  UNSAFE_componentWillMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.PageDidFocus()
    });
  }

  PageDidFocus = async () => {
    await GetMeterSettings(this, this.props.meterNo);
  }

  goMeterSettingsUpdate = async () => {
    this.setState({ butonSpinner: true })
    await PostMeterSettingsUpdate(this, this.props.meterNo)
    this.setState({ butonSpinner: false })
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

              <ScrollView style={{ flex: 1, backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 5 }}>

                <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} colors={['#ADE5FE', '#FFFFFF']} style={styles.dataContainer}>

                  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <View style={{ flex: 1, }}>
                      <Text style={{ fontSize: 14, fontFamily: 'Poppins-Thin', left: 5, textAlign: 'center' }}>Sayaç No <Text style={{ color: '#DA7C62', fontSize: 12, fontFamily: 'Poppins-Thin', fontWeight: 'bold' }}>{data.measuring_device_id}</Text></Text>
                    </View>
                    <View style={{ flex: 1, }}>
                      <Text style={{ fontSize: 14, fontFamily: 'Poppins-Thin', left: 5, textAlign: 'center' }}> Modem No <Text style={{ color: '#DA7C62', fontSize: 12, fontFamily: 'Poppins-Thin', fontWeight: 'bold' }}>{data.comm_device_id}</Text></Text>
                    </View>

                  </View>

                  <SayacSettingsInput
                    title="Konum Bilgisi"
                    icon="map-marker-alt"
                    placeholder="Konum"
                    value={this.state.location}
                    onChangeText={(value) => this.setState({ location: value })}
                  />
                  <SayacSettingsInput
                    title="Enlem Bilgisi"
                    icon="compass"
                    placeholder="Enlem"
                    value={this.state.latitude}
                    onChangeText={(value) => this.setState({ latitude: value })}
                  />
                  <SayacSettingsInput
                    title="Boylam Bilgisi"
                    icon="compass"
                    placeholder="Boylam"
                    value={this.state.longitude}
                    onChangeText={(value) => this.setState({ longitude: value })}
                  />
                  <SayacSettingsInput
                    title="Abone No"
                    icon="file-invoice"
                    placeholder="Abone No"
                    value={this.state.aboneNo}
                    onChangeText={(value) => this.setState({ aboneNo: value })}
                  />
                  <SayacSettingsInput
                    title="Adres"
                    icon="map-pin"
                    placeholder="Adres"
                    value={this.state.locationAdress}
                    onChangeText={(value) => this.setState({ locationAdress: value })}
                  />
                  <SayacSettingsInput
                    title="Notlar"
                    icon="clipboard"
                    placeholder="Notlar"
                    value={this.state.not}
                    onChangeText={(value) => this.setState({ not: value })}
                  />

                  <Picker
                    title="Akım Trafosu Oranı"
                    icon="keyboard"
                    inputTitle="Akım Trafosu Oranı"
                    mainTitle="Akım Trafosu Oranı"
                    navigation={this.props.navigation}
                    onValueChange={this._onChangeAkımOran}
                    selectedValue={this.state.akımOran}
                  />

                  <Picker
                    title="Gerilim Trafosu Oranı"
                    icon="keyboard"
                    inputTitle="Gerilim Trafosu Oranı"
                    mainTitle="Gerilim Trafosu Oranı"
                    navigation={this.props.navigation}
                    onValueChange={this._onChangeGerilimOran}
                    selectedValue={this.state.gerilimOran}
                  />

                  <Picker
                    title="Veri Gönderme Aralığı"
                    icon="clock"
                    inputTitle="Veri Gönderme Aralığı"
                    mainTitle="Veri Gönderme Aralığı"
                    navigation={this.props.navigation}
                    onValueChange={this._onChangeVeriGondermeAralıgı}
                    selectedValue={this.state.veriGondermeAralıgı}
                  />

                  <Picker
                    title="Ayın Fatura Günü"
                    icon="calendar-alt"
                    inputTitle="Ayın Fatura Günü"
                    mainTitle="Ayın Fatura Günü"
                    navigation={this.props.navigation}
                    onValueChange={this._onChangeFaturaGunu}
                    selectedValue={this.state.faturaGunu}
                  />
                  <Picker
                    title="Bağlantı Şekli"
                    icon="plug"
                    inputTitle="Bağlantı Şekli"
                    mainTitle="Bağlantı Şekli"
                    navigation={this.props.navigation}
                    onValueChange={this._onChangeBaglantıTuru}
                    selectedValue={this.state.baglantıTuru}
                  />
                  <Picker
                    title="PTF Uyumlu"
                    icon="link"
                    inputTitle="PTF Uyumlu"
                    mainTitle="PTF Uyumlu"
                    navigation={this.props.navigation}
                    onValueChange={this._onChangePTF}
                    selectedValue={this.state.PTFUyumlu}
                  />
                  <Picker
                    title="Veri Zamanı"
                    icon="history"
                    inputTitle="Veri Zamanı"
                    mainTitle="Veri Zamanı"
                    navigation={this.props.navigation}
                    onValueChange={this._onChangeVeriZamanı}
                    selectedValue={this.state.veriZamanı}
                  />
                  <Picker
                    title="Export Datalar Görünsün"
                    icon="eye"
                    inputTitle="Export Datalar Görünsün"
                    mainTitle="Export Datalar Görünsün"
                    navigation={this.props.navigation}
                    onValueChange={this._onChangeExportData}
                    selectedValue={this.state.exportData}
                  />
                  <SayacSettingsInput
                    title="Sözleşme Gücü (kW)"
                    icon="battery-half"
                    placeholder="Sözleşme Gücü"
                    value={this.state.sozlesmeGucu}
                    onChangeText={(value) => this.setState({ sozlesmeGucu: value })}
                  />
                  <SayacSettingsInput
                    title="Tip Kodu"
                    icon="window-restore"
                    placeholder="Tip Kodu"
                    value={this.state.tipKodu}
                    onChangeText={(value) => this.setState({ tipKodu: value })}
                  />
                  <CheckBox
                    title="Mail Uyarıları Aktif"
                    icon="envelope-open-text"
                    onPress={() => this.isMailAlertChecked()}
                    checked={this.state.mailAlert}
                  />

                </LinearGradient>

                {this.state.butonSpinner &&
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} colors={['#ADE5FE', '#FFFFFF']} style={styles.buttonView}>
                      <TouchableOpacity style={styles.button}>
                        <Spinner color='#fff' style={{ width: "100%" }} />
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                }

                {!this.state.butonSpinner &&
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <LinearGradient start={{ x: 1, y: 1 }} end={{ x: -1, y: 0 }} colors={['#ADE5FE', '#FFFFFF']} style={styles.buttonView}>
                      <TouchableOpacity onPress={() => this.goMeterSettingsUpdate()} style={styles.button}>
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

export default MeterSettingsScreen;

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
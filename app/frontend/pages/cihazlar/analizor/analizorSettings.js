import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Container, Root, Text, Spinner } from 'native-base';
import { GetAnalizorSettings, PostAnalizorSettingsUpdate } from '../../../../backend/analizorController/GetAnalizorSettings';
import AnalizorSettingsInput from '../../../components/CustomTextInput/CustomTextInput';
import Picker from '../../../components/CustomPicker/CustomPicker';
import CheckBox from '../../../components/CustomCheckBox/CustomCheckBox';
import LinearGradient from 'react-native-linear-gradient'

class AnalizorSettingsScreen extends Component {
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
      faturaGunu: '',
      sozlesmeGucu: '',
      exportData: '',
      mailAlert: false,
      submitMailAlert: '',
    };
    this._onChangeFaturaGunu = this._onChangeFaturaGunu.bind(this)
    this._onChangeExportData = this._onChangeExportData.bind(this)
  }

  _onChangeFaturaGunu = (getFaturaGunu) => {
    this.setState({ faturaGunu: getFaturaGunu });
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
    await GetAnalizorSettings(this, this.props.analizorNo);
  }

  goAnalizorSettingsUpdate = async () => {
    this.setState({ butonSpinner: true })
    await PostAnalizorSettingsUpdate(this, this.props.analizorNo)
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

              <ScrollView style={{ flex: 1, backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 5 }}>

                <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} colors={['#ADE5FE', '#FFFFFF']} style={styles.dataContainer}>

                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-Thin', left: 5 }}>Analizör No : <Text style={{ color: '#DA7C62', fontSize: 12, fontFamily: 'Poppins-Thin', fontWeight: 'bold' }}>{data.measuring_device_id}</Text></Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-Thin', left: 5 }}> Modem No : <Text style={{ color: '#DA7C62', fontSize: 12, fontFamily: 'Poppins-Thin', fontWeight: 'bold' }}>{data.comm_device_id}</Text></Text>
                  </View>

                  <AnalizorSettingsInput
                    title="Konum Bilgisi"
                    icon="map-marker-alt"
                    placeholder="Konum"
                    value={this.state.location}
                    onChangeText={(value) => this.setState({ location: value })}
                  />
                  <AnalizorSettingsInput
                    title="Enlem Bilgisi"
                    icon="compass"
                    placeholder="Enlem"
                    value={this.state.latitude}
                    onChangeText={(value) => this.setState({ latitude: value })}
                  />
                  <AnalizorSettingsInput
                    title="Boylam Bilgisi"
                    icon="compass"
                    placeholder="Boylam"
                    value={this.state.longitude}
                    onChangeText={(value) => this.setState({ longitude: value })}
                  />
                  <AnalizorSettingsInput
                    title="Abone No"
                    icon="file-invoice"
                    placeholder="Abone No"
                    value={this.state.aboneNo}
                    onChangeText={(value) => this.setState({ aboneNo: value })}
                  />
                  <AnalizorSettingsInput
                    title="Adres"
                    icon="map-pin"
                    placeholder="Adres"
                    value={this.state.locationAdress}
                    onChangeText={(value) => this.setState({ locationAdress: value })}
                  />
                  <AnalizorSettingsInput
                    title="Notlar"
                    icon="clipboard"
                    placeholder="Notlar"
                    value={this.state.not}
                    onChangeText={(value) => this.setState({ not: value })}
                  />
                  <AnalizorSettingsInput
                    title="Sözleşme Gücü (kW)"
                    icon="battery-half"
                    placeholder="Sözleşme Gücü"
                    value={this.state.sozlesmeGucu}
                    onChangeText={(value) => this.setState({ sozlesmeGucu: value })}
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
                    title="Export Datalar Görünsün"
                    icon="eye"
                    inputTitle="Export Datalar Görünsün"
                    mainTitle="Export Datalar Görünsün"
                    navigation={this.props.navigation}
                    onValueChange={this._onChangeExportData}
                    selectedValue={this.state.exportData}
                  />
                  <CheckBox
                    title="Mail Uyarıları Aktif"
                    icon="envelope-open-text"
                    onPress={() => this.isMailAlertChecked()}
                    checked={this.state.mailAlert}
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
                      <TouchableOpacity onPress={() => this.goAnalizorSettingsUpdate()} style={styles.button}>
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

export default AnalizorSettingsScreen;

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

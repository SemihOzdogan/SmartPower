import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, RefreshControl, Alert } from 'react-native';
import { Container, Root, Spinner, Icon } from 'native-base';
import { MobilSmsAlarmsTextInputComponent } from '../../components/CustomTextInput/CustomTextInput';
import { AlarmDefinitions, AlarmSmsNumberUpdate, AlarmDefinitionsStatusChange } from '../../../backend/alarmDefinitionsController/AlarmDefinition';

class SmsAlarmsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      definedSmsRules: [],
      dataLoading: true,
      dataError: "",
      phone1: "",
      phone2: "",
      phone3: "",
      spinner: false
    };
  }

  UNSAFE_componentWillMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.PageDidFocus()
    });
  }

  PageDidFocus = async () => {
    this.setState({ dataLoading: true })
    await AlarmDefinitions(this, this.props.url, this.props.productNo);
  }

  refreshData = async () => {
    this.setState({ dataLoading: true })
    await AlarmDefinitions(this, this.props.url, this.props.productNo);
    this.setState({ dataLoading: false })
  }

  alarmStatusChange = async (item) => {
    await AlarmDefinitionsStatusChange(this, item.alarm_type_id, item.alarm_id, item.status == 1 ? 0 : 1)
    this.refreshData()
  }


  _renderItem = ({ item }) => {
    return (
      <View style={{ width: '100%', height: 60, backgroundColor: '#f5f5f5', borderRadius: 6, flexDirection: 'row', marginVertical: 5, }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Icon type="FontAwesome5" name={item.alarm_icon} style={{ fontSize: 30, color: item.status == 1 ? item.alarm_color : 'gray' }} />
        </View>
        <View style={{ flex: 6, }}>
          <View style={{ flex: 1.8, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, fontFamily: 'Poppins-Light' }}>{item.name}</Text>
          </View>
          <View style={{ flex: 2, flexDirection: 'row', margin: 5 }}>
            <View style={{ flex: 1, marginRight: 5, borderColor: '#C7E89F', borderWidth: 1, borderRadius: 6 }}>
              <TouchableOpacity onPress={() => this.alarmStatusChange(item)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Icon type="FontAwesome5" name={item.status == 1 ? "pause" : "play-circle"} style={{ color: item.status == 1 ? '#C7E89F' : 'gray', fontSize: 20 }} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginRight: 5, borderWidth: 1, borderRadius: 6, borderColor: '#A8E4E8', }}>
              <TouchableOpacity onPress={() => Alert.alert(
                "Bilgilendirme  💬",
                "Sms Alarm Tanımları için çalışmamız devam etmektedir.En kısa zamanda hizmetinize sunacağız.",
                [
                
                  { text: "Tamam", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              )}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Icon type="FontAwesome5" name="edit" style={{ color: item.status == 1 ? '#A8E4E8' : 'gray', fontSize: 20 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View >
    )
  }

  render() {
    return (
      <Root>
        <Container>
          <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
            {this.state.dataLoading &&
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                <Spinner color='#aaa' style={{ width: "100%" }} />
              </View>
            }

            {!this.state.dataLoading && this.state.dataError != "" &&
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                <Text style={{ fontSize: 16, borderRadius: 6, backgroundColor: '#FCF8E3', fontFamily: 'Poppins-Light', color: '#8a6d3b', padding: 10 }}>{this.state.dataError}</Text>
              </View>
            }
            {!this.state.dataLoading && this.state.dataError == "" &&

              < ScrollView style={{ flex: 1, paddingHorizontal: 10, backgroundColor: 'white', }}>
                <View style={{ width: '100%', justifyContent: 'center', padding: 5, flexDirection: 'row', backgroundColor: '#f5f5f5', borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}>
                  <Text style={{ fontFamily: 'Poppins-Light', color: '#44b6ae', fontSize: 16 }}>Modem SMS Alarmları</Text>
                </View>

                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 6, padding: 10, top: 5, marginBottom: 10 }}>

                  < MobilSmsAlarmsTextInputComponent
                    onChangeText={(value) => this.setState({ phone1: value })}
                    value={this.state.phone1}
                    onSubmitEditing={() => AlarmSmsNumberUpdate(this, this.props.productNo)} />
                  < MobilSmsAlarmsTextInputComponent
                    onChangeText={(value) => this.setState({ phone2: value })}
                    value={this.state.phone2}
                    onSubmitEditing={() => AlarmSmsNumberUpdate(this, this.props.productNo)} />
                  < MobilSmsAlarmsTextInputComponent
                    onChangeText={(value) => this.setState({ phone3: value })}
                    value={this.state.phone3}
                    onSubmitEditing={() => AlarmSmsNumberUpdate(this, this.props.productNo)} />

                  {!this.state.dataLoading && this.state.definedSmsRules == "" &&
                    < View style={{ width: '100%', height: 50, marginVertical: 10, justifyContent: "center", alignItems: "center", borderRadius: 6, backgroundColor: '#FCF8E3', }}>
                      <Text style={{ color: '#8a6d3b' }}>Hiçbir alarm tanımı oluşturulmadı</Text>
                    </View>
                  }

                  {this.state.spinner &&
                    <View style={{ width: '100%', height: 40, justifyContent: 'center', top: 5 }}>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ width: '50%', flex: 1, backgroundColor: '#44b6ae', justifyContent: 'center', alignItems: 'center', borderRadius: 6 }}>
                          <Spinner color='#fff' />
                        </TouchableOpacity>
                      </View>
                    </View>
                  }

                  {!this.state.spinner &&
                    <View style={{ width: '100%', height: 40, justifyContent: 'center', top: 5 }}>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => AlarmSmsNumberUpdate(this, this.props.productNo)} style={{ width: '50%', flex: 1, backgroundColor: '#44b6ae', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 6 }}>
                          <Icon type="FontAwesome5" name="mobile-alt" style={{ color: 'white', fontSize: 20 }} />
                          <Text style={{ color: 'white' }}> SMS Kaydet</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  }
                </View>
                <FlatList
                  data={this.state.definedSmsRules}
                  keyExtractor={(index, id) => id.toString()}
                  refreshControl={<RefreshControl refreshing={this.state.refresing} onRefresh={() => this.refreshData()} />}
                  renderItem={this._renderItem}
                  showsVerticalScrollIndicator={false}
                />

              </ ScrollView>
            }
          </View>
        </Container>
      </Root >
    );
  }
}

export default SmsAlarmsScreen;

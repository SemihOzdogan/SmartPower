import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, RefreshControl, Alert, } from 'react-native';
import { Container, Root, Spinner, Icon } from 'native-base';
import { AlarmDefinitions, DeleteAlarmDefinitions, AlarmDefinitionsStatusChange } from '../../../backend/alarmDefinitionsController/AlarmDefinition';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';

class EmailAndMobileAlarmsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DefinedEmailRules: [],
      UndefinedEmailRules: [],
      dataLoading: true,
      dataError: "",
      refresing: false,
      preferences: false,
      status: false,
      email: false,
      mobile: false,
    }
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

  preferences(visible) {
    this.setState({ preferences: visible });
  }

  deleteAlarmDefinition = async (item) => {
    await DeleteAlarmDefinitions(this, item.alarm_type_id, item.alarm_id)
    this.refreshData()
  }

  alarmStatusChange = async (item) => {
    await AlarmDefinitionsStatusChange(this, item.alarm_type_id, item.alarm_id, item.status == 1 ? 0 : 1)
    this.refreshData()
  }

  deleteConfirmAlarm = (item) =>
    Alert.alert(
      "Alarm Durumu",
      "Silmek istediğinize emin misiniz ?",
      [
        {
          text: "İptal",
          onPress: () => console.log("Ask me later pressed")
        },

        { text: "Evet", onPress: () => this.deleteAlarmDefinition(item) }
      ],
      { cancelable: false }
    );

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
            <View style={{ flex: 1, marginLeft: 5, marginRight: 5, borderWidth: 1, borderColor: '#FF9E9E', borderRadius: 6, }}>
              <TouchableOpacity onPress={() => this.deleteConfirmAlarm(item)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Icon type="FontAwesome5" name="trash-alt" style={{ color: item.status == 1 ? '#FF9E9E' : 'gray', fontSize: 20, }} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginRight: 5, borderColor: '#C7E89F', borderWidth: 1, borderRadius: 6 }}>
              <TouchableOpacity onPress={() => this.alarmStatusChange(item)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Icon type="FontAwesome5" name={item.status == 1 ? "pause" : "play"} style={{ color: item.status == 1 ? '#C7E89F' : 'gray', fontSize: 20 }} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginRight: 5, borderWidth: 1, borderRadius: 6, borderColor: '#A8E4E8', }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('AlarmChange', {
                alarmData: item,
                alarmdeviceID: this.props.productNo,
                key: Math.random().toString()
              })}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Icon type="FontAwesome5" name="edit" style={{ color: item.status == 1 ? '#A8E4E8' : 'gray', fontSize: 20 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  _renderItemAlarmAdd = ({ item }) => {
    return (
      <ScrollView>
        <TouchableOpacity onPress={() => { this.alarmDefinitionAdd(item); this.preferences(false) }}>
          <Animatable.View animation="fadeInDown" iterationCount={1} direction="alternate" style={{ width: '100%', height: 70, backgroundColor: item.alarm_color, flexDirection: 'row', marginVertical: 10, borderRadius: 4, padding: 5 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Icon type="FontAwesome5" name={item.alarm_icon} style={{ fontSize: 40, color: '#E5E5E5' }} />
            </View>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ fontSize: 18, color: 'white' }}>{item.name}</Text>
            </View>
          </Animatable.View>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  alarmDefinitionAdd = async (item) => {
    this.props.navigation.navigate('AlarmChange', {
      alarmData: item,
      alarmdeviceID: this.props.productNo,
      key: Math.random().toString()
    })
  }

  render() {
    return (
      <Root>
        <Modal
          isVisible={this.state.preferences}
          backdropOpacity={0.4}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
        >
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0)", justifyContent: "center", alignItems: "center" }}>
            <View style={{ width: "100%", height: "80%", backgroundColor: "white", padding: 15, borderRadius: 4 }}>
              <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 20 }}>Eklenecek Alarm Tipini Seç</Text>
              <View style={{ flex: 1, }}>
                <FlatList
                  data={this.state.UndefinedEmailRules}
                  keyExtractor={(index, id) => id.toString()}
                  renderItem={this._renderItemAlarmAdd}
                  showsVerticalScrollIndicator={false}
                />
              </View>
              <View style={{ width: '100%', height: 40, top: 10 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                  <TouchableOpacity onPress={() => { this.preferences(false) }} style={{ width: '50%', backgroundColor: '#ddd', height: 40, borderWidth: 1, borderColor: '#444', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                    <Text style={{ color: '#444', fontSize: 16 }}>Vazgeç</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
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

              <ScrollView style={{ flex: 1, paddingHorizontal: 10, backgroundColor: 'white', }}>
                <View style={{ width: '100%', justifyContent: 'center', padding: 5, flexDirection: 'row', backgroundColor: '#f5f5f5', borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}>
                  <Text style={{ fontFamily: 'Poppins-Light', color: '#44b6ae', fontSize: 16, textAlign: 'center' }}>  Kullanıcı E-Posta ve Mobil Bildirim Alarmları</Text>
                </View>
                <FlatList
                  data={this.state.DefinedEmailRules}
                  keyExtractor={(index, id) => id.toString()}
                  refreshControl={<RefreshControl refreshing={this.state.refresing} onRefresh={() => this.refreshData()} />}
                  renderItem={this._renderItem}
                  showsVerticalScrollIndicator={false}
                />
                {!this.state.dataLoading && this.state.DefinedEmailRules == "" &&
                  < View style={{ width: '100%', height: 50, marginVertical: 10, justifyContent: "center", alignItems: "center", borderRadius: 6, backgroundColor: '#FCF8E3', }}>
                    <Text style={{ color: '#8a6d3b' }}>Hiçbir alarm tanımı oluşturulmadı</Text>
                  </View>
                }

                {
                  this.state.UndefinedEmailRules != "" &&
                  <View style={{ width: '100%', height: 40, justifyContent: 'center', marginBottom: 10, marginTop: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                      <TouchableOpacity onPress={() => { this.preferences(true) }} style={{ width: '60%', flex: 1, backgroundColor: '#44b6ae', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 4 }}>
                        <Icon type="FontAwesome5" name="plus-circle" style={{ color: 'white', fontSize: 25 }} />
                        <Text style={{ color: 'white', fontSize: 16 }}> Tanım Ekle</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                }

              </ScrollView>
            }
          </View>
        </Container>
      </Root >
    );
  }
}

export default EmailAndMobileAlarmsScreen;

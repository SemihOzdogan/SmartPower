import React, { Component } from 'react';
import { View, SafeAreaView, FlatList, RefreshControl, TouchableOpacity, TextInput } from 'react-native';
import { Icon, Text, Spinner, ListItem, Root } from 'native-base';
import { GetConnectDevicesSettings, PostAddMeters } from '../../../../backend/modemController/GetConnectDevices';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';

class ModemDevicesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      dataLoading: true,
      isDevices: false,
      preferences: false,
      meterID: "",
      meterStatus: ""
    }
  }

  UNSAFE_componentWillMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.PageDidFocus()
    });
  }

  preferences(visible) {
    this.setState({ preferences: visible });
  }

  PageDidFocus = async () => {
    this.setState({ dataLoading: true })
    await GetConnectDevicesSettings(this, this.props.modemNo);
    this.setState({ dataLoading: false })

  }
  refreshData() {
    this.setState({
      dataLoading: true
    })
    GetConnectDevicesSettings(this, this.props.modemNo);
  }

  _renderItem = ({ item }) => {
    return (
      <ListItem style={{
        backgroundColor: "white", borderRadius: 8, borderBottomColor: "#ddd", borderBottomWidth: 16, marginHorizontal: 15, marginVertical: 5, top: 10, paddingLeft: 5
      }}>
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: "#80d8ff", width: 20, height: 20, position: "absolute", top: -11, left: -4, justifyContent: 'center', alignItems: 'center', borderRadius: 20 / 2 }}>
            <Text style={{ color: 'white', fontSize: 10 }}>{item.temp_id}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Icon type="FontAwesome5" name="map-marker-alt" style={{ color: '#DA7C62', fontSize: 16 }}><Text style={{ fontSize: 12, color: "#999", textAlign: "center" }} numberOfLines={1}> {item.location}</Text></Icon>
          </View>

          <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} colors={['#ADE5FE', '#FFFFFF']} style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 5, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 5, borderRadius: 4 }}>

            <View style={{ backgroundColor: '#ddd', borderLeftWidth: 5, borderColor: '#80d8ff', flexDirection: 'row', marginTop: 5 }}>
              <View>
                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', paddingLeft: 3 }}>Cihaz No  </Text>
              </View>
              <View style={{ backgroundColor: 'white', borderRightWidth: 5, borderColor: '#80d8ff', }}>
                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', color: "#111", paddingLeft: 3, paddingRight: 3 }}>{item.device_id}</Text>
              </View>
            </View>

            <View style={{ backgroundColor: '#ddd', borderLeftWidth: 5, borderColor: '#80d8ff', flexDirection: 'row', marginTop: 5 }}>
              <View>
                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', paddingLeft: 3 }}>ModBus Adresi  </Text>
              </View>
              <View style={{ backgroundColor: 'white', borderRightWidth: 5, borderColor: '#80d8ff', }}>
                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', color: "#111", paddingLeft: 3, paddingRight: 3 }}>{item.modbus}</Text>
              </View>
            </View>

            <View style={{ backgroundColor: '#ddd', borderLeftWidth: 5, borderColor: '#80d8ff', flexDirection: 'row', marginTop: 5 }}>
              <View>
                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', paddingLeft: 3 }}>İlk Veri Zamanı  </Text>
              </View>
              <View style={{ backgroundColor: 'white', borderRightWidth: 5, borderColor: '#80d8ff', }}>
                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', color: "#111", paddingLeft: 3, paddingRight: 3 }}>{item.first_data_time}</Text>
              </View>
            </View>
            <View style={{ backgroundColor: '#ddd', borderLeftWidth: 5, borderColor: '#80d8ff', flexDirection: 'row', marginTop: 5 }}>
              <View>
                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', paddingLeft: 3 }}>Son Veri Zamanı  </Text>
              </View>
              <View style={{ backgroundColor: 'white', borderRightWidth: 5, borderColor: '#80d8ff', }}>
                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', color: "#111", paddingLeft: 3, paddingRight: 3 }}>{item.last_data_time}</Text>
              </View>
            </View>
            <View style={{ backgroundColor: '#ddd', borderLeftWidth: 5, borderColor: '#80d8ff', flexDirection: 'row', marginTop: 5 }}>
              <View>
                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', paddingLeft: 3 }}>Son Kullanım Zamanı </Text>
              </View>
              <View style={{ backgroundColor: item.warningColor, borderRightWidth: 5, borderColor: '#80d8ff', }}>
                <Text style={{ color: item.warningTextColor, fontSize: 12, fontFamily: 'Poppins-Light', paddingLeft: 3, paddingRight: 3 }}>{item.payment_date}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ListItem>
    )
  }

  render() {

    return (
      <Root>
        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>

          <Modal
            isVisible={this.state.preferences}
            onSwipeComplete={() => this.setState({ preferences: false })}
            backdropOpacity={0.4}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
            swipeDirection={['up', 'left', 'right', 'down']}>
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0)", justifyContent: "center", alignItems: "center" }}>
              <View style={{ width: "100%", height: 150, backgroundColor: "white", padding: 15 }}>
                <View style={{ width: 30, height: 30, position: 'absolute', right: 0, }}>
                  <TouchableOpacity style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.preferences(false)}>
                    <Icon type="FontAwesome5" name="times" style={{ color: 'gray' }} />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                  <Text style={{ fontSize: 14, fontFamily: 'Poppins-Light', top: -5 }}>Modem ilk sayacı otomatik okur birden fazla sayaç girileceği zaman burdan ekleyiniz.</Text>
                  <View style={{ width: '100%', height: 50, backgroundColor: 'white', borderRadius: 6, alignItems: 'center', }}>
                    <View style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', }}>
                      <View style={{ flex: 1, borderWidth: 1.3, borderColor: '#00AEEF', borderRadius: 6, flexDirection: 'row' }}>
                        <View style={{ flex: 3 }}>
                          <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Sayaç No Giriniz"
                            style={{ alignItems: 'center', justifyContent: 'center', color: '#9CCD6D', padding: 10 }}
                            placeholderTextColor="#9CCD6D"
                            fontSize={18}
                            maxLength={14}
                            value={this.state.meterID}
                            onChangeText={(value) => this.setState({ meterID: value })}
                            autoCapitalize='characters'
                          >
                          </TextInput>
                        </View>
                        <TouchableOpacity onPress={() => { PostAddMeters(this, this.props.modemNo); this.preferences(!this.state.preferences); this.refreshData() }}
                          style={{ flex: 1, backgroundColor: '#00AEEF', alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 4, borderBottomRightRadius: 4, }}>
                          <Icon type="FontAwesome5" name="plus-square" style={{ color: '#9CCD6D', fontSize: 30 }}></Icon>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ flex: 0.3, backgroundColor: '#FCF8E3', justifyContent: 'center', alignItems: 'center', borderRadius: 6 }}>
                  <Text style={{ fontSize: 14, color: '#8a6d3b', }}>(Format : ABC12345678 veya ABC12345678901)</Text>
                </View>
              </View>
            </View>
          </Modal>

          {this.state.dataLoading &&
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
              <Spinner color='#aaa' style={{ width: "100%" }} />
            </View>
          }

          {!this.state.dataLoading &&

            <SafeAreaView style={{ flex: 1, borderRadius: 8, backgroundColor: '#f5f5f5', }}>
              {this.state.isDevices == true &&
                < View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                  <Text style={{ fontSize: 16, padding: 10, borderRadius: 6, backgroundColor: '#FCF8E3', fontFamily: 'Poppins-Light', textAlign: 'center', color: '#8a6d3b' }}>Modeminize ait bağlı cihaz bulunmamaktadır</Text>
                </View>
              }




              {this.state.meterStatus != 1 &&
                <View style={{ width: '100%', height: 30, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                  <Text>Modeme sayaç eklemek için </Text>
                  <TouchableOpacity onPress={() => { this.preferences(!this.state.preferences) }} style={{ width: 30, alignItems: 'center' }}><Icon type="FontAwesome5" name="plus-circle" style={{ fontSize: 16, color: '#80d8ff' }} /></TouchableOpacity>
                  <Text> dokunun</Text>
                </View>
              }

              {this.state.isDevices == false &&
                <FlatList
                  data={this.state.dataSource}
                  keyExtractor={(index, id) => id.toString()}
                  // refreshControl={<RefreshControl refreshing={this.state.refresing} onRefresh={() => this.refreshData()} />}
                  renderItem={this._renderItem}
                  showsVerticalScrollIndicator={false}
                >
                </FlatList>
              }
            </SafeAreaView >
          }
        </View>
      </Root>
    );
  }
}

export default ModemDevicesScreen;


import React, { Component } from 'react';
import { View, TouchableOpacity, SafeAreaView, FlatList, RefreshControl, TextInput, StyleSheet, } from 'react-native';
import { Icon, Text, Spinner, Picker, Item } from 'native-base';
import { GetModBusSettings, PostModBusSettings } from '../../../../backend/modemController/GetModBusSettings';
import LinearGradient from 'react-native-linear-gradient';


class ModemModBusScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      dataLoading: false,
      deletedRowKey: null,
      isModbus: false,
      dataAdress: [],
      dataType: [],
      dataBaudRate: ['300', '600', '1200', '2400', '4800', '9600', '19200', '38400', '57600', '115200', '256000'],
      selectedType: '',
      selectedAdress: '',
      selectedBaudRate: '',
    };
  }

  UNSAFE_componentWillMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.PageDidFocus()
    });
  }

  PageDidFocus = async () => {
    await GetModBusSettings(this, this.props.modemNo);
  }

  refreshData() {
    this.setState({ dataLoading: true })
    GetModBusSettings(this, this.props.modemNo);
  }

  _renderItem = ({ item, index }) => (
    <View>
      <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} colors={['#ADE5FE', '#FFFFFF']} style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 5, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 15, borderRadius: 4 }}>
        <View style={{ borderLeftWidth: 5, borderColor: '#80d8ff', flexDirection: 'row', marginTop: 5 }}>
          <View style={{ width: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{item.modbus_adr}</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: 'white', borderColor: '#80d8ff', height: 50, justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontFamily: 'Poppins-Light', color: "#111", paddingLeft: 3, paddingRight: 3 }}>{item.user_device_preference}</Text>
          </View>
          {/* <View style={{ width: 50, height: 50, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { this.removeItem(index) }}>
                              <Icon type="FontAwesome5" name="trash-alt" style={{ fontSize: 27, color: '#F56054' }} />
                            </TouchableOpacity>
                          </View> */}
        </View>
      </LinearGradient>
    </View>
  )

  // removeItem = (index) => {
  //   let allItems = [...this.state.dataSource];
  //   let filteredItems = allItems.filter((index) => index != index);
  //   this.setState({ dataSource: filteredItems })
  //   PostModBusSettings(this, this.props.modemNo, this.state.dataSource)
  // }

  // FlatListItemSeparator = () => {
  //   return (
  //     <View
  //       style={{
  //         height: 1,
  //         width: "100%",
  //         backgroundColor: "#607D8B",
  //       }}
  //     />
  //   );
  // }

  // joinData = () => {
  //   this.state.dataSource.push({ modbus_adr: this.state.selectedAdress, user_device_preference: this.state.selectedType, baud_rate: this.state.selectedBaudRate });
  //   PostModBusSettings(this, this.props.modemNo, this.state.dataSource)
  // }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        {this.state.dataLoading &&
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
            <Spinner color='#aaa' style={{ width: "100%" }} />
          </View>
        }

        {!this.state.dataLoading &&
          <SafeAreaView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: 10, backgroundColor: '#f5f5f5', paddingVertical: 10, }}>
            {this.state.isModbus == true &&
              < View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ fontSize: 16, padding: 10, borderRadius: 6, backgroundColor: '#FCF8E3', fontFamily: 'Poppins-Light', textAlign: 'center', color: '#8a6d3b' }}>Modbus adresi bulunmamaktadır</Text>
              </View>
            }

            {/* <View style={{ width: '100%', height: 55, alignItems: 'center' }}>
              <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} colors={['#ADE5FE', '#ADE5FE']} style={{ flex: 1, flexDirection: 'row', backgroundColor: '#f5f5f5', padding: 5, justifyContent: 'flex-start', alignItems: 'flex-start', borderRadius: 4 }}>
                <View style={{ flex: 0.7, flexDirection: 'column', alignItems: 'center', margin: 2 }}>
                  <Text style={{ fontSize: 12, color: '#111' }}>Adres</Text>
                  <Picker
                    placeholder={this.state.dataAdress[0]}
                    mode="dialog"
                    iosHeader="Modbus Adresi"
                    headerBackButtonText="Geri"
                    style={{ justifyContent: 'center', height: 28, width: '100%', marginTop: 2, backgroundColor: 'white', }}
                    placeholderStyle={{ fontSize: 8, color: '#111',}}
                    selectedValue={this.state.selectedAdress}
                    onValueChange={(value) => this.setState({ selectedAdress: value })}
                  >
                    {this.state.dataAdress.map(adres => {
                      return <Picker.Item label={adres} value={adres} />
                    })
                    }
                  </Picker>
                </View>
                <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center', margin: 2 }}>
                  <Text style={{ fontSize: 12, color: '#111' }}>Cihaz Tipi</Text>
                  <Picker
                    placeholder={this.state.dataType[0]}
                    mode="dialog"
                    iosHeader="Cihaz Tipi"
                    headerBackButtonText="Geri"
                    style={{ textAlign: 'center', height: 28, width: '100%', marginTop: 2, backgroundColor: 'white', }}
                    placeholderStyle={{ width: '100%', fontSize: 10, color: '#111' }}
                    selectedValue={this.state.selectedType}
                    onValueChange={(value) => this.setState({ selectedType: value })}
                  >
                    {
                      this.state.dataType.map((data) => {
                        return (
                          <Picker.Item label={data} value={data} />
                        )
                      })
                    }
                  </Picker>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', margin: 2 }}>
                  <Text style={{ fontSize: 12, color: '#111' }}>Baud Rate</Text>
                  <Picker
                    placeholder={this.state.dataBaudRate[0]}
                    mode="dialog"
                    iosHeader="Baud Rate"
                    headerBackButtonText="Geri"
                    style={{ height: 28, width: '100%', marginTop: 2, backgroundColor: 'white' }}
                    placeholderStyle={{ width: '100%', fontSize: 10, color: '#111' }}
                    selectedValue={this.state.selectedBaudRate}
                    onValueChange={(value) => this.setState({ selectedBaudRate: value })}
                  >
                    {
                      this.state.dataBaudRate.map((data) => {
                        return (
                          <Picker.Item label={data} value={data} />
                        )
                      })
                    }
                  </Picker>
                </View>
              </LinearGradient>
            </View>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={() => this.joinData()} activeOpacity={0.7} style={styles.button} >
                <Text style={styles.buttonText}> Cihaz Ekle </Text>
              </TouchableOpacity>
            </View> */}

            {this.state.isModbus == false &&

              <FlatList
                data={this.state.dataSource}
                keyExtractor={(index, id) => id.toString()}
                refreshControl={<RefreshControl refreshing={this.state.refresing} onRefresh={() => this.refreshData()} />}
                renderItem={this._renderItem}
                showsVerticalScrollIndicator={false}
              />
            }
          </SafeAreaView >
        }
      </View>
    );
  }
}

export default ModemModBusScreen;

const styles = StyleSheet.create({

  MainContainer: {

    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 2

  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

  textInputStyle: {

    textAlign: 'center',
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 7,
    marginTop: 5
  },

  button: {
    alignItems: 'center',
    width: '90%',
    height: 40,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    marginTop: 10
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },

});
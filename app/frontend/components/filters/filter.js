import React, { Component } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { Icon, Root, Toast } from "native-base";
import { GetAlarm } from '../../../backend/alarmController/getAlarm';
import { GetComdevice } from '../../../backend/modemController/GetModemList';
import { GetDevice } from '../../../backend/TumcihazController/GetTumCihazList';
import { GetMeters } from '../../../backend/sayacController/GetSayacList';
import { GetRelays } from '../../../backend/roleController/GetRoleList';
import { GetAnalyzers } from '../../../backend/analizorController/GetAnalizorList';
import { GetSıcaklıkSensor } from '../../../backend/sıcaklıkSensorController/GetSıcaklıkSensorList';
import { GetAnalogGiris } from '../../../backend/analogGirisController/GetAnalogGirisList';
import { GetSayıcı } from '../../../backend/sayıcıController/GetSayıcıList';
import { GetIO } from '../../../backend/IoController/getIoList';


import CihazFilterComponent from '../filters/filterComponents/CihazFilterComponent';
import ModemFilterComponent from '../filters/filterComponents/ModemFilterComponent';
import SayacFilterComponent from '../filters/filterComponents/SayacFilterComponent';
import AlarmFilterComponent from '../filters/filterComponents/AlarmFilterComponent';
import RoleFilterComponent from '../filters/filterComponents/RoleFilterComponent';
import AnalizorFilterComponent from '../filters/filterComponents/AnalizorFilterComponent';
import SıcaklıkSensorFilterComponent from '../filters/filterComponents/SıcaklıkSensorFilterComponent';
import AnalogGirisFilterComponent from '../filters/filterComponents/AnalogGirisFilterComponent';
import SayıcıFilterComponent from '../filters/filterComponents/SayıcıFilterComponent';
import IoFilterComponent from '../filters/filterComponents/IoFilterComponent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animate: '',
            type: "",
            location: "",
            measuringID: ""
        };
        this._onChangeType = this._onChangeType.bind(this)
        this._onChangeLocation = this._onChangeLocation.bind(this)
        this._onChangeDeviceNo = this._onChangeDeviceNo.bind(this)
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
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({
                animate: '',
                type: "",
                location: "",
                measuringID: ""
            })
        });
    }

    _onChangeType = (getType) => {
        this.setState({ type: getType });
    }
    _onChangeLocation = (getLocation) => {
        this.setState({ location: getLocation });
    }
    _onChangeDeviceNo = (getDeviceNo) => {
        this.setState({ measuringID: getDeviceNo });
    }

    clearFilter = () => {
        Toast.show({
            text: "Filtreler temizlendi",
            position: "bottom",
            duration: 500,
            textStyle: { color: "white", fontSize: 14, textAlign: 'center' },
            type: "success",
        })
        this.setState({ animate: 'swing', type: '', location: '', measuringID: '' })
    }

    filter = async () => {


        const { navigate } = this.props.navigation
        const { redirectPage, activeTab, pager } = this.props;

        if (redirectPage == "Modems") {
            this.props.modemListObj.state.startHere = 0

            navigate('Modems', {
                location: this.state.location,
                type: this.state.type,
                measuringID: this.state.measuringID
            })
            if ((this.state.type == null || this.state.type == "") && (this.state.location == null || this.state.location == "") && (this.state.measuringID == null || this.state.measuringID == "")) {
                this.props.modemListObj.state.filter_active = false
            }
            else {
                this.props.modemListObj.state.filter_active = true
            }
            this.props.modemListObj.state.dataSource = []
            this.props.modemListObj.state.type = this.state.type;
            this.props.modemListObj.state.location = this.state.location;
            this.props.modemListObj.state.measuringID = this.state.measuringID;
            this.props.modemListObj.setState({ dataLoading: true })
            GetComdevice(this.props.modemListObj, 0, 10, 0)

        }
        else if (redirectPage == "Alarms") {
            this.props.alarmListObj.state.startHere = 0

            navigate('Alarms', {
                location: this.state.location,
                type: this.state.type,
                measuringID: this.state.measuringID
            })
            if ((this.state.type == null || this.state.type == "") && (this.state.location == null || this.state.location == "") && (this.state.measuringID == null || this.state.measuringID == "")) {
                this.props.alarmListObj.state.filter_active = false
            }
            else {
                this.props.alarmListObj.state.filter_active = true
            }
            this.props.alarmListObj.state.dataSource = []
            this.props.alarmListObj.state.type = this.state.type;
            this.props.alarmListObj.state.location = this.state.location;
            this.props.alarmListObj.state.measuringID = this.state.measuringID;
            this.props.alarmListObj.setState({ dataLoading: true })
            GetAlarm(this.props.alarmListObj, 0, 10, 0)
        }

        else if (redirectPage == "Devices") {

            if (activeTab == 0) {
                this.props.cihazListObj.state.startHere = 0

                navigate('Devices', {
                    location: this.state.location,
                    device_id: this.state.device_id,
                    measuringID: this.state.measuringID
                })
                if ((this.state.type == null || this.state.type == "") && (this.state.location == null || this.state.location == "") && (this.state.measuringID == null || this.state.measuringID == "")) {
                    this.props.cihazListObj.state.filter_active = false
                }
                else {
                    this.props.cihazListObj.state.filter_active = true
                }
                this.props.cihazListObj.state.dataSource = []
                this.props.cihazListObj.state.device_id = this.state.type;
                this.props.cihazListObj.state.location = this.state.location;
                this.props.cihazListObj.state.measuringID = this.state.measuringID;
                this.props.cihazListObj.setState({ dataLoading: true })
                GetDevice(this.props.cihazListObj, 0, 10, 0)

            } else if (activeTab == 1) {
                this.props.sayacListObj.state.startHere = 0

                navigate('Devices', {
                    location: this.state.location,
                    device_id: this.state.device_id,
                    measuringID: this.state.measuringID
                })
                if ((this.state.type == null || this.state.type == "") && (this.state.location == null || this.state.location == "") && (this.state.measuringID == null || this.state.measuringID == "")) {
                    this.props.sayacListObj.state.filter_active = false
                }
                else {
                    this.props.sayacListObj.state.filter_active = true
                }
                this.props.sayacListObj.state.dataSource = []
                this.props.sayacListObj.state.device_id = this.state.type;
                this.props.sayacListObj.state.location = this.state.location;
                this.props.sayacListObj.state.measuringID = this.state.measuringID;
                this.props.sayacListObj.setState({ dataLoading: true })
                GetMeters(this.props.sayacListObj, 0, 10, 0)

            } else if (activeTab == 2) {
                this.props.roleListObj.state.startHere = 0

                navigate('Devices', {
                    location: this.state.location,
                    device_id: this.state.device_id,
                    measuringID: this.state.measuringID
                })
                if ((this.state.type == null || this.state.type == "") && (this.state.location == null || this.state.location == "") && (this.state.measuringID == null || this.state.measuringID == "")) {
                    this.props.roleListObj.state.filter_active = false
                }
                else {
                    this.props.roleListObj.state.filter_active = true
                }
                this.props.roleListObj.state.dataSource = []
                this.props.roleListObj.state.device_id = this.state.type;
                this.props.roleListObj.state.location = this.state.location;
                this.props.roleListObj.state.measuringID = this.state.measuringID;
                this.props.roleListObj.setState({ dataLoading: true })
                GetRelays(this.props.roleListObj, 0, 10, 0)

            } else if (activeTab == 3) {
                this.props.analizorListObj.state.startHere = 0

                navigate('Devices', {
                    location: this.state.location,
                    device_id: this.state.device_id,
                    measuringID: this.state.measuringID
                })
                if ((this.state.type == null || this.state.type == "") && (this.state.location == null || this.state.location == "") && (this.state.measuringID == null || this.state.measuringID == "")) {
                    this.props.analizorListObj.state.filter_active = false
                }
                else {
                    this.props.analizorListObj.state.filter_active = true
                }
                this.props.analizorListObj.state.dataSource = []
                this.props.analizorListObj.state.device_id = this.state.type;
                this.props.analizorListObj.state.location = this.state.location;
                this.props.analizorListObj.state.measuringID = this.state.measuringID;
                this.props.analizorListObj.setState({ dataLoading: true })
                GetAnalyzers(this.props.analizorListObj, 0, 10, 0)
            }

            else if (activeTab == 4) {
                this.props.sıcaklıkSensorListObj.state.startHere = 0

                navigate('Devices', {
                    location: this.state.location,
                    device_id: this.state.device_id,
                    measuringID: this.state.measuringID
                })
                if ((this.state.type == null || this.state.type == "") && (this.state.location == null || this.state.location == "") && (this.state.measuringID == null || this.state.measuringID == "")) {
                    this.props.sıcaklıkSensorListObj.state.filter_active = false
                }
                else {
                    this.props.sıcaklıkSensorListObj.state.filter_active = true
                }
                this.props.sıcaklıkSensorListObj.state.dataSource = []
                this.props.sıcaklıkSensorListObj.state.device_id = this.state.type;
                this.props.sıcaklıkSensorListObj.state.location = this.state.location;
                this.props.sıcaklıkSensorListObj.state.measuringID = this.state.measuringID;
                this.props.sıcaklıkSensorListObj.setState({ dataLoading: true })
                GetSıcaklıkSensor(this.props.sıcaklıkSensorListObj, 0, 10, 0)
            }

            else if (activeTab == 5) {
                this.props.analogGirisListObj.state.startHere = 0

                navigate('Devices', {
                    location: this.state.location,
                    device_id: this.state.device_id,
                    measuringID: this.state.measuringID
                })
                if ((this.state.type == null || this.state.type == "") && (this.state.location == null || this.state.location == "") && (this.state.measuringID == null || this.state.measuringID == "")) {
                    this.props.analogGirisListObj.state.filter_active = false
                }
                else {
                    this.props.analogGirisListObj.state.filter_active = true
                }
                this.props.analogGirisListObj.state.dataSource = []
                this.props.analogGirisListObj.state.device_id = this.state.type;
                this.props.analogGirisListObj.state.location = this.state.location;
                this.props.analogGirisListObj.state.measuringID = this.state.measuringID;
                this.props.analogGirisListObj.setState({ dataLoading: true })
                GetAnalogGiris(this.props.analogGirisListObj, 0, 10, 0)
            }

            else if (activeTab == 6) {
                this.props.sayıcıListObj.state.startHere = 0

                navigate('Devices', {
                    location: this.state.location,
                    device_id: this.state.device_id,
                    measuringID: this.state.measuringID
                })
                if ((this.state.type == null || this.state.type == "") && (this.state.location == null || this.state.location == "") && (this.state.measuringID == null || this.state.measuringID == "")) {
                    this.props.sayıcıListObj.state.filter_active = false
                }
                else {
                    this.props.sayıcıListObj.state.filter_active = true
                }
                this.props.sayıcıListObj.state.dataSource = []
                this.props.sayıcıListObj.state.device_id = this.state.type;
                this.props.sayıcıListObj.state.location = this.state.location;
                this.props.sayıcıListObj.state.measuringID = this.state.measuringID;
                this.props.sayıcıListObj.setState({ dataLoading: true })
                GetSayıcı(this.props.sayıcıListObj, 0, 10, 0)
            }

            else if (activeTab == 7) {
                this.props.IoListObj.state.startHere = 0

                navigate('Devices', {
                    location: this.state.location,
                    device_id: this.state.device_id,
                    measuringID: this.state.measuringID
                })
                if ((this.state.type == null || this.state.type == "") && (this.state.location == null || this.state.location == "") && (this.state.measuringID == null || this.state.measuringID == "")) {
                    this.props.IoListObj.state.filter_active = false
                }
                else {
                    this.props.IoListObj.state.filter_active = true
                }
                this.props.IoListObj.state.dataSource = []
                this.props.IoListObj.state.device_id = this.state.type;
                this.props.IoListObj.state.location = this.state.location;
                this.props.IoListObj.state.measuringID = this.state.measuringID;
                this.props.IoListObj.setState({ dataLoading: true })
                GetIO(this.props.IoListObj, 0, 10, 0)
            }
            else {
                console.log('HATA')
            }
        }

        else {
            console.log('HATA')
        }
    }

    render() {
        const { redirectPage, activeTab } = this.props;
        return (
            <Root>
                <View style={{ flex: 1, backgroundColor: '#f5f5f5', }}>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps='always' style={{ flex: 1 }}  >
                        {redirectPage == 'Modems' &&
                            <ModemFilterComponent navigation={this.props.navigation}
                                secureTextEntry={false}
                                locationIcon="map-marker-alt"
                                locationLabel="Konum girin"
                                onChangeLocation={this._onChangeLocation}
                                Location={this.state.location}
                                deviceIcon="th"
                                deviceLabel="Modem no girin"
                                onChangeDeviceNo={this._onChangeDeviceNo}
                                DeviceNo={this.state.measuringID}
                                onChangeType={this._onChangeType}
                                Type={this.state.type}
                            />
                        }

                        {redirectPage == 'Alarms' &&
                            <AlarmFilterComponent navigation={this.props.navigation}
                                secureTextEntry={false}
                                locationIcon="map-marker-alt"
                                locationLabel="Konum girin"
                                onChangeLocation={this._onChangeLocation}
                                Location={this.state.location}
                                deviceIcon="th"
                                deviceLabel="Cihaz no girin"
                                onChangeDeviceNo={this._onChangeDeviceNo}
                                DeviceNo={this.state.measuringID}
                                onChangeType={this._onChangeType}
                                Type={this.state.type}
                            />
                        }

                        {redirectPage == 'Devices' && activeTab == 0 &&
                            < CihazFilterComponent navigation={this.props.navigation}
                                secureTextEntry={false}
                                locationIcon="map-marker-alt"
                                locationLabel="Konum girin"
                                onChangeLocation={this._onChangeLocation}
                                Location={this.state.location}
                                deviceIcon="th"
                                deviceLabel="Cihaz no girin"
                                onChangeDeviceNo={this._onChangeDeviceNo}
                                DeviceNo={this.state.measuringID}
                                modemIcon="keyboard"
                                modemLabel="Modem no girin"
                                onChangeType={this._onChangeType}
                                Type={this.state.type}
                            />
                        }

                        {redirectPage == 'Devices' && activeTab == 1 &&
                            <SayacFilterComponent navigation={this.props.navigation}
                                secureTextEntry={false}
                                locationIcon="map-marker-alt"
                                locationLabel="Konum girin"
                                onChangeLocation={this._onChangeLocation}
                                Location={this.state.location}
                                deviceIcon="th"
                                deviceLabel="Sayaç no girin"
                                onChangeDeviceNo={this._onChangeDeviceNo}
                                DeviceNo={this.state.measuringID}
                                modemIcon="keyboard"
                                modemLabel="Modem no girin"
                                onChangeType={this._onChangeType}
                                Type={this.state.type}
                            />
                        }

                        {redirectPage == 'Devices' && activeTab == 2 &&
                            <RoleFilterComponent navigation={this.props.navigation}
                                secureTextEntry={false}
                                locationIcon="map-marker-alt"
                                locationLabel="Konum girin"
                                onChangeLocation={this._onChangeLocation}
                                Location={this.state.location}
                                deviceIcon="th"
                                deviceLabel="Röle no girin"
                                onChangeDeviceNo={this._onChangeDeviceNo}
                                DeviceNo={this.state.measuringID}
                                modemIcon="keyboard"
                                modemLabel="Modem no girin"
                                onChangeType={this._onChangeType}
                                Type={this.state.type}
                            />
                        }

                        {redirectPage == 'Devices' && activeTab == 3 &&
                            <AnalizorFilterComponent navigation={this.props.navigation}
                                secureTextEntry={false}
                                locationIcon="map-marker-alt"
                                locationLabel="Konum girin"
                                onChangeLocation={this._onChangeLocation}
                                Location={this.state.location}
                                deviceIcon="th"
                                deviceLabel="Analizör no girin"
                                onChangeDeviceNo={this._onChangeDeviceNo}
                                DeviceNo={this.state.measuringID}
                                modemIcon="keyboard"
                                modemLabel="Modem no girin"
                                onChangeType={this._onChangeType}
                                Type={this.state.type}
                            />
                        }
                        {redirectPage == 'Devices' && activeTab == 4 &&
                            <SıcaklıkSensorFilterComponent navigation={this.props.navigation}
                                secureTextEntry={false}
                                locationIcon="map-marker-alt"
                                locationLabel="Konum girin"
                                onChangeLocation={this._onChangeLocation}
                                Location={this.state.location}
                                deviceIcon="th"
                                deviceLabel="Sıcaklık sensör no girin"
                                onChangeDeviceNo={this._onChangeDeviceNo}
                                DeviceNo={this.state.measuringID}
                                modemIcon="keyboard"
                                modemLabel="Modem no girin"
                                onChangeType={this._onChangeType}
                                Type={this.state.type}
                            />
                        }
                        {redirectPage == 'Devices' && activeTab == 5 &&
                            <AnalogGirisFilterComponent navigation={this.props.navigation}
                                secureTextEntry={false}
                                locationIcon="map-marker-alt"
                                locationLabel="Konum girin"
                                onChangeLocation={this._onChangeLocation}
                                Location={this.state.location}
                                deviceIcon="th"
                                deviceLabel="Analog giriş no girin"
                                onChangeDeviceNo={this._onChangeDeviceNo}
                                DeviceNo={this.state.measuringID}
                                modemIcon="keyboard"
                                modemLabel="Modem no girin"
                                onChangeType={this._onChangeType}
                                Type={this.state.type}
                            />
                        }
                        {redirectPage == 'Devices' && activeTab == 6 &&
                            <SayıcıFilterComponent navigation={this.props.navigation}
                                secureTextEntry={false}
                                locationIcon="map-marker-alt"
                                locationLabel="Konum girin"
                                onChangeLocation={this._onChangeLocation}
                                Location={this.state.location}
                                deviceIcon="th"
                                deviceLabel="Sayıcı no girin"
                                onChangeDeviceNo={this._onChangeDeviceNo}
                                DeviceNo={this.state.measuringID}
                                modemIcon="keyboard"
                                modemLabel="Modem no girin"
                                onChangeType={this._onChangeType}
                                Type={this.state.type}
                            />
                        }
                        {redirectPage == 'Devices' && activeTab == 7 &&
                            <IoFilterComponent navigation={this.props.navigation}
                                secureTextEntry={false}
                                locationIcon="map-marker-alt"
                                locationLabel="Konum girin"
                                onChangeLocation={this._onChangeLocation}
                                Location={this.state.location}
                                deviceIcon="th"
                                deviceLabel="Modül no girin"
                                onChangeDeviceNo={this._onChangeDeviceNo}
                                DeviceNo={this.state.measuringID}
                                modemIcon="keyboard"
                                modemLabel="Modem no girin"
                                onChangeType={this._onChangeType}
                                Type={this.state.type}
                            />
                        }

                    </KeyboardAwareScrollView >
                    {
                        <View style={{ flex: 0.1, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', bottom: 10 }}>
                            <TouchableOpacity onPress={() => this.filter()} style={{ backgroundColor: "#00AEEF", borderRadius: 8, height: 40, width: 200, justifyContent: 'center' }}>
                                <Text style={{ color: "#fff", textAlign: 'center' }}>GETİR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.clearFilter()} style={{ borderWidth: 0.5, borderColor: 'gray', borderRadius: 8, height: 40, width: 100, justifyContent: 'center', marginLeft: 10 }}>
                                <Text style={{ color: "#fff", textAlign: 'center', color: 'gray' }}><Icon type="FontAwesome5" name="trash-alt" style={{ fontSize: 20, color: '#ef5350' }} ></Icon> Temizle</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </Root>
        )
    }
}
export default Filter;


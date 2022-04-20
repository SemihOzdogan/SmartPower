import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { KuralTabanlı, SıcaklıkKontrollü, GunlukCizelge, HaftalıkCizelge, AnalogKontrollu } from '../../../../components/IoModules/OutputRulesComponent';
import { Icon, Root, Spinner } from 'native-base';
import moment from 'moment';
import {
    GetOutputRuleSettings, GetOutputTemperatureSettings, GetOutputDayWeekSettings, GetOutputWeekSettings, GetOutputAnalogSettings, PutOutputDayWeekSettings, PutOutputWeekSettings, PutOutputTemperatureSettings, PutOutputAnalogSettings, PutOutputRuleSettings
} from '../../../../../backend/IoController/IoOutputRuleSettings';
var idLocale = require('moment/locale/tr');
moment.locale('tr', idLocale);

class OutputRules extends Component {
    constructor(props) {
        super(props);
        var obj = {}
        for (let index = 1; index < 4; index++) {
            var inputType = "inputType" + index
            var selectedDevice = "selectedDevice" + index
            var selectedGiris = "selectedGiris" + index
            var selectedTersle = "selectedTersle" + index
            var selectedModem = "selectedModem" + index

            obj[inputType] = []
            obj[selectedModem] = ""
            obj[selectedDevice] = ""
            obj[selectedGiris] = ""
            obj[selectedTersle] = false
        }
        obj.allDevices = []
        obj.allModem = []
        obj.butonSpinner = false
        obj.dataLoading = true
        obj.histerezis = ""
        obj.sıcaklık = ""
        obj.sıcaklık_altLimit = 0.0
        obj.sıcaklık_ustLimit = 0.0
        obj.selectedDevices = []
        obj.sıcaklıkDevices = []
        obj.basShow = false
        obj.bitShow = false
        obj.baslangıcSaat = moment(new Date()).format('LT');
        obj.bitisSaat = moment(new Date()).format('LT');
        obj.alldata = []
        obj.allWeek = []
        obj.timeShow = false
        obj.weekShow = false
        obj.gun = ""
        this.state = obj
    }
    UNSAFE_componentWillMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            this.setState({ dataLoading: true })
            await this.PageDidFocus()
            this.setState({ dataLoading: false })
        });
    }
    PageDidFocus = async () => {
        const { module_ID, module_TYPE, module_CHANNEL, node_ID, module_API } = this.props;
        if (module_API == 1) {
            this.setState({
                inputType1: [], inputType2: [], inputType3: [], selectedDevice1: "", selectedDevice2: "",
                selectedDevice3: "", selectedGiris1: "", selectedGiris2: "", selectedGiris3: "", allDevices: [],
            })
            await GetOutputRuleSettings(this, module_ID, module_TYPE, module_CHANNEL)
            this.modemName1(this.state.selectedDevice1)
            this.modemName2(this.state.selectedDevice2)
            this.modemName3(this.state.selectedDevice3)
        }
        else if (module_API == 2) {
            this.setState({
                sıcaklık_altLimit: 0.0, sıcaklık_ustLimit: 0.0, sıcaklık: "", kaydetShow: false
            })
            await GetOutputTemperatureSettings(this, node_ID)
        }
        else if (module_API == 3) {
            await GetOutputDayWeekSettings(this, node_ID)
        }
        else if (module_API == 4) {
            await GetOutputWeekSettings(this, node_ID)
        }
        else if (module_API == 5) {
            this.setState({
                inputType1: [], inputType2: [], inputType3: [], selectedDevice1: "", selectedDevice2: "",
                selectedDevice3: "", selectedGiris1: "", selectedGiris2: "", selectedGiris3: "", allDevices: [],
                sıcaklık_altLimit: 0.0, sıcaklık_ustLimit: 0.0, sıcaklık: ""
            })
            await GetOutputAnalogSettings(this, node_ID)
        }
    }
    sıcaklıkAltLimitAzalt = () => {
        data = this.state.sıcaklık_altLimit.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ sıcaklık_altLimit: (y - 0.1).toFixed(2) })
    }
    sıcaklıkAltLimitArtır = () => {
        data = this.state.sıcaklık_altLimit.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ sıcaklık_altLimit: (y + 0.1).toFixed(2) })
    }
    sıcaklıkUstLimitAzalt = () => {
        data = this.state.sıcaklık_ustLimit.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ sıcaklık_ustLimit: (y - 0.1).toFixed(2) })
    }
    sıcaklıkUstLimitArtır = () => {
        data = this.state.sıcaklık_ustLimit.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ sıcaklık_ustLimit: (y + 0.1).toFixed(2) })
    }
    changeInputType = (value, index) => {
        var inputTypeGrp = ["Giriş 1", "Giriş 2"]
        var inputTypeG1 = ["Giriş 1", "Giriş 2", "Giriş 3", "Giriş 4", "Giriş 5", "Giriş 6", "Giriş 7", "Giriş 8"]
        var inputTypeAG = ["Giriş 1", "Giriş 2", "Giriş 3", "Giriş 4", "Giriş 5", "Giriş 6"]
        if (value.search('GRP') == 0) {
            if (index == 1) {
                this.setState({ inputType1: inputTypeGrp })
            }
            else if (index == 2) {
                this.setState({ inputType2: inputTypeGrp })
            }
            else if (index == 3) {
                this.setState({ inputType3: inputTypeGrp })
            }
        }
        else if (value.search('AG1') == 0) {
            if (index == 1) {
                this.setState({ inputType1: inputTypeAG })
            }
            else if (index == 2) {
                this.setState({ inputType2: inputTypeAG })
            }
            else if (index == 3) {
                this.setState({ inputType3: inputTypeAG })
            }
        }
        else {
            if (index == 1) {
                this.setState({ inputType1: inputTypeG1 })
            }
            else if (index == 2) {
                this.setState({ inputType2: inputTypeG1 })
            }
            else if (index == 3) {
                this.setState({ inputType3: inputTypeG1 })
            }
        }
    }
    modemName1 = (value) => {
        this.state.selectedModem1 = ""
        this.state.allDevices.forEach(element => {
            if (element.comm_device_id == value) {
                this.state.selectedModem1 = element.comm_device_id
            }
            else {
                if (element.module_id == value) {
                    this.state.selectedModem1 = element.comm_device_id
                }
            }
        });
    }
    modemName2 = (value) => {
        this.state.selectedModem2 = ""
        this.state.allDevices.forEach(element => {
            if (element.comm_device_id == value) {
                this.state.selectedModem2 = element.comm_device_id
            }
            else {
                if (element.module_id == value) {
                    this.state.selectedModem2 = element.comm_device_id
                }
            }
        });
    }
    modemName3 = (value) => {
        this.state.selectedModem3 = ""
        this.state.allDevices.forEach(element => {
            if (element.comm_device_id == value) {
                this.state.selectedModem3 = element.comm_device_id
            }
            else {
                if (element.module_id == value) {
                    this.state.selectedModem3 = element.comm_device_id
                }
            }
        });
    }
    _renderContent() {
        const { module_ID, module_TYPE, module_CHANNEL, node_ID, module_API } = this.props;
        if (module_API == 1) {
            return (
                <KuralTabanlı
                    arrayDevices={this.state.allDevices}
                    arrayGiris1={this.state.inputType1}
                    arrayGiris2={this.state.inputType2}
                    arrayGiris3={this.state.inputType3}
                    devicePlaceHolder1={this.state.selectedDevice1}
                    devicePlaceHolder2={this.state.selectedDevice2}
                    devicePlaceHolder3={this.state.selectedDevice3}
                    selectedValueDevice1={this.state.selectedDevice1}
                    onValueChangeDevice1={(value) => { this.setState({ selectedDevice1: value }); this.changeInputType(value, 1); this.modemName1(value) }}
                    selectedValueDevice2={this.state.selectedDevice2}
                    onValueChangeDevice2={(value) => { this.setState({ selectedDevice2: value }); this.changeInputType(value, 2); this.modemName2(value) }}
                    selectedValueDevice3={this.state.selectedDevice3}
                    onValueChangeDevice3={(value) => { this.setState({ selectedDevice3: value }); this.changeInputType(value, 3); this.modemName3(value) }}
                    girisPlaceHolder1={this.state.selectedGiris1}
                    selectedValueGiris1={this.state.selectedGiris1}
                    onValueChangeGiris1={(value) => this.setState({ selectedGiris1: value })}
                    girisPlaceHolder2={this.state.selectedGiris2}
                    selectedValueGiris2={this.state.selectedGiris2}
                    onValueChangeGiris2={(value) => this.setState({ selectedGiris2: value })}
                    girisPlaceHolder3={this.state.selectedGiris3}
                    selectedValueGiris3={this.state.selectedGiris3}
                    onValueChangeGiris3={(value) => this.setState({ selectedGiris3: value })}
                    onSelect={(index) => this.setState({ selectedIndex: index })}
                    selectedIndex={this.state.selectedIndex}
                    onPressCheckBox1={() => this.setState({ selectedTersle1: !this.state.selectedTersle1 })}
                    checkedCheckBox1={this.state.selectedTersle1}
                    onPressCheckBox2={() => this.setState({ selectedTersle2: !this.state.selectedTersle2 })}
                    checkedCheckBox2={this.state.selectedTersle2}
                    onPressCheckBox3={() => this.setState({ selectedTersle3: !this.state.selectedTersle3 })}
                    checkedCheckBox3={this.state.selectedTersle3}
                />
            )
        }
        else if (module_API == 2) {
            return (
                <SıcaklıkKontrollü

                    sıcaklıkBaslangıc={this.state.sıcaklık_altLimit}
                    sıcaklıkBitis={this.state.sıcaklık_ustLimit}
                    AltLimitAzalt={() => this.sıcaklıkAltLimitAzalt()}
                    AltLimitArtır={() => this.sıcaklıkAltLimitArtır()}
                    AltLimitDeger={this.state.sıcaklık_altLimit}
                    AltLimitDisabled={this.state.sıcaklık_altLimit == "0.00" ? true : false}
                    onChangeAltLimitDeger={(value) => this.setState({ sıcaklık_altLimit: value })}

                    UstLimitAzalt={() => this.sıcaklıkUstLimitAzalt()}
                    UstLimitArtır={() => this.sıcaklıkUstLimitArtır()}
                    UstLimitDeger={this.state.sıcaklık_ustLimit}
                    UstLimitDisabled={this.state.sıcaklık_ustLimit == "0.00" ? true : false}
                    onChangeUstLimitDeger={(value) => this.setState({ sıcaklık_ustLimit: value })}

                    onChangeHisterezis={(value) => this.setState({ histerezis: value })}
                    HisterezisDeger={this.state.histerezis}

                    SıcaklıkPlaceHolder={this.state.sıcaklık}
                    selectedValueSıcaklık={this.state.sıcaklık}
                    onValueChangeSıcaklık={(value) => this.setState({ sıcaklık: value })}

                    items={this.state.sıcaklıkDevices}
                    onSelectedItemsChange={(value) => this.onSelectedItemsChange(value)}
                    selectedItems={this.state.selectedDevices}
                />
            )
        }
        else if (module_API == 3) {
            return (
                <GunlukCizelge
                    baslangıcValue={this.state.baslangıcSaat}
                    isVisibleBaslangıc={this.state.basShow}
                    onConfirmBaslangıc={(value) => this.baslangıcTime(value)}
                    onCancelBaslangıc={() => this.setState({ basShow: false })}
                    onPressBaslangıc={() => this.setState({ basShow: true })}

                    bitisValue={this.state.bitisSaat}
                    isVisibleBitis={this.state.bitShow}
                    onConfirmBitis={(value) => this.bitisTime(value)}
                    onCancelBitis={() => this.setState({ bitShow: false })}
                    onPressBitis={() => this.setState({ bitShow: true })}
                    onPressSaatEkle={() => this.saveTime()}
                />
            )
        }
        else if (module_API == 4) {
            return (
                <HaftalıkCizelge
                    baslangıcValue={this.state.baslangıcSaat}
                    isVisibleBaslangıc={this.state.basShow}
                    onConfirmBaslangıc={(value) => this.baslangıcTime(value)}
                    onCancelBaslangıc={() => this.setState({ basShow: false })}
                    onPressBaslangıc={() => this.setState({ basShow: true })}

                    bitisValue={this.state.bitisSaat}
                    isVisibleBitis={this.state.bitShow}
                    onConfirmBitis={(value) => this.bitisTime(value)}
                    onCancelBitis={() => this.setState({ bitShow: false })}
                    onPressBitis={() => this.setState({ bitShow: true })}
                    onPressKaydet={() => this.saveWeek()}

                    selectedValueWeek={this.state.gun}
                    onValueChangeWeek={(value) => this.setState({ gun: value })}
                />
            )
        }
        else if (module_API == 5) {
            return (
                <AnalogKontrollu
                    sıcaklıkBaslangıc={this.state.sıcaklık_altLimit}
                    sıcaklıkBitis={this.state.sıcaklık_ustLimit}
                    AltLimitAzalt={() => this.sıcaklıkAltLimitAzalt()}
                    AltLimitArtır={() => this.sıcaklıkAltLimitArtır()}
                    AltLimitDeger={this.state.sıcaklık_altLimit}
                    AltLimitDisabled={this.state.sıcaklık_altLimit == "0.00" ? true : false}
                    onChangeAltLimitDeger={(value) => this.setState({ sıcaklık_altLimit: value })}

                    UstLimitAzalt={() => this.sıcaklıkUstLimitAzalt()}
                    UstLimitArtır={() => this.sıcaklıkUstLimitArtır()}
                    UstLimitDeger={this.state.sıcaklık_ustLimit}
                    UstLimitDisabled={this.state.sıcaklık_ustLimit == "0.00" ? true : false}
                    onChangeUstLimitDeger={(value) => this.setState({ sıcaklık_ustLimit: value })}

                    SıcaklıkPlaceHolder={this.state.sıcaklık}
                    selectedValueSıcaklık={this.state.sıcaklık}
                    onValueChangeSıcaklık={(value) => this.setState({ sıcaklık: value })}

                    arrayDevices={this.state.allDevices}
                    arrayGiris1={this.state.inputType1}
                    arrayGiris2={this.state.inputType2}
                    arrayGiris3={this.state.inputType3}
                    devicePlaceHolder1={this.state.selectedDevice1}
                    devicePlaceHolder2={this.state.selectedDevice2}
                    devicePlaceHolder3={this.state.selectedDevice3}
                    selectedValueDevice1={this.state.selectedDevice1}
                    onValueChangeDevice1={(value) => { this.setState({ selectedDevice1: value }); this.changeInputType(value, 1) }}
                    selectedValueDevice2={this.state.selectedDevice2}
                    onValueChangeDevice2={(value) => { this.setState({ selectedDevice2: value }); this.changeInputType(value, 2) }}
                    selectedValueDevice3={this.state.selectedDevice3}
                    onValueChangeDevice3={(value) => { this.setState({ selectedDevice3: value }); this.changeInputType(value, 3) }}
                    girisPlaceHolder1={this.state.selectedGiris1}
                    selectedValueGiris1={this.state.selectedGiris1}
                    onValueChangeGiris1={(value) => this.setState({ selectedGiris1: value })}
                    girisPlaceHolder2={this.state.selectedGiris2}
                    selectedValueGiris2={this.state.selectedGiris2}
                    onValueChangeGiris2={(value) => this.setState({ selectedGiris2: value })}
                    girisPlaceHolder3={this.state.selectedGiris3}
                    selectedValueGiris3={this.state.selectedGiris3}
                    onValueChangeGiris3={(value) => this.setState({ selectedGiris3: value })}
                />
            )
        }
    }
    saveWeek = () => {
        if (this.state.gun == "") {
            Alert.alert(
                "Uyarı",
                "Bir gün seçmelisiniz !",
                [
                    {
                        text: "Tamam",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                ],
                { cancelable: false }
            );
            return false;
        }

        if (this.state.baslangıcSaat == this.state.bitisSaat) {
            Alert.alert(
                "Uyarı",
                "Başlangıç saati ile bitiş saati aynı olmamalıdır !",
                [
                    {
                        text: "Tamam",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                ],
                { cancelable: false }
            );
            return false;
        }

        var data = {
            "gun": this.state.gun,
            "baslangıc": this.state.baslangıcSaat,
            "baslangıcTarih": moment(new Date()).format('YYYY-MM-DD') + " " + this.state.baslangıcSaat + ":00",
            "bitis": this.state.bitisSaat,
            "bitisTarih": moment(new Date()).format('YYYY-MM-DD') + " " + this.state.bitisSaat + ":00",
        }
        var key = 0
        this.state.allWeek.forEach(element => {
            if ((element.baslangıc == data.baslangıc) && (element.bitis == data.bitis) && (element.gun == data.gun)) {
                key = 1
                Alert.alert(
                    "Uyarı",
                    "Programda var olan saat aralığı seçilmemelidir !",
                    [
                        {
                            text: "Tamam",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                    ],
                    { cancelable: false }
                );
                return false;
            }
        });
        if (key == 0) {
            this.state.allWeek.push(data)
            this.setState({
                weekShow: true
            })
        }
    }
    saveTime = () => {
        if (this.state.baslangıcSaat == this.state.bitisSaat) {
            Alert.alert(
                "Uyarı",
                "Başlangıç saati ile bitiş saati aynı olmamalıdır !",
                [
                    {
                        text: "Tamam",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                ],
                { cancelable: false }
            );
            return false;
        }
        var data = {
            "baslangıc": this.state.baslangıcSaat,
            "baslangıcTarih": moment(new Date()).format('YYYY-MM-DD') + " " + this.state.baslangıcSaat + ":00",
            "bitis": this.state.bitisSaat,
            "bitisTarih": moment(new Date()).format('YYYY-MM-DD') + " " + this.state.bitisSaat + ":00",
        }
        var key = 0
        this.state.alldata.forEach(element => {
            if ((element.baslangıc == data.baslangıc) && (element.bitis == data.bitis)) {
                key = 1
                Alert.alert(
                    "Uyarı",
                    "Programda var olan saat aralığı seçilmemelidir !",
                    [
                        {
                            text: "Tamam",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                    ],
                    { cancelable: false }
                );
                return false;
            }
        });
        if (key == 0) {
            this.state.alldata.push(data)
            this.setState({
                timeShow: true
            })
        }
    }
    baslangıcTime = (date) => {
        var time = moment(date).format('LT');
        this.setState({ baslangıcSaat: time, basShow: false })
    }
    bitisTime = (date) => {
        var time = moment(date).format('LT');
        this.setState({ bitisSaat: time, bitShow: false })
    }
    onSelectedItemsChange = (val, data) => {
        this.setState({ selectedDevices: val });
    }
    removeItemDay = (index) => {
        Alert.alert(
            "Günlük Program",
            "Bu saat aralığı silinsin mi ?",
            [
                {
                    text: "İptal",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Evet", onPress: async () => {
                        var array = [...this.state.alldata]
                        if (index !== -1) {
                            array.splice(index, 1);
                            this.setState({ alldata: array, timeShow: true });
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    }
    removeItemWeek = (index, data) => {
        console.log(data)
        Alert.alert(
            "Haftalık Program",
            data.gun + " gününe ait saat aralığı silinsin mi ?",
            [
                {
                    text: "İptal",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Evet", onPress: async () => {
                        var array = [...this.state.allWeek]
                        if (index !== -1) {
                            array.splice(index, 1);
                            this.setState({ allWeek: array, weekShow: true });
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    }
    updateOutputRules = async () => {
        const { module_ID, module_TYPE, module_CHANNEL, node_ID, module_API } = this.props;
        this.setState({ butonSpinner: true })
        switch (module_API) {
            case 1:
                await PutOutputRuleSettings(this, module_ID, module_TYPE, module_CHANNEL)
                break;
            case 2:

                if (this.state.selectedDevices.length == 0) {
                    Alert.alert(
                        "Uyarı",
                        "En az bir sensör seçmelisiniz !",
                        [
                            {
                                text: "Tamam",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                        ],
                        { cancelable: false }
                    );
                }
                else {
                    await PutOutputTemperatureSettings(this, module_ID, module_TYPE, node_ID)
                }
                break;
            case 3:
                await PutOutputDayWeekSettings(this, module_ID, module_TYPE, node_ID)
                break;
            case 4:
                await PutOutputWeekSettings(this, module_ID, module_TYPE, node_ID)
                break;
            case 5:
                await PutOutputAnalogSettings(this, module_ID, module_TYPE, node_ID)
                break;
            default:
                break;
        }
        this.setState({ butonSpinner: false })
    }
    render() {
        var { module_ID, module_LOCATION } = this.props;
        return (
            <Root>
                {
                    this.state.dataLoading &&
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                        <Spinner color='#aaa' style={{ width: "100%" }} />
                    </View>
                }
                {
                    !this.state.dataLoading &&
                    <View style={{ flex: 1, }}>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 50 }} contentContainerStyle={{ margin: 5 }}>
                            <View style={{ width: '100%', backgroundColor: '#ddd', borderRadius: 4, marginTop: 5, padding: 5, }}>
                                <View style={{ flex: 1, backgroundColor: '#ccc', borderRadius: 4, margin: 3, flexDirection: 'row' }}>
                                    <View style={{ backgroundColor: '#bbb', width: 100, padding: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                        <Icon type="FontAwesome5" name="map-marker-alt" style={{ fontSize: 25, color: '#E26A6A' }} /><Text style={{ fontSize: 15, color: '#444', }}> Konum </Text>
                                    </View>
                                    <View style={{ padding: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                        <Text style={{ fontSize: 15, }}>{module_LOCATION}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, backgroundColor: '#ccc', borderRadius: 4, margin: 3, flexDirection: 'row' }}>
                                    <View style={{ backgroundColor: '#bbb', width: 100, padding: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                        <Icon type="FontAwesome5" name="keyboard" style={{ fontSize: 25, color: '#E26A6A' }} /><Text style={{ fontSize: 15, color: '#444', }}> Cihaz ID </Text>
                                    </View>
                                    <View style={{ padding: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                        <Text style={{ fontSize: 15, }}>{module_ID}</Text>
                                    </View>
                                </View>
                            </View>
                            {
                                this._renderContent()
                            }
                            {
                                this.state.timeShow == true &&
                                <View style={{ width: '100%', marginTop: 5, borderRadius: 4, backgroundColor: '#ddd', marginBottom: 10 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 16, padding: 3 }}>Hergün</Text>
                                    {this.state.alldata.map((data, index) => (
                                        <View style={{ borderRadius: 4, marginVertical: 5, height: 35, flexDirection: 'row', marginHorizontal: 5 }}>
                                            <View style={{ flex: 1, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                                <TouchableOpacity onPress={() => this.removeItemDay(index)}>
                                                    <Icon type="FontAwesome5" name="trash-alt" style={{ fontSize: 25, color: '#FA7D7F' }} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flex: 2, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 4, borderBottomRightRadius: 4, borderLeftWidth: 0, borderWidth: 3, borderColor: '#ccc' }}>
                                                <Text style={{ fontSize: 16 }}>{data.baslangıc} - {data.bitis}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            }

                            {
                                this.state.weekShow == true &&
                                <View style={{ width: '100%', marginTop: 5, borderRadius: 4, backgroundColor: '#ddd', marginBottom: 10 }}>
                                    {this.state.allWeek.map((data, index) => (
                                        <View style={{ borderRadius: 4, marginVertical: 5, height: 35, flexDirection: 'row', marginHorizontal: 5 }}>
                                            <View style={{ flex: 1, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                                <TouchableOpacity onPress={() => this.removeItemWeek(index, data)}>
                                                    <Icon type="FontAwesome5" name="trash-alt" style={{ fontSize: 25, color: '#FA7D7F' }} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flex: 1, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center', borderLeftWidth: 0, borderWidth: 3, borderColor: '#ccc' }}>
                                                <Text style={{ fontSize: 16 }}>{data.gun}</Text>
                                            </View>
                                            <View style={{ flex: 2, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 4, borderBottomRightRadius: 4, borderLeftWidth: 0, borderWidth: 3, borderColor: '#ccc' }}>
                                                <Text style={{ fontSize: 16 }}>{data.baslangıc} - {data.bitis}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            }

                            {!this.state.butonSpinner &&
                                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
                                    <TouchableOpacity onPress={() => this.updateOutputRules()} style={{ width: '50%', height: 40, borderRadius: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', }}>
                                        <Text style={{ color: "#444", textAlign: 'center' }}>KAYDET</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            {this.state.butonSpinner &&
                                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
                                    <TouchableOpacity style={{ width: '50%', height: 40, borderRadius: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', }}>
                                        <Spinner color='#fff' style={{ width: "100%" }} />
                                    </TouchableOpacity>
                                </View>
                            }

                        </ScrollView>
                    </View>
                }
            </Root>
        );
    }
}
export default OutputRules;

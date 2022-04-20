import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { Root, Spinner, Icon } from 'native-base';
import { MainOutput } from '../../../../components/IoModules/OutputSettingsComponent';
import { OutputUpdate } from '../../../../../backend/IoController/getOutputSettings';

class OutputChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Key: "",
            Status: "",
            Kural1: "",
            KuralList: ["Seçiniz", "Manuel", "Kural Tabanlı", "Günlük Çizelge", "Haftalık Çizelge", "Sıcaklık Kontrollü", "Analog Kontrollü"],
            Kural1Array: ["Seçiniz", "Manuel", "Kural Tabanlı", "Günlük Çizelge", "Haftalık Çizelge", "Sıcaklık Kontrollü", "Analog Kontrollü"],
            Kural2Array: ["Seçiniz", "Manuel", "Kural Tabanlı", "Günlük Çizelge", "Haftalık Çizelge", "Sıcaklık Kontrollü", "Analog Kontrollü"],
            Kural2: "",
            Cihazlar: [],
            SelectedDevice: "",
            butonSpinner: false,
            dataLoading: true,
            birDsb: false,
            birveikiDsb: false,
            birveyaikiDsb: false,
            selectedIndex: "",
            controlMode: ""
        }
    }
    kural1 = (data) => {
        var kural = data.control_mode.split("");
        var arrayKural = this.state.KuralList;
        var modeFirst;
        if (kural[0] == "M") {
            modeFirst = arrayKural[1]
        }
        else if (kural[0] == "E") {
            modeFirst = arrayKural[2]
        }
        else if (kural[0] == "D") {
            modeFirst = arrayKural[3]
        }
        else if (kural[0] == "W") {
            modeFirst = arrayKural[4]
        }
        else if (kural[0] == "T") {
            modeFirst = arrayKural[5]
        }
        else if (kural[0] == "A") {
            modeFirst = arrayKural[6]
        }
        else {
            modeFirst = arrayKural[0]
        }
        return modeFirst
    }
    kural2 = (data) => {
        var kural = data.control_mode.split("")
        var arrayKural = this.state.KuralList;
        var modeSecond;
        if (kural[2] == "M") {
            modeSecond = arrayKural[1]
        }
        else if (kural[2] == "E") {
            modeSecond = arrayKural[2]
        }
        else if (kural[2] == "D") {
            modeSecond = arrayKural[3]
        }
        else if (kural[2] == "W") {
            modeSecond = arrayKural[4]
        }
        else if (kural[2] == "T") {
            modeSecond = arrayKural[5]
        }
        else if (kural[2] == "A") {
            modeSecond = arrayKural[6]
        }
        else {
            modeSecond = arrayKural[0]
        }
        return modeSecond
    }
    changeData = async (val) => {
        var data = this.state.Kural2Array
        switch (val) {
            case "Manuel":
                data = ["Seçiniz"]
                this.setState({ Kural2: data[0], birveikiDsb: true, birveyaikiDsb: true, selectedIndex: 0, birDsb: false })
                break;
            case "Kural Tabanlı":
                data = ["Seçiniz", "Günlük Çizelge", "Haftalık Çizelge", "Sıcaklık Kontrollü"]
                break;
            case "Günlük Çizelge":
                data = ["Seçiniz", "Kural Tabanlı", "Sıcaklık Kontrollü",]
                break;
            case "Haftalık Çizelge":
                data = ["Seçiniz", "Kural Tabanlı", "Sıcaklık Kontrollü",]
                break;
            case "Sıcaklık Kontrollü":
                data = ["Seçiniz", "Kural Tabanlı", "Günlük Çizelge", "Haftalık Çizelge",]
                break;
            case "Analog Kontrollü":
                data = ["Seçiniz"]
                this.setState({ Kural2: data[0], birveikiDsb: true, birveyaikiDsb: true, selectedIndex: 0, birDsb: false })
                break;
            default:
                break;
        }
        this.setState({ Kural2Array: data })
    }
    kuralSecim = async (val) => {
        var data = val.split("")
        if (data.length > 1) {
            if (data[1] == "&") {
                this.setState({
                    birDsb: true,
                    birveikiDsb: false,
                    birveyaikiDsb: false,
                    selectedIndex: 1
                })
            }
            else if (data[1] == "|") {
                this.setState({
                    birDsb: true,
                    birveikiDsb: false,
                    birveyaikiDsb: false,
                    selectedIndex: 2
                })
            }
            else {
                this.setState({
                    birDsb: false,
                    birveikiDsb: true,
                    birveyaikiDsb: true,
                    selectedIndex: 0
                })
            }
        }
        else {
            this.setState({
                birDsb: false,
                birveikiDsb: true,
                birveyaikiDsb: true,
                selectedIndex: 0
            })
        }
    }
    onChangeKuralSecim(value) {
        if (value != 0) {
            this.setState({
                birDsb: false,
                birveikiDsb: false,
                birveyaikiDsb: false,
            })
        }
        else {
            this.setState({
                birDsb: false,
                birveikiDsb: true,
                birveyaikiDsb: true,
            })
        }
    }
    UNSAFE_componentWillMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            this.setState({ dataLoading: true })
            await this.PageDidFocus()
        });
    }
    PageDidFocus = async () => {
        this.setState({ dataLoading: true })
        var dataSource = this.props.OutputData
        var dataDevices = this.props.OutputDevices
        this.setState({ Kural1: this.kural1(dataSource), Kural2: this.kural2(dataSource), })
        await this.kuralSecim(dataSource.control_mode)
        await this.changeData(this.state.Kural1)
        this.setState({
            Key: dataSource.channel,
            Status: dataSource.status_1_name,
            Cihazlar: dataDevices,
            SelectedDevice: dataSource.selected_device,
        })
        setTimeout(() => {
            this.setState({ dataLoading: false })
        }, 1500);
    }
    onSelect(index) {
        this.setState({
            selectedIndex: index
        })
    }
    goChangeRules = () => {
        let { Module_ID, Module_TYPE, OutputData, OutputLocation } = this.props;
        if (this.state.Kural1 == "Kural Tabanlı") {
            this.props.navigation.navigate('IoOutputRules', {
                module_ID: Module_ID,
                module_TYPE: Module_TYPE,
                module_CHANNEL: this.state.Key,
                module_API: 1,
                module_LOCATION: OutputLocation
            })
        }
        else if (this.state.Kural1 == "Sıcaklık Kontrollü") {
            this.props.navigation.navigate('IoOutputRules', {
                node_ID: OutputData.id,
                module_ID: Module_ID,
                module_TYPE: Module_TYPE,
                module_API: 2,
                module_LOCATION: OutputLocation
            })
        }
        else if (this.state.Kural1 == "Günlük Çizelge") {
            this.props.navigation.navigate('IoOutputRules', {
                node_ID: OutputData.id,
                module_ID: Module_ID,
                module_TYPE: Module_TYPE,
                module_API: 3,
                module_LOCATION: OutputLocation
            })
        }
        else if (this.state.Kural1 == "Haftalık Çizelge") {
            this.props.navigation.navigate('IoOutputRules', {
                node_ID: OutputData.id,
                module_ID: Module_ID,
                module_TYPE: Module_TYPE,
                module_API: 4,
                module_LOCATION: OutputLocation
            })
        }
        else if (this.state.Kural1 == "Analog Kontrollü") {
            this.props.navigation.navigate('IoOutputRules', {
                node_ID: OutputData.id,
                module_ID: Module_ID,
                module_TYPE: Module_TYPE,
                module_API: 5,
                module_LOCATION: OutputLocation
            })
        }
        else {
            Alert.alert(
                "Uyarı",
                "Bu mod için uygun ayarlama yapılamaz !",
                [
                    { text: "Tamam", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
    }
    goChangeRules2 = () => {
        let { Module_ID, Module_TYPE, OutputData } = this.props;
        if (this.state.Kural2 == "Kural Tabanlı") {
            this.props.navigation.navigate('IoOutputRules', {
                module_ID: Module_ID,
                module_TYPE: Module_TYPE,
                module_CHANNEL: this.state.Key,
                module_API: 1
            })
        }
        else if (this.state.Kural2 == "Sıcaklık Kontrollü") {
            this.props.navigation.navigate('IoOutputRules', {
                node_ID: OutputData.id,
                module_ID: Module_ID,
                module_TYPE: Module_TYPE,
                module_API: 2
            })
        }
        else if (this.state.Kural2 == "Günlük Çizelge") {
            this.props.navigation.navigate('IoOutputRules', {
                node_ID: OutputData.id,
                module_ID: Module_ID,
                module_TYPE: Module_TYPE,
                module_API: 3
            })
        }
        else if (this.state.Kural2 == "Haftalık Çizelge") {
            this.props.navigation.navigate('IoOutputRules', {
                node_ID: OutputData.id,
                module_ID: Module_ID,
                module_TYPE: Module_TYPE,
                module_API: 4
            })
        }
        else if (this.state.Kural2 == "Analog Kontrollü") {
            this.props.navigation.navigate('IoOutputRules', {
                node_ID: OutputData.id,
                module_ID: Module_ID,
                module_TYPE: Module_TYPE,
                module_API: 5
            })
        }
        else {
            Alert.alert(
                "Uyarı",
                "Bu mod için uygun ayarlama yapılamaz !",
                [
                    { text: "Tamam", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
    }
    _renderContent() {
        return (
            <MainOutput
                KeyValue={this.state.Key}
                OnChangeCıkısAdı={(value) => this.setState({ Status: value })}
                CıkısAdıDeger={this.state.Status}
                Kural1Deger={this.state.Kural1}
                selectedValueKural1={this.state.Kural1}
                onValueChangeKural1={(value) => { this.setState({ Kural1: value }); this.changeData(value) }}
                arrayKural1={this.state.Kural1Array}
                arrayKural2={this.state.Kural2Array}
                Kural2Deger={this.state.Kural2}
                selectedValueKural2={this.state.Kural2}
                onValueChangeKural2={(value) => { this.setState({ Kural2: value }); this.onChangeKuralSecim(value) }}
                Devices={this.state.Cihazlar}
                selectedDevice={this.state.SelectedDevice}
                selectedValueCihazlar={this.state.SelectedDevice}
                onValueChangeCihazlar={(value) => this.setState({ SelectedDevice: value })}
                onSelect={(value) => { this.onChangeKuralSecim(value); this.onSelect(value) }}
                BirDisabled={this.state.birDsb}
                BirveİkiDisabled={this.state.birveikiDsb}
                BirveyaİkiDisabled={this.state.birveyaikiDsb}
                selectedIndex={this.state.selectedIndex}
                onPressKural1Ayar={() => this.goChangeRules()}
                onPressKural2Ayar={() => this.goChangeRules2()}
            />
        )
    }
    kuralGonder = async (kural1, kural2) => {
        var _kural1, _kural2, mode;
        switch (kural1) {
            case "Manuel":
                _kural1 = "M"
                break;
            case "Kural Tabanlı":
                _kural1 = "E"
                break;
            case "Günlük Çizelge":
                _kural1 = "D"
                break;
            case "Haftalık Çizelge":
                _kural1 = "W"
                break;
            case "Sıcaklık Kontrollü":
                _kural1 = "T"
                break;
            case "Analog Kontrollü":
                _kural1 = "A"
                break;
            case "Seçiniz":
                _kural1 = ""
                break;
            default:
                break;
        }

        switch (kural2) {
            case "Manuel":
                _kural2 = "M"
                break;
            case "Kural Tabanlı":
                _kural2 = "E"
                break;
            case "Günlük Çizelge":
                _kural2 = "D"
                break;
            case "Haftalık Çizelge":
                _kural2 = "W"
                break;
            case "Sıcaklık Kontrollü":
                _kural2 = "T"
                break;
            case "Analog Kontrollü":
                _kural2 = "A"
                break;
            case "Seçiniz":
                _kural2 = ""
                break;
            default:
                break;
        }
        if (this.state.selectedIndex == 0) {
            mode = _kural1
        }
        else if (this.state.selectedIndex == 1) {
            mode = _kural1 + "&" + _kural2;
        }
        else if (this.state.selectedIndex == 2) {
            mode = _kural1 + "|" + _kural2
        }
        // this.state.controlMode = mode
        this.setState({ controlMode: mode })
    }
    outputSettingsUpdate = async () => {
        var { OutputData, OutputAllData, Module_TYPE, Module_ID } = this.props;
        var dataSource = OutputData
        var allData = OutputAllData
        await this.kuralGonder(this.state.Kural1, this.state.Kural2)
        var paramArray = {
            id: dataSource.id,
            channel: this.state.Key,
            status_1_name: this.state.Status,
            status_0_name: dataSource.status_0_name,
            control_mode: this.state.controlMode,
            selected_device: this.state.SelectedDevice,
        }

        allData.forEach((element, index) => {
            if (element.channel == dataSource.channel) {
                allData[index] = paramArray
            }
        });
        this.setState({ butonSpinner: true })
        await OutputUpdate(Module_TYPE, Module_ID, allData)
        this.setState({ butonSpinner: false })
    }
    render() {
        var { Module_ID, OutputLocation } = this.props;
        return (
            <Root>
                <View style={{ flex: 1, }}>
                    {
                        this.state.dataLoading &&
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                            <Spinner color='#aaa' style={{ width: "100%" }} />
                        </View>
                    }
                    {!this.state.dataLoading &&
                        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 50 }} contentContainerStyle={{ margin: 5, }}>
                            <View style={{ width: '100%', backgroundColor: '#ddd', borderRadius: 4, marginTop: 5, padding: 5, }}>
                                <View style={{ flex: 1, backgroundColor: '#ccc', borderRadius: 4, margin: 3, flexDirection: 'row' }}>
                                    <View style={{ backgroundColor: '#bbb', width: 100, padding: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                        <Icon type="FontAwesome5" name="map-marker-alt" style={{ fontSize: 25, color: '#E26A6A' }} /><Text style={{ fontSize: 15, color: '#444', }}> Konum </Text>
                                    </View>
                                    <View style={{ padding: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                        <Text style={{ fontSize: 15, }}>{OutputLocation}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, backgroundColor: '#ccc', borderRadius: 4, margin: 3, flexDirection: 'row' }}>
                                    <View style={{ backgroundColor: '#bbb', width: 100, padding: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                        <Icon type="FontAwesome5" name="keyboard" style={{ fontSize: 25, color: '#E26A6A' }} /><Text style={{ fontSize: 15, color: '#444', }}> Cihaz ID </Text>
                                    </View>
                                    <View style={{ padding: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                        <Text style={{ fontSize: 15, }}>{Module_ID}</Text>
                                    </View>
                                </View>
                            </View>
                            {
                                this._renderContent()
                            }

                            {!this.state.butonSpinner &&
                                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
                                    <TouchableOpacity onPress={() => this.outputSettingsUpdate()} style={{ width: '50%', height: 40, borderRadius: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', }}>
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
                    }
                </View>
            </Root>
        );
    }
}
export default OutputChange;
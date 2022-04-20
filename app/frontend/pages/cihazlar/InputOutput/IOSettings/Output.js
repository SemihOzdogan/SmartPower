import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Root, Spinner, Icon } from 'native-base';
import { GetOutputSettings } from '../../../../../backend/IoController/getOutputSettings';
import * as Animatable from 'react-native-animatable';

class OutputScreen extends Component {

    constructor(props) {
        super(props);
        var obj = {}
        for (let index = 1; index < 9; index++) {
            var detail = "C1Detail" + index
            var status = "C1Status" + index
            var kural1 = "C1Kural1_" + index
            var kural2 = "C1Kural2_" + index
            var selectedDevice = "C1SelectedDevice" + index
            var C1kuralSecim1 = "C1KuralSecim1_" + index
            var C1kuralSecim1ve2 = "C1KuralSecim1ve2_" + index
            var C1kuralSecim1veya2 = "C1KuralSecim1veya2_" + index
            var C1kuralSecimVisible1 = "C1KuralSecimVisible" + index
            var C1kuralSecimVisible1ve2 = "C1KuralSecimVisible1ve2_" + index
            var C1kuralSecimVisible1veya2 = "C1KuralSecimVisible1veya2_" + index

            var GrpkuralSecim1 = "GrpKuralSecim1_" + index
            var GrpkuralSecim1ve2 = "GrpKuralSecim1ve2_" + index
            var GrpkuralSecim1veya2 = "GrpKuralSecim1veya2_" + index
            var GrpkuralSecimVisible1 = "GrpKuralSecimVisible" + index
            var GrpkuralSecimVisible1ve2 = "GrpKuralSecimVisible1ve2_" + index
            var GrpkuralSecimVisible1veya2 = "GrpKuralSecimVisible1veya2_" + index

            obj[detail] = false
            obj[status] = ""
            obj[kural1] = ""
            obj[kural2] = ""
            obj[selectedDevice] = ""
            obj[C1kuralSecim1] = false
            obj[C1kuralSecim1ve2] = false
            obj[C1kuralSecim1veya2] = false
            obj[C1kuralSecimVisible1] = false
            obj[C1kuralSecimVisible1ve2] = false
            obj[C1kuralSecimVisible1veya2] = false
            obj[GrpkuralSecim1] = false
            obj[GrpkuralSecim1ve2] = false
            obj[GrpkuralSecim1veya2] = false
            obj[GrpkuralSecimVisible1] = false
            obj[GrpkuralSecimVisible1ve2] = false
            obj[GrpkuralSecimVisible1veya2] = false

        }

        obj.arrayKural1 = ["Manuel", "Kural Tabanlı", "Günlük Çizelge", "Haftalık Çizelge", "Sıcaklık Kontrollü", "Analog Kontrollü"]
        obj.arrayKural2 = ["Manuel", "Kural Tabanlı", "Günlük Çizelge", "Haftalık Çizelge", "Sıcaklık Kontrollü", "Analog Kontrollü"]
        obj.C1Devices = []
        obj.butonSpinner = false
        obj.dataLoading = false
        obj.Grp1Detail = false
        obj.Grp2Detail = false
        obj.Grp1Status = ""
        obj.Grp2Status = ""
        obj.Grp1Kural1 = ""
        obj.Grp2Kural1 = ""
        obj.Grp1Kural2 = ""
        obj.Grp2Kural2 = ""
        obj.GrpDevices = []
        obj.Grp1SelectedDevice = ""
        obj.Grp2SelectedDevice = ""
        obj.dataSource = [],
            obj.dataDevices = []
        this.state = obj
    };

    UNSAFE_componentWillMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.PageDidFocus()
        });
    }

    PageDidFocus = async () => {
        this.setState({ dataLoading: true, })
        await GetOutputSettings(this, this.props.inputOutputType, this.props.inputOutputID);
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={{ width: '100%', backgroundColor: '#ddd', borderRadius: 4, marginTop: 5, padding: 10, }}>
                < Animatable.View iterationCount={1} animation="pulse" style={{ width: '100%', height: 40, backgroundColor: "#bbb", borderRadius: 4 }
                }>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('IoOutputChange', {
                        OutputData: item,
                        OutputDevices: this.state.dataDevices,
                        OutputAllData: this.state.dataSource,
                        Module_ID: this.props.inputOutputID,
                        Module_TYPE: this.props.inputOutputType,
                        OutputLocation: this.props.inputOutputLocation

                    })} style={{ width: '100%', height: 40, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular' }}>{"Çıkış " + (index + 1)} Ayarları</Text>
                        <View style={{ position: 'absolute', right: 5, }}>
                            <Icon type="FontAwesome5" name={"arrow-right"} style={{ color: '#2E2E2E', fontSize: 25 }} />
                        </View>
                    </TouchableOpacity>
                </Animatable.View >
            </View>
        )
    }

    render() {
        return (
            <Root>
                <View style={{ flex: 1, }}>
                    {this.state.dataLoading &&
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                            <Spinner color='#aaa' style={{ width: "100%" }} />
                        </View>
                    }
                    {!this.state.dataLoading &&
                        <SafeAreaView style={{ backgroundColor: "#eee", flex: 1, marginHorizontal: 10, top: 10, marginVertical: 5, marginBottom: 30 }}>
                            <View style={{ width: '100%',height:100, backgroundColor: '#ddd', borderRadius: 4, marginTop: 5, padding: 5, }}>
                                <View style={{ flex: 1, backgroundColor: '#ccc', borderRadius: 4, margin: 3, flexDirection: 'row' }}>
                                    <View style={{ backgroundColor: '#bbb', width: 100, padding: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                        <Icon type="FontAwesome5" name="map-marker-alt" style={{ fontSize: 25, color: '#E26A6A' }} /><Text style={{ fontSize: 15, color: '#444', }}> Konum </Text>
                                    </View>
                                    <View style={{ padding: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                        <Text style={{ fontSize: 15, }}>{this.props.inputOutputLocation}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, backgroundColor: '#ccc', borderRadius: 4, margin: 3, flexDirection: 'row' }}>
                                    <View style={{ backgroundColor: '#bbb', width: 100, padding: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                        <Icon type="FontAwesome5" name="keyboard" style={{ fontSize: 25, color: '#E26A6A' }} /><Text style={{ fontSize: 15, color: '#444', }}> Cihaz ID </Text>
                                    </View>
                                    <View style={{ padding: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                        <Text style={{ fontSize: 15, }}>{this.props.inputOutputID}</Text>
                                    </View>
                                </View>
                            </View>
                            <FlatList
                                data={this.state.dataSource}
                                keyExtractor={(index, id) => id.toString()}
                                renderItem={this._renderItem}
                                showsVerticalScrollIndicator={false}
                            >
                            </FlatList>
                        </SafeAreaView >
                    }
                </View>
            </Root >
        );
    }
}

export default OutputScreen;
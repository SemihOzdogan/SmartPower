import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Container, Root, Text, Spinner, CheckBox } from 'native-base';
import { GetComdeviceSettings, GetComdeviceSettingsUpdate } from '../../../../backend/modemController/GetModemSettings';
import ModemSettingsInput from '../../../components/CustomTextInput/CustomTextInput';
import LinearGradient from 'react-native-linear-gradient';

class ModemSettingsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modemInfo: [],
            dataLoading: true,
            butonSpinner: false,
            location: '',
            latitude: '',
            longitude: '',
            deviceUretim: '',
            deviceLastTime: '',
            signalStatus: '',
            IOCheck: false,
            SubmitIO: ""
        }
    }


    UNSAFE_componentWillMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.PageDidFocus()
        });
    }

    PageDidFocus = async () => {
        await GetComdeviceSettings(this, this.props.modemNo);
    }

    goModemSettingsUpdate = async () => {
        this.setState({ butonSpinner: true })
        await GetComdeviceSettingsUpdate(this, this.props.modemNo)
        this.setState({ butonSpinner: false })
    }

    isChecked = async () => {
        await this.setState({ IOCheck: !this.state.IOCheck })
        if (this.state.IOCheck == true) {
            this.setState({ SubmitIO: 1 })
        } else {
            this.setState({ SubmitIO: 0 })
        }
    }

    render() {

        const { modemInfo } = this.state;

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

                            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1,  paddingHorizontal: 10, backgroundColor: '#f5f5f5',  paddingVertical: 10 }}>

                                <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} colors={['#ADE5FE', '#FFFFFF']} style={styles.dataContainer}>

                                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                        <View style={{ width: '50%', height: 20, backgroundColor: '#ddd', left: 3, borderRadius: 6, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 14, fontFamily: 'Poppins-Thin', left: 5 }}>Modem ID : <Text style={{ color: '#DA7C62', fontSize: 14, fontFamily: 'Poppins-Thin', fontWeight: 'bold' }}>{modemInfo.comm_device_id}</Text></Text>
                                        </View>
                                        <View style={{ marginLeft: 10, width: '45%', height: 20, backgroundColor: '#ddd', left: 3, borderRadius: 6, justifyContent: 'center', }}>
                                            <Text style={{ fontSize: 14, fontFamily: 'Poppins-Thin', left: 5 }}>Tip : <Text style={{ color: '#DA7C62', fontSize: 14, fontFamily: 'Poppins-Thin', fontWeight: 'bold' }}>{modemInfo.communication_type}</Text></Text>
                                        </View>
                                    </View>

                                    <ModemSettingsInput
                                        title="Konum Bilgisi"
                                        icon="map-marker-alt"
                                        placeholder="Konum"
                                        value={this.state.location}
                                        onChangeText={(value) => this.setState({ location: value })}
                                    />
                                    <ModemSettingsInput
                                        title="Enlem Bilgisi"
                                        icon="compass"
                                        placeholder="Enlem"
                                        value={this.state.latitude}
                                        onChangeText={(value) => this.setState({ latitude: value })}
                                    />
                                    <ModemSettingsInput
                                        title="Boylam Bilgisi"
                                        icon="compass"
                                        placeholder="Boylam"
                                        value={this.state.longitude}
                                        onChangeText={(value) => this.setState({ longitude: value })}
                                    />
                                </LinearGradient>

                                <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} colors={['#ADE5FE', '#FFFFFF']} style={styles.dataContainer}>

                                    <View style={styles.dataView}>
                                        <View style={styles.dataSubView}>
                                            <Text style={styles.dataMainText}>Yazılım Versiyonu</Text>
                                            <Text style={styles.dataText}>{modemInfo.sw_version}</Text>
                                        </View>
                                        <View style={styles.dataSubTwoView}>
                                            <Text style={styles.dataMainText}>Donanım Versiyonu</Text>
                                            <Text style={styles.dataText}>{modemInfo.model_version}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.dataView}>
                                        <View style={styles.dataSubView}>
                                            <Text style={styles.dataMainText}>Üretim Tarihi</Text>
                                            <Text style={styles.dataText}>{this.state.deviceUretim}</Text>
                                        </View>
                                        <View style={styles.dataSubTwoView}>
                                            <Text style={styles.dataMainText}>Son Bağlantı Zamanı</Text>
                                            <Text style={styles.dataText}>{this.state.deviceLastTime}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.dataView}>
                                        <View style={styles.dataSubView}>
                                            <Text style={styles.dataMainText}>IMEI No</Text>
                                            <Text style={styles.dataText}>{modemInfo.imei == null ? "---" : modemInfo.imei}</Text>
                                        </View>
                                        <View style={styles.dataSubTwoView}>
                                            <Text style={styles.dataMainText}>Sim Kart No</Text>
                                            <Text style={styles.dataText}>{modemInfo.iccid != null ? modemInfo.iccid.split('F') : "---"}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.dataView}>
                                        <View style={styles.dataSubView}>
                                            <Text style={styles.dataMainText}>Sinyal Kalitesi</Text>
                                            <Text style={styles.dataText}>{this.state.signalStatus}</Text>
                                        </View>
                                        <View style={{ flex: 1, backgroundColor: '#ddd', borderRadius: 6, justifyContent: 'center', left: 3, flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'Poppins-Thin', top: 3 }}>I/O Desteği </Text>
                                            <CheckBox onPress={() => this.isChecked()} checked={this.state.IOCheck} />
                                        </View>
                                    </View>

                                </LinearGradient>

                                {this.state.butonSpinner &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
                                        <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} colors={['#ADE5FE', '#FFFFFF']} style={styles.buttonView}>
                                            <TouchableOpacity onPress={() => this.goModemSettingsUpdate()} style={styles.button}>
                                                <Spinner color='#fff' style={{ width: "100%" }} />
                                            </TouchableOpacity>
                                        </LinearGradient>
                                    </View>
                                }

                                {!this.state.butonSpinner &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
                                        <LinearGradient start={{ x: 1, y: 1 }} end={{ x: -1, y: 0 }} colors={['#ADE5FE', '#FFFFFF']} style={styles.buttonView}>
                                            <TouchableOpacity onPress={() => this.goModemSettingsUpdate()} style={styles.button}>
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

export default ModemSettingsScreen;

const styles = StyleSheet.create({
    dataContainer: {
        flex: 1,
        width: '100%',
        height: 230,
        borderRadius: 8,
        marginTop: 5,
        padding: 10
    },
    dataMainText: {
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'Poppins-Thin',
        top: 3,
        marginHorizontal: 5,
    },
    dataText: {
        textAlign: 'center',
        color: '#DA7C62',
        fontSize: 10,
        fontFamily: 'Poppins-Thin',
        fontWeight: 'bold'
    },
    dataView: {
        width: '100%',
        height: 40,
        marginTop: 3,
        flexDirection: 'row',
        paddingHorizontal: 5
    },
    dataSubView: {
        flex: 1,
        backgroundColor: '#ddd',
        borderRadius: 6,
        justifyContent: 'center',
        right: 3
    },
    dataSubTwoView: {
        flex: 1,
        backgroundColor: '#ddd',
        borderRadius: 6,
        justifyContent: 'center',
        left: 3
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
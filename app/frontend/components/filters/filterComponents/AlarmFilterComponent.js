import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon, Picker } from "native-base";
import CheckInternet from '../../../../backend/InternetController/CheckInternet';
import { StandardTextInputComponent } from '../../CustomTextInput/CustomTextInput';

class AlarmFilterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            location: ""
        };
    }

    render() {
        return (
            <View style={{ width: '100%', height: '70%', padding: 15 }}>
                <CheckInternet />
                <View style={{ flex: 1, backgroundColor: '#eee', borderRadius: 6, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', height: '60%', marginVertical: 15, flexDirection: 'column', borderRadius: 6, justifyContent: 'center' }}>
                        <View style={{ flex: 1, backgroundColor: 'white', padding: 10, borderRadius: 6, justifyContent: 'center', marginVertical: 10 }}>
                            <View style={{ width: '100%', height: 50, flexDirection: 'row' }}>
                                <View style={{ flex: 1, borderWidth: 1.3, borderColor: '#00AEEF', borderRadius: 6, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, backgroundColor: '#00AEEF', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 3, borderBottomLeftRadius: 3 }}>
                                        <Icon type="FontAwesome5" name="user-cog" style={{ color: '#9CCD6D', fontSize: 30 }}></Icon>
                                    </View>
                                    <View style={{ flex: 3 }}>
                                        <Picker
                                            mode="dialog"
                                            placeholder="Tip seçin"
                                            placeholderStyle={{ color: "#9CCD6D" }}
                                            style={{ color: '#9CCD6D', alignItems: 'center', justifyContent: 'center', padding: 10 }}
                                            iosIcon={<Icon name="arrow-down" style={{ color: '#9CCD6D' }} />}
                                            selectedValue={this.props.Type}
                                            onValueChange={this.props.onChangeType}
                                            headerBackButtonText="Geri"
                                            iosHeader="Alarm Tip"
                                            textStyle={{ color: '#9CCD6D', }}
                                        >
                                            <Picker.Item label="Alarm tipi seçin" value="0!-" />
                                            <Picker.Item label="Reaktif Limit Aşımı" value="1!-" />
                                            <Picker.Item label="Reaktif Limit Aşımı SMS" value="2!-" />
                                            <Picker.Item label="Haberleşme Hatası" value="3!-" />
                                            <Picker.Item label="Haberleşme Hatası SMS" value="4!-" />
                                            {/* <Picker.Item label="Enerji Kesintisi SMS" value="5!-" /> */}
                                            <Picker.Item label="Giriş Değişimleri" value="7!-" />
                                            <Picker.Item label="Giriş Değişimleri SMS" value="8!-" />
                                            <Picker.Item label="Gerilim" value="9!-" />
                                            <Picker.Item label="Dengesiz Akım" value="10!-" />
                                            <Picker.Item label="5A'dan Yüksek Akım" value="11!-" />
                                            <Picker.Item label="Faz Kesintisi" value="12!-" />
                                            <Picker.Item label="Zayıf Pil" value="13!-" />
                                            <Picker.Item label="Gövde Kapağı" value="14!-" />
                                            <Picker.Item label="Klemens Kapağı" value="15!-" />
                                            <Picker.Item label="Sıcaklık" value="17!-" />
                                            <Picker.Item label="Sıcaklık SMS" value="18!-" />
                                            <Picker.Item label="Enerji Kesintisi (Jeneratör)" value="21!-" />
                                            <Picker.Item label="Yakıt Seviyesi" value="22!-" />
                                            <Picker.Item label="Akü Gerilimi" value="23!-" />
                                            <Picker.Item label="Manuel Mod" value="24!-" />
                                            <Picker.Item label="Süresiz Aydınlatma" value="31!-" />
                                            <Picker.Item label="Zamana Bağlı Akım" value="32!-" />
                                            <Picker.Item label="Demand Aşımı" value="36!-" />
                                            <Picker.Item label="Export Demand Aşımı" value="37!-" />
                                            <Picker.Item label="Yakıt Sensörü" value="38!-" />
                                            <Picker.Item label="Jeneratör Olağan Dışı Durması" value="39!-" />
                                            <Picker.Item label="Soğutma Suyu Seviyesi" value="41!-" />
                                            <Picker.Item label="Enerji Tüketim" value="43!-" />
                                            <Picker.Item label="Analog Sensör" value="44!-" />
                                        </Picker>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, backgroundColor: 'white', padding: 10, borderRadius: 6, justifyContent: 'center', marginVertical: 5 }}>

                            <StandardTextInputComponent
                                secureTextEntry={this.props.secureTextEntry}
                                icon={this.props.locationIcon}
                                placeholder={this.props.locationLabel}
                                onChangeText={this.props.onChangeLocation}
                                value={this.props.Location}
                            />
                        </View>
                        <View style={{ flex: 1, backgroundColor: 'white', padding: 10, borderRadius: 6, justifyContent: 'center', marginVertical: 5 }}>

                            <StandardTextInputComponent
                                secureTextEntry={this.props.secureTextEntry}
                                icon={this.props.deviceIcon}
                                placeholder={this.props.deviceLabel}
                                onChangeText={this.props.onChangeDeviceNo}
                                value={this.props.DeviceNo}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default AlarmFilterComponent;

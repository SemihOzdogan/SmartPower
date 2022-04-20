import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon, Picker } from "native-base";
import CheckInternet from '../../../../backend/InternetController/CheckInternet';
import { StandardTextInputComponent } from '../../CustomTextInput/CustomTextInput';

class ModemFilterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            location: ''
        }
    }
    render() {
        return (
            <View style={{ width: '100%', height: '70%', padding: 15 }}>
                <CheckInternet />
                <View style={{ flex: 1, backgroundColor: '#eee', borderRadius: 6, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', height: '60%', marginVertical: 15, flexDirection: 'column', borderRadius: 6, justifyContent: 'center' }}>
                        <View style={{ flex: 1, backgroundColor: 'white', padding: 10, borderRadius: 6, justifyContent: 'center', marginVertical: 5 }}>
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
                                            iosHeader="Modem Tip"
                                            textStyle={{ color: '#9CCD6D', }}
                                        >
                                            <Picker.Item label="Modem tipi seçin" value="0" />
                                            <Picker.Item label="GPRS" value="GPRS" />
                                            <Picker.Item label="ETHERNET" value="Ethernet" />
                                            <Picker.Item label="GSM" value="GSM" />
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

export default ModemFilterComponent;

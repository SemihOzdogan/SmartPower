import React, { Component } from 'react';
import { View } from 'react-native';
import CheckInternet from '../../../../backend/InternetController/CheckInternet';
import { StandardTextInputComponent } from '../../CustomTextInput/CustomTextInput';

class SıcaklıkSensorFilterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            location: ''
        };
    }

    render() {
        return (
            <View style={{ width: '100%', height: '70%', padding: 15 }}>
            <CheckInternet />
            <View style={{ flex: 1, backgroundColor: '#eee', borderRadius: 6, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: '90%', height: '60%', marginVertical: 15, flexDirection: 'column', borderRadius: 6, justifyContent: 'center' }}>
                    <View style={{ flex: 1, backgroundColor: 'white', padding: 10, borderRadius: 6, justifyContent: 'center', marginVertical: 5 }}>
                        <StandardTextInputComponent
                            secureTextEntry={this.props.secureTextEntry}
                            icon={this.props.modemIcon}
                            placeholder={this.props.modemLabel}
                            onChangeText={this.props.onChangeType}
                            value={this.props.Type}
                        />
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
        </View >
        );
    }
}

export default SıcaklıkSensorFilterComponent;

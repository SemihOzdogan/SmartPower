import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Icon } from 'native-base';

export default CustomTextInputComponent = props => {
    return (
        <View style={{ height: 60, padding: 2, marginTop: 1 }}>
            <View style={{ width: props.dısGenislik, height: 50, borderRadius: 6, backgroundColor: '#ddd', }}>
                <Text style={{ bottom: -5, left: 3, fontFamily: 'Poppins-Thin', bottom: -2 }}>
                    <Icon type="FontAwesome5" name={props.icon} style={{ fontSize: 15, color: '#DA7C62' }}> </Icon>
                    {props.title}</Text>
                <TextInput style={{ width: props.icGenislik, height: 25, paddingLeft: 10, color: '#bbb', backgroundColor: 'white', margin: 2, borderRadius: 6, padding: -10, }}
                    autoCompleteType="off"
                    underlineColorAndroid="transparent"
                    placeholder={props.placeholder}
                    placeholderTextColor="#bbb"
                    value={props.value}
                    onChangeText={props.onChangeText}
                    returnKeyType="done"
                />
            </View>
        </View>
    )
}

export const StandardTextInputComponent = props => {
    return (
        <View style={{ width: '100%', flexDirection: 'row', marginVertical: 5 }}>
            <View style={{ flex: 1, borderWidth: 1.3, borderColor: '#00AEEF', borderRadius: 6, flexDirection: 'row' }}>
                <View style={{ flex: 1, backgroundColor: '#00AEEF', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                    <Icon type="FontAwesome5" name={props.icon} style={{ color: '#9CCD6D', fontSize: 25 }}></Icon>
                </View>
                <View style={{ flex: 3 }}>
                    <TextInput
                        autoCapitalize={props.autoCapitalize}
                        secureTextEntry={props.secureTextEntry}
                        underlineColorAndroid="transparent"
                        placeholder={props.placeholder}
                        style={{ alignItems: 'center', color: '#9CCD6D', justifyContent: 'center', padding: 10 }}
                        placeholderTextColor="#9CCD6D"
                        fontSize={16}
                        onChangeText={props.onChangeText}
                        value={props.value}
                        maxLength={props.maxLength}
                        returnKeyType={props.returnKeyType}
                        keyboardType={props.keyboardType}
                    >
                    </TextInput>
                </View>
            </View>
        </View>
    )
}

export const MobilSmsAlarmsTextInputComponent = props => {
    return (
        <View style={{ height: 40, flexDirection: 'row', marginVertical: 5 }}>
            <View style={{ flex: 4, borderWidth: 1.5, borderColor: '#44b6ae' }}>
                <TextInput style={{ flex: 3, color: '#bbb', backgroundColor: 'white', fontSize: 16, paddingLeft: 15 }}
                    maxLength={10}
                    keyboardType="phone-pad"
                    autoCompleteType="off"
                    underlineColorAndroid="transparent"
                    placeholder="(___) ___ __ __"
                    placeholderTextColor="#"
                    onChangeText={props.onChangeText}
                    value={props.value}
                    returnKeyType="done"
                    onSubmitEditing={props.onSubmitEditing}
                />
            </View>
            <View style={{ flex: 1, backgroundColor: '#44b6ae', justifyContent: 'center', alignItems: 'center' }}>
                <Icon type="FontAwesome5" name="mobile-alt" style={{ fontSize: 30, color: 'white' }} />
            </View>

        </View>
    )
}

import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Icon, CheckBox } from 'native-base';

export default CustomCheckBoxComponent = props => {
    return (
        <View style={{ height: 30, padding: 2, marginTop: 1 }}>
            <View style={{alignItems:'center',  height: 30, borderRadius: 8, backgroundColor: '#ddd',flexDirection:'row' }}>
                <Text style={{ bottom: -5, left: 3, fontFamily: 'Poppins-Thin', bottom: -2 }}>
                    <Icon type="FontAwesome5" name={props.icon} style={{ fontSize: 15, color: '#DA7C62' }}> </Icon>
                    {props.title} </Text>
                    <View><CheckBox onPress={props.onPress} checked={props.checked} /></View>
            </View>
        </View>
    )
}

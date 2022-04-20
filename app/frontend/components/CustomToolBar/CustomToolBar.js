import React from "react";
import { TouchableOpacity, } from "react-native";
import { Text, View, Icon, Badge, } from "native-base";
import LinearGradient from 'react-native-linear-gradient';

export default CustomToolBarComponent = props => {
    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 2 }} colors={['white', '#BDBDD7']} style={{ height: 200, flexDirection: 'row', position: 'absolute', top: 0, left: 0, right: 0, elevation: 4, zIndex: 100 }} style={{ width: '100%', height: 50, flexDirection: 'row' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 25 }}>
                <Badge style={{ backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>{props.ListCount}</Text>
                </Badge>
            </View>

            <View style={{ flex: 1 }}></View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity transparent onPress={props.onPressFilter} style={{ justifyContent: 'center', alignItems: 'center', position: "absolute", }}>
                        <Icon type="FontAwesome5" name='filter' style={{ color: 'gray', fontSize: 25, padding: 8 }} />
                    </TouchableOpacity>
                    {
                        props.FilterActive &&
                        <View style={{
                            width: 7, height: 7, backgroundColor: 'red', borderRadius: 7 / 2, marginLeft: 25, shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 6,
                            },
                            shadowOpacity: 0.37,
                            shadowRadius: 7.49,
                            elevation: 12,
                        }}></View>
                    }
                </View>
                <View style={{ height: 50, width: 1 }}>

                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 4 }}>
                    <TouchableOpacity transparent onPress={props.onPressRefresh} style={{ justifyContent: 'center', alignItems: 'center', position: "absolute", }}>
                        <Icon type="FontAwesome5" name='sync-alt' style={{ color: "gray", fontSize: 22, padding: 8 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    )
}

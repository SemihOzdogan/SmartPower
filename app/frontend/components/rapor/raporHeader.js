import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Icon } from 'native-base';

var height = Dimensions.get('window').height
var width = Dimensions.get('window').width

class RaporHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1, borderRadius: 4, margin: 5, backgroundColor: 'white', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height / 22, }}>
                    <Text style={{ fontSize: width / 20, color: "black", fontFamily: 'Poppins-Light', padding: 5 }} numberOflines={1}>
                        <Icon type="FontAwesome5" name="map-marker-alt" style={{ fontSize: width / 25, color: 'rgba(238, 65, 53, 0.5)' }} /> {this.props.konum.length < 25 ? this.props.konum : this.props.konum.slice(0,30) + '...'}
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: height / 15 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: width / 26, }}>Modem No</Text>
                        <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: width / 30, }}>{this.props.modemNo}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: width / 26, }}>Cihaz No</Text>
                        <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: width / 30, }}>{this.props.cihazNo}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: height / 15 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: width / 26, }}>İlk Veri Zamanı</Text>
                        <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: width / 30, }}>{this.props.ilkOkuma}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: width / 26, }}>Son Veri Zamanı</Text>
                        <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: width / 30, }}>{this.props.sonOkuma}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default RaporHeader;

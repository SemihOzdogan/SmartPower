import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon, Header, Left, Body, Right, Title } from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckInternet from '../../../app/backend/InternetController/CheckInternet';

class SpHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Header transparent>
                <CheckInternet />
                <Left style={{ flex: 0.2 }}>
                    <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => this.props.navigation.goBack()}>
                        <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                    </TouchableOpacity>
                </Left>

                <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Title style={[{ fontWeight: '400', fontFamily: "Poppins-Light", fontSize: 17,color:'black' }, { ...this.props.style }]} >{this.props.baslık}</Title>
                </Body>
                <Right style={{ flex: 0.2 }}>
                  
                </Right>
            </Header>
        );
    }
}

export default SpHeader;

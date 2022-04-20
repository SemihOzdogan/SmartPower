import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Container, View } from 'native-base';
import ModemListesi from './modemList';
import CheckInternet from '../../../backend/InternetController/CheckInternet';

class ModemScreen extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack()
        return true;
    }

    render() {
        return (
            <Container>
                <CheckInternet />
                <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
                    <ModemListesi navigation={this.props.navigation} />
                </View>
            </Container>
        );
    }
}
export default ModemScreen;
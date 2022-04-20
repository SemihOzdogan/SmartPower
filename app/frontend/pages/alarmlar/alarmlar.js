import React, { Component } from 'react';
import { BackHandler, SafeAreaView } from 'react-native';
import { Container } from 'native-base';
import AlarmListesi from './alarmlarList';
import CheckInternet from '../../../backend/InternetController/CheckInternet';
import { LoginControl } from '../../../backend/loginController/CheckLogin';

class Alarmlar extends Component {

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
                <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
                    <AlarmListesi navigation={this.props.navigation} />
                </SafeAreaView >
            </Container>
        );
    }
}
export default Alarmlar;
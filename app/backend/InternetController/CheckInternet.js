import React, { Component } from 'react';
import { View, Text, Modal } from 'react-native';
import { Icon } from 'native-base';
import NetInfo from '@react-native-community/netinfo';

class CheckInternet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        };
        NetInfo.isConnected.addEventListener('connectionChange', (res) => {
            if (res == false) {
                this.setState({ modalVisible: true })
            } else {
                this.setState({ modalVisible: false })
            }
        })

        NetInfo.isConnected.fetch().then((isConnected) => {
            if (isConnected == false) {
                this.setState({ modalVisible: true })
            } else {
                this.setState({ modalVisible: false })
            }
        });
    }

    render() {
        return (

            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
            >

                <View style={{ width: '100%', height: 60, backgroundColor: 'rgba(198,40,40,0.5)', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center',paddingTop:2}}><Icon type="FontAwesome" name="exclamation-circle" style={{ fontSize: 20, color: "white" }} /></Text>
                    <Text style={{ textAlign: 'center', fontSize: 14, color: "white", fontFamily: 'Poppins-Light'}}>İnternet Bağlantınız Bulunamadı</Text>
                    <Text style={{ textAlign: 'center', fontSize: 10, color: "white", fontFamily: 'Poppins-Light' }}>Lütfen bağlantınızı kontrol ediniz.</Text>
                </View>

            </Modal>
        );
    }
}

export default CheckInternet;

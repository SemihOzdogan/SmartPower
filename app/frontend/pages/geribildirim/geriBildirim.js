import React, { Component } from 'react';
import { BackHandler, TextInput, TouchableOpacity } from 'react-native';
import { Container, Content, Icon, Text, View, Button, Spinner } from 'native-base';
import general_styles from '../../components/general_styles/general_styles';
import { PostFeedBack } from '../../../backend/FeedBackController/PostFeedBack';
import CheckInternet from '../../../backend/InternetController/CheckInternet'

const { pageContent } = general_styles;

class GeriBildirimScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            butonSpinner: false
        }
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
                <Content style={pageContent}>
                    <View>
                        <View style={{ backgroundColor: "white", borderBottomWidth: 1, borderColor: "#00AEEF", padding: 15, flex: 1 }}>
                            <Text>Uygulamamızı daha iyi geliştirebilmemiz için bize geri bildirim sağlayın.</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={{ width: "100%", height: "100%", backgroundColor: "white", padding: 20 }}
                                autoCompleteType="off"
                                placeholder="Buraya Yazınız..."
                                placeholderTextColor="#aaa"
                                onChangeText={(value) => this.setState({ msg: value })}
                                value={this.state.msg}
                            />
                        </View>

                        {this.state.butonSpinner &&
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                <TouchableOpacity onPress={() => PostFeedBack(this)} style={{ backgroundColor: "#00AEEF", borderRadius: 6, height: 40, width: 200, justifyContent: 'center' }}>
                                    <Spinner color='#fff' style={{ width: "100%" }} />
                                </TouchableOpacity>
                            </View>
                        }

                        {!this.state.butonSpinner &&
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                <TouchableOpacity onPress={() => PostFeedBack(this)} style={{ backgroundColor: "#00AEEF", borderRadius: 6, height: 40, width: 200, justifyContent: 'center' }}>
                                    <Text style={{ color: "#fff", textAlign: 'center' }}><Icon name="send" style={{ fontSize: 20, color: 'white' }} /> GÖNDER</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </Content>
            </Container>
        );
    }
}

export default GeriBildirimScreen;
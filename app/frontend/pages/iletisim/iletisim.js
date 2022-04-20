import React, { Component } from 'react';
import { TouchableOpacity, Linking, BackHandler, StyleSheet, StatusBar } from 'react-native';
import { Container, Content, Icon, Text, View, Grid, Row, Col } from 'native-base';
import general_styles from '../../components/general_styles/general_styles';
import CheckInternet from '../../../backend/InternetController/CheckInternet';

const { pageContent } = general_styles;

class IletisimScreen extends Component {
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

    dialCall = () => {
        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${05496505053}';
        }
        else {
            phoneNumber = 'telprompt:${05496505053}';
        }

        Linking.openURL(phoneNumber);
    };

    dialCall_1 = () => {
        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${05425576322}';
        }
        else {
            phoneNumber = 'telprompt:${05425576322}';
        }

        Linking.openURL(phoneNumber);
    };

    dialCall_2 = () => {
        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${02124388024}';
        }
        else {
            phoneNumber = 'telprompt:${02124388024}';
        }

        Linking.openURL(phoneNumber);
    };

    render() {
       
        return (
            <Container>
                <CheckInternet />
                <Content style={pageContent}>

                    <View style={{ flex: 1, paddingBottom: 40 }}>
                        <Grid>
                            <Row style={{ marginBottom: 10, backgroundColor: "white", padding: 15, borderBottomWidth: 1, borderColor: "#29a566" }}>
                                <Col>
                                    <Text style={{ fontWeight: "bold", fontSize: 21, textAlign: "center" }}>Grup Arge {"\n"} Enerji ve Kontrol Sistemleri</Text>
                                </Col>
                            </Row>
                            <Row style={{ backgroundColor: "white", padding: 15, borderBottomWidth: 1, borderColor: "#29a566" }}>
                                <Col style={{ width: 110 }}>
                                    <Text style={{ fontWeight: "bold" }}>
                                        <Icon type="FontAwesome" name="home" style={{ color: "#666", fontSize: 18, width: 50 }} /> Merkez:
                                    </Text>
                                </Col>
                                <Col>
                                    <TouchableOpacity onPress={() => Linking.openURL('https://www.google.com/maps/place/Grup+Arge+Enerji+ve+Kontrol+Sistemleri/@41.0693361,28.8073513,17z/data=!3m1!4b1!4m5!3m4!1s0x14cab00f817339a9:0xcda333349c6278b8!8m2!3d41.0693321!4d28.80954')}>
                                        <Text>İkitelli OSB Mah. Yıldız Teknopark İkitelli Yerleşkesi
                                    No: 2B01 - 2B07 - 2B08 - 2B09 - 123 {"\n"}
                                            <Text style={{ fontWeight: "bold" }}>Başakşehir/istanbul</Text>
                                        </Text>
                                    </TouchableOpacity>
                                </Col>
                            </Row>

                            <Row style={{ marginTop: 10, padding: 15, backgroundColor: 'white', borderBottomWidth: 1, borderColor: "#29a566", flexDirection: 'column' }}>

                                <Col>
                                    <Text style={{ fontWeight: "bold" }}><Icon type="FontAwesome5" name="headset" style={{ color: "#666", fontSize: 18, width: 50 }} /> Enerji Takibi Destek:</Text>
                                </Col>

                                <Col style={{ flex: 1, flexDirection: 'column', marginTop: 5 }}>

                                    <TouchableOpacity onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=+905496505053')} activeOpacity={0.7} >

                                        <Col style={styles.telContent}>

                                            <Text style={{ fontWeight: "300", fontSize: 14 }}>
                                                <Icon type="FontAwesome5" name="whatsapp" style={{ color: "#00E676", fontSize: 18, width: 50 }}>
                                                </Icon> +90 549 650 50 53
                                                </Text>
                                        </Col>

                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this.dialCall} activeOpacity={0.7} style={{}}>

                                        <Col style={styles.telContent}>

                                            <Text style={{ fontWeight: "300", fontSize: 14 }}>
                                                <Icon type="FontAwesome5" name="mobile-alt" style={{ color: "#666", fontSize: 16, width: 50 }}>
                                                </Icon>  +90 549 650 50 53
                                                </Text>
                                        </Col>

                                    </TouchableOpacity>

                                </Col>
                            </Row>

                            <Row style={{ marginTop: 10, padding: 15, backgroundColor: 'white', borderBottomWidth: 1, borderColor: "#29a566", flexDirection: 'column' }}>

                                <Col>
                                    <Text style={{ fontWeight: "bold" }}><Icon type="FontAwesome5" name="headset" style={{ color: "#666", fontSize: 18, width: 50 }} /> Röle / Analizör Destek:</Text>
                                </Col>

                                <Col style={{ flex: 1, flexDirection: 'column', marginTop: 5 }}>

                                    <TouchableOpacity onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=+905425576322')} activeOpacity={0.7}  >

                                        <Col style={styles.telContent}>

                                            <Text style={{ fontWeight: "300", fontSize: 14 }}>
                                                <Icon type="FontAwesome5" name="whatsapp" style={{ color: "#00E676", fontSize: 18, width: 50 }}>
                                                </Icon> +90 542 557 63 22
                                            </Text>
                                        </Col>

                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this.dialCall_1} activeOpacity={0.7} style={{}}>

                                        <Col style={styles.telContent}>

                                            <Text style={{ fontWeight: "300", fontSize: 14 }}>
                                                <Icon type="FontAwesome5" name="mobile-alt" style={{ color: "black", fontSize: 16, width: 50 }}>
                                                </Icon>  +90 542 557 63 22
                                          </Text>
                                        </Col>

                                    </TouchableOpacity>

                                </Col>
                            </Row>

                            <Row style={{ marginTop: 10, backgroundColor: "white", padding: 15, borderBottomWidth: 1, borderColor: "#29a566" }}>


                                <Col style={{ width: 110 }}>
                                    <Text style={{ fontWeight: "bold" }}><Icon type="FontAwesome" name="phone" style={{ color: "#666", fontSize: 18, width: 50 }} /> Tel:</Text>
                                </Col>
                                <Col>
                                    <TouchableOpacity onPress={this.dialCall_2} activeOpacity={0.7} >
                                        <Text style={{ fontWeight: "300" }}>+90 212 438 80 24 (PBX)</Text>
                                    </TouchableOpacity>
                                </Col>
                            </Row>

                            <Row style={{ marginTop: 10, backgroundColor: "white", padding: 15, borderBottomWidth: 1, borderColor: "#29a566" }}>
                                <Col style={{ width: 110 }}><Text style={{ fontWeight: "bold" }}><Icon type="FontAwesome" name="fax" style={{ color: "#666", fontSize: 18, width: 50 }} /> Fax:</Text></Col>
                                <Col><Text style={{ fontWeight: "300" }}>+90 212 438 80 25</Text></Col>
                            </Row>


                            <Row style={{ marginTop: 10, backgroundColor: "white", padding: 15, borderBottomWidth: 1, borderColor: "#29a566" }} >
                                <Col style={{ width: 110 }}><Text style={{ fontWeight: "bold" }}><Icon type="FontAwesome" name="envelope" style={{ color: "#666", fontSize: 18, width: 50 }} /> E-Posta:</Text></Col>
                                <Col onPress={() => Linking.openURL('mailto:info@gruparge.com')}><Text>info@gruparge.com</Text></Col>
                            </Row>


                            <Row style={{ marginTop: 10, backgroundColor: "white", padding: 15, borderBottomWidth: 1, borderColor: "#29a566" }}>
                                <Col style={{ width: 110 }}><Text style={{ fontWeight: "bold" }}><Icon type="FontAwesome" name="globe" style={{ color: "#666", fontSize: 18, width: 50 }} /> Web Adresi:</Text></Col>
                                <Col>
                                    <TouchableOpacity onPress={() => Linking.openURL('http://gruparge.com/')} activeOpacity={0.7} >
                                        <Text>www.gruparge.com</Text>
                                    </TouchableOpacity>
                                </Col>
                            </Row>
                        </Grid>
                    </View>


                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    telContent: {
        height: 30,
        justifyContent: 'center',
        borderWidth: 0.6,
        borderColor: 'black',
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#DEE0E0',
    }
});

export default IletisimScreen;
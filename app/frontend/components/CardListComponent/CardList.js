import React from "react";
import { TouchableOpacity, Text, View, } from "react-native";
import { Col, Grid, Row, Icon } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
var role, pay, auth, getData;
(async () => {
    await AsyncStorage.getItem('RoleStatus').then((keyValue) => {
        role = keyValue
    }, (error) => {
    });
})()

export const statusChange = async (props) => {
    if (role == "admin") {
        if (props.payStatus == "close") {
            pay = false
            auth = true
            getData = true
        } else {
            pay = false
            auth = true
            getData = true
        }
    } else {
        if (props.payStatus != "close") {
            pay = false
            auth = true
            getData = true
        } else {
            pay = true
            auth = false
            getData = false
        }
    }
}

export default CardList = (props) => {
    statusChange(props)
    return (
        <View style={{ backgroundColor: 'white', marginRight: 10, marginLeft: 10, marginBottom: 5, marginTop: 5, borderRadius: 6, }}>
            <Grid>
                <Col>
                    <Row>
                        <View style={{ position: 'absolute', left: 2, top: 2, backgroundColor: "#80d8ff", width: 20, height: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 20 / 2 }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>{props.id}</Text>
                        </View>
                        <Col style={{ padding: 10 }}>
                            <Row style={{ marginTop: 10, padding: 2, left: 5, }}>
                                <Col style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                    <Icon type="FontAwesome5" name="map-marker-alt" style={{ color: '#DA7C62', fontSize: 20 }} />
                                    <Text style={{ fontSize: 14, color: "#666", fontFamily: 'Poppins-Regular', textAlign: "center", fontWeight: '500' }} numberOfLines={1}> {props.location}</Text>
                                </Col>
                            </Row>
                            <Row style={{ borderTopColor: '#ddd', borderTopWidth: 1, }}>
                                <Col style={{ borderRightColor: '#ddd', borderRightWidth: 1, marginTop: 5, }}>
                                    <Text style={{ fontSize: 12, textAlign: "center", fontFamily: 'Poppins-Light' }}>Modem No</Text>
                                    <Row style={{ justifyContent: 'center' }}><Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', color: "#ccc", fontWeight: '500' }}>{props.modemID}</Text></Row>
                                </Col>
                                <Col style={{ marginTop: 5 }}>
                                    <Text style={{ fontSize: 12, textAlign: "center", fontFamily: 'Poppins-Light' }}>{props.DeviceName} No</Text>
                                    <Row style={{ justifyContent: 'center' }}><Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', color: "#ccc", fontWeight: '500' }}>{props.deviceID}</Text></Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {
                        getData == true && props.InduktifKapasitif == true &&

                        <Row style={{ marginVertical: 5, marginHorizontal: 10, borderWidth: 0.5, borderColor: '#ddd', borderTopRightRadius: 6, borderTopLeftRadius: 6, justifyContent: 'center', }}>
                            <Col style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: props.induktifBgColor, borderTopLeftRadius: 6, }}>
                                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', color: props.induktifTextColor, }}>Endüktif Oran <Text style={{ fontSize: 13, color: props.induktifTextColor, fontFamily: 'Poppins-Light', }}>% {props.Induktif.toFixed(1)}</Text> </Text>
                            </Col>
                            <Col style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: props.kapasitifBgcolor, borderLeftColor: 'white', borderLeftWidth: 1, borderTopRightRadius: 6, }} >
                                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', color: props.kapasitifTextColor, }}>Kapasitif Oran <Text style={{ fontSize: 13, color: props.kapasitifTextColor, fontFamily: 'Poppins-Light', }}>% {props.Kapasitif.toFixed(1)}</Text> </Text>
                            </Col>
                        </Row>
                    }

                    {
                        getData == true && props.report == true &&
                        <Row style={{ marginVertical: 5, marginHorizontal: 10, borderWidth: 0.5, borderColor: '#ddd', borderBottomRightRadius: 6, borderBottomLeftRadius: 6, justifyContent: 'center', }}>
                            <Col style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ flex: 1, fontSize: 11, fontFamily: 'Poppins-Light', marginTop: 3 }}>Son Veri Zamanı <Text style={{ fontSize: 13, color: "#999", fontFamily: 'Poppins-Light' }}>{props.lastDataTime}</Text> </Text>
                            </Col>
                            <Col style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={{ width: 100, height: 16, backgroundColor: '#80d8ff', borderRadius: 6, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={props.onPressReport}
                                >
                                    <Text style={{ fontSize: 13, color: "#222", fontFamily: 'Poppins-Light' }}>Rapor</Text>
                                </TouchableOpacity>
                            </Col>
                        </Row>
                    }


                    {
                        getData == true && props.Sıcaklık == true &&
                        <Row style={{ marginVertical: 5, marginHorizontal: 10, borderWidth: 0.5, borderColor: '#ddd', borderBottomRightRadius: 6, borderBottomLeftRadius: 6, justifyContent: 'center', }}>
                            <Col style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ flex: 1, fontSize: 11, fontFamily: 'Poppins-Light', marginTop: 3 }}>Son Veri Zamanı <Text style={{ fontSize: 13, color: "#999", fontFamily: 'Poppins-Light' }}>{props.lastDataTime}</Text> </Text>
                            </Col>
                            <Col style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 6, }}>
                                <Text style={{ flex: 1, fontSize: 11, fontFamily: 'Poppins-Light', marginTop: 3 }}>Veri <Text style={{ fontSize: 13, color: "#999", fontFamily: 'Poppins-Light' }}>{props.data} °C</Text> </Text>
                            </Col>
                        </Row>
                    }

                    <Row style={{ backgroundColor: '#ddd', borderBottomLeftRadius: 6, borderBottomRightRadius: 6, padding: 3 }}>
                        <Col style={{ alignItems: 'flex-start', marginLeft: 5 }}>
                            {
                                pay == true &&
                                < View style={{ flexDirection: 'row' }}>
                                    <Icon type="FontAwesome5" name="exclamation-circle" style={{ fontSize: 14, color: 'red', }} />
                                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light', textAlign: 'center' }}> Ödemesi yapılmamış cihaz</Text>
                                </View>
                            }
                            {
                                auth == true &&
                                < View style={{ flex: 1, }}>
                                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={props.onPressDeviceAuthOrSettings}>
                                        <Icon type="FontAwesome5" name={props.routeIcon} style={{ fontSize: 18, color: '#80d8ff' }} />
                                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-Light' }}> {props.routeTitle}</Text>
                                    </TouchableOpacity>
                                </View>
                            }

                        </Col>
                    </Row>
                </Col>
            </Grid>
        </View >
    )
}

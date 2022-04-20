import * as React from 'react';
import { TouchableOpacity, SafeAreaView, ScrollView, Image, Platform, StatusBar, BackHandler, Alert, } from 'react-native';
import { Icon, Text, View, Grid, Row, Col, Toast, Root, Spinner, Button } from 'native-base';
import CheckInternet from '../../../backend/InternetController/CheckInternet';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../../../backend/serverSettingsController/getServerSettings';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {

    const [Loading, setLoading] = React.useState(false)
    var TopTop = Platform.OS === 'ios' ? 15 : 40;
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                Alert.alert(
                    "Uygulamadan çıkış yapılsın mı ?",
                    "Çıkış için izin bekleniyor ...",
                    [
                        {
                            text: "İptal",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "Çıkış Yap", onPress: () => BackHandler.exitApp() }
                    ],
                    { cancelable: false }
                );
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );
    React.useEffect(() => {
        this.getData()
        setLoading(false)
        return () => {

        }
    }, [])

    getData = async () => {
        const url = await GetServerSettings().then((keyValue) => { return keyValue; });
        let token = await AsyncStorage.getItem('access_token');
        let player_ID = await AsyncStorage.getItem('playerID');
        var status = 1
        var URL = url + '/notificationSettings' + '?status=' + status + '&player_id=' + player_ID
        return fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setLoading(true)
                var tokenStatus = responseJson.Message.Code
                if (token != "") {
                    AsyncStorage.setItem('notificationStatus', status.toString())
                    if (tokenStatus == "401") {
                        var value = 0
                        AsyncStorage.removeItem('access_token');
                        AsyncStorage.setItem('isLogin', value.toString());
                        Alert.alert(
                            'Oturumunuz Sonlandırıldı',
                            'Lütfen tekrar giriş yapınız',
                            [
                                { text: 'Tamam', onPress: () => console.log("error") },
                            ],
                        );
                        navigation.navigate('Login');
                    }
                }
                else if (token == "") {
                    var value = 0

                    AsyncStorage.removeItem('access_token');
                    AsyncStorage.setItem('isLogin', value.toString());
                    Alert.alert(
                        'Oturumunuz Sonlandırıldı',
                        'Lütfen tekrar giriş yapınız',
                        [
                            { text: 'Tamam', onPress: () => console.log("error") },
                        ],
                    );
                    navigation.navigate('Login');
                }
                else {
                    console.log('okey')
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return Loading ? (
        <Root>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#f5f5f5" }}>
                    <CheckInternet />
                    <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} colors={['#2E8AAC', '#94AE50']} style={{ flex: 1, width: '100%', height: 250 }}>
                        <View style={{ width: "100%", height: 320 }}>
                            <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', position: "absolute", right: 10, top: TopTop, }}>
                                <TouchableOpacity
                                    style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#bdbdbd', borderRadius: 6, }}
                                    onPress={() => navigation.toggleDrawer()}>
                                    <Icon name="menu" style={{ color: "#e0e0e0", fontSize: 50 }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../images/logo.png')} style={{ width: 80, height: 80 }} />
                                <Image source={require('../../images/logo_text2.png')} style={{ width: 170, height: 40 }} />
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={{ flex: 1, paddingBottom: 50, }}>
                        <Grid style={{ paddingHorizontal: 35, marginTop: -40, }}>
                            <Row style={{ height: 150, }}>
                                <Col style={{
                                    borderRadius: 6,
                                    backgroundColor: "#fff",
                                    height: 150,
                                    marginHorizontal: 5,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 5,
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 16.00,
                                    elevation: 24,
                                }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('BaglantiHatalari')} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ textAlign: "center", color: "white", padding: 15, fontSize: 22 }}>
                                            <Icon type="FontAwesome5" name="satellite-dish" style={{ color: "#F44336", fontSize: 35 }} />
                                        </Text>
                                        <Text style={{ fontSize: 15, textAlign: "center", fontFamily: 'Poppins-Light' }}>Bağlantı Hataları</Text>
                                    </TouchableOpacity>
                                </Col>
                                <Col style={{
                                    borderRadius: 6,
                                    backgroundColor: "#fff",
                                    height: 150,
                                    marginHorizontal: 5,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 5,
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 16.00,
                                    elevation: 24,
                                }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Alarms')} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ textAlign: "center", padding: 15, fontSize: 22 }}>
                                            <Icon type="FontAwesome" name="bell" style={{ color: "#FFEB3B", fontSize: 35 }} />
                                        </Text>
                                        <Text style={{ fontSize: 15, textAlign: "center", fontFamily: 'Poppins-Light' }}>Alarmlar</Text>
                                    </TouchableOpacity>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{
                                    marginTop: 10,
                                    borderRadius: 6,
                                    backgroundColor: "#fff",
                                    height: 150,
                                    margin: 5,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 5,
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 16.00,
                                    elevation: 24,
                                }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Devices')} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ textAlign: "center", color: "white", padding: 15, fontSize: 22 }}>
                                            <Icon type="FontAwesome" name="th" style={{ color: "#8BC34A", fontSize: 35 }} />
                                        </Text>
                                        <Text style={{ fontSize: 15, textAlign: "center", fontFamily: 'Poppins-Light' }}>Cihazlar</Text>
                                    </TouchableOpacity>
                                </Col>
                                <Col style={{
                                    marginTop: 10,
                                    borderRadius: 6,
                                    backgroundColor: "#fff",
                                    height: 150,
                                    margin: 5,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 5,
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 16.00,
                                    elevation: 24,
                                }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Modems')} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ textAlign: "center", padding: 15, fontSize: 22 }}>
                                            <Icon type="FontAwesome" name="square" style={{ color: "#2196F3", fontSize: 35 }} />
                                        </Text>
                                        <Text style={{ fontSize: 15, textAlign: "center", fontFamily: 'Poppins-Light' }}>Modemler</Text>
                                    </TouchableOpacity>
                                </Col>
                            </Row>
                        </Grid>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Root>
    ) : (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                <CheckInternet />
                <Image
                    style={{ width: 60, height: 60 }}
                    source={require('../../images/load.gif')}
                />
            </View>
        )
}


export default HomeScreen;

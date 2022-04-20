import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Image, StyleSheet, } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'native-base';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from './app/backend/serverSettingsController/getServerSettings';

/* Pages */
import BeginScreen from './app/frontend/pages/begin/begin' /* Başlangıç */
import LoginScreen from './app/frontend/pages/login/login' /* Giriş Yap */
import OneSignalScreen from './app/frontend/pages/login/oneSignal';/*onesignal entegre */
import SignUpScreen from './app/frontend/pages/kaydol/kaydol'/*Üye Ol */;
import HomeScreen from './app/frontend/pages/home/home' /* Anasayfa */
import IndtroductionScreen from './app/frontend/pages/tanitim/tanitim'; /*Tanıtım */
import ModemsScreen from './app/frontend/pages/modem/modem';/*Modemler */
import DevicesScreen from './app/frontend/pages/cihazlar/cihazlar';/*Cihazlar */
import AlarmsScreen from './app/frontend/pages/alarmlar/alarmlar';/*Alarmlar */
import ModemBaglantıHatalarıScreen from './app/frontend/pages/baglantiHatalari/modemList';/*Modem Bağlantı Hataları*/
import CihazBaglantıHatalarıScreen from './app/frontend/pages/baglantiHatalari/cihazList';/*Cihaz Bağlantı Hataları */
import ProfilScreen from './app/frontend/pages/ayarlar/kullanıcıAyarı';/*Profil Ayarları */
import SecuritySettingsScreen from './app/frontend/pages/ayarlar/guvenlikAyarı';/*Şifre Güncelleme */
import NotificationsSettingsScreen from './app/frontend/pages/ayarlar/bildirimAyarı';/*Bildirim Ayarları */
import ApplicationAboutScreen from './app/frontend/pages/ayarlar/uygulamaHakkında';/*Uygulama Hakkında Bilgiler */
import ContactScreen from './app/frontend/pages/iletisim/iletisim'; /*İletişim */
import FeedBackScreen from './app/frontend/pages/geribildirim/geriBildirim'; /*Geri Bildirim */
import FilterScreen from './app/frontend/components/filters/filter'; /*Filtre */
import PasswordCodingScreen from './app/frontend/pages/kaydol/sifreBelirle';/*Şifre Belirleme */
import ForgotPasswordScreen from './app/frontend/pages/sifremiUnuttum/sifreSıfırla';/*Şifre Sıfırlama */
import AccountVerificationScreen from './app/frontend/pages/kaydol/hesapDogrulama';/*Hesap Doğrulama */
import ReaktifRaporScreen from './app/frontend/pages/rapor/reaktifRapor';/*Reaktif Rapor */
import TuketimRaporScreen from './app/frontend/pages/rapor/tuketimRapor';/*Tüketim Rapor */
import AkımGerilimRaporScreen from './app/frontend/pages/rapor/akımGerilimRapor';/*Akım-Gerilim Rapor */
import ModemSettingsScreen from './app/frontend/pages/modem/ModemSettings/modemSettings';/*Modem Ayarları*/
import ModemDevicesScreen from './app/frontend/pages/modem/ModemSettings/modemDevices';/*Modeme Bağlı Cihazlar*/
import ModBusSettingsScreen from './app/frontend/pages/modem/ModemSettings/modemModBus';/*ModBus Adresleri Listeleme ve Güncelleme */
import ModemAuthorizationScreen from './app/frontend/pages/modem/ModemSettings/modemAuthorizations/modemAuth';/*Modeme Yetkisi Olanlar */
import ModemNoAuthorizationScreen from './app/frontend/pages/modem/ModemSettings/modemAuthorizations/modemNoAuth';/*Modeme Yetkisi Olmayanlar */
import DevicesAuthScreen from './app/frontend/pages/cihazlar/cihazAuthorization/cihazAuth';/*Yetkili Cihaz Kullanıcılar */
import DevicesNoAuthScreen from './app/frontend/pages/cihazlar/cihazAuthorization/cihazNoAuth';/*Yetkisiz Cihaz Kullanıcılar */
import MeterSettingsScreen from './app/frontend/pages/cihazlar/sayac/sayacSettings';/*Sayaç Ayarları */
import RelaySettingsScreen from './app/frontend/pages/cihazlar/role/roleSettings';/*Röle Ayarları */
import AnalizorSettingsScreen from './app/frontend/pages/cihazlar/analizor/analizorSettings';/*Analizor Ayarları */
import TemperatureSettingsScreen from './app/frontend/pages/cihazlar/sıcaklıkSensor/sıcaklıkSensorSettings';/*Sıcaklık Sensör Ayarları */
import EmailAndMobileAlarmDefinitionScreen from './app/frontend/pages/alarmDefinitions/EmailAndMobileAlarms';/*Email ve Mobil Bildirim Alarm Tanımları*/
import SmsAlarmDefinitionScreen from './app/frontend/pages/alarmDefinitions/SmsAlarms';/*Sms ile Bildirim Alarm Tanımları */
import AlarmDefinitionChangeScreen from './app/frontend/pages/alarmDefinitions/AlarmChange';/*Alarm Tanımları Değiştirme(Güncelleme) */
import InputScreen from './app/frontend/pages/cihazlar/InputOutput/IOSettings/Input';/*IO Giriş Ayarları */
import OutputScreen from './app/frontend/pages/cihazlar/InputOutput/IOSettings/Output';/*IO Çıkış Listeleleme */
import OutputChangeScreen from './app/frontend/pages/cihazlar/InputOutput/IOSettings/OutputChange';/*IO Çıkış Ayarları */
import OutputRuleScreen from './app/frontend/pages/cihazlar/InputOutput/IOSettings/OutputRules';/*IO Çıkış Kuralları Düzenleme */

/* Close yellow alert errors */
console.disableYellowBox = true;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

var user;

export const Begin = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen
                name="Begin" component={BeginScreen} />
        </Stack.Navigator>
    );
}
export const SignUp = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.navigate('Login')}>
                        <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerTitleStyle: {
                    fontWeight: '400',
                    fontFamily: 'Poppins-Light',
                },
            }}
                name="Üye ol" component={SignUpScreen} />
        </Stack.Navigator>
    );
}
export const Login = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen
                name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
}
export const OneSignal = (route, navigation) => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen
                name="OneSignal">
                {({ navigation }) => <OneSignalScreen
                    navigation={navigation}
                />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
export const Home = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen
                name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
}
export const Modems = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                        <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerTitleStyle: {
                    fontWeight: '400',
                    fontFamily: 'Poppins-Light',
                },
            }}
                name="Modemler" component={ModemsScreen} />
        </Stack.Navigator>
    );
}
export const Devices = ({ route, navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerLeft: () => (
                        <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                            <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                            <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontFamily: 'Poppins-Light',
                    },
                }}
                name="Cihazlar" component={DevicesScreen} />
        </Stack.Navigator>
    );
}
export const Alarms = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                        <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerTitleStyle: {
                    fontWeight: '400',
                    fontFamily: 'Poppins-Light',
                },
            }}
                name="Alarmlar" component={AlarmsScreen} />
        </Stack.Navigator>
    );
}
export const BaglantıHatalarıTab = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: { fontSize: 13 },
                tabStyle: { flexDirection: 'row', width: 200, },
                scrollEnabled: true,
                activeTintColor: '#62B1F6',
                inactiveTintColor: 'gray',
                indicatorStyle: { backgroundColor: '#62B1F6' },
                showIcon: true,
            }}
        >
            <Tab.Screen name="Modemler"
                options={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === 'Modemler') {
                            colorName = focused
                                ? "#62B1F6"
                                : "gray";
                        } else {
                            colorName = focused
                                ? "#62B1F6"
                                : "gray";
                        }
                        return <Icon type="FontAwesome" name="square" style={{ color: colorName, fontSize: 20 }} />
                    },
                })}
            >
                {({ navigation }) => <ModemBaglantıHatalarıScreen navigation={navigation} />}
            </Tab.Screen>
            <Tab.Screen name="Cİhazlar"
                options={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === 'Cİhazlar') {
                            colorName = focused
                                ? "#62B1F6"
                                : "gray";
                        } else {
                            colorName = focused
                                ? "#62B1F6"
                                : "gray";
                        }
                        return <Icon type="FontAwesome5" name="th" style={{ color: colorName, fontSize: 20 }} />
                    },
                })}
            >
                {({ navigation }) => <CihazBaglantıHatalarıScreen navigation={navigation} />}
            </Tab.Screen>

        </Tab.Navigator >
    )
}
export const BaglantıHatalarıStack = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Bağlantı Hataları"
                options={{
                    headerLeft: () => (
                        <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                            <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                            <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontFamily: 'Poppins-Light',
                    },
                }}
            >
                {() => <BaglantıHatalarıTab navigation={navigation} />}

            </Stack.Screen>
        </Stack.Navigator>
    )
}
export const Profil = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                        <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerTitleStyle: {
                    fontWeight: '400',
                    fontFamily: 'Poppins-Light',
                },
                headerTransparent: true
            }}
                name="Profil" component={ProfilScreen} />
        </Stack.Navigator>
    );
}
export const Security = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                        <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerTitleStyle: {
                    fontWeight: '400',
                    fontFamily: 'Poppins-Light',
                },
            }}
                name="Güvenlik" component={SecuritySettingsScreen} />
        </Stack.Navigator>
    );
}
export const About = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                        <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerTitleStyle: {
                    fontWeight: '400',
                    fontFamily: 'Poppins-Light',
                },
            }}
                name="Hakkında" component={ApplicationAboutScreen} />
        </Stack.Navigator>
    );
}
export const Notifications = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                        <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerTitleStyle: {
                    fontWeight: '400',
                    fontFamily: 'Poppins-Light',
                },
            }}
                name="Bildirim" component={NotificationsSettingsScreen} />
        </Stack.Navigator>
    );
}
export const Contact = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                        <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerTitleStyle: {
                    fontWeight: '400',
                    fontFamily: 'Poppins-Light',
                },
            }}
                name="İletişim" component={ContactScreen} />
        </Stack.Navigator>
    );
}
export const FeedBack = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                        <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerTitleStyle: {
                    fontWeight: '400',
                    fontFamily: 'Poppins-Light',
                },
            }}
                name="Geri Bildirim" component={FeedBackScreen} />
        </Stack.Navigator>
    );
}
export const PasswordCoding = ({ route, navigation }) => {
    var { verifyCode, verifyEmail } = route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerTitleStyle: {
                    fontWeight: '400',
                    fontFamily: 'Poppins-Light',
                },
            }}
                name="Şifre Belirle">
                {({ navigation }) => <PasswordCodingScreen
                    navigation={navigation}
                    verifyCode={verifyCode}
                    verifyEmail={verifyEmail}
                />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
export const ForgotPassword = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerTitleStyle: {
                    fontWeight: '400',
                    fontFamily: 'Poppins-Light',
                },
            }}
                name="Şifre Sıfırla">
                {({ navigation }) => <ForgotPasswordScreen
                    navigation={navigation}
                />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
export const AccountVerification = ({ route, navigation }) => {
    var { verifyEmail } = route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerTitleStyle: {
                    fontWeight: '400',
                    fontFamily: 'Poppins-Light',
                },
            }}
                name="Hesap Doğrulama">
                {({ navigation }) => <AccountVerificationScreen
                    navigation={navigation}
                    verifyEmail={verifyEmail}
                />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
export const ModemSettingsStack = ({ route, navigation }) => {
    var { modemNo, url } = route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen name="Modem Ayarları"
                options={{
                    headerLeft: () => (
                        <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                            <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                            <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontFamily: 'Poppins-Light',
                    },
                }}
            >
                {() => <ModemSettingsTab modemNo={modemNo} url={url} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}
export const ModemSettingsTab = ({ modemNo, url }) => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: { fontSize: 13 },
                tabStyle: { flexDirection: 'row', width: 160, },
                scrollEnabled: true,
                activeTintColor: '#62B1F6',
                inactiveTintColor: 'gray',
                indicatorStyle: { backgroundColor: '#62B1F6' },
                showIcon: true,
            }}
        >
            <Tab.Screen name="Modem Ayarları"
            // options={({ route }) => ({
            //     tabBarIcon: ({ focused, color, size }) => {
            //         if (route.name === 'Modem Ayarları') {
            //             colorName = focused
            //                 ? "#62B1F6"
            //                 : "gray";
            //         } else {
            //             colorName = focused
            //                 ? "#62B1F6"
            //                 : "gray";
            //         }
            //         return <Icon type="FontAwesome5" name="cogs" style={{ color: colorName, fontSize: 20 }} />
            //     },
            // })}
            >
                {({ navigation }) => <ModemSettingsScreen navigation={navigation} modemNo={modemNo} />}
            </Tab.Screen>
            <Tab.Screen name="Bağlı Cİhazlar">
                {({ navigation }) => <ModemDevicesScreen navigation={navigation} modemNo={modemNo} />}
            </Tab.Screen>
            <Tab.Screen name="ModBus Adresİ">
                {({ navigation }) => <ModBusSettingsScreen navigation={navigation} modemNo={modemNo} />}
            </Tab.Screen>
            <Tab.Screen name="Modem Yetkİlİlerİ">
                {({ navigation }) => <ModemAuthBottomTab navigation={navigation} modemNo={modemNo} />}
            </Tab.Screen>
            <Tab.Screen name="Alarm Tanımları">
                {({ navigation }) => <AlarmDefinitionBottomTab navigation={navigation} productNo={modemNo} url={url} />}
            </Tab.Screen>
        </Tab.Navigator >
    )
}
export const MeterSettingsStack = ({ route, navigation }) => {
    var { meterNo, url } = route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen name="Sayaç Ayarları"
                options={{
                    headerLeft: () => (
                        <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                            <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                            <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontFamily: 'Poppins-Light',
                    },
                }}
            >
                {() => <MeterSettingsTab meterNo={meterNo} url={url} />}

            </Stack.Screen>
        </Stack.Navigator>
    )
}
export const MeterSettingsTab = ({ meterNo, url }) => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: { fontSize: 13 },
                tabStyle: { width: 230, },
                scrollEnabled: true,
                activeTintColor: '#62B1F6',
                inactiveTintColor: 'gray',
                indicatorStyle: { backgroundColor: '#62B1F6' },
            }}
        >
            <Tab.Screen name="Sayaç Ayarları">
                {({ navigation }) => <MeterSettingsScreen navigation={navigation} meterNo={meterNo} />}
            </Tab.Screen>
            <Tab.Screen name="Alarm Tanımları">
                {({ navigation }) => <AlarmDefinitionBottomTab navigation={navigation} productNo={meterNo} url={url} />}
            </Tab.Screen>
        </Tab.Navigator >
    )
}
export const RelaySettingsStack = ({ route, navigation }) => {
    var { relayNo, url } = route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen name="Röle Ayarları"
                options={{
                    headerLeft: () => (
                        <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                            <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                            <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontFamily: 'Poppins-Light',
                    },
                }}
            >
                {() => <RelaySettingsTab relayNo={relayNo} url={url} />}

            </Stack.Screen>
        </Stack.Navigator>
    )
}
export const RelaySettingsTab = ({ relayNo, url }) => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: { fontSize: 13 },
                tabStyle: { width: 230, },
                scrollEnabled: true,
                activeTintColor: '#62B1F6',
                inactiveTintColor: 'gray',
                indicatorStyle: { backgroundColor: '#62B1F6' },
            }}
        >
            <Tab.Screen name="Röle Ayarları">
                {({ navigation }) => <RelaySettingsScreen navigation={navigation} relayNo={relayNo} />}
            </Tab.Screen>
            <Tab.Screen name="Alarm Tanımları">
                {({ navigation }) => <AlarmDefinitionBottomTab navigation={navigation} productNo={relayNo} url={url} />}
            </Tab.Screen>
        </Tab.Navigator >
    )
}
export const AnalizorSettingsStack = ({ route, navigation }) => {
    var { analizorNo, url } = route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen name="Analizör Ayarları"
                options={{
                    headerLeft: () => (
                        <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                            <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                            <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontFamily: 'Poppins-Light',
                    },
                }}
            >
                {() => <AnalizorSettingsTab analizorNo={analizorNo} url={url} />}

            </Stack.Screen>
        </Stack.Navigator>
    )
}
export const AnalizorSettingsTab = ({ analizorNo, url }) => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: { fontSize: 13 },
                tabStyle: { width: 230, },
                scrollEnabled: true,
                activeTintColor: '#62B1F6',
                inactiveTintColor: 'gray',
                indicatorStyle: { backgroundColor: '#62B1F6' },
            }}
        >
            <Tab.Screen name="Analİzör Ayarları">
                {({ navigation }) => <AnalizorSettingsScreen navigation={navigation} analizorNo={analizorNo} />}
            </Tab.Screen>
            <Tab.Screen name="Alarm Tanımları">
                {({ navigation }) => <AlarmDefinitionBottomTab navigation={navigation} productNo={analizorNo} url={url} />}
            </Tab.Screen>
        </Tab.Navigator >
    )
}
export const SıcaklıkSensorSettingsStack = ({ route, navigation }) => {
    var { sıcaklıkSensorNo, url } = route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen name="Sıcaklık Sensör Ayarları"
                options={{
                    headerLeft: () => (
                        <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                            <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                            <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontFamily: 'Poppins-Light',
                    },
                }}
            >
                {() => <SıcaklıkSensorSettingsTab sıcaklıkSensorNo={sıcaklıkSensorNo} url={url} />}

            </Stack.Screen>
        </Stack.Navigator>
    )
}
export const SıcaklıkSensorSettingsTab = ({ sıcaklıkSensorNo, url }) => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: { fontSize: 13 },
                tabStyle: { width: 230, },
                scrollEnabled: true,
                activeTintColor: '#62B1F6',
                inactiveTintColor: 'gray',
                indicatorStyle: { backgroundColor: '#62B1F6' },
            }}
        >
            <Tab.Screen name="Sıcaklık Sensör Ayarları">
                {({ navigation }) => <TemperatureSettingsScreen navigation={navigation} sıcaklıkSensorNo={sıcaklıkSensorNo} />}
            </Tab.Screen>
            <Tab.Screen name="Alarm Tanımları">
                {({ navigation }) => <AlarmDefinitionBottomTab navigation={navigation} productNo={sıcaklıkSensorNo} url={url} />}
            </Tab.Screen>
        </Tab.Navigator >
    )
}
export const AnalogGirisSettingsStack = ({ route, navigation }) => {
    var { analogGirisNo, url } = route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen name="Alarm Tanımları"
                options={{
                    headerLeft: () => (
                        <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                            <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                            <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontFamily: 'Poppins-Light',
                    },
                }}
            >
                {() => <AlarmDefinitionBottomTab productNo={analogGirisNo} url={url} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}
export const InputOutputSettingsStack = ({ route, navigation }) => {
    var { inputOutputNo, url } = route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen name="Alarm Tanımları"
                options={{
                    headerLeft: () => (
                        <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                            <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                            <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontFamily: 'Poppins-Light',
                    },
                }}
            >
                {() => <AlarmDefinitionBottomTab productNo={inputOutputNo} url={url} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}
export const DeviceAuthStack = ({ route, navigation }) => {
    var { deviceNo, modemNo } = route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen name="Cihaz Yetkilileri"
                options={{
                    headerLeft: () => (
                        <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                            <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                            <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontFamily: 'Poppins-Light',
                    },
                }}
            >
                {() => <DeviceAuthBottomTab deviceNo={deviceNo} modemNo={modemNo} />}

            </Stack.Screen>
        </Stack.Navigator>
    )
}
export const DeviceAuthBottomTab = ({ deviceNo, modemNo }) => {
    return (
        <Tab.Navigator
            tabBarPosition="bottom" tabBarOptions={{
                showIcon: true,
                indicatorStyle: { backgroundColor: '#4db3a2' },
                style: { width: '100%', height: 70 },
                labelStyle: { fontSize: 14, textTransform: "none", },
                activeTintColor: '#4db3a2',
                inactiveTintColor: 'gray',
                // tabStyle:{borderRightColor:'#4db3a2', borderRightWidth:2,},
            }}>
            <Tab.Screen name="AuthorizedUser"

                options={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let colorName;
                        if (route.name === 'AuthorizedUser') {
                            iconName = "user-tag"
                            colorName = focused
                                ? "#4db3a2"
                                : "gray";
                        } else if (route.name === 'UnAuthorizedUser') {
                            iconName = "user-slash"
                            colorName = focused
                                ? "#4db3a2"
                                : "gray";
                        }

                        return <Icon type="FontAwesome5" name={iconName} style={{ color: colorName, fontSize: 20 }} />
                    },
                    title: "Yetkili Kullanıcılar",

                })}


            >
                {({ navigation }) => <DevicesAuthScreen navigation={navigation} deviceNo={deviceNo} modemNo={modemNo} />}
            </Tab.Screen>
            <Tab.Screen name="UnAuthorizedUser" options={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let colorName;
                    if (route.name === 'AuthorizedUser') {
                        iconName = "user-tag"
                        colorName = focused
                            ? "#4db3a2"
                            : "gray";
                    } else if (route.name === 'UnAuthorizedUser') {
                        iconName = "user-slash"
                        colorName = focused
                            ? "#4db3a2"
                            : "gray";
                    }

                    return <Icon type="FontAwesome5" name={iconName} style={{ color: colorName, fontSize: 20 }} />
                },
                title: "Yetkisiz Kullanıcılar",

            })}>
                {({ navigation }) => <DevicesNoAuthScreen navigation={navigation} deviceNo={deviceNo} modemNo={modemNo} />}
            </Tab.Screen>
        </Tab.Navigator >
    )
}
export const ModemAuthStack = ({ route, navigation }) => {
    var { deviceNo, modemNo } = route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen name="Modem Yetkilileri"
                options={{
                    headerLeft: () => (
                        <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                            <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                            <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontFamily: 'Poppins-Light',
                    },
                }}
            >
                {() => <ModemAuthBottomTab deviceNo={deviceNo} modemNo={modemNo} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}
export const ModemAuthBottomTab = ({ deviceNo, modemNo }) => {
    return (
        <Tab.Navigator
            tabBarPosition="bottom" tabBarOptions={{
                showIcon: true,
                indicatorStyle: { backgroundColor: '#4db3a2' },
                style: { width: '100%', height: 70 },
                labelStyle: { fontSize: 14, textTransform: "none", },
                activeTintColor: '#4db3a2',
                inactiveTintColor: 'gray',
                // tabStyle:{borderRightColor:'#4db3a2', borderRightWidth:2,},
            }}>
            <Tab.Screen name="AuthorizedUser"

                options={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let colorName;
                        if (route.name === 'AuthorizedUser') {
                            iconName = "user-tag"
                            colorName = focused
                                ? "#4db3a2"
                                : "gray";
                        } else if (route.name === 'UnAuthorizedUser') {
                            iconName = "user-slash"
                            colorName = focused
                                ? "#4db3a2"
                                : "gray";
                        }

                        return <Icon type="FontAwesome5" name={iconName} style={{ color: colorName, fontSize: 20 }} />
                    },
                    title: "Yetkili Kullanıcılar",
                })}

            >
                {({ navigation }) => <ModemAuthorizationScreen navigation={navigation} deviceNo={deviceNo} modemNo={modemNo} />}
            </Tab.Screen>
            <Tab.Screen name="UnAuthorizedUser" options={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let colorName;
                    if (route.name === 'AuthorizedUser') {
                        iconName = "user-tag"
                        colorName = focused
                            ? "#4db3a2"
                            : "gray";
                    } else if (route.name === 'UnAuthorizedUser') {
                        iconName = "user-slash"
                        colorName = focused
                            ? "#4db3a2"
                            : "gray";
                    }

                    return <Icon type="FontAwesome5" name={iconName} style={{ color: colorName, fontSize: 20 }} />
                },
                title: "Yetkisiz Kullanıcılar",

            })}>
                {({ navigation }) => <ModemNoAuthorizationScreen navigation={navigation} deviceNo={deviceNo} modemNo={modemNo} />}
            </Tab.Screen>
        </Tab.Navigator >
    )
}
export const ReaktifRapor = ({ route, navigation }) => {
    var { measuring_device_id, comm_device_id, measuring_location_name } = route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen name="Reaktif Rapor"
                options={{
                    headerLeft: () => (
                        <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                            <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                            <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontFamily: 'Poppins-Light',
                    },
                }}
            >
                {({ navigation }) => <ReaktifRaporScreen
                    navigation={navigation}
                    measuring_device_id={measuring_device_id}
                    measuring_location_name={measuring_location_name}
                    comm_device_id={comm_device_id}
                />}

            </Stack.Screen>
        </Stack.Navigator>
    )
}
export const TuketimRapor = ({ route, navigation }) => {
    var { measuring_device_id, comm_device_id, measuring_location_name } = route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen name="Tüketim Rapor"
                options={{
                    headerLeft: () => (
                        <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                            <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                            <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontFamily: 'Poppins-Light',
                    },
                }}
            >
                {({ navigation }) => <TuketimRaporScreen
                    navigation={navigation}
                    measuring_device_id={measuring_device_id}
                    measuring_location_name={measuring_location_name}
                    comm_device_id={comm_device_id}
                />}

            </Stack.Screen>
        </Stack.Navigator>
    )
}
export const AkımGerilimRapor = ({ route, navigation }) => {
    var { measuring_device_id, comm_device_id, measuring_location_name } = route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen name="Akım-Gerilim Rapor"
                options={{
                    headerLeft: () => (
                        <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                            <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                            <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontFamily: 'Poppins-Light',
                    },
                }}
            >
                {({ navigation }) => <AkımGerilimRaporScreen
                    navigation={navigation}
                    measuring_device_id={measuring_device_id}
                    measuring_location_name={measuring_location_name}
                    comm_device_id={comm_device_id}
                />}

            </Stack.Screen>
        </Stack.Navigator>
    )
}
export const Filter = ({ route, navigation }) => {
    const { redirectPage, alarmListObj, modemListObj, cihazListObj, sayacListObj, roleListObj, analizorListObj, sıcaklıkSensorListObj, analogGirisListObj, sayıcıListObj, IoListObj, activeTab } = route.params

    var pageTitle;
    if (redirectPage == "Alarms") {
        pageTitle = "Alarm Filtre"
    } else if (redirectPage == "Modems") {
        pageTitle = "Modem Filtre"
    }
    else if (redirectPage == "Devices" && activeTab == 0) {
        pageTitle = "Cihaz Filtre"
    }
    else if (redirectPage == "Devices" && activeTab == 1) {
        pageTitle = "Sayaç Filtre"
    }
    else if (redirectPage == "Devices" && activeTab == 2) {
        pageTitle = "Röle Filtre"
    }
    else if (redirectPage == "Devices" && activeTab == 3) {
        pageTitle = "Analizör Filtre"
    }
    else if (redirectPage == "Devices" && activeTab == 4) {
        pageTitle = "Sıcaklık Sensör Filtre"
    }
    else if (redirectPage == "Devices" && activeTab == 5) {
        pageTitle = "Analog Giriş Filtre"
    }
    else if (redirectPage == "Devices" && activeTab == 6) {
        pageTitle = "Sayıcı Filtre"
    }
    else if (redirectPage == "Devices" && activeTab == 7) {
        pageTitle = "IO Filtre"
    }

    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerTitleStyle: {
                    fontWeight: '400',
                    fontFamily: 'Poppins-Light',
                },
            }}
                name={pageTitle}>
                {({ navigation }) => <FilterScreen
                    navigation={navigation}
                    redirectPage={redirectPage}
                    alarmListObj={alarmListObj}
                    modemListObj={modemListObj}
                    cihazListObj={cihazListObj}
                    sayacListObj={sayacListObj}
                    roleListObj={roleListObj}
                    analizorListObj={analizorListObj}
                    sıcaklıkSensorListObj={sıcaklıkSensorListObj}
                    analogGirisListObj={analogGirisListObj}
                    sayıcıListObj={sayıcıListObj}
                    IoListObj={IoListObj}
                    activeTab={activeTab}
                />}

            </Stack.Screen>
        </Stack.Navigator>
    );
}
export const AlarmDefinitionBottomTab = ({ productNo, url }) => {
    return (
        <Tab.Navigator tabBarPosition="bottom" tabBarOptions={{
            showIcon: true,
            indicatorStyle: { backgroundColor: '#4db3a2' },
            style: { width: '100%', height: 70 },
            labelStyle: { fontSize: 14, textTransform: "none", },
            activeTintColor: '#4db3a2',
            inactiveTintColor: 'gray',
            // tabStyle:{borderRightColor:'#4db3a2', borderRightWidth:2,},
        }}>
            <Tab.Screen name="Email" options={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let colorName;
                    if (route.name === 'Email') {
                        iconName = "envelope"
                        colorName = focused
                            ? "#4db3a2"
                            : "gray";
                    } else if (route.name === 'SMS') {
                        iconName = "phone-square"
                        colorName = focused
                            ? "#4db3a2"
                            : "gray";
                    }

                    return <Icon type="FontAwesome5" name={iconName} style={{ color: colorName, fontSize: 20 }} />
                },
                title: "E-Posta ve Mobil",
                tabStyle: { borderRightWidth: 5, borderRightColor: '#4db3a2' }
            })}>

                {({ navigation }) => <EmailAndMobileAlarmDefinitionScreen navigation={navigation} productNo={productNo} url={url} />}
            </Tab.Screen>
            <Tab.Screen name="SMS" options={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let colorName;
                    if (route.name === 'Email') {
                        iconName = "envelope"
                        colorName = focused
                            ? "#4db3a2"
                            : "gray";
                    } else if (route.name === 'SMS') {
                        iconName = "phone-square"
                        colorName = focused
                            ? "#4db3a2"
                            : "gray";
                    }

                    return <Icon type="FontAwesome5" name={iconName} style={{ color: colorName, fontSize: 20 }} />
                },
                title: "SMS",

            })}>
                {({ navigation }) => <SmsAlarmDefinitionScreen navigation={navigation} productNo={productNo} url={url} />}
            </Tab.Screen>
        </Tab.Navigator >
    )
}
export const AlarmDefinitonChange = ({ navigation, route }) => {
    const { alarmData, alarmdeviceID } = route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen name="Alarm Tanımı" options={{
                headerLeft: () => (
                    <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                        <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerTitleStyle: {
                    fontWeight: '400',
                    fontFamily: 'Poppins-Light',
                },
            }}>
                {({ navigation }) => <AlarmDefinitionChangeScreen
                    navigation={navigation}
                    alarmData={alarmData}
                    alarmdeviceID={alarmdeviceID}
                />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
export const IOSettingsStack = ({ route, navigation }) => {
    var { inputOutputID, inputOutputType, inputOutputLocation } = route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen name="I/O Ayarları"
                options={{
                    headerLeft: () => (
                        <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                            <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                            <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontFamily: 'Poppins-Light',
                    },
                }}
            >
                {() => <IOSettingsTab inputOutputID={inputOutputID} inputOutputType={inputOutputType} inputOutputLocation={inputOutputLocation} />}

            </Stack.Screen>
        </Stack.Navigator>
    )
}
export const IOSettingsTab = ({ inputOutputID, inputOutputType, inputOutputLocation }) => {
    var giris = false;
    var cıkıs = false;
    if (inputOutputType == 1) {
        cıkıs = true,
            giris = false
    }
    else if (inputOutputType == 0) {
        giris = true,
            cıkıs = false
    }
    else if (inputOutputType == 3) {
        giris = true,
            cıkıs = true
    }
    else if (inputOutputType == 4) {
        giris = false,
            cıkıs = true
    }

    return (

        <Tab.Navigator tabBarPosition="bottom"
            tabBarOptions={{
                showIcon: true,
                indicatorStyle: { backgroundColor: 'white' },
                style: { width: '100%', },
                labelStyle: { fontSize: 14, textTransform: "none", },
                activeTintColor: '#62B1F6',
                inactiveTintColor: 'gray',
                // tabStyle:{borderRightColor:'#4db3a2', borderRightWidth:2,},
            }}
        >
            {
                giris == true &&
                < Tab.Screen name="GİRİŞ AYARLARI"
                    options={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            if (route.name === 'Gİrİş Ayarları') {
                                colorName = focused
                                    ? "#62B1F6"
                                    : "gray";
                            } else {
                                colorName = focused
                                    ? "#62B1F6"
                                    : "gray";
                            }
                            return <Icon type="FontAwesome" name="download" style={{ color: colorName, fontSize: 25 }} />
                        },
                    })}
                >
                    {({ navigation }) => <InputScreen navigation={navigation} inputOutputLocation={inputOutputLocation} inputOutputID={inputOutputID} inputOutputType={inputOutputType} />}
                </Tab.Screen>
            }


            {
                cıkıs == true &&
                < Tab.Screen name="ÇIKIŞ AYARLARI"
                    options={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            if (route.name === 'Çıkış Ayarları') {
                                colorName = focused
                                    ? "#62B1F6"
                                    : "gray";
                            } else {
                                colorName = focused
                                    ? "#62B1F6"
                                    : "gray";
                            }
                            return <Icon type="FontAwesome5" name="upload" style={{ color: colorName, fontSize: 23 }} />
                        },

                    })}
                >
                    {({ navigation }) => <OutputScreen navigation={navigation} inputOutputLocation={inputOutputLocation} inputOutputID={inputOutputID} inputOutputType={inputOutputType} />}
                </Tab.Screen>
            }



        </Tab.Navigator >
    )
}
export const IoOutputChange = ({ navigation, route }) => {
    var { OutputData, OutputDevices, OutputAllData, Module_ID, Module_TYPE, OutputLocation } = route.params;

    return (
        <Stack.Navigator>
            <Stack.Screen name="I/O Düzenle" options={{
                headerLeft: () => (
                    <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                        <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                    </TouchableOpacity>
                ),
                headerTitleStyle: {
                    fontWeight: '400',
                    fontFamily: 'Poppins-Light',
                },
            }}>
                {({ navigation }) => <OutputChangeScreen OutputData={OutputData} OutputLocation={OutputLocation} OutputDevices={OutputDevices} OutputAllData={OutputAllData} Module_ID={Module_ID} Module_TYPE={Module_TYPE} navigation={navigation} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
export const IoOutputRules = ({ route, navigation }) => {
    var { module_ID, module_TYPE, module_CHANNEL, node_ID, module_API, module_LOCATION } = route.params;

    return (
        <Stack.Navigator>
            <Stack.Screen name="I/O Kurallar"
                options={{
                    headerLeft: () => (
                        <TouchableOpacity style={{ width: 50, left: 5, alignItems: 'center' }} onPress={() => navigation.goBack()}>
                            <Icon type="FontAwesome5" name="arrow-left" style={{ fontSize: 27, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={{ width: 50, right: 5, alignItems: 'center' }} onPress={() => navigation.toggleDrawer()}>
                            <Icon name="menu" style={{ fontSize: 45, color: '#555' }} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontFamily: 'Poppins-Light',
                    },
                }}
            >
                {({ navigation }) => <OutputRuleScreen module_API={module_API} module_LOCATION={module_LOCATION} module_ID={module_ID} node_ID={node_ID} module_TYPE={module_TYPE} module_CHANNEL={module_CHANNEL} navigation={navigation} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}
export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Begin" drawerPosition="left" drawerType="back" drawerContent={props => <SideBar {...props} />} drawerStyle={{ width: '80%' }}>
                <Drawer.Screen name="Begin" component={Begin} options={{ gestureEnabled: false }} />
                <Drawer.Screen name="Login" component={Login} options={{ gestureEnabled: false }} />
                <Drawer.Screen name="OneSignal" component={OneSignal} options={{ gestureEnabled: false }} />
                <Drawer.Screen name="SignUp" component={SignUp} />
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Modems" component={Modems} />
                <Drawer.Screen name="Devices" component={Devices} />
                <Drawer.Screen name="Alarms" component={Alarms} />
                <Drawer.Screen name="BaglantiHatalari" component={BaglantıHatalarıStack} />
                <Drawer.Screen name="Profile" component={Profil} />
                <Drawer.Screen name="Security" component={Security} />
                <Drawer.Screen name="Notifications" component={Notifications} />
                <Drawer.Screen name="About" component={About} />
                <Drawer.Screen name="Contact" component={Contact} />
                <Drawer.Screen name="FeedBack" component={FeedBack} />
                <Drawer.Screen name="Filter" component={Filter} options={{ gestureEnabled: false }} />
                <Drawer.Screen name="PasswordCoding" component={PasswordCoding} options={{ gestureEnabled: false }} />
                <Drawer.Screen name="ForgotPassword" component={ForgotPassword} options={{ gestureEnabled: false }} />
                <Drawer.Screen name="AccountVerification" component={AccountVerification} options={{ gestureEnabled: false }} />
                <Drawer.Screen name="ReaktifRapor" component={ReaktifRapor} />
                <Drawer.Screen name="TuketimRapor" component={TuketimRapor} />
                <Drawer.Screen name="AkımGerilimRapor" component={AkımGerilimRapor} />
                <Drawer.Screen name="ModemSettings" component={ModemSettingsStack} />
                <Drawer.Screen name="ModemAuth" component={ModemAuthStack} />
                <Drawer.Screen name="CihazAuth" component={DeviceAuthStack} />
                <Drawer.Screen name="MeterSettings" component={MeterSettingsStack} />
                <Drawer.Screen name="RelaySettings" component={RelaySettingsStack} />
                <Drawer.Screen name="AnalizorSettings" component={AnalizorSettingsStack} />
                <Drawer.Screen name="SıcaklıkSensorSettings" component={SıcaklıkSensorSettingsStack} />
                <Drawer.Screen name="AnalogGirisSettings" component={AnalogGirisSettingsStack} />
                <Drawer.Screen name="InputOutputSettings" component={InputOutputSettingsStack} />
                <Drawer.Screen name="AlarmChange" component={AlarmDefinitonChange} />
                <Drawer.Screen name="IOSettings" component={IOSettingsStack} />
                <Drawer.Screen name="IoOutputChange" component={IoOutputChange} />
                <Drawer.Screen name="IoOutputRules" component={IoOutputRules} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
_logOut = async (props) => {

    var pushStatus = 0;
    var value = 0;

    const url = await GetServerSettings().then((keyValue) => { return keyValue; });
    var tkn = await AsyncStorage.getItem('access_token');
    var player_ID = await AsyncStorage.getItem("playerID");
    try {
        fetch(url + '/notificationSettings' + '?status=' + pushStatus + '&player_id=' + player_ID, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + tkn,
            }
        })
            .then((res) => res.json())
            .then((res) => {
                (async () => {
                    await AsyncStorage.setItem('status', pushStatus.toString())
                })()
            })
            .catch((error) => {
                console.log(error);
            });

        AsyncStorage.removeItem('access_token');
        AsyncStorage.removeItem('user');
        AsyncStorage.removeItem('OneSignal');
        AsyncStorage.removeItem('playerID');
        AsyncStorage.removeItem('RoleStatus');
        await AsyncStorage.setItem('isLogin', value.toString());
        // props.navigation.navigate('Login')
        RNRestart.Restart()


    } catch (error) {
        alert("Çıkış Yapılamadı" + error);
    }

}
SideBar = (props) => {


    const [active, setActive] = useState(false);
    // const [activeTab, setActiveTab] = useState(false);

    AsyncStorage.getItem('user').then((keyValue) => {
        user = keyValue
    })

    return (
        <LinearGradient start={{ x: 0, y: 3 }} end={{ x: 0, y: 0 }} colors={['black', 'white']} style={styles.container}>
            <ScrollView style={{ flex: 1 }} >
                <View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
                        <View style={{ flex: 1, width: '100%', height: 100, marginTop: 40 }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: 68, height: 68, borderRadius: 68 / 2, borderColor: '#D9D9D9', borderWidth: 2, justifyContent: 'center', alignItems: 'center' }}>

                                    <Image source={require('./app/frontend/images/user-profile.png')} style={{ width: 70, height: 70, borderColor: 'gray', borderWidth: 1, borderRadius: 70 / 2 }} />
                                </View>
                            </View>
                            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ textTransform: 'uppercase', fontSize: 16, color: 'gray', textTransform: 'lowercase' }}>{user}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.navSectionStyle}>
                        <TouchableOpacity style={styles.navItemStyle} onPress={() => props.navigation.navigate('Home')}>
                            <Text style={styles.menuIconText}><Icon type="FontAwesome" name="home" style={styles.menuIcon} /></Text>
                            <Text style={styles.menuText}>Anasayfa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItemStyle} onPress={() => props.navigation.navigate('Alarms')}>
                            <Text style={styles.menuIconText}><Icon type="FontAwesome" name="bell" style={styles.menuIcon} /></Text>
                            <Text style={styles.menuText}>Alarmlar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItemStyle} onPress={() => props.navigation.navigate('Modems')}>
                            <Text style={styles.menuIconText}><Icon type="FontAwesome" name="square" style={styles.menuIcon} /></Text>
                            <Text style={styles.menuText}>Modemler</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.navItemStyle} onPress={() => props.navigation.navigate('Devices')}>
                            <Text style={styles.menuIconText}><Icon type="FontAwesome" name="th" style={styles.menuIcon} /></Text>
                            <Text style={styles.menuText}>Cihazlar</Text>
                        </TouchableOpacity>
                        {/* {activeTab &&
                            <View>
                                <TouchableOpacity style={{ padding: 5, paddingLeft: 60, justifyContent: 'center', }} onPress={() => props.navigation.navigate('Devices', { CihazRoute: 0 })}>
                                    <Text style={{ position: "absolute", width: 30, height: 30, justifyContent: "center", alignItems: "center", textAlign: "center", marginLeft: 30, }}><Icon type="FontAwesome5" name="database" style={{ fontSize: 17, color: '#2a3844' }} /></Text>
                                    <Text style={{ fontSize: 18, fontFamily: "Poppins-Light", color: "#444", bottom: 5 }}>Tüm Cihazlar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 5, paddingLeft: 60, justifyContent: 'center' }} onPress={() => props.navigation.navigate('Devices', { CihazRoute: 1 })}>
                                    <Text style={{ position: "absolute", width: 30, height: 30, justifyContent: "center", alignItems: "center", textAlign: "center", marginLeft: 30, }}><Icon type="FontAwesome" name="tachometer" style={{ fontSize: 17, color: '#2a3844' }} /></Text>
                                    <Text style={{ fontSize: 18, fontFamily: "Poppins-Light", color: "#444", bottom: 5 }}>Sayaçlar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 5, paddingLeft: 60, justifyContent: 'center' }} onPress={() => props.navigation.navigate('Devices', { CihazRoute: 2 })}>
                                    <Text style={{ position: "absolute", width: 30, height: 30, justifyContent: "center", alignItems: "center", textAlign: "center", marginLeft: 30, }}><Icon type="Ionicons" name="speedometer" style={{ fontSize: 17, color: '#2a3844' }} /></Text>
                                    <Text style={{ fontSize: 18, fontFamily: "Poppins-Light", color: "#444", bottom: 5 }}>Röleler</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 5, paddingLeft: 60, justifyContent: 'center' }} onPress={() => props.navigation.navigate('Devices', { CihazRoute: 3 })}>
                                    <Text style={{ position: "absolute", width: 30, height: 30, justifyContent: "center", alignItems: "center", textAlign: "center", marginLeft: 30, }}><Icon type="FontAwesome5" name="bolt" style={{ fontSize: 23, color: '#2a3844' }} /></Text>
                                    <Text style={{ fontSize: 18, fontFamily: "Poppins-Light", color: "#444", bottom: 5 }}>Analizörler</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 5, paddingLeft: 60, justifyContent: 'center' }} onPress={() => props.navigation.navigate('Devices', { CihazRoute: 4 })}>
                                    <Text style={{ position: "absolute", width: 30, height: 30, justifyContent: "center", alignItems: "center", textAlign: "center", marginLeft: 30, }}><Icon type="FontAwesome5" name="thermometer-full" style={{ fontSize: 23, color: '#2a3844' }} /></Text>
                                    <Text style={{ fontSize: 18, fontFamily: "Poppins-Light", color: "#444", bottom: 5 }}>Sıcaklık Sensör</Text>
                                </TouchableOpacity>
                            </View>
                        } */}

                        <TouchableOpacity style={styles.navItemStyle} onPress={() => props.navigation.navigate('BaglantiHatalari')}>
                            <Text style={styles.menuIconText}><Icon type="FontAwesome5" name="satellite-dish" style={styles.menuIcon} /></Text>
                            <Text style={styles.menuText}>Bağlantı Hataları</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItemStyle} onPress={() => props.navigation.navigate('Contact')}>
                            <Text style={styles.menuIconText}><Icon type="FontAwesome" name="info-circle" style={styles.menuIcon} /></Text>
                            <Text style={styles.menuText}>İletişim</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItemStyle} onPress={() => props.navigation.navigate('FeedBack')}>
                            <Text style={styles.menuIconText}><Icon type="FontAwesome" name="undo" style={styles.menuIcon} /></Text>
                            <Text style={styles.menuText}>Geri Bildirim</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setActive(!active)} style={{ padding: 10, paddingLeft: 50, flexDirection: 'row', }}>
                            <Text style={{ position: "absolute", width: 30, height: 30, justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: 13, marginLeft: 10, }}><Icon type="FontAwesome5" name="cog" style={styles.menuIcon} /></Text>
                            <Text style={{ fontSize: 18, fontFamily: "Poppins-Light", marginLeft: 10, color: "#444", marginTop: 4 }}>Ayarlar</Text>
                            <View style={{ flex: 1 }}>
                            </View>
                            <Text style={{ marginTop: 4 }}><Icon type="FontAwesome5" name={active == false ? 'chevron-down' : 'chevron-up'} style={{ fontSize: 20, color: '#2a3844' }} />
                            </Text>
                        </TouchableOpacity>

                        {active &&
                            <View>
                                <TouchableOpacity style={{ padding: 5, paddingLeft: 60, justifyContent: 'center' }} onPress={() => props.navigation.navigate('Profile')}>
                                    <Text style={{ position: "absolute", width: 30, height: 30, justifyContent: "center", alignItems: "center", textAlign: "center", marginLeft: 30, }}><Icon type="FontAwesome5" name="user-cog" style={{ fontSize: 17, color: '#2a3844' }} /></Text>
                                    <Text style={{ fontSize: 18, fontFamily: "Poppins-Light", marginLeft: 5, color: "#444", bottom: 5 }}>Profil</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 5, paddingLeft: 60, justifyContent: 'center' }} onPress={() => props.navigation.navigate('Security')}>
                                    <Text style={{ position: "absolute", width: 30, height: 30, justifyContent: "center", alignItems: "center", textAlign: "center", marginLeft: 30, }}><Icon type="FontAwesome5" name="user-shield" style={{ fontSize: 17, color: '#2a3844' }} /></Text>
                                    <Text style={{ fontSize: 18, fontFamily: "Poppins-Light", marginLeft: 5, color: "#444", bottom: 5 }}>Güvenlik</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 5, paddingLeft: 60, justifyContent: 'center' }} onPress={() => props.navigation.navigate('About')}>
                                    <Text style={{ position: "absolute", width: 30, height: 30, justifyContent: "center", alignItems: "center", textAlign: "center", marginLeft: 30, }}><Icon type="FontAwesome5" name="user-tag" style={{ fontSize: 17, color: '#2a3844' }} /></Text>
                                    <Text style={{ fontSize: 18, fontFamily: "Poppins-Light", marginLeft: 5, color: "#444", bottom: 5 }}>Hakkında</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 5, paddingLeft: 60, justifyContent: 'center' }} onPress={() => props.navigation.navigate('Notifications')}>
                                    <Text style={{ position: "absolute", width: 30, height: 30, justifyContent: "center", alignItems: "center", textAlign: "center", marginLeft: 30, }}><Icon type="FontAwesome5" name="bell" style={{ fontSize: 23, color: '#2a3844' }} /></Text>
                                    <Text style={{ fontSize: 18, fontFamily: "Poppins-Light", marginLeft: 5, color: "#444", bottom: 5 }}>Bildirim</Text>
                                </TouchableOpacity>
                            </View>
                        }

                    </View>
                </View>
            </ScrollView>
            <View style={styles.footerContainer}>
                <TouchableOpacity onPress={() => _logOut(props)} style={{ maxWidth: 120 }}>
                    <Text style={{ position: "absolute", marginTop: -3 }}><Icon type="FontAwesome" name="sign-out" style={{ fontSize: 20, color: "#2a3844", }} /></Text>
                    <Text style={{ marginLeft: 25, color: "#777", fontSize: 17, marginTop: -5, fontFamily: "Poppins-Light", color: "#2a3844" }}>Çıkış Yap</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuButton} onPress={() => props.navigation.closeDrawer()}>
                    <Icon name="close" style={{ fontSize: 30, color: "#2a3844" }} />
                </TouchableOpacity>
            </View>
        </LinearGradient >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navItemStyle: {
        padding: 10,
        paddingLeft: 50,
        borderBottomWidth: 0.5,
        borderBottomColor: "gray",
        justifyContent: 'center'
    },
    navSectionStyle: {
        paddingVertical: 5
    },
    sectionHeadingStyle: {
        marginTop: 15,
        paddingVertical: 15,
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    footerContainer: {
        justifyContent: 'center',
        padding: 18,
        height: 55,
    },
    menuIconText: {
        position: "absolute",
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginTop: 13,
        marginLeft: 10,
    },
    menuIcon: {
        fontSize: 26,
        color: "#2a3844",
    },
    menuText: {
        fontSize: 18,
        fontFamily: "Poppins-Light",
        marginLeft: 10,
        color: "#444",

    },
    menuButton: {
        color: "#666",
        padding: 13,
        minWidth: 50,
        textAlign: "center",
        alignItems: "center",
        position: "absolute",
        right: -5,
        bottom: 0,
        height: 55,
        top: -5
    }
});



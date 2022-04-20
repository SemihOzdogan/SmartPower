import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { GetServerSettings } from '../../../backend/serverSettingsController/getServerSettings';


const goBackArray = [];

function GoBackFunction(i) {
    if (i > 0) {
        global.goback.pop();
        return (global.goback[--global.i]);
    } else {

        return 'Home';
    }
}
class SideMenu extends Component {

    constructor() {
        super();
        this.state = {
            sidebar: false,
            user: '',
            expanded: false,
            pushStatus: 0
        }
        global.PrevPage = 'Home';
        global.NextPage = 'Home';
        global.GoBackFunction = GoBackFunction;
        global.goback = goBackArray;
        global.i = -1;
    }

    navigateToScreen = (route) => () => {
        if (route == global.NextPage) {
            this.props.navigation.closeDrawer();
        }

        if (global.PrevPage != route) {
            global.i++;
            global.goback.push(route);
            global.PrevPage = global.NextPage;
            global.NextPage = route;
        } else {
            global.PrevPage = 'Home';
        }
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    _logOut = async (value) => {
        if (value == 0) {
            const url = await GetServerSettings().then((keyValue) => { return keyValue; });
            var tkn = await AsyncStorage.getItem('access_token');
            var player_ID = await AsyncStorage.getItem("playerID");
            try {
                fetch(url + '/notificationSettings' + '?status=' + this.state.pushStatus + '&playerID=' + player_ID, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + tkn,
                    }
                })
                    .then((res) => res.json())
                    .then((res) => {
                        (async () => {
                            await AsyncStorage.setItem('status', this.state.pushStatus.toString())
                        })()

                        AsyncStorage.getItem('status').then((keyValue) => {
                            var PushStatus = keyValue
                        }, (error) => {
                            console.log(error) //Display error
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                AsyncStorage.removeItem('access_token');
                AsyncStorage.removeItem('user');
                await AsyncStorage.setItem('isLogin', value.toString());
                global.goback = [];
                global.i = -1;
                this.props.navigation.navigate("Login");
            } catch (error) {
                alert("Çıkış Yapılamadı" + error);
            }
        }
    }

    myFunction() {

        setInterval(() => {
            this.setState({
                sidebar: true
            })
            AsyncStorage.getItem("user").then((keyValue) => {
                this.setState({ user: keyValue });
            });
        }, 2000);

    }

    componentDidMount() {

        this.myFunction();
    }
    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    render() {

        if (this.state.sidebar == true) {
            return (
                <LinearGradient start={{ x: 0, y: 3 }} end={{ x: 0, y: 0 }} colors={['black', 'white']} style={styles.container}>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        <View>
                            <View style={{ flex: 1, width: '100%', height: 100, marginTop: 40 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ width: 68, height: 68, borderRadius: 68 / 2, borderColor: '#D9D9D9', borderWidth: 2, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../../images/user-profile.png')} style={{ width: 70, height: 70, borderColor: 'gray', borderWidth: 1, borderRadius: 70 / 2 }} />
                                    </View>
                                </View>
                                <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ textTransform: 'uppercase', fontSize: 12, color: 'gray' }}>{this.state.user}</Text>
                                </View>
                            </View>

                            <View style={styles.navSectionStyle}>
                                <TouchableOpacity style={styles.navItemStyle} onPress={this.navigateToScreen('Home')}>
                                    <Text style={styles.menuIconText}><Icon type="FontAwesome" name="home" style={styles.menuIcon} /></Text>
                                    <Text style={styles.menuText}>Anasayfa</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.navItemStyle} onPress={this.navigateToScreen('Alarmlar')}>
                                    <Text style={styles.menuIconText}><Icon type="FontAwesome" name="bell" style={styles.menuIcon} /></Text>
                                    <Text style={styles.menuText}>Alarmlar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.navItemStyle} onPress={this.navigateToScreen('Modemler')}>
                                    <Text style={styles.menuIconText}><Icon type="FontAwesome" name="square" style={styles.menuIcon} /></Text>
                                    <Text style={styles.menuText}>Modemler</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.navItemStyle} onPress={this.navigateToScreen('Cihazlar')}>
                                    <Text style={styles.menuIconText}><Icon type="FontAwesome" name="th" style={styles.menuIcon} /></Text>
                                    <Text style={styles.menuText}>Cihazlar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.navItemStyle} onPress={this.navigateToScreen('BaglantiHatalari')}>
                                    <Text style={styles.menuIconText}><Icon type="FontAwesome5" name="satellite-dish" style={styles.menuIcon} /></Text>
                                    <Text style={styles.menuText}>Bağlantı Hataları</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.navItemStyle} onPress={this.navigateToScreen('Iletisim')}>
                                    <Text style={styles.menuIconText}><Icon type="FontAwesome" name="info-circle" style={styles.menuIcon} /></Text>
                                    <Text style={styles.menuText}>İletişim</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.navItemStyle} onPress={this.navigateToScreen('GeriBildirim')}>
                                    <Text style={styles.menuIconText}><Icon type="FontAwesome" name="undo" style={styles.menuIcon} /></Text>
                                    <Text style={styles.menuText}>Geri Bildirim</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ padding: 10, paddingLeft: 50, borderBottomWidth: 0.2, borderBottomColor: "gray", flexDirection: 'row' }} onPress={() => this.toggleExpand()}>
                                    <Text style={{ position: "absolute", width: 30, height: 30, justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: 13, marginLeft: 10, }}><Icon type="FontAwesome5" name="cog" style={styles.menuIcon} /></Text>
                                    <Text style={{ fontSize: 18, fontFamily: "Poppins-Light", marginLeft: 10, color: "#444", marginTop: 4 }}>Ayarlar</Text>
                                    <View style={{ flex: 1 }}>
                                    </View>
                                    <Text style={{ marginTop: 4, rigth: 5 }}><Icon type="FontAwesome5" name={this.state.expanded ? 'chevron-up' : 'chevron-down'} style={{ fontSize: 20, color: '#2a3844' }} />
                                    </Text>
                                </TouchableOpacity>

                                {
                                    this.state.expanded &&
                                    <View>
                                        <TouchableOpacity style={{ marginLeft: 20, padding: 5, paddingLeft: 60, justifyContent: 'center' }} onPress={this.navigateToScreen('Kullanıcı')}>
                                            <Text style={{ position: "absolute", width: 30, height: 30, justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: 5, marginLeft: 30, }}><Icon type="FontAwesome5" name="user-cog" style={{ fontSize: 17, color: '#2a3844' }} /></Text>
                                            <Text style={{ fontSize: 18, fontFamily: "Poppins-Light", marginLeft: 5, color: "#444", }}>Profil</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ marginLeft: 20, padding: 5, paddingLeft: 60, justifyContent: 'center' }} onPress={this.navigateToScreen('Guvenlik')}>
                                            <Text style={{ position: "absolute", width: 30, height: 30, justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: 5, marginLeft: 30, }}><Icon type="FontAwesome5" name="user-shield" style={{ fontSize: 17, color: '#2a3844' }} /></Text>
                                            <Text style={{ fontSize: 18, fontFamily: "Poppins-Light", marginLeft: 5, color: "#444", }}>Güvenlik</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ marginLeft: 20, padding: 5, paddingLeft: 60, justifyContent: 'center' }} onPress={this.navigateToScreen('Hakkında')}>
                                            <Text style={{ position: "absolute", width: 30, height: 30, justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: 5, marginLeft: 30, }}><Icon type="FontAwesome5" name="user-tag" style={{ fontSize: 17, color: '#2a3844' }} /></Text>
                                            <Text style={{ fontSize: 18, fontFamily: "Poppins-Light", marginLeft: 5, color: "#444", }}>Hakkında</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ marginLeft: 20, padding: 5, paddingLeft: 60, justifyContent: 'center' }} onPress={this.navigateToScreen('Bildirim')}>
                                            <Text style={{ position: "absolute", width: 30, height: 30, justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: 5, marginLeft: 30, }}><Icon type="FontAwesome5" name="bell" style={{ fontSize: 23, color: '#2a3844' }} /></Text>
                                            <Text style={{ fontSize: 18, fontFamily: "Poppins-Light", marginLeft: 5, color: "#444", }}>Bildirim</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.footerContainer}>
                        <TouchableOpacity onPress={() => this._logOut(0)} style={{ maxWidth: 200 }}>
                            <Text style={{ position: "absolute" }}><Icon type="FontAwesome" name="sign-out" style={{ fontSize: 20, color: "#2a3844" }} /></Text>
                            <Text style={{ marginLeft: 25, color: "#777", fontSize: 17, marginTop: -2 }}>Çıkış Yap</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuButton} onPress={() => this.props.navigation.toggleDrawer()}>
                            <Icon name="close" style={{ fontSize: 30, color: "#2a3844" }} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            );
        } else {
            return (
                <View></View>
            );
        }
    }
}
SideMenu.propTypes = {
    navigation: PropTypes.object
};

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
        height: 55
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
        height: 55
    }
});
export default SideMenu;
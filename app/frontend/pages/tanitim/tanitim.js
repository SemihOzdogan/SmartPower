import React, { Component } from 'react';
import { StyleSheet, View, Text, BackHandler, StatusBar } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

class TanitimScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    BackHandler.exitApp()
  }

  _onDone = () => {
    var on = "on";
    AsyncStorage.setItem("watched", on.toString());
    this.setState({ showRealApp: true });
  };
  _onSkip = () => {
    this.setState({ showRealApp: true });
  };
  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: 40
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <Icon type="FontAwesome5" style={styles.iconStyle} name={item.icon} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  render() {
    let statusBar;
    if (Platform.OS == "android") {
      statusBar = "light-content"
    } else {
      statusBar = "dark-content"
    }
    if (this.state.showRealApp) {
      return (

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 50,
          }}>
          <StatusBar barStyle={statusBar} hidden={false} translucent={true} />

          {this.props.navigation.navigate('Login')}

        </View>
      );
    } else {
      //Intro slides
      return (
        <AppIntroSlider
          slides={slides}
          renderItem={this._renderItem}
          onDone={this._onDone}
          showSkipButton={true}
          onSkip={this._onSkip}
        />
      );
    }
  }
}
const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 150,
    color: 'rgba(255,255,255,0.5)'
  },
  text: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
    paddingHorizontal: 10,
    lineHeight: 30
  },
  title: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    textTransform: 'uppercase'

  },
});

const slides = [
  {
    key: 's1',
    text: 'Üstün performans özelliği sayesinde her şeyi dakikalar içinde halledebileceksiniz',
    title: 'HIZLI PERFORMANS',
    icon: "heart",
    backgroundColor: '#20d2bb',
  },
  {
    key: 's2',
    title: 'KOLAY KULLANMA',
    text: "Rahatlıkla aradığınızı bulabilir ve işlerinizi hızlı bir şekilde halledebilirsiniz",
    icon: "book",
    backgroundColor: '#febe29',
  },
  {
    key: 's3',
    title: 'KULLANICI DOSTU',
    text: "Sizlerin erişebileceğiniz modern bir enerji takip sistemi",
    icon: "check",
    backgroundColor: '#22bcb5',
  },
  {
    key: 's4',
    title: 'BASİTLEŞTİRİLMİŞ ARAYÜZ',
    text: 'Sizin için özel seçilmiş menülere hızlıca ulaşabileceksiniz',
    icon: "power-off",
    backgroundColor: '#3395ff',
  },
  {
    key: 's5',
    title: 'MODERN TASARIM',
    text: 'Yenilikçi ve gündemi takip eden ekip arkadaşlarımız sizin için en iyisini tasarladı',
    icon: "lightbulb",
    backgroundColor: '#f6437b',
  },
];

export default TanitimScreen;
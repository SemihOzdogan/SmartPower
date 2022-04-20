/* Modules and Components */
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Container, Icon, Tabs, Tab, ScrollableTab, Text, View, TabHeading } from 'native-base';
import CihazList from './tumCihazlarList';
import SayacList from './sayac/sayacList';
import RoleList from './role/roleList';
import AnalizorList from './analizor/analizorList';
import SıcaklıkSensorList from './sıcaklıkSensor/sıcaklıkSensorList';
import AnalogGirisList from './analogGiris/analogGirisList';
// import SayıcıList from './sayıcı/sayiciList';
import IoList from './InputOutput/IoList';


import CheckInternet from '../../../backend/InternetController/CheckInternet';

class CihazScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0
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
                <View style={{ flex: 1 }} >
                    <Tabs tabBarUnderlineStyle={{ backgroundColor: '#BDBDD7', borderBottomWidth: 1, borderBottomColor: '#BDBDD7' }} initialPage={0} onChangeTab={({ i }) => this.setState({ activeTab: i })} renderTabBar={() => <ScrollableTab style={{ backgroundColor: 'white' }} />} >
                        <Tab heading={<TabHeading style={{ backgroundColor: 'white' }}><Icon type="FontAwesome" name="database" style={{ fontSize: 16, color: 'gray' }} /><Text style={{ color: 'black' }}>Tüm Cihazlar</Text></TabHeading>}>
                            <CihazList activeTab={0} navigation={this.props.navigation} />
                        </Tab>
                        <Tab heading={<TabHeading style={{ backgroundColor: 'white' }}><Icon type="FontAwesome" name="tachometer" style={{ fontSize: 16, color: 'gray' }} /><Text style={{ color: 'black' }}>Sayaçlar</Text></TabHeading>}>
                            <SayacList activeTab={1} navigation={this.props.navigation} />
                        </Tab>

                        <Tab heading={<TabHeading style={{ backgroundColor: 'white' }}><Icon type="Ionicons" name="speedometer" style={{ fontSize: 22, color: 'gray' }} /><Text style={{ color: 'black' }}>Röleler</Text></TabHeading>}>
                            <RoleList activeTab={2} navigation={this.props.navigation} />
                        </Tab>
                        <Tab heading={<TabHeading style={{ backgroundColor: 'white' }}><Icon type="FontAwesome" name="bolt" style={{ fontSize: 16, color: 'gray' }} /><Text style={{ color: 'black' }}>Analizörler</Text></TabHeading>}>
                            <AnalizorList activeTab={3} navigation={this.props.navigation} />
                        </Tab>
                        <Tab heading={<TabHeading style={{ backgroundColor: 'white' }}><Icon type="FontAwesome5" name="thermometer-full" style={{ fontSize: 16, color: 'gray' }} /><Text style={{ color: 'black' }}>Sıcaklık Sensör</Text></TabHeading>}>
                            <SıcaklıkSensorList activeTab={4} navigation={this.props.navigation} />
                        </Tab>
                        <Tab heading={<TabHeading style={{ backgroundColor: 'white' }}><Icon type="FontAwesome5" name="rss" style={{ fontSize: 16, color: 'gray' }} /><Text style={{ color: 'black' }}>Analog Giriş</Text></TabHeading>}>
                            <AnalogGirisList activeTab={5} navigation={this.props.navigation} />
                        </Tab>
                        {/* <Tab heading={<TabHeading style={{ backgroundColor: 'white' }}><Icon type="FontAwesome5" name="list-ol" style={{ fontSize: 16, color: 'gray' }} /><Text style={{ color: 'black' }}>Sayıcı</Text></TabHeading>}>
                            <SayıcıList activeTab={6} navigation={this.props.navigation} />
                        </Tab> */}
                        <Tab heading={<TabHeading style={{ backgroundColor: 'white' }}><Icon type="FontAwesome5" name="toggle-on" style={{ fontSize: 16, color: 'gray' }} /><Text style={{ color: 'black' }}>Input/Output</Text></TabHeading>}>
                            <IoList activeTab={7} navigation={this.props.navigation} />
                        </Tab>
                    </Tabs>
                </View>
            </Container >
        );
    }
}

export default CihazScreen;
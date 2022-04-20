import React from 'react';
import { View, Text, TextInput, Switch } from 'react-native';
import { Icon, Row, Col } from 'native-base';
import { Tooltip } from 'react-native-elements';

export const G1ModuleComponent = props => {
    return (
        <Row style={{ alignItems: 'center', marginTop: 5, backgroundColor: '#ddd', borderRadius: 6 }}>
            <Col style={{ width: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <Icon type="FontAwesome5" name="download" style={{ fontSize: 15 }} /><Text style={{ fontSize: 16, color: "#666", fontFamily: 'Poppins-Light', textAlign: "center" }}> Giriş {props.GirisSayi}</Text>
            </Col>
            <Col style={{ width: 40, height: 20, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <View style={{ width: 20, height: 20, borderRadius: 20 / 2, backgroundColor: props.GirisDurumRengi, }}></View>
            </Col>
            <Col style={{}}>
                <Text style={{ fontSize: 16, color: "#666", fontFamily: 'Poppins-Light', }}>{props.GirisBilgi}</Text>
            </Col>
        </Row>
    )
}

export const C1ModuleComponent = props => {
    return (
        <Row style={{ alignItems: 'center', marginTop: 5, backgroundColor: '#ddd', borderRadius: 6 }}>
            <Col style={{ width: 100, height: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <Icon type="FontAwesome5" name="upload" style={{ fontSize: 15 }} /><Text style={{ fontSize: 16, color: "#666", fontFamily: 'Poppins-Light', textAlign: "center" }}> Çıkış {props.CıkısSayi}</Text>
            </Col>
            <Col style={{ height: 20, width: 50, justifyContent: 'center', alignItems: 'center', padding: 20, }}>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={props.CıkısDurum ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={props.onValueChangeCıkısDurum}
                    value={props.CıkısDurum}
                />
            </Col>
            {
                props.iconStatus == true &&
                <Col style={{ width: 20, alignItems: 'center' }}>
                    <Icon type="FontAwesome5" name="exclamation" style={{ fontSize: 20, color: 'red' }} />
                </Col>
            }

            <Col style={{ marginLeft: 5, }}>
                <Text style={{ fontSize: 16, color: "#666", fontFamily: 'Poppins-Light', }}>{props.CıkısBilgi}</Text>
            </Col>
        </Row>
    )
}

export const GRPModuleInputComponent = props => {
    return (
        <Row style={{ alignItems: 'center', marginTop: 5, backgroundColor: '#ddd', borderRadius: 6 }}>
            <Col style={{ width: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <Icon type="FontAwesome5" name="download" style={{ fontSize: 15 }} /><Text style={{ fontSize: 16, color: "#666", fontFamily: 'Poppins-Light', textAlign: "center" }}> Giriş {props.GirisSayi}</Text>
            </Col>
            <Col style={{ width: 40, height: 20, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <View style={{ width: 20, height: 20, borderRadius: 20 / 2, backgroundColor: props.GirisDurumRengi, }}></View>
            </Col>
            <Col style={{}}>
                <Text style={{ fontSize: 16, color: "#666", fontFamily: 'Poppins-Light', }}>{props.GirisBilgi}</Text>
            </Col>
        </Row>
    )
}
export const GRPModuleOutputComponent = props => {
    return (
        <Row style={{ alignItems: 'center', marginTop: 5, backgroundColor: '#ddd', borderRadius: 6 }}>
            <Col style={{ width: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <Icon type="FontAwesome5" name="upload" style={{ fontSize: 15 }} /><Text style={{ fontSize: 16, color: "#666", fontFamily: 'Poppins-Light', textAlign: "center" }}> Çıkış {props.CıkısSayi}</Text>
            </Col>
            <Col style={{ height: 20, width: 50, justifyContent: 'center', alignItems: 'center', padding: 20, }}>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={props.CıkısDurum ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={props.onValueChangeCıkısDurum}
                    value={props.CıkısDurum}
                />
            </Col>
            <Col style={{ marginLeft: 5 }}>
                <Text style={{ fontSize: 16, color: "#666", fontFamily: 'Poppins-Light', }}>{props.CıkısBilgi}</Text>
            </Col>
        </Row>
    )
}

export const D1ModuleComponent = props => {
    return (
        <Row style={{ alignItems: 'center', marginTop: 5, backgroundColor: '#ddd', borderRadius: 6 }}>
            <Col style={{ width: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <Icon type="FontAwesome5" name="download" style={{ fontSize: 15 }} /><Text style={{ fontSize: 16, color: "#666", fontFamily: 'Poppins-Light', textAlign: "center" }}> DC | {props.GirisSayi}</Text>
            </Col>
            <Col style={{ width: 40, height: 20, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <View style={{ width: 20, height: 20, borderRadius: 20 / 2, backgroundColor: props.GirisDurumRengi, }}></View>
            </Col>
            <Col style={{}}>
                <Text style={{ fontSize: 16, color: "#666", fontFamily: 'Poppins-Light', }}>{props.GirisBilgi}</Text>
            </Col>
        </Row>
    )
}

export const DontPay = props => {
    return (
        <Row style={{ alignItems: 'center', justifyContent: 'center',  backgroundColor: '#ddd', borderRadius: 6, padding: 10 }}>
            <View style={{ flexDirection: 'row',alignItems:'center' }}>
                <Icon type="FontAwesome5" name="exclamation-circle" style={{ fontSize: 25, color: 'red', }} />
                <Text style={{ fontSize: 14, fontFamily: 'Poppins-Light', textAlign: 'center' }}> Ödemesi yapılmamış cihaz</Text>
            </View>
        </Row>
    )
}






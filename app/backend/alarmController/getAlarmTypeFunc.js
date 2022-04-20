import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Row, Grid } from 'native-base';

export default class AlarmTypeContent extends Component {

    Function1(item) {    // Reaktif Limit Aşımı Alarmı
        return (
            <View style={{ marginVertical: 5, paddingHorizontal: 5 }}>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', padding: 2, borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.content}</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', padding: 2, borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.accountRange_txt} : {item.message.dayInterval}</Text>
                </Row>
                {item.message.indLimit != undefined && <Grid>

                    <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', padding: 2, borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.indLimit_txt} : % {item.message.indLimit}</Text>
                    </Row>

                    <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', padding: 2, borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.indRatio_txt} : % {item.message.indRatio}</Text>
                    </Row>

                </Grid>}

                {item.message.capLimit != undefined && <Grid>

                    <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', padding: 2, borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.capLimit_txt} : % {item.message.capLimit}</Text>
                    </Row>
                    <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', padding: 2, borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.capRatio_txt} : % {item.message.capRatio}</Text>
                    </Row>
                </Grid>}
            </View>
        );
    }
    Function3(item) {  // Haberleşme Hatası Alarmı
        return (
            <View style={{ marginVertical: 5, paddingHorizontal: 5 }}>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.content}</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.lastPacketTime}</Text>
                </Row>
            </View>

        );
    }

    // Function5(item) {  // Enerji Kesintisi SMS Alarmı
    //     return (
    //         <View style={{ marginVertical: 5, paddingHorizontal: 5 }}>
    //             <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
    //                 <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.lastPacketTime}</Text>
    //             </Row>
    //         </View>
    //     );
    // }

    Function7(item) {  // Giriş Değişimleri Alarmı
        return (
            <View style={{ marginVertical: 5, paddingHorizontal: 5 }}>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.content[0]} ( {item.message.channel} ) {item.message.channelName} </Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.content[1]} : {item.message.content[2]}</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>Değişme Zamanı : {item.message.changeTime}</Text>
                </Row>
            </View>
        );
    }

    Function9(item) {   // Gerilim Alarmı

        return (
            <View style={{ marginVertical: 5, paddingHorizontal: 5 }}>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', padding: 2, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.subTitle}</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', padding: 2, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.timeDiffStr}</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', padding: 2, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.beginDate_txt} : {item.message.beginDate} </Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', padding: 2, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.endDate_txt} : {item.message.endDate}</Text>
                </Row>
            </View>
        );
    }

    Function10(item) {   //   Dengesiz Akım Alarmı
        return (

            <View style={{ marginVertical: 5, paddingHorizontal: 5 }}>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.unbalancedCurrent_txt}</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.currentL1_txt} : {item.message.currentL1} </Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.currentL2_txt} : {item.message.currentL2} </Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.currentL3_txt} : {item.message.currentL3}</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.date_txt} : {item.message.date} </Text>
                </Row>
            </View>
        );
    }

    Function11(item) {   //   5A'dan Yüksek  Akım Alarmı
        return (

            <View style={{ marginVertical: 5, paddingHorizontal: 5 }}>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.unbalancedCurrentt} </Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.currentL1_txt} : {item.message.currentL1} </Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.currentL2_txt} : {item.message.currentL2}</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.currentL3_txt} : {item.message.currentL3}</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.date_txt} : {item.message.date}</Text>
                </Row>
            </View>

        );
    }


    Function12(item) { // Faz Kesintisi Alarmı
        return (
            <View style={{ marginVertical: 5, paddingHorizontal: 5 }}>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.content}</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.timeDiffStr}</Text>
                </Row>
            </View>
        );
    }

    Function13(item) {  // Zayıf Pil Alarmı  
        return (
            <View>

            </View>
        );
    }

    Function14(item) {  // Gövde Kapağı Açıldı Alarmı
        return (
            <View>

            </View>
        );
    }

    Function15(item) {  // Klemens Kapağı Açıldı Alarmı
        return (
            <View>

            </View>
        );
    }

    Function17(item) {   //   Sıcaklık  Alarmı
        return (

            <View style={{ marginVertical: 5, paddingHorizontal: 5 }}>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.tempValue_txt} : {item.message.tempValue} °C</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.limit_txt} : {item.message.limit} °C</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.beginDate_txt} : {item.message.beginDate}</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.endDate_txt} : {item.message.endDate}</Text>
                </Row>
            </View>
        );
    }

    Function18(item) {   //   Sıcaklık SMS Alarmı
        return (

            <View style={{ marginVertical: 5, paddingHorizontal: 5 }}>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.tempValue_txt} : {item.message.tempValue} °C</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.limit_txt} : {item.message.limit} °C</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.beginDate_txt} : {item.message.beginDate}</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.endDate_txt} : {item.message.endDate}</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.smsNO_txt} : {item.message.phoneNumber}</Text>
                </Row>
            </View>
        );
    }

    Function21(item) {   // Enerji Kesintisi Alarmı
        return (

            <View style={{ marginVertical: 5, paddingHorizontal: 5 }} >
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.content}</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.content_generator_txt}</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.time_txt} : {item.message.time}</Text>
                </Row>
            </View>
        );
    }

    Function22(item) {   // Yakıt Seviyesi Alarmı
        return (
            <View style={{ marginVertical: 5, paddingHorizontal: 5 }}>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.fuelLevelLimit_txt} : % {item.message.fuelLevelLimit}</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.measuredFuelLevel_txt} : % {item.message.measuredFuelLevel}</Text>
                </Row>
            </View>
        );
    }


    Function23(item) {   // Akü Gerilimi Alarmı
        return (
            <View style={{ marginVertical: 5, paddingHorizontal: 5 }}>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.batteryLimit_txt} : {item.message.batteryLimit} V</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.measuredBattery_txt} :  {item.message.measuredBattery} V</Text>
                </Row>
            </View>
        );
    }

    Function24(item) {  // Manuel Mod Alarmı
        return (
            <View style={{ marginVertical: 5, paddingHorizontal: 5 }}>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.content}</Text>
                </Row>
            </View>
        );
    }

    Function31(item) {   // Süresiz Aydınlatma Alarmı
        return (
            <View style={{ marginVertical: 5, paddingHorizontal: 5 }}>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.msg_txt}</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.current_values_txt} : ( {item.message.current_values} )</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.offset_values_txt} : ( {item.message.offset_values} )</Text>
                </Row>
            </View>
        );
    }

    Function32(item) {   // Zamana Bağlı Akım Alarmı
        return (
            <View style={{ marginVertical: 5, paddingHorizontal: 5 }}>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.msg_txt}</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.current_values_txt} : ( {item.message.current_values} )</Text>
                </Row>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>{item.message.offset_values_txt} : ( {item.message.offset_values} )</Text>
                </Row>
            </View>
        );
    }

    Function36(item) {  //  Demand Aşımı Alarmı
        return (
            <View>

            </View>
        );
    }


    Function37(item) {  // Export Demand Aşımı Alarmı
        return (
            <View>

            </View>
        );
    }

    Function38(item) {  // Yakıt Sensörü Alarmı
        return (
            <View>

            </View>
        );
    }
    Function39(item) {  // Jeneratör Olağan Dışı Durması Alarmı
        return (
            <View >

            </View>
        );
    }

    Function41(item) {  // Soğutma Suyu Seviyesi Alarmı
        return (
            <View>

            </View>
        );
    }

    Function43(item) {  // Enerji Tüketim Alarmı
        return (
            <View>

            </View>
        );
    }


    Function44(item) {  // Analog Sensör Alarmı
        return (
            <View>

            </View>
        );
    }

    FunctionDefault() {  // Default Alarm
        return (
            <View style={{ marginVertical: 5, paddingHorizontal: 5 }}>
                <Row style={{ backgroundColor: '#f5f5f5', marginBottom: 2, alignItems: 'center', borderLeftWidth: 2, borderColor: item.AlarmColor }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginLeft: 10 }}>Alarm Oluştu</Text>
                </Row>
            </View>
        );
    }

}

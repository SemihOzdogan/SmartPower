import React from 'react';
import { View, Text } from 'react-native';
import { Icon, Picker } from 'native-base';

export default CustomPickerComponent = props => {
    var arrayGerilim = ["1", "63", "105", "150", "158", "160", "300", "315", "330", "345", "360"]
    var arrayAkım = ["5/5", "10/5", "15/5", "20/5", "25/5", "30/5", "40/5", "50/5", "60/5", "75/5", "80/5", "90/5", "100/5", "120/5", "125/5", "150/5", "160/5", "175/5",
        "200/5", "250/5", "300/5", "350/5", "400/5", "500/5", "600/5", "750/5", "800/5", "1000/5", "1200/5", "1250/5", "1500/5", "1600/5", "1800/5", "2000/5", "2500/5", "3000/5",
        "3200/5", "4000/5", "5000/5", "6000/5", "7500/5", "8000/5", "10000/5"]
    var arrayFaturaGunu = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"]
    var arrayBaglantıTuru = ["RS485", "Optik", "RS232"]
    var arrayVeriGondermeAralıgı = ["1", "5", "15", "30", "45", "60", "120", "180", "240"]
    var arrayPTF = ["Evet", "Hayır"]
    var arrayVeriZamanı = ["Sayaç Saati", "Sunucu Saati"]
    var arrayExportData = ["Evet", "Hayır"]
    var arrayVeriGondermeAralıgıSıcaklık = ["5", "10", "15", "20", "30", "45", "60"]

    return (
        <View style={{ height: 60, padding: 2, marginTop: 1 }}>
            <View style={{ width: props.dısGenislik, height: 50, borderRadius: 8, backgroundColor: '#ddd', }}>
                <Text style={{ bottom: -5, left: 3, fontFamily: 'Poppins-Thin', bottom: -2 }}>
                    <Icon type="FontAwesome5" name={props.icon} style={{ fontSize: 15, color: '#DA7C62' }}> </Icon>
                    {props.title}</Text>
                <View style={{ borderRadius: 6, borderWidth: 1, borderColor: 'white', overflow: 'hidden', backgroundColor: 'white', height: 25, marginTop: 2, marginHorizontal: 2 }}>
                    <Picker
                        mode="dialog"
                        placeholder={props.inputTitle}
                        placeholderStyle={{ color: "#DA7C62", fontSize: 14, color: '#bbb', left: -2, }}
                        style={{ height: 25, color: '#DA7C62', backgroundColor: 'white', marginHorizontal: 2, marginTop: 2 }}
                        selectedValue={props.selectedValue}
                        onValueChange={props.onValueChange}
                        headerBackButtonText="Geri"
                        iosHeader={props.mainTitle}
                        textStyle={{ color: '#DA7C62', fontSize: 14, height: 25, top: 3, left: -7 }}
                    >

                        {
                            (() => {
                                switch (props.inputTitle) {
                                    case 'Gerilim Trafosu Oranı':
                                        return arrayGerilim.map((data) => {
                                            return (
                                                <Picker.Item label={data} value={data} />
                                            )
                                        });
                                    case 'Akım Trafosu Oranı':
                                        return arrayAkım.map((data) => {
                                            return (
                                                <Picker.Item label={data} value={data} />
                                            )
                                        });
                                    case 'Ayın Fatura Günü':
                                        return arrayFaturaGunu.map((data) => {
                                            return (
                                                <Picker.Item label={data} value={data} />
                                            )
                                        });
                                    case 'Bağlantı Şekli':
                                        return arrayBaglantıTuru.map((data) => {
                                            return (
                                                <Picker.Item label={data} value={data} />
                                            )
                                        });
                                    case 'Veri Gönderme Aralığı':
                                        return arrayVeriGondermeAralıgı.map((data) => {
                                            return (
                                                <Picker.Item label={data} value={data} />
                                            )
                                        });
                                    case 'Veri Gönderme Aralığı ':
                                        return arrayVeriGondermeAralıgıSıcaklık.map((data) => {
                                            return (
                                                <Picker.Item label={data} value={data} />
                                            )
                                        });
                                    case 'PTF Uyumlu':
                                        return arrayPTF.map((data) => {
                                            return (
                                                <Picker.Item label={data} value={data} />
                                            )
                                        });
                                    case 'Veri Zamanı':
                                        return arrayVeriZamanı.map((data) => {
                                            return (
                                                <Picker.Item label={data} value={data} />
                                            )
                                        });
                                    case 'Export Datalar Görünsün':
                                        return arrayExportData.map((data) => {
                                            return (
                                                <Picker.Item label={data} value={data} />
                                            )
                                        });
                                    case 'error':
                                        return <Error text={text} />;
                                    default:
                                        return null;
                                }
                            })()
                        }
                    </Picker>
                    <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#DA7C62', top: 2 }} />
                </View>
            </View>
        </View>
    )
}


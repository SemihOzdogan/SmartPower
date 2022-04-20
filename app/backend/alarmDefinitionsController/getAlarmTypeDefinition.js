import React from 'react';
import { Text, View, TouchableOpacity, Switch, TextInput } from 'react-native';
import { Icon, Picker } from 'native-base';
import { CheckBox } from 'react-native-elements';

// var arrayHesaplamaAralıgı = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
var arrayVeriAlınamama = [1, 2, 3, 6, 9, 12, 18]
var arrayTekrarlamaSayısı = [2, 3, 4, 5, 6, 7, 8, 9, 10]
var arrayPeriyodSaat = [24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336, 360, 384, 408, 432, 456, 480, 504, 528, 552, 576, 600, 624, 648, 672, 696, 720]
var arraySaat = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
var arrayDakika = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"]


export const ReaktifLimit = props => {    // Reaktif Limit Aşımı Alarmı
    return (
        <View style={{ width: '95%', backgroundColor: '#ccc', flexDirection: 'row', top: 15, borderRadius: 4, marginHorizontal: 20, marginTop: 5, padding: 3, }}>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Endüktif Limit</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.EnduktifLimitDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.EnduktifLimitAzalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeEnduktifLimitDeger}
                                value={props.EnduktifLimitDeger}
                                placeholder={props.EnduktifLimitDeger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>%</Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.EnduktifLimitArtır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Kapasitif Limit</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.KapasitifLimitDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.KapasitifLimitAzalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeKapasitifLimitDeger}
                                value={props.KapasitifLimitDeger}
                                placeholder={props.KapasitifLimitDeger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>%</Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.KapasitifLimitArtır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Tüketim Limit</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.TuketimLimitDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.TuketimLimitAzalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeTuketimLimitDeger}
                                value={props.TuketimLimitDeger}
                                placeholder={props.TuketimLimitDeger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 10, color: '#111' }}>kW.h</Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.TuketimLimitArtır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Hesaplama Aralığı</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', borderRightWidth: 2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#ddd' }}>
                        <Picker
                            mode="dialog"
                            placeholder={props.HesaplamaAralıgıDeger == 0 ? "Fatura Gününden İtibaren" : 'Son ' + (props.HesaplamaAralıgıDeger / 24) + ' Gün'}
                            placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                            style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', }}
                            selectedValue={props.selectedValueHesaplamaAralıgı}
                            onValueChange={props.onValueChangeHesaplamaAralıgı}
                            headerBackButtonText="Geri"
                            iosHeader="Hesaplama Aralığı"
                            headerTitleStyle={{ fontSize: 13,  }}
                            textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                        >
                            <Picker.Item label="Fatura Gününden İtibaren" value={0} />
                            {
                                arrayPeriyodSaat.map((data) => {
                                    return (
                                        <Picker.Item label={'Son ' + (data / 24) + ' Gün'} value={data} />
                                    )
                                })
                            }

                        </Picker>
                        <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                    </View>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Alarm Periyodu</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.AlarmPeriyodDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AlarmPeriyodAzalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeAlarmPeriyodDeger}
                                value={props.AlarmPeriyodDeger}
                                placeholder={props.AlarmPeriyodDeger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 10, color: '#111' }}>saat </Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa', }} />
                            </View>
                            <View style={{ flex: 1.1, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AlarmPeriyodArtır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View >
        </View>
    );
}
export const Haberlesme = (props) => {  // Haberleşme Hatası Alarmı
    return (
        <View style={{ width: '95%', backgroundColor: '#ccc', flexDirection: 'row', top: 15, borderRadius: 4, marginHorizontal: 20, marginTop: 5, padding: 3, }}>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Veri Alınamaması</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', borderRightWidth: 2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#ddd' }}>
                        <Picker
                            mode="dialog"
                            placeholder={props.VeriAlınamamaDeger + " Saat"}
                            placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                            style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', }}
                            selectedValue={props.selectedValueVeriAlınamama}
                            onValueChange={props.onValueChangeVeriAlınamama}
                            headerBackButtonText="Geri"
                            iosHeader="Veri Alınamaması"
                            headerTitleStyle={{ fontSize: 13,  }}
                            textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                        >
                            {
                                arrayVeriAlınamama.map((data) => {
                                    return (
                                        <Picker.Item label={data + ' Saat'} value={data} />
                                    )
                                })
                            }
                            <Picker.Item label="1 Gün" value={24} />
                            <Picker.Item label="2 Gün" value={48} />
                            <Picker.Item label="3 Gün" value={72} />
                        </Picker>
                        <View style={{ position: 'absolute', flexDirection: 'row', right: 0, bottom: 0, top: 0 }}>
                            <View style={{ flex: 1, }}>
                                <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                            </View>
                            <View style={{ flex: 2, width: 30, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Alarm Periyodu</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', borderRightWidth: 2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#ddd' }}>
                        <Picker
                            mode="dialog"
                            placeholder={props.PeriyodDeger + " Saat"}
                            placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                            style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', }}
                            selectedValue={props.selectedValuePeriyod}
                            onValueChange={props.onValueChangePeriyod}
                            headerBackButtonText="Geri"
                            iosHeader="Alarm Periyod"
                            headerTitleStyle={{ fontSize: 13,  }}
                            textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                        >
                            {
                                arrayVeriAlınamama.map((data) => {
                                    return (
                                        <Picker.Item label={data + ' Saat'} value={data} />
                                    )
                                })
                            }
                            <Picker.Item label="1 Gün" value={24} />
                            <Picker.Item label="2 Gün" value={48} />
                            <Picker.Item label="3 Gün" value={72} />
                            <Picker.Item label="4 Gün" value={96} />
                            <Picker.Item label="5 Gün" value={120} />
                            <Picker.Item label="6 Gün" value={144} />
                            <Picker.Item label="7 Gün" value={168} />
                            <Picker.Item label="8 Gün" value={192} />
                            <Picker.Item label="9 Gün" value={216} />
                            <Picker.Item label="10 Gün" value={240} />

                        </Picker>
                    </View>
                    <View style={{ position: 'absolute', flexDirection: 'row', right: 0, bottom: 0, top: 0 }}>
                        <View style={{ flex: 1, }}>
                            <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                        </View>
                        <View style={{ flex: 2, width: 30, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                        </View>
                    </View>
                </View>
            </View >
        </View>
    );
}
export const DengesizAkım = (props) => {  // DengesizAkım Alarmı
    return (
        <View style={{ width: '95%', backgroundColor: '#ccc', flexDirection: 'row', top: 15, borderRadius: 4, marginHorizontal: 20, marginTop: 5, padding: 3, }}>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Alarm Oluşma Sıklığı</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.AlarmOlusmaSıklıgıDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AlarmOlusmaSıklıgıAzalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeAlarmOlusmaSıklıgıDeger}
                                value={props.AlarmOlusmaSıklıgıDeger}
                                placeholder={props.AlarmOlusmaSıklıgıDeger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AlarmOlusmaSıklıgıArtır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Alarm Periyodu</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', borderRightWidth: 2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#ddd' }}>
                        <Picker
                            mode="dialog"
                            placeholder={props.PeriyodDeger + " Gün"}
                            placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                            style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', }}
                            selectedValue={props.selectedValueAlarmPeriyod}
                            onValueChange={props.onValueChangeAlarmPeriyod}
                            headerBackButtonText="Geri"
                            iosHeader="Alarm Periyod"
                            headerTitleStyle={{ fontSize: 13,  }}
                            textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                        >
                            {
                                arrayPeriyodSaat.map((data) => {
                                    return (
                                        <Picker.Item label={(data / 24) + ' Gün'} value={data} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    <View style={{ position: 'absolute', flexDirection: 'row', right: 0, bottom: 0, top: 0 }}>
                        <View style={{ flex: 1, }}>
                            <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                        </View>
                        <View style={{ flex: 2, width: 30, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                        </View>
                    </View>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderRightColor: '#ccc', borderRightWidth: 1, borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Alarm Yoksa Da Gönder</Text>
                    </View>
                    <View style={{ flex: 1, height: 40, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Switch
                            trackColor={{ false: "#F3565D", true: "#45B6AF" }}
                            thumbColor={props.AkımYoksaDeger ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor={props.AkımYoksaDeger ? "#45B6AF" : "#F3565D"}
                            onValueChange={props.onValueChangeAkımYoksaDeger}
                            value={props.AkımYoksaDeger}
                        />
                        <Text style={{ color: props.AkımYoksaDeger == true ? "#45B6AF" : "#F3565D" }}>  {props.AkımYoksaDeger == true ? "Aktif" : "Pasif"}</Text>
                    </View>
                </View>
            </View >
        </View>
    )
}
export const _5aYüksekAkım = (props) => {  // _5aYüksekAkım Alarmı
    return (
        <View style={{ width: '95%', backgroundColor: '#ccc', flexDirection: 'row', top: 15, borderRadius: 4, marginHorizontal: 20, marginTop: 5, padding: 3, }}>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Alarm Oluşma Sıklığı</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.AlarmOlusmaSıklıgıDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AlarmOlusmaSıklıgıAzalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeAlarmOlusmaSıklıgıDeger}
                                value={props.AlarmOlusmaSıklıgıDeger}
                                placeholder={props.AlarmOlusmaSıklıgıDeger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AlarmOlusmaSıklıgıArtır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Alarm Periyodu</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', borderRightWidth: 2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#ddd' }}>
                        <Picker
                            mode="dialog"
                            placeholder={props.PeriyodDeger + ' Gün'}
                            placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                            style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', }}
                            selectedValue={props.selectedValueAlarmPeriyod}
                            onValueChange={props.onValueChangeAlarmPeriyod}
                            headerBackButtonText="Geri"
                            iosHeader="Alarm Periyod"
                            headerTitleStyle={{ fontSize: 13,  }}
                            textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                        >
                            {
                                arrayPeriyodSaat.map((data) => {
                                    return (
                                        <Picker.Item label={(data / 24) + ' Gün'} value={data} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    <View style={{ position: 'absolute', flexDirection: 'row', right: 0, bottom: 0, top: 0 }}>
                        <View style={{ flex: 1, }}>
                            <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                        </View>
                        <View style={{ flex: 2, width: 30, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
export const DemandAsımı = (props) => {  // DemandAsımı Alarmı
    return (
        <View style={{ width: '95%', backgroundColor: '#ccc', flexDirection: 'row', top: 15, borderRadius: 4, marginHorizontal: 20, marginTop: 5, padding: 3, }}>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Saatlik Olması Gereken Limit</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.SaatlikLimitDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.SaatlikLimitAzalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeSaatlikLimitDeger}
                                value={props.SaatlikLimitDeger}
                                placeholder={props.SaatlikLimitDeger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.SaatlikLimitArtır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Alarm Periyodu</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', borderRightWidth: 2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#ddd' }}>
                        <Picker
                            mode="dialog"
                            placeholder={props.PeriyodDeger + ' Gün'}
                            placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                            style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', }}
                            selectedValue={props.selectedValueAlarmPeriyod}
                            onValueChange={props.onValueChangeAlarmPeriyod}
                            headerBackButtonText="Geri"
                            iosHeader="Alarm Periyod"
                            headerTitleStyle={{ fontSize: 13,  }}
                            textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                        >
                            {
                                arrayPeriyodSaat.map((data) => {
                                    return (
                                        <Picker.Item label={(data / 24) + ' Gün'} value={data} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    <View style={{ position: 'absolute', flexDirection: 'row', right: 0, bottom: 0, top: 0 }}>
                        <View style={{ flex: 1, }}>
                            <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                        </View>
                        <View style={{ flex: 2, width: 30, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
export const ExportDemandAsımı = (props) => {  // ExportDemandAsımı Alarmı
    return (
        <View style={{ width: '95%', backgroundColor: '#ccc', flexDirection: 'row', top: 15, borderRadius: 4, marginHorizontal: 20, marginTop: 5, padding: 3, }}>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Saatlik Olması Gereken Limit</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.SaatlikLimitDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.SaatlikLimitAzalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeSaatlikLimitDeger}
                                value={props.SaatlikLimitDeger}
                                placeholder={props.SaatlikLimitDeger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.SaatlikLimitArtır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Alarm Periyodu</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', borderRightWidth: 2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#ddd' }}>
                        <Picker
                            mode="dialog"
                            placeholder={props.PeriyodDeger + ' Gün'}
                            placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                            style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', }}
                            selectedValue={props.selectedValueAlarmPeriyod}
                            onValueChange={props.onValueChangeAlarmPeriyod}
                            headerBackButtonText="Geri"
                            iosHeader="Alarm Periyod"
                            headerTitleStyle={{ fontSize: 13,  }}
                            textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                        >
                            {
                                arrayPeriyodSaat.map((data) => {
                                    return (
                                        <Picker.Item label={(data / 24) + ' Gün'} value={data} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    <View style={{ position: 'absolute', flexDirection: 'row', right: 0, bottom: 0, top: 0 }}>
                        <View style={{ flex: 1, }}>
                            <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                        </View>
                        <View style={{ flex: 2, width: 30, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
export const YuksekAkım = (props) => {  // YuksekAkım Alarmı
    return (
        <View style={{ width: '95%', backgroundColor: '#ccc', flexDirection: 'row', top: 15, borderRadius: 4, marginHorizontal: 20, marginTop: 5, padding: 3, }}>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Üst Limit</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.UstLimitDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.UstLimitAzalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeUstLimitDeger}
                                value={props.UstLimitDeger}
                                placeholder={props.UstLimitDeger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>A</Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.UstLimitArtır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Tekrarlama Sayısı</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', borderRightWidth: 2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#ddd' }}>
                        <Picker
                            mode="dialog"
                            placeholder={props.tekrarlamaDeger + ' Kez Aşılırsa'}
                            placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                            style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', }}
                            selectedValue={props.selectedValueTekrarlama}
                            onValueChange={props.onValueChangeTekrarlama}
                            headerBackButtonText="Geri"
                            iosHeader="Tekrarlama Sayısı"
                            headerTitleStyle={{ fontSize: 13,  }}
                            textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                        >
                            {
                                arrayTekrarlamaSayısı.map((data) => {
                                    return (
                                        <Picker.Item label={data + ' Kez Aşılırsa'} value={data} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    <View style={{ position: 'absolute', flexDirection: 'row', right: 0, bottom: 0, top: 0 }}>
                        <View style={{ flex: 1, }}>
                            <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                        </View>
                        <View style={{ flex: 2, width: 30, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
export const Sıcaklık = (props) => {  // Sıcaklık Alarmı
    return (
        <View style={{ width: '95%', backgroundColor: '#ccc', flexDirection: 'row', top: 15, borderRadius: 4, marginHorizontal: 20, marginTop: 5, padding: 3, }}>
            <View style={{ flex: 1, paddingVertical: 5, }}>

                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Limit Tipi</Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center', }}>
                        <CheckBox
                            left
                            title='Sadece alt limit'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={props.checkedAlt}
                            onPress={props.onPressAlt}
                        />
                        <CheckBox
                            left
                            title='Sadece üst limit'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={props.checkedUst}
                            onPress={props.onPressUst}
                        />
                        <CheckBox
                            left
                            title='Alt ve üst limit'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={props.checkedAltUst}
                            onPress={props.onPressAltUst}
                        />
                    </View>
                </View>
                {
                    props.altLimitGoster == 0 &&
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                            <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Alt Limit</Text>
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row' }}>
                            <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                                <TouchableOpacity disabled={props.AltLimitDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AltLimitAzalt}>
                                    <Text style={{ fontSize: 18 }}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={{ height: 40, width: '100%', textAlign: 'center' }}
                                    onChangeText={props.onChangeAltLimitDeger}
                                    value={props.AltLimitDeger}
                                    placeholder={props.AltLimitDeger.toString()}
                                    placeholderTextColor="black"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                                <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, color: '#111' }}>°C </Text>
                                    <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                                </View>
                                <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                    <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AltLimitArtır}>
                                        <Text style={{ fontSize: 18 }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                }

                {
                    props.ustLimitGoster == 1 &&

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                            <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Üst Limit</Text>
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row' }}>
                            <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                                <TouchableOpacity disabled={props.UstLimitDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.UstLimitAzalt}>
                                    <Text style={{ fontSize: 18 }}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={{ height: 40, width: '100%', textAlign: 'center' }}
                                    onChangeText={props.onChangeUstLimitDeger}
                                    value={props.UstLimitDeger}
                                    placeholder={props.UstLimitDeger.toString()}
                                    placeholderTextColor="black"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                                <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, color: '#111' }}>°C </Text>
                                    <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                                </View>
                                <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                    <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.UstLimitArtır}>
                                        <Text style={{ fontSize: 18 }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                }
                {
                    props.altUstGoster == 2 &&
                    <View>
                        < View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Alt Limit</Text>
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row' }}>
                                <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                                    <TouchableOpacity disabled={props.AltLimitDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AltLimitAzalt}>
                                        <Text style={{ fontSize: 18 }}>-</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                                    <TextInput
                                        style={{ height: 40, width: '100%', textAlign: 'center' }}
                                        onChangeText={props.onChangeAltLimitDeger}
                                        value={props.AltLimitDeger}
                                        placeholder={props.AltLimitDeger.toString()}
                                        placeholderTextColor="black"
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                                    <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 14, color: '#111' }}>°C </Text>
                                        <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                                    </View>
                                    <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                        <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AltLimitArtır}>
                                            <Text style={{ fontSize: 18 }}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Üst Limit</Text>
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row' }}>
                                <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                                    <TouchableOpacity disabled={props.UstLimitDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.UstLimitAzalt}>
                                        <Text style={{ fontSize: 18 }}>-</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                                    <TextInput
                                        style={{ height: 40, width: '100%', textAlign: 'center' }}
                                        onChangeText={props.onChangeUstLimitDeger}
                                        value={props.UstLimitDeger}
                                        placeholder={props.UstLimitDeger.toString()}
                                        placeholderTextColor="black"
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                                    <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 14, color: '#111' }}>°C </Text>
                                        <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                                    </View>
                                    <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                        <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.UstLimitArtır}>
                                            <Text style={{ fontSize: 18 }}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                }
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Tekrarlama Sayısı</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', borderRightWidth: 2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#ddd' }}>
                        <Picker
                            mode="dialog"
                            placeholder={props.tekrarlamaDeger + ' Kez Aşılırsa'}
                            placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                            style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', }}
                            selectedValue={props.selectedValueTekrarlama}
                            onValueChange={props.onValueChangeTekrarlama}
                            headerBackButtonText="Geri"
                            iosHeader="Tekrarlama Sayısı"
                            textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                        >
                            {
                                arrayTekrarlamaSayısı.map((data) => {
                                    return (
                                        <Picker.Item label={data + ' Kez Aşılırsa'} value={data} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    <View style={{ position: 'absolute', flexDirection: 'row', right: 0, bottom: 0, top: 0 }}>
                        <View style={{ flex: 1, }}>
                            <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                        </View>
                        <View style={{ flex: 2, width: 30, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                        </View>
                    </View>
                </View>
            </View >
        </View >
    )
}
export const Gerilim = (props) => {  // Gerilim Alarmı
    return (
        <View style={{ width: '95%', backgroundColor: '#ccc', flexDirection: 'row', top: 15, borderRadius: 4, marginHorizontal: 20, marginTop: 5, padding: 3, }}>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Alt Limit</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.AltLimitDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AltLimitAzalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeAltLimitDeger}
                                value={props.AltLimitDeger}
                                placeholder={props.AltLimitDeger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: '#111' }}>V </Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AltLimitArtır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Üst Limit</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.UstLimitDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.UstLimitAzalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeUstLimitDeger}
                                value={props.UstLimitDeger}
                                placeholder={props.UstLimitDeger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: '#111' }}>V </Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.UstLimitArtır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Alarm Süresi</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.AlarmSuresiDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AlarmSuresiAzalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeAlarmSuresiDeger}
                                value={props.AlarmSuresiDeger}
                                placeholder={props.AlarmSuresiDeger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>saat </Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AlarmSuresiArtır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Alarm Periyodu</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.AlarmPeriyodDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AlarmPeriyodAzalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeAlarmPeriyodDeger}
                                value={props.AlarmPeriyodDeger}
                                placeholder={props.AlarmPeriyodDeger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>saat </Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa', }} />
                            </View>
                            <View style={{ flex: 1.1, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AlarmPeriyodArtır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View >
        </View>
    )
}
export const EnerjiTuketim = (props) => {  // EnerjiTuketim Alarmı
    return (
        <View style={{ width: '95%', backgroundColor: '#ccc', top: 15, borderRadius: 4, marginHorizontal: 20, marginTop: 5, padding: 3, }}>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <Text style={{ textAlign: 'center', fontSize: 16, color: '#444' }}>Alarm Durumu 1</Text>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Başlangıç Saati ve Dakikası</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', }}>
                        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 5 }}>
                            <View style={{ flex: 1, backgroundColor: '#67809F', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                <TouchableOpacity disabled={props.BaslangicSaat1AzaltDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center', }} onPress={props.BaslangicSaat1Azalt}>
                                    <Text style={{ fontSize: 18 }}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={{ height: 40, width: '100%', textAlign: 'center' }}
                                    onChangeText={props.onChangeBaslangicSaat1Deger}
                                    value={props.BaslangicSaat1Deger}
                                    placeholder={props.BaslangicSaat1Deger.toString()}
                                    placeholderTextColor="black"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', borderRadius: 4 }}>
                                <View style={{ flex: 1, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                    <TouchableOpacity disabled={props.BaslangicSaat1ArtırDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.BaslangicSaat1Artır}>
                                        <Text style={{ fontSize: 18 }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 5 }}>
                            <View style={{ flex: 1, backgroundColor: '#67809F', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                <TouchableOpacity disabled={props.BaslangicDakika1AzaltDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center', }} onPress={props.BaslangicDakika1Azalt}>
                                    <Text style={{ fontSize: 18 }}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={{ height: 40, width: '100%', textAlign: 'center' }}
                                    onChangeText={props.onChangeBaslangicDakika1Deger}
                                    value={props.BaslangicDakika1Deger}
                                    placeholder={props.BaslangicDakika1Deger.toString()}
                                    placeholderTextColor="black"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', borderRadius: 4 }}>
                                <View style={{ flex: 1, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                    <TouchableOpacity disabled={props.BaslangicDakika1ArtırDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.BaslangicDakika1Artır}>
                                        <Text style={{ fontSize: 18 }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Hesaplanacak Süre</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', }}>
                        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 5 }}>
                            <View style={{ flex: 1, backgroundColor: '#67809F', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                <TouchableOpacity disabled={props.HesaplanacakSure1AzaltDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center', }} onPress={props.HesaplanacakSure1Azalt}>
                                    <Text style={{ fontSize: 18 }}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={{ height: 40, width: '100%', textAlign: 'center' }}
                                    onChangeText={props.onChangeHesaplanacakSure1Deger}
                                    value={props.HesaplanacakSure1Deger}
                                    placeholder={props.HesaplanacakSure1Deger.toString()}
                                    placeholderTextColor="black"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 12, color: '#111' }}>sa </Text>
                                    <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa', }} />
                                </View>
                                <View style={{ flex: 1.1, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                    <TouchableOpacity disabled={props.HesaplanacakSure1ArtırDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.HesaplanacakSure1Artır}>
                                        <Text style={{ fontSize: 18 }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Tüketim Limiti</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', }}>
                        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 5 }}>
                            <View style={{ flex: 1, backgroundColor: '#67809F', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                <TouchableOpacity disabled={props.TuketimLimit1AzaltDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center', }} onPress={props.TuketimLimit1Azalt}>
                                    <Text style={{ fontSize: 18 }}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={{ height: 40, width: '100%', textAlign: 'center' }}
                                    onChangeText={props.onChangeTuketimLimit1Deger}
                                    value={props.TuketimLimit1Deger}
                                    placeholder={props.TuketimLimit1Deger.toString()}
                                    placeholderTextColor="black"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa', }} />
                                </View>
                                <View style={{ flex: 1.1, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                    <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.TuketimLimit1Artır}>
                                        <Text style={{ fontSize: 18 }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <Text style={{ textAlign: 'center', fontSize: 16, color: '#444' }}>Alarm Durumu 2</Text>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Başlangıç Saati ve Dakikası</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', }}>
                        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 5 }}>
                            <View style={{ flex: 1, backgroundColor: '#67809F', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                <TouchableOpacity disabled={props.BaslangicSaat2AzaltDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center', }} onPress={props.BaslangicSaat2Azalt}>
                                    <Text style={{ fontSize: 18 }}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={{ height: 40, width: '100%', textAlign: 'center' }}
                                    onChangeText={props.onChangeBaslangicSaat2Deger}
                                    value={props.BaslangicSaat2Deger}
                                    placeholder={props.BaslangicSaat2Deger.toString()}
                                    placeholderTextColor="black"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', borderRadius: 4 }}>
                                <View style={{ flex: 1, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                    <TouchableOpacity disabled={props.BaslangicSaat2ArtırDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.BaslangicSaat2Artır}>
                                        <Text style={{ fontSize: 18 }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 5 }}>
                            <View style={{ flex: 1, backgroundColor: '#67809F', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                <TouchableOpacity disabled={props.BaslangicDakika2AzaltDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center', }} onPress={props.BaslangicDakika2Azalt}>
                                    <Text style={{ fontSize: 18 }}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={{ height: 40, width: '100%', textAlign: 'center' }}
                                    onChangeText={props.onChangeBaslangicDakika2Deger}
                                    value={props.BaslangicDakika2Deger}
                                    placeholder={props.BaslangicDakika2Deger.toString()}
                                    placeholderTextColor="black"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', borderRadius: 4 }}>
                                <View style={{ flex: 1, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                    <TouchableOpacity disabled={props.BaslangicDakika2ArtırDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.BaslangicDakika2Artır}>
                                        <Text style={{ fontSize: 18 }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Hesaplanacak Süre</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', }}>
                        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 5 }}>
                            <View style={{ flex: 1, backgroundColor: '#67809F', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                <TouchableOpacity disabled={props.HesaplanacakSure2AzaltDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center', }} onPress={props.HesaplanacakSure2Azalt}>
                                    <Text style={{ fontSize: 18 }}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={{ height: 40, width: '100%', textAlign: 'center' }}
                                    onChangeText={props.onChangeHesaplanacakSure2Deger}
                                    value={props.HesaplanacakSure2Deger}
                                    placeholder={props.HesaplanacakSure2Deger.toString()}
                                    placeholderTextColor="black"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 12, color: '#111' }}>sa </Text>
                                    <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa', }} />
                                </View>
                                <View style={{ flex: 1.1, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                    <TouchableOpacity disabled={props.HesaplanacakSure2ArtırDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.HesaplanacakSure2Artır}>
                                        <Text style={{ fontSize: 18 }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Tüketim Limiti</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', }}>
                        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 5 }}>
                            <View style={{ flex: 1, backgroundColor: '#67809F', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                <TouchableOpacity disabled={props.TuketimLimit2AzaltDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center', }} onPress={props.TuketimLimit2Azalt}>
                                    <Text style={{ fontSize: 18 }}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={{ height: 40, width: '100%', textAlign: 'center' }}
                                    onChangeText={props.onChangeTuketimLimit2Deger}
                                    value={props.TuketimLimit2Deger}
                                    placeholder={props.TuketimLimit2Deger.toString()}
                                    placeholderTextColor="black"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa', }} />
                                </View>
                                <View style={{ flex: 1.1, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                    <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.TuketimLimit2Artır}>
                                        <Text style={{ fontSize: 18 }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
export const SuresizAydınlatma = (props) => {  // SuresizAydınlatma Alarmı
    return (
        <View style={{ width: '95%', backgroundColor: '#ccc', top: 15, borderRadius: 4, marginHorizontal: 20, marginTop: 5, padding: 3, }}>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Akım Tolerans Oranı </Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.AkımToleransDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AkımToleransAzalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeAkımToleransDeger}
                                value={props.AkımToleransDeger}
                                placeholder={props.AkımToleransDeger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>%</Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AkımToleransArtır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Ofset Akım L1</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.OfsetAkım1Disabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.OfsetAkım1Azalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeOfsetAkım1Deger}
                                value={props.OfsetAkım1Deger}
                                placeholder={props.OfsetAkım1Deger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>A</Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.OfsetAkım1Artır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Ofset Akım L2</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.OfsetAkım2Disabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.OfsetAkım2Azalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeOfsetAkım2Deger}
                                value={props.OfsetAkım2Deger}
                                placeholder={props.OfsetAkım2Deger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>A</Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.OfsetAkım2Artır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Ofset Akım L3</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.OfsetAkım3Disabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.OfsetAkım3Azalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeOfsetAkım3Deger}
                                value={props.OfsetAkım3Deger}
                                placeholder={props.OfsetAkım3Deger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>A</Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.OfsetAkım3Artır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Mesaj Metni</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeMesajMetni}
                                value={props.MesajMetni}
                                placeholder={props.MesajMetni == "" ? "Mesaj Metni" : props.MesajMetni}
                                placeholderTextColor="bbb"
                                keyboardType="default"
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
export const AstronomikAydınlatma = (props) => {  // AstronomikAydınlatma Alarmı
    return (
        <View style={{ width: '95%', backgroundColor: '#ccc', top: 15, borderRadius: 4, marginHorizontal: 20, marginTop: 5, padding: 3, }}>

            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Enlem / Boylam</Text>
                    </View>
                    <View style={{ flex: 2, height: 40, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', justifyContent: 'center', alignItems: 'center', }}>
                            <Text>{props.Latitude} / {props.Longitude}</Text>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', }}>
                            {/* <TouchableOpacity onPress={props.onPress}> */}
                            <Text style={{ textAlign: 'center', color: '#3AA0CD' }}>Koordinatları değiştirmek için ayarlara gidin</Text>
                            {/* </TouchableOpacity> */}
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Gecikme Süresi</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.GecikmeSuresiDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.GecikmeSuresiAzalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeGecikmeSuresiDeger}
                                value={props.GecikmeSuresiDeger}
                                placeholder={props.GecikmeSuresiDeger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>dk</Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.GecikmeSuresiArtır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Akım Tolerans Oranı </Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.AkımToleransDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AkımToleransAzalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeAkımToleransDeger}
                                value={props.AkımToleransDeger}
                                placeholder={props.AkımToleransDeger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>%</Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AkımToleransArtır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Ofset Akım L1</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.OfsetAkım1Disabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.OfsetAkım1Azalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeOfsetAkım1Deger}
                                value={props.OfsetAkım1Deger}
                                placeholder={props.OfsetAkım1Deger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>A</Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.OfsetAkım1Artır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Ofset Akım L2</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.OfsetAkım2Disabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.OfsetAkım2Azalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeOfsetAkım2Deger}
                                value={props.OfsetAkım2Deger}
                                placeholder={props.OfsetAkım2Deger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>A</Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.OfsetAkım2Artır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Ofset Akım L3</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.OfsetAkım3Disabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.OfsetAkım3Azalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeOfsetAkım3Deger}
                                value={props.OfsetAkım3Deger}
                                placeholder={props.OfsetAkım3Deger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>A</Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.OfsetAkım3Artır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Boştaki Akım Sınırı L1</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.BosAkım1Disabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.BosAkım1Azalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeBosAkım1Deger}
                                value={props.BosAkım1Deger}
                                placeholder={props.BosAkım1Deger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>A</Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.BosAkım1Artır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Boştaki Akım Sınırı L2</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.BosAkım2Disabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.BosAkım2Azalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeBosAkım2Deger}
                                value={props.BosAkım2Deger}
                                placeholder={props.BosAkım2Deger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>A</Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.BosAkım2Artır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Boştaki Akım Sınırı L3</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.BosAkım3Disabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.BosAkım3Azalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeBosAkım3Deger}
                                value={props.BosAkım3Deger}
                                placeholder={props.BosAkım3Deger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>A</Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.BosAkım3Artır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
export const ZamanaBaglıAkım = (props) => {  // ZamanaBaglıAkım Alarmı
    return (
        <View style={{ width: '95%', backgroundColor: '#ccc', top: 15, borderRadius: 4, marginHorizontal: 20, marginTop: 5, padding: 3, }}>
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                    <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Günler</Text>
                </View>
                <View style={{ flex: 2, flexDirection: 'row', borderRightWidth: 2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#ddd' }}>
                    <View style={{ flex: 1 }}>
                        <CheckBox
                            center
                            title='Pazartesi'
                            iconRight
                            checked={props.checkedPZT}
                            onPress={props.onPressPZT}
                            textStyle={{ fontSize: 11 }}
                        />
                        <CheckBox
                            center
                            title='Çarşamba'
                            iconRight
                            checked={props.checkedCSB}
                            onPress={props.onPressCSB}
                            textStyle={{ fontSize: 11 }}
                        />
                        <CheckBox
                            center
                            title='Cuma'
                            iconRight
                            checked={props.checkedCMA}
                            onPress={props.onPressCMA}
                            textStyle={{ fontSize: 11 }}
                        />
                        <CheckBox
                            center
                            title='Pazar'
                            iconRight
                            checked={props.checkedPZR}
                            onPress={props.onPressPZR}
                            textStyle={{ fontSize: 11 }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <CheckBox
                            center
                            title='Salı'
                            iconRight
                            checked={props.checkedSAL}
                            onPress={props.onPressSAL}
                            textStyle={{ fontSize: 11 }}
                        />
                        <CheckBox
                            center
                            title='Perşembe'
                            iconRight
                            checked={props.checkedPRS}
                            onPress={props.onPressPRS}
                            textStyle={{ fontSize: 11 }}
                        />
                        <CheckBox
                            center
                            title='Cumartesi'
                            iconRight
                            checked={props.checkedCMR}
                            onPress={props.onPressCMR}
                            textStyle={{ fontSize: 11 }}
                        />
                    </View>
                </View>
            </View>

            <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                    <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Faz Sayısı</Text>
                </View>
                <View style={{ flex: 2, flexDirection: 'row', borderRightWidth: 2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#ddd' }}>
                    <Picker
                        mode="dialog"
                        placeholder={props.FazSayısı}
                        placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                        style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', }}
                        selectedValue={props.selectedValueFazSayısı}
                        onValueChange={props.onValueChangeFazSayısı}
                        headerBackButtonText="Geri"
                        iosHeader="Faz Sayısı"
                        textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                    >
                        <Picker.Item label={1} value={1} />
                        <Picker.Item label={2} value={2} />
                        <Picker.Item label={3} value={3} />

                    </Picker>
                </View>

                <View style={{ position: 'absolute', flexDirection: 'row', right: 0, bottom: 0, top: 0 }}>
                    <View style={{ flex: 1, }}>
                        <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                    </View>
                </View>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                    <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Başlangıç</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', borderRightWidth: 2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#ddd' }}>
                    <Picker
                        mode="dialog"
                        placeholder={props.BaslangıcSaat}
                        placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                        style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', }}
                        selectedValue={props.selectedValueBaslangıcSaat}
                        onValueChange={props.onValueChangeBaslangıcSaat}
                        headerBackButtonText="Geri"
                        iosHeader="Saat"
                        textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                    >
                        {
                            arraySaat.map((data) => {
                                return (
                                    <Picker.Item label={data} value={data} />
                                )
                            })
                        }
                    </Picker>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1, }}>
                        <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', borderRightWidth: 2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#ddd' }}>
                    <Picker
                        mode="dialog"
                        placeholder={props.BaslangıcDakika}
                        placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                        style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', }}
                        selectedValue={props.selectedValueBaslangıcDakika}
                        onValueChange={props.onValueChangeBaslangıcDakika}
                        headerBackButtonText="Geri"
                        iosHeader="Dakika"
                        textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                    >
                        {
                            arrayDakika.map((data) => {
                                return (
                                    <Picker.Item label={data} value={data} />
                                )
                            })
                        }
                    </Picker>
                </View>
                <View style={{ position: 'absolute', flexDirection: 'row', right: 0, bottom: 0, top: 0 }}>
                    <View style={{ flex: 1, }}>
                        <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                    </View>
                </View>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                    <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Bitiş</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', borderRightWidth: 2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#ddd' }}>
                    <Picker
                        mode="dialog"
                        placeholder={props.BitisSaat}
                        placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                        style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', }}
                        selectedValue={props.selectedValueBitisSaat}
                        onValueChange={props.onValueChangeBitisSaat}
                        headerBackButtonText="Geri"
                        iosHeader="Saat"
                        textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                    >
                        {
                            arraySaat.map((data) => {
                                return (
                                    <Picker.Item label={data} value={data} />
                                )
                            })
                        }
                    </Picker>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1, }}>
                        <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', borderRightWidth: 2, borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#ddd' }}>
                    <Picker
                        mode="dialog"
                        placeholder={props.BitisDakika}
                        placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                        style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', }}
                        selectedValue={props.selectedValueBitisDakika}
                        onValueChange={props.onValueChangeBitisDakika}
                        headerBackButtonText="Geri"
                        iosHeader="Dakika"
                        textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                    >
                        {
                            arrayDakika.map((data) => {
                                return (
                                    <Picker.Item label={data} value={data} />
                                )
                            })
                        }
                    </Picker>
                </View>
                <View style={{ position: 'absolute', flexDirection: 'row', right: 0, bottom: 0, top: 0 }}>
                    <View style={{ flex: 1, }}>
                        <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Akım Tolerans Oranı </Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.AkımToleransDisabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AkımToleransAzalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeAkımToleransDeger}
                                value={props.AkımToleransDeger}
                                placeholder={props.AkımToleransDeger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>%</Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.AkımToleransArtır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Ofset Akım L1</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.OfsetAkım1Disabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.OfsetAkım1Azalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeOfsetAkım1Deger}
                                value={props.OfsetAkım1Deger}
                                placeholder={props.OfsetAkım1Deger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>A</Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.OfsetAkım1Artır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Ofset Akım L2</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.OfsetAkım2Disabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.OfsetAkım2Azalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeOfsetAkım2Deger}
                                value={props.OfsetAkım2Deger}
                                placeholder={props.OfsetAkım2Deger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>A</Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.OfsetAkım2Artır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Ofset Akım L3</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#67809F', }}>
                            <TouchableOpacity disabled={props.OfsetAkım3Disabled} style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.OfsetAkım3Azalt}>
                                <Text style={{ fontSize: 18 }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeOfsetAkım3Deger}
                                value={props.OfsetAkım3Deger}
                                placeholder={props.OfsetAkım3Deger.toString()}
                                placeholderTextColor="black"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', borderRadius: 4 }}>
                            <View style={{ flex: 1.6, flexDirection: 'row', backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#111' }}>A</Text>
                                <Icon type="FontAwesome5" name="info-circle" style={{ fontSize: 20, color: '#aaa' }} />
                            </View>
                            <View style={{ flex: 1.8, backgroundColor: '#E26A6A', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={props.OfsetAkım3Artır}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Mesaj Metni</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center' }}
                                onChangeText={props.onChangeMesajMetni}
                                value={props.MesajMetni}
                                placeholder={props.MesajMetni == "" ? "Mesaj Metni" : props.MesajMetni}
                                placeholderTextColor="bbb"
                                keyboardType="default"
                            />
                        </View>
                    </View>
                </View>
            </View>


        </View>
    )
}

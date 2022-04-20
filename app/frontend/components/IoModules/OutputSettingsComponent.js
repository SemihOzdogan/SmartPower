import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Icon, Picker } from 'native-base';
import { RadioGroup, RadioButton } from '../UseNodeModule/react-native-flexi-radio-button'

export const MainOutput = props => {
    return (
        <View style={{ width: '100%', backgroundColor: '#ddd', borderRadius: 4, marginTop: 5, padding: 10, }}>
            <View iterationCount={1} animation="pulse" style={{ width: '100%', height: 40, backgroundColor: "#bbb", borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', textAlign: 'center' }}>Çıkış {props.KeyValue} Ayarları</Text>
            </View>
            <View style={{ width: '100%', paddingVertical: 5, }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>{/* Çıkış Adı*/}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bbb', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Çıkış Adı</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                            <TextInput
                                style={{ height: 40, width: '100%', textAlign: 'center', }}
                                onChangeText={props.OnChangeCıkısAdı}
                                value={props.CıkısAdıDeger}
                                placeholder="Bu çıkış için bir isim girin..."
                                placeholderTextColor="black"
                                keyboardType="default"
                            />
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>{/* Kural 1*/}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bbb', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Kural 1</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', }}>
                        <View style={{ width: '100%', }}>
                            <Picker
                                mode="dialog"
                                placeholder={props.Kural1Deger}
                                placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                                style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                selectedValue={props.selectedValueKural1}
                                onValueChange={props.onValueChangeKural1}
                                headerBackButtonText="Geri"
                                iosHeader="Kural 1"
                                headerTitleStyle={{ fontSize: 16, }}
                                textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                            >
                                {
                                    props.arrayKural1.map((data) => {
                                        return (
                                            <Picker.Item label={data} value={data} />
                                        )
                                    })
                                }

                            </Picker>
                        </View>
                        <View style={{ position: 'absolute', flexDirection: 'row', right: 0, bottom: 0, top: 0, }}>
                            <View style={{ flex: 1, }}>
                                <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                            </View>
                            <TouchableOpacity
                                onPress={props.onPressKural1Ayar}
                            >
                                <View style={{ flex: 2, width: 50, flexDirection: 'row', backgroundColor: '#E26A6A', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                    <Icon type="FontAwesome" name="gear" style={{ fontSize: 20, color: 'white' }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>{/* Kural 2*/}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bbb', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Kural 2 (Opsiyonel)</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', }}>
                        <View style={{ width: '100%', }}>
                            <Picker
                                mode="dialog"
                                placeholder={props.Kural2Deger}
                                placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                                style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                selectedValue={props.selectedValueKural2}
                                onValueChange={props.onValueChangeKural2}
                                headerBackButtonText="Geri"
                                iosHeader="Kural 2"
                                headerTitleStyle={{ fontSize: 16, }}
                                textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                            >
                                {
                                    props.arrayKural2.map((data) => {
                                        return (
                                            <Picker.Item label={data} value={data} />
                                        )
                                    })
                                }

                            </Picker>
                        </View>
                        <View style={{ position: 'absolute', flexDirection: 'row', right: 0, bottom: 0, top: 0, }}>
                            <View style={{ flex: 1, }}>
                                <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                            </View>
                            <TouchableOpacity
                                onPress={props.onPressKural2Ayar}
                            >
                                <View style={{ flex: 2, width: 50, flexDirection: 'row', backgroundColor: '#E26A6A', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                    <Icon type="FontAwesome" name="gear" style={{ fontSize: 20, color: 'white' }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>{/* Kural Seçim*/}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bbb', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Kural Seçimi</Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center', borderTopRightRadius: 4, borderBottomRightRadius: 4, backgroundColor: 'white', }}>
                        <RadioGroup
                            onSelect={props.onSelect}
                            selectedIndex={props.selectedIndex}
                            color='#9575b2'
                            highlightColor='#ccc8b9'
                        >
                            <RadioButton disabled={props.BirDisabled} style={{ borderTopRightRadius: 4 }}>
                                <Text style={{ fontSize: 12 }}>Sadece 1.kural geçerli ise çalışsın</Text>
                            </RadioButton>

                            <RadioButton disabled={props.BirveİkiDisabled}>
                                <Text style={{ fontSize: 12 }}>1. ve 2. kural geçerli ise çalışsın</Text>
                            </RadioButton>

                            <RadioButton disabled={props.BirveyaİkiDisabled} style={{ borderBottomRightRadius: 4 }}>
                                <Text style={{ fontSize: 12 }}>1. veya 2. kural geçerli ise çalışsın</Text>
                            </RadioButton>
                        </RadioGroup>
                    </View>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>{/* Enerji Ölçüm Cihazı*/}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bbb', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Enerji Ölçüm Cihazı</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', }}>
                        <View style={{ width: '100%', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                            <Picker
                                mode="dialog"
                                placeholder={props.selectedDevice}
                                placeholderStyle={{ width: '100%', color: "gray", fontSize: 16, }}
                                style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                selectedValue={props.selectedValueCihazlar}
                                onValueChange={props.onValueChangeCihazlar}
                                headerBackButtonText="Geri"
                                iosHeader="Cihaz Seçiniz"
                                textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                            >
                                <Picker.Item label="Cihaz Seçiniz" value={""} />
                                {
                                    props.Devices.map((data, index) => {
                                        return (
                                            <Picker.Item label={(index + 1) + ")" + " " + data.measuring_device_id + " " + data.location_name} value={data.measuring_device_id} />
                                        )
                                    })
                                }

                            </Picker>
                        </View>
                        <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10, }} />
                    </View>
                </View>
                {/* <View style={{ width: '50%', height: 40, marginTop: 10, }}>
                    <View style={{ flex: 1, backgroundColor: '#3499DC', borderRadius: 4 }}>
                        <TouchableOpacity onPress={() => alert('kural detay bilgi')} style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Icon type="FontAwesome5" name="info-circle" style={{ color: 'white', fontSize: 20, }} /><Text style={{ fontSize: 14, color: 'white', textAlign: 'center' }}> Kural Detay Bilgi</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
            </View >
        </View>
    )
}




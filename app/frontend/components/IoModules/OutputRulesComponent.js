import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { Icon, Picker, CheckBox } from 'native-base';
import { RadioGroup, RadioButton } from '../UseNodeModule/react-native-flexi-radio-button'
import MultiSelect from '../UseNodeModule/react-native-multiple-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export const KuralTabanlı = props => {

    return (
        <View>
            <View style={{ width: '100%', backgroundColor: '#ddd', borderRadius: 4, marginTop: 5, padding: 10, }}>
                <Text style={{ textAlign: 'center', fontSize: 16 }}>Kural Tabanlı Kontrol Ayarları</Text>
            </View>
            <View style={{ width: '100%', backgroundColor: '#ddd', borderRadius: 4, marginTop: 5, padding: 10, }}>
                <View style={{ width: '100%', }}>
                    <View style={{ width: '100%', }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 5 }}>Bu çıkış aşağıda seçilen cihazların giriş durumlarına göre kontrol edilir.</Text>
                        <View style={{ flex: 2, justifyContent: 'center', borderRadius: 4, backgroundColor: 'white', }}>
                            <RadioGroup
                                onSelect={props.onSelect}
                                selectedIndex={props.selectedIndex}
                                color='#9575b2'
                            // highlightColor='#ccc8b9'
                            >
                                <RadioButton>
                                    <Text>En az biri geçerli olduğunda çalışsın</Text>
                                </RadioButton>

                                <RadioButton>
                                    <Text>Tümü geçerli olursa çalışsın</Text>
                                </RadioButton>
                            </RadioGroup>
                        </View>
                    </View>
                </View>
            </View>

            <KuralTabanlıSubProp deviceTitle="1.Cihaz"
                devicePlaceHolder={props.devicePlaceHolder1}
                selectedValueDevice={props.selectedValueDevice1}
                onValueChangeDevice={props.onValueChangeDevice1}
                arrayDevices={props.arrayDevices}
                arrayGiris={props.arrayGiris1}
                girisPlaceHolder={props.girisPlaceHolder1}
                selectedValueGiris={props.selectedValueGiris1}
                onValueChangeGiris={props.onValueChangeGiris1}
                onPressCheckBox={props.onPressCheckBox1}
                checkedCheckBox={props.checkedCheckBox1}

            />
            <KuralTabanlıSubProp deviceTitle="2.Cihaz"
                devicePlaceHolder={props.devicePlaceHolder2}
                selectedValueDevice={props.selectedValueDevice2}
                onValueChangeDevice={props.onValueChangeDevice2}
                arrayDevices={props.arrayDevices}
                arrayGiris={props.arrayGiris2}
                girisPlaceHolder={props.girisPlaceHolder2}
                selectedValueGiris={props.selectedValueGiris2}
                onValueChangeGiris={props.onValueChangeGiris2}
                onPressCheckBox={props.onPressCheckBox2}
                checkedCheckBox={props.checkedCheckBox2}
            />
            <KuralTabanlıSubProp deviceTitle="3.Cihaz"
                devicePlaceHolder={props.devicePlaceHolder3}
                selectedValueDevice={props.selectedValueDevice3}
                onValueChangeDevice={props.onValueChangeDevice3}
                arrayDevices={props.arrayDevices}
                arrayGiris={props.arrayGiris3}
                girisPlaceHolder={props.girisPlaceHolder3}
                selectedValueGiris={props.selectedValueGiris3}
                onValueChangeGiris={props.onValueChangeGiris3}
                onPressCheckBox={props.onPressCheckBox3}
                checkedCheckBox={props.checkedCheckBox3}
            />
        </View>
    )
}
arrayListEdit = (param) => {
    var data;
    if (param == null || param == "") {
        data = ""
    }
    else {
        data = "-" + param
    }
    return data
}
export const KuralTabanlıSubProp = props => {

    return (
        <View style={{ backgroundColor: '#ddd', borderRadius: 4, marginVertical: 2, padding: 5 }} >
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bbb', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                    <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>{props.deviceTitle}</Text>
                </View>
                <View style={{ flex: 2, flexDirection: 'row', }}>
                    <View style={{ width: '100%', }}>
                        <Picker
                            mode="dialog"
                            placeholder={props.devicePlaceHolder}
                            placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                            style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, }}
                            selectedValue={props.selectedValueDevice}
                            onValueChange={props.onValueChangeDevice}
                            headerBackButtonText="Geri"
                            iosHeader={props.deviceTitle}
                            headerTitleStyle={{ fontSize: 16, }}
                            textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                        >
                            {
                                props.arrayDevices.map((data) => {
                                    return (
                                        <Picker.Item label={data.module_id + arrayListEdit(data.location_name)} value={data.module_id} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    <View style={{ position: 'absolute', flexDirection: 'row', right: 0, bottom: 0, top: 0, }}>
                        <View style={{ flex: 1, }}>
                            <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bbb', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                    <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Giriş</Text>
                </View>
                <View style={{ flex: 2, flexDirection: 'row', }}>
                    <View style={{ flex: 1, }}>
                        <Picker
                            mode="dialog"
                            placeholder={props.girisPlaceHolder}
                            placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                            style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', borderTopRightRadius: 4, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                            selectedValue={props.selectedValueGiris}
                            onValueChange={props.onValueChangeGiris}
                            headerBackButtonText="Geri"
                            iosHeader="Giriş"
                            headerTitleStyle={{ fontSize: 16, }}
                            textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                        >
                            {
                                props.arrayGiris.map((data) => {
                                    return (
                                        <Picker.Item label={data} value={data} />
                                    )
                                })
                            }
                        </Picker>
                        <View style={{ position: 'absolute', flexDirection: 'row', right: 0, bottom: 0, top: 0, }}>
                            <View style={{ flex: 1, }}>
                                <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 0.7, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: '300' }}>Tersle</Text><CheckBox onPress={props.onPressCheckBox} checked={props.checkedCheckBox} />
                    </View>
                </View>
            </View>
        </View>
    )
}
export const AnalogKontrolluSubProp = props => {

    return (
        <View style={{ backgroundColor: '#ddd', borderRadius: 4, marginVertical: 2, padding: 5 }} >
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bbb', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                    <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>{props.deviceTitle}</Text>
                </View>
                <View style={{ flex: 2, flexDirection: 'row', }}>
                    <View style={{ width: '100%', }}>
                        <Picker
                            mode="dialog"
                            placeholder={props.devicePlaceHolder}
                            placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                            style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                            selectedValue={props.selectedValueDevice}
                            onValueChange={props.onValueChangeDevice}
                            headerBackButtonText="Geri"
                            iosHeader={props.deviceTitle}
                            headerTitleStyle={{ fontSize: 16, }}
                            textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                        >
                            {
                                props.arrayDevices.map((data) => {
                                    return (
                                        <Picker.Item label={data.measuring_device_id + arrayListEdit(data.location_name)} value={data.measuring_device_id} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    <View style={{ position: 'absolute', flexDirection: 'row', right: 0, bottom: 0, top: 0, }}>
                        <View style={{ flex: 1, }}>
                            <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bbb', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                    <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Giriş</Text>
                </View>
                <View style={{ flex: 2, flexDirection: 'row', }}>
                    <View style={{ flex: 1, }}>
                        <Picker
                            mode="dialog"
                            placeholder={props.girisPlaceHolder}
                            placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                            style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', borderTopRightRadius: 4, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                            selectedValue={props.selectedValueGiris}
                            onValueChange={props.onValueChangeGiris}
                            headerBackButtonText="Geri"
                            iosHeader="Giriş"
                            headerTitleStyle={{ fontSize: 16, }}
                            textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                        >
                            {
                                props.arrayGiris.map((data) => {
                                    return (
                                        <Picker.Item label={data} value={data} />
                                    )
                                })
                            }
                        </Picker>
                        <View style={{ position: 'absolute', flexDirection: 'row', right: 0, bottom: 0, top: 0, }}>
                            <View style={{ flex: 1, }}>
                                <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
export const SıcaklıkKontrollü = props => {

    return (
        <View>
            <View style={{ width: '100%', backgroundColor: '#ddd', borderRadius: 4, marginTop: 5, padding: 10, }}>
                <Text style={{ textAlign: 'center', fontSize: 16 }}>Sıcaklık Sensörlü Kontrol Ayarları</Text>
            </View>
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

            <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                    <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Histerezis</Text>
                </View>
                <View style={{ flex: 2, flexDirection: 'row' }}>
                    <View style={{ flex: 1, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                        <TextInput
                            style={{ height: 40, width: '100%', textAlign: 'center' }}
                            onChangeText={props.onChangeHisterezis}
                            value={props.HisterezisDeger}
                            placeholder={props.HisterezisDeger.toString()}
                            placeholderTextColor="black"
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            </View>

            <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                    <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>({props.sıcaklıkBaslangıc}) - ({props.sıcaklıkBitis}) ℃ Arasında</Text>
                </View>
                <View style={{ flex: 2, flexDirection: 'row', }}>
                    <View style={{ flex: 1, }}>
                        <Picker
                            mode="dialog"
                            placeholder={props.SıcaklıkPlaceHolder}
                            placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                            style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', borderTopRightRadius: 4, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                            selectedValue={props.selectedValueSıcaklık}
                            onValueChange={props.onValueChangeSıcaklık}
                            headerBackButtonText="Geri"
                            iosHeader={props.sıcaklıkBaslangıc + " - " + props.sıcaklıkBitis + " ℃ Arasında"}
                            headerTitleStyle={{ fontSize: 10, }}
                            textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                        >
                            <Picker.Item label="Çıkış Ver" value={1} />
                            <Picker.Item label="Çıkış Verme" value={0} />

                        </Picker>
                        <View style={{ position: 'absolute', flexDirection: 'row', right: 0, bottom: 0, top: 0, }}>
                            <View style={{ flex: 1, }}>
                                <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 2, }}>
                    <MultiSelect
                        items={props.items}
                        uniqueKey="measuring_device_id"
                        onSelectedItemsChange={props.onSelectedItemsChange}
                        selectedItems={props.selectedItems}
                        selectText="Sensör seçiniz"
                        searchInputPlaceholderText="Sensör ara..."
                        onChangeInput={(text) => console.log(text)}
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="measuring_device_id"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="#CCC"
                        submitButtonText="Ekle"
                        styleDropdownMenuSubsection={{ height: 45, backgroundColor: '#ccc', paddingLeft: 5, borderRadius: 4 }}
                    />
                </View>
            </View>
        </View >
    )
}
export const GunlukCizelge = props => {

    return (
        <View>
            <View style={{ width: '100%', backgroundColor: '#ddd', borderRadius: 4, marginTop: 5, padding: 10, }}>
                <Text style={{ textAlign: 'center', fontSize: 16 }}>Günlük Program</Text>
            </View>
            <View style={{ width: '100%', marginTop: 5, borderRadius: 4, backgroundColor: '#ddd', }}>
                <Text style={{ textAlign: 'center', }}>Açık Saatler</Text>
                <View style={{ backgroundColor: '#ddd', flexDirection: 'row', borderRadius: 4 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc', margin: 5, borderRadius: 4 }}>
                        <TouchableOpacity onPress={props.onPressBaslangıc} style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                            <Text style={{ textAlign: 'left' }}>Başlangıç Saati</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', top: 2 }}>
                                <Icon type="FontAwesome5" name="clock" style={{ fontSize: 25 }} /><Text style={{ fontSize: 16 }}> {props.baslangıcValue}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc', margin: 5, borderRadius: 4 }}>
                        <TouchableOpacity onPress={props.onPressBitis} style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                            <Text style={{ textAlign: 'left' }}>Bitiş Saati</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', top: 2 }}>
                                <Icon type="FontAwesome5" name="clock" style={{ fontSize: 25 }} /><Text style={{ fontSize: 16 }}> {props.bitisValue}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc', margin: 5, borderRadius: 4 }}>
                    <TouchableOpacity onPress={props.onPressSaatEkle} style={{ width: '100%', height: 35, justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: '#429A8C', borderRadius: 4 }}>
                        <Text style={{ textAlign: 'left', color: 'white', fontSize: 16 }}>Ekle</Text>
                    </TouchableOpacity>
                </View>
                <DateTimePickerModal
                    headerTextIOS="Başlangıç Saati"
                    confirmTextIOS="Tamam"
                    isVisible={props.isVisibleBaslangıc}
                    mode="time"
                    onConfirm={props.onConfirmBaslangıc}
                    onCancel={props.onCancelBaslangıc}
                    cancelTextIOS="İptal"
                />
                <DateTimePickerModal
                    headerTextIOS="Bitiş Saati"
                    confirmTextIOS="Tamam"
                    isVisible={props.isVisibleBitis}
                    mode="time"
                    onConfirm={props.onConfirmBitis}
                    onCancel={props.onCancelBitis}
                    cancelTextIOS="İptal"
                />
            </View>
        </View >
    )
}
export const HaftalıkCizelge = props => {
    var arrayHafta = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]
    return (
        <View>
            <View style={{ width: '100%', backgroundColor: '#ddd', borderRadius: 4, marginTop: 5, padding: 10, }}>
                <Text style={{ textAlign: 'center', fontSize: 16 }}>Haftalık Program</Text>
            </View>
            <View style={{ width: '100%', marginTop: 5, borderRadius: 4, backgroundColor: '#ddd', }}>
                <Text style={{ textAlign: 'center', marginTop: 3 }}>Açık Saatler</Text>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5, padding: 5 }}>
                    <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bbb', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Gün Seçin</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', }}>
                        <View style={{ width: '100%', }}>
                            <Picker
                                mode="dialog"
                                placeholder="Gün Seç"
                                placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                                style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                selectedValue={props.selectedValueWeek}
                                onValueChange={props.onValueChangeWeek}
                                headerBackButtonText="Geri"
                                iosHeader="Gün Seçin"
                                headerTitleStyle={{ fontSize: 16, }}
                                textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                            >
                                {
                                    arrayHafta.map((data) => {
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
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: '#ddd', flexDirection: 'row', borderRadius: 4 }}>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc', margin: 5, borderRadius: 4 }}>
                        <TouchableOpacity onPress={props.onPressBaslangıc} style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                            <Text style={{ textAlign: 'left' }}>Başlangıç Saati</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', top: 2 }}>
                                <Icon type="FontAwesome5" name="clock" style={{ fontSize: 25 }} /><Text style={{ fontSize: 16 }}> {props.baslangıcValue}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc', margin: 5, borderRadius: 4 }}>
                        <TouchableOpacity onPress={props.onPressBitis} style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                            <Text style={{ textAlign: 'left' }}>Bitiş Saati</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', top: 2 }}>
                                <Icon type="FontAwesome5" name="clock" style={{ fontSize: 25 }} /><Text style={{ fontSize: 16 }}> {props.bitisValue}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc', margin: 5, borderRadius: 4 }}>
                    <TouchableOpacity onPress={props.onPressKaydet} style={{ width: '100%', height: 35, justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: '#429A8C', borderRadius: 4 }}>
                        <Text style={{ textAlign: 'left', color: 'white', fontSize: 16 }}>Ekle</Text>
                    </TouchableOpacity>
                </View>
                <DateTimePickerModal
                    headerTextIOS="Başlangıç Saati"
                    confirmTextIOS="Tamam"
                    isVisible={props.isVisibleBaslangıc}
                    mode="time"
                    onConfirm={props.onConfirmBaslangıc}
                    onCancel={props.onCancelBaslangıc}
                    cancelTextIOS="İptal"
                />
                <DateTimePickerModal
                    headerTextIOS="Bitiş Saati"
                    confirmTextIOS="Tamam"
                    isVisible={props.isVisibleBitis}
                    mode="time"
                    onConfirm={props.onConfirmBitis}
                    onCancel={props.onCancelBitis}
                    cancelTextIOS="İptal"
                />
            </View>
        </View >
    )
}
export const AnalogKontrollu = props => {

    return (
        <View>
            <View style={{ width: '100%', backgroundColor: '#ddd', borderRadius: 4, marginTop: 5, padding: 10, }}>
                <Text style={{ textAlign: 'center', fontSize: 16 }}>Analog Giriş Kontrol Ayarları</Text>
            </View>
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
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                    <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>Alt Limitin ({props.sıcaklıkBaslangıc}) Altında</Text>
                </View>
                <View style={{ flex: 2, flexDirection: 'row', }}>
                    <View style={{ flex: 1, }}>
                        <Picker
                            mode="dialog"
                            placeholder={props.SıcaklıkPlaceHolder}
                            placeholderStyle={{ width: '100%', color: "#E26A6A", fontSize: 16, }}
                            style={{ width: '100%', height: 40, color: '#E26A6A', backgroundColor: '#ccc', borderTopRightRadius: 4, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                            selectedValue={props.selectedValueSıcaklık}
                            onValueChange={props.onValueChangeSıcaklık}
                            headerBackButtonText="Geri"
                            iosHeader={"Alt Limitin " + props.sıcaklıkBaslangıc + " Altında"}
                            headerTitleStyle={{ fontSize: 10, }}
                            textStyle={{ color: '#E26A6A', fontSize: 16, height: 40, top: 10, left: -7 }}
                        >
                            <Picker.Item label="Çıkış Ver" value={1} />
                            <Picker.Item label="Çıkış Verme" value={0} />

                        </Picker>
                        <View style={{ position: 'absolute', flexDirection: 'row', right: 0, bottom: 0, top: 0, }}>
                            <View style={{ flex: 1, }}>
                                <Icon type="FontAwesome5" name="arrow-down" style={{ fontSize: 18, position: 'absolute', right: 5, color: '#E26A6A', top: 10 }} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <AnalogKontrolluSubProp deviceTitle="1.Cihaz"
                devicePlaceHolder={props.devicePlaceHolder1}
                selectedValueDevice={props.selectedValueDevice1}
                onValueChangeDevice={props.onValueChangeDevice1}
                arrayDevices={props.arrayDevices}
                arrayGiris={props.arrayGiris1}
                girisPlaceHolder={props.girisPlaceHolder1}
                selectedValueGiris={props.selectedValueGiris1}
                onValueChangeGiris={props.onValueChangeGiris1}
            />
            <AnalogKontrolluSubProp deviceTitle="2.Cihaz"
                devicePlaceHolder={props.devicePlaceHolder2}
                selectedValueDevice={props.selectedValueDevice2}
                onValueChangeDevice={props.onValueChangeDevice2}
                arrayDevices={props.arrayDevices}
                arrayGiris={props.arrayGiris2}
                girisPlaceHolder={props.girisPlaceHolder2}
                selectedValueGiris={props.selectedValueGiris2}
                onValueChangeGiris={props.onValueChangeGiris2}
                onPressCheckBox={props.onPressCheckBox2}
                checkedCheckBox={props.checkedCheckBox2}
            />
            <AnalogKontrolluSubProp deviceTitle="3.Cihaz"
                devicePlaceHolder={props.devicePlaceHolder3}
                selectedValueDevice={props.selectedValueDevice3}
                onValueChangeDevice={props.onValueChangeDevice3}
                arrayDevices={props.arrayDevices}
                arrayGiris={props.arrayGiris3}
                girisPlaceHolder={props.girisPlaceHolder3}
                selectedValueGiris={props.selectedValueGiris3}
                onValueChangeGiris={props.onValueChangeGiris3}
                onPressCheckBox={props.onPressCheckBox3}
                checkedCheckBox={props.checkedCheckBox3}
            />
        </View >
    )
}
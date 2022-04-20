import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, TextInput, Alert } from 'react-native';
import { SlidersColorPicker } from '../UseNodeModule/react-native-color';
import tinycolor from 'tinycolor2';
import { Icon } from 'native-base';
import * as Animatable from 'react-native-animatable';

export const MainInput = props => {
    // var color = ["#FFC300", "#80D8FF", "#FF5733", "#31E36F", "#7F6DEA", "#E49C73", "#D96CC3", "#CDB1B1"]
    // var item = color[Math.floor(Math.random() * color.length)];
    // const randomColor = item

    return (
        <View style={{ margin: 5, backgroundColor: '#ddd', borderRadius: 4 }}>
            <View style={{ width: '100%', paddingVertical: 10, alignItems: 'center', }}>
                <Animatable.View iterationCount={1} animation="pulse" style={{ width: '95%', height: 40, backgroundColor: "#bbb", borderRadius: 4 }}>
                    <TouchableOpacity onPress={props.DetailOpen} style={{ width: '100%', height: 40, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular' }}>{props.GirisBaslık} Detayları</Text>
                        <View style={{ position: 'absolute', right: 5, }}>
                            <Icon type="FontAwesome5" name={props.Opened ? "arrow-up" : "arrow-down"} style={{ color: '#2E2E2E', fontSize: 25 }} />
                        </View>
                    </TouchableOpacity>
                </Animatable.View>
                {
                    props.Opened &&

                    <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#bbb', borderRadius: 4, paddingVertical: 10, marginVertical: 3 }}>
                        <SlidersColorPicker
                            visible={props.VisibleDurum1}
                            color={props.ColorDurum1}
                            onCancel={props.CloseDurum1}
                            onOk={props.SubmitDurum1}
                            swatches={props.SwatchesDurum1}
                            returnMode={'hex'}
                            swatchesLabel="Örnek Renkler"
                            okLabel="Tamam"
                            cancelLabel="İptal"
                        />
                        <View style={{ width: '95%', backgroundColor: '#ccc', flexDirection: 'row', borderRadius: 4, marginHorizontal: 20, marginVertical: 3 }}>
                            <View style={{ flex: 1, }}>
                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>{props.GirisBaslık + "1 Durumu"}</Text>
                                    </View>
                                    <View style={{ flex: 1.5, flexDirection: 'row', backgroundColor: 'white', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                            <TextInput
                                                style={{ height: 35, width: '100%', textAlign: 'center' }}
                                                onChangeText={props.OnChangeGirisDurum1Text}
                                                value={props.GirisDurum1Text}
                                                placeholder={props.GirisDurum1Text == "" ? "Bu giriş için bir isim girin..." : props.GirisDurum1Text}
                                                placeholderTextColor="black"
                                                keyboardType="default"
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ width: '95%', backgroundColor: '#ccc', flexDirection: 'row', borderRadius: 4, marginHorizontal: 20, marginVertical: 3, }}>
                            <View style={{ flex: 1, }}>
                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>{props.GirisBaslık + "1 Durumu Renk"}</Text>
                                    </View>
                                    <View style={{ flex: 1.5, flexDirection: 'row' }}>
                                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}>
                                            <TouchableOpacity
                                                onPress={props.GirisDurum1ModalOpen}
                                                style={[{ backgroundColor: tinycolor(props.GirisDurum1Renk).toHexString(), height: 35, width: '100%', borderTopRightRadius: 4, borderBottomRightRadius: 4 }]}
                                            >
                                                <Text style={[styles.colorString]}>
                                                    {tinycolor(props.GirisDurum1Renk).toHexString()}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                }
                {
                    props.Opened &&

                    <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#bbb', borderRadius: 4, paddingVertical: 10, }}>
                        <SlidersColorPicker
                            visible={props.VisibleDurum0}
                            color={props.ColorDurum0}
                            onCancel={props.CloseDurum0}
                            onOk={props.SubmitDurum0}
                            swatches={props.SwatchesDurum0}
                            returnMode={'hex'}
                            swatchesLabel="Örnek Renkler"
                            okLabel="Tamam"
                            cancelLabel="İptal"
                        />
                        <View style={{ width: '95%', backgroundColor: '#ccc', flexDirection: 'row', borderRadius: 4, marginHorizontal: 20, marginVertical: 3 }}>
                            <View style={{ flex: 1, }}>
                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>{props.GirisBaslık + "0 Durumu"}</Text>
                                    </View>
                                    <View style={{ flex: 1.5, flexDirection: 'row', backgroundColor: 'white', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                            <TextInput
                                                style={{ height: 35, width: '100%', textAlign: 'center' }}
                                                onChangeText={props.OnChangeGirisDurum0Text}
                                                value={props.GirisDurum0Text}
                                                placeholder={props.GirisDurum0Text == "" ? "Bu giriş için bir isim girin..." : props.GirisDurum0Text}
                                                placeholderTextColor="black"
                                                keyboardType="default"
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ width: '95%', backgroundColor: '#ccc', flexDirection: 'row', borderRadius: 4, marginHorizontal: 20, marginVertical: 3 }}>
                            <View style={{ flex: 1, }}>
                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                                        <Text style={{ fontSize: 14, color: '#444', textAlign: 'center' }}>{props.GirisBaslık + "0 Durumu Renk"}</Text>
                                    </View>
                                    <View style={{ flex: 1.5, flexDirection: 'row' }}>
                                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity
                                                onPress={props.GirisDurum0ModalOpen}
                                                style={[{ backgroundColor: tinycolor(props.GirisDurum0Renk).toHexString(), height: 35, width: '100%', borderTopRightRadius: 4, borderBottomRightRadius: 4 }]}
                                            >
                                                <Text style={[styles.colorString]}>
                                                    {tinycolor(props.GirisDurum0Renk).toHexString()}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                }
            </View>

        </View >
    )
}
export const GRPSettingsComponent = props => {
    return (
        <View>
            <MainInput
                Opened={props.Giris1Opened}
                DetailOpen={props.Giris1PressOpen}
                VisibleDurum1={props.Giris1Durum1Modal}
                ColorDurum1={props.Giris1Durum1Color}
                CloseDurum1={props.OnCancel1}
                SubmitDurum1={props.OnOk1}
                SwatchesDurum1={props.Swatches}
                GirisBaslık="(Giriş 1) "
                OnChangeGirisDurum1Text={props.OnChangeGiris1Durum1}
                GirisDurum1Text={props.Giris1Durum1}
                GirisDurum1ModalOpen={props.Giris1Durum1ModalOpen}
                GirisDurum1Renk={props.Giris1Durum1Color}

                VisibleDurum0={props.Giris1Durum0Modal}
                ColorDurum0={props.Giris1Durum0Color}
                CloseDurum0={props.OnCancel2}
                SubmitDurum0={props.OnOk2}
                SwatchesDurum0={props.Swatches}
                OnChangeGirisDurum0Text={props.OnChangeGiris1Durum0}
                GirisDurum0Text={props.Giris1Durum0}
                GirisDurum0ModalOpen={props.Giris1Durum0ModalOpen}
                GirisDurum0Renk={props.Giris1Durum0Color}
            />
            <MainInput
                Opened={props.Giris2Opened}
                DetailOpen={props.Giris2PressOpen}
                VisibleDurum1={props.Giris2Durum1Modal}
                ColorDurum1={props.Giris2Durum1Color}
                CloseDurum1={props.OnCancel3}
                SubmitDurum1={props.OnOk3}
                SwatchesDurum1={props.Swatches}
                GirisBaslık="(Giriş 2) "
                OnChangeGirisDurum1Text={props.OnChangeGiris2Durum1}
                GirisDurum1Text={props.Giris2Durum1}
                GirisDurum1ModalOpen={props.Giris2Durum1ModalOpen}
                GirisDurum1Renk={props.Giris2Durum1Color}

                VisibleDurum0={props.Giris2Durum0Modal}
                ColorDurum0={props.Giris2Durum0Color}
                CloseDurum0={props.OnCancel4}
                SubmitDurum0={props.OnOk4}
                SwatchesDurum0={props.Swatches}
                OnChangeGirisDurum0Text={props.OnChangeGiris2Durum0}
                GirisDurum0Text={props.Giris2Durum0}
                GirisDurum0ModalOpen={props.Giris2Durum0ModalOpen}
                GirisDurum0Renk={props.Giris2Durum0Color}
            />

        </View>
    )
}
export const G1SettingsComponent = props => {
    return (
        <View>
            <MainInput
                Opened={props.Giris1Opened}
                DetailOpen={props.Giris1PressOpen}
                VisibleDurum1={props.Giris1Durum1Modal}
                ColorDurum1={props.Giris1Durum1Color}
                CloseDurum1={props.OnCancel1}
                SubmitDurum1={props.OnOk1}
                SwatchesDurum1={props.Swatches}
                GirisBaslık="(Giriş 1) "
                OnChangeGirisDurum1Text={props.OnChangeGiris1Durum1}
                GirisDurum1Text={props.Giris1Durum1}
                GirisDurum1ModalOpen={props.Giris1Durum1ModalOpen}
                GirisDurum1Renk={props.Giris1Durum1Color}

                VisibleDurum0={props.Giris1Durum0Modal}
                ColorDurum0={props.Giris1Durum0Color}
                CloseDurum0={props.OnCancel2}
                SubmitDurum0={props.OnOk2}
                SwatchesDurum0={props.Swatches}
                OnChangeGirisDurum0Text={props.OnChangeGiris1Durum0}
                GirisDurum0Text={props.Giris1Durum0}
                GirisDurum0ModalOpen={props.Giris1Durum0ModalOpen}
                GirisDurum0Renk={props.Giris1Durum0Color}
            />
            <MainInput
                Opened={props.Giris2Opened}
                DetailOpen={props.Giris2PressOpen}
                VisibleDurum1={props.Giris2Durum1Modal}
                ColorDurum1={props.Giris2Durum1Color}
                CloseDurum1={props.OnCancel3}
                SubmitDurum1={props.OnOk3}
                SwatchesDurum1={props.Swatches}
                GirisBaslık="(Giriş 2) "
                OnChangeGirisDurum1Text={props.OnChangeGiris2Durum1}
                GirisDurum1Text={props.Giris2Durum1}
                GirisDurum1ModalOpen={props.Giris2Durum1ModalOpen}
                GirisDurum1Renk={props.Giris2Durum1Color}

                VisibleDurum0={props.Giris2Durum0Modal}
                ColorDurum0={props.Giris2Durum0Color}
                CloseDurum0={props.OnCancel4}
                SubmitDurum0={props.OnOk4}
                SwatchesDurum0={props.Swatches}
                OnChangeGirisDurum0Text={props.OnChangeGiris2Durum0}
                GirisDurum0Text={props.Giris2Durum0}
                GirisDurum0ModalOpen={props.Giris2Durum0ModalOpen}
                GirisDurum0Renk={props.Giris2Durum0Color}
            />
            <MainInput
                Opened={props.Giris3Opened}
                DetailOpen={props.Giris3PressOpen}
                VisibleDurum1={props.Giris3Durum1Modal}
                ColorDurum1={props.Giris3Durum1Color}
                CloseDurum1={props.OnCancel5}
                SubmitDurum1={props.OnOk5}
                SwatchesDurum1={props.Swatches}
                GirisBaslık="(Giriş 3) "
                OnChangeGirisDurum1Text={props.OnChangeGiris3Durum1}
                GirisDurum1Text={props.Giris3Durum1}
                GirisDurum1ModalOpen={props.Giris3Durum1ModalOpen}
                GirisDurum1Renk={props.Giris3Durum1Color}

                VisibleDurum0={props.Giris3Durum0Modal}
                ColorDurum0={props.Giris3Durum0Color}
                CloseDurum0={props.OnCancel6}
                SubmitDurum0={props.OnOk6}
                SwatchesDurum0={props.Swatches}
                OnChangeGirisDurum0Text={props.OnChangeGiris3Durum0}
                GirisDurum0Text={props.Giris3Durum0}
                GirisDurum0ModalOpen={props.Giris3Durum0ModalOpen}
                GirisDurum0Renk={props.Giris3Durum0Color}
            />
            <MainInput
                Opened={props.Giris4Opened}
                DetailOpen={props.Giris4PressOpen}
                VisibleDurum1={props.Giris4Durum1Modal}
                ColorDurum1={props.Giris4Durum1Color}
                CloseDurum1={props.OnCancel7}
                SubmitDurum1={props.OnOk7}
                SwatchesDurum1={props.Swatches}
                GirisBaslık="(Giriş 4) "
                OnChangeGirisDurum1Text={props.OnChangeGiris4Durum1}
                GirisDurum1Text={props.Giris4Durum1}
                GirisDurum1ModalOpen={props.Giris4Durum1ModalOpen}
                GirisDurum1Renk={props.Giris4Durum1Color}

                VisibleDurum0={props.Giris4Durum0Modal}
                ColorDurum0={props.Giris4Durum0Color}
                CloseDurum0={props.OnCancel8}
                SubmitDurum0={props.OnOk8}
                SwatchesDurum0={props.Swatches}
                OnChangeGirisDurum0Text={props.OnChangeGiris4Durum0}
                GirisDurum0Text={props.Giris4Durum0}
                GirisDurum0ModalOpen={props.Giris4Durum0ModalOpen}
                GirisDurum0Renk={props.Giris4Durum0Color}
            />
            <MainInput
                Opened={props.Giris5Opened}
                DetailOpen={props.Giris5PressOpen}
                VisibleDurum1={props.Giris5Durum1Modal}
                ColorDurum1={props.Giris5Durum1Color}
                CloseDurum1={props.OnCancel9}
                SubmitDurum1={props.OnOk9}
                SwatchesDurum1={props.Swatches}
                GirisBaslık="(Giriş 5) "
                OnChangeGirisDurum1Text={props.OnChangeGiris5Durum1}
                GirisDurum1Text={props.Giris5Durum1}
                GirisDurum1ModalOpen={props.Giris5Durum1ModalOpen}
                GirisDurum1Renk={props.Giris5Durum1Color}

                VisibleDurum0={props.Giris5Durum0Modal}
                ColorDurum0={props.Giris5Durum0Color}
                CloseDurum0={props.OnCancel10}
                SubmitDurum0={props.OnOk10}
                SwatchesDurum0={props.Swatches}
                OnChangeGirisDurum0Text={props.OnChangeGiris5Durum0}
                GirisDurum0Text={props.Giris5Durum0}
                GirisDurum0ModalOpen={props.Giris5Durum0ModalOpen}
                GirisDurum0Renk={props.Giris5Durum0Color}
            />
            <MainInput
                Opened={props.Giris6Opened}
                DetailOpen={props.Giris6PressOpen}
                VisibleDurum1={props.Giris6Durum1Modal}
                ColorDurum1={props.Giris6Durum1Color}
                CloseDurum1={props.OnCancel11}
                SubmitDurum1={props.OnOk11}
                SwatchesDurum1={props.Swatches}
                GirisBaslık="(Giriş 6) "
                OnChangeGirisDurum1Text={props.OnChangeGiris6Durum1}
                GirisDurum1Text={props.Giris6Durum1}
                GirisDurum1ModalOpen={props.Giris6Durum1ModalOpen}
                GirisDurum1Renk={props.Giris6Durum1Color}

                VisibleDurum0={props.Giris6Durum0Modal}
                ColorDurum0={props.Giris6Durum0Color}
                CloseDurum0={props.OnCancel12}
                SubmitDurum0={props.OnOk12}
                SwatchesDurum0={props.Swatches}
                OnChangeGirisDurum0Text={props.OnChangeGiris6Durum0}
                GirisDurum0Text={props.Giris6Durum0}
                GirisDurum0ModalOpen={props.Giris6Durum0ModalOpen}
                GirisDurum0Renk={props.Giris6Durum0Color}
            />
            <MainInput
                Opened={props.Giris7Opened}
                DetailOpen={props.Giris7PressOpen}
                VisibleDurum1={props.Giris7Durum1Modal}
                ColorDurum1={props.Giris7Durum1Color}
                CloseDurum1={props.OnCancel13}
                SubmitDurum1={props.OnOk13}
                SwatchesDurum1={props.Swatches}
                GirisBaslık="(Giriş 7) "
                OnChangeGirisDurum1Text={props.OnChangeGiris7Durum1}
                GirisDurum1Text={props.Giris7Durum1}
                GirisDurum1ModalOpen={props.Giris7Durum1ModalOpen}
                GirisDurum1Renk={props.Giris7Durum1Color}

                VisibleDurum0={props.Giris7Durum0Modal}
                ColorDurum0={props.Giris7Durum0Color}
                CloseDurum0={props.OnCancel14}
                SubmitDurum0={props.OnOk14}
                SwatchesDurum0={props.Swatches}
                OnChangeGirisDurum0Text={props.OnChangeGiris7Durum0}
                GirisDurum0Text={props.Giris7Durum0}
                GirisDurum0ModalOpen={props.Giris7Durum0ModalOpen}
                GirisDurum0Renk={props.Giris7Durum0Color}
            />
            <MainInput
                Opened={props.Giris8Opened}
                DetailOpen={props.Giris8PressOpen}
                VisibleDurum1={props.Giris8Durum1Modal}
                ColorDurum1={props.Giris8Durum1Color}
                CloseDurum1={props.OnCancel15}
                SubmitDurum1={props.OnOk15}
                SwatchesDurum1={props.Swatches}
                GirisBaslık="(Giriş 8) "
                OnChangeGirisDurum1Text={props.OnChangeGiris8Durum1}
                GirisDurum1Text={props.Giris8Durum1}
                GirisDurum1ModalOpen={props.Giris8Durum1ModalOpen}
                GirisDurum1Renk={props.Giris8Durum1Color}

                VisibleDurum0={props.Giris8Durum0Modal}
                ColorDurum0={props.Giris8Durum0Color}
                CloseDurum0={props.OnCancel16}
                SubmitDurum0={props.OnOk16}
                SwatchesDurum0={props.Swatches}
                OnChangeGirisDurum0Text={props.OnChangeGiris8Durum0}
                GirisDurum0Text={props.Giris8Durum0}
                GirisDurum0ModalOpen={props.Giris8Durum0ModalOpen}
                GirisDurum0Renk={props.Giris8Durum0Color}
            />
        </View>
    )
}
export const InputErrorComponent = props => {
    return (
        <View style={{ flex: 1, backgroundColor: '#FCF8E3', margin: 10, borderRadius: 6 }}>
            <View style={{ height: 60, backgroundColor: '#FCF8E3', justifyContent: 'center', alignItems: 'center', borderRadius: 6 }}>
                <Text style={{ color: '#8a6d3b' }}>Bu sayfada giriş ayarları listelenmektedir</Text>
                <TouchableOpacity onPress={props.IOListele} style={{ backgroundColor: '#62B1F6', height: 30, width: '50%', justifyContent: 'center', alignItems: 'center', borderRadius: 6, flexDirection: 'row', marginTop: 5 }} >
                    <Icon type="FontAwesome5" name="backspace" style={{ fontSize: 20, color: 'white' }} /><Text style={{ color: 'white' }}> IO Listele</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    sectionText: {
        marginTop: 32,
        color: '#222',
        fontSize: 22,
        lineHeight: 28,
        ...Platform.select({
            android: {
                fontFamily: 'sans-serif-medium'
            },
            ios: {
                fontWeight: '600',
                letterSpacing: 0.75
            }
        })
    },



    sliderRow: {
        alignSelf: 'stretch',
        marginLeft: 12,
        marginTop: 12
    },
    colorString: {
        fontSize: 24,
        lineHeight: 41,
        ...Platform.select({
            android: {
                fontFamily: 'monospace'
            },
            ios: {
                fontFamily: 'Courier New',
                fontWeight: '600',
                letterSpacing: 0.75
            }
        }),
        textAlign: 'center'
    }
});
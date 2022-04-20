import React, { Component } from 'react';
import { View, Text, Switch, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, Root, Spinner, Toast } from 'native-base';
import { ReaktifLimit, Haberlesme, Gerilim, DengesizAkım, _5aYüksekAkım, DemandAsımı, ExportDemandAsımı, YuksekAkım, Sıcaklık, EnerjiTuketim, SuresizAydınlatma, AstronomikAydınlatma, ZamanaBaglıAkım } from '../../../backend/alarmDefinitionsController/getAlarmTypeDefinition';
import { AlarmDefinitionsRuleInfo, AlarmDefinitionsRuleUpdate } from '../../../backend/alarmDefinitionsController/AlarmDefinition';

class AlarmChangeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alarmRuleInfo: [],
            dataLoading: false,
            butonSpinner: false,
            preferences: false,
            alarmStatus: true,
            alarmEmail: true,
            alarmMobile: true,
            alarmTitle: "",
            reaktif_enduktifResult: "",
            reaktif_kapasitifResult: "",
            reaktif_tuketimResult: "",
            reaktif_periyodResult: "",
            reaktif_hesaplamaAralıgı: "",
            haberlesme_veriAlınamama: "",
            haberlesme_periyodResult: "",
            gerilim_altLimit: "",
            gerilim_ustLimit: "",
            gerilim_alarmSuresi: "",
            gerilim_periyodResult: "",
            dengesizAkım_alarmOlusma: "",
            dengesizAkım_periyodResult: "",
            dengesizAkım_AkımYoksa: false,
            _5aYüksekAkım_alarmOlusma: "",
            _5aYüksekAkım_periyodResult: "",
            demandAsım_saatlikLimit: "",
            demandAsım_periyodResult: "",
            exportDemandAsım_saatlikLimit: "",
            exportDemandAsım_periyodResult: "",
            yuksekAkım_ustLimit: 0.0,
            yuksekAkım_tekrarlama: "",
            sıcaklık_altLimit: 0.0,
            sıcaklık_ustLimit: 0.0,
            sıcaklık_tekrarlama: "",
            sıcaklık_limitTipi: "",
            enerjiTuketim_baslangicSaat1: "",
            enerjiTuketim_baslangicDakika1: "",
            enerjiTuketim_hesaplanacakSure1: "",
            enerjiTuketim_tuketimLimit1: "",
            enerjiTuketim_baslangicSaat2: "",
            enerjiTuketim_baslangicDakika2: "",
            enerjiTuketim_hesaplanacakSure2: "",
            enerjiTuketim_tuketimLimit2: "",
            suresizAydınlatma_akımOran: "",
            suresizAydınlatma_ofsetAkım1: "",
            suresizAydınlatma_ofsetAkım2: "",
            suresizAydınlatma_ofsetAkım3: "",
            suresizAydınlatma_mesajMetni: "",
            astronomikAydınlatma_gecikmeSuresi: "",
            astronomikAydınlatma_akımOran: "",
            astronomikAydınlatma_ofsetAkım1: "",
            astronomikAydınlatma_ofsetAkım2: "",
            astronomikAydınlatma_ofsetAkım3: "",
            astronomikAydınlatma_bosAkım1: "",
            astronomikAydınlatma_bosAkım2: "",
            astronomikAydınlatma_bosAkım3: "",
            astronomikAydınlatma_Lat: "",
            astronomikAydınlatma_Lon: "",
            zamanaBaglıAkım_akımOran: "",
            zamanaBaglıAkım_ofsetAkım1: "",
            zamanaBaglıAkım_ofsetAkım2: "",
            zamanaBaglıAkım_ofsetAkım3: "",
            zamanaBaglıAkım_mesajMetni: "",
            zamanaBaglıAkım_baslangıcSaat: "",
            zamanaBaglıAkım_baslangıcDakika: "",
            zamanaBaglıAkım_bitisSaat: "",
            zamanaBaglıAkım_bitisDakika: "",
            zamanaBaglıAkım_fazSayısı: "",
            zamanaBaglıAkım_Pazartesi: false,
            zamanaBaglıAkım_Salı: false,
            zamanaBaglıAkım_Carsamba: false,
            zamanaBaglıAkım_Persembe: false,
            zamanaBaglıAkım_Cuma: false,
            zamanaBaglıAkım_Cumartesi: false,
            zamanaBaglıAkım_Pazar: false
        }
    }
    UNSAFE_componentWillMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.PageDidFocus()
        });
    }

    PageDidFocus = async () => {
        const { alarmData, alarmdeviceID } = this.props;
        await AlarmDefinitionsRuleInfo(this, alarmdeviceID, alarmData.alarm_id == undefined ? -1 : alarmData.alarm_id, alarmData.alarm_type_id)
    }

    _renderContent(alarmData) {
        switch (alarmData.alarm_type_id) {
            case 1:
                return <ReaktifLimit

                    EnduktifLimitAzalt={() => this.setState({ reaktif_enduktifResult: parseInt(this.state.reaktif_enduktifResult) - 1 })}
                    EnduktifLimitArtır={() => this.setState({ reaktif_enduktifResult: parseInt(this.state.reaktif_enduktifResult) + 1 })}
                    EnduktifLimitDeger={this.state.reaktif_enduktifResult}
                    EnduktifLimitDisabled={this.state.reaktif_enduktifResult == "0" ? true : false}
                    onChangeEnduktifLimitDeger={(value) => this.setState({ reaktif_enduktifResult: value })}

                    KapasitifLimitAzalt={() => this.setState({ reaktif_kapasitifResult: parseInt(this.state.reaktif_kapasitifResult) - 1 })}
                    KapasitifLimitArtır={() => this.setState({ reaktif_kapasitifResult: parseInt(this.state.reaktif_kapasitifResult) + 1 })}
                    KapasitifLimitDeger={this.state.reaktif_kapasitifResult}
                    KapasitifLimitDisabled={this.state.reaktif_kapasitifResult == "0" ? true : false}
                    onChangeKapasitifLimitDeger={(value) => this.setState({ reaktif_kapasitifResult: value })}

                    TuketimLimitAzalt={() => this.setState({ reaktif_tuketimResult: parseInt(this.state.reaktif_tuketimResult) - 1 })}
                    TuketimLimitArtır={() => this.setState({ reaktif_tuketimResult: parseInt(this.state.reaktif_tuketimResult) + 1 })}
                    TuketimLimitDeger={this.state.reaktif_tuketimResult}
                    TuketimLimitDisabled={this.state.reaktif_tuketimResult == "0" ? true : false}
                    onChangeTuketimLimitDeger={(value) => this.setState({ reaktif_tuketimResult: value })}

                    AlarmPeriyodAzalt={() => this.setState({ reaktif_periyodResult: parseInt(this.state.reaktif_periyodResult) - 1 })}
                    AlarmPeriyodArtır={() => this.setState({ reaktif_periyodResult: parseInt(this.state.reaktif_periyodResult) + 1 })}
                    AlarmPeriyodDeger={this.state.reaktif_periyodResult}
                    AlarmPeriyodDisabled={this.state.reaktif_periyodResult <= "1" ? true : false}
                    onChangeAlarmPeriyodDeger={(value) => this.setState({ reaktif_periyodResult: value })}

                    selectedValueHesaplamaAralıgı={this.state.reaktif_hesaplamaAralıgı}
                    onValueChangeHesaplamaAralıgı={(value) => this.setState({ reaktif_hesaplamaAralıgı: value })}
                    HesaplamaAralıgıDeger={this.state.reaktif_hesaplamaAralıgı}

                />;
            case 3:
                return <Haberlesme
                    selectedValueVeriAlınamama={this.state.haberlesme_veriAlınamama}
                    onValueChangeVeriAlınamama={(value) => this.setState({ haberlesme_veriAlınamama: value })}
                    VeriAlınamamaDeger={this.state.haberlesme_veriAlınamama}

                    selectedValuePeriyod={this.state.haberlesme_periyodResult}
                    onValueChangePeriyod={(value) => this.setState({ haberlesme_periyodResult: value })}
                    PeriyodDeger={this.state.haberlesme_periyodResult}
                />;
            case 9:
                return <Gerilim

                    AltLimitAzalt={() => this.setState({ gerilim_altLimit: parseInt(this.state.gerilim_altLimit) - 1 })}
                    AltLimitArtır={() => this.setState({ gerilim_altLimit: parseInt(this.state.gerilim_altLimit) + 1 })}
                    AltLimitDeger={this.state.gerilim_altLimit}
                    AltLimitDisabled={this.state.gerilim_altLimit == "0" ? true : false}
                    onChangeAltLimitDeger={(value) => this.setState({ gerilim_altLimit: value })}

                    UstLimitAzalt={() => this.setState({ gerilim_ustLimit: parseInt(this.state.gerilim_ustLimit) - 1 })}
                    UstLimitArtır={() => this.setState({ gerilim_ustLimit: parseInt(this.state.gerilim_ustLimit) + 1 })}
                    UstLimitDeger={this.state.gerilim_ustLimit}
                    UstLimitDisabled={this.state.gerilim_ustLimit == "0" ? true : false}
                    onChangeUstLimitDeger={(value) => this.setState({ gerilim_ustLimit: value })}

                    AlarmSuresiAzalt={() => this.setState({ gerilim_alarmSuresi: parseInt(this.state.gerilim_alarmSuresi) - 1 })}
                    AlarmSuresiArtır={() => this.setState({ gerilim_alarmSuresi: parseInt(this.state.gerilim_alarmSuresi) + 1 })}
                    AlarmSuresiDeger={this.state.gerilim_alarmSuresi}
                    AlarmSuresiDisabled={this.state.gerilim_alarmSuresi == "0" ? true : false}
                    onChangeAlarmSuresiDeger={(value) => this.setState({ gerilim_alarmSuresi: value })}

                    AlarmPeriyodDeger={this.state.gerilim_periyodResult}
                    onChangeAlarmPeriyodDeger={(value) => this.setState({ gerilim_periyodResult: value })}

                    AlarmPeriyodAzalt={() => this.setState({ gerilim_periyodResult: parseInt(this.state.gerilim_periyodResult) - 1 })}
                    AlarmPeriyodArtır={() => this.setState({ gerilim_periyodResult: parseInt(this.state.gerilim_periyodResult) + 1 })}
                    AlarmPeriyodDeger={this.state.gerilim_periyodResult}
                    AlarmPeriyodDisabled={this.state.gerilim_periyodResult <= "1" ? true : false}
                />
            case 10:
                return <DengesizAkım

                    AlarmOlusmaSıklıgıAzalt={() => this.setState({ dengesizAkım_alarmOlusma: parseInt(this.state.dengesizAkım_alarmOlusma) - 1 })}
                    AlarmOlusmaSıklıgıArtır={() => this.setState({ dengesizAkım_alarmOlusma: parseInt(this.state.dengesizAkım_alarmOlusma) + 1 })}
                    AlarmOlusmaSıklıgıDeger={this.state.dengesizAkım_alarmOlusma}
                    AlarmOlusmaSıklıgıDisabled={this.state.dengesizAkım_alarmOlusma == "0" ? true : false}
                    onChangeAlarmOlusmaSıklıgıDeger={(value) => this.setState({ dengesizAkım_alarmOlusma: value })}

                    selectedValueAlarmPeriyod={this.state.dengesizAkım_periyodResult}
                    onValueChangeAlarmPeriyod={(value) => this.setState({ dengesizAkım_periyodResult: value })}
                    PeriyodDeger={this.state.dengesizAkım_periyodResult}

                    AkımYoksaDeger={this.state.dengesizAkım_AkımYoksa}
                    onValueChangeAkımYoksaDeger={(value) => this.setState({ dengesizAkım_AkımYoksa: value })}
                />
            case 11:
                return <_5aYüksekAkım

                    AlarmOlusmaSıklıgıAzalt={() => this.setState({ _5aYüksekAkım_alarmOlusma: parseInt(this.state._5aYüksekAkım_alarmOlusma) - 1 })}
                    AlarmOlusmaSıklıgıArtır={() => this.setState({ _5aYüksekAkım_alarmOlusma: parseInt(this.state._5aYüksekAkım_alarmOlusma) + 1 })}
                    AlarmOlusmaSıklıgıDeger={this.state._5aYüksekAkım_alarmOlusma}
                    AlarmOlusmaSıklıgıDisabled={this.state._5aYüksekAkım_alarmOlusma == "0" ? true : false}
                    onChangeAlarmOlusmaSıklıgıDeger={(value) => this.setState({ _5aYüksekAkım_alarmOlusma: value })}

                    selectedValueAlarmPeriyod={this.state._5aYüksekAkım_periyodResult}
                    onValueChangeAlarmPeriyod={(value) => this.setState({ _5aYüksekAkım_periyodResult: value })}
                    PeriyodDeger={this.state._5aYüksekAkım_periyodResult}
                />
            case 16:
                return <YuksekAkım

                    UstLimitAzalt={() => this.yuksekAkımUstLimitAzalt()}
                    UstLimitArtır={() => this.yuksekAkımUstLimitArtır()}
                    UstLimitDeger={this.state.yuksekAkım_ustLimit}
                    UstLimitDisabled={this.state.yuksekAkım_ustLimit == "0.00" ? true : false}
                    onChangeUstLimitDeger={(value) => this.setState({ yuksekAkım_ustLimit: value })}

                    selectedValueTekrarlama={this.state.yuksekAkım_tekrarlama}
                    onValueChangeTekrarlama={(value) => this.setState({ yuksekAkım_tekrarlama: value })}
                    tekrarlamaDeger={this.state.yuksekAkım_tekrarlama}
                />
            case 17:
                return <Sıcaklık

                    AltLimitAzalt={() => this.sıcaklıkAltLimitAzalt()}
                    AltLimitArtır={() => this.sıcaklıkAltLimitArtır()}
                    AltLimitDeger={this.state.sıcaklık_altLimit}
                    AltLimitDisabled={this.state.sıcaklık_altLimit == "0.00" ? true : false}
                    onChangeAltLimitDeger={(value) => this.setState({ sıcaklık_altLimit: value })}

                    UstLimitAzalt={() => this.sıcaklıkUstLimitAzalt()}
                    UstLimitArtır={() => this.sıcaklıkUstLimitArtır()}
                    UstLimitDeger={this.state.sıcaklık_ustLimit}
                    UstLimitDisabled={this.state.sıcaklık_ustLimit == "0.00" ? true : false}
                    onChangeUstLimitDeger={(value) => this.setState({ sıcaklık_ustLimit: value })}

                    selectedValueTekrarlama={this.state.sıcaklık_tekrarlama}
                    onValueChangeTekrarlama={(value) => this.setState({ sıcaklık_tekrarlama: value })}
                    tekrarlamaDeger={this.state.sıcaklık_tekrarlama}

                    altLimitGoster={this.state.sıcaklık_limitTipi}
                    checkedAlt={this.state.sıcaklık_limitTipi == 0 ? true : false}
                    onPressAlt={() => this.setState({ sıcaklık_limitTipi: 0, })}

                    ustLimitGoster={this.state.sıcaklık_limitTipi}
                    checkedUst={this.state.sıcaklık_limitTipi == 1 ? true : false}
                    onPressUst={() => this.setState({ sıcaklık_limitTipi: 1, })}

                    altUstGoster={this.state.sıcaklık_limitTipi}
                    checkedAltUst={this.state.sıcaklık_limitTipi == 2 ? true : false}
                    onPressAltUst={() => this.setState({ sıcaklık_limitTipi: 2, })}


                />
            case 30:
                return <AstronomikAydınlatma

                    Latitude={this.state.astronomikAydınlatma_Lat}
                    Longitude={this.state.astronomikAydınlatma_Lon}
                    GecikmeSuresiAzalt={() => this.setState({ astronomikAydınlatma_gecikmeSuresi: parseInt(this.state.astronomikAydınlatma_gecikmeSuresi) - 1 })}
                    GecikmeSuresiArtır={() => this.setState({ astronomikAydınlatma_gecikmeSuresi: parseInt(this.state.astronomikAydınlatma_gecikmeSuresi) + 1 })}
                    GecikmeSuresiDeger={this.state.astronomikAydınlatma_gecikmeSuresi}
                    GecikmeSuresiDisabled={this.state.astronomikAydınlatma_gecikmeSuresi == "0" ? true : false}
                    onChangeGecikmeSuresiDeger={(value) => this.setState({ astronomikAydınlatma_gecikmeSuresi: value })}

                    AkımToleransAzalt={() => this.setState({ astronomikAydınlatma_akımOran: parseInt(this.state.astronomikAydınlatma_akımOran) - 1 })}
                    AkımToleransArtır={() => this.setState({ astronomikAydınlatma_akımOran: parseInt(this.state.astronomikAydınlatma_akımOran) + 1 })}
                    AkımToleransDeger={this.state.astronomikAydınlatma_akımOran}
                    AkımToleransDisabled={this.state.astronomikAydınlatma_akımOran == "0" ? true : false}
                    onChangeAkımToleransDeger={(value) => this.setState({ astronomikAydınlatma_akımOran: value })}

                    OfsetAkım1Azalt={() => this.astronomikAydınlatmaOfset1Azalt()}
                    OfsetAkım1Artır={() => this.astronomikAydınlatmaOfset1Artır()}
                    OfsetAkım1Deger={this.state.astronomikAydınlatma_ofsetAkım1}
                    OfsetAkım1Disabled={this.state.astronomikAydınlatma_ofsetAkım1 == "0.00" ? true : false}
                    onChangeOfsetAkım1Deger={(value) => this.setState({ astronomikAydınlatma_ofsetAkım1: value })}

                    OfsetAkım2Azalt={() => this.astronomikAydınlatmaOfset2Azalt()}
                    OfsetAkım2Artır={() => this.astronomikAydınlatmaOfset2Artır()}
                    OfsetAkım2Deger={this.state.astronomikAydınlatma_ofsetAkım2}
                    OfsetAkım2Disabled={this.state.astronomikAydınlatma_ofsetAkım2 == "0.00" ? true : false}
                    onChangeOfsetAkım2Deger={(value) => this.setState({ astronomikAydınlatma_ofsetAkım2: value })}

                    OfsetAkım3Azalt={() => this.astronomikAydınlatmaOfset3Azalt()}
                    OfsetAkım3Artır={() => this.astronomikAydınlatmaOfset3Artır()}
                    OfsetAkım3Deger={this.state.astronomikAydınlatma_ofsetAkım3}
                    OfsetAkım3Disabled={this.state.astronomikAydınlatma_ofsetAkım3 == "0.00" ? true : false}
                    onChangeOfsetAkım3Deger={(value) => this.setState({ astronomikAydınlatma_ofsetAkım3: value })}

                    BosAkım1Azalt={() => this.astronomikAydınlatmaBosAkım1Azalt()}
                    BosAkım1Artır={() => this.astronomikAydınlatmaBosAkım1Artır()}
                    BosAkım1Deger={this.state.astronomikAydınlatma_bosAkım1}
                    BosAkım1Disabled={this.state.astronomikAydınlatma_bosAkım1 == "0.00" ? true : false}
                    onChangeBosAkım1Deger={(value) => this.setState({ astronomikAydınlatma_bosAkım1: value })}

                    BosAkım2Azalt={() => this.astronomikAydınlatmaBosAkım2Azalt()}
                    BosAkım2Artır={() => this.astronomikAydınlatmaBosAkım2Artır()}
                    BosAkım2Deger={this.state.astronomikAydınlatma_bosAkım2}
                    BosAkım2Disabled={this.state.astronomikAydınlatma_bosAkım2 == "0.00" ? true : false}
                    onChangeBosAkım2Deger={(value) => this.setState({ astronomikAydınlatma_bosAkım2: value })}

                    BosAkım3Azalt={() => this.astronomikAydınlatmaBosAkım3Azalt()}
                    BosAkım3Artır={() => this.astronomikAydınlatmaBosAkım3Artır()}
                    BosAkım3Deger={this.state.astronomikAydınlatma_bosAkım3}
                    BosAkım3Disabled={this.state.astronomikAydınlatma_bosAkım3 == "0.00" ? true : false}
                    onChangeBosAkım3Deger={(value) => this.setState({ astronomikAydınlatma_bosAkım3: value })}

                />;
            case 31:
                return <SuresizAydınlatma
                    AkımToleransAzalt={() => this.setState({ suresizAydınlatma_akımOran: parseInt(this.state.suresizAydınlatma_akımOran) - 1 })}
                    AkımToleransArtır={() => this.setState({ suresizAydınlatma_akımOran: parseInt(this.state.suresizAydınlatma_akımOran) + 1 })}
                    AkımToleransDeger={this.state.suresizAydınlatma_akımOran}
                    AkımToleransDisabled={this.state.suresizAydınlatma_akımOran == "0" ? true : false}
                    onChangeAkımToleransDeger={(value) => this.setState({ suresizAydınlatma_akımOran: value })}

                    OfsetAkım1Azalt={() => this.suresizAydınlatmaOfset1Azalt()}
                    OfsetAkım1Artır={() => this.suresizAydınlatmaOfset1Artır()}
                    OfsetAkım1Deger={this.state.suresizAydınlatma_ofsetAkım1}
                    OfsetAkım1Disabled={this.state.suresizAydınlatma_ofsetAkım1 == "0.00" ? true : false}
                    onChangeOfsetAkım1Deger={(value) => this.setState({ suresizAydınlatma_ofsetAkım1: value })}

                    OfsetAkım2Azalt={() => this.suresizAydınlatmaOfset2Azalt()}
                    OfsetAkım2Artır={() => this.suresizAydınlatmaOfset2Artır()}
                    OfsetAkım2Deger={this.state.suresizAydınlatma_ofsetAkım2}
                    OfsetAkım2Disabled={this.state.suresizAydınlatma_ofsetAkım2 == "0.00" ? true : false}
                    onChangeOfsetAkım2Deger={(value) => this.setState({ suresizAydınlatma_ofsetAkım2: value })}

                    OfsetAkım3Azalt={() => this.suresizAydınlatmaOfset3Azalt()}
                    OfsetAkım3Artır={() => this.suresizAydınlatmaOfset3Artır()}
                    OfsetAkım3Deger={this.state.suresizAydınlatma_ofsetAkım3}
                    OfsetAkım3Disabled={this.state.suresizAydınlatma_ofsetAkım3 == "0.00" ? true : false}
                    onChangeOfsetAkım3Deger={(value) => this.setState({ suresizAydınlatma_ofsetAkım3: value })}

                    onChangeMesajMetni={(value) => this.setState({ suresizAydınlatma_mesajMetni: value })}
                    MesajMetni={this.state.suresizAydınlatma_mesajMetni}

                />;
            case 32:
                return <ZamanaBaglıAkım

                    checkedPZT={this.state.zamanaBaglıAkım_Pazartesi}
                    onPressPZT={() => this.setState({ zamanaBaglıAkım_Pazartesi: !this.state.zamanaBaglıAkım_Pazartesi })}

                    checkedSAL={this.state.zamanaBaglıAkım_Salı}
                    onPressSAL={() => this.setState({ zamanaBaglıAkım_Salı: !this.state.zamanaBaglıAkım_Salı })}

                    checkedCSB={this.state.zamanaBaglıAkım_Carsamba}
                    onPressCSB={() => this.setState({ zamanaBaglıAkım_Carsamba: !this.state.zamanaBaglıAkım_Carsamba })}

                    checkedPRS={this.state.zamanaBaglıAkım_Persembe}
                    onPressPRS={() => this.setState({ zamanaBaglıAkım_Persembe: !this.state.zamanaBaglıAkım_Persembe })}

                    checkedCMA={this.state.zamanaBaglıAkım_Cuma}
                    onPressCMA={() => this.setState({ zamanaBaglıAkım_Cuma: !this.state.zamanaBaglıAkım_Cuma })}

                    checkedCMR={this.state.zamanaBaglıAkım_Cumartesi}
                    onPressCMR={() => this.setState({ zamanaBaglıAkım_Cumartesi: !this.state.zamanaBaglıAkım_Cumartesi })}

                    checkedPZR={this.state.zamanaBaglıAkım_Pazar}
                    onPressPZR={() => this.setState({ zamanaBaglıAkım_Pazar: !this.state.zamanaBaglıAkım_Pazar })}

                    FazSayısı={this.state.zamanaBaglıAkım_fazSayısı}
                    selectedValueFazSayısı={this.state.zamanaBaglıAkım_fazSayısı}
                    onValueChangeFazSayısı={(value) => this.setState({ zamanaBaglıAkım_fazSayısı: value })}

                    BaslangıcSaat={this.state.zamanaBaglıAkım_baslangıcSaat}
                    selectedValueBaslangıcSaat={this.state.zamanaBaglıAkım_baslangıcSaat}
                    onValueChangeBaslangıcSaat={(value) => this.setState({ zamanaBaglıAkım_baslangıcSaat: value })}
                    BaslangıcDakika={this.state.zamanaBaglıAkım_baslangıcDakika}
                    selectedValueBaslangıcDakika={this.state.zamanaBaglıAkım_baslangıcDakika}
                    onValueChangeBaslangıcDakika={(value) => this.setState({ zamanaBaglıAkım_baslangıcDakika: value })}

                    BitisSaat={this.state.zamanaBaglıAkım_bitisSaat}
                    selectedValueBitisSaat={this.state.zamanaBaglıAkım_bitisSaat}
                    onValueChangeBitisSaat={(value) => this.setState({ zamanaBaglıAkım_bitisSaat: value })}
                    BitisDakika={this.state.zamanaBaglıAkım_bitisDakika}
                    selectedValueBitisDakika={this.state.zamanaBaglıAkım_bitisDakika}
                    onValueChangeBitisDakika={(value) => this.setState({ zamanaBaglıAkım_bitisDakika: value })}

                    AkımToleransAzalt={() => this.setState({ zamanaBaglıAkım_akımOran: parseInt(this.state.zamanaBaglıAkım_akımOran) - 1 })}
                    AkımToleransArtır={() => this.setState({ zamanaBaglıAkım_akımOran: parseInt(this.state.zamanaBaglıAkım_akımOran) + 1 })}
                    AkımToleransDeger={this.state.zamanaBaglıAkım_akımOran}
                    AkımToleransDisabled={this.state.zamanaBaglıAkım_akımOran == "0" ? true : false}
                    onChangeAkımToleransDeger={(value) => this.setState({ zamanaBaglıAkım_akımOran: value })}

                    OfsetAkım1Azalt={() => this.zamanaBaglıAkımOfset1Azalt()}
                    OfsetAkım1Artır={() => this.zamanaBaglıAkımOfset1Artır()}
                    OfsetAkım1Deger={this.state.zamanaBaglıAkım_ofsetAkım1}
                    OfsetAkım1Disabled={this.state.zamanaBaglıAkım_ofsetAkım1 == "0.00" ? true : false}
                    onChangeOfsetAkım1Deger={(value) => this.setState({ zamanaBaglıAkım_ofsetAkım1: value })}

                    OfsetAkım2Azalt={() => this.zamanaBaglıAkımOfset2Azalt()}
                    OfsetAkım2Artır={() => this.zamanaBaglıAkımOfset2Artır()}
                    OfsetAkım2Deger={this.state.zamanaBaglıAkım_ofsetAkım2}
                    OfsetAkım2Disabled={this.state.zamanaBaglıAkım_ofsetAkım2 == "0.00" ? true : false}
                    onChangeOfsetAkım2Deger={(value) => this.setState({ zamanaBaglıAkım_ofsetAkım2: value })}

                    OfsetAkım3Azalt={() => this.zamanaBaglıAkımOfset3Azalt()}
                    OfsetAkım3Artır={() => this.zamanaBaglıAkımOfset3Artır()}
                    OfsetAkım3Deger={this.state.zamanaBaglıAkım_ofsetAkım3}
                    OfsetAkım3Disabled={this.state.zamanaBaglıAkım_ofsetAkım3 == "0.00" ? true : false}
                    onChangeOfsetAkım3Deger={(value) => this.setState({ zamanaBaglıAkım_ofsetAkım3: value })}

                    onChangeMesajMetni={(value) => this.setState({ zamanaBaglıAkım_mesajMetni: value })}
                    MesajMetni={this.state.zamanaBaglıAkım_mesajMetni}

                />;
            case 36:
                return <DemandAsımı

                    SaatlikLimitAzalt={() => this.setState({ demandAsım_saatlikLimit: parseInt(this.state.demandAsım_saatlikLimit) - 1 })}
                    SaatlikLimitArtır={() => this.setState({ demandAsım_saatlikLimit: parseInt(this.state.demandAsım_saatlikLimit) + 1 })}
                    SaatlikLimitDeger={this.state.demandAsım_saatlikLimit}
                    SaatlikLimitDisabled={this.state.demandAsım_saatlikLimit == "0" ? true : false}
                    onChangeSaatlikLimitDeger={(value) => this.setState({ demandAsım_saatlikLimit: value })}

                    selectedValueAlarmPeriyod={this.state.demandAsım_periyodResult}
                    onValueChangeAlarmPeriyod={(value) => this.setState({ demandAsım_periyodResult: value })}
                    PeriyodDeger={this.state.demandAsım_periyodResult}
                />
            case 37:
                return <ExportDemandAsımı

                    SaatlikLimitAzalt={() => this.setState({ exportDemandAsım_saatlikLimit: parseInt(this.state.exportDemandAsım_saatlikLimit) - 1 })}
                    SaatlikLimitArtır={() => this.setState({ exportDemandAsım_saatlikLimit: parseInt(this.state.exportDemandAsım_saatlikLimit) + 1 })}
                    SaatlikLimitDeger={this.state.exportDemandAsım_saatlikLimit}
                    SaatlikLimitDisabled={this.state.exportDemandAsım_saatlikLimit == "0" ? true : false}
                    onChangeSaatlikLimitDeger={(value) => this.setState({ exportDemandAsım_saatlikLimit: value })}

                    selectedValueAlarmPeriyod={this.state.exportDemandAsım_periyodResult}
                    onValueChangeAlarmPeriyod={(value) => this.setState({ exportDemandAsım_periyodResult: value })}
                    PeriyodDeger={this.state.exportDemandAsım_periyodResult}
                />
            case 43:
                return <EnerjiTuketim

                    BaslangicSaat1Azalt={() => this.setState({ enerjiTuketim_baslangicSaat1: parseInt(this.state.enerjiTuketim_baslangicSaat1) - 1 })}
                    BaslangicSaat1Artır={() => this.setState({ enerjiTuketim_baslangicSaat1: parseInt(this.state.enerjiTuketim_baslangicSaat1) + 1 })}
                    BaslangicSaat1Deger={this.state.enerjiTuketim_baslangicSaat1}
                    onChangeBaslangicSaat1Deger={(value) => this.setState({ enerjiTuketim_baslangicSaat1: value })}
                    BaslangicSaat1AzaltDisabled={this.state.enerjiTuketim_baslangicSaat1 == "0" ? true : false}
                    BaslangicSaat1ArtırDisabled={this.state.enerjiTuketim_baslangicSaat1 >= "23" ? true : false}

                    BaslangicDakika1Azalt={() => this.setState({ enerjiTuketim_baslangicDakika1: parseInt(this.state.enerjiTuketim_baslangicDakika1) - 1 })}
                    BaslangicDakika1Artır={() => this.setState({ enerjiTuketim_baslangicDakika1: parseInt(this.state.enerjiTuketim_baslangicDakika1) + 1 })}
                    BaslangicDakika1Deger={this.state.enerjiTuketim_baslangicDakika1}
                    onChangeBaslangicDakika1Deger={(value) => this.setState({ enerjiTuketim_baslangicDakika1: value })}
                    BaslangicDakika1AzaltDisabled={this.state.enerjiTuketim_baslangicDakika1 == "0" ? true : false}
                    BaslangicDakika1ArtırDisabled={this.state.enerjiTuketim_baslangicDakika1 >= "59" ? true : false}

                    HesaplanacakSure1Azalt={() => this.setState({ enerjiTuketim_hesaplanacakSure1: parseInt(this.state.enerjiTuketim_hesaplanacakSure1) - 1 })}
                    HesaplanacakSure1Artır={() => this.setState({ enerjiTuketim_hesaplanacakSure1: parseInt(this.state.enerjiTuketim_hesaplanacakSure1) + 1 })}
                    HesaplanacakSure1Deger={this.state.enerjiTuketim_hesaplanacakSure1}
                    onChangeHesaplanacakSure1Deger={(value) => this.setState({ enerjiTuketim_hesaplanacakSure1: value })}
                    HesaplanacakSure1AzaltDisabled={this.state.enerjiTuketim_hesaplanacakSure1 == "0" ? true : false}
                    HesaplanacakSure1ArtırDisabled={this.state.enerjiTuketim_hesaplanacakSure1 >= "23" ? true : false}

                    TuketimLimit1Azalt={() => this.enerjiTuketimLimit1Azalt()}
                    TuketimLimit1Artır={() => this.enerjiTuketimLimit1Artır()}
                    TuketimLimit1Deger={this.state.enerjiTuketim_tuketimLimit1}
                    onChangeTuketimLimit1Deger={(value) => this.setState({ enerjiTuketim_tuketimLimit1: value })}
                    TuketimLimit1AzaltDisabled={this.state.enerjiTuketim_tuketimLimit1 == "0.00" ? true : false}

                    BaslangicSaat2Azalt={() => this.setState({ enerjiTuketim_baslangicSaat2: parseInt(this.state.enerjiTuketim_baslangicSaat2) - 1 })}
                    BaslangicSaat2Artır={() => this.setState({ enerjiTuketim_baslangicSaat2: parseInt(this.state.enerjiTuketim_baslangicSaat2) + 1 })}
                    BaslangicSaat2Deger={this.state.enerjiTuketim_baslangicSaat2}
                    onChangeBaslangicSaat2Deger={(value) => this.setState({ enerjiTuketim_baslangicSaat2: value })}
                    BaslangicSaat2AzaltDisabled={this.state.enerjiTuketim_baslangicSaat2 == "0" ? true : false}
                    BaslangicSaat2ArtırDisabled={this.state.enerjiTuketim_baslangicSaat2 >= "23" ? true : false}

                    BaslangicDakika2Azalt={() => this.setState({ enerjiTuketim_baslangicDakika2: parseInt(this.state.enerjiTuketim_baslangicDakika2) - 1 })}
                    BaslangicDakika2Artır={() => this.setState({ enerjiTuketim_baslangicDakika2: parseInt(this.state.enerjiTuketim_baslangicDakika2) + 1 })}
                    BaslangicDakika2Deger={this.state.enerjiTuketim_baslangicDakika2}
                    onChangeBaslangicDakika2Deger={(value) => this.setState({ enerjiTuketim_baslangicDakika2: value })}
                    BaslangicDakika2AzaltDisabled={this.state.enerjiTuketim_baslangicDakika2 == "0" ? true : false}
                    BaslangicDakika2ArtırDisabled={this.state.enerjiTuketim_baslangicDakika2 >= "59" ? true : false}

                    HesaplanacakSure2Azalt={() => this.setState({ enerjiTuketim_hesaplanacakSure2: parseInt(this.state.enerjiTuketim_hesaplanacakSure2) - 1 })}
                    HesaplanacakSure2Artır={() => this.setState({ enerjiTuketim_hesaplanacakSure2: parseInt(this.state.enerjiTuketim_hesaplanacakSure2) + 1 })}
                    HesaplanacakSure2Deger={this.state.enerjiTuketim_hesaplanacakSure2}
                    onChangeHesaplanacakSure2Deger={(value) => this.setState({ enerjiTuketim_hesaplanacakSure2: value })}
                    HesaplanacakSure2AzaltDisabled={this.state.enerjiTuketim_hesaplanacakSure2 == "0" ? true : false}
                    HesaplanacakSure2ArtırDisabled={this.state.enerjiTuketim_hesaplanacakSure2 >= "23" ? true : false}

                    TuketimLimit2Azalt={() => this.enerjiTuketimLimit2Azalt()}
                    TuketimLimit2Artır={() => this.enerjiTuketimLimit2Artır()}
                    TuketimLimit2Deger={this.state.enerjiTuketim_tuketimLimit2}
                    onChangeTuketimLimit2Deger={(value) => this.setState({ enerjiTuketim_tuketimLimit2: value })}
                    TuketimLimit2AzaltDisabled={this.state.enerjiTuketim_tuketimLimit2 == "0.00" ? true : false}
                />
        }
    }

    alarmDefinitionUpdate = async () => {
        const { alarmData, alarmdeviceID } = this.props;
        this.setState({ butonSpinner: true })
        if (this.state.alarmTitle != "") {
            await AlarmDefinitionsRuleUpdate(this, alarmdeviceID, alarmData.alarm_id == undefined ? -1 : alarmData.alarm_id, alarmData.alarm_type_id,)
            this.setState({ butonSpinner: false })
        }
        else {
            Toast.show({
                text: "Kural İsmi boş bırakılamaz",
                duration: 3000,
                textStyle: { color: "white", fontSize: 14, textAlign: 'center' },
                type: "warning",
            })
            this.setState({ butonSpinner: false })
        }
    }

    preferences(visible) {
        this.setState({ preferences: visible });
    }

    sıcaklıkAltLimitAzalt = () => {
        data = this.state.sıcaklık_altLimit.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ sıcaklık_altLimit: (y - 0.1).toFixed(2) })
    }

    sıcaklıkAltLimitArtır = () => {
        data = this.state.sıcaklık_altLimit.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ sıcaklık_altLimit: (y + 0.1).toFixed(2) })
    }

    sıcaklıkUstLimitAzalt = () => {
        data = this.state.sıcaklık_ustLimit.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ sıcaklık_ustLimit: (y - 0.1).toFixed(2) })
    }

    sıcaklıkUstLimitArtır = () => {
        data = this.state.sıcaklık_ustLimit.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ sıcaklık_ustLimit: (y + 0.1).toFixed(2) })
    }

    yuksekAkımUstLimitAzalt = () => {
        data = this.state.yuksekAkım_ustLimit.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ yuksekAkım_ustLimit: (y - 0.1).toFixed(2) })
    }

    yuksekAkımUstLimitArtır = () => {
        data = this.state.yuksekAkım_ustLimit.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ yuksekAkım_ustLimit: (y + 0.1).toFixed(2) })
    }

    enerjiTuketimLimit1Azalt = () => {
        data = this.state.enerjiTuketim_tuketimLimit1.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ enerjiTuketim_tuketimLimit1: (y - 0.1).toFixed(2) })
    }

    enerjiTuketimLimit1Artır = () => {
        data = this.state.enerjiTuketim_tuketimLimit1.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ enerjiTuketim_tuketimLimit1: (y + 0.1).toFixed(2) })
    }

    enerjiTuketimLimit2Azalt = () => {
        data = this.state.enerjiTuketim_tuketimLimit2.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ enerjiTuketim_tuketimLimit2: (y - 0.1).toFixed(2) })
    }

    enerjiTuketimLimit2Artır = () => {
        data = this.state.enerjiTuketim_tuketimLimit2.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ enerjiTuketim_tuketimLimit2: (y + 0.1).toFixed(2) })
    }

    suresizAydınlatmaOfset1Azalt = () => {
        data = this.state.suresizAydınlatma_ofsetAkım1.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ suresizAydınlatma_ofsetAkım1: (y - 0.1).toFixed(2) })
    }

    suresizAydınlatmaOfset1Artır = () => {
        data = this.state.suresizAydınlatma_ofsetAkım1.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ suresizAydınlatma_ofsetAkım1: (y + 0.1).toFixed(2) })
    }
    suresizAydınlatmaOfset2Azalt = () => {
        data = this.state.suresizAydınlatma_ofsetAkım2.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ suresizAydınlatma_ofsetAkım2: (y - 0.1).toFixed(2) })
    }

    suresizAydınlatmaOfset2Artır = () => {
        data = this.state.suresizAydınlatma_ofsetAkım2.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ suresizAydınlatma_ofsetAkım2: (y + 0.1).toFixed(2) })
    }
    suresizAydınlatmaOfset3Azalt = () => {
        data = this.state.suresizAydınlatma_ofsetAkım3.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ suresizAydınlatma_ofsetAkım3: (y - 0.1).toFixed(2) })
    }

    suresizAydınlatmaOfset3Artır = () => {
        data = this.state.suresizAydınlatma_ofsetAkım3.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ suresizAydınlatma_ofsetAkım3: (y + 0.1).toFixed(2) })
    }

    astronomikAydınlatmaOfset1Azalt = () => {
        data = this.state.astronomikAydınlatma_ofsetAkım1.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ astronomikAydınlatma_ofsetAkım1: (y - 0.1).toFixed(2) })
    }

    astronomikAydınlatmaOfset1Artır = () => {
        data = this.state.astronomikAydınlatma_ofsetAkım1.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ astronomikAydınlatma_ofsetAkım1: (y + 0.1).toFixed(2) })
    }

    astronomikAydınlatmaOfset2Azalt = () => {
        data = this.state.astronomikAydınlatma_ofsetAkım2.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ astronomikAydınlatma_ofsetAkım2: (y - 0.1).toFixed(2) })
    }

    astronomikAydınlatmaOfset2Artır = () => {
        data = this.state.astronomikAydınlatma_ofsetAkım2.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ astronomikAydınlatma_ofsetAkım2: (y + 0.1).toFixed(2) })
    }

    astronomikAydınlatmaOfset3Azalt = () => {
        data = this.state.astronomikAydınlatma_ofsetAkım3.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ astronomikAydınlatma_ofsetAkım3: (y - 0.1).toFixed(2) })
    }

    astronomikAydınlatmaOfset3Artır = () => {
        data = this.state.astronomikAydınlatma_ofsetAkım3.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ astronomikAydınlatma_ofsetAkım3: (y + 0.1).toFixed(2) })
    }

    astronomikAydınlatmaBosAkım1Azalt = () => {
        data = this.state.astronomikAydınlatma_bosAkım1.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ astronomikAydınlatma_bosAkım1: (y - 0.1).toFixed(2) })
    }

    astronomikAydınlatmaBosAkım1Artır = () => {
        data = this.state.astronomikAydınlatma_bosAkım1.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ astronomikAydınlatma_bosAkım1: (y + 0.1).toFixed(2) })
    }

    astronomikAydınlatmaBosAkım2Azalt = () => {
        data = this.state.astronomikAydınlatma_bosAkım2.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ astronomikAydınlatma_bosAkım2: (y - 0.1).toFixed(2) })
    }

    astronomikAydınlatmaBosAkım2Artır = () => {
        data = this.state.astronomikAydınlatma_bosAkım2.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ astronomikAydınlatma_bosAkım2: (y + 0.1).toFixed(2) })
    }

    astronomikAydınlatmaBosAkım3Azalt = () => {
        data = this.state.astronomikAydınlatma_bosAkım3.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ astronomikAydınlatma_bosAkım3: (y - 0.1).toFixed(2) })
    }

    astronomikAydınlatmaBosAkım3Artır = () => {
        data = this.state.astronomikAydınlatma_bosAkım3.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ astronomikAydınlatma_bosAkım3: (y + 0.1).toFixed(2) })
    }

    zamanaBaglıAkımOfset1Azalt = () => {
        data = this.state.zamanaBaglıAkım_ofsetAkım1.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ zamanaBaglıAkım_ofsetAkım1: (y - 0.1).toFixed(2) })
    }

    zamanaBaglıAkımOfset1Artır = () => {
        data = this.state.zamanaBaglıAkım_ofsetAkım1.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ zamanaBaglıAkım_ofsetAkım1: (y + 0.1).toFixed(2) })
    }

    zamanaBaglıAkımOfset2Azalt = () => {
        data = this.state.zamanaBaglıAkım_ofsetAkım2.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ zamanaBaglıAkım_ofsetAkım2: (y - 0.1).toFixed(2) })
    }

    zamanaBaglıAkımOfset2Artır = () => {
        data = this.state.zamanaBaglıAkım_ofsetAkım2.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ zamanaBaglıAkım_ofsetAkım2: (y + 0.1).toFixed(2) })
    }

    zamanaBaglıAkımOfset3Azalt = () => {
        data = this.state.zamanaBaglıAkım_ofsetAkım3.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ zamanaBaglıAkım_ofsetAkım3: (y - 0.1).toFixed(2) })
    }

    zamanaBaglıAkımOfset3Artır = () => {
        data = this.state.zamanaBaglıAkım_ofsetAkım3.toString()
        x = data.replace(",", ".")
        y = parseFloat(x)
        this.setState({ zamanaBaglıAkım_ofsetAkım3: (y + 0.1).toFixed(2) })
    }

    render() {
        const { alarmData } = this.props;
        var x = alarmData.name;
        var y = x.replace(" (Varsayılan)", "")
        return (
            <Root>
                <View style={{ flex: 1, backgroundColor: '#f5f5f5', }}>
                    {this.state.dataLoading &&
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                            <Spinner color='#aaa' style={{ width: "100%" }} />
                        </View>
                    }

                    {!this.state.dataLoading &&
                        <ScrollView>
                            <View style={{ flex: 1, }}>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <View style={{ width: '100%', height: 40, top: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon type="FontAwesome5" name={alarmData.alarm_icon} style={{ color: alarmData.alarm_color, fontSize: 30 }} />
                                        <Text> {y} Ayarları</Text>
                                    </View>
                                    <View style={{ width: '95%', height: 40, backgroundColor: '#ccc', flexDirection: 'row', top: 15, borderRadius: 4, marginHorizontal: 20, padding: 3 }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderRightColor: '#ccc', borderRightWidth: 1, borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                            <Text style={{ fontSize: 14, color: '#444' }}>Durum</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                            <Switch
                                                trackColor={{ false: "#F3565D", true: "#45B6AF" }}
                                                thumbColor={this.state.alarmStatus ? "#f5dd4b" : "#f4f3f4"}
                                                ios_backgroundColor={this.state.alarmStatus ? "#45B6AF" : "#F3565D"}
                                                onValueChange={(value) => this.setState({ alarmStatus: value })}
                                                value={this.state.alarmStatus}
                                            />
                                            <Text style={{ color: this.state.alarmStatus == true ? "#45B6AF" : "#F3565D" }}>  {this.state.alarmStatus == true ? "Aktif" : "Pasif"}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '95%', height: 40, backgroundColor: '#ccc', flexDirection: 'row', top: 15, borderRadius: 4, marginHorizontal: 20, marginTop: 5, padding: 3, }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderRightColor: '#ccc', borderRightWidth: 1, borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                            <Text style={{ fontSize: 14, color: '#444' }}>Kural İsmi</Text>
                                        </View>
                                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                            <TextInput
                                                style={{ width: '100%', height: 40, left: 2 }}
                                                placeholder="Bir isim giriniz"
                                                placeholderTextColor="#999"
                                                value={this.state.alarmTitle}
                                                onChangeText={(value) => this.setState({ alarmTitle: value })}
                                            />
                                        </View>
                                    </View>

                                    {this._renderContent(alarmData)}

                                    <View style={{ width: '95%', height: 40, backgroundColor: '#ccc', flexDirection: 'row', top: 15, borderRadius: 4, marginHorizontal: 20, marginTop: 5, padding: 3 }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderRightColor: '#ccc', borderRightWidth: 1, borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                            <Text style={{ fontSize: 14, color: '#444' }}>E-Posta Bildirim</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
                                            <Switch
                                                trackColor={{ false: "#F3565D", true: "#45B6AF" }}
                                                thumbColor={this.state.alarmEmail ? "#f5dd4b" : "#f4f3f4"}
                                                ios_backgroundColor={this.state.alarmEmail ? "#45B6AF" : "#F3565D"}
                                                onValueChange={(value) => this.setState({ alarmEmail: value })}
                                                value={this.state.alarmEmail}
                                            />
                                            <Text style={{ color: this.state.alarmEmail == true ? "#45B6AF" : "#F3565D" }}>  {this.state.alarmEmail == true ? "Aktif" : "Pasif"}</Text>
                                        </View>
                                    </View>

                                    <View style={{ width: '95%', height: 40, backgroundColor: '#ccc', flexDirection: 'row', top: 15, borderRadius: 4, marginHorizontal: 20, marginTop: 5, padding: 3 }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderRightColor: '#ccc', borderRightWidth: 1, borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                                            <Text style={{ fontSize: 14, color: '#444' }}>Mobil Bildirim</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
                                            <Switch
                                                trackColor={{ false: "#F3565D", true: "#45B6AF" }}
                                                thumbColor={this.state.alarmMobile ? "#f5dd4b" : "#f4f3f4"}
                                                ios_backgroundColor={this.state.alarmMobile ? "#45B6AF" : "#F3565D"}
                                                onValueChange={(value) => this.setState({ alarmMobile: value })}
                                                value={this.state.alarmMobile}
                                            />
                                            <Text style={{ color: this.state.alarmMobile == true ? "#45B6AF" : "#F3565D" }}>  {this.state.alarmMobile == true ? "Aktif" : "Pasif"}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '90%', height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 20, }}>
                                        {!this.state.butonSpinner &&
                                            <View style={{ width: '90%', height: 50, justifyContent: 'center', alignItems: 'center', }}>
                                                <TouchableOpacity onPress={() => this.alarmDefinitionUpdate()} style={{ width: '50%', height: 40, borderRadius: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', }}>
                                                    <Text style={{ color: "#444", textAlign: 'center' }}>KAYDET</Text>
                                                </TouchableOpacity>
                                            </View>
                                        }
                                        {this.state.butonSpinner &&
                                            <View style={{ width: '90%', height: 50, justifyContent: 'center', alignItems: 'center', }}>
                                                <TouchableOpacity style={{ width: '50%', height: 40, borderRadius: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', }}>
                                                    <Spinner color='#fff' style={{ width: "100%" }} />
                                                </TouchableOpacity>
                                            </View>
                                        }
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    }

                </View>
            </Root>
        );
    }
}

export default AlarmChangeScreen;

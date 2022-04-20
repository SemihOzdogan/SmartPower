import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, } from 'react-native';
import tinycolor from 'tinycolor2';
import { Root, Spinner } from 'native-base';
import { GetInputSettings, GetInputSettingsUpdate } from '../../../../../backend/IoController/getInputSettings';
import { GRPSettingsComponent, G1SettingsComponent, InputErrorComponent } from '../../../../components/IoModules/InputSettingsComponent';

class InputScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            butonSpinner: false,
            error: false,
            Grp1Status1: "",
            Grp1Status1Color: "",
            Grp1Status0: "",
            Grp1Status0Color: "",
            Grp2Status1: "",
            Grp2Status1Color: "",
            Grp2Status0: "",
            Grp2Status0Color: "",
            dataLoading: false,
            GRPmodalVisibleG1D1: false,
            GRPmodalVisibleG1Detail: false,
            GRPmodalVisibleG1D0: false,
            GRPmodalVisibleG2Detail: false,
            GRPmodalVisibleG2D1: false,
            GRPmodalVisibleG2D0: false,
            G1Status1: "",
            G1Status1Color: "",
            G1Status0: "",
            G1Status0Color: "",
            G2Status1: "",
            G2Status1Color: "",
            G2Status0: "",
            G2Status0Color: "",
            G3Status1: "",
            G3Status1Color: "",
            G3Status0: "",
            G3Status0Color: "",
            G4Status1: "",
            G4Status1Color: "",
            G4Status0: "",
            G4Status0Color: "",
            G5Status1: "",
            G5Status1Color: "",
            G5Status0: "",
            G5Status0Color: "",
            G6Status1: "",
            G6Status1Color: "",
            G6Status0: "",
            G6Status0Color: "",
            G7Status1: "",
            G7Status1Color: "",
            G7Status0: "",
            G7Status0Color: "",
            G8Status1: "",
            G8Status1Color: "",
            G8Status0: "",
            G8Status0Color: "",
            G1modalVisibleG1D1: false,
            G1modalVisibleG1D0: false,
            G1modalVisibleG1Detail: false,
            G1modalVisibleG2D1: false,
            G1modalVisibleG2D0: false,
            G1modalVisibleG2Detail: false,
            G1modalVisibleG3D1: false,
            G1modalVisibleG3D0: false,
            G1modalVisibleG3Detail: false,
            G1modalVisibleG4D1: false,
            G1modalVisibleG4D0: false,
            G1modalVisibleG4Detail: false,
            G1modalVisibleG5D1: false,
            G1modalVisibleG5D0: false,
            G1modalVisibleG5Detail: false,
            G1modalVisibleG6D1: false,
            G1modalVisibleG6D0: false,
            G1modalVisibleG6Detail: false,
            G1modalVisibleG7D1: false,
            G1modalVisibleG7D0: false,
            G1modalVisibleG7Detail: false,
            G1modalVisibleG8D1: false,
            G1modalVisibleG8D0: false,
            G1modalVisibleG8Detail: false,
            recents: ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654', '#f5f5f5', 'red', 'green'],
        };

    }

    UNSAFE_componentWillMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.PageDidFocus()
        });
    }

    PageDidFocus = async () => {
        if (this.props.inputOutputType == 3 || this.props.inputOutputType == 0) {
            this.setState({ dataLoading: true, error: false })
            await GetInputSettings(this, this.props.inputOutputType, this.props.inputOutputID);
            this.setState({
                GRPmodalVisibleG1Detail: false,
                GRPmodalVisibleG2Detail: false,
                G1modalVisibleG1Detail: false,
                G1modalVisibleG2Detail: false,
                G1modalVisibleG3Detail: false,
                G1modalVisibleG4Detail: false,
                G1modalVisibleG5Detail: false,
                G1modalVisibleG6Detail: false,
                G1modalVisibleG7Detail: false,
                G1modalVisibleG8Detail: false,
            })
        }
        else {
            this.setState({ dataLoading: false, error: true })
            console.log('giriş ayarları olduğu için çıkış ayarları gösterilemez')
        }
    }

    _renderContent(data) {
        switch (data) {
            case 1: return <InputErrorComponent IOListele={() => this.props.navigation.navigate('Devices')} />
            case 4: return <InputErrorComponent IOListele={() => this.props.navigation.navigate('Devices')} />
            case 3:
                return <GRPSettingsComponent

                    Giris1Opened={this.state.GRPmodalVisibleG1Detail}
                    Giris1PressOpen={() => { this.setState({ GRPmodalVisibleG1Detail: !this.state.GRPmodalVisibleG1Detail }) }}
                    OnChangeGiris1Durum1={(value) => this.setState({ Grp1Status1: value })}
                    Giris1Durum1={this.state.Grp1Status1}
                    Giris1Durum1Color={this.state.Grp1Status1Color}
                    Giris1Durum1Modal={this.state.GRPmodalVisibleG1D1}
                    OnCancel1={() => this.setState({ GRPmodalVisibleG1D1: false })}
                    OnOk1={colorHex => {
                        this.setState({
                            GRPmodalVisibleG1D1: false,
                            Grp1Status1Color: tinycolor(colorHex).toHexString()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    Swatches={this.state.recents}
                    Giris1Durum1ModalOpen={() => this.setState({ GRPmodalVisibleG1D1: true })}

                    OnChangeGiris1Durum0={(value) => this.setState({ Grp1Status0: value })}
                    Giris1Durum0={this.state.Grp1Status0}
                    Giris1Durum0Color={this.state.Grp1Status0Color}
                    Giris1Durum0Modal={this.state.GRPmodalVisibleG1D0}
                    OnCancel2={() => this.setState({ GRPmodalVisibleG1D0: false })}
                    OnOk2={colorHex => {
                        this.setState({
                            GRPmodalVisibleG1D0: false,
                            Grp1Status0Color: tinycolor(colorHex).toHexString()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    Swatches={this.state.recents}
                    Giris1Durum0ModalOpen={() => this.setState({ GRPmodalVisibleG1D0: true })}
                    //**************************************************************************************** */

                    Giris2Opened={this.state.GRPmodalVisibleG2Detail}
                    Giris2PressOpen={() => { this.setState({ GRPmodalVisibleG2Detail: !this.state.GRPmodalVisibleG2Detail }) }}
                    OnChangeGiris2Durum1={(value) => this.setState({ Grp2Status1: value })}
                    Giris2Durum1={this.state.Grp2Status1}
                    Giris2Durum1Color={this.state.Grp2Status1Color}
                    Giris2Durum1Modal={this.state.GRPmodalVisibleG2D1}
                    OnCancel3={() => this.setState({ GRPmodalVisibleG2D1: false })}
                    OnOk3={colorHex => {
                        this.setState({
                            GRPmodalVisibleG2D1: false,
                            Grp2Status1Color: tinycolor(colorHex).toHexString()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    Swatches={this.state.recents}
                    Giris2Durum1ModalOpen={() => this.setState({ GRPmodalVisibleG2D1: true })}

                    OnChangeGiris2Durum0={(value) => this.setState({ Grp2Status0: value })}
                    Giris2Durum0={this.state.Grp2Status0}
                    Giris2Durum0Color={this.state.Grp2Status0Color}
                    Giris2Durum0Modal={this.state.GRPmodalVisibleG2D0}
                    OnCancel4={() => this.setState({ GRPmodalVisibleG2D0: false })}
                    OnOk4={colorHex => {
                        this.setState({
                            GRPmodalVisibleG2D0: false,
                            Grp2Status0Color: tinycolor(colorHex).toHexString()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    Swatches={this.state.recents}
                    Giris2Durum0ModalOpen={() => this.setState({ GRPmodalVisibleG2D0: true })}
                />
            case 0:
                return <G1SettingsComponent
                    //GİRİŞ 1 **************************************************************************************** */
                    Giris1Opened={this.state.G1modalVisibleG1Detail}
                    Giris1PressOpen={() => { this.setState({ G1modalVisibleG1Detail: !this.state.G1modalVisibleG1Detail }) }}
                    OnChangeGiris1Durum1={(value) => this.setState({ G1Status1: value })}
                    Giris1Durum1={this.state.G1Status1}
                    Giris1Durum1Color={this.state.G1Status1Color}
                    Giris1Durum1Modal={this.state.G1modalVisibleG1D1}
                    OnCancel1={() => this.setState({ G1modalVisibleG1D1: false })}
                    OnOk1={colorHex => {
                        this.setState({
                            G1modalVisibleG1D1: false,
                            G1Status1Color: tinycolor(colorHex).toHexString()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    Swatches={this.state.recents}
                    Giris1Durum1ModalOpen={() => this.setState({ G1modalVisibleG1D1: true })}

                    OnChangeGiris1Durum0={(value) => this.setState({ G1Status0: value })}
                    Giris1Durum0={this.state.G1Status0}
                    Giris1Durum0Color={this.state.G1Status0Color}
                    Giris1Durum0Modal={this.state.G1modalVisibleG1D0}
                    OnCancel2={() => this.setState({ G1modalVisibleG1D0: false })}
                    OnOk2={colorHex => {
                        this.setState({
                            G1modalVisibleG1D0: false,
                            G1Status0Color: tinycolor(colorHex).toHexString()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    Swatches={this.state.recents}
                    Giris1Durum0ModalOpen={() => this.setState({ G1modalVisibleG1D0: true })}

                    //GİRİŞ 2 **************************************************************************************** */
                    Giris2Opened={this.state.G1modalVisibleG2Detail}
                    Giris2PressOpen={() => { this.setState({ G1modalVisibleG2Detail: !this.state.G1modalVisibleG2Detail }) }}
                    OnChangeGiris2Durum1={(value) => this.setState({ G2Status1: value })}
                    Giris2Durum1={this.state.G2Status1}
                    Giris2Durum1Color={this.state.G2Status1Color}
                    Giris2Durum1Modal={this.state.G1modalVisibleG2D1}
                    OnCancel3={() => this.setState({ G1modalVisibleG2D1: false })}
                    OnOk3={colorHex => {
                        this.setState({
                            G1modalVisibleG2D1: false,
                            G2Status1Color: tinycolor(colorHex).toHexString()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    Swatches={this.state.recents}
                    Giris2Durum1ModalOpen={() => this.setState({ G1modalVisibleG2D1: true })}

                    OnChangeGiris2Durum0={(value) => this.setState({ G2Status0: value })}
                    Giris2Durum0={this.state.G2Status0}
                    Giris2Durum0Color={this.state.G2Status0Color}
                    Giris2Durum0Modal={this.state.G1modalVisibleG2D0}
                    OnCancel4={() => this.setState({ G1modalVisibleG2D0: false })}
                    OnOk4={colorHex => {
                        this.setState({
                            G1modalVisibleG2D0: false,
                            G2Status0Color: tinycolor(colorHex).toHexString()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    Swatches={this.state.recents}
                    Giris2Durum0ModalOpen={() => this.setState({ G1modalVisibleG2D0: true })}

                    //GİRİŞ 3 **************************************************************************************** */

                    Giris3Opened={this.state.G1modalVisibleG3Detail}
                    Giris3PressOpen={() => { this.setState({ G1modalVisibleG3Detail: !this.state.G1modalVisibleG3Detail }) }}
                    OnChangeGiris3Durum1={(value) => this.setState({ G3Status1: value })}
                    Giris3Durum1={this.state.G3Status1}
                    Giris3Durum1Color={this.state.G3Status1Color}
                    Giris3Durum1Modal={this.state.G1modalVisibleG3D1}
                    OnCancel5={() => this.setState({ G1modalVisibleG3D1: false })}
                    OnOk5={colorHex => {
                        this.setState({
                            G1modalVisibleG3D1: false,
                            G3Status1Color: tinycolor(colorHex).toHexString()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    Swatches={this.state.recents}
                    Giris3Durum1ModalOpen={() => this.setState({ G1modalVisibleG3D1: true })}


                    OnChangeGiris3Durum0={(value) => this.setState({ G3Status0: value })}
                    Giris3Durum0={this.state.G3Status0}
                    Giris3Durum0Color={this.state.G3Status0Color}
                    Giris3Durum0Modal={this.state.G1modalVisibleG3D0}
                    OnCancel6={() => this.setState({ G1modalVisibleG3D0: false })}
                    OnOk6={colorHex => {
                        this.setState({
                            G1modalVisibleG3D0: false,
                            G3Status0Color: tinycolor(colorHex).toHexString()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    Swatches={this.state.recents}
                    Giris3Durum0ModalOpen={() => this.setState({ G1modalVisibleG3D0: true })}

                    //GİRİŞ 4 **************************************************************************************** */

                    Giris4Opened={this.state.G1modalVisibleG4Detail}
                    Giris4PressOpen={() => { this.setState({ G1modalVisibleG4Detail: !this.state.G1modalVisibleG4Detail }) }}
                    OnChangeGiris4Durum1={(value) => this.setState({ G4Status1: value })}
                    Giris4Durum1={this.state.G4Status1}
                    Giris4Durum1Color={this.state.G4Status1Color}
                    Giris4Durum1Modal={this.state.G1modalVisibleG4D1}
                    OnCancel7={() => this.setState({ G1modalVisibleG4D1: false })}
                    OnOk7={colorHex => {
                        this.setState({
                            G1modalVisibleG4D1: false,
                            G4Status1Color: tinycolor(colorHex).toHexString()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    Swatches={this.state.recents}
                    Giris4Durum1ModalOpen={() => this.setState({ G1modalVisibleG4D1: true })}

                    OnChangeGiris4Durum0={(value) => this.setState({ G4Status0: value })}
                    Giris4Durum0={this.state.G4Status0}
                    Giris4Durum0Color={this.state.G4Status0Color}
                    Giris4Durum0Modal={this.state.G1modalVisibleG4D0}
                    OnCancel8={() => this.setState({ G1modalVisibleG4D0: false })}
                    OnOk8={colorHex => {
                        this.setState({
                            G1modalVisibleG4D0: false,
                            G4Status0Color: tinycolor(colorHex).toHexString()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    Swatches={this.state.recents}
                    Giris4Durum0ModalOpen={() => this.setState({ G1modalVisibleG4D0: true })}

                    //GİRİŞ 5 **************************************************************************************** */

                    Giris5Opened={this.state.G1modalVisibleG5Detail}
                    Giris5PressOpen={() => { this.setState({ G1modalVisibleG5Detail: !this.state.G1modalVisibleG5Detail }) }}
                    OnChangeGiris5Durum1={(value) => this.setState({ G5Status1: value })}
                    Giris5Durum1={this.state.G5Status1}
                    Giris5Durum1Color={this.state.G5Status1Color}
                    Giris5Durum1Modal={this.state.G1modalVisibleG5D1}
                    OnCancel9={() => this.setState({ G1modalVisibleG5D1: false })}
                    OnOk9={colorHex => {
                        this.setState({
                            G1modalVisibleG5D1: false,
                            G5Status1Color: tinycolor(colorHex).toHexString()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    Swatches={this.state.recents}
                    Giris5Durum1ModalOpen={() => this.setState({ G1modalVisibleG5D1: true })}

                    OnChangeGiris5Durum0={(value) => this.setState({ G5Status0: value })}
                    Giris5Durum0={this.state.G5Status0}
                    Giris5Durum0Color={this.state.G5Status0Color}
                    Giris5Durum0Modal={this.state.G1modalVisibleG5D0}
                    OnCancel10={() => this.setState({ G1modalVisibleG5D0: false })}
                    OnOk10={colorHex => {
                        this.setState({
                            G1modalVisibleG5D0: false,
                            G5Status0Color: tinycolor(colorHex).toHexString()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    Swatches={this.state.recents}
                    Giris5Durum0ModalOpen={() => this.setState({ G1modalVisibleG5D0: true })}


                    //GİRİŞ 6 **************************************************************************************** */

                    Giris6Opened={this.state.G1modalVisibleG6Detail}
                    Giris6PressOpen={() => { this.setState({ G1modalVisibleG6Detail: !this.state.G1modalVisibleG6Detail }) }}
                    OnChangeGiris6Durum1={(value) => this.setState({ G6Status1: value })}
                    Giris6Durum1={this.state.G6Status1}
                    Giris6Durum1Color={this.state.G6Status1Color}
                    Giris6Durum1Modal={this.state.G1modalVisibleG6D1}
                    OnCancel11={() => this.setState({ G1modalVisibleG6D1: false })}
                    OnOk11={colorHex => {
                        this.setState({
                            G1modalVisibleG6D1: false,
                            G6Status1Color: tinycolor(colorHex).toHexString()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    Swatches={this.state.recents}
                    Giris6Durum1ModalOpen={() => this.setState({ G1modalVisibleG6D1: true })}

                    OnChangeGiris6Durum0={(value) => this.setState({ G6Status0: value })}
                    Giris6Durum0={this.state.G6Status0}
                    Giris6Durum0Color={this.state.G6Status0Color}
                    Giris6Durum0Modal={this.state.G1modalVisibleG6D0}
                    OnCancel12={() => this.setState({ G1modalVisibleG6D0: false })}
                    OnOk12={colorHex => {
                        this.setState({
                            G1modalVisibleG6D0: false,
                            G6Status0Color: tinycolor(colorHex).toHexString()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    Swatches={this.state.recents}
                    Giris6Durum0ModalOpen={() => this.setState({ G1modalVisibleG6D0: true })}


                    //GİRİŞ 7 **************************************************************************************** */

                    Giris7Opened={this.state.G1modalVisibleG7Detail}
                    Giris7PressOpen={() => { this.setState({ G1modalVisibleG7Detail: !this.state.G1modalVisibleG7Detail }) }}
                    OnChangeGiris7Durum1={(value) => this.setState({ G7Status1: value })}
                    Giris7Durum1={this.state.G7Status1}
                    Giris7Durum1Color={this.state.G7Status1Color}
                    Giris7Durum1Modal={this.state.G1modalVisibleG7D1}
                    OnCancel13={() => this.setState({ G1modalVisibleG7D1: false })}
                    OnOk13={colorHex => {
                        this.setState({
                            G1modalVisibleG7D1: false,
                            G7Status1Color: tinycolor(colorHex).toHexString()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    Swatches={this.state.recents}
                    Giris7Durum1ModalOpen={() => this.setState({ G1modalVisibleG7D1: true })}

                    OnChangeGiris7Durum0={(value) => this.setState({ G7Status0: value })}
                    Giris7Durum0={this.state.G7Status0}
                    Giris7Durum0Color={this.state.G7Status0Color}
                    Giris7Durum0Modal={this.state.G1modalVisibleG7D0}
                    OnCancel14={() => this.setState({ G1modalVisibleG7D0: false })}
                    OnOk14={colorHex => {
                        this.setState({
                            G1modalVisibleG7D0: false,
                            G7Status0Color: tinycolor(colorHex).toHexString()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    Swatches={this.state.recents}
                    Giris7Durum0ModalOpen={() => this.setState({ G1modalVisibleG7D0: true })}

                    //GİRİŞ 8 **************************************************************************************** */

                    Giris8Opened={this.state.G1modalVisibleG8Detail}
                    Giris8PressOpen={() => { this.setState({ G1modalVisibleG8Detail: !this.state.G1modalVisibleG8Detail }) }}
                    OnChangeGiris8Durum1={(value) => this.setState({ G8Status1: value })}
                    Giris8Durum1={this.state.G8Status1}
                    Giris8Durum1Color={this.state.G8Status1Color}
                    Giris8Durum1Modal={this.state.G1modalVisibleG8D1}
                    OnCancel15={() => this.setState({ G1modalVisibleG8D1: false })}
                    OnOk15={colorHex => {
                        this.setState({
                            G1modalVisibleG8D1: false,
                            G8Status1Color: tinycolor(colorHex).toHexString()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    Swatches={this.state.recents}
                    Giris8Durum1ModalOpen={() => this.setState({ G1modalVisibleG8D1: true })}

                    OnChangeGiris8Durum0={(value) => this.setState({ G8Status0: value })}
                    Giris8Durum0={this.state.G8Status0}
                    Giris8Durum0Color={this.state.G8Status0Color}
                    Giris8Durum0Modal={this.state.G1modalVisibleG8D0}
                    OnCancel16={() => this.setState({ G1modalVisibleG8D0: false })}
                    OnOk16={colorHex => {
                        this.setState({
                            G1modalVisibleG8D0: false,
                            G8Status0Color: tinycolor(colorHex).toHexString()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    Swatches={this.state.recents}
                    Giris8Durum0ModalOpen={() => this.setState({ G1modalVisibleG8D0: true })}
                />
        }
    }

    InputSettingsUpdate = async () => {
        this.setState({ butonSpinner: true })
        await GetInputSettingsUpdate(this, this.props.inputOutputType, this.props.inputOutputID)
        this.setState({ butonSpinner: false })
    }


    render() {
        return (
            <Root>
                <View style={{ flex: 1, }}>
                    {this.state.dataLoading &&
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                            <Spinner color='#aaa' style={{ width: "100%" }} />
                        </View>
                    }
                    {!this.state.dataLoading &&
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                this._renderContent(this.props.inputOutputType)
                            }
                            {!this.state.butonSpinner && !this.state.error &&
                                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
                                    <TouchableOpacity onPress={() => this.InputSettingsUpdate()} style={{ width: '50%', height: 40, borderRadius: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', }}>
                                        <Text style={{ color: "#444", textAlign: 'center' }}>KAYDET</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            {this.state.butonSpinner && !this.state.error &&
                                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
                                    <TouchableOpacity style={{ width: '50%', height: 40, borderRadius: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', }}>
                                        <Spinner color='#fff' style={{ width: "100%" }} />
                                    </TouchableOpacity>
                                </View>
                            }
                        </ScrollView>
                    }
                </View>
            </Root>
        );
    }
}

export default InputScreen;
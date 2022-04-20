import React from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import { Text, View, Col, Icon, Form } from "native-base";
import Modal from 'react-native-modal';


var height = Dimensions.get('window').height
var width = Dimensions.get('window').width

export default RaporModalComponent = props => {
    return (
        <Modal
            isVisible={props.isVisible}
            onSwipeComplete={props.onSwipeComplete}
            backdropOpacity={0.1}
            style={{ margin: 0 }}
            animationIn="slideInUp"
            animationOut="zoomOutUp"
            animationInTiming={100}
            animationOutTiming={1000}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={1000}
            swipeDirection={['left', 'right', 'down']}>
            <View style={{ flex: 1, backgroundColor: "rgba(179, 218, 234,0)", justifyContent: 'flex-end' }}>
                <View style={{ width: "100%", height: height / 3.5, backgroundColor: "#CECECE", padding: 15, borderTopRightRadius: 32, borderTopLeftRadius: 32 }}>
                    <View style={{ flex:1,justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 18, }}>Rapor Türü Seçin</Text>
                    </View>
                    <Form style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                        <Col style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 5 }} >
                            <TouchableOpacity style={{ width: '100%', height: 30, backgroundColor: '#80d8ff', borderRadius: 6, alignItems: 'center', justifyContent: 'center' }}
                                onPress={props.onPressReaktif}
                            >
                                <Text style={{ fontSize: 14 }}>Reaktif</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                            <TouchableOpacity style={{ width: '100%', height: 30, backgroundColor: '#80d8ff', borderRadius: 6, alignItems: 'center', justifyContent: 'center' }}
                                onPress={props.onPressTuketim}
                            >
                                <Text style={{ fontSize: 14 }}>Tüketim</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                            <TouchableOpacity style={{ width: '100%', height: 30, backgroundColor: '#80d8ff', borderRadius: 6, alignItems: 'center', justifyContent: 'center' }}
                                onPress={props.onPressAkımGerilim}
                            >
                                <Text style={{ fontSize: 14 }}>Akım-Gerilim</Text>
                            </TouchableOpacity>
                        </Col>

                    </Form>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <TouchableOpacity onPress={props.OnClose} style={{ width: '40%', height: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'gray', borderRadius: 6, }}>
                            <Text style={{ color: 'gray', }} >Kapat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

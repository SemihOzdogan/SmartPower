import AsyncStorage from '@react-native-community/async-storage';
export const GetServerSettings = async () => {

    serverURL = await AsyncStorage.getItem("serverURL");
    serverPORT = await AsyncStorage.getItem("serverPORT");
    protocol = await AsyncStorage.getItem("protocol");

    const url = await protocol + '://' + serverURL + ':' + serverPORT;

    return url;
}

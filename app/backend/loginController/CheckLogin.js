
import AsyncStorage from '@react-native-community/async-storage';
export const LoginControl = (x) => {
    loginControl = AsyncStorage.getItem('access_token');
    if (loginControl != '') {
        // x.props.navigation.navigate(pagename);   
    } else {
        x.props.navigation.navigate('Login');
    }
}
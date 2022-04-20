import { StyleSheet } from "react-native";

export default StyleSheet.create({
    contentBackground: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        alignItems: "center",
        justifyContent: "center",
    },
    form: {
        flex: 3,
        width: "100%",
        height: "100%",
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 30,
        paddingBottom: 20,
        backgroundColor: "#FFF",
        borderTopStartRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,

    },
    loginButton: {
        height: 48,
        marginTop: 20,
        fontFamily: "OpenSans-Regular",
        textAlign: "center",
        borderRadius: 16
    },
    loginInput: {
        width: "100%",
        marginTop: 5,
        marginLeft: -15,
        paddingLeft: 16,
        color:'#bbb',
        fontSize: 16,
    },
    loginLabel: {
        width: "100%",
        fontFamily: "OpenSans-Regular",
        fontSize: 14,
    },
    loginInputIcon: {
        color: "#bbb",
        fontSize: 18,
    },
    loginForgetPassword: {
        alignItems: "center",
        marginTop: 30,
        color: "#ccc"
    },
    loginForgetPasswordText: {
        color: "#aaa",
        fontSize: 12
    }

});
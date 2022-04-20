import { StyleSheet } from "react-native";

export default StyleSheet.create({
    homeWelcome:{
        backgroundColor: "#ed7474",
        width: "100%",
        height: 100,
        padding: 20,
        borderRadius: 10,
        borderBottomWidth: 5,
        borderBottomColor: "#933b3b"
    },
    boldText: {
        color: "white",
        fontSize: 20,
        fontFamily: "Poppins-Bold",
        margin: 0,
        padding: 0
    },
    thinText: {
        color: "white",
        fontSize: 16,
        fontFamily: "Poppins-Light",
        letterSpacing: 6,
        margin: 0,
        padding: 0
    },
    homeCategoryList: {
        backgroundColor: "white",
        marginTop: 25,
        borderBottomColor: "#ddd",
        borderBottomWidth: 5
    },
    homeCategoryText: {
        padding: 15,
        paddingLeft: 25,
        paddingBottom: 5
    },
    homeCategoryBadge: {
        color: "white",
        fontFamily: "Poppins-Light",
        position: "absolute",
        marginTop: -15,
        zIndex: 5,
        padding: 5
    },
    homeCategoryBadgeIcon: {
        fontSize: 12,
        color: "white",
    }
});
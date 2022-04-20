import { StyleSheet } from "react-native";

export default StyleSheet.create({
    footerSearchIcon: {
        color: "#666",
        fontSize: 20,
        marginTop: 15,
        marginLeft: 15
    },
    footerSearchInput: {
        fontSize: 15,
        marginTop: 1,
        marginLeft: 15,
        color: "#666"
    },
    footerSearchButton: {
        color: "#666",
        padding: 13,
        minWidth: 50,
        textAlign: "center",
        alignItems: "center"
    },
    pageContent: {
        position: "relative",
        padding: 20,
        backgroundColor: "#f5f5f5"
    },
    footerStyle:{
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        zIndex: 9999
    },
    menuTop: {
        height: 120,
        marginLeft: -15,
        marginRight: -15
    },
    menuIcon:{
        color: "#aaa",
        fontSize: 26,
    },
    animatedBox: {
        flex: 1,
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
        padding: 15,
        paddingBottom: 60,
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 99999,
        
        shadowColor: "#999",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.65,
        elevation: 2,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee'
    },
    list_item: {
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingTop: 15,
        paddingBottom: 15,
    },
    list_text_style: {
        color: "#666",
        fontFamily: "OpenSans-Regular",
        fontSize: 14,
        textTransform: "uppercase",
        paddingLeft: 45
    },
    menuIconBg: {
        width: 25,
        position: "absolute",
        marginTop: 12,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    }
});
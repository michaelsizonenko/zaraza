import {StyleSheet} from "react-native";


export const styles = StyleSheet.create({
    phoneInput: {
        borderWidth: 1,
        borderColor: "#333",
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    containerSpinner: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    container: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 16,
    },
    formContainer: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 16,

    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        fontSize: 20,
    },
    form: {
        marginBottom: 30
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    submit: {
        fontSize: 20,
        marginVertical: 10,
    },
    separator: {
        marginVertical: 15,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    blankSeparator: {
        marginVertical: 15,
    },
    header: {
        fontSize: 25,
        marginVertical: 5
    },
    description: {
        fontSize: 15,
        marginVertical: 5
    },
    formButton: {
        margin: 10,
        padding: 10
    }
});

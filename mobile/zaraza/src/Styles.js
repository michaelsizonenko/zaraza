import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    chargingStationCounterWrapper: {
        position: 'absolute',
        bottom: "5%",
        left: "5%",
        backgroundColor: "#FFFFFF"
    },
    toggleConfigWrapper: {
        position: 'absolute',
        bottom: "5%",
        right: "5%",
        backgroundColor: "#FFFFFF"
    },
    toggleConfig: {
        margin: 5
    },
    chargingStationCounter: {
        margin: 5
    },
    bold: {
        fontWeight: "bold"
    },
    pwStWrapper: {
        marginLeft: 8,
        width: 32,
        height: 44,
        overflow: 'hidden',
        position: 'absolute',
    },
    greenPwSt: {
        marginLeft: -128,
        width: 320,
        height: 44,
    },
    clusterWrapper: {

    },
    cluster: {

    }
});
import * as React from 'react';
import {View, Button, Text, StyleSheet, SafeAreaView, Alert} from 'react-native';


export default class RegisterScreen extends React.Component {

    render() {
        return (
            <React.Fragment>

                <SafeAreaView style={styles.container}>
                    <View>
                        <Text style={styles.title}>Register form</Text>
                        <Button
                            title={"Register"}
                            onPress={() => Alert.alert('Simple Button pressed')}
                        />
                    </View>
                </SafeAreaView>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 16,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        fontSize: 20
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

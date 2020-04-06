import * as React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Formik} from "formik";


export default class ScreeningScreen extends React.Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Formik></Formik>
                </ScrollView>
            </SafeAreaView>
        );
    }
}


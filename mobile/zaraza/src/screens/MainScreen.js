/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component, Fragment} from 'react';
import {ScrollView, Text, Image,StyleSheet, TouchableOpacity, StatusBar, Alert, Dimensions, PermissionsAndroid} from 'react-native';
import {FAB} from "react-native-paper";


function MainScreen(){
    return (
        <ScrollView>

            <Text>Zaraza STOP online</Text>
            <Image source={require('../images/covid.png')}></Image>
            <FAB style={styles.fab}
                 icon="plus"
                 onPress={() => console.log('Pressed')}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})



export default MainScreen;

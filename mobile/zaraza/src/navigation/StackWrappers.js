import {Appbar} from "react-native-paper";
import RegisterScreen from "../screens/Register";
import ScreeningScreen from "../screens/Screening";
import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
const Stack=createStackNavigator();

export function RegisterScreenWrapper({navigation}) {
    return (
        <Stack.Navigator
            headerMode="float"
            screenOptions={{
                header: ({scene, previous, navigation}) => {
                    return (
                        <Appbar.Header>
                            <Appbar.Action icon="bars" onPress={() => navigation.toggleDrawer()}/>
                        </Appbar.Header>
                    )
                }

            }}
        >
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Screening" component={ScreeningScreen}/>
        </Stack.Navigator>
    );
}

export function ScreeningScreenWrapper({navigation}) {
    return (
        <Stack.Navigator
            headerMode="float"
            screenOptions={{
                header: ({scene, previous, navigation}) => {
                    return (
                        <Appbar.Header>
                            <Appbar.Action icon="bars" onPress={() => navigation.toggleDrawer()}/>
                            <Appbar.Action icon="chevron-circle-left" onPress={() => navigation.goBack()}/>
                        </Appbar.Header>
                    )
                }

            }}
        >
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Screening" component={ScreeningScreen}/>
        </Stack.Navigator>
    );
}


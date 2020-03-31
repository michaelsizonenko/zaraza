import {Appbar} from "react-native-paper";
import MainScreen from "../screens/MainScreen";
import FilterScreen from "../screens/FilterScreen";
import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
const Stack=createStackNavigator();
export  function MainScreenWrapper({navigation}) {
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
            <Stack.Screen name="Map" component={MainScreen}/>
            <Stack.Screen name="Filters" component={FilterScreen}/>
        </Stack.Navigator>
    );
}

export function SettingsWrapper({navigation}) {
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
            <Stack.Screen name="Filters" component={FilterScreen}/>
            <Stack.Screen name="Map" component={MainScreen}/>
        </Stack.Navigator>
    );
}


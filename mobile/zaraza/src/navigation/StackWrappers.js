import {Appbar} from 'react-native-paper'
import RegisterScreen from '../screens/Register'
import ScreeningScreen from '../screens/Screening'
import SettingsScreen from "../screens/Settings";
import * as React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import { L } from '../texts/Strings';

const Stack = createStackNavigator();

export function RegisterScreenWrapper({navigation}) {
    return (
        <Stack.Navigator
            headerMode='float'
            screenOptions={{
                header: ({scene, previous, navigation}) => {
                    return (
                        <Appbar.Header>
                            <Appbar.Action
                                icon='bars'
                                onPress={() => navigation.toggleDrawer()}
                            />
                            <Appbar.Content title={L('REGISTER')}/>
                        </Appbar.Header>
                    )
                }
            }}
        >
            <Stack.Screen name='Register' component={RegisterScreen}/>
        </Stack.Navigator>
    )
}

export function ScreeningScreenWrapper({navigation}) {
    return (
        <Stack.Navigator
            headerMode='float'
            screenOptions={{
                header: ({scene, previous, navigation}) => {
                    return (
                        <Appbar.Header>
                            <Appbar.Action
                                icon='bars'
                                onPress={() => navigation.toggleDrawer()}
                            />
                            <Appbar.Action
                                icon='chevron-circle-left'
                                onPress={() => navigation.goBack()}
                            />
                        </Appbar.Header>
                    )
                }
            }}
        >
            <Stack.Screen name='Screening' component={ScreeningScreen}/>
        </Stack.Navigator>
    )
}

export function SettingsScreenWrapper({navigation}) {
    return (
        <Stack.Navigator
            headerMode='float'
            screenOptions={{
                header: ({scene, previous, navigation}) => {
                    return (
                        <Appbar.Header>
                            <Appbar.Action
                                icon='bars'
                                onPress={() => navigation.toggleDrawer()}
                            />
                            <Appbar.Content title={L('SETTINGS')}/>
                        </Appbar.Header>
                    )
                }
            }}
        >
            <Stack.Screen name='Settings' component={SettingsScreen}/>
        </Stack.Navigator>
    )
}

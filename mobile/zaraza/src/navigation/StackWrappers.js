import {Appbar} from 'react-native-paper'
import RegisterScreen from '../screens/Register'
import ScreeningScreen from '../screens/Screening'
import SettingsScreen from "../screens/Settings";
import * as React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import { translate } from "../config/AppConfig";

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
                            <Appbar.Content title={translate("Sign up citizen")}/>
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
                            <Appbar.Content title={translate("Citizen's temperature")}/>
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
                            <Appbar.Content title={translate('Settings')}/>
                        </Appbar.Header>
                    )
                }
            }}
        >
            <Stack.Screen name='Settings' component={SettingsScreen}/>
        </Stack.Navigator>
    )
}

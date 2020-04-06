import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider as PaperProvider} from 'react-native-paper';
import {RegisterScreenWrapper, ScreeningScreenWrapper, SettingsScreenWrapper} from "./navigation/StackWrappers";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { L } from './texts/Strings';


const Drawer = createDrawerNavigator();


export default function ZarazaNavigation({navigation}) {
    return (
        <PaperProvider
            settings={{
               icon: props => <AwesomeIcon {...props} />,
            }}>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Register">

                    <Drawer.Screen
                        name="Register"
                        component={RegisterScreenWrapper}
                        options={{ drawerLabel: L('REGISTER') }}
                    />
                    <Drawer.Screen
                        name="Screening"
                        component={ScreeningScreenWrapper}
                        options={{ drawerLabel: L('SCREENING') }}
                    />
                    <Drawer.Screen
                        name="Settings"
                        component={SettingsScreenWrapper}
                        options={{ drawerLabel: L('SETTINGS') }}
                    />

                </Drawer.Navigator>
            </NavigationContainer>
        </PaperProvider>

    );

}

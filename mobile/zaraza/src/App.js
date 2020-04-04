import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider as PaperProvider} from 'react-native-paper';
import {RegisterScreenWrapper, ScreeningScreenWrapper, SettingsScreenWrapper} from "./navigation/StackWrappers";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as T from './texts/Strings';


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
                        options={{ drawerLabel: T.REGISTER }}
                    />
                    <Drawer.Screen
                        name="Screening"
                        component={ScreeningScreenWrapper}
                        options={{ drawerLabel: T.SCREENING }}
                    />
                    <Drawer.Screen
                        name="Settings"
                        component={SettingsScreenWrapper}
                        options={{ drawerLabel: T.SETTINGS }}
                    />

                </Drawer.Navigator>
            </NavigationContainer>
        </PaperProvider>

    );

}
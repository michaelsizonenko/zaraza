import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider as PaperProvider} from 'react-native-paper';
import {SettingsWrapper, MainScreenWrapper} from "./navigation/StackWrappers";
const Drawer = createDrawerNavigator();
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function ZarazaNavigation({navigation}) {
    return (
        <PaperProvider
            settings={{
               icon: props => <AwesomeIcon {...props} />,
            }}>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Main">
                    <Drawer.Screen name="Main" component={MainScreenWrapper}/>

                    <Drawer.Screen name="Filters" component={SettingsWrapper}/>
                </Drawer.Navigator>
            </NavigationContainer>
        </PaperProvider>

    );

}

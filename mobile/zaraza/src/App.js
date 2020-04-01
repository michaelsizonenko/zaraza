import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider as PaperProvider} from 'react-native-paper';
import {RegisterScreenWrapper, ScreeningScreenWrapper} from "./navigation/StackWrappers";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';


const Drawer = createDrawerNavigator();


export default function ZarazaNavigation({navigation}) {
    return (
        <PaperProvider
            settings={{
               icon: props => <AwesomeIcon {...props} />,
            }}>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Register">

                    <Drawer.Screen name="Register" component={RegisterScreenWrapper}/>

                    <Drawer.Screen name="Screening" component={ScreeningScreenWrapper}/>

                </Drawer.Navigator>
            </NavigationContainer>
        </PaperProvider>

    );

}
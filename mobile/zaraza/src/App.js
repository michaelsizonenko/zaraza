import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider as PaperProvider} from 'react-native-paper';
import {RegisterScreenWrapper, ScreeningScreenWrapper, SettingsScreenWrapper} from "./navigation/StackWrappers";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as RNLocalize from "react-native-localize";
import {translate, setI18nConfig} from './config/AppConfig'

const Drawer = createDrawerNavigator();

export default class ZarazaNavigation extends React.Component {

    constructor(props) {
        super(props);
        setI18nConfig(); // set initial config
    }

    componentDidMount() {
        RNLocalize.addEventListener("change", this.handleLocalizationChange);
    }

    componentWillUnmount() {
        RNLocalize.removeEventListener("change", this.handleLocalizationChange);
    }

    handleLocalizationChange = () => {
        setI18nConfig();
        this.forceUpdate();
    };

    render() {
        return (
            <PaperProvider
                settings={{
                    icon: props => <AwesomeIcon {...props} />,
                }}>
                <NavigationContainer>
                    {/*<Drawer.Navigator initialRouteName="Register">*/}
                    <Drawer.Navigator initialRouteName="Screening">
                        <Drawer.Screen
                            name="Register"
                            component={RegisterScreenWrapper}
                            options={{drawerLabel: translate('Sign up citizen')}}
                        />
                        <Drawer.Screen
                            name="Screening"
                            component={ScreeningScreenWrapper}
                            options={{drawerLabel: translate("Citizen's temperature")}}
                        />
                        <Drawer.Screen
                            name="Settings"
                            component={SettingsScreenWrapper}
                            options={{drawerLabel: translate('Settings')}}
                        />

                    </Drawer.Navigator>
                </NavigationContainer>
            </PaperProvider>
        );
    }
}

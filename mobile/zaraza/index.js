/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import ZarazaNavigation from './src/App';
import {name as appName} from './app.json';
import Screening from './src/screens/Screening'

//AppRegistry.registerComponent(appName, () => ZarazaNavigation);
AppRegistry.registerComponent(appName, () => Screening);

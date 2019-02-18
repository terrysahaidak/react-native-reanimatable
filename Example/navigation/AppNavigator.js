import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import { StatusBar, Platform } from 'react-native';
import screens from './screens';
import Examples from '../screens/Examples/Examples';
import TransitionBase from '../screens/TransitionBase/TransitionBase';
import Keyframes from '../screens/Keyframes/Keyframes';
import DelegateScroll from '../screens/DelegateScroll/DelegateScroll';

const AppNavigator = createStackNavigator(
  {
    [screens.Examples]: Examples,
    [screens.TransitionBase]: TransitionBase,
    [screens.Keyframes]: Keyframes,
    [screens.DelegateScroll]: DelegateScroll,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: navigation.getParam('title'),
      headerStyle: {
        marginTop:
          Platform.OS === 'ios' ? null : -StatusBar.currentHeight,
      },
    }),
  },
);

export default createAppContainer(AppNavigator);

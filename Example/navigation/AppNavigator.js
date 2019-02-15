import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import screens from './screens';
import Examples from '../screens/Examples/Examples';
import TransitionBase from '../screens/TransitionBase/TransitionBase';
import Keyframes from '../screens/Keyframes/Keyframes';

const AppNavigator = createStackNavigator(
  {
    [screens.Examples]: Examples,
    [screens.TransitionBase]: TransitionBase,
    [screens.Keyframes]: Keyframes,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: navigation.getParam('title'),
    }),
  },
);

export default createAppContainer(AppNavigator);

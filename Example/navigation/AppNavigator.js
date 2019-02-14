import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import screens from './screens';
import Examples from '../screens/Examples/Examples';
import TransitionBase from '../screens/TransitionBase/TransitionBase';

const AppNavigator = createStackNavigator({
  [screens.Examples]: Examples,
  [screens.TransitionBase]: TransitionBase,
});

export default createAppContainer(AppNavigator);

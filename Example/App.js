import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { NavigationService } from './services';

const App = () => (
  <AppNavigator ref={(ref) => NavigationService.init(ref)} />
);

export default App;

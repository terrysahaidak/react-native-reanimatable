import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { NavigationService } from './services';
// import screens from './navigation/screens';

class App extends React.PureComponent {
  componentDidMount() {
    // use it to navigate to proper screen on mount
    // useful for developing
    // NavigationService.navigate(screens.DelegateScroll);
  }

  render() {
    return (
      <AppNavigator ref={(ref) => NavigationService.init(ref)} />
    );
  }
}

export default App;

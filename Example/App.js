import React from 'react';
import { StatusBar } from 'react-native';
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
      <React.Fragment>
        <StatusBar ranslucent />
        <AppNavigator ref={(ref) => NavigationService.init(ref)} />
      </React.Fragment>
    );
  }
}

export default App;

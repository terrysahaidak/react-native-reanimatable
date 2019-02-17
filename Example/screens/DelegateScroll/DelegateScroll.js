import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import s from './styles';
import { Placeholder, Header } from './components';
import {
  MAX_HEADER_HEIGHT,
  delegate,
} from './components/Header/constants';

const App = () => (
  <View style={s.container}>
    <Animated.ScrollView
      contentContainerStyle={{
        paddingTop: MAX_HEADER_HEIGHT,
      }}
      scrollEventThrottle={1}
      onScroll={delegate.event}
    >
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </Animated.ScrollView>
    <Header />
  </View>
);

App.navigationOptions = {
  header: null,
};

export default App;

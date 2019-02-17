import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-reanimatable';
import s from './styles';
import { Placeholder, Header } from './components';
import {
  MAX_HEADER_HEIGHT,
  delegate,
} from './components/Header/constants';

const App = () => (
  <View style={s.container}>
    <ScrollView
      contentContainerStyle={{
        paddingTop: MAX_HEADER_HEIGHT,
      }}
      scrollEventThrottle={1}
      delegate={delegate}
    >
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </ScrollView>
    <Header />
  </View>
);

App.navigationOptions = {
  header: null,
};

export default App;

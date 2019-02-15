import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import {
  Reanimatable,
  createAnimationConfig,
} from 'react-native-reanimatable';
import Animated from 'react-native-reanimated';
import { Button } from '../../components';

const { width: windowWidth } = Dimensions.get('window');

const colors = {
  red: '#e74c3c',
  white: 'white',
  green: '#2ecc71',
};

const config = createAnimationConfig({
  animation: {
    type: 'timing',
    duration: 300,
  },
  values: {
    width: { from: 50, to: 200 },
    height: { from: 50, to: 200 },
    left: { from: 20, to: windowWidth - 20 - 200 },
    borderRadius: { from: 0, to: 100 },
  },
});

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 50,
  },
  animationContainer: {
    marginBottom: 100,
  },
  animatableView: {
    height: 100,
    backgroundColor: colors.red,
  },
  row: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
});

export default class App extends React.PureComponent {
  state = {
    value: true,
  };
  reanimatableRef = React.createRef();
  initialValue = this.state.value;

  toggleAnimation() {
    this.setState((state) => ({ value: !state.value }));
  }

  toggleReset() {
    this.initialValue = !this.initialValue;
    this.reanimatableRef.current.resetTo(this.initialValue);
  }

  render() {
    return (
      <View style={s.container}>
        <Reanimatable
          ref={this.reanimatableRef}
          config={config}
          value={this.state.value}
          containerStyle={s.animationContainer}
        >
          {({ translateX, ...animatedValues }) => (
            <Animated.View
              style={[s.animatableView, animatedValues]}
            />
          )}
        </Reanimatable>

        <View style={s.row}>
          <Button
            onPress={() => this.toggleAnimation()}
            text="Toggle animation"
          />

          <Button
            onPress={() => this.reanimatableRef.current.reset()}
            text="Reset"
          />

          <Button
            onPress={() => this.toggleReset()}
            text="Toggle Reset"
          />
        </View>
      </View>
    );
  }
}

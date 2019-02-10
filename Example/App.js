import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Reanimatable } from 'react-native-reanimatable';
import Animated from 'react-native-reanimated';

const colors = {
  red: 'red',
  white: 'white',
  blue: 'blue',
};

const config = {
  animation: {
    type: 'timing',
    duration: 300,
  },
  values: {
    width: { from: 100, to: 150 },
    height: { from: 100, to: 150 },
    translateX: { from: 50, to: 200 },
  },
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 100,
  },
  animationContainer: {
    marginBottom: 100,
  },
  animatableView: {
    height: 100,
    backgroundColor: colors.red,
  },
  button: {
    position: 'absolute',
    padding: 8,
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: colors.blue,
    borderRadius: 6,
  },
  buttonText: {
    color: colors.white,
  },
});

export default class App extends React.PureComponent {
  state = {
    value: false,
  };

  toggleAnimation() {
    this.setState((state) => ({ value: !state.value }));
  }

  render() {
    return (
      <View style={s.container}>
        <Reanimatable
          config={config}
          value={this.state.value}
          containerStyle={s.animationContainer}
        >
          {({ width, height, translateX }) => (
            <Animated.View
              style={[
                s.animatableView,
                { width, height, transform: [{ translateX }] },
              ]}
            />
          )}
        </Reanimatable>

        <TouchableOpacity
          onPress={() => this.toggleAnimation()}
          style={s.button}
        >
          <Text style={s.buttonText}>Toggle animation</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

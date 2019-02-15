import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import {
  Reanimatable,
  createAnimationConfig,
} from 'react-native-reanimatable';
import Animated from 'react-native-reanimated';

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
  button: {
    position: 'absolute',
    padding: 8,
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: colors.green,
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
          {({ translateX, ...animatedValues }) => (
            <Animated.View
              style={[s.animatableView, animatedValues]}
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

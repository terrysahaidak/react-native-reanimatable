import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Reanimatable } from 'react-native-reanimatable';
import Animated from 'react-native-reanimated';

const colors = {
  red: 'red',
  white: 'white',
};

const config = {
  animation: {
    type: 'timing',
    duration: 300,
  },
  values: {
    width: { from: 100, to: 150 },
    height: { from: 100, to: 150 },
    translateY: { from: 0, to: 200 },
  },
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationContainer: {
    marginBottom: 100,
  },
  animatableView: {
    height: 100,
    backgroundColor: colors.red,
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
          {({ width, height, translateY }) => (
            <Animated.View
              style={[
                s.animatableView,
                { width, height, transform: [{ translateY }] },
              ]}
            />
          )}
        </Reanimatable>

        <Button
          title="Toggle Animation"
          onPress={() => this.toggleAnimation()}
          style={s.button}
        />
      </View>
    );
  }
}

import React from 'react';
import { StyleSheet, View, Dimensions, FlatList } from 'react-native';
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

const config = {
  animation: {
    type: 'timing',
    duration: 300,
    interpolation: true,
    lazy: false,
  },
  values: {
    width: { from: 50, to: 200 },
    height: { from: 50, to: 200 },
    left: { from: 20, to: windowWidth - 20 - 200 },
    borderRadius: { from: 0, to: 100 },
  },
};

const defaultConfig = createAnimationConfig(config);

config.animation.lazy = true;
const lazyConfig = createAnimationConfig(config);

const s = StyleSheet.create({
  scroll: {
    paddingVertical: 20,
  },
  animationContainer: {
    height: 250,
    justifyContent: 'center',
  },
  animatableView: {
    backgroundColor: colors.red,
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

class Example extends React.PureComponent {
  state = {
    value: true,
  };
  initialValue = this.state.value;

  toggleAnimation() {
    this.setState((state) => ({ value: !state.value }));
  }

  render() {
    return (
      <View>
        <Reanimatable
          config={this.props.lazy ? lazyConfig : defaultConfig}
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
        </View>
      </View>
    );
  }
}

export default function App(props) {
  // performance test
  const range = Array.from(new Array(10));

  const lazy = props.navigation.getParam('lazy');

  return (
    <FlatList
      data={range}
      contentContainerStyle={s.scroll}
      renderItem={() => <Example lazy={lazy} />}
      keyExtractor={(_, i) => i.toString()}
    />
  );
}

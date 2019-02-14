import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { Reanimatable, animations } from 'react-native-reanimatable';
import A from 'react-native-reanimated';

const { width: windowWidth } = Dimensions.get('window');

const colors = {
  red: '#e74c3c',
  white: 'white',
  green: '#2ecc71',
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 50,
  },
  animatableView: {
    height: 100,
    width: 100,
    backgroundColor: colors.red,
  },
});

export const keyframes = {
  0: {
    opacity: 1,
    scale: 1,
  },
  50: {
    opacity: 1,
    scale: 0.3,
  },
  100: {
    opacity: 0,
    scale: 0,
  },
};

function generateRanges(pairs, duration) {
  return pairs.reduce(
    (acc, current) => {
      const [frame, value] = current;
      const fixedFrame = +frame;
      acc.inputRange.push(
        fixedFrame === 0 ? 0 : (fixedFrame * duration) / 100,
      );
      acc.outputRange.push(+value);

      return acc;
    },
    {
      inputRange: [],
      outputRange: [],
    },
  );
}

function normalizeValues(keyframes) {
  return Object.keys(keyframes).reduce((acc, frameName) => {
    const currentFrame = keyframes[frameName];

    Object.keys(currentFrame).forEach((propName) => {
      const stylePairs = [frameName, currentFrame[propName]];
      if (Array.isArray(acc[propName])) {
        acc[propName].push(stylePairs);
      } else {
        acc[propName] = [stylePairs];
      }
    });

    return acc;
  }, {});
}

function generateInterpolations({ keyframes, duration, baseValue }) {
  const normalized = normalizeValues(keyframes);

  return Object.keys(normalized).reduce((acc, name) => {
    const pairs = normalized[name];

    const animatedValue = A.interpolate(baseValue, {
      // pairs = [[frameName, value], [frameName, value]]
      ...generateRanges(pairs, duration),
      extrapolate: A.Extrapolate.CLAMP,
    });

    acc[name] = animatedValue;

    return acc;
  }, {});
}

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.interpolation = new A.Value(0);
    const duration = 1000;

    const clock = new A.Clock();

    this.animation = animations.runTiming({
      clock,
      oppositeClock: new A.Clock(),
      value: this.interpolation,
      dest: duration,
      duration,
    });

    this.values = generateInterpolations({
      keyframes,
      duration,
      baseValue: this.interpolation,
    });
  }

  render() {
    const { opacity, scale } = this.values;
    return (
      <View style={s.container}>
        <A.Code exec={this.animation} />
        <A.View
          style={[
            s.animatableView,
            { opacity, transform: [{ scale }] },
          ]}
        />
      </View>
    );
  }
}

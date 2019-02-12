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
  animations,
  utils,
} from 'react-native-reanimatable';
import Animated from 'react-native-reanimated';

const { width: windowWidth } = Dimensions.get('window');

const colors = {
  red: '#e74c3c',
  white: 'white',
  green: '#2ecc71',
};

const config = {
  animation: {
    type: 'timing',
    duration: 3000,
  },
  values: {
    width: { from: 50, to: 200 },
    height: { from: 50, to: 200 },
    left: { from: 20, to: windowWidth - 20 - 200 },
    borderRadius: { from: 0, to: 100 },
    backgroundColor: { from: colors.red, to: colors.green },
  },
};

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
    width: 100,
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
  constructor(props) {
    super(props);

    const fromColor = utils.colorToRGBArray(colors.red);
    const toColor = utils.colorToRGBArray(colors.red);

    fromColor.pop();
    toColor.pop();

    const colorsArr = [];

    const timings = fromColor.reduce((acc, current, index) => {
      const value = current;
      colorsArr.push(value);
      const dest = toColor[index];

      const clock = new Animated.Clock();
      const oppositeClock = new Animated.Clock();

      const animation = animations.runTiming({
        clock,
        oppositeClock,
        value,
        dest,
        duration: 3000,
      });

      acc.push(animation);

      return acc;
    }, []);

    this.left = new Animated.Value(20);
    const destLeft = 50;

    const clock = new Animated.Clock();
    const oppositeClock = new Animated.Clock();

    timings.push(
      animations.runTiming({
        clock,
        oppositeClock,
        value: this.left,
        dest: destLeft,
        duration: 3000,
      }),
    );

    this.animation = Animated.block(timings);

    const [r, g, b] = colorsArr;

    this.color = Animated.color(r, g, b, 1);
  }

  state = {
    value: false,
  };

  toggleAnimation() {
    this.setState((state) => ({ value: !state.value }));
  }

  render() {
    return (
      <View style={s.container}>
        <Animated.Code exec={this.animation} />
        {/* <Reanimatable
          config={config}
          value={this.state.value}
          containerStyle={s.animationContainer}
        >
          {({ translateX, ...animatedValues }) => ( */}
        <Animated.View
          style={[
            s.animatableView,
            { backgroundColor: this.color, left: this.left },
          ]}
        />
        {/* )} */}
        {/* </Reanimatable> */}

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

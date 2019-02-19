import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
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

const size = 100;

const config = createAnimationConfig({
  animation: {
    duration: 2000,
  },
  keyframes: {
    0: {
      opacity: 0,
      scale: 1,
      left: 0,
      top: 0,
    },
    25: {
      opacity: 0.7,
      scale: 0.3,
      left: (windowWidth - size) / 4,
      top: 100,
    },
    50: {
      opacity: 1,
      scale: 1,
      left: (windowWidth - size) / 2,
      top: 0,
    },
    75: {
      opacity: 0.7,
      scale: 0.3,
      left: (windowWidth - size) / 1.5,
      top: 100,
    },
    100: {
      opacity: 0,
      scale: 1,
      left: windowWidth - size,
      top: 0,
    },
  },
});

const s = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: colors.white,
    paddingTop: 50,
  },
  animationContainer: {
    marginBottom: 100,
  },
  animatableView: {
    height: size,
    backgroundColor: colors.red,
    width: size,
  },
  button: {
    padding: 8,
    backgroundColor: colors.green,
    borderRadius: 6,
  },
  buttonText: {
    color: colors.white,
  },
  row: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
});

class Example extends React.PureComponent {
  state = {
    value: false,
  };
  animationRef = React.createRef();

  toggleAnimation() {
    this.animationRef.current.reset();
  }

  render() {
    return (
      <View style={s.container}>
        <Reanimatable
          ref={this.animationRef}
          config={config}
          value={this.state.value}
          containerStyle={s.animationContainer}
        >
          {({ scale, ...animationValues }) => (
            <Animated.View
              style={[
                s.animatableView,
                {
                  ...animationValues,
                  transform: [{ scale }],
                },
              ]}
            />
          )}
        </Reanimatable>

        <View style={s.row}>
          <TouchableOpacity
            onPress={() => this.animationRef.current.reset()}
            style={s.button}
          >
            <Text style={s.buttonText}>Restart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default class App extends React.PureComponent {
  state = {
    showSecond: false,
  };

  componentDidMount() {
    // testing each animation has its own state
    setTimeout(() => this.setState({ showSecond: true }), 1000);
  }

  render() {
    return (
      <ScrollView>
        <Example />

        {this.state.showSecond && <Example />}
      </ScrollView>
    );
  }
}

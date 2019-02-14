import React from 'react';
import T from 'prop-types';
import { InteractionManager } from 'react-native';
import A from 'react-native-reanimated';
import { runTiming } from '../animations';

function generateRanges(pairs, duration) {
  return pairs.reduce(
    (acc, current) => {
      const [frame, value] = current;
      const frameNumber = +frame;
      acc.inputRange.push(
        frameNumber === 0 ? 0 : (frameNumber * duration) / 100,
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

class KeyframesAnimation extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      values: {},
      animation: null,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState(this.createAnimation());
    });
  }

  createAnimation() {
    this.interpolation = new A.Value(0);
    const clock = new A.Clock();

    const animation = runTiming({
      clock,
      oppositeClock: new A.Clock(),
      value: this.interpolation,
      dest: this.props.duration,
      duration: this.props.duration,
    });

    const values = generateInterpolations({
      keyframes: this.props.keyframes,
      duration: this.props.duration,
      baseValue: this.interpolation,
    });

    return {
      animation,
      values,
    };
  }

  render() {
    return (
      <React.Fragment>
        {this.state.animation && (
          <A.Code exec={this.state.animation} />
        )}
        {this.props.children(this.state.values)}
      </React.Fragment>
    );
  }
}

KeyframesAnimation.propTypes = {
  children: T.func,
  keyframes: T.object,
  duration: T.number,
};

export default KeyframesAnimation;

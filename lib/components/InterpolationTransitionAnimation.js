import React, { Component } from 'react';
import { InteractionManager } from 'react-native';
import T from 'prop-types';
import A from 'react-native-reanimated';
import { ANIMATION_STATE } from '../core/constants';
import { runTiming } from '../core/animations';

function getProperAnimation(reanimatableConfig, animationConfig) {
  // const { type, ...animation } = reanimatableConfig.animation;

  // switch (type) {
  // case 'timing':
  return runTiming(
    Object.assign({}, animationConfig, reanimatableConfig),
  );

  // default:
  //   throw new Error(
  //     `Unsupported animation of type: ${type}.\nSupported are timing, spring, decay.`,
  //   );
  // }
}

class InterpolationTransitionAnimation extends Component {
  constructor(props) {
    super(props);

    const { values, animation } = props.generate;
    const { value } = props;

    this._values = values;
    this._keys = Object.keys(values);
    this._animation = animation;

    this.animationState = null;
    this.interpolator = null;

    const animationValues = this._keys.reduce((acc, key) => {
      const current = values[key];
      acc[key] = value ? current.to : current.from;
      return acc;
    }, {});

    this.state = {
      animationValues,
    };
  }

  componentDidMount() {
    // in order to reset animation values and apply it to layout
    // we have to do it on a mounted component
    // the user won't notice it
    // this.reset();

    InteractionManager.runAfterInteractions(() => {
      this.animationState = new A.Value(ANIMATION_STATE.START_POINT);
      this.interpolator = new A.Value(0);
      const animationValues = this._createAnimation(this.props.value);

      this.setState({
        animationValues,
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.animationState.setValue(
        !this.props.value
          ? ANIMATION_STATE.PLAY_FORWARD
          : ANIMATION_STATE.PLAY_BACKWARD,
      );
    }
  }

  _createAnimation(value) {
    const animation = {};
    this._keys.forEach((key, index) => {
      const first = index === 0;
      const animatedBlock = [];

      if (first) {
        const forwardAnimationClock = new A.Clock();
        const backwardAnimationClock = new A.Clock();

        const forwardAnimationConfig = {
          clock: forwardAnimationClock,
          oppositeClock: backwardAnimationClock,
          value: this.interpolator,
          dest: this._animation.duration,
        };

        const backwardAnimationConfig = {
          clock: backwardAnimationClock,
          oppositeClock: forwardAnimationClock,
          value: this.interpolator,
          dest: 0,
        };

        if (first) {
          forwardAnimationConfig.onFinish = [
            A.set(this.animationState, ANIMATION_STATE.END_POINT),
          ];

          backwardAnimationConfig.onFinish = [
            A.set(this.animationState, ANIMATION_STATE.START_POINT),
          ];
        }

        const forwardTiming = getProperAnimation(
          this._animation,
          value ? forwardAnimationConfig : backwardAnimationConfig,
        );
        const backwardTiming = getProperAnimation(
          this._animation,
          value ? backwardAnimationConfig : forwardAnimationConfig,
        );

        animatedBlock.push(
          A.cond(
            A.eq(this.animationState, ANIMATION_STATE.PLAY_FORWARD),
            forwardTiming,
          ),
          A.cond(
            A.eq(this.animationState, ANIMATION_STATE.PLAY_BACKWARD),
            backwardTiming,
          ),
        );
      }

      const item = this._values[key];

      const inputRange = [0, this._animation.duration];
      const outputRange = [item.from, item.to];

      if (value) {
        outputRange.reverse();
      }

      const valueAnimation = A.interpolate(this.interpolator, {
        inputRange,
        outputRange,
        extrapolate: A.Extrapolate.CLAMP,
      });

      animatedBlock.push(valueAnimation);

      animation[key] = A.block(animatedBlock);
    });

    return animation;
  }

  reset() {
    this.resetTo(this.initialValue);
  }

  resetTo(value) {
    const animationValues = this._createAnimation(this.props.value);

    this.setState(
      {
        animationValues,
      },
      () =>
        this.animationState.setValue(
          !value
            ? ANIMATION_STATE.END_POINT
            : ANIMATION_STATE.START_POINT,
        ),
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children(this.state.animationValues)}
      </React.Fragment>
    );
  }
}

InterpolationTransitionAnimation.propTypes = {
  value: T.bool,
  children: T.func,
  generate: T.func,
};

export default InterpolationTransitionAnimation;

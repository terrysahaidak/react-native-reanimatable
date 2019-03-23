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

class TransitionAnimation extends Component {
  constructor(props) {
    super(props);

    const { values, animation, value } = props.generate;

    this.animationState = new A.Value(ANIMATION_STATE.START_POINT);

    this.animationValues = {};

    Object.keys(values).forEach((key, index) => {
      const item = values[key];
      const { from, to } = item;

      const initialValue = value ? to : from;

      const tempAnimationValue = new A.Value(initialValue);

      const first = index === 0;

      const forwardAnimationClock = new A.Clock();
      const backwardAnimationClock = new A.Clock();

      const forwardAnimationConfig = {
        clock: forwardAnimationClock,
        oppositeClock: backwardAnimationClock,
        value: tempAnimationValue,
        dest: to,
      };

      const backwardAnimationConfig = {
        clock: backwardAnimationClock,
        oppositeClock: forwardAnimationClock,
        value: tempAnimationValue,
        dest: from,
      };

      if (first) {
        forwardAnimationConfig.onFinish = A.block([
          A.set(this.animationState, ANIMATION_STATE.END_POINT),
        ]);

        backwardAnimationConfig.onFinish = A.block([
          A.set(this.animationState, ANIMATION_STATE.START_POINT),
        ]);
      }

      const forwardTiming = getProperAnimation(
        animation,
        forwardAnimationConfig,
      );
      const backwardTiming = getProperAnimation(
        animation,
        backwardAnimationConfig,
      );

      this.animationValues[key] = A.block([
        A.cond(
          A.eq(this.animationState, ANIMATION_STATE.PLAY_FORWARD),
          forwardTiming,
          A.cond(
            A.eq(this.animationState, ANIMATION_STATE.PLAY_BACKWARD),
            backwardTiming,
            tempAnimationValue,
          ),
        ),
      ]);
    });
  }

  // componentDidMount() {
  //   // in order to reset animation values and apply it to layout
  //   // we have to do it on a mounted component
  //   // the user won't notice it
  //   this.reset();

  //   InteractionManager.runAfterInteractions(() => {

  //     this.setState({
  //       animation,
  //     });
  //   });
  // }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.animationState.setValue(
        this.props.value
          ? ANIMATION_STATE.PLAY_FORWARD
          : ANIMATION_STATE.PLAY_BACKWARD,
      );
    }
  }

  reset() {
    this.resetTo(this.initialValue);
  }

  resetTo(value) {
    // this._operations.reset(value);
    this.animationState.setValue(
      !value
        ? ANIMATION_STATE.END_POINT
        : ANIMATION_STATE.START_POINT,
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children(this.animationValues)}
      </React.Fragment>
    );
  }
}

TransitionAnimation.propTypes = {
  value: T.bool,
  children: T.func,
  generate: T.func,
};

export default TransitionAnimation;

import React, { Component } from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import A from 'react-native-reanimated';
import { runTiming } from './animations';

const ANIMATION_STATE = {
  INITIAL: 0,
  START: 1,
  END: 2,
  BACK: 3,
};

class Reanimatable extends Component {
  constructor(props) {
    super(props);

    this.animation = null;
    this.animationState = new A.Value(ANIMATION_STATE.INITIAL);

    const state = {};
    Object.entries(props.config.values).forEach(
      ([propName, animation]) => {
        const { from, to } = animation;
        state[propName] = new A.Value(!props.value ? from : to);
      },
    );

    this.state = state;

    this.animation = this.createAnimation();
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.animationState.setValue(
        this.props.value
          ? ANIMATION_STATE.START
          : ANIMATION_STATE.BACK,
      );
    }
  }

  getProperAnimation(config) {
    const { type, ...animation } = this.props.config.animation;

    switch (type) {
      case 'timing':
        return runTiming(Object.assign({}, config, animation));

      default:
        throw new Error(
          `Unsupported animation of type: ${type}.\nSupported are timing, spring, decay.`,
        );
    }
  }

  createAnimation() {
    const entires = Object.entries(this.props.config.values);

    const { forwardAnimations, backwardAnimations } = entires.reduce(
      (acc, [key, animation], index) => {
        const { from, to } = animation;
        const currentValue = this.state[key];

        const first = index === 0;

        const forwardAnimationClock = new A.Clock();
        const backwardAnimationClock = new A.Clock();

        const forwardAnimationConfig = {
          clock: forwardAnimationClock,
          oppositeClock: backwardAnimationClock,
          value: currentValue,
          dest: to,
        };

        const backwardAnimationConfig = {
          clock: backwardAnimationClock,
          oppositeClock: forwardAnimationClock,
          value: currentValue,
          dest: from,
        };

        if (first) {
          forwardAnimationConfig.onFinish = A.block([
            A.set(this.animationState, ANIMATION_STATE.END),
          ]);

          backwardAnimationConfig.onFinish = A.block([
            A.set(this.animationState, ANIMATION_STATE.INITIAL),
          ]);
        }

        const forwardTiming = this.getProperAnimation(
          forwardAnimationConfig,
        );
        const backwardTiming = this.getProperAnimation(
          backwardAnimationConfig,
        );

        acc.forwardAnimations.push(forwardTiming);

        acc.backwardAnimations.push(backwardTiming);

        return acc;
      },
      {
        forwardAnimations: [],
        backwardAnimations: [],
      },
    );

    return A.block([
      A.cond(
        A.eq(this.animationState, ANIMATION_STATE.START),
        // run all the forward animations
        A.block(forwardAnimations),
      ),

      A.cond(
        A.eq(this.animationState, ANIMATION_STATE.BACK),
        // run all the backward animations
        A.block(backwardAnimations),
      ),
    ]);
  }

  render() {
    const content = (
      <React.Fragment>
        <A.Code exec={this.animation} />
        {this.props.children(this.state)}
      </React.Fragment>
    );

    if (this.props.containerStyle) {
      return <View style={this.props.containerStyle}>{content}</View>;
    }

    return content;
  }
}

Reanimatable.propTypes = {
  config: T.object,
  value: T.bool,
  children: T.func,
  duration: T.number,
};

export default Reanimatable;

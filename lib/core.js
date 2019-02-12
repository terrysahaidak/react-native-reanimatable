import React, { Component } from 'react';
import {
  View,
  ViewPropTypes,
  InteractionManager,
} from 'react-native';
import T from 'prop-types';
import A from 'react-native-reanimated';
import { runTiming } from './animations';
import { animationConfigPropTypes } from './propTypes';

const ANIMATION_STATE = {
  START_POINT: 0,
  PLAY_FORWARD: 1,
  END_POINT: 2,
  PLAY_BACKWARD: 3,
};

class Reanimatable extends Component {
  constructor(props) {
    super(props);

    this.animationState = new A.Value(ANIMATION_STATE.START_POINT);

    const state = {
      values: {},
      animation: null,
    };

    Object.key(props.config.values).forEach((valueName) => {
      const { from, to } = props.config.values[valueName];
      state.values[valueName] = new A.Value(!props.value ? from : to);
    });

    this.state = state;
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        ...this.state,
        animation: this.createAnimation(),
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.animationState.setValue(
        this.props.value
          ? ANIMATION_STATE.PLAY_FORWARD
          : ANIMATION_STATE.PLAY_BACKWARD,
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
    const { forwardAnimations, backwardAnimations } = Object.keys(
      this.props.config.values,
    ).reduce(
      (acc, key, index) => {
        const animation = this.props.config.values[key];
        const { from, to } = animation;
        const currentValue = this.state.values[key];

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
            A.set(this.animationState, ANIMATION_STATE.END_POINT),
          ]);

          backwardAnimationConfig.onFinish = A.block([
            A.set(this.animationState, ANIMATION_STATE.START_POINT),
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
        A.eq(this.animationState, ANIMATION_STATE.PLAY_FORWARD),
        // run all the forward animations
        A.block(forwardAnimations),
      ),

      A.cond(
        A.eq(this.animationState, ANIMATION_STATE.PLAY_BACKWARD),
        // run all the backward animations
        A.block(backwardAnimations),
      ),
    ]);
  }

  render() {
    const content = (
      <React.Fragment>
        {this.state.animation && (
          <A.Code exec={this.state.animation} />
        )}
        {this.props.children(this.state.values)}
      </React.Fragment>
    );

    if (this.props.containerStyle) {
      return <View style={this.props.containerStyle}>{content}</View>;
    }

    return content;
  }
}

Reanimatable.propTypes = {
  config: animationConfigPropTypes,
  value: T.bool,
  children: T.func,
  duration: T.number,
  containerStyle: ViewPropTypes.style,
};

export default Reanimatable;

import React, { Component } from 'react';
import T from 'prop-types';
import A from 'react-native-reanimated';
import { ANIMATION_STATE } from '../core/constants';

class TransitionAnimation extends Component {
  constructor(props) {
    super(props);

    const { values, animationState, animation } = props._internal;

    this.animationState = animationState;

    this.state = {
      values,
      animation,
    };
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

  render() {
    return (
      <React.Fragment>
        <A.Code exec={this.state.animation} />
        {this.props.children(this.state.values)}
      </React.Fragment>
    );
  }
}

TransitionAnimation.propTypes = {
  values: T.object,
  animation: T.object,
  value: T.bool,
  children: T.func,
  duration: T.number,
};

export default TransitionAnimation;

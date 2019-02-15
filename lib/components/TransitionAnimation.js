import React, { Component } from 'react';
import T from 'prop-types';
import A from 'react-native-reanimated';
import { ANIMATION_STATE } from '../core/constants';

class TransitionAnimation extends Component {
  constructor(props) {
    super(props);

    const {
      values,
      animationState,
      animation,
      operations,
    } = props._internal;

    this.initialValue = props.value;

    this._operations = operations;

    this.animationState = animationState;

    this.state = {
      values,
      animation,
    };
  }

  componentDidMount() {
    // in order to reset animation values and apply it to layout
    // we have to do it on a mounted component
    // the user won't notice it
    this.reset();
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

  componentWillUnmount() {
    this.reset();
  }

  reset() {
    this.resetTo(this.initialValue);
  }

  resetTo(value) {
    this._operations.reset(value);
    this.animationState.setValue(
      !value
        ? ANIMATION_STATE.END_POINT
        : ANIMATION_STATE.START_POINT,
    );
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

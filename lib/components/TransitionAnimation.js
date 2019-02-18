import React, { Component } from 'react';
import { InteractionManager } from 'react-native';
import T from 'prop-types';
import A from 'react-native-reanimated';
import { ANIMATION_STATE } from '../core/constants';

class TransitionAnimation extends Component {
  constructor(props) {
    super(props);

    this.initialValue = props.value;

    const {
      animationState,
      operations,
      values,
    } = this.props.generate();

    this._operations = operations;

    this.animationState = animationState;

    this.state = {
      values,
    };
  }

  componentDidMount() {
    // in order to reset animation values and apply it to layout
    // we have to do it on a mounted component
    // the user won't notice it
    this.reset();

    InteractionManager.runAfterInteractions(() => {
      const animation = this._operations.createAnimation();

      this.setState({
        animation,
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
        {this.state.animation && (
          <A.Code exec={this.state.animation} />
        )}
        {this.props.children(this.state.values)}
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

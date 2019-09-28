import React, { Component } from 'react';
import T from 'prop-types';
import { InteractionManager } from 'react-native';
import { ANIMATION_STATE } from '../core/constants';

class InterpolationTransitionAnimation extends Component {
  constructor(props) {
    super(props);

    const { value, generate } = props;
    const { lazy, initialAnimationValues, operations } = generate();

    this._lazy = lazy;
    this._operations = operations;
    this._initialAnimationValues = initialAnimationValues;
    this.animationState = null;
    this.interpolator = null;
    this._initialized = false;

    this.state = {
      animationValues: initialAnimationValues[value ? 'to' : 'from'],
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      if (!this._lazy) {
        this._initAnimation();
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      if (this._lazy && !this._initialized) {
        this._initAnimation(prevProps.value);

        this._initialized = true;
      } else {
        this._toggleAnimationState();
      }
    }
  }

  _initAnimation(value = this.props.value) {
    const {
      animationValues,
      interpolator,
      animationState,
    } = this._operations.createAnimation(value);
    this.interpolator = interpolator;
    this.animationState = animationState;

    this.setState(
      {
        animationValues,
      },
      () => {
        if (this._lazy) {
          this._toggleAnimationState();
        }
      },
    );
  }

  _toggleAnimationState() {
    this.animationState.setValue(
      this.props.value
        ? ANIMATION_STATE.PLAY_FORWARD
        : ANIMATION_STATE.PLAY_BACKWARD,
    );
  }

  // reset() {
  //   this.resetTo(this.initialValue);
  // }

  // resetTo(value) {
  //   const animationValues = this._initAnimation();

  //   this.setState(
  //     {
  //       animationValues,
  //     },
  //     () =>
  //       this.animationState.setValue(
  //         !value
  //           ? ANIMATION_STATE.END_POINT
  //           : ANIMATION_STATE.START_POINT,
  //       ),
  //   );
  // }

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

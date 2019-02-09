import React, { PureComponent } from 'react';
import T from 'prop-types';
import Reanimatable from '../core';

class LoopAnimation extends PureComponent {
  state = {
    value: false,
  };
  count = this.props.iterationCount;

  componentDidMount() {
    this._interval = setInterval(() => {
      this.toggleState();
    }, 300);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  toggleState() {
    this.setState((state) => ({ value: !state.value }), () => {
      if (typeof this.count === 'number') {
        if (this.count > 0) {
          this.count = this.count - 1;
        } else {
          clearInterval(this._interval);
        }
      }
    });
  }

  render() {
    return React.cloneElement(Reanimatable, {
      ...this.props,
      value: this.state.value,
    });
  }
}

LoopAnimation.propTypes = {
  iterationCount: T.number,
};

export default LoopAnimation;

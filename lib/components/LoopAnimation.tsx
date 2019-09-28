import React, { PureComponent } from 'react'
import T from 'prop-types'
import TransitionAnimation from './TransitionAnimation'
import { animationConfigPropTypes } from './propTypes'

// TODO: config has to have proper typing
interface ILoopAnimationProps {
  autoplay: boolean,
  config: {
    animation: {
      duration: number
    },
  }
}

interface ILoopAnimationState {
  value: boolean,
}

class LoopAnimation extends PureComponent<ILoopAnimationProps, ILoopAnimationState> {
  count: number
  _interval: NodeJS.Timeout

  constructor(props) {
    super(props)

    this.count = props.iterationCount
    this.state = {
      value: false,
    };
  }

  componentDidMount() {
    if (this.props.autoplay) {
      this.play()
    }
  }

  componentWillUnmount() {
    this.stop()
  }

  toggleState() {
    this.setState(
      (state) => ({ value: !state.value }),
      () => {
        if (typeof this.count === 'number') {
          if (this.count > 0) {
            this.count = this.count - 1;
          } else {
            clearInterval(this._interval);
          }
        }
      },
    );
  }

  play(count: number = 0) {
    this.count = count || this.count;

    const { duration } = this.props.config.animation;

    this._interval = setInterval(() => {
      this.toggleState();
    }, duration);
  }

  stop() {
    clearInterval(this._interval);
  }

  render() {
    return React.cloneElement(TransitionAnimation, {
      ...this.props,
      value: this.state.value,
    });
  }
}

LoopAnimation.propTypes = {
  iterationCount: T.number,
  config: animationConfigPropTypes.isRequired,
  autoplay: T.bool,
};

LoopAnimation.defaultProps = {
  autoplay: true,
};

export default LoopAnimation;

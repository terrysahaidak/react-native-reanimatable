import React from 'react';
import T from 'prop-types';
import A from 'react-native-reanimated';

class KeyframesAnimation extends React.PureComponent {
  constructor(props) {
    super(props);

    const { values, animation, operations } = props._internal;
    this._operations = operations;

    this.state = {
      values,
      animation,
    };
  }

  componentWillUnmount() {
    if (this.props.resetOnUnmount) {
      this._reset();
    }
  }

  reset() {
    this._operations.reset();
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

KeyframesAnimation.propTypes = {
  children: T.func,
  resetOnUnmount: T.bool,
};

KeyframesAnimation.defaultProps = {
  resetOnUnmount: true,
};

export default KeyframesAnimation;

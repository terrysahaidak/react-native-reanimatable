import React from 'react';
import T from 'prop-types';
import A from 'react-native-reanimated';

class KeyframesAnimation extends React.PureComponent {
  constructor(props) {
    super(props);

    const { values, animation } = props.config._internal;

    this.state = {
      values,
      animation,
    };
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
  keyframes: T.object,
  duration: T.number,
};

export default KeyframesAnimation;

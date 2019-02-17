import React from 'react';
import T from 'prop-types';

class DelegateAnimation extends React.PureComponent {
  constructor(props) {
    super(props);

    const { values } = props._internal;

    this.state = {
      values,
    };
  }

  render() {
    return this.props.children(this.state.values);
  }
}

DelegateAnimation.propTypes = {
  children: T.func,
};

export default DelegateAnimation;

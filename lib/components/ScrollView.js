import React from 'react';
import T from 'prop-types';
import A from 'react-native-reanimated';

class ScrollView extends React.PureComponent {
  componentWillUnmount() {
    this.props.delegate.reset();
  }

  render() {
    return (
      <A.ScrollView
        {...this.props}
        onScroll={this.props.delegate.event}
      />
    );
  }
}

ScrollView.propTypes = {
  delegate: T.shape({
    event: T.object,
    reset: T.func,
  }),
};

export default ScrollView;

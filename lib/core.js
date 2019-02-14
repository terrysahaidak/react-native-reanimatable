import React from 'react';
import { ViewPropTypes, View } from 'react-native';
import T from 'prop-types';
import { animationConfigPropTypes } from './propTypes';
import {
  KeyframesAnimation,
  TransitionAnimation,
} from './components';

function Reanimatable({
  config, value, containerStyle, ...rest
}) {
  let content = null;

  if (config.keyframes) {
    content = <KeyframesAnimation {...config} {...rest} />;
  } else {
    content = (
      <TransitionAnimation {...config} value={value} {...rest} />
    );
  }

  if (this.containerStyle) {
    return <View style={containerStyle}>{content}</View>;
  }

  return content;
}

Reanimatable.propTypes = {
  config: animationConfigPropTypes,
  value: T.bool,
  containerStyle: ViewPropTypes.style,
};

export default Reanimatable;

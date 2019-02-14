import React from 'react';
import { ViewPropTypes, View } from 'react-native';
import T from 'prop-types';
import { animationConfigPropTypes } from './propTypes';
import { KeyframesAnimation, TransitionAnimation } from './';
import { ANIMATION_TYPE } from '../core/constants';

const validateConfig = (config) => {
  if (typeof config._internal !== 'object') {
    throw new Error(
      'Invalid config provided for the Reanimatable component. Did you forget to use "createAnimationConfig"?',
    );
  }
};

function Reanimatable({
  config, value, containerStyle, ...rest
}) {
  validateConfig(config);

  const animationConfig = Object.assign({}, config, {
    initialValue: value,
  });
  let content = null;

  switch (animationConfig.type) {
    case ANIMATION_TYPE.KEYFRAMES:
      content = <KeyframesAnimation {...animationConfig} {...rest} />;
      break;
    case ANIMATION_TYPE.TRANSITION:
    default:
      content = (
        <TransitionAnimation
          {...animationConfig}
          value={value}
          {...rest}
        />
      );
      break;
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

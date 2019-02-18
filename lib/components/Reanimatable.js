import React from 'react';
import { ViewPropTypes, View } from 'react-native';
import T from 'prop-types';
import { animationConfigPropTypes } from './propTypes';
import {
  KeyframesAnimation,
  TransitionAnimation,
  DelegateAnimation,
} from './';
import { ANIMATION_TYPE } from '../core/constants';

const validateConfig = (config) => {
  if (typeof config.generate !== 'function') {
    throw new Error(
      'Invalid config provided for the Reanimatable component. Did you forget to use "createAnimationConfig"?',
    );
  }
};
// prettier-ignore
const Reanimatable = React.forwardRef(({
  config,
  value,
  containerStyle,
  ...rest
}, ref) => {
// prettier-ignore
  validateConfig(config);

  const animationConfig = Object.assign({}, config, {
    initialValue: value,
  });
  let content = null;

  switch (animationConfig.type) {
    case ANIMATION_TYPE.KEYFRAMES:
      content = (
        <KeyframesAnimation
          ref={ref}
          {...animationConfig}
          {...rest}
        />
      );
      break;
    case ANIMATION_TYPE.DELEGATE:
      content = (
        <DelegateAnimation
          ref={ref}
          {...animationConfig}
          {...rest}
        />
      );
      break;
    case ANIMATION_TYPE.TRANSITION:
    default:
      content = (
        <TransitionAnimation
          ref={ref}
          {...animationConfig}
          value={value}
          {...rest}
        />
      );
      break;
  }

  if (containerStyle) {
    return <View style={containerStyle}>{content}</View>;
  }

  return content;
});

Reanimatable.propTypes = {
  config: animationConfigPropTypes,
  value: T.bool,
  containerStyle: ViewPropTypes.style,
};

export default Reanimatable;

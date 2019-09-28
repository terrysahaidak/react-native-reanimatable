import React, { ReactElement } from 'react'
import T from 'prop-types'

import { ViewPropTypes, View } from 'react-native'
import { IAnimationConfigResult, IReanimatable } from 'react-native-reanimatable'

import { animationConfigPropTypes } from './propTypes'
import {
  KeyframesAnimation,
  InterpolationTransitionAnimation,
  TransitionAnimation,
  DelegateAnimation,
} from './index'

import { ANIMATION_TYPE } from '../core/constants'


const validateConfig = (config: IAnimationConfigResult) => {
  if (typeof config.generate !== 'function') {
    throw new Error(
      'Invalid config provided for the Reanimatable component. Did you forget to use "createAnimationConfig"?',
    )
  }
}

// prettier-ignore
const Reanimatable = React.forwardRef(({
  config,
  value,
  containerStyle,
  ...rest
}: IReanimatable, ref): ReactElement<IReanimatable, any> => {
  // prettier-ignore
  validateConfig(config)

  const animationConfig = Object.assign({}, config, {
    initialValue: value,
  })
  let content: ReactElement<IReanimatable> = null

  switch (animationConfig.type) {
    case ANIMATION_TYPE.KEYFRAMES:
      content = (
        <KeyframesAnimation
          ref={ref}
          {...animationConfig}
          {...rest}
        />
      )
      break
    case ANIMATION_TYPE.DELEGATE:
      content = (
        <DelegateAnimation
          ref={ref}
          {...animationConfig}
          {...rest}
        />
      )
      break
    case ANIMATION_TYPE.INTERPOLATION_TRANSITION:
      content = (
        <InterpolationTransitionAnimation
          ref={ref}
          {...animationConfig}
          value={value}
          {...rest}
        />
      )
      break
    case ANIMATION_TYPE.TRANSITION:
    default:
      content = (
        <TransitionAnimation
          ref={ref}
          {...animationConfig}
          value={value}
          {...rest}
        />
      )
      break
  }

  if (containerStyle) {
    return <View style={containerStyle}>{content}</View>
  }

  return content
});

Reanimatable.propTypes = {
  config: animationConfigPropTypes,
  value: T.bool,
  containerStyle: ViewPropTypes.style,
}

export default Reanimatable

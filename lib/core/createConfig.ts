import { IAnimationConfig, IAnimationConfigResult } from 'react-native-reanimatable'

import createKeyframesAnimation from './createKeyframesAnimation'
import createTransitionAnimation from './createTransitionAnimation'
import createInterpolationTransitionAnimation from './createInterpolationTransitionAnimation'
import createDelegateAnimation from './createDelegateAnimation'

import { ANIMATION_TYPE } from './constants'

export default function createConfig(animationConfig: IAnimationConfig) {
  const config: IAnimationConfigResult = {}

  if (animationConfig.animation.delegate) {
    config.type = ANIMATION_TYPE.DELEGATE
    config.generate = createDelegateAnimation(animationConfig)
  } else if (animationConfig.keyframes) {
    config.type = ANIMATION_TYPE.KEYFRAMES
    config.generate = createKeyframesAnimation(animationConfig)
  } else if (animationConfig.animation.interpolation) {
    config.type = ANIMATION_TYPE.INTERPOLATION_TRANSITION
    config.generate = createInterpolationTransitionAnimation(
      animationConfig,
    )
  } else {
    config.type = ANIMATION_TYPE.TRANSITION
    config.generate = createTransitionAnimation(animationConfig)
  }

  return config
}

import { ANIMATION_TYPE } from './constants';
import createKeyframesAnimation from './createKeyframesAnimation';
import createTransitionAnimation from './createTransitionAnimation';
import createDelegateAnimation from './createDelegateAnimation';

export default function createConfig(animationConfig) {
  const config = {};

  if (animationConfig.animation.delegate) {
    config.type = ANIMATION_TYPE.DELEGATE;
    config.generate = createDelegateAnimation(animationConfig);
  } else if (animationConfig.keyframes) {
    config.type = ANIMATION_TYPE.KEYFRAMES;
    config.generate = createKeyframesAnimation(animationConfig);
  } else {
    config.type = ANIMATION_TYPE.TRANSITION;
    config.generate = createTransitionAnimation(animationConfig);
  }

  return config;
}

import { ANIMATION_TYPE } from './constants';
import createKeyframesAnimation from './createKeyframesAnimation';
import createTransitionAnimation from './createTransitionAnimation';

export default function createConfig(animationConfig) {
  const config = {};

  if (animationConfig.keyframes) {
    config.type = ANIMATION_TYPE.KEYFRAMES;
    config._internal = createKeyframesAnimation(animationConfig);
  } else {
    config.type = ANIMATION_TYPE.TRANSITION;
    config._internal = createTransitionAnimation(animationConfig);
  }

  return config;
}

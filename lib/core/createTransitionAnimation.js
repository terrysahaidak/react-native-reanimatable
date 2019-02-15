import A from 'react-native-reanimated';
import { ANIMATION_STATE } from './constants';
import { runTiming } from './animations';

function extractValues(values, initialValue) {
  return Object.keys(values).reduce((acc, valueName) => {
    const { from, to } = values[valueName];
    acc[valueName] = new A.Value(!initialValue ? from : to);
    return acc;
  }, {});
}

function getProperAnimation(reanimatableConfig, animationConfig) {
  const { type, ...animation } = reanimatableConfig.animation;

  switch (type) {
    case 'timing':
      return runTiming(Object.assign({}, animationConfig, animation));

    default:
      throw new Error(
        `Unsupported animation of type: ${type}.\nSupported are timing, spring, decay.`,
      );
  }
}

export default function createTransitionAnimation(config) {
  const values = extractValues(config.values, config.initialValue);
  const animationState = new A.Value(ANIMATION_STATE.START_POINT);

  const { forwardAnimations, backwardAnimations } = Object.keys(
    config.values,
  ).reduce(
    (acc, key, index) => {
      const animation = config.values[key];
      const { from, to } = animation;
      const currentValue = values[key];

      const first = index === 0;

      const forwardAnimationClock = new A.Clock();
      const backwardAnimationClock = new A.Clock();

      const forwardAnimationConfig = {
        clock: forwardAnimationClock,
        oppositeClock: backwardAnimationClock,
        value: currentValue,
        dest: to,
      };

      const backwardAnimationConfig = {
        clock: backwardAnimationClock,
        oppositeClock: forwardAnimationClock,
        value: currentValue,
        dest: from,
      };

      if (first) {
        forwardAnimationConfig.onFinish = A.block([
          A.set(animationState, ANIMATION_STATE.END_POINT),
        ]);

        backwardAnimationConfig.onFinish = A.block([
          A.set(animationState, ANIMATION_STATE.START_POINT),
        ]);
      }

      const forwardTiming = getProperAnimation(
        config,
        forwardAnimationConfig,
      );
      const backwardTiming = getProperAnimation(
        config,
        backwardAnimationConfig,
      );

      acc.forwardAnimations.push(forwardTiming);

      acc.backwardAnimations.push(backwardTiming);

      return acc;
    },
    {
      forwardAnimations: [],
      backwardAnimations: [],
    },
  );

  const animation = A.block([
    A.cond(
      A.eq(animationState, ANIMATION_STATE.PLAY_FORWARD),
      // run all the forward animations
      A.block(forwardAnimations),
    ),

    A.cond(
      A.eq(animationState, ANIMATION_STATE.PLAY_BACKWARD),
      // run all the backward animations
      A.block(backwardAnimations),
    ),
  ]);

  return {
    animation,
    values,
    animationState,
  };
}

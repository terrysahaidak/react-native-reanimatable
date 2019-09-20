import A from 'react-native-reanimated'
import { IAnimationConfig } from 'react-native-reanimatable'
import { ANIMATION_STATE } from './constants'
import { getProperAnimation } from './animations'

// TODO: Typing
export default function createTransitionAnimation(config: IAnimationConfig) {
  const valueNames = Object.keys(config.values)
  const initialAnimationValues = {
    from: {},
    to: {},
  }

  valueNames.forEach((key) => {
    const current = config.values[key]

    initialAnimationValues.from[key] = current.from
    initialAnimationValues.to[key] = current.to
  })

  return () => {
    function createAnimation(stateValue) {
      const animationState = new A.Value(ANIMATION_STATE.START_POINT)

      // interpolator will be used as a position tracker of animation
      // using interpolation technique
      const interpolator = new A.Value(0)

      const animationValues = {}

      valueNames.forEach((key, index) => {
        const first = index === 0
        const animatedBlock = []

        // add tracking of animationState and running animation
        // via animating interpolator only for very first
        // animation value to get rid of Animation.Code
        if (first) {
          const forwardAnimationClock = new A.Clock()
          const backwardAnimationClock = new A.Clock()

          const forwardAnimationConfig = {
            clock: forwardAnimationClock,
            oppositeClock: backwardAnimationClock,
            value: interpolator,
            dest: config.animation.duration,
          }

          const backwardAnimationConfig = {
            clock: backwardAnimationClock,
            oppositeClock: forwardAnimationClock,
            value: interpolator,
            dest: 0,
          }

          if (first) {
            forwardAnimationConfig.onFinish = [
              A.set(animationState, ANIMATION_STATE.END_POINT),
            ]

            backwardAnimationConfig.onFinish = [
              A.set(animationState, ANIMATION_STATE.START_POINT),
            ]
          }

          const forwardTiming = getProperAnimation(
            config,
            !stateValue
              ? forwardAnimationConfig
              : backwardAnimationConfig,
          )

          const backwardTiming = getProperAnimation(
            config,
            !stateValue
              ? backwardAnimationConfig
              : forwardAnimationConfig,
          )

          animatedBlock.push(
            A.cond(
              A.eq(animationState, ANIMATION_STATE.PLAY_FORWARD),
              forwardTiming,
            ),
            A.cond(
              A.eq(animationState, ANIMATION_STATE.PLAY_BACKWARD),
              backwardTiming,
            ),
          )
        }

        const item = config.values[key]

        const inputRange = [0, config.animation.duration]
        const outputRange = [item.from, item.to]

        // reverse input range
        // in order to animate value in reverse way
        // from `to` to `from`
        if (stateValue) {
          outputRange.reverse()
        }

        const valueAnimation = A.interpolate(interpolator, {
          inputRange,
          outputRange,
          extrapolate: A.Extrapolate.CLAMP,
        })

        animatedBlock.push(valueAnimation)

        animationValues[key] = A.block(animatedBlock)
      })

      return {
        animationState,
        animationValues,
        interpolator,
      }
    }

    return {
      valueNames,
      lazy: config.animation.lazy,
      initialAnimationValues,
      operations: {
        createAnimation,
      },
    }
  }
}

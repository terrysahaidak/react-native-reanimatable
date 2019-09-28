import A from 'react-native-reanimated'
import { ANIMATION_STATE } from './constants'
import { getProperAnimation } from './animations'
import { IAnimationConfig } from 'react-native-reanimatable'

function createValues(valueNames: string[]) {
  return valueNames.reduce((acc, valueName) => {
    acc[valueName] = new A.Value(0)
    return acc
  }, {})
}

// TODO: Typing
function setValues(configValues, animationValues) {
  return (initialValue) =>
    Object.keys(animationValues).forEach((valueName) => {
      const { from, to } = configValues[valueName]
      animationValues[valueName].setValue(!initialValue ? from : to)
    })
}

// TODO: Typing
export default function createTransitionAnimation(config: IAnimationConfig) {
  const valueNames = Object.keys(config.values)
  return () => {
    const values = createValues(valueNames)
    const animationState = new A.Value(ANIMATION_STATE.START_POINT)

    function createAnimation() {
      const {
        forwardAnimations,
        backwardAnimations,
      } = valueNames.reduce(
        (acc, key, index) => {
          const animation = config.values[key]
          const { from, to } = animation
          const currentValue = values[key]

          const first = index === 0;

          const forwardAnimationClock = new A.Clock()
          const backwardAnimationClock = new A.Clock()

          const forwardAnimationConfig = {
            clock: forwardAnimationClock,
            oppositeClock: backwardAnimationClock,
            value: currentValue,
            dest: to,
          }

          const backwardAnimationConfig = {
            clock: backwardAnimationClock,
            oppositeClock: forwardAnimationClock,
            value: currentValue,
            dest: from,
          }

          if (first) {
            forwardAnimationConfig.onFinish = A.block([
              A.set(animationState, ANIMATION_STATE.END_POINT),
            ])

            backwardAnimationConfig.onFinish = A.block([
              A.set(animationState, ANIMATION_STATE.START_POINT),
            ])
          }

          const forwardTiming = getProperAnimation(
            config,
            forwardAnimationConfig,
          )

          const backwardTiming = getProperAnimation(
            config,
            backwardAnimationConfig,
          )

          acc.forwardAnimations.push(forwardTiming)

          acc.backwardAnimations.push(backwardTiming)

          return acc
        },
        {
          forwardAnimations: [],
          backwardAnimations: [],
        },
      )

      return A.block([
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
      ])
    }

    return {
      values,
      animationState,
      operations: {
        createAnimation,
        reset: setValues(config.values, values),
      },
    }
  }
}

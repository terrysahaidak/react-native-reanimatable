import A from 'react-native-reanimated'
import { IAnimationConfig } from 'react-native-reanimatable'

const numberSort = (a, b) => a - b

// TODO: Typing
function generateRanges(pairs) {
  return pairs.reduce(
    (acc, current) => {
      const [frame, value] = current
      const frameNumber = +frame
      acc.inputRange.push(frameNumber)
      acc.outputRange.push(+value)

      return acc;
    },
    {
      inputRange: [],
      outputRange: [],
    },
  )
}

// TODO: Typing
export function normalizeValues(keyframes) {
  return Object.keys(keyframes)
    .sort(numberSort)
    .reduce((acc, frameName) => {
      const currentFrame = keyframes[frameName]

      Object.keys(currentFrame).forEach((propName) => {
        const stylePairs = [frameName, currentFrame[propName]]
        if (Array.isArray(acc[propName])) {
          acc[propName].push(stylePairs)
        } else {
          acc[propName] = [stylePairs]
        }
      })

      return acc;
    }, {})
}

// TODO: Typing
export function generateInterpolations({ keyframes, baseValue }) {
  const normalized = normalizeValues(keyframes)

  return Object.keys(normalized).reduce((acc, name) => {
    const pairs = normalized[name]

    const { inputRange, outputRange } = generateRanges(pairs)

    const animatedValue = A.interpolate(baseValue, {
      inputRange,
      outputRange,
      extrapolate: A.Extrapolate.CLAMP,
    })

    acc[name] = animatedValue

    return acc;
  }, {})
}

export default function createDelegateAnimation(config: IAnimationConfig) {
  const {
    keyframes,
    animation: { delegate },
  } = config

  const values = generateInterpolations({
    keyframes,
    baseValue: delegate.value,
  })

  return () => ({
    values,
  })
}

import A from 'react-native-reanimated';
import { runTiming } from './animations';

function generateRanges(pairs, duration) {
  return pairs.reduce(
    (acc, current) => {
      const [frame, value] = current;
      const frameNumber = +frame;
      acc.inputRange.push(
        frameNumber === 0 ? 0 : (frameNumber * duration) / 100,
      );
      acc.outputRange.push(+value);

      return acc;
    },
    {
      inputRange: [],
      outputRange: [],
    },
  );
}

function normalizeValues(keyframes) {
  return Object.keys(keyframes).reduce((acc, frameName) => {
    const currentFrame = keyframes[frameName];

    Object.keys(currentFrame).forEach((propName) => {
      const stylePairs = [frameName, currentFrame[propName]];
      if (Array.isArray(acc[propName])) {
        acc[propName].push(stylePairs);
      } else {
        acc[propName] = [stylePairs];
      }
    });

    return acc;
  }, {});
}

function generateInterpolations({ keyframes, duration, baseValue }) {
  const normalized = normalizeValues(keyframes);

  return Object.keys(normalized).reduce((acc, name) => {
    const pairs = normalized[name];

    const animatedValue = A.interpolate(baseValue, {
      // pairs = [[frameName, value], [frameName, value]]
      ...generateRanges(pairs, duration),
      extrapolate: A.Extrapolate.CLAMP,
    });

    acc[name] = animatedValue;

    return acc;
  }, {});
}

export default function createKeyframesAnimation(config) {
  const {
    keyframes,
    animation: { duration },
  } = config;

  const interpolation = new A.Value(0);
  const clock = new A.Clock();

  const animation = runTiming({
    clock,
    oppositeClock: new A.Clock(),
    value: interpolation,
    dest: duration,
    duration,
  });

  const values = generateInterpolations({
    keyframes,
    duration,
    baseValue: interpolation,
  });

  function reset() {
    interpolation.setValue(0);
  }

  return {
    interpolation,
    animation,
    values,
    operations: {
      reset,
    },
  };
}

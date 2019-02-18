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

function createRanges(keyframes, duration) {
  const normalized = normalizeValues(keyframes);

  return Object.keys(normalized).map((name) => {
    const pairs = normalized[name];
    // pairs = [[frameName, value], [frameName, value]]
    return [name, generateRanges(pairs, duration)];
  });
}

function generateInterpolations({ ranges, duration, baseValue }) {
  return ranges.reduce((acc, [name, range]) => {
    const animatedValue = A.interpolate(baseValue, {
      ...range,
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

  const ranges = createRanges(keyframes, duration);

  return () => {
    const interpolation = new A.Value(0);

    function reset() {
      interpolation.setValue(0);
    }

    const values = generateInterpolations({
      ranges,
      duration,
      baseValue: interpolation,
    });
    const clock = new A.Clock();

    const createAnimation = () =>
      runTiming({
        clock,
        value: interpolation,
        dest: duration,
        duration,
      });

    return {
      interpolation,
      values,
      operations: {
        createAnimation,
        reset,
      },
    };
  };
}

import A from 'react-native-reanimated';
import hexToRgb from 'hex-to-rgba';

const RGB_REGEX = /(rgba|rgb)\((.*)\)/;

export function colorToRGBArray(str) {
  let value = str;

  if (str.startsWith('#')) {
    value = hexToRgb(str);
  }
  const matched = value.match(RGB_REGEX);
  const rgbStr = matched[2];

  return rgbStr.split(',').map((i) => i.trim());
}

export function createAnimatedValue(value) {
  if (typeof value === 'number') {
    return {
      type: 'value',
      value: [new A.Value(value)],
    };
  }

  if (typeof value === 'string') {
    const colors = colorToRGBArray(value);

    return {
      type: 'color',
      value: colors.map((i) => new A.Value(i)),
    };
  }

  return {
    type: 'unknown',
    value: [value],
  };
}

function getValueByType(value) {
  switch (value.type) {
    case 'color': {
      const [r, g, b, a] = value.value;
      if (typeof a === 'undefined') {
        a = new A.Value(1);
      }
      return A.color(r, g, b, a);
    }
    case 'value':
    default:
      return value.value[0];
  }
}

export function transformAnimationValues(values) {
  return Object.keys(values).reduce((acc, key) => {
    const current = values[key];

    acc[key] = getValueByType(current);

    return acc;
  }, {});
}

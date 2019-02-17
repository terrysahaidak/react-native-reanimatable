import Animated from 'react-native-reanimated';
import * as objectPath from '../utils/objectPath';

export default function createDelegate(eventType, path) {
  const value = new Animated.Value(0);

  const eventMap = objectPath.map(
    ['nativeEvent'].concat(path),
    value,
  );

  const event = Animated.event([eventMap]);

  function reset() {
    value.setValue(0);
  }

  function attachListener(listener) {
    Animated.block([
      Animated.call([value], (r) => listener(r[0])),
      value,
    ]);
  }

  return {
    event,
    value,
    attachListener,
    reset,
  };
}

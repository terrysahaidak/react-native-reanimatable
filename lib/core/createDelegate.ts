import Animated from 'react-native-reanimated'
import * as objectPath from '../utils/objectPath'

// TODO: Figure this param `eventType`
export default function createDelegate(path: string[]) {
  const value = new Animated.Value(0)

  const eventMap = objectPath.map(
    ['nativeEvent'].concat(path),
    value,
  )

  const event = Animated.event([eventMap])

  function reset() {
    value.setValue(0)
  }

  return {
    event,
    value,
    reset,
  }
}
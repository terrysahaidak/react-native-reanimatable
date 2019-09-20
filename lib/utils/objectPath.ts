import Animated from 'react-native-reanimated'

// ?: Where is it used and what for?
// TODO: Fix `nesterObj` `any` typing
export function get(path: { [index: string]: string }[], nestedObj: any) {
  return path.reduce(
    (obj, key) =>
      (obj && typeof obj[key.toString()] !== 'undefined' ? obj[key.toString()] : undefined),
    nestedObj,
  )
}

// TODO: Debug this thing and see what it wants
// TODO: Add Animated.Value `type`
export function map(path: String[], value: Animated.Value<any>) {
  let localPath = [...path]
  const obj: { [index: string]: string | Animated.Value<any> } = {}
  let current = obj
  while (localPath.length > 1) {
    const [head, ...tail] = localPath
    localPath = tail
    if (current[head.toString()] === undefined) {
      current[head] = {}
    }
    current = current[head]
  }
  current[localPath[0].toString()] = value
  return obj
}

import { AnimationType } from "react-native-reanimatable"

export default function createKeys(keys: String[]): AnimationType {
  return keys.reduce((accumulator, key) => {
    accumulator[key.toString()] = key;
    return accumulator
  }, {})
}

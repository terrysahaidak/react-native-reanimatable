// TODO: Redo this with proper typing
export default function createKeys(keys: String[]) {
  return keys.reduce((accumulator, key) => {
    accumulator[key] = key;
    return accumulator
  }, {})
}

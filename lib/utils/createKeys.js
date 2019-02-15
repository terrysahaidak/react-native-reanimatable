export default function createKeys(keys) {
  return keys.reduce((acc, key) => {
    acc[key] = key;
    return acc;
  }, {});
}

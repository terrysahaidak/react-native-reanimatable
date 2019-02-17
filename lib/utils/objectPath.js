export function get(path, nestedObj) {
  return path.reduce(
    (obj, key) =>
      (obj && typeof obj[key] !== 'undefined' ? obj[key] : undefined),
    nestedObj,
  );
}

export function map(path, value) {
  let localPath = [...path];
  const obj = {};
  let current = obj;
  while (localPath.length > 1) {
    const [head, ...tail] = localPath;
    localPath = tail;
    if (current[head] === undefined) {
      current[head] = {};
    }
    current = current[head];
  }
  current[localPath[0]] = value;
  return obj;
}

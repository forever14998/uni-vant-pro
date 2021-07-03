export function isObj(x) {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}
export function isArray(array) {
  return array && Array.isArray(array);
}
export function isObj(x) {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}
export function isArray(array) {
  return array && Array.isArray(array);
}
export function isDef(value) {
  return value !== undefined && value !== null;
}
export function isEmpty (str) {
	return (str === null || str === undefined || str === 'null' || str === 'undefined' || str === '');
}
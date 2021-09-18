export function requestAnimationFrame(cb) {
  return setTimeout(() => {
    cb();
  }, 1000 / 30);
}
export function isEmpty (str) {
	return (str === null || str === undefined || str === 'null' || str === 'undefined' || str === '');
}
export function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
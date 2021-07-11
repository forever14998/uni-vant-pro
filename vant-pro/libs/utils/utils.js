export function requestAnimationFrame(cb) {
  return setTimeout(() => {
    cb();
  }, 1000 / 30);
}
export const isEmpty = (str) => {
	return (str === null || str === undefined || str === 'null' || str === 'undefined' || str === '');
}
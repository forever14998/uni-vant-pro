export function requestAnimationFrame(cb) {
  return setTimeout(() => {
    cb();
  }, 1000 / 30);
}
export function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
/* eslint-disable */
var REGEXP = /^-?\d+(\.\d+)?$/;

export function addUnit(value) {
  if (value == null) {
    return undefined;
  }

  return REGEXP.test('' + value) ? value + 'rpx' : value;
}


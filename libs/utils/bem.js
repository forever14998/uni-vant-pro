import {isArray} from '@/libs/utils/validator.js'
import * as object from '@/libs/utils/object.js'
var PREFIX = 'van-';

function join(name, mods) {
  name = PREFIX + name;
  mods = mods.map(function(mod) {
    return name + '--' + mod;
  });
  mods.unshift(name);
  return mods.join(' ');
}

function traversing(mods, conf) {
  if (!conf) {
    return;
  }

  if (typeof conf === 'string' || typeof conf === 'number') {
    mods.push(conf);
  } else if (isArray(conf)) {
    conf.forEach(function(item) {
      traversing(mods, item);
    });
  } else if (conf instanceof Object) {
    Object.keys(conf).forEach(function(key) {
      conf[key] && mods.push(key);
    });
  }
}

export function bem(name, conf) {
  var mods = [];
  traversing(mods, conf);
  return join(name, mods);
}


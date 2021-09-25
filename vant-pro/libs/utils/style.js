import Vue from 'vue'

function kebabCase(word) {
  var newWord = word
    .replace(/[A-Z]/g, function (i) {
      return '-' + i;
    })
    .toLowerCase()

  return newWord;
}

export function style(styles) {
  if (Vue.prototype.$u.validator.isArray(styles)) {
    return styles
      .filter(function (item) {
        return item != null && item !== '';
      })
      .map(function (item) {
        return style(item);
      })
      .join(';');
  }

  if ('Object' === styles.constructor) {
    return Vue.prototype.$u.object
      .keys(styles)
      .filter(function (key) {
        return styles[key] != null && styles[key] !== '';
      })
      .map(function (key) {
        return [kebabCase(key), [styles[key]]].join(':');
      })
      .join(';');
  }

  return styles;
}

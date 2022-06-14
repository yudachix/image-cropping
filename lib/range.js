void (() => {
  'use strict'

  const lib = window.lib ??= {}

  const range = function* (max) {
    for (let i = 0; i < max; i++) {
      yield i
    }
  }

  lib.range = range
})()
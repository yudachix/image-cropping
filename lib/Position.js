void (() => {
  'use strict'

  const lib = window.lib ??= {}

  class Position {
    constructor(x, y) {
      this.x = x
      this.y = y
    }
  }

  lib.Position = Position
})()
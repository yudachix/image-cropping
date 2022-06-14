void (() => {
  'use strict'

  const lib = window.lib ??= {}

  class Pixel {
    constructor(rgba, pos) {
      this.rgba = rgba
      this.position = pos
    }
  }

  lib.Pixel = Pixel
})()
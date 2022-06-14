void (() => {
  'use strict'

  const lib = window.lib ??= {}

  class Color {
    constructor(red = 0, green = 0, blue = 0, alpha = 0) {
      this.red = red
      this.green = green
      this.blue = blue
      this.alpha = alpha
    }

    static #DIFF_MAX = Math.sqrt(3)

    diffRgb(src) {
      const rd = this.red - src.red
      const gd = this.green - src.green
      const bd = this.blue - src.blue

      return Math.sqrt(rd ** 2 + gd ** 2 + bd ** 2) / this.constructor.#DIFF_MAX
    }

    diffAlpha(src) {
      return this.alpha - src.alpha
    }
  }

  lib.Color = Color
})()
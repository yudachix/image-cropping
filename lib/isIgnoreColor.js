void (() => {
  'use strict'

  const lib = window.lib ??= {}

  const isIgnoreColor = (src, color) => (
    !src.diffRgb(color) &&
    !src.diffAlpha(color)
  )

  lib.isIgnoreColor = isIgnoreColor
})()
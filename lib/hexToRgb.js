void (() => {
  'use strict'

  const lib = window.lib ??= {}

  const hexToRgb = hex => [
    Number(`0x${hex.slice(1, 3)}`),
    Number(`0x${hex.slice(3, 5)}`),
    Number(`0x${hex.slice(5, 7)}`)
  ]

  lib.hexToRgb = hexToRgb
})()
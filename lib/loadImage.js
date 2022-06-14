void (() => {
  'use strict'

  const lib = window.lib ??= {}

  const loadImage = src => new Promise((resolve, reject) => {
    const img = document.createElement('img')

    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', ev => reject(ev))
    img.src = src
  })

  lib.loadImage = loadImage
})()
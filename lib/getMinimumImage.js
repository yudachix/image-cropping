void (() => {
  'use strict'

  const lib = window.lib ??= {}

  const getMinimumImage = async (src, { color = new lib.Color() } = {}) => {
    const { getOutermostPixels, loadImage } = lib
    const img = await loadImage(src)
    const cv = document.createElement('canvas')
    const ctx = cv.getContext('2d')

    if (!ctx) {
      throw new TypeError()
    }

    cv.width = img.naturalWidth
    cv.height = img.naturalHeight
    ctx.drawImage(img, 0, 0)

    const imgData = ctx.getImageData(0, 0, cv.width, cv.height)
    const { top, right, bottom, left } = getOutermostPixels(imgData, color)
    const afterWidth = Math.abs(left.position.x - right.position.x)
    const afterHeight = Math.abs(top.position.y - bottom.position.y)
    const afterImgData = ctx.getImageData(
      left.position.x, top.position.y,
      afterWidth, afterHeight
    )

    cv.width = afterWidth
    cv.height = afterHeight
    ctx.putImageData(afterImgData, 0, 0)

    return cv.toDataURL('image/png')
  }

  lib.getMinimumImage = getMinimumImage
})()
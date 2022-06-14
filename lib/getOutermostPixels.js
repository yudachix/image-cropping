void (() => {
  'use strict'

  const lib = window.lib ??= {}

  const getOutermostPixels = (
    {
      data,
      width,
      height
    },
    color
  ) => {
    const {
      Color,
      isIgnoreColor,
      Pixel,
      Position,
      range
    } = lib
    const pixels = []
    const idx = ({ x, y }) => width * 4 * y + x * 4
    const getPixel = pos => {
      const i = idx(pos)

      if (typeof data[i] === 'undefined') {
        return
      }

      return new Pixel(
        new Color(data[i], data[i + 1], data[i + 2], data[i + 3]),
        pos
      )
    }

    for (const x of range(width)) {
      for (const y of range(height)) {
        const prev = getPixel(new Position(x - 1, y))
        const px = getPixel(new Position(x, y))
        const next = getPixel(new Position(x + 1, y))

        if (
          !isIgnoreColor(color, px.rgba) && (
            !prev || isIgnoreColor(color, prev.rgba) ||
            !next || isIgnoreColor(color, next.rgba)
          )
        ) {
          pixels.push(px)
        }
      }
    }

    return {
      top: (
        pixels.reduce((a, b) => (
          a.position.y < b.position.y
            ? a
            : b
        ))
      ),
      right: (
        pixels.reduce((a, b) => (
          a.position.x > b.position.x
            ? a
            : b
        ))
      ),
      bottom: (
        pixels.reduce((a, b) => (
          a.position.y > b.position.y
            ? a
            : b
        ))
      ),
      left: (
        pixels.reduce((a, b) => (
          a.position.x < b.position.x
            ? a
            : b
        ))
      )
    }
  }

  lib.getOutermostPixels = getOutermostPixels
})()
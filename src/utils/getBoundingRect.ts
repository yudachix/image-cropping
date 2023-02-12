import { diffColor, type Color } from '~/utils/diffColor';

export type Position = readonly [x: number, y: number];

export type BoundingRect = Readonly<Record<
  'x' | 'y' | 'width' | 'height',
  number
>>;

export type Pixel = Readonly<{
  x: number,
  y: number,
  color: Color
}>;

export const getBoundingRect = (
  img: HTMLImageElement,
  outerColor: Color,
  outerColorDiff: number,
  outerColorAlphaDiff: number
) => {
  const cv = document.createElement('canvas');
  const ctx = cv.getContext('2d');
  const width = cv.width = img.naturalWidth;
  const height = cv.height = img.naturalHeight;

  if (!ctx) {
    // TODO
    throw new Error('');
  }

  ctx.drawImage(img, 0, 0);

  const imgdata = ctx.getImageData(0, 0, cv.width, cv.height);
  const data = imgdata.data;
  const idx = (x: number, y: number): number => width * 4 * y + x * 4;
  const getPixel = (x: number, y: number): Pixel | undefined => {
    const i = idx(x, y);

    if (typeof data[i] === 'undefined') {
      return;
    }

    return {
      x,
      y,
      color: [data[i], data[i + 1], data[i + 2], data[i + 3]]
    };
  };
  const isOuterColor = (color: Color): boolean => {
    const diff = diffColor(outerColor, color);

    return diff.color <= outerColorDiff && diff.alpha <= outerColorAlphaDiff;
  };
  const pixels: Pixel[] = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const prev = getPixel(x - 1, y);
      const pixel = getPixel(x, y);
      const next = getPixel(x + 1, y);

      if (!pixel) {
        continue;
      }

      if (
        !isOuterColor(pixel.color) && (
          !prev || isOuterColor(prev.color) ||
          !next || isOuterColor(next.color)
        )
      ) {
        pixels.push(pixel);
      }
    }
  }

  if (!pixels.length) {
    return;
  }

  let top = pixels[0];
  let bottom = pixels[0];
  let right = pixels[0];
  let left = pixels[0];

  for (const px of pixels) {
    if (top.y > px.y) {
      top = px;
    }

    if (bottom.y < px.y) {
      bottom = px;
    }

    if (right.x < px.x) {
      right = px;
    }

    if (left.x > px.x) {
      left = px;
    }
  }

  return {
    x: left.x,
    y: top.y,
    width: Math.abs(left.x - right.x),
    height: Math.abs(top.y - bottom.y)
  };
};

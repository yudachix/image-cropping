export type Color = readonly [red: number, green: number, blue: number, alpha: number];

export type ColorDiff = Readonly<{
  red: number,
  green: number,
  blue: number,
  color: number,
  alpha: number
}>;

export const DIFF_COLOR_MAX = Math.sqrt(3);

export const diffColor = ([r1, g1, b1, a1]: Color, [r2, g2, b2, a2]: Color): ColorDiff => {
  const red = r1 - r2;
  const green = g1 - g2;
  const blue = b1 - b2;

  return {
    red,
    green,
    blue,
    color: Math.sqrt(red ** 2 + green ** 2 + blue ** 2) / DIFF_COLOR_MAX | 0,
    alpha: a1 - a2
  };
};

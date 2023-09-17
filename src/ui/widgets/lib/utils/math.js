// From https://github.com/kiddkai/react-native-gestures.git

export const pow2abs = (/** @type {number} */ a, /** @type {number} */ b) =>
  Math.pow(Math.abs(a - b), 2);

export const distance = (/** @type {string | any[]} */ touches) => {
  const a = touches[0];
  const b = touches[1];

  if (touches.length === 1) {
    return false;
  }

  // @ts-ignore
  return Math.sqrt(pow2abs(a.pageX, b.pageX) + pow2abs(a.pageY, b.pageY), 2);
};

export const toDeg = (/** @type {number} */ rad) => (rad * 180) / Math.PI;

export const angle = (/** @type {string | any[]} */ touches) => {
  const a = touches[0];
  const b = touches[1];

  if (touches.length < 2) {
    return 0;
  }

  let deg = toDeg(Math.atan2(b.pageY - a.pageY, b.pageX - a.pageX));

  if (deg < 0) {
    deg += 360;
  }

  return deg;
};

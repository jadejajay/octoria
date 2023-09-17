/*
 * Get current touches
 *
 * @param {Object} initial event
 * @return {Array}
 */
export const getTouches = (
  /** @type {{ nativeEvent: { touches: any; }; }} */ event
) => event.nativeEvent.touches;

/*
 * Get angle
 *
 * Diff between current angle and initial angle
 *
 * @param {Object} initial event
 * @param {Object} styles
 * @param {Number} diff
 * @return {String} angle
 */
export const getAngle = (
  /** @type {any} */ event,
  /** @type {{ transform?: any[] | undefined; }} */ styles,
  /** @type {number} */ diffAngle
) => {
  const { transform = [] } = styles;

  const currentAngle = parseFloat(
    transform
      .map((/** @type {{ rotate: any; }} */ style) => style.rotate)
      .reduce((/** @type {any} */ a, /** @type {any} */ b) => b || a, 0),
    // @ts-ignore
    0
  );

  return `${currentAngle - diffAngle}deg`;
};

/*
 * Get scale
 *
 * @param {Object} initial event
 * @param {Object} styles
 * @param {Number} diff
 * @return {Number} scale
 */
export const getScale = (
  /** @type {any} */ event,
  /** @type {{ transform?: any[] | undefined; }} */ styles,
  /** @type {number} */ diffDistance
) => {
  const { transform = [] } = styles;

  const currentScale = transform
    .map((/** @type {{ scale: any; }} */ style) => style.scale)
    .reduce((/** @type {any} */ a, /** @type {any} */ b) => b || a, 1);

  const newScale = currentScale - diffDistance / 400;

  return newScale;
};

/*
 * Is multi touch
 *
 * @param {Object} initial event
 * @return {Boolean}
 */
export const isMultiTouch = (/** @type {any} */ event) => {
  const currentTouches = getTouches(event);

  return currentTouches.length > 1;
};

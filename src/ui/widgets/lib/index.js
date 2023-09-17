import PropTypes from 'prop-types';
import R from 'ramda';
import React, { Component } from 'react';
import { PanResponder, View } from 'react-native';

import {
  getAngle,
  getScale,
  getTouches,
  isMultiTouch,
} from './utils/events.js';
// Utils
import { angle, distance } from './utils/math.js';

export default class Gestures extends Component {
  static propTypes = {
    children: PropTypes.element,
    // Behavior
    draggable: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        x: PropTypes.bool,
        y: PropTypes.bool,
      }),
    ]),
    rotatable: PropTypes.bool,
    scalable: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number,
      }),
    ]),
    // Styles
    style: PropTypes.object,
    // Callbacks
    onStart: PropTypes.func,
    onChange: PropTypes.func,
    onEnd: PropTypes.func,
    onMultyTouchStart: PropTypes.func,
    onMultyTouchChange: PropTypes.func,
    onMultyTouchEnd: PropTypes.func,
    onRelease: PropTypes.func, // Legacy
    onRotateStart: PropTypes.func,
    onRotateChange: PropTypes.func,
    onRotateEnd: PropTypes.func,
    onScaleStart: PropTypes.func,
    onScaleChange: PropTypes.func,
    onScaleEnd: PropTypes.func,
  };

  static defaultProps = {
    children: {},
    // Behavior
    draggable: true || {
      x: true,
      y: false,
    },
    rotatable: true,
    scalable: true || {
      min: 0.33,
      max: 2,
    },
    // Styles
    style: {
      left: 0,
      top: 0,
      transform: [{ rotate: '0deg' }, { scale: 1 }],
    },
    // Callbacks
    onStart: () => {},
    onChange: () => {},
    onEnd: () => {},
    onRelease: () => {}, // Legacy

    // New callbacks
    onMultyTouchStart: () => {},
    onMultyTouchChange: () => {},
    onMultyTouchEnd: () => {},
    onRotateStart: () => {},
    onRotateChange: () => {},
    onRotateEnd: () => {},
    onScaleStart: () => {},
    onScaleChange: () => {},
    onScaleEnd: () => {},
  };

  /**
   * @param {any} props
   */
  constructor(props) {
    super(props);

    this.state = {
      isMultyTouchingNow: false,
      isRotatingNow: false,
      isScalingNow: false,

      style: {
        ...Gestures.defaultProps.style,
        ...this.props.style,
      },
    };
  }

  UNSAFE_componentWillMount() {
    this.pan = PanResponder.create({
      onPanResponderGrant: this.onMoveStart,
      onPanResponderMove: this.onMove,
      onPanResponderEnd: this.onMoveEnd,

      onPanResponderTerminate: () => true,
      onShouldBlockNativeResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => true,
      // @ts-ignore
      // @ts-ignore
      onMoveShouldSetPanResponderCapture: (event, { dx, dy }) =>
        dx !== 0 && dy !== 0,
    });
  }

  // @ts-ignore
  componentDidMount() {
    const { style } = this.state;

    this.prevStyles = style;
  }

  /**
   * @param {any} event
   * @param {{ dx: any; dy: any; }} gestureState
   */
  // @ts-ignore
  // @ts-ignore
  onDrag(event, gestureState) {
    const { initialStyles } = this;
    const { draggable } = this.props;

    const isObject = R.is(Object, draggable);

    const left = (isObject ? draggable.x : draggable)
      ? initialStyles.left + gestureState.dx
      : initialStyles.left;

    const top = (isObject ? draggable.y : draggable)
      ? initialStyles.top + gestureState.dy
      : initialStyles.top;

    this.dragStyles = { left, top };
  }

  onRotate = (/** @type {any} */ event) => {
    const { onRotateStart, onRotateChange, rotatable } = this.props;
    const { isRotatingNow, style } = this.state;

    const { initialTouches } = this;

    if (rotatable) {
      const currentAngle = angle(getTouches(event));
      const initialAngle =
        initialTouches.length > 1 ? angle(initialTouches) : currentAngle;
      const newAngle = currentAngle - initialAngle;
      // @ts-ignore
      const diffAngle = this.prevAngle - newAngle;

      // @ts-ignore
      this.pinchStyles.transform.push({
        rotate: getAngle(event, style, diffAngle),
      });

      this.prevAngle = newAngle;

      if (!isRotatingNow) {
        onRotateStart(event, style);

        this.setState({ isRotatingNow: true });
      } else {
        onRotateChange(event, style);
      }
    }
  };

  onScale = (/** @type {any} */ event) => {
    const { onScaleStart, onScaleChange, scalable } = this.props;
    const { isScalingNow, style } = this.state;
    const { initialTouches } = this;

    const isObject = R.is(Object, scalable);

    if (isObject || scalable) {
      const currentDistance = distance(getTouches(event));
      const initialDistance = distance(initialTouches);
      // @ts-ignore
      const increasedDistance = currentDistance - initialDistance;
      // @ts-ignore
      const diffDistance = this.prevDistance - increasedDistance;

      const min = isObject ? scalable.min : 0.33;
      const max = isObject ? scalable.max : 2;
      const scale = Math.min(
        Math.max(getScale(event, style, diffDistance), min),
        max
      );

      // @ts-ignore
      this.pinchStyles.transform.push({ scale });
      this.prevDistance = increasedDistance;

      if (!isScalingNow) {
        onScaleStart(event, style);

        this.setState({ isScalingNow: true });
      } else {
        onScaleChange(event, style);
      }
    }
  };

  onMoveStart = (/** @type {any} */ event) => {
    const { style } = this.state;
    const { onMultyTouchStart, onStart } = this.props;

    const touches = getTouches(event);

    this.prevAngle = 0;
    this.prevDistance = 0;
    this.initialTouchesAngle = 0;
    this.pinchStyles = {};
    this.dragStyles = {};
    this.prevStyles = style;

    this.initialTouches = getTouches(event);
    this.initialStyles = style;

    onStart(event, style);

    if (touches.length > 1) {
      onMultyTouchStart(event, style);

      this.setState({ isMultyTouchingNow: true });
    }
  };

  onMove = (/** @type {any} */ event, /** @type {any} */ gestureState) => {
    const { isMultyTouchingNow, style } = this.state;
    const { onChange, onMultyTouchChange } = this.props;

    const { initialTouches } = this;

    const touches = getTouches(event);

    if (touches.length !== initialTouches.length) {
      this.initialTouches = touches;
    } else {
      this.onDrag(event, gestureState);
      this.onPinch(event);
    }

    if (isMultyTouchingNow) {
      onMultyTouchChange(event, style);
    }

    this.updateStyles();

    onChange(event, style);
  };

  onMoveEnd = (/** @type {any} */ event) => {
    const { isMultyTouchingNow, isRotatingNow, isScalingNow, style } =
      this.state;
    const {
      onEnd,
      onMultyTouchEnd,
      onRelease, // Legacy
      onRotateEnd,
      onScaleEnd,
    } = this.props;

    onEnd(event, style);
    onRelease(event, style); // Legacy

    if (isRotatingNow) {
      onRotateEnd(event, style);
    }

    if (isScalingNow) {
      onScaleEnd(event, style);
    }

    if (isMultyTouchingNow) {
      onMultyTouchEnd(event, style);
    }

    this.setState({
      isRotatingNow: false,
      isScalingNow: false,
    });
  };

  onPinch = (/** @type {any} */ event) => {
    if (isMultiTouch(event)) {
      this.pinchStyles = { transform: [] };

      this.onScale(event);
      this.onRotate(event);
    }
  };

  updateStyles = () => {
    const style = {
      ...this.state.style,
      ...this.dragStyles,
      ...this.pinchStyles,
    };

    this.updateNativeStyles(style);
    this.setState({ style });
  };

  updateNativeStyles = (/** @type {any} */ style) => {
    // @ts-ignore
    this.view.setNativeProps({ style });
  };

  reset = (/** @type {(arg0: any) => void} */ callback) => {
    const { left, top, transform } = this.prevStyles;

    this.dragStyles = { left, top };
    this.pinchStyles = { transform };

    this.updateStyles();

    callback(this.prevStyles);
  };

  render() {
    const { style } = this.state;
    const { children } = this.props;

    return (
      <View
        ref={(c) => {
          this.view = c;
        }}
        style={style}
        // @ts-ignore
        {...this.pan.panHandlers}
      >
        {children}
      </View>
    );
  }
}

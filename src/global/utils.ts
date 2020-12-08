import { Alert, AlertButton, TouchableNativeFeedback } from 'react-native';

import { NarfexTheme } from '$global/theme';

export function upperFirst(str: string) {
  return str ? str[0].toUpperCase() + str.slice(1) : str;
}

export function camelCase(str: string) {
  return str
    .split('_')
    .map((subStr, i) => (subStr && i ? upperFirst(subStr) : subStr))
    .join('');
}

export function isPlainObject(input: any) {
  return input && !Array.isArray(input) && typeof input === 'object';
}

function snakeCase(srt = '') {
  return srt
    .replace(/\.?([A-Z]+)/g, (_x, y) => {
      return `_${y.toLowerCase()}`;
    })
    .replace(/^_/, '');
}

export function snakeCaseObject(obj: object = {}) {
  const newObj = {};
  Object.keys(obj).forEach((key: string) => {
    newObj[snakeCase(key)] = isPlainObject(obj[key])
      ? snakeCaseObject(obj[key])
      : obj[key];
  });
  return newObj;
}

export function camelCaseObject<T>(obj: T): {} {
  if (isPlainObject(obj)) {
    const newObj = {};
    Object.keys(obj).forEach((key: string) => {
      newObj[camelCase(key)] = camelCaseObject(obj[key]);
    });
    return newObj;
  }
  if (Array.isArray(obj)) {
    return obj.map(camelCaseObject);
  }
  return obj;
}

/**
 * css-like style add "hitSlop" property for Touchable*
 * @param slopDimensions array with slop sizes
 * @returns object with hitSlop properties
 */
export function addHitSlop(slopDimensions: Array<number> = []) {
  switch (slopDimensions.length) {
    case 1: {
      const [unifiedSlop] = slopDimensions;
      return {
        hitSlop: {
          top: unifiedSlop,
          right: unifiedSlop,
          bottom: unifiedSlop,
          left: unifiedSlop,
        },
      };
    }
    case 2: {
      const [verticalSlop, horizontalSlop] = slopDimensions;
      return {
        hitSlop: {
          top: verticalSlop,
          right: horizontalSlop,
          bottom: verticalSlop,
          left: horizontalSlop,
        },
      };
    }
    case 3: {
      const [top, horizontalSlop, bottom] = slopDimensions;
      return { hitSlop: { top, right: horizontalSlop, bottom, left: horizontalSlop } };
    }
    case 4: {
      const [top, right, bottom, left] = slopDimensions;
      return { hitSlop: { top, right, bottom, left } };
    }
    default: {
      console.warn('addHitSlop helper has been called with incorrect arguments');
      return {};
    }
  }
}

export const hex2rgba = (hex: string, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g)?.map((x) => parseInt(x, 16)) ?? [];
  return `rgba(${r},${g},${b},${alpha})`;
};

type RNAlertType = {
  title: string;
  rightText: string;
  rightOnPress: () => void;
  leftText?: string;
  rightStyle?: AlertButton['style'];
  leftOnPress?: () => void;
  cancelable?: boolean;
  message?: string;
};

export function showAlert({
  title,
  message,
  rightText,
  rightOnPress,
  rightStyle = 'destructive',
  leftOnPress,
  leftText,
  cancelable = true,
}: RNAlertType) {
  return Alert.alert(
    title,
    message,
    [
      {
        text: leftText,
        style: 'cancel',
        onPress: leftOnPress,
      },
      {
        text: rightText,
        style: rightStyle,
        onPress: rightOnPress,
      },
    ],
    { cancelable },
  );
}

export function getRippleColor(theme: NarfexTheme) {
  return TouchableNativeFeedback.Ripple(
    theme.isCurrent('light')
      ? hex2rgba(theme.colors.black, 0.16)
      : hex2rgba(theme.colors.white, 0.32),
    false,
  );
}

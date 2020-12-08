import { PixelRatio, Dimensions, Platform, NativeModules } from 'react-native';

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const DEVICE_LOCALE = isIOS
  ? NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
  : NativeModules.I18nManager.localeIdentifier;

export const platformSelect = (ios: any, android: any) =>
  Platform.select({ ios, android });

/** "moreOrEqualThanIphoneX" */
export const mrIX = DEVICE_WIDTH >= 812 || DEVICE_HEIGHT >= 812;

export const isISE = DEVICE_WIDTH === 320 || DEVICE_HEIGHT === 320;

const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;

/**
 * return pixel density independent width
 * @param width percentage
 */
export const w = (width: number) =>
  PixelRatio.roundToNearestPixel((DEVICE_WIDTH * width) / 100);

/**
 * return pixel density independent height
 * @param height percentage
 */
export const h = (height: number) =>
  PixelRatio.roundToNearestPixel((DEVICE_HEIGHT * height) / 100);

export const SCREEN_RATIO = (DEVICE_WIDTH / DEVICE_HEIGHT).toFixed(2);

//  0.46 === 9 / 19.5 === iPhone X, XR, 11...
//  0.56 === 9 / 16 === iPhone 8+ and below down to iPhone 4
const NOTCHED_DEVICE = +SCREEN_RATIO < 0.56;

/**
 * selects passed propeties depends on device's notch
 * @param notchedProps properties for notched device
 * @param unnotchedProps properties for normal device
 */
export function selectNotchedProperties(notchedProps: any, unnotchedProps: any) {
  return NOTCHED_DEVICE ? notchedProps : unnotchedProps;
}

const Height = 'h';
const Width = 'w';
type Dimension = typeof Height | typeof Width;

/**
 * returns pixel density independent height / width
 * based on given size of element according to mockups
 * @param pixelSizeFromMockup element size from mockup
 * @param dimension height or width of device we relate to
 */
//  'ns' for 'normalizeStyles'
export function ns(pixelSizeFromMockup: number, dimension: Dimension = Width) {
  return dimension === Height
    ? h((pixelSizeFromMockup / DESIGN_HEIGHT) * 100)
    : w((pixelSizeFromMockup / DESIGN_WIDTH) * 100);
}

import ReactNativeBiometrics, { BiometryType } from 'react-native-biometrics';

import { IconName } from '$components/Icon/Icon.interface';
import { getGlobalIntl } from '$i18n/globalIntl';
import securityMessages from '$i18n/shared/security.messages';
import shortMessages from '$i18n/shared/short.messages';

export async function getBiometryAvailability(): Promise<boolean> {
  try {
    const { biometryType, available } = await ReactNativeBiometrics.isSensorAvailable();

    if (!available) {
      console.log('biometrics is not available on device');
    }

    if (!biometryType) {
      console.log(`no fingerprints / faceid found, you need to authorize your device, 
      on iOS Simulator - Hardware > Touch ID/Face ID > Enrolled 
      on Android - Settings - Fingerprint`);
    }

    return available && !!biometryType;
  } catch (err) {
    console.log('biometrics type checking error', err);
    return false;
  }
}

export async function validateBiometrics() {
  try {
    if (!(await getBiometryAvailability())) {
      return false;
    }

    const intl = getGlobalIntl();

    const resultObject = await ReactNativeBiometrics.simplePrompt({
      promptMessage: intl?.formatMessage(securityMessages.confirmFingerprint)!,
      cancelButtonText: intl?.formatMessage(shortMessages.cancel),
    });

    return resultObject?.success;
  } catch (err) {
    console.log('biometrics validation error', err);
    return false;
  }
}

export enum BiometryEnum {
  faceID = 'FaceID',
  touchID = 'TouchID',
  android = 'Biometrics',
}

export function getBiometryIcon(biometry: BiometryType): IconName {
  switch (biometry) {
    case BiometryEnum.faceID:
      return 'faceid';
    case BiometryEnum.touchID:
      return 'touchid';
    case BiometryEnum.android:
      return 'fingerprint';
    default:
      return 'fingerprint';
  }
}

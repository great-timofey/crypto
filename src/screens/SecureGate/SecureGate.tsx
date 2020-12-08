import React, { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { SecureGateNavigationProp } from '$navigation/main/MainNavigator.interface';
import { MainScreensNames } from '$navigation/names';
import { profileSelector } from '$redux/selectors';
import { Splash, StatusBar } from '$components';

export interface SecureGateProps {
  navigation: SecureGateNavigationProp;
}

export const SecureGate: FC<SecureGateProps> = ({ navigation }) => {
  const { isIdentified, biometrics, pincode } = useSelector(profileSelector);

  useFocusEffect(
    useCallback(() => {
      if ((!!biometrics || !!pincode) && !isIdentified) {
        navigation?.navigate(
          pincode
            ? MainScreensNames.PincodeValidate
            : MainScreensNames.BiometricsValidate,
        );
      } else {
        setTimeout(() => {
          //  need delay because navigation is not available immediately
          navigation?.navigate(MainScreensNames.MainNavigator);
        }, 150);
      }
    }, [isIdentified, navigation, pincode, biometrics]),
  );

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <StatusBar backgroundColorKey="backgroundPrimary" />
      <Splash />
    </View>
  );
};

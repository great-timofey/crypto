import React, { FC } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { Button, Icon, Navbar } from '$components';
import { MainScreensNames } from '$navigation/names';
import { addHitSlop } from '$global/utils';

type WalletNavbarProps = {
  skipCloseButton?: boolean;
  onCloseButtonPress?: () => void;
  onBackButtonPress?: () => void;
};

export const WalletNavbar: FC<WalletNavbarProps> = ({
  children,
  onCloseButtonPress,
  onBackButtonPress,
  skipCloseButton = false,
}) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleCloseButtonPress = () => {
    if (onCloseButtonPress) {
      onCloseButtonPress();
      return;
    }

    navigation.navigate(MainScreensNames.Wallet);
  };

  const handleBackButtonPress = () => {
    if (onBackButtonPress) {
      onBackButtonPress();
      return;
    }

    navigation.goBack();
  };

  return (
    <Navbar
      leftContent={
        <Button
          appearance="icon"
          onPress={handleBackButtonPress}
          touchableProps={{ ...addHitSlop([20]) }}
        >
          <Icon name="angle-left" fill={theme.colors.primaryBlue} />
        </Button>
      }
      rightContent={
        !skipCloseButton && (
          <Button
            appearance="icon"
            onPress={handleCloseButtonPress}
            touchableProps={{ ...addHitSlop([20]) }}
          >
            <Icon name="close-large" fill={theme.colors.primaryBlue} />
          </Button>
        )
      }
    >
      {children}
    </Navbar>
  );
};

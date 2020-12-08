import React, { FC, ReactNode } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { Button, Icon, Navbar } from '$components';
import { addHitSlop } from '$global/utils';

export const SettingsNavbar: FC<{
  children: ReactNode;
  onGoBack?: () => void;
}> = ({ children, onGoBack }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <Navbar
      leftContent={
        <Button appearance="icon" onPress={handleGoBack} {...addHitSlop([20])}>
          <Icon name="angle-left" fill={theme.colors.primaryBlue} />
        </Button>
      }
    >
      {children}
    </Navbar>
  );
};

import React, { FC, memo } from 'react';
import { useTheme } from 'styled-components';

import { Typography } from '../Typography/Typography';
import { Icon } from '../Icon/Icon';

import { generateKeybaordButtons } from './utils';
import { CustomKeyboardStyled } from './CustomKeyboard.styles';
import { ACTION_BUTTON_INDEX, BACKSPACE_CHAR } from './constants';
import { CustomKeyboardButton } from './CustomKeyboardButton/CustomKeyboardButton';
import { CustomKeyboardProps } from './CustomKeyboard.interface';

import { COMMA_CHARACTER, DOT_CHARACTER } from '$global/constants';

export const CustomKeyboard: FC<CustomKeyboardProps> = memo(
  ({ onInput, error, onErase, onFullErase, actionButton, type = 'numeric', style }) => {
    const theme = useTheme();

    const handlePressCustomButton = (buttonValue: string) => () =>
      buttonValue === BACKSPACE_CHAR ? onErase() : onInput(buttonValue);

    return (
      <CustomKeyboardStyled error={error} style={style}>
        {generateKeybaordButtons(type).map((buttonValue, buttonIndex) =>
          !!actionButton && buttonIndex === ACTION_BUTTON_INDEX ? (
            actionButton
          ) : (
            <CustomKeyboardButton
              key={buttonValue}
              onPress={handlePressCustomButton(buttonValue)}
              onLongPress={buttonValue === BACKSPACE_CHAR ? onFullErase : undefined}
            >
              {buttonValue === BACKSPACE_CHAR ? (
                <Icon name="arrow-left" fill={theme.colors.foregroundPrimary} />
              ) : (
                <Typography style={{ textAlign: 'center' }} type="HeadingsR2">
                  {buttonValue === DOT_CHARACTER ? COMMA_CHARACTER : buttonValue}
                </Typography>
              )}
            </CustomKeyboardButton>
          ),
        )}
      </CustomKeyboardStyled>
    );
  },
);

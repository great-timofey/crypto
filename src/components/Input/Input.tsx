import React, { useCallback, useState, forwardRef } from 'react';
import { TextInput } from 'react-native';
import { useTheme } from 'styled-components';

import { Icon } from '../Icon/Icon';

import { InputProps } from './Input.interface';
import * as S from './Input.styles';

export const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  const {
    appearance = 'default',
    placeholder,
    disabled,
    style,
    value,
    onChangeText,
    iconLeftName,
    iconRightName,
    label,
    labelRight,
    onFocus,
    onBlur,
    description,
    inputProps,
    password,
    customTextStyle,
  } = props;
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(password);
  const theme = useTheme();

  const handleChangeText = useCallback(
    (inputValue) => {
      if (onChangeText) onChangeText(inputValue);
    },
    [onChangeText],
  );

  const handleFocus = useCallback(() => {
    setFocused(true);

    if (onFocus) {
      onFocus();
    }
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setFocused(false);

    if (onBlur) {
      onBlur();
    }
  }, [onBlur]);

  return (
    <S.InputWithAttributesWrapperStyled style={style}>
      {label && (
        <S.InputLabelStyled type="HeadingsSB5" disabled={disabled}>
          {label}
        </S.InputLabelStyled>
      )}
      <S.InputContainerStyled
        focused={focused}
        appearance={appearance}
        disabled={disabled}
      >
        {iconLeftName && (
          <S.IconLeftStyled name={iconLeftName} focused={focused} disabled={disabled} />
        )}
        <S.InputStyled
          ref={ref}
          appearance={appearance}
          disabled={disabled}
          editable={!disabled}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          keyboardAppearance={theme.isCurrent('light') ? 'light' : 'dark'}
          placeholder={placeholder}
          autoFocus={appearance === 'invisible'}
          extraPaddingLeft={!!iconLeftName}
          extraPaddingRight={!!iconRightName || !!labelRight}
          secureTextEntry={showPassword}
          haveCustomStyles={!!customTextStyle}
          style={{ ...customTextStyle }}
          {...inputProps}
        />
        {iconRightName && (
          <S.IconRightStyled name={iconRightName} focused={focused} disabled={disabled} />
        )}
        {!!labelRight && (
          <S.LabelRightStyled type="BodyInput">{labelRight}</S.LabelRightStyled>
        )}
        {password && (
          <S.SetShowPasswordButtonStyled
            appearance="icon"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon
              name={
                `eye-${showPassword ? 'closed' : 'open'}` as 'eye-closed' | 'eye-open'
              }
            />
          </S.SetShowPasswordButtonStyled>
        )}
      </S.InputContainerStyled>
      {description && (
        <S.InputDescriptionStyled type="Caption1M" disabled={disabled}>
          {description}
        </S.InputDescriptionStyled>
      )}
    </S.InputWithAttributesWrapperStyled>
  );
});

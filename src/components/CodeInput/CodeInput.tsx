import React, { useEffect, useRef, forwardRef, useCallback } from 'react';
import { Animated, TextInput } from 'react-native';

import { DOT_SYMBOL } from './constants';
import { CodeInputProps } from './CodeInput.interface';
import * as S from './CodeInput.styles';

export const CodeInput = forwardRef<TextInput, CodeInputProps>(
  (
    {
      icon,
      value = '',
      error,
      style,
      length = 6,
      inputProps,
      onChangeText,
      onSubmitEditing,
      renderInvisibleInput = true,
      secureTextEntry = false,
    },
    ref,
  ) => {
    const errorAnimation = useRef(new Animated.Value(0)).current;
    const errorRef = useRef<boolean | null>(null);

    const content = [...value.padEnd(length, DOT_SYMBOL)];

    const runErrorAnimation = useCallback(() => {
      if (!errorRef.current) return;

      Animated.timing(errorAnimation, {
        toValue: 50,
        duration: 80,
        useNativeDriver: true,
      }).start(() => {
        Animated.spring(errorAnimation, {
          toValue: 0,
          friction: 2,
          tension: 200,
          useNativeDriver: true,
        }).start();
      });
    }, [errorAnimation, errorRef]);

    useEffect(() => {
      errorRef.current = error || null;
      if (error) runErrorAnimation();
    }, [error, runErrorAnimation]);

    useEffect(() => {
      if (renderInvisibleInput || errorRef.current) return;

      if (value.length === length && onSubmitEditing) {
        onSubmitEditing();
      }
    }, [value, renderInvisibleInput, length, onSubmitEditing]);

    const handleChange = useCallback(
      (e: string) => {
        onChangeText && onChangeText(e);

        if (e.length === length && onSubmitEditing) {
          onSubmitEditing();
        }
      },
      [onChangeText, onSubmitEditing, length],
    );

    return (
      <>
        {icon && <S.CodeIconStyled name={icon} />}
        <Animated.View
          style={{
            transform: [{ translateX: errorAnimation }],
          }}
        >
          <S.CodeContainerStyled style={style}>
            <S.CodeContainer>
              {content.map((letter, index) => (
                <S.CodeItemStyled
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  active={index === value.length}
                  colorless={index > value.length}
                  error={error}
                  type="HeadingsSB1"
                >
                  {secureTextEntry ? DOT_SYMBOL : letter}
                </S.CodeItemStyled>
              ))}
            </S.CodeContainer>
            {renderInvisibleInput && (
              <S.TextInputInvisibleStyled
                ref={ref}
                autoFocus
                contextMenuHidden
                caretHidden
                keyboardType="number-pad"
                autoCorrect={false}
                value={value}
                onChangeText={error ? undefined : handleChange}
                selectTextOnFocus={false}
                {...inputProps}
              />
            )}
          </S.CodeContainerStyled>
        </Animated.View>
      </>
    );
  },
);

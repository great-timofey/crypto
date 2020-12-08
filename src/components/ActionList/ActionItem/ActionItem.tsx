import React, { FC, memo } from 'react';

import { ActionItemProps } from './ActionItem.interface';
import * as S from './ActionItem.styles';

export const ActionItem: FC<ActionItemProps> = memo(
  ({ onPress, style, icon, title, loading, disabled }) => {
    const handlePress = () => {
      !loading && onPress && onPress();
    };

    return (
      <S.Wrapper style={style} disabled={loading || disabled}>
        <S.Container>
          <S.HighlightStyled onPress={handlePress}>
            {loading ? <S.LoaderStyled /> : <S.ActionIcon name={icon} />}
            <S.Text
              textProps={{ adjustsFontSizeToFit: true, numberOfLines: 1 }}
              type="BodySmallText"
            >
              {title}
            </S.Text>
          </S.HighlightStyled>
        </S.Container>
      </S.Wrapper>
    );
  },
);

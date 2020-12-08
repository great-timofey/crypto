import React, { FC } from 'react';
import { useTheme } from 'styled-components';

import { Typography } from '../Typography/Typography';

import { ListItemProps } from './ListItem.interface';
import * as S from './ListItem.styles';

import { Highlight } from '$components/Highlight/Highlight';

export const ListItem: FC<ListItemProps> = ({
  style,
  icon,
  iconFill,
  type = 'list-1',
  onPress,
  label,
  info,
  description,
  control,
  suffix,
  angle,
}) => {
  const theme = useTheme();
  const content = (
    <S.ListItemWrapperStyled style={!onPress && style}>
      <S.ListItemContentStyled>
        {['list-1', 'list-2'].includes(type) && (
          <Typography type="HeadingsR6">{label}</Typography>
        )}
        {type === 'list-1' && info && (
          <S.ListItemTextStyled type="HeadingsSB2">{info}</S.ListItemTextStyled>
        )}
        {type === 'list-1' && description && (
          <S.ListItemTextStyled type="BodyText2R">{description}</S.ListItemTextStyled>
        )}
        {type === 'list-2' && info && (
          <S.ListItemTextStyled type="HeadingsR4">{info}</S.ListItemTextStyled>
        )}
        {type === 'list-2' && description && (
          <S.ListItemTextStyled type="BodyText3R">{description}</S.ListItemTextStyled>
        )}
        {type === 'list-3' && label && (
          <S.ListItemThreeTitleStyled
            textProps={{ numberOfLines: 1, ellipsizeMode: 'tail' }}
            type="Buttons1SB"
          >
            {label}
          </S.ListItemThreeTitleStyled>
        )}
        {type === 'list-3' && description && (
          <S.ListItemTextStyled type="Caption1M">{description}</S.ListItemTextStyled>
        )}
      </S.ListItemContentStyled>
      {type === 'list-menu' && (
        <S.ListItemContentHorizontalStyled>
          {icon && (
            <S.ListItemMenuIconWrapperStyled>
              <S.ListItemMenuIconStyled
                name={icon}
                fill={iconFill || theme.colors.primaryBlue}
              />
            </S.ListItemMenuIconWrapperStyled>
          )}
          {label && (
            <S.ListItemThreeTitleStyled
              textProps={{ numberOfLines: 1, ellipsizeMode: 'tail' }}
              type="HeadingsSB6"
            >
              {label}
            </S.ListItemThreeTitleStyled>
          )}
          {suffix && <S.SuffixStyled type="HeadingsSB6">{suffix}</S.SuffixStyled>}
        </S.ListItemContentHorizontalStyled>
      )}
      {angle && <S.ListItemIconStyled name="angle-right-small" fill={iconFill} />}
      {icon && type !== 'list-menu' && (
        <S.ListItemIconStyled name={icon} fill={iconFill} />
      )}
      {control}
    </S.ListItemWrapperStyled>
  );

  if (onPress) {
    return (
      <Highlight style={style} onPress={onPress}>
        {content}
      </Highlight>
    );
  }

  return content;
};

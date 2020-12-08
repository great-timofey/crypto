import React, { FC } from 'react';

import { Badge } from '../Badge/Badge';
import { Icon } from '../Icon/Icon';

import { BadgedButtonProps } from './BadgedButton.interface';
import * as S from './BadgedButton.styles';

export const BadgedButton: FC<BadgedButtonProps> = ({
  badgeContent,
  onPress,
  iconName,
  iconFill,
  style,
}) => {
  return (
    <Badge style={style} badgeContent={badgeContent} onPress={onPress}>
      <S.BadgedButtonButtonStyled appearance="icon">
        <Icon fill={iconFill} name={iconName} />
      </S.BadgedButtonButtonStyled>
    </Badge>
  );
};

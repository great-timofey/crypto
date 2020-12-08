import React, { useEffect, FC } from 'react';

import { RequirementsProps } from './Requirements.interface';
import * as S from './Requirements.styles';

export const Requirements: FC<RequirementsProps> = ({
  touched,
  requirementMap,
  currentInputValue = '',
  style,
  onSuccess,
}) => {
  useEffect(() => {
    if (touched) return;

    if (requirementMap.every(({ validator }) => validator.test(currentInputValue))) {
      onSuccess();
    }
  }, [touched, currentInputValue, onSuccess, requirementMap]);

  return (
    <S.RequirementsContainerStyled style={style}>
      {requirementMap.map(({ title, validator }, index) => {
        const fieldValid = validator.test(currentInputValue);

        return (
          //  eslint-disable-next-line
          <S.RequirementItemContainerStyled key={index}>
            {fieldValid && <S.RequirementSuccessIconStyled name="check16px" />}
            <S.RequirementItemStyled
              success={fieldValid}
              error={!touched && !fieldValid}
              type="BodyAccent"
            >
              {title}
            </S.RequirementItemStyled>
          </S.RequirementItemContainerStyled>
        );
      })}
    </S.RequirementsContainerStyled>
  );
};

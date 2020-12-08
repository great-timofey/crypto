import React, { useCallback, FC } from 'react';

import { AuthProgressProps } from './AuthProgress.interface';
import { AuthProgressStep } from './AuthProgressStep/AuthProgressStep';
import * as S from './AuthProgress.styles';

export const AuthProgress: FC<AuthProgressProps> = ({
  steps,
  progressHeader,
  showSlide,
  swipeForward,
  activeStepIndex,
  useHeight100 = true,
}) => {
  const renderStep = useCallback(
    (index: number) => {
      const { header, footer, content, centeredVertically } = steps[index];

      return (
        <AuthProgressStep
          showSlide={showSlide}
          swipeForward={swipeForward}
          key={index}
          header={header}
          footer={footer}
          centeredVertically={centeredVertically}
        >
          {content}
        </AuthProgressStep>
      );
    },
    [steps, showSlide, swipeForward],
  );

  return (
    <S.AuthProgressContainerStyled useHeight100={useHeight100}>
      {progressHeader}
      {renderStep(activeStepIndex)}
    </S.AuthProgressContainerStyled>
  );
};

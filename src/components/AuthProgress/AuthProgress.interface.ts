import { ReactNode } from 'react';

export interface ProgressStepProps {
  header?: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
  centeredVertically?: boolean;
}

export interface AuthProgressProps {
  progressHeader?: ReactNode;
  steps: Array<ProgressStepProps>;
  activeStepIndex: number;
  showSlide: boolean;
  swipeForward: boolean;
  useHeight100?: boolean;
}

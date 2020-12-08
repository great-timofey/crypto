import { ReactNode } from 'react';

export interface AuthProgressStepProps {
  showSlide: boolean;
  swipeForward: boolean;
  header: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  centeredVertically?: boolean;
}

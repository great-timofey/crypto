import { ReactNode } from 'react';

export interface BottomSheetStaticProps {
  children: ReactNode;
  onOpen: () => void;
  onClose: () => void;
  snapStart: number | string;
  title: ReactNode;
}

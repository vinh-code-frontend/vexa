import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import '../styles/Scrollbar.css';

export interface ScrollbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  always?: boolean;
}

export const Scrollbar = ({ children, always = false, className, ...props }: ScrollbarProps) => {
  return (
    <SimpleBar
      {...props}
      autoHide={!always}
      clickOnTrack
      className={['ui-scrollbar', className ?? ''].join(' ')}
      forceVisible={always}
    >
      {children}
    </SimpleBar>
  );
};

export default Scrollbar;


import type { HTMLAttributes } from 'react';

export interface IMotionIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export interface MotionIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

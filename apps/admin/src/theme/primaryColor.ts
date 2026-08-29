import { useCallback, useState } from 'react';

import { generate } from '@ant-design/colors';
import { FastColor } from '@ant-design/fast-color';

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

export const DEFAULT_PRIMARY_COLOR = '#6610f2';

// Derives the full shade scale from one base color and writes it to CSS variables,
// keeping Tailwind utilities and antd's ConfigProvider token in sync.
function applyPalette(color: string) {
  const palette = generate(color);
  const root = document.documentElement.style;

  STEPS.forEach((step, index) => root.setProperty(`--color-primary-${step}`, palette[index]));
  root.setProperty('--color-primary-950', new FastColor(palette[9]).darken(15).toHexString());
  root.setProperty('--color-primary', color);
}

export function usePrimaryColor(initialColor: string = DEFAULT_PRIMARY_COLOR) {
  const [primaryColor, setPrimaryColorState] = useState(() => {
    applyPalette(initialColor);
    return initialColor;
  });

  const setPrimaryColor = useCallback((color: string) => {
    applyPalette(color);
    setPrimaryColorState(color);
  }, []);

  return [primaryColor, setPrimaryColor] as const;
}

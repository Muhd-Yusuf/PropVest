import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../lib/ThemeContext';
import { radius, brand } from '../../lib/theme';

interface ProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  color?: string;
}

export function ProgressBar({ progress, height = 6, color }: ProgressBarProps) {
  const { colors } = useTheme();
  const pct = Math.min(Math.max(progress, 0), 1);

  return (
    <View
      style={{
        height,
        borderRadius: height / 2,
        backgroundColor: colors.bgTertiary,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          height,
          width: `${pct * 100}%`,
          borderRadius: height / 2,
          backgroundColor: color || brand.emerald,
        }}
      />
    </View>
  );
}

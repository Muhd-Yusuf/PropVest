import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../lib/ThemeContext';
import { radius, spacing, shadows } from '../../lib/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padded?: boolean;
}

export function Card({ children, style, padded = true }: CardProps) {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.cardBg,
          borderRadius: radius.xl,
          borderWidth: isDark ? 1 : 0,
          borderColor: colors.cardBorder,
          ...(padded && { padding: spacing.xl }),
          ...(!isDark && shadows.sm),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

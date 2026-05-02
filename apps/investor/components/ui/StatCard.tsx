import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, radius, spacing } from '../../lib/theme';

interface StatCardProps {
  value: string;
  label: string;
  valueColor?: string;
}

export function StatCard({ value, label, valueColor }: StatCardProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgSecondary,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.borderDefault,
        padding: spacing.md,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontFamily: fonts.bold,
          fontSize: 15,
          color: valueColor || colors.textPrimary,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: fonts.regular,
          fontSize: 11,
          color: colors.textTertiary,
          marginTop: 2,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

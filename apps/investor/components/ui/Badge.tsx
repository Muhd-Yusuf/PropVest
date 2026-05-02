import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, radius, spacing } from '../../lib/theme';
import { PropertyType } from '../../lib/types';

interface BadgeProps {
  type: PropertyType;
}

const labels: Record<PropertyType, string> = {
  rental: 'RENTAL',
  build_sell: 'BUILD & SELL',
  land: 'LAND',
};

export function PropertyBadge({ type }: BadgeProps) {
  const { colors } = useTheme();

  const bgMap: Record<PropertyType, string> = {
    rental: colors.rentalBg,
    build_sell: colors.buildSellBg,
    land: colors.landBg,
  };
  const textMap: Record<PropertyType, string> = {
    rental: colors.rentalText,
    build_sell: colors.buildSellText,
    land: colors.landText,
  };

  return (
    <View
      style={{
        backgroundColor: bgMap[type],
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.sm,
        alignSelf: 'flex-start',
      }}
    >
      <Text
        style={{
          fontFamily: fonts.semibold,
          fontSize: 10,
          color: textMap[type],
          letterSpacing: 0.5,
        }}
      >
        {labels[type]}
      </Text>
    </View>
  );
}

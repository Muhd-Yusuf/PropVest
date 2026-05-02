import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand } from '../../lib/theme';

interface QuantityPickerProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantityPicker({ value, onChange, min = 1, max = 999 }: QuantityPickerProps) {
  const { colors } = useTheme();

  const handleDecrement = () => {
    if (value > min) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onChange(value + 1);
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xl,
      }}
    >
      <TouchableOpacity
        onPress={handleDecrement}
        disabled={value <= min}
        style={{
          width: 48,
          height: 48,
          borderRadius: radius.lg,
          backgroundColor: value <= min ? colors.bgTertiary : colors.bgSecondary,
          borderWidth: 1,
          borderColor: colors.borderDefault,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: value <= min ? 0.4 : 1,
        }}
      >
        <Minus size={20} color={colors.textPrimary} strokeWidth={2} />
      </TouchableOpacity>

      <Text
        style={{
          fontFamily: fonts.monoBold,
          fontSize: 28,
          color: colors.textPrimary,
          minWidth: 60,
          textAlign: 'center',
        }}
      >
        {value}
      </Text>

      <TouchableOpacity
        onPress={handleIncrement}
        disabled={value >= max}
        style={{
          width: 48,
          height: 48,
          borderRadius: radius.lg,
          backgroundColor: brand.emerald,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: value >= max ? 0.4 : 1,
        }}
      >
        <Plus size={20} color="#FFFFFF" strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
}

import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand } from '../../lib/theme';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  label,
  value,
  onChangeText,
  error,
  leftIcon,
  rightIcon,
  ...rest
}: InputProps) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? colors.error
    : isFocused
    ? brand.emerald
    : colors.borderDefault;

  return (
    <View>
      <Text
        style={{
          fontFamily: fonts.medium,
          fontSize: fontSize.caption,
          color: error ? colors.error : colors.textSecondary,
          marginBottom: spacing.xs,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 52,
          backgroundColor: colors.bgSecondary,
          borderRadius: radius.lg,
          borderWidth: isFocused ? 1.5 : 1,
          borderColor,
          paddingHorizontal: spacing.lg,
        }}
      >
        {leftIcon && (
          <View style={{ marginRight: spacing.sm }}>{leftIcon}</View>
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={colors.textTertiary}
          style={{
            flex: 1,
            fontFamily: fonts.regular,
            fontSize: fontSize.body,
            color: colors.textPrimary,
            height: '100%',
          }}
          {...rest}
        />
        {rightIcon && (
          <View style={{ marginLeft: spacing.sm }}>{rightIcon}</View>
        )}
      </View>
      {error && (
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: fontSize.caption,
            color: colors.error,
            marginTop: spacing.xs,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

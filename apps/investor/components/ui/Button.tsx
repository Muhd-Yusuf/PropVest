import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, radius, spacing, brand } from '../../lib/theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
}: ButtonProps) {
  const { colors } = useTheme();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const containerStyle: ViewStyle = {
    height: size === 'sm' ? 36 : size === 'lg' ? 52 : 44,
    paddingHorizontal: size === 'sm' ? 16 : size === 'lg' ? 28 : 20,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: fullWidth ? 'stretch' : 'flex-start',
    opacity: disabled ? 0.4 : 1,
    ...(variant === 'primary' && { backgroundColor: brand.emerald }),
    ...(variant === 'secondary' && {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: colors.borderDefault,
    }),
    ...(variant === 'ghost' && { backgroundColor: 'transparent' }),
    ...(variant === 'danger' && { backgroundColor: colors.error }),
  };

  const textStyle: TextStyle = {
    fontFamily: fonts.bold,
    fontSize: size === 'sm' ? 13 : size === 'lg' ? 16 : 15,
    ...(variant === 'primary' && { color: '#FFFFFF' }),
    ...(variant === 'secondary' && { color: colors.textPrimary }),
    ...(variant === 'ghost' && { color: colors.textSecondary }),
    ...(variant === 'danger' && { color: '#FFFFFF' }),
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[containerStyle, style]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? colors.textPrimary : '#FFF'} size="small" />
      ) : (
        <Text style={textStyle}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

import React from 'react';
import { ScrollView, View, StyleSheet, ViewStyle, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../lib/ThemeContext';
import { spacing } from '../../lib/theme';

interface ScreenWrapperProps {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  style?: ViewStyle;
}

export function ScreenWrapper({
  children,
  scroll = true,
  padded = true,
  style,
}: ScreenWrapperProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const content = (
    <View
      style={[
        {
          flex: 1,
          paddingHorizontal: padded ? spacing.screenPadding : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  if (scroll) {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.bgPrimary }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {content}
      </ScrollView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgPrimary }}>
      {content}
    </View>
  );
}

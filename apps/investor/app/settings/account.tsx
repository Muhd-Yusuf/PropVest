import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius } from '../../lib/theme';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function AccountScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgPrimary }}>
      <View
        style={{
          paddingTop: insets.top + spacing.sm,
          paddingHorizontal: spacing.screenPadding,
          paddingBottom: spacing.md,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 40,
            height: 40,
            borderRadius: radius.full,
            backgroundColor: colors.bgSecondary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowLeft size={20} color={colors.textPrimary} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h3, color: colors.textPrimary, marginLeft: spacing.md }}>
          Account
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.screenPadding, gap: spacing.lg, paddingBottom: insets.bottom + 20 }}
      >
        <Input label="Full Name" value="Muhammad Sada Yusuf" onChangeText={() => {}} />
        <Input label="Email" value="muhammad@propvest.ng" onChangeText={() => {}} editable={false} />
        <Input label="Phone" value="+234 812 345 6789" onChangeText={() => {}} keyboardType="phone-pad" />
        <View style={{ marginTop: spacing.md }}>
          <Button label="Save Changes" onPress={() => router.back()} fullWidth />
        </View>
      </ScrollView>
    </View>
  );
}

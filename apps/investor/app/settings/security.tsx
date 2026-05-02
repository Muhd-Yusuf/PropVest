import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Fingerprint, Lock } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand } from '../../lib/theme';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function SecurityScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [biometric, setBiometric] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

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
          Security
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.screenPadding, paddingBottom: insets.bottom + 20 }}
      >
        {/* Biometric */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.lg,
            padding: spacing.lg,
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.borderDefault,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Fingerprint size={22} color={brand.emerald} strokeWidth={1.5} />
            <View style={{ marginLeft: spacing.md }}>
              <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: colors.textPrimary }}>
                Biometric Login
              </Text>
              <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary }}>
                Use Face ID or fingerprint
              </Text>
            </View>
          </View>
          <Switch
            value={biometric}
            onValueChange={setBiometric}
            trackColor={{ false: colors.bgTertiary, true: brand.emerald }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Change Password */}
        <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, marginTop: spacing['2xl'], marginBottom: spacing.lg }}>
          Change Password
        </Text>
        <View style={{ gap: spacing.lg }}>
          <Input
            label="Current Password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Enter current password"
            secureTextEntry
          />
          <Input
            label="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter new password"
            secureTextEntry
          />
          <Button
            label="Update Password"
            onPress={() => router.back()}
            fullWidth
            disabled={!currentPassword || !newPassword}
          />
        </View>
      </ScrollView>
    </View>
  );
}

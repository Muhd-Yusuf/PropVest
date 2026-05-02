import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, Star, Trash2, Building2 } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand, shadows } from '../../lib/theme';
import { bankAccounts } from '../../lib/mock-data';
import { Button } from '../../components/ui/Button';

export default function BankAccountsScreen() {
  const { colors, isDark } = useTheme();
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
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            Bank Accounts
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => Alert.alert('Add Account', 'This would open the add bank account form')}
          style={{
            width: 36,
            height: 36,
            borderRadius: radius.md,
            backgroundColor: brand.emerald,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Plus size={18} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.screenPadding, paddingBottom: insets.bottom + 20 }}
      >
        {bankAccounts.map((account) => (
          <View
            key={account.id}
            style={{
              backgroundColor: colors.cardBg,
              borderRadius: radius.xl,
              padding: spacing.lg,
              marginBottom: spacing.md,
              borderWidth: account.isPrimary ? 1.5 : isDark ? 1 : 0,
              borderColor: account.isPrimary ? brand.emerald : colors.cardBorder,
              ...(!isDark && shadows.sm),
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: radius.full,
                    backgroundColor: colors.bgTertiary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: spacing.md,
                  }}
                >
                  <Building2 size={20} color={colors.textTertiary} strokeWidth={1.5} />
                </View>
                <View>
                  <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.body, color: colors.textPrimary }}>
                    {account.bankName}
                  </Text>
                  <Text style={{ fontFamily: fonts.mono, fontSize: fontSize.bodySmall, color: colors.textTertiary, marginTop: 2 }}>
                    {account.accountNumber}
                  </Text>
                </View>
              </View>
              {account.isPrimary && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Star size={12} color={brand.emerald} fill={brand.emerald} strokeWidth={2} />
                  <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.overline, color: brand.emerald }}>
                    PRIMARY
                  </Text>
                </View>
              )}
            </View>
            <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textSecondary, marginTop: spacing.sm, marginLeft: 52 }}>
              {account.accountName}
            </Text>
            {!account.isPrimary && (
              <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg }}>
                <TouchableOpacity
                  onPress={() => Alert.alert('Set Primary', `${account.bankName} set as primary`)}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    paddingVertical: spacing.sm,
                    borderRadius: radius.md,
                    backgroundColor: colors.bgSecondary,
                    borderWidth: 1,
                    borderColor: colors.borderDefault,
                  }}
                >
                  <Text style={{ fontFamily: fonts.medium, fontSize: fontSize.caption, color: colors.textSecondary }}>
                    Set Primary
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Alert.alert('Remove', 'Are you sure?', [{ text: 'Cancel' }, { text: 'Remove', style: 'destructive' }])}
                  style={{
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: spacing.sm,
                    borderRadius: radius.md,
                    backgroundColor: colors.errorBg,
                  }}
                >
                  <Trash2 size={16} color={colors.error} strokeWidth={2} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

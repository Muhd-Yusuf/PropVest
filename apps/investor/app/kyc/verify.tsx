import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronDown, CheckCircle } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand } from '../../lib/theme';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const banks = [
  'Access Bank', 'First Bank', 'GTBank', 'UBA', 'Zenith Bank',
  'Wema Bank', 'Fidelity Bank', 'Sterling Bank', 'Stanbic IBTC',
  'Union Bank', 'Ecobank', 'FCMB', 'Polaris Bank', 'Keystone Bank',
];

export default function KYCVerifyScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [showBanks, setShowBanks] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const accountName = accountNumber.length === 10 ? 'Muhammad Sada Yusuf' : '';

  const handleVerify = () => {
    setVerifying(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 1500);
  };

  if (verified) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bgPrimary,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: spacing.screenPadding,
          paddingBottom: insets.bottom,
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: colors.successBg,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing['2xl'],
          }}
        >
          <CheckCircle size={56} color={brand.emerald} strokeWidth={1.5} />
        </View>
        <Text style={{ fontFamily: fonts.bold, fontSize: fontSize.h1, color: colors.textPrimary, textAlign: 'center' }}>
          Verified!
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: fontSize.body,
            color: colors.textSecondary,
            textAlign: 'center',
            marginTop: spacing.md,
            lineHeight: 22,
          }}
        >
          Your bank account has been verified. You can now invest up to N5,000,000.
        </Text>
        <View style={{ marginTop: spacing['3xl'], width: '100%' }}>
          <Button label="Continue" onPress={() => router.replace('/kyc')} size="lg" fullWidth />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgPrimary }}>
      {/* Header */}
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
        <Text
          style={{
            fontFamily: fonts.semibold,
            fontSize: fontSize.h3,
            color: colors.textPrimary,
            marginLeft: spacing.md,
          }}
        >
          Bank Verification
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.screenPadding, paddingBottom: 120 }}
      >
        <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.body, color: colors.textSecondary, marginBottom: spacing['2xl'], lineHeight: 22 }}>
          Link your bank account to verify your identity. This also sets up your payout account.
        </Text>

        {/* Bank Selector */}
        <Text style={{ fontFamily: fonts.medium, fontSize: fontSize.bodySmall, color: colors.textPrimary, marginBottom: spacing.sm }}>
          Select Bank
        </Text>
        <TouchableOpacity
          onPress={() => setShowBanks(!showBanks)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.lg,
            padding: spacing.lg,
            borderWidth: 1,
            borderColor: showBanks ? brand.emerald : colors.borderDefault,
          }}
        >
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: fontSize.body,
              color: selectedBank ? colors.textPrimary : colors.textTertiary,
            }}
          >
            {selectedBank || 'Choose your bank'}
          </Text>
          <ChevronDown size={18} color={colors.textTertiary} strokeWidth={2} />
        </TouchableOpacity>

        {showBanks && (
          <View
            style={{
              backgroundColor: colors.bgSecondary,
              borderRadius: radius.lg,
              borderWidth: 1,
              borderColor: colors.borderDefault,
              marginTop: spacing.xs,
              maxHeight: 200,
            }}
          >
            <ScrollView nestedScrollEnabled>
              {banks.map((bank) => (
                <TouchableOpacity
                  key={bank}
                  onPress={() => {
                    setSelectedBank(bank);
                    setShowBanks(false);
                  }}
                  style={{
                    padding: spacing.md,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.borderSubtle,
                    backgroundColor: selectedBank === bank ? colors.successBg : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: selectedBank === bank ? fonts.semibold : fonts.regular,
                      fontSize: fontSize.bodySmall,
                      color: selectedBank === bank ? brand.emerald : colors.textPrimary,
                    }}
                  >
                    {bank}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Account Number */}
        <View style={{ marginTop: spacing.xl }}>
          <Input
            label="Account Number"
            value={accountNumber}
            onChangeText={(text) => setAccountNumber(text.replace(/[^0-9]/g, '').slice(0, 10))}
            placeholder="Enter 10-digit account number"
            keyboardType="numeric"
            maxLength={10}
          />
        </View>

        {/* Resolved Name */}
        {accountName !== '' && (
          <View
            style={{
              marginTop: spacing.lg,
              backgroundColor: colors.successBg,
              borderRadius: radius.lg,
              padding: spacing.lg,
              borderWidth: 1,
              borderColor: isDark ? 'rgba(0, 230, 181, 0.2)' : 'rgba(0, 230, 181, 0.15)',
            }}
          >
            <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.overline, color: colors.textTertiary }}>
              Account Name
            </Text>
            <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.body, color: brand.emerald, marginTop: 4 }}>
              {accountName}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* CTA */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: spacing.screenPadding,
          paddingTop: spacing.lg,
          paddingBottom: insets.bottom + spacing.md,
          backgroundColor: colors.bgPrimary,
          borderTopWidth: 1,
          borderTopColor: colors.borderDefault,
        }}
      >
        <Button
          label="Verify Account"
          onPress={handleVerify}
          size="lg"
          fullWidth
          disabled={!selectedBank || accountNumber.length !== 10}
          loading={verifying}
        />
      </View>
    </View>
  );
}

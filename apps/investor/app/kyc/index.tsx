import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, ShieldCheck, ChevronRight, Lock, CreditCard, Fingerprint } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand, shadows } from '../../lib/theme';
import { formatNairaFull } from '../../lib/format';
import { kycStatus } from '../../lib/mock-data';
import { Button } from '../../components/ui/Button';

const tiers = [
  {
    tier: 'tier1',
    label: 'Tier 1 — Bank Verification',
    icon: CreditCard,
    limit: 'N5,000,000',
    requirement: 'Link a bank account',
  },
  {
    tier: 'tier2',
    label: 'Tier 2 — BVN Verification',
    icon: Lock,
    limit: 'N25,000,000',
    requirement: 'Verify your BVN',
  },
  {
    tier: 'tier3',
    label: 'Tier 3 — Full KYC',
    icon: Fingerprint,
    limit: 'Unlimited',
    requirement: 'NIN + Selfie verification',
  },
];

export default function KYCScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const currentTierIndex = tiers.findIndex((t) => t.tier === kycStatus.tier);

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
          KYC Verification
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.screenPadding, paddingBottom: insets.bottom + 20 }}
      >
        {/* Current Status */}
        <View
          style={{
            backgroundColor: colors.successBg,
            borderRadius: radius.xl,
            padding: spacing.xl,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: isDark ? 'rgba(0, 230, 181, 0.2)' : 'rgba(0, 230, 181, 0.15)',
          }}
        >
          <ShieldCheck size={40} color={brand.emerald} strokeWidth={1.5} />
          <Text style={{ fontFamily: fonts.bold, fontSize: fontSize.h3, color: colors.textPrimary, marginTop: spacing.md }}>
            {kycStatus.tier === 'none' ? 'Not Verified' : kycStatus.tier.replace('tier', 'Tier ')} Verified
          </Text>
          <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.bodySmall, color: colors.textSecondary, marginTop: spacing.xs }}>
            Investment limit: {formatNairaFull(kycStatus.investmentLimit)}
          </Text>
          {kycStatus.verifiedAt && (
            <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary, marginTop: spacing.xs }}>
              Verified on {kycStatus.verifiedAt}
            </Text>
          )}
        </View>

        {/* Tiers */}
        <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, marginTop: spacing['2xl'], marginBottom: spacing.lg }}>
          Verification Tiers
        </Text>

        {tiers.map((tier, idx) => {
          const isCompleted = idx <= currentTierIndex;
          const isNext = idx === currentTierIndex + 1;
          const Icon = tier.icon;

          return (
            <View
              key={tier.tier}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: spacing.lg,
                marginBottom: spacing.sm,
                borderRadius: radius.lg,
                backgroundColor: isCompleted ? colors.successBg : colors.bgSecondary,
                borderWidth: isNext ? 1.5 : isDark ? 1 : 0,
                borderColor: isNext ? brand.emerald : colors.borderDefault,
                ...(!isDark && !isCompleted && shadows.sm),
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: radius.full,
                  backgroundColor: isCompleted ? brand.emerald : colors.bgTertiary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: spacing.md,
                }}
              >
                {isCompleted ? (
                  <ShieldCheck size={20} color="#FFFFFF" strokeWidth={2} />
                ) : (
                  <Icon size={20} color={colors.textTertiary} strokeWidth={1.5} />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: colors.textPrimary }}>
                  {tier.label}
                </Text>
                <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary, marginTop: 2 }}>
                  {isCompleted ? `Completed · Limit: ${tier.limit}` : `Limit: ${tier.limit}`}
                </Text>
              </View>
              {isNext && (
                <Button
                  label="Verify"
                  onPress={() => router.push('/kyc/verify')}
                  size="sm"
                />
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Shield, CheckCircle2 } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand } from '../../lib/theme';
import { MoneyRoutingFlow } from '../../components/MoneyRoutingFlow';

export default function HowItWorksScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const securityPoints = [
    'All payments processed through Paystack — secure and verified',
    'PropVest holds funds until trade is verified',
    '1% trading fee (max ₦5,000) applies to all P2P trades',
    "Seller's bank account must be KYC-verified",
    'Typical transfer time: instant to 24 hours',
  ];

  const feeRows = [
    { label: 'Trading Fee', value: '1% (max ₦5,000)' },
    { label: 'Who pays', value: 'Deducted from trade amount' },
    { label: 'Buyer pays', value: 'Subtotal + 1% fee' },
    { label: 'Seller receives', value: 'Subtotal - 1% fee' },
  ];

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
          How P2P Trading Works
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.screenPadding, paddingBottom: insets.bottom + spacing['4xl'] }}
      >
        {/* Section 1: For Buyers */}
        <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, marginBottom: spacing.md }}>
          For Buyers
        </Text>
        <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.bodySmall, color: colors.textSecondary, marginBottom: spacing.sm, lineHeight: 18 }}>
          When you purchase units from another investor, your payment is securely processed and the units are transferred to your portfolio.
        </Text>
        <View
          style={{
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.xl,
            padding: spacing.lg,
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.borderDefault,
          }}
        >
          <MoneyRoutingFlow perspective="buyer" units={2} pricePerUnit={150000} />
        </View>

        {/* Section 2: For Sellers */}
        <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, marginBottom: spacing.md, marginTop: spacing['2xl'] }}>
          For Sellers
        </Text>
        <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.bodySmall, color: colors.textSecondary, marginBottom: spacing.sm, lineHeight: 18 }}>
          When you list units for sale, PropVest handles the payment collection and sends the proceeds directly to your verified bank account.
        </Text>
        <View
          style={{
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.xl,
            padding: spacing.lg,
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.borderDefault,
          }}
        >
          <MoneyRoutingFlow perspective="seller" units={2} pricePerUnit={150000} sellerBank="Your linked bank account" />
        </View>

        {/* Section 3: Trust & Security */}
        <View
          style={{
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.xl,
            padding: spacing.lg,
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.borderDefault,
            marginTop: spacing['2xl'],
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: radius.full,
                backgroundColor: colors.successBg,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Shield size={20} color={colors.success} strokeWidth={2} />
            </View>
            <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, marginLeft: spacing.md }}>
              Trust & Security
            </Text>
          </View>

          {securityPoints.map((point, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginBottom: index < securityPoints.length - 1 ? spacing.md : 0,
              }}
            >
              <CheckCircle2 size={16} color={brand.emerald} strokeWidth={2} style={{ marginTop: 1 }} />
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: fontSize.bodySmall,
                  color: colors.textSecondary,
                  marginLeft: spacing.sm,
                  flex: 1,
                  lineHeight: 18,
                }}
              >
                {point}
              </Text>
            </View>
          ))}
        </View>

        {/* Section 4: Fee Breakdown */}
        <View
          style={{
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.xl,
            padding: spacing.lg,
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.borderDefault,
            marginTop: spacing.lg,
          }}
        >
          <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, marginBottom: spacing.md }}>
            Fee Breakdown
          </Text>

          {feeRows.map((row, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: spacing.sm,
                borderTopWidth: index > 0 ? 1 : 0,
                borderTopColor: colors.borderSubtle,
              }}
            >
              <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.bodySmall, color: colors.textTertiary }}>
                {row.label}
              </Text>
              <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: colors.textPrimary, textAlign: 'right', flex: 1, marginLeft: spacing.lg }}>
                {row.value}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

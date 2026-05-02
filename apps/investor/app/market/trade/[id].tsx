import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, CheckCircle2, Clock, User, ArrowRight } from 'lucide-react-native';
import { useTheme } from '../../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand, shadows } from '../../../lib/theme';
import { formatNairaFull } from '../../../lib/format';
import { p2pTrades } from '../../../lib/mock-data';
import { MoneyRoutingFlow } from '../../../components/MoneyRoutingFlow';
import { PropertyBadge } from '../../../components/ui/Badge';

export default function TradeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const trade = p2pTrades.find((t) => t.id === id);

  if (!trade) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bgPrimary, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily: fonts.medium, color: colors.textTertiary }}>Trade not found</Text>
      </View>
    );
  }

  const timelineSteps = [
    { label: 'Listed on Marketplace', date: trade.createdAt },
    { label: 'Buyer purchased', date: trade.paidAt },
    { label: 'Payment received via Paystack', date: trade.paidAt },
    { label: 'Fee deducted (1%, max ₦5,000)', date: trade.paidAt },
    { label: `${formatNairaFull(trade.sellerReceives)} sent to ${trade.sellerBankName}`, date: trade.sellerPaidAt },
    { label: 'Units transferred to buyer', date: trade.completedAt },
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
          Trade Details
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.screenPadding, paddingBottom: insets.bottom + spacing.xxl }}
      >
        {/* 1. Status Badge */}
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.successBg,
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.sm,
              borderRadius: radius.full,
              gap: spacing.xs,
            }}
          >
            <CheckCircle2 size={16} color={colors.success} strokeWidth={2} />
            <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: colors.success }}>
              Completed
            </Text>
          </View>
        </View>

        {/* 2. Property Info Card */}
        <View
          style={{
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.xl,
            padding: spacing.lg,
            marginTop: spacing.lg,
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.borderDefault,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Text
              style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, flex: 1, marginRight: spacing.sm }}
              numberOfLines={2}
            >
              {trade.propertyName}
            </Text>
            <PropertyBadge type={trade.propertyType} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.md }}>
            <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.bodySmall, color: colors.textSecondary }}>
              {trade.units} unit{trade.units > 1 ? 's' : ''} @ {formatNairaFull(trade.pricePerUnit)}/unit
            </Text>
          </View>
        </View>

        {/* 3. Parties Section */}
        <View
          style={{
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.xl,
            padding: spacing.lg,
            marginTop: spacing.lg,
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.borderDefault,
          }}
        >
          {/* Buyer */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: colors.bgTertiary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <User size={16} color={colors.textTertiary} strokeWidth={2} />
            </View>
            <View style={{ marginLeft: spacing.md, flex: 1 }}>
              <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary }}>Buyer</Text>
              <Text style={{ fontFamily: fonts.medium, fontSize: fontSize.body, color: colors.textPrimary }}>{trade.buyerName}</Text>
            </View>
          </View>

          {/* Arrow separator */}
          <View style={{ alignItems: 'center', paddingVertical: spacing.sm }}>
            <ArrowRight size={16} color={colors.textTertiary} strokeWidth={2} style={{ transform: [{ rotate: '90deg' }] }} />
          </View>

          {/* Seller */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: colors.bgTertiary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <User size={16} color={colors.textTertiary} strokeWidth={2} />
            </View>
            <View style={{ marginLeft: spacing.md, flex: 1 }}>
              <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary }}>Seller</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                <Text style={{ fontFamily: fonts.medium, fontSize: fontSize.body, color: colors.textPrimary }}>{trade.sellerName}</Text>
                <View
                  style={{
                    backgroundColor: colors.successBg,
                    paddingHorizontal: spacing.sm,
                    paddingVertical: 2,
                    borderRadius: radius.sm,
                  }}
                >
                  <Text style={{ fontFamily: fonts.medium, fontSize: fontSize.overline, color: colors.success }}>(You)</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Date */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: spacing.lg,
              paddingTop: spacing.md,
              borderTopWidth: 1,
              borderTopColor: colors.borderSubtle,
            }}
          >
            <Clock size={16} color={colors.textTertiary} strokeWidth={2} />
            <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.bodySmall, color: colors.textSecondary, marginLeft: spacing.sm }}>
              {trade.completedAt}
            </Text>
          </View>
        </View>

        {/* 4. Money Routing Flow */}
        <View
          style={{
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.xl,
            padding: spacing.lg,
            marginTop: spacing.lg,
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.borderDefault,
          }}
        >
          <MoneyRoutingFlow
            perspective="seller"
            units={trade.units}
            pricePerUnit={trade.pricePerUnit}
            sellerBank={`${trade.sellerBankName} ****${trade.sellerAccountLast4}`}
            status={trade.status}
          />
        </View>

        {/* 5. Financial Breakdown */}
        <View
          style={{
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.xl,
            padding: spacing.lg,
            marginTop: spacing.lg,
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.borderDefault,
          }}
        >
          <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, marginBottom: spacing.md }}>
            Financial Breakdown
          </Text>

          {/* Subtotal */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm }}>
            <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.bodySmall, color: colors.textTertiary }}>Subtotal</Text>
            <Text style={{ fontFamily: fonts.mono, fontSize: fontSize.bodySmall, color: colors.textPrimary }}>
              {formatNairaFull(trade.subtotal)}
            </Text>
          </View>

          {/* Trading Fee */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm }}>
            <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.bodySmall, color: colors.textTertiary }}>Trading Fee (1%, max ₦5,000)</Text>
            <Text style={{ fontFamily: fonts.mono, fontSize: fontSize.bodySmall, color: colors.error }}>
              -{formatNairaFull(trade.tradingFee)}
            </Text>
          </View>

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: colors.borderSubtle, marginVertical: spacing.sm }} />

          {/* Net Received */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm }}>
            <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.body, color: colors.textPrimary }}>Net Received</Text>
            <Text style={{ fontFamily: fonts.monoBold, fontSize: fontSize.h4, color: brand.emerald }}>
              {formatNairaFull(trade.sellerReceives)}
            </Text>
          </View>
        </View>

        {/* 6. Timeline Card */}
        <View
          style={{
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.xl,
            padding: spacing.lg,
            marginTop: spacing.lg,
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.borderDefault,
          }}
        >
          <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, marginBottom: spacing.lg }}>
            Timeline
          </Text>

          {timelineSteps.map((step, index) => {
            const isCompleted = !!step.date;
            const isLast = index === timelineSteps.length - 1;

            return (
              <View key={index}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  {/* Icon */}
                  <View style={{ width: 24, alignItems: 'center' }}>
                    <CheckCircle2
                      size={18}
                      color={isCompleted ? colors.success : colors.textTertiary}
                      strokeWidth={2}
                    />
                  </View>

                  {/* Text */}
                  <View style={{ flex: 1, marginLeft: spacing.sm }}>
                    <Text
                      style={{
                        fontFamily: fonts.medium,
                        fontSize: fontSize.bodySmall,
                        color: isCompleted ? colors.textPrimary : colors.textTertiary,
                      }}
                    >
                      {step.label}
                    </Text>
                    {step.date && (
                      <Text
                        style={{
                          fontFamily: fonts.regular,
                          fontSize: fontSize.overline,
                          color: colors.textTertiary,
                          marginTop: 2,
                        }}
                      >
                        {step.date}
                      </Text>
                    )}
                  </View>
                </View>

                {/* Vertical connector line */}
                {!isLast && (
                  <View
                    style={{
                      width: 2,
                      height: 16,
                      backgroundColor: colors.bgTertiary,
                      marginLeft: 11,
                      marginVertical: 2,
                    }}
                  />
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

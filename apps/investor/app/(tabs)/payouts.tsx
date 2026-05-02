import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CircleDollarSign, ArrowDownToLine, Clock, CheckCircle2 } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand, shadows } from '../../lib/theme';
import { formatNaira, formatNairaFull } from '../../lib/format';
import { payouts, portfolioSummary } from '../../lib/mock-data';
import { ScreenWrapper } from '../../components/ui/ScreenWrapper';
import { StatCard } from '../../components/ui/StatCard';

type PayoutFilter = 'all' | 'sent' | 'pending';

export default function PayoutsScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<PayoutFilter>('all');

  const filtered = payouts.filter(
    (p) => filter === 'all' || p.status === filter
  );

  const totalEarned = payouts.reduce((sum, p) => sum + p.amount, 0);

  return (
    <ScreenWrapper>
      {/* Header */}
      <View style={{ paddingTop: insets.top + spacing.md, marginBottom: spacing.xl }}>
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: fontSize.h2,
            color: colors.textPrimary,
          }}
        >
          Payouts
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: fontSize.bodySmall,
            color: colors.textTertiary,
            marginTop: 2,
          }}
        >
          Track your rental income
        </Text>
      </View>

      {/* Summary */}
      <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing['2xl'] }}>
        <StatCard
          value={formatNairaFull(portfolioSummary.totalEarned)}
          label="Total Earned"
          valueColor={brand.emerald}
        />
        <StatCard
          value={`${payouts.length}`}
          label="Payouts Received"
        />
      </View>

      {/* Filters */}
      <View
        style={{
          flexDirection: 'row',
          gap: spacing.sm,
          marginBottom: spacing.xl,
        }}
      >
        {(['all', 'sent', 'pending'] as PayoutFilter[]).map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            activeOpacity={0.7}
            style={{
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.sm,
              borderRadius: radius.full,
              backgroundColor: filter === f ? brand.emerald : colors.bgSecondary,
              borderWidth: filter === f ? 0 : 1,
              borderColor: colors.borderDefault,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: fontSize.bodySmall,
                color: filter === f ? '#FFFFFF' : colors.textSecondary,
                textTransform: 'capitalize',
              }}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Payout List */}
      <Text
        style={{
          fontFamily: fonts.semibold,
          fontSize: fontSize.h4,
          color: colors.textPrimary,
          marginBottom: spacing.lg,
        }}
      >
        Transaction History
      </Text>

      {filtered.length === 0 ? (
        <View style={{ alignItems: 'center', paddingTop: spacing['4xl'] }}>
          <Clock size={40} color={colors.textTertiary} strokeWidth={1.2} />
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: fontSize.body,
              color: colors.textTertiary,
              marginTop: spacing.lg,
            }}
          >
            No payouts yet
          </Text>
        </View>
      ) : (
        filtered.map((payout) => (
          <View
            key={payout.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.cardBg,
              borderRadius: radius.lg,
              borderWidth: isDark ? 1 : 0,
              borderColor: colors.cardBorder,
              padding: spacing.lg,
              marginBottom: spacing.sm,
              ...(!isDark && shadows.sm),
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: radius.full,
                backgroundColor: payout.status === 'sent' ? colors.successBg : colors.warningBg,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: spacing.md,
              }}
            >
              {payout.status === 'sent' ? (
                <CheckCircle2 size={20} color={brand.emerald} strokeWidth={1.5} />
              ) : (
                <Clock size={20} color={colors.warning} strokeWidth={1.5} />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: fontSize.bodySmall,
                  color: colors.textPrimary,
                }}
                numberOfLines={1}
              >
                {payout.propertyName}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: fontSize.caption,
                  color: colors.textTertiary,
                  marginTop: 2,
                }}
              >
                {payout.date}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: fonts.mono,
                fontSize: fontSize.bodySmall,
                color: brand.emerald,
              }}
            >
              +{formatNaira(payout.amount)}
            </Text>
          </View>
        ))
      )}
    </ScreenWrapper>
  );
}

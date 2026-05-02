import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, TrendingUp, Calendar, CircleDollarSign, Tag } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand, shadows } from '../../lib/theme';
import { formatNairaFull, formatNaira } from '../../lib/format';
import { holdings, payouts } from '../../lib/mock-data';
import { StatCard } from '../../components/ui/StatCard';
import { Button } from '../../components/ui/Button';
import { PropertyBadge } from '../../components/ui/Badge';

export default function HoldingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const holding = holdings.find((h) => h.id === id);

  if (!holding) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bgPrimary, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily: fonts.medium, color: colors.textTertiary }}>Holding not found</Text>
      </View>
    );
  }

  const gain = ((holding.currentValue - holding.investedAmount) / holding.investedAmount) * 100;
  const propertyPayouts = payouts.filter((p) => p.propertyName === holding.property.name);

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
        <View style={{ marginLeft: spacing.md, flex: 1 }}>
          <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h3, color: colors.textPrimary }} numberOfLines={1}>
            {holding.property.name}
          </Text>
          <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary }}>
            Holding Details
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.screenPadding, paddingBottom: 120 }}
      >
        {/* Value Card */}
        <View
          style={{
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.xl,
            padding: spacing.xl,
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.borderDefault,
            ...(!isDark && shadows.sm),
            alignItems: 'center',
          }}
        >
          <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary }}>
            Current Value
          </Text>
          <Text style={{ fontFamily: fonts.monoBold, fontSize: 32, color: colors.textPrimary, marginTop: spacing.xs }}>
            {formatNairaFull(holding.currentValue)}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm }}>
            <TrendingUp size={16} color={brand.emerald} strokeWidth={2} />
            <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: brand.emerald, marginLeft: 4 }}>
              +{gain.toFixed(1)}%
            </Text>
            <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary, marginLeft: spacing.sm }}>
              since purchase
            </Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg }}>
          <StatCard value={`${holding.units}`} label="Units Owned" />
          <StatCard value={formatNaira(holding.investedAmount)} label="Invested" />
        </View>
        <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }}>
          <StatCard value={formatNaira(holding.totalEarned)} label="Total Earned" valueColor={brand.emerald} />
          <StatCard
            value={holding.nextPayoutAmount > 0 ? formatNaira(holding.nextPayoutAmount) : 'N/A'}
            label={holding.nextPayoutDays > 0 ? `Next in ${holding.nextPayoutDays}d` : 'No upcoming'}
          />
        </View>

        {/* Property Info */}
        <View
          style={{
            marginTop: spacing.xl,
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.xl,
            padding: spacing.lg,
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.borderDefault,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
            <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary }}>
              Property Info
            </Text>
            <PropertyBadge type={holding.property.type} />
          </View>
          <InfoRow label="Unit Price" value={formatNairaFull(holding.property.unitPrice)} colors={colors} />
          <InfoRow label="Total Value" value={formatNairaFull(holding.property.totalValue)} colors={colors} />
          <InfoRow label="Investors" value={holding.property.investorCount.toLocaleString()} colors={colors} />
          <InfoRow label="Developer" value={holding.property.developer.name} colors={colors} />
        </View>

        {/* Payout History */}
        {propertyPayouts.length > 0 && (
          <View style={{ marginTop: spacing.xl }}>
            <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, marginBottom: spacing.lg }}>
              Payout History
            </Text>
            {propertyPayouts.map((payout) => (
              <View
                key={payout.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: spacing.md,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.borderSubtle,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: radius.full,
                    backgroundColor: colors.successBg,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: spacing.md,
                  }}
                >
                  <CircleDollarSign size={18} color={brand.emerald} strokeWidth={1.5} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.medium, fontSize: fontSize.bodySmall, color: colors.textPrimary }}>
                    Quarterly Payout
                  </Text>
                  <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary, marginTop: 2 }}>
                    {payout.date}
                  </Text>
                </View>
                <Text style={{ fontFamily: fonts.mono, fontSize: fontSize.bodySmall, color: brand.emerald }}>
                  +{formatNaira(payout.amount)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Actions */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          gap: spacing.md,
          paddingHorizontal: spacing.screenPadding,
          paddingTop: spacing.lg,
          paddingBottom: insets.bottom + spacing.md,
          backgroundColor: colors.bgPrimary,
          borderTopWidth: 1,
          borderTopColor: colors.borderDefault,
        }}
      >
        <View style={{ flex: 1 }}>
          <Button
            label="Sell Units"
            onPress={() => router.push('/market/sell')}
            variant="secondary"
            size="lg"
            fullWidth
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            label="Buy More"
            onPress={() => router.push(`/invest/${holding.property.id}`)}
            size="lg"
            fullWidth
          />
        </View>
      </View>
    </View>
  );
}

function InfoRow({ label, value, colors }: { label: string; value: string; colors: any }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm }}>
      <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.bodySmall, color: colors.textTertiary }}>{label}</Text>
      <Text style={{ fontFamily: fonts.medium, fontSize: fontSize.bodySmall, color: colors.textPrimary }}>{value}</Text>
    </View>
  );
}

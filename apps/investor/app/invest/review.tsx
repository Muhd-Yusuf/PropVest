import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, CheckSquare, Square, AlertTriangle } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand, shadows } from '../../lib/theme';
import { formatNairaFull } from '../../lib/format';
import { properties } from '../../lib/mock-data';
import { Button } from '../../components/ui/Button';
import { PropertyBadge } from '../../components/ui/Badge';
import { calcInvestmentFee, investmentFeeLabel } from '../../lib/platform-config';

export default function ReviewScreen() {
  const { propertyId, units: unitsStr } = useLocalSearchParams<{ propertyId: string; units: string }>();
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [agreedRisk, setAgreedRisk] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);

  const property = properties.find((p) => p.id === propertyId);
  const units = parseInt(unitsStr || '1', 10);

  if (!property) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bgPrimary, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily: fonts.medium, color: colors.textTertiary }}>Property not found</Text>
      </View>
    );
  }

  const subtotal = units * property.unitPrice;
  const platformFee = calcInvestmentFee(subtotal);
  const total = subtotal + platformFee;

  const returnLabel =
    property.type === 'rental'
      ? `Est. ${property.rentYield}% annual yield`
      : property.type === 'build_sell'
      ? `Est. ~${property.estimatedProfit}% return in ${property.timelineMonths}mo`
      : 'Returns via land appreciation';

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
          Review Order
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.screenPadding, paddingBottom: insets.bottom + 100 }}
      >
        {/* Order Summary Card */}
        <View
          style={{
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.xl,
            padding: spacing.lg,
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.borderDefault,
            ...(!isDark && shadows.sm),
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View style={{ flex: 1, marginRight: spacing.md }}>
              <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.body, color: colors.textPrimary }} numberOfLines={1}>
                {property.name}
              </Text>
              <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary, marginTop: 2 }}>
                {property.location.area}, {property.location.city}
              </Text>
            </View>
            <PropertyBadge type={property.type} />
          </View>

          <View style={{ marginTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.borderSubtle, paddingTop: spacing.lg }}>
            <DetailRow label="Units" value={`${units}`} colors={colors} />
            <DetailRow label="Price per unit" value={formatNairaFull(property.unitPrice)} colors={colors} />
            <DetailRow label="Subtotal" value={formatNairaFull(subtotal)} colors={colors} />
            <DetailRow label={investmentFeeLabel()} value={formatNairaFull(platformFee)} colors={colors} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: spacing.md,
                marginTop: spacing.sm,
                borderTopWidth: 1,
                borderTopColor: colors.borderSubtle,
              }}
            >
              <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.body, color: colors.textPrimary }}>Total</Text>
              <Text style={{ fontFamily: fonts.monoBold, fontSize: fontSize.h3, color: brand.emerald }}>
                {formatNairaFull(total)}
              </Text>
            </View>
          </View>
        </View>

        {/* Expected Returns */}
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
          <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: brand.emerald }}>
            Expected Returns
          </Text>
          <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textSecondary, marginTop: 4 }}>
            {returnLabel}
          </Text>
        </View>

        {/* Risk Disclaimer */}
        <View
          style={{
            marginTop: spacing.xl,
            backgroundColor: colors.warningBg,
            borderRadius: radius.lg,
            padding: spacing.lg,
            borderWidth: 1,
            borderColor: isDark ? 'rgba(245, 166, 35, 0.2)' : 'rgba(245, 166, 35, 0.15)',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
            <AlertTriangle size={16} color={colors.warning} strokeWidth={2} />
            <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: colors.textPrimary, marginLeft: spacing.sm }}>
              Investment Risk
            </Text>
          </View>
          <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textSecondary, lineHeight: 18 }}>
            Real estate investments carry risk including potential loss of capital. Past performance does not guarantee future results. PropVest does not guarantee returns.
          </Text>
        </View>

        {/* Checkboxes */}
        <View style={{ marginTop: spacing['2xl'] }}>
          <CheckboxRow
            checked={agreedRisk}
            onToggle={() => setAgreedRisk(!agreedRisk)}
            label="I understand the investment risks and that returns are not guaranteed"
            colors={colors}
          />
          <View style={{ height: spacing.md }} />
          <CheckboxRow
            checked={agreedTerms}
            onToggle={() => setAgreedTerms(!agreedTerms)}
            label="I agree to PropVest's Terms of Service and Investment Agreement"
            colors={colors}
          />
        </View>

        {/* Payment Info */}
        <View
          style={{
            marginTop: spacing['2xl'],
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.lg,
            padding: spacing.lg,
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.borderDefault,
          }}
        >
          <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: colors.textPrimary, marginBottom: spacing.xs }}>
            Payment Method
          </Text>
          <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary }}>
            You'll be given a dedicated bank account to transfer funds to. Payment is processed via Paystack.
          </Text>
        </View>
      </ScrollView>

      {/* Sticky CTA */}
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
          label={`Pay ${formatNairaFull(total)}`}
          onPress={() =>
            router.push({
              pathname: '/invest/payment',
              params: {
                propertyId: property.id,
                propertyName: property.name,
                units: units.toString(),
                total: total.toString(),
              },
            })
          }
          size="lg"
          fullWidth
          disabled={!agreedRisk || !agreedTerms}
        />
      </View>
    </View>
  );
}

function DetailRow({ label, value, colors }: { label: string; value: string; colors: any }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm }}>
      <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.bodySmall, color: colors.textTertiary }}>{label}</Text>
      <Text style={{ fontFamily: fonts.mono, fontSize: fontSize.bodySmall, color: colors.textPrimary }}>{value}</Text>
    </View>
  );
}

function CheckboxRow({
  checked,
  onToggle,
  label,
  colors,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
  colors: any;
}) {
  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.7}
      style={{ flexDirection: 'row', alignItems: 'flex-start' }}
    >
      {checked ? (
        <CheckSquare size={20} color={brand.emerald} strokeWidth={2} />
      ) : (
        <Square size={20} color={colors.textTertiary} strokeWidth={1.5} />
      )}
      <Text
        style={{
          fontFamily: fonts.regular,
          fontSize: fontSize.caption,
          color: colors.textSecondary,
          marginLeft: spacing.sm,
          flex: 1,
          lineHeight: 18,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

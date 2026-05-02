import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, AlertCircle, ShieldCheck } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand, shadows } from '../../lib/theme';
import { formatNairaFull } from '../../lib/format';
import { properties, kycStatus } from '../../lib/mock-data';
import { QuantityPicker } from '../../components/ui/QuantityPicker';
import { Button } from '../../components/ui/Button';
import { PropertyBadge } from '../../components/ui/Badge';
import { calcInvestmentFee, investmentFeeLabel } from '../../lib/platform-config';

export default function SelectUnitsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [units, setUnits] = useState(1);

  const property = properties.find((p) => p.id === id);
  if (!property) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bgPrimary, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily: fonts.medium, color: colors.textTertiary }}>Property not found</Text>
      </View>
    );
  }

  const unitsAvailable = property.totalUnits - property.unitsSold;
  const subtotal = units * property.unitPrice;
  const platformFee = calcInvestmentFee(subtotal);
  const total = subtotal + platformFee;
  const exceedsLimit = total > kycStatus.investmentLimit;

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
            flex: 1,
          }}
          numberOfLines={1}
        >
          Select Units
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.screenPadding, paddingBottom: 120 }}
      >
        {/* Property Info */}
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
              <Text
                style={{ fontFamily: fonts.semibold, fontSize: fontSize.body, color: colors.textPrimary }}
                numberOfLines={1}
              >
                {property.name}
              </Text>
              <Text
                style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary, marginTop: 2 }}
              >
                {property.location.area}, {property.location.city}
              </Text>
            </View>
            <PropertyBadge type={property.type} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: spacing.lg,
              paddingTop: spacing.md,
              borderTopWidth: 1,
              borderTopColor: colors.borderSubtle,
            }}
          >
            <View>
              <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.overline, color: colors.textTertiary }}>
                Price/Unit
              </Text>
              <Text style={{ fontFamily: fonts.monoBold, fontSize: fontSize.body, color: colors.textPrimary, marginTop: 2 }}>
                {formatNairaFull(property.unitPrice)}
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.overline, color: colors.textTertiary }}>
                Available
              </Text>
              <Text style={{ fontFamily: fonts.mono, fontSize: fontSize.body, color: colors.textPrimary, marginTop: 2 }}>
                {unitsAvailable.toLocaleString()} units
              </Text>
            </View>
          </View>
        </View>

        {/* Quantity Picker */}
        <View style={{ alignItems: 'center', marginTop: spacing['3xl'] }}>
          <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary, marginBottom: spacing.lg }}>
            How many units?
          </Text>
          <QuantityPicker value={units} onChange={setUnits} min={1} max={Math.min(unitsAvailable, 100)} />
        </View>

        {/* Cost Breakdown */}
        <View
          style={{
            marginTop: spacing['3xl'],
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.xl,
            padding: spacing.lg,
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.borderDefault,
          }}
        >
          <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, marginBottom: spacing.md }}>
            Cost Breakdown
          </Text>
          <CostRow label={`${units} unit${units > 1 ? 's' : ''} × ${formatNairaFull(property.unitPrice)}`} value={formatNairaFull(subtotal)} colors={colors} />
          <CostRow label={investmentFeeLabel()} value={formatNairaFull(platformFee)} colors={colors} />
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

        {/* KYC Status */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: spacing.xl,
            padding: spacing.md,
            backgroundColor: exceedsLimit ? colors.errorBg : colors.successBg,
            borderRadius: radius.lg,
          }}
        >
          {exceedsLimit ? (
            <AlertCircle size={18} color={colors.error} strokeWidth={2} />
          ) : (
            <ShieldCheck size={18} color={brand.emerald} strokeWidth={2} />
          )}
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: fontSize.caption,
              color: exceedsLimit ? colors.error : brand.emerald,
              marginLeft: spacing.sm,
              flex: 1,
            }}
          >
            {exceedsLimit
              ? `Exceeds your ${kycStatus.tier.replace('tier', 'Tier ')} limit of ${formatNairaFull(kycStatus.investmentLimit)}`
              : `KYC ${kycStatus.tier.replace('tier', 'Tier ')} verified — limit ${formatNairaFull(kycStatus.investmentLimit)}`}
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
          label="Continue to Review"
          onPress={() =>
            router.push({
              pathname: '/invest/review',
              params: {
                propertyId: property.id,
                units: units.toString(),
              },
            })
          }
          size="lg"
          fullWidth
          disabled={exceedsLimit}
        />
      </View>
    </View>
  );
}

function CostRow({ label, value, colors }: { label: string; value: string; colors: any }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm }}>
      <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.bodySmall, color: colors.textTertiary }}>{label}</Text>
      <Text style={{ fontFamily: fonts.mono, fontSize: fontSize.bodySmall, color: colors.textPrimary }}>{value}</Text>
    </View>
  );
}

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Check, AlertCircle, Shield, HelpCircle } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand, shadows } from '../../lib/theme';
import { formatNairaFull } from '../../lib/format';
import { holdings } from '../../lib/mock-data';
import { QuantityPicker } from '../../components/ui/QuantityPicker';
import { Button } from '../../components/ui/Button';
import { Holding } from '../../lib/types';
import { calcTradingFee, tradingFeeLabel, platformConfig } from '../../lib/platform-config';

export default function SellScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedHolding, setSelectedHolding] = useState<Holding | null>(null);
  const [units, setUnits] = useState(1);
  const [pricePerUnit, setPricePerUnit] = useState('');

  const askingPrice = parseInt(pricePerUnit || '0', 10);
  const totalValue = units * askingPrice;
  const tradingFee = calcTradingFee(totalValue);
  const netProceeds = totalValue - tradingFee;

  const originalPrice = selectedHolding?.property.unitPrice || 0;
  const gainPercent = originalPrice > 0 ? ((askingPrice - originalPrice) / originalPrice) * 100 : 0;

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
          Sell Units
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.screenPadding, paddingBottom: 120 }}
      >
        {/* Select Property */}
        <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, marginBottom: spacing.md }}>
          Select Property
        </Text>
        {holdings.map((holding) => (
          <TouchableOpacity
            key={holding.id}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setSelectedHolding(holding);
              setUnits(1);
              setPricePerUnit(holding.property.unitPrice.toString());
            }}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: spacing.lg,
              borderRadius: radius.lg,
              backgroundColor: selectedHolding?.id === holding.id ? colors.successBg : colors.bgSecondary,
              borderWidth: selectedHolding?.id === holding.id ? 1.5 : isDark ? 1 : 0,
              borderColor: selectedHolding?.id === holding.id ? brand.emerald : colors.borderDefault,
              marginBottom: spacing.sm,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: colors.textPrimary }} numberOfLines={1}>
                {holding.property.name}
              </Text>
              <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary, marginTop: 2 }}>
                {holding.units} units · Bought at {formatNairaFull(holding.property.unitPrice)}/unit
              </Text>
            </View>
            {selectedHolding?.id === holding.id && (
              <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: brand.emerald, alignItems: 'center', justifyContent: 'center' }}>
                <Check size={14} color="#FFFFFF" strokeWidth={3} />
              </View>
            )}
          </TouchableOpacity>
        ))}

        {selectedHolding && (
          <>
            {/* Unit Quantity */}
            <View style={{ marginTop: spacing['2xl'] }}>
              <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, marginBottom: spacing.md }}>
                How many units to sell?
              </Text>
              <View style={{ alignItems: 'center' }}>
                <QuantityPicker value={units} onChange={setUnits} min={1} max={selectedHolding.units} />
              </View>
            </View>

            {/* Set Price */}
            <View style={{ marginTop: spacing['2xl'] }}>
              <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, marginBottom: spacing.sm }}>
                Asking price per unit
              </Text>
              <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary, marginBottom: spacing.md }}>
                Original purchase price: {formatNairaFull(originalPrice)}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: colors.bgSecondary,
                  borderRadius: radius.lg,
                  paddingHorizontal: spacing.lg,
                  borderWidth: 1,
                  borderColor: colors.borderDefault,
                  height: 52,
                }}
              >
                <Text style={{ fontFamily: fonts.monoBold, fontSize: fontSize.h3, color: colors.textTertiary }}>N</Text>
                <TextInput
                  value={pricePerUnit}
                  onChangeText={setPricePerUnit}
                  placeholder="0"
                  placeholderTextColor={colors.textTertiary}
                  keyboardType="numeric"
                  style={{
                    flex: 1,
                    fontFamily: fonts.monoBold,
                    fontSize: fontSize.h3,
                    color: colors.textPrimary,
                    marginLeft: spacing.xs,
                  }}
                />
              </View>
              {askingPrice > 0 && (
                <Text
                  style={{
                    fontFamily: fonts.medium,
                    fontSize: fontSize.caption,
                    color: gainPercent >= 0 ? brand.emerald : colors.error,
                    marginTop: spacing.sm,
                  }}
                >
                  {gainPercent >= 0 ? '+' : ''}{gainPercent.toFixed(1)}% vs original price
                </Text>
              )}
            </View>

            {/* Summary */}
            {askingPrice > 0 && (
              <>
              <View
                style={{
                  marginTop: spacing['2xl'],
                  backgroundColor: colors.bgSecondary,
                  borderRadius: radius.xl,
                  padding: spacing.lg,
                  borderWidth: isDark ? 1 : 0,
                  borderColor: colors.borderDefault,
                }}
              >
                <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, marginBottom: spacing.md }}>
                  Listing Summary
                </Text>
                <SummaryRow label={`${units} unit${units > 1 ? 's' : ''} × ${formatNairaFull(askingPrice)}`} value={formatNairaFull(totalValue)} colors={colors} />
                <SummaryRow label={tradingFeeLabel()} value={`-${formatNairaFull(tradingFee)}`} colors={colors} />
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
                  <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.body, color: colors.textPrimary }}>
                    Net Proceeds
                  </Text>
                  <Text style={{ fontFamily: fonts.monoBold, fontSize: fontSize.h3, color: brand.emerald }}>
                    {formatNairaFull(netProceeds)}
                  </Text>
                </View>
              </View>

              {/* Trust & How it Works */}
              <View
                style={{
                  marginTop: spacing.lg,
                  backgroundColor: colors.infoBg,
                  borderRadius: radius.xl,
                  padding: spacing.lg,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
                  <Shield size={16} color={colors.info} strokeWidth={2} />
                  <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: colors.textPrimary, marginLeft: spacing.sm }}>
                    When your units sell
                  </Text>
                </View>
                <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textSecondary, lineHeight: 18 }}>
                  {`Buyer pays via Paystack. PropVest deducts the ${platformConfig.p2pTradingFeePercent}% trading fee (max ₦${platformConfig.p2pTradingFeeCap.toLocaleString()}) and transfers the rest to your verified bank account. Typical transfer time: instant to 24 hours.`}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => router.push('/market/how-it-works')}
                activeOpacity={0.7}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: spacing.lg, gap: spacing.xs }}
              >
                <HelpCircle size={14} color={brand.emerald} strokeWidth={2} />
                <Text style={{ fontFamily: fonts.medium, fontSize: fontSize.caption, color: brand.emerald }}>
                  How do I receive my money?
                </Text>
              </TouchableOpacity>
              </>
            )}
          </>
        )}
      </ScrollView>

      {/* Sticky CTA */}
      {selectedHolding && askingPrice > 0 && (
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
            label="List on Marketplace"
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              Alert.alert(
                'Listed Successfully',
                `${units} unit${units > 1 ? 's' : ''} of ${selectedHolding.property.name} listed at ${formatNairaFull(askingPrice)}/unit`,
                [{ text: 'OK', onPress: () => router.back() }]
              );
            }}
            size="lg"
            fullWidth
          />
        </View>
      )}
    </View>
  );
}

function SummaryRow({ label, value, colors }: { label: string; value: string; colors: any }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm }}>
      <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.bodySmall, color: colors.textTertiary }}>{label}</Text>
      <Text style={{ fontFamily: fonts.mono, fontSize: fontSize.bodySmall, color: colors.textPrimary }}>{value}</Text>
    </View>
  );
}

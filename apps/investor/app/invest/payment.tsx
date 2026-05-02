import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Copy, Clock, CheckCircle } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand, shadows } from '../../lib/theme';
import { formatNairaFull } from '../../lib/format';
import { Button } from '../../components/ui/Button';

export default function PaymentScreen() {
  const { propertyName, units, total } = useLocalSearchParams<{
    propertyId: string;
    propertyName: string;
    units: string;
    total: string;
  }>();
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const totalAmount = parseInt(total || '0', 10);

  // Mock DVA (Dedicated Virtual Account)
  const dva = {
    bankName: 'Wema Bank',
    accountNumber: '7821034567',
    accountName: 'PropVest/Muhammad Sada Yusuf',
  };

  const copyToClipboard = async (text: string, field: string) => {
    await Clipboard.setStringAsync(text);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

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
          Make Payment
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.screenPadding, paddingBottom: insets.bottom + 100 }}
      >
        {/* Amount to Pay */}
        <View style={{ alignItems: 'center', marginVertical: spacing.xl }}>
          <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary }}>
            Transfer exactly
          </Text>
          <Text style={{ fontFamily: fonts.monoBold, fontSize: 36, color: brand.emerald, marginTop: spacing.xs }}>
            {formatNairaFull(totalAmount)}
          </Text>
          <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary, marginTop: spacing.xs }}>
            {units} unit{parseInt(units || '1') > 1 ? 's' : ''} of {propertyName}
          </Text>
        </View>

        {/* Bank Details Card */}
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
          <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, marginBottom: spacing.lg }}>
            Bank Transfer Details
          </Text>

          <BankDetailRow
            label="Bank Name"
            value={dva.bankName}
            colors={colors}
            onCopy={() => copyToClipboard(dva.bankName, 'bank')}
            copied={copiedField === 'bank'}
          />
          <BankDetailRow
            label="Account Number"
            value={dva.accountNumber}
            colors={colors}
            onCopy={() => copyToClipboard(dva.accountNumber, 'account')}
            copied={copiedField === 'account'}
            highlight
          />
          <BankDetailRow
            label="Account Name"
            value={dva.accountName}
            colors={colors}
            onCopy={() => copyToClipboard(dva.accountName, 'name')}
            copied={copiedField === 'name'}
          />
          <BankDetailRow
            label="Amount"
            value={formatNairaFull(totalAmount)}
            colors={colors}
            onCopy={() => copyToClipboard(totalAmount.toString(), 'amount')}
            copied={copiedField === 'amount'}
            highlight
          />
        </View>

        {/* Timer Notice */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: spacing.xl,
            padding: spacing.lg,
            backgroundColor: colors.warningBg,
            borderRadius: radius.lg,
            borderWidth: 1,
            borderColor: isDark ? 'rgba(245, 166, 35, 0.2)' : 'rgba(245, 166, 35, 0.15)',
          }}
        >
          <Clock size={18} color={colors.warning} strokeWidth={2} />
          <View style={{ marginLeft: spacing.md, flex: 1 }}>
            <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: colors.textPrimary }}>
              Transfer within 30 minutes
            </Text>
            <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary, marginTop: 2 }}>
              This account is temporary. Transfer the exact amount to avoid delays.
            </Text>
          </View>
        </View>

        {/* Instructions */}
        <View style={{ marginTop: spacing.xl }}>
          <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, marginBottom: spacing.md }}>
            How it works
          </Text>
          {[
            'Open your banking app or USSD',
            'Transfer the exact amount above',
            'Payment is confirmed automatically',
            'Units are allocated to your portfolio',
          ].map((step, idx) => (
            <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: brand.emerald,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: spacing.md,
                }}
              >
                <Text style={{ fontFamily: fonts.bold, fontSize: 11, color: '#FFFFFF' }}>{idx + 1}</Text>
              </View>
              <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.bodySmall, color: colors.textSecondary, flex: 1 }}>
                {step}
              </Text>
            </View>
          ))}
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
          label="I've Made the Transfer"
          onPress={() =>
            router.push({
              pathname: '/invest/success',
              params: {
                propertyName: propertyName || '',
                units: units || '1',
              },
            })
          }
          size="lg"
          fullWidth
        />
      </View>
    </View>
  );
}

function BankDetailRow({
  label,
  value,
  colors,
  onCopy,
  copied,
  highlight,
}: {
  label: string;
  value: string;
  colors: any;
  onCopy: () => void;
  copied: boolean;
  highlight?: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderSubtle,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.overline, color: colors.textTertiary }}>
          {label}
        </Text>
        <Text
          style={{
            fontFamily: highlight ? fonts.monoBold : fonts.medium,
            fontSize: highlight ? fontSize.h3 : fontSize.body,
            color: highlight ? brand.emerald : colors.textPrimary,
            marginTop: 2,
          }}
        >
          {value}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onCopy}
        style={{
          width: 36,
          height: 36,
          borderRadius: radius.md,
          backgroundColor: copied ? colors.successBg : colors.bgTertiary,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: spacing.sm,
        }}
      >
        {copied ? (
          <CheckCircle size={16} color={brand.emerald} strokeWidth={2} />
        ) : (
          <Copy size={16} color={colors.textTertiary} strokeWidth={2} />
        )}
      </TouchableOpacity>
    </View>
  );
}

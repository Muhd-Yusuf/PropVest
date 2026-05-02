import React from 'react';
import { View, Text } from 'react-native';
import {
  CreditCard,
  ShieldCheck,
  Percent,
  Landmark,
  ArrowLeftRight,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react-native';
import { useTheme } from '../lib/ThemeContext';
import { fonts, fontSize, spacing, radius } from '../lib/theme';
import { formatNairaFull } from '../lib/format';
import { calcTradingFee } from '../lib/platform-config';
import type { TradeStatus } from '../lib/types';

interface MoneyRoutingFlowProps {
  units: number;
  pricePerUnit: number;
  sellerName?: string;
  sellerBank?: string;
  perspective: 'buyer' | 'seller' | 'educational';
  status?: TradeStatus;
  compact?: boolean;
}

const STEPS_CONFIG = [
  { key: 'pay', icon: CreditCard, label: 'Buyer Pays via Paystack' },
  { key: 'hold', icon: ShieldCheck, label: 'PropVest Receives Payment' },
  { key: 'fee', icon: Percent, label: 'Trading Fee Deducted' },
  { key: 'transfer', icon: Landmark, label: 'Seller Receives Net Amount' },
  { key: 'units', icon: ArrowLeftRight, label: 'Units Transferred' },
] as const;

const STATUS_ORDER: TradeStatus[] = [
  'pending_payment',
  'payment_received',
  'processing',
  'seller_paid',
  'completed',
];

function isStepComplete(stepIndex: number, status?: TradeStatus): boolean {
  if (!status) return false;
  const statusIndex = STATUS_ORDER.indexOf(status);
  return stepIndex <= statusIndex;
}

export function MoneyRoutingFlow({
  units,
  pricePerUnit,
  sellerName,
  sellerBank,
  perspective,
  status,
  compact = false,
}: MoneyRoutingFlowProps) {
  const { colors, isDark } = useTheme();

  const subtotal = units * pricePerUnit;
  const tradingFee = calcTradingFee(subtotal);
  const buyerPays = subtotal + tradingFee;
  const sellerReceives = subtotal - tradingFee;

  const stepColors = [
    { bg: colors.infoBg, fg: colors.info },       // pay - purple/info
    { bg: colors.warningBg, fg: colors.warning },  // hold - amber
    { bg: colors.errorBg, fg: colors.error },      // fee - red
    { bg: colors.successBg, fg: colors.success },   // transfer - green
    { bg: colors.infoBg, fg: colors.info },         // units - purple
  ];

  const stepDetails = [
    {
      amount: formatNairaFull(buyerPays),
      description: perspective === 'buyer'
        ? 'You pay via card or bank transfer through Paystack'
        : 'Buyer pays via card or bank transfer',
    },
    {
      amount: formatNairaFull(buyerPays),
      description: 'Funds held securely by PropVest',
    },
    {
      amount: `-${formatNairaFull(tradingFee)}`,
      description: '1% trading fee deducted (max ₦5,000)',
      isDeduction: true,
    },
    {
      amount: formatNairaFull(sellerReceives),
      description: sellerBank
        ? `Transferred to ${sellerBank}`
        : perspective === 'seller'
          ? 'Transferred to your verified bank account'
          : `Transferred to ${sellerName || 'seller'}'s bank account`,
    },
    {
      amount: `${units} unit${units > 1 ? 's' : ''}`,
      description: perspective === 'buyer'
        ? 'Ownership transferred to your portfolio'
        : 'Ownership transferred to buyer',
    },
  ];

  const iconSize = compact ? 18 : 22;
  const circleSize = compact ? 36 : 44;

  return (
    <View style={{ paddingVertical: compact ? spacing.sm : spacing.md }}>
      {STEPS_CONFIG.map((step, index) => {
        const Icon = step.icon;
        const detail = stepDetails[index];
        const color = stepColors[index];
        const completed = isStepComplete(index, status);
        const isLast = index === STEPS_CONFIG.length - 1;

        return (
          <View key={step.key}>
            {/* Step Row */}
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              {/* Icon Circle */}
              <View
                style={{
                  width: circleSize,
                  height: circleSize,
                  borderRadius: circleSize / 2,
                  backgroundColor: completed ? colors.successBg : color.bg,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {completed ? (
                  <CheckCircle2 size={iconSize} color={colors.success} strokeWidth={2} />
                ) : (
                  <Icon size={iconSize} color={color.fg} strokeWidth={2} />
                )}
              </View>

              {/* Text Content */}
              <View style={{ flex: 1, marginLeft: spacing.md, paddingTop: compact ? 2 : 4 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Text
                    style={{
                      fontFamily: fonts.semibold,
                      fontSize: compact ? fontSize.bodySmall : fontSize.body,
                      color: colors.textPrimary,
                      flex: 1,
                    }}
                    numberOfLines={1}
                  >
                    {step.label}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.monoBold,
                      fontSize: compact ? fontSize.caption : fontSize.bodySmall,
                      color: detail.isDeduction ? colors.error : colors.textPrimary,
                      marginLeft: spacing.sm,
                    }}
                  >
                    {detail.amount}
                  </Text>
                </View>
                {!compact && (
                  <Text
                    style={{
                      fontFamily: fonts.regular,
                      fontSize: fontSize.caption,
                      color: colors.textTertiary,
                      marginTop: 2,
                      lineHeight: 16,
                    }}
                  >
                    {detail.description}
                  </Text>
                )}
              </View>
            </View>

            {/* Connector */}
            {!isLast && (
              <View
                style={{
                  width: circleSize,
                  alignItems: 'center',
                  paddingVertical: compact ? spacing.xs : spacing.sm,
                }}
              >
                <ChevronDown size={14} color={colors.textTertiary} strokeWidth={1.5} />
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

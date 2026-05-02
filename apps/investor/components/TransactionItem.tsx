import React from 'react';
import { View, Text } from 'react-native';
import { ArrowDownLeft, ArrowUpRight, ArrowLeftRight, Banknote } from 'lucide-react-native';
import { useTheme } from '../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand } from '../lib/theme';
import { formatNaira } from '../lib/format';
import { Transaction } from '../lib/types';

const config = {
  investment: { icon: ArrowUpRight, color: '#6C63FF', label: 'Investment' },
  payout: { icon: ArrowDownLeft, color: '#00E6B5', label: 'Payout' },
  market_buy: { icon: ArrowLeftRight, color: '#F5A623', label: 'Market Buy' },
  market_sell: { icon: ArrowLeftRight, color: '#00E6B5', label: 'Market Sale' },
  withdrawal: { icon: Banknote, color: '#7A8BA0', label: 'Withdrawal' },
};

export function TransactionItem({ transaction }: { transaction: Transaction }) {
  const { colors, isDark } = useTheme();
  const { icon: Icon, color, label } = config[transaction.type];
  const isIncoming = ['payout', 'market_sell'].includes(transaction.type);

  return (
    <View
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
          width: 40,
          height: 40,
          borderRadius: radius.full,
          backgroundColor: isDark ? `${color}20` : `${color}15`,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: spacing.md,
        }}
      >
        <Icon size={20} color={color} strokeWidth={1.5} />
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
          {transaction.description}
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: fontSize.caption,
            color: colors.textTertiary,
            marginTop: 2,
          }}
        >
          {transaction.date}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: fonts.mono,
          fontSize: fontSize.bodySmall,
          color: isIncoming ? brand.emerald : colors.textPrimary,
        }}
      >
        {isIncoming ? '+' : '-'}{formatNaira(transaction.amount)}
      </Text>
    </View>
  );
}

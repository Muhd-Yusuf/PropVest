import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckCircle, CheckCircle2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand } from '../../lib/theme';
import { Button } from '../../components/ui/Button';
import { MoneyRoutingFlow } from '../../components/MoneyRoutingFlow';

export default function TradeCompleteScreen() {
  const { propertyName, units, total, sellerName } = useLocalSearchParams<{
    propertyName: string;
    units: string;
    total: string;
    sellerName: string;
  }>();
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const parsedUnits = parseInt(units || '1');
  const parsedTotal = parseInt(total || '0');
  const pricePerUnit = parsedUnits > 0 ? Math.round(parsedTotal / parsedUnits) : 0;

  const nextSteps = [
    'Units are now in your portfolio',
    'Seller will receive their funds within 24 hours',
    "You'll start earning returns from your next payout cycle",
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgPrimary,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: spacing.screenPadding,
      }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* Success Icon */}
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            marginBottom: spacing['3xl'],
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: colors.successBg,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircle size={56} color={brand.emerald} strokeWidth={1.5} />
          </View>
        </Animated.View>

        {/* Text Content */}
        <Animated.View
          style={{
            opacity: opacityAnim,
            transform: [{ translateY: slideAnim }],
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: fontSize.h1,
              color: colors.textPrimary,
              textAlign: 'center',
            }}
          >
            Trade Complete!
          </Text>
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: fontSize.body,
              color: colors.textSecondary,
              textAlign: 'center',
              marginTop: spacing.md,
              lineHeight: 22,
              maxWidth: 300,
            }}
          >
            You purchased{' '}
            <Text style={{ fontFamily: fonts.bold, color: brand.emerald }}>
              {units} unit{parsedUnits > 1 ? 's' : ''}
            </Text>{' '}
            of {propertyName} from {sellerName}
          </Text>

          {/* Money Routing Flow Card */}
          <View
            style={{
              marginTop: spacing['2xl'],
              backgroundColor: colors.bgSecondary,
              borderRadius: radius.lg,
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.md,
              width: '100%',
            }}
          >
            <MoneyRoutingFlow
              perspective="buyer"
              units={parsedUnits}
              pricePerUnit={pricePerUnit}
              sellerName={sellerName}
              status="completed"
              compact={true}
            />
          </View>

          {/* What happens next */}
          <View
            style={{
              marginTop: spacing.xl,
              backgroundColor: colors.infoBg,
              borderRadius: radius.lg,
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.lg,
              width: '100%',
            }}
          >
            <Text
              style={{
                fontFamily: fonts.semibold,
                fontSize: fontSize.bodySmall,
                color: colors.textPrimary,
                marginBottom: spacing.md,
              }}
            >
              What happens next
            </Text>
            {nextSteps.map((step, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginBottom: index < nextSteps.length - 1 ? spacing.sm : 0,
                }}
              >
                <CheckCircle2
                  size={16}
                  color={colors.info}
                  strokeWidth={2}
                  style={{ marginTop: 2 }}
                />
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
                  {step}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </View>

      {/* Bottom Buttons */}
      <View style={{ gap: spacing.md, marginBottom: spacing.lg }}>
        <Button
          label="View Portfolio"
          onPress={() => router.replace('/(tabs)/portfolio')}
          size="lg"
          fullWidth
        />
        <Button
          label="Back to Marketplace"
          onPress={() => router.replace('/market')}
          variant="secondary"
          size="lg"
          fullWidth
        />
      </View>
    </View>
  );
}

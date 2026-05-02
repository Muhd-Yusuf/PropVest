import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckCircle, PartyPopper } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand } from '../../lib/theme';
import { Button } from '../../components/ui/Button';

export default function SuccessScreen() {
  const { propertyName, units } = useLocalSearchParams<{ propertyName: string; units: string }>();
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
            Investment Placed!
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
            You now own{' '}
            <Text style={{ fontFamily: fonts.bold, color: brand.emerald }}>
              {units} unit{parseInt(units || '1') > 1 ? 's' : ''}
            </Text>{' '}
            of {propertyName}
          </Text>

          <View
            style={{
              marginTop: spacing['2xl'],
              backgroundColor: colors.bgSecondary,
              borderRadius: radius.lg,
              paddingHorizontal: spacing.xl,
              paddingVertical: spacing.lg,
              alignItems: 'center',
            }}
          >
            <PartyPopper size={24} color={brand.emerald} strokeWidth={1.5} />
            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: fontSize.caption,
                color: colors.textTertiary,
                textAlign: 'center',
                marginTop: spacing.sm,
                lineHeight: 18,
              }}
            >
              Your payment is being verified. Units will be allocated to your portfolio once confirmed.
            </Text>
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
          label="Invest More"
          onPress={() => router.replace('/(tabs)/explore')}
          variant="secondary"
          size="lg"
          fullWidth
        />
      </View>
    </View>
  );
}

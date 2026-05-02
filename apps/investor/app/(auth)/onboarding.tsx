import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ViewToken,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Building2, Wallet, TrendingUp, ChevronRight } from 'lucide-react-native';
import { useAuth } from '../../lib/AuthContext';
import { Button } from '../../components/ui/Button';
import { fonts, fontSize, spacing, radius, brand } from '../../lib/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const pages = [
  {
    icon: Building2,
    headline: 'Own Real Estate,\nOne Unit at a Time',
    subtitle:
      'Invest in premium Nigerian properties starting from as little as one unit. No millions needed.',
    gradient: [brand.midnight, '#143B5E'] as [string, string],
  },
  {
    icon: Wallet,
    headline: 'Earn Returns\non Real Estate',
    subtitle:
      'Rental income, sale profits, or land appreciation — choose properties that match how you want to earn.',
    gradient: ['#061A2E', '#0E3555'] as [string, string],
  },
  {
    icon: TrendingUp,
    headline: 'Invest at\nYour Own Pace',
    subtitle:
      'Unit prices are set by developers — find properties that match your budget and goals.',
    gradient: ['#071D32', '#153A5A'] as [string, string],
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useAuth();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
    []
  );

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleSkip = async () => {
    await completeOnboarding();
    router.replace('/(auth)/sign-up');
  };

  const handleNext = () => {
    if (currentIndex < pages.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    }
  };

  const handleGetStarted = async () => {
    await completeOnboarding();
    router.replace('/(auth)/sign-up');
  };

  const isLastPage = currentIndex === pages.length - 1;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={pages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <LinearGradient
            colors={item.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: spacing['3xl'],
            }}
          >
            {/* Icon */}
            <View
              style={{
                width: 170,
                height: 170,
                borderRadius: 85,
                borderWidth: 1.5,
                borderColor: 'rgba(0, 230, 181, 0.15)',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: spacing['4xl'],
              }}
            >
              <View
                style={{
                  width: 130,
                  height: 130,
                  borderRadius: 65,
                  backgroundColor: 'rgba(0, 230, 181, 0.15)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <item.icon size={56} color={brand.emerald} strokeWidth={1.8} />
              </View>
            </View>

            {/* Text */}
            <Text
              style={{
                fontFamily: fonts.bold,
                fontSize: 30,
                color: '#FFFFFF',
                textAlign: 'center',
                lineHeight: 40,
              }}
            >
              {item.headline}
            </Text>
            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: fontSize.body,
                color: 'rgba(255,255,255,0.75)',
                textAlign: 'center',
                marginTop: spacing.xl,
                lineHeight: 24,
                paddingHorizontal: spacing.lg,
              }}
            >
              {item.subtitle}
            </Text>
          </LinearGradient>
        )}
      />

      {/* Skip button */}
      {!isLastPage && (
        <TouchableOpacity
          onPress={handleSkip}
          style={{
            position: 'absolute',
            top: insets.top + spacing.md,
            right: spacing.screenPadding,
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.lg,
          }}
        >
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: fontSize.bodySmall,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
      )}

      {/* Bottom controls */}
      <View
        style={{
          position: 'absolute',
          bottom: insets.bottom + spacing['3xl'],
          left: 0,
          right: 0,
          alignItems: 'center',
          paddingHorizontal: spacing.screenPadding,
        }}
      >
        {/* Dot indicators */}
        <View
          style={{
            flexDirection: 'row',
            gap: spacing.sm,
            marginBottom: spacing['2xl'],
          }}
        >
          {pages.map((_, i) => (
            <View
              key={i}
              style={{
                width: currentIndex === i ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  currentIndex === i
                    ? brand.emerald
                    : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </View>

        {/* Action */}
        {isLastPage ? (
          <Button
            label="Get Started"
            onPress={handleGetStarted}
            variant="primary"
            size="lg"
            fullWidth
          />
        ) : (
          <View style={{ alignItems: 'center', gap: spacing.lg }}>
            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: fontSize.caption,
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: 1,
              }}
            >
              SWIPE TO CONTINUE
            </Text>
            <TouchableOpacity
              onPress={handleNext}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: brand.emerald,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ChevronRight size={26} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

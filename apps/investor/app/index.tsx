import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../lib/AuthContext';
import { fonts, brand } from '../lib/theme';

export default function SplashScreen() {
  const router = useRouter();
  const { isLoading, hasOnboarded, user } = useAuth();

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const lineWidth = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading) return;

    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.sequence([
        Animated.delay(400),
        Animated.timing(lineWidth, {
          toValue: 60,
          duration: 400,
          useNativeDriver: false,
        }),
      ]),
      Animated.sequence([
        Animated.delay(600),
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }),
      ]),
    ]).start();

    const timer = setTimeout(() => {
      if (!hasOnboarded) {
        router.replace('/(auth)/onboarding');
      } else if (!user || !user.isVerified) {
        router.replace('/(auth)/sign-in');
      } else {
        router.replace('/(tabs)');
      }
    }, 1400);

    return () => clearTimeout(timer);
  }, [isLoading, hasOnboarded, user]);

  return (
    <LinearGradient
      colors={[brand.midnight, '#143B5E']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Animated.View
        style={{
          alignItems: 'center',
          opacity: logoOpacity,
          transform: [{ scale: logoScale }],
        }}
      >
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: 42,
            letterSpacing: -1,
          }}
        >
          <Text style={{ color: '#FFFFFF' }}>Prop</Text>
          <Text style={{ color: brand.emerald }}>Vest</Text>
        </Text>
      </Animated.View>

      <Animated.View
        style={{
          height: 3,
          width: lineWidth,
          borderRadius: 2,
          backgroundColor: brand.emerald,
          marginTop: 12,
          opacity: logoOpacity,
        }}
      />

      <Animated.View style={{ marginTop: 16, opacity: subtitleOpacity }}>
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: 14,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: 2,
          }}
        >
          INVEST IN REAL ESTATE
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}

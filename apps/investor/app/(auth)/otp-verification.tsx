import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { useAuth } from '../../lib/AuthContext';
import { Button } from '../../components/ui/Button';
import { fonts, fontSize, spacing, radius, brand } from '../../lib/theme';

const OTP_LENGTH = 6;

export default function OtpVerificationScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, verifyOtp } = useAuth();

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -5, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 5, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleChange = (value: string, index: number) => {
    if (error) setError('');
    const newOtp = [...otp];

    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').split('').slice(0, OTP_LENGTH);
      digits.forEach((d, i) => {
        if (i + index < OTP_LENGTH) newOtp[i + index] = d;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + digits.length, OTP_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    setIsVerifying(true);
    setError('');
    try {
      const success = await verifyOtp(code);
      if (success) {
        router.replace('/(tabs)');
      } else {
        setError('Invalid code. Try 123456');
        triggerShake();
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = () => {
    setResendTimer(60);
    setOtp(Array(OTP_LENGTH).fill(''));
    inputRefs.current[0]?.focus();
  };

  const isFilled = otp.every((d) => d !== '');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgPrimary,
        paddingHorizontal: spacing.screenPadding,
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginTop: insets.top + spacing.md,
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

      <View style={{ marginTop: spacing['3xl'] }}>
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: fontSize.h1,
            color: colors.textPrimary,
          }}
        >
          Verify Your Account
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: fontSize.body,
            color: colors.textSecondary,
            marginTop: spacing.sm,
            lineHeight: 22,
          }}
        >
          We sent a 6-digit code to{' '}
          <Text style={{ fontFamily: fonts.semibold, color: colors.textPrimary }}>
            {user?.email || 'your email'}
          </Text>
        </Text>
      </View>

      <Animated.View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: spacing.sm,
          marginTop: spacing['4xl'],
          transform: [{ translateX: shakeAnim }],
        }}
      >
        {otp.map((digit, i) => (
          <TextInput
            key={i}
            ref={(ref) => { inputRefs.current[i] = ref; }}
            value={digit}
            onChangeText={(v) => handleChange(v, i)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
            keyboardType="number-pad"
            maxLength={1}
            autoFocus={i === 0}
            style={{
              width: 48,
              height: 56,
              borderRadius: radius.lg,
              backgroundColor: colors.bgSecondary,
              borderWidth: 1.5,
              borderColor: error
                ? colors.error
                : digit
                ? brand.emerald
                : colors.borderDefault,
              textAlign: 'center',
              fontFamily: fonts.monoBold,
              fontSize: 22,
              color: colors.textPrimary,
            }}
          />
        ))}
      </Animated.View>

      {error ? (
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: fontSize.bodySmall,
            color: colors.error,
            textAlign: 'center',
            marginTop: spacing.lg,
          }}
        >
          {error}
        </Text>
      ) : null}

      <View style={{ alignItems: 'center', marginTop: spacing['2xl'] }}>
        {resendTimer > 0 ? (
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: fontSize.bodySmall,
              color: colors.textTertiary,
            }}
          >
            Resend code in{' '}
            <Text style={{ fontFamily: fonts.mono, color: colors.textPrimary }}>
              0:{resendTimer.toString().padStart(2, '0')}
            </Text>
          </Text>
        ) : (
          <TouchableOpacity onPress={handleResend}>
            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: fontSize.bodySmall,
                color: colors.textTertiary,
              }}
            >
              Didn't receive a code?{' '}
              <Text style={{ fontFamily: fonts.semibold, color: brand.emerald }}>
                Resend
              </Text>
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ marginTop: spacing['3xl'] }}>
        <Button
          label="Verify"
          onPress={handleVerify}
          variant="primary"
          size="lg"
          fullWidth
          loading={isVerifying}
          disabled={!isFilled}
        />
      </View>
    </View>
  );
}

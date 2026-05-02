import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { JetBrainsMono_500Medium, JetBrainsMono_700Bold } from '@expo-google-fonts/jetbrains-mono';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider, useTheme } from '../lib/ThemeContext';
import { AuthProvider, useAuth } from '../lib/AuthContext';

SplashScreen.preventAutoHideAsync();

function RootLayoutInner() {
  const { colors, isDark } = useTheme();
  const { isLoading: authLoading } = useAuth();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    JetBrainsMono_500Medium,
    JetBrainsMono_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded && !authLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, authLoading]);

  if (!fontsLoaded || authLoading) return null;

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bgPrimary },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" options={{ animation: 'fade' }} />
        <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen name="property/[id]" />
        <Stack.Screen name="invest/[id]" />
        <Stack.Screen name="invest/review" />
        <Stack.Screen name="invest/payment" />
        <Stack.Screen name="invest/success" options={{ gestureEnabled: false }} />
        <Stack.Screen name="market/index" />
        <Stack.Screen name="market/sell" />
        <Stack.Screen name="market/buy/[id]" />
        <Stack.Screen name="market/my-listings" />
        <Stack.Screen name="market/how-it-works" />
        <Stack.Screen name="market/trade-complete" options={{ gestureEnabled: false }} />
        <Stack.Screen name="market/trade/[id]" />
        <Stack.Screen name="developers/index" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="kyc/index" />
        <Stack.Screen name="kyc/verify" />
        <Stack.Screen name="settings/account" />
        <Stack.Screen name="settings/bank-accounts" />
        <Stack.Screen name="settings/security" />
        <Stack.Screen name="settings/help" />
        <Stack.Screen name="settings/legal" />
        <Stack.Screen name="holding/[id]" />
        <Stack.Screen name="developer/[id]" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootLayoutInner />
      </AuthProvider>
    </ThemeProvider>
  );
}

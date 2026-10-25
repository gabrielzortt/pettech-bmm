import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { LojaProviderBMM } from '../context/LojaBMM';

SplashScreen.preventAutoHideAsync();

export default function RootLayoutBMM() {
  const [fontesCarregadasBMM] = useFonts({ Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold });

  useEffect(() => {
    if (fontesCarregadasBMM) SplashScreen.hideAsync();
  }, [fontesCarregadasBMM]);

  if (!fontesCarregadasBMM) return null;

  return (
    <LojaProviderBMM>
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade', gestureEnabled: false }} />
        <Stack.Screen name="produto/[id]" />
      </Stack>
    </LojaProviderBMM>
  );
}

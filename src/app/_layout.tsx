import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { ProvedoresBMM } from '@/store';

SplashScreen.preventAutoHideAsync();

export default function RaizBMM() {
  const [fontesProntasBMM] = useFonts({ Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold });

  useEffect(() => {
    if (fontesProntasBMM) SplashScreen.hideAsync();
  }, [fontesProntasBMM]);

  if (!fontesProntasBMM) return null;

  return (
    <ProvedoresBMM>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" options={{ animation: 'fade' }} />
      </Stack>
    </ProvedoresBMM>
  );
}

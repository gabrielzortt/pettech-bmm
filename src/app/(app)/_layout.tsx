import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuthBMM } from '@/store';

export default function LayoutAppBMM() {
  const { usuarioBMM } = useAuthBMM();

  if (!usuarioBMM) return <Redirect href="/entrar" />;

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
      <Stack.Screen name="produto/[id]" options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="checkout" />
      <Stack.Screen name="pedidos" />
    </Stack>
  );
}

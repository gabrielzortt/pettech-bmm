import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuthBMM } from '@/store';

export default function LayoutAuthBMM() {
  const { prontoBMM, usuarioBMM } = useAuthBMM();

  if (!prontoBMM) return null;
  if (usuarioBMM) return <Redirect href="/inicio" />;

  return <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />;
}

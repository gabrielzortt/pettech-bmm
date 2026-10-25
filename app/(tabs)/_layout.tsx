import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { corBMM, fonteBMM } from '../../constants/temaBMM';
import { useLojaBMM } from '../../context/LojaBMM';

export default function TabsLayoutBMM() {
  const { usuarioBMM, quantidadeTotalBMM } = useLojaBMM();

  if (!usuarioBMM) return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: corBMM.laranjaBMM,
        tabBarInactiveTintColor: corBMM.inativoBMM,
        tabBarStyle: {
          backgroundColor: corBMM.brancoBMM,
          borderTopWidth: 0,
          height: 68,
          paddingTop: 10,
          shadowColor: '#0A1F24',
          shadowOpacity: 0.1,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: -6 },
          elevation: 16,
        },
      }}
    >
      <Tabs.Screen name="inicio" options={{ tabBarIcon: ({ color: corAbaBMM }) => <Ionicons name="home" size={26} color={corAbaBMM} /> }} />
      <Tabs.Screen name="favoritos" options={{ tabBarIcon: ({ color: corAbaBMM }) => <Ionicons name="heart" size={26} color={corAbaBMM} /> }} />
      <Tabs.Screen
        name="carrinho"
        options={{
          tabBarBadge: quantidadeTotalBMM > 0 ? quantidadeTotalBMM : undefined,
          tabBarBadgeStyle: { backgroundColor: corBMM.laranjaBMM, color: corBMM.brancoBMM, fontFamily: fonteBMM.semiBMM, fontSize: 10 },
          tabBarIcon: ({ color: corAbaBMM }) => <Ionicons name="bag" size={26} color={corAbaBMM} />,
        }}
      />
      <Tabs.Screen name="perfil" options={{ tabBarIcon: ({ color: corAbaBMM }) => <Ionicons name="person" size={26} color={corAbaBMM} /> }} />
    </Tabs>
  );
}

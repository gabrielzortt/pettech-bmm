import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCarrinhoBMM } from '@/store';
import { coresBMM, fontesBMM, IconeBMM } from '@/theme';

const abasBMM: { nomeBMM: string; tituloBMM: string; iconeBMM: IconeBMM; iconeAtivoBMM: IconeBMM }[] = [
  { nomeBMM: 'inicio', tituloBMM: 'Início', iconeBMM: 'home-outline', iconeAtivoBMM: 'home' },
  { nomeBMM: 'favoritos', tituloBMM: 'Favoritos', iconeBMM: 'heart-outline', iconeAtivoBMM: 'heart' },
  { nomeBMM: 'carrinho', tituloBMM: 'Carrinho', iconeBMM: 'bag-outline', iconeAtivoBMM: 'bag' },
  { nomeBMM: 'perfil', tituloBMM: 'Perfil', iconeBMM: 'person-outline', iconeAtivoBMM: 'person' },
];

export default function LayoutAbasBMM() {
  const { totalItensBMM } = useCarrinhoBMM();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: coresBMM.primariaBMM,
        tabBarInactiveTintColor: coresBMM.inativoBMM,
        tabBarLabelStyle: { fontFamily: fontesBMM.mediaBMM, fontSize: 11, marginBottom: 4 },
        tabBarStyle: {
          backgroundColor: coresBMM.superficieBMM,
          borderTopWidth: 0,
          height: 70,
          paddingTop: 8,
          shadowColor: '#0A1F24',
          shadowOpacity: 0.1,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: -6 },
          elevation: 16,
        },
        tabBarBadgeStyle: { backgroundColor: coresBMM.primariaBMM, color: coresBMM.brancoBMM, fontFamily: fontesBMM.negritoBMM, fontSize: 10 },
      }}
    >
      {abasBMM.map((abaBMM) => (
        <Tabs.Screen
          key={abaBMM.nomeBMM}
          name={abaBMM.nomeBMM}
          options={{
            title: abaBMM.tituloBMM,
            tabBarBadge: abaBMM.nomeBMM === 'carrinho' && totalItensBMM > 0 ? totalItensBMM : undefined,
            tabBarIcon: ({ focused: ativaBMM, color: corBMM, size: tamanhoBMM }) => (
              <Ionicons name={ativaBMM ? abaBMM.iconeAtivoBMM : abaBMM.iconeBMM} size={tamanhoBMM} color={corBMM} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { coresBMM, fontesBMM, raioBMM } from '@/theme';

interface CabecalhoTelaPropsBMM {
  tituloBMM: string;
  subtituloBMM?: string;
  comVoltarBMM?: boolean;
  direitaBMM?: ReactNode;
}

export default function CabecalhoTela({ tituloBMM, subtituloBMM, comVoltarBMM = false, direitaBMM }: CabecalhoTelaPropsBMM) {
  const roteadorBMM = useRouter();
  const insetsBMM = useSafeAreaInsets();
  const voltarBMM = () => (roteadorBMM.canGoBack() ? roteadorBMM.back() : roteadorBMM.replace('/inicio'));

  return (
    <View style={[estilosBMM.caixaBMM, { paddingTop: insetsBMM.top + 14 }]}>
      {comVoltarBMM ? (
        <Pressable style={estilosBMM.voltarBMM} onPress={voltarBMM} accessibilityLabel="Voltar" hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={coresBMM.tintaBMM} />
        </Pressable>
      ) : null}
      <View style={{ flex: 1 }}>
        <Text style={estilosBMM.tituloBMM}>{tituloBMM}</Text>
        {subtituloBMM ? <Text style={estilosBMM.subtituloBMM}>{subtituloBMM}</Text> : null}
      </View>
      {direitaBMM}
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  caixaBMM: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingBottom: 14, backgroundColor: coresBMM.fundoBMM },
  voltarBMM: { width: 42, height: 42, borderRadius: raioBMM.mdBMM, backgroundColor: coresBMM.superficieBMM, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: coresBMM.linhaBMM },
  tituloBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 24, color: coresBMM.tintaBMM },
  subtituloBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 13, color: coresBMM.tintaSuaveBMM, marginTop: 1 },
});

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { portesBMM } from '@/data/catalogo';
import { PorteBMM } from '@/types';
import { coresBMM, fontesBMM, raioBMM } from '@/theme';

interface SeletorPortePropsBMM {
  valorBMM: PorteBMM;
  aoMudarBMM: (porteBMM: PorteBMM) => void;
}

export default function SeletorPorte({ valorBMM, aoMudarBMM }: SeletorPortePropsBMM) {
  const dicaBMM = portesBMM.find((pBMM) => pBMM.chaveBMM === valorBMM)?.dicaBMM ?? '';
  return (
    <View>
      <View style={estilosBMM.linhaBMM}>
        {portesBMM.map((porteBMM) => {
          const ativoBMM = porteBMM.chaveBMM === valorBMM;
          return (
            <Pressable key={porteBMM.chaveBMM} onPress={() => aoMudarBMM(porteBMM.chaveBMM)} style={[estilosBMM.opcaoBMM, ativoBMM && estilosBMM.opcaoAtivaBMM]} accessibilityState={{ selected: ativoBMM }}>
              <Text style={[estilosBMM.textoBMM, ativoBMM && estilosBMM.textoAtivoBMM]}>{porteBMM.rotuloBMM}</Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={estilosBMM.dicaBMM}>{dicaBMM}</Text>
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  linhaBMM: { flexDirection: 'row', gap: 14 },
  opcaoBMM: { flex: 1, height: 48, borderRadius: raioBMM.mdBMM, borderWidth: 1.5, borderColor: coresBMM.linhaBMM, backgroundColor: coresBMM.superficieBMM, alignItems: 'center', justifyContent: 'center' },
  opcaoAtivaBMM: { borderColor: coresBMM.primariaBMM, backgroundColor: coresBMM.primariaFundoBMM },
  textoBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 15, color: coresBMM.tintaBMM },
  textoAtivoBMM: { fontFamily: fontesBMM.negritoBMM, color: coresBMM.primariaEscuraBMM },
  dicaBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 12, color: coresBMM.tintaSuaveBMM, marginTop: 8, textAlign: 'center' },
});

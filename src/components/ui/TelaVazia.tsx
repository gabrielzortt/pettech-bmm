import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BotaoAcao from './BotaoAcao';
import { coresBMM, fontesBMM, IconeBMM } from '@/theme';

interface TelaVaziaPropsBMM {
  iconeBMM: IconeBMM;
  tituloBMM: string;
  textoBMM: string;
  rotuloBotaoBMM?: string;
  aoPressionarBMM?: () => void;
}

export default function TelaVazia({ iconeBMM, tituloBMM, textoBMM, rotuloBotaoBMM, aoPressionarBMM }: TelaVaziaPropsBMM) {
  return (
    <View style={estilosBMM.caixaBMM}>
      <View style={estilosBMM.selosBMM}>
        <Ionicons name={iconeBMM} size={36} color={coresBMM.primariaEscuraBMM} />
      </View>
      <Text style={estilosBMM.tituloBMM}>{tituloBMM}</Text>
      <Text style={estilosBMM.textoBMM}>{textoBMM}</Text>
      {rotuloBotaoBMM && aoPressionarBMM ? <BotaoAcao tituloBMM={rotuloBotaoBMM} aoPressionarBMM={aoPressionarBMM} alturaBMM={46} estiloBMM={{ marginTop: 20 }} /> : null}
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  caixaBMM: { alignItems: 'center', paddingVertical: 48, paddingHorizontal: 32 },
  selosBMM: { width: 84, height: 84, borderRadius: 28, backgroundColor: coresBMM.primariaFundoBMM, alignItems: 'center', justifyContent: 'center' },
  tituloBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 19, color: coresBMM.tintaBMM, marginTop: 18, textAlign: 'center' },
  textoBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 14, lineHeight: 21, color: coresBMM.tintaSuaveBMM, textAlign: 'center', marginTop: 6 },
});

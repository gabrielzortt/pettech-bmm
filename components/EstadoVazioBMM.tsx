import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BotaoBMM from './BotaoBMM';
import { corBMM, fonteBMM, IconeBMM } from '../constants/temaBMM';

interface EstadoVazioPropsBMM {
  iconeBMM: IconeBMM;
  tituloBMM: string;
  textoBMM: string;
  botaoBMM?: string;
  aoPressionarBMM?: () => void;
}

export default function EstadoVazioBMM({ iconeBMM, tituloBMM, textoBMM, botaoBMM, aoPressionarBMM }: EstadoVazioPropsBMM) {
  return (
    <View style={estilosBMM.caixaBMM}>
      <View style={estilosBMM.circuloBMM}>
        <Ionicons name={iconeBMM} size={38} color={corBMM.laranjaEscuroBMM} />
      </View>
      <Text style={estilosBMM.tituloBMM}>{tituloBMM}</Text>
      <Text style={estilosBMM.textoBMM}>{textoBMM}</Text>
      {botaoBMM && aoPressionarBMM ? <BotaoBMM tituloBMM={botaoBMM} aoPressionarBMM={aoPressionarBMM} alturaBMM={48} estiloBMM={{ marginTop: 20 }} /> : null}
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  caixaBMM: { alignItems: 'center', paddingVertical: 56, paddingHorizontal: 32 },
  circuloBMM: { width: 88, height: 88, borderRadius: 44, backgroundColor: corBMM.areiaBMM, alignItems: 'center', justifyContent: 'center' },
  tituloBMM: { fontSize: 20, fontFamily: fonteBMM.semiBMM, color: corBMM.textoBMM, marginTop: 18, textAlign: 'center' },
  textoBMM: { fontSize: 14, lineHeight: 21, fontFamily: fonteBMM.regularBMM, color: corBMM.suaveBMM, textAlign: 'center', marginTop: 6 },
});

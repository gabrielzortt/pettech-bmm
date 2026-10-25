import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import BotaoBMM from './BotaoBMM';
import { corBMM, fonteBMM } from '../constants/temaBMM';

interface ConfirmarModalPropsBMM {
  visivelBMM: boolean;
  tituloBMM: string;
  textoBMM: string;
  confirmarBMM: string;
  aoConfirmarBMM: () => void;
  aoCancelarBMM: () => void;
}

export default function ConfirmarModalBMM({ visivelBMM, tituloBMM, textoBMM, confirmarBMM, aoConfirmarBMM, aoCancelarBMM }: ConfirmarModalPropsBMM) {
  return (
    <Modal visible={visivelBMM} transparent animationType="fade" onRequestClose={aoCancelarBMM}>
      <Pressable style={estilosBMM.fundoBMM} onPress={aoCancelarBMM}>
        <Pressable style={estilosBMM.caixaBMM} onPress={() => undefined}>
          <Text style={estilosBMM.tituloBMM}>{tituloBMM}</Text>
          <Text style={estilosBMM.textoBMM}>{textoBMM}</Text>
          <View style={estilosBMM.acoesBMM}>
            <BotaoBMM tituloBMM="Cancelar" varianteBMM="secundario" alturaBMM={48} aoPressionarBMM={aoCancelarBMM} estiloBMM={{ flex: 1 }} />
            <BotaoBMM tituloBMM={confirmarBMM} alturaBMM={48} aoPressionarBMM={aoConfirmarBMM} estiloBMM={{ flex: 1 }} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const estilosBMM = StyleSheet.create({
  fundoBMM: { flex: 1, backgroundColor: 'rgba(10,31,36,0.55)', alignItems: 'center', justifyContent: 'center', padding: 28 },
  caixaBMM: { width: '100%', maxWidth: 380, backgroundColor: corBMM.brancoBMM, borderRadius: 26, padding: 24, gap: 10 },
  tituloBMM: { fontSize: 20, fontFamily: fonteBMM.semiBMM, color: corBMM.textoBMM },
  textoBMM: { fontSize: 14, lineHeight: 21, fontFamily: fonteBMM.regularBMM, color: corBMM.suaveBMM },
  acoesBMM: { flexDirection: 'row', gap: 12, marginTop: 14 },
});

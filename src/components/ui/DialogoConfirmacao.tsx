import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import BotaoAcao from './BotaoAcao';
import { coresBMM, fontesBMM, raioBMM } from '@/theme';

interface DialogoPropsBMM {
  visivelBMM: boolean;
  tituloBMM: string;
  textoBMM: string;
  rotuloConfirmarBMM: string;
  perigoBMM?: boolean;
  aoConfirmarBMM: () => void;
  aoCancelarBMM: () => void;
}

export default function DialogoConfirmacao({ visivelBMM, tituloBMM, textoBMM, rotuloConfirmarBMM, perigoBMM = false, aoConfirmarBMM, aoCancelarBMM }: DialogoPropsBMM) {
  return (
    <Modal visible={visivelBMM} transparent animationType="fade" onRequestClose={aoCancelarBMM}>
      <Pressable style={estilosBMM.fundoBMM} onPress={aoCancelarBMM}>
        <Pressable style={estilosBMM.caixaBMM} onPress={() => undefined}>
          <Text style={estilosBMM.tituloBMM}>{tituloBMM}</Text>
          <Text style={estilosBMM.textoBMM}>{textoBMM}</Text>
          <View style={estilosBMM.acoesBMM}>
            <BotaoAcao tituloBMM="Cancelar" varianteBMM="suave" alturaBMM={46} aoPressionarBMM={aoCancelarBMM} estiloBMM={{ flex: 1 }} />
            <BotaoAcao tituloBMM={rotuloConfirmarBMM} varianteBMM={perigoBMM ? 'perigo' : 'primario'} alturaBMM={46} aoPressionarBMM={aoConfirmarBMM} estiloBMM={{ flex: 1 }} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const estilosBMM = StyleSheet.create({
  fundoBMM: { flex: 1, backgroundColor: 'rgba(10,31,36,0.55)', alignItems: 'center', justifyContent: 'center', padding: 28 },
  caixaBMM: { width: '100%', maxWidth: 380, backgroundColor: coresBMM.superficieBMM, borderRadius: raioBMM.xlBMM, padding: 24, gap: 8 },
  tituloBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 19, color: coresBMM.tintaBMM },
  textoBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 14, lineHeight: 21, color: coresBMM.tintaSuaveBMM },
  acoesBMM: { flexDirection: 'row', gap: 12, marginTop: 14 },
});

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { coresBMM, fontesBMM } from '@/theme';

interface ContadorPropsBMM {
  valorBMM: number;
  aoDiminuirBMM: () => void;
  aoAumentarBMM: () => void;
  tamanhoBMM?: number;
}

export default function ContadorQuantidade({ valorBMM, aoDiminuirBMM, aoAumentarBMM, tamanhoBMM = 34 }: ContadorPropsBMM) {
  const botaoBMM = { width: tamanhoBMM, height: tamanhoBMM, borderRadius: tamanhoBMM / 2.6 };
  return (
    <View style={estilosBMM.linhaBMM}>
      <Pressable style={[estilosBMM.botaoBMM, botaoBMM]} onPress={aoDiminuirBMM} accessibilityLabel="Diminuir quantidade">
        <Ionicons name="remove" size={17} color={coresBMM.petroleoBMM} />
      </Pressable>
      <Text style={estilosBMM.valorBMM}>{valorBMM}</Text>
      <Pressable style={[estilosBMM.botaoBMM, botaoBMM]} onPress={aoAumentarBMM} accessibilityLabel="Aumentar quantidade">
        <Ionicons name="add" size={17} color={coresBMM.petroleoBMM} />
      </Pressable>
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  linhaBMM: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  botaoBMM: { backgroundColor: coresBMM.primariaFundoBMM, alignItems: 'center', justifyContent: 'center' },
  valorBMM: { minWidth: 20, textAlign: 'center', fontFamily: fontesBMM.negritoBMM, fontSize: 15, color: coresBMM.tintaBMM },
});

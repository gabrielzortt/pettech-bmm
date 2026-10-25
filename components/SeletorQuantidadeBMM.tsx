import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { corBMM, fonteBMM } from '../constants/temaBMM';

interface SeletorQuantidadePropsBMM {
  valorBMM: number;
  aoDiminuirBMM: () => void;
  aoAumentarBMM: () => void;
}

export default function SeletorQuantidadeBMM({ valorBMM, aoDiminuirBMM, aoAumentarBMM }: SeletorQuantidadePropsBMM) {
  return (
    <View style={estilosBMM.linhaBMM}>
      <TouchableOpacity style={estilosBMM.botaoBMM} onPress={aoDiminuirBMM} accessibilityLabel="Diminuir quantidade">
        <Ionicons name="remove" size={18} color={corBMM.petroleoBMM} />
      </TouchableOpacity>
      <Text style={estilosBMM.valorBMM}>{valorBMM}</Text>
      <TouchableOpacity style={estilosBMM.botaoBMM} onPress={aoAumentarBMM} accessibilityLabel="Aumentar quantidade">
        <Ionicons name="add" size={18} color={corBMM.petroleoBMM} />
      </TouchableOpacity>
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  linhaBMM: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  botaoBMM: { width: 34, height: 34, borderRadius: 11, backgroundColor: corBMM.areiaBMM, alignItems: 'center', justifyContent: 'center' },
  valorBMM: { minWidth: 18, textAlign: 'center', fontSize: 15, fontFamily: fonteBMM.semiBMM, color: corBMM.textoBMM },
});

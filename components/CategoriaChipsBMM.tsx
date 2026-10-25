import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { corBMM, fonteBMM } from '../constants/temaBMM';

interface CategoriaChipsPropsBMM {
  opcoesBMM: string[];
  selecionadaBMM: string;
  aoSelecionarBMM: (valorBMM: string) => void;
}

export default function CategoriaChipsBMM({ opcoesBMM, selecionadaBMM, aoSelecionarBMM }: CategoriaChipsPropsBMM) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={estilosBMM.linhaBMM}>
      {opcoesBMM.map((opcaoBMM) => {
        const ativaBMM = opcaoBMM === selecionadaBMM;
        return (
          <TouchableOpacity key={opcaoBMM} activeOpacity={0.85} onPress={() => aoSelecionarBMM(opcaoBMM)} style={[estilosBMM.chipBMM, ativaBMM && estilosBMM.chipAtivoBMM]}>
            <Text style={[estilosBMM.textoBMM, ativaBMM && estilosBMM.textoAtivoBMM]}>{opcaoBMM}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const estilosBMM = StyleSheet.create({
  linhaBMM: { paddingHorizontal: 20, paddingVertical: 18, gap: 10 },
  chipBMM: { paddingHorizontal: 18, paddingVertical: 9, borderRadius: 22 },
  chipAtivoBMM: { backgroundColor: corBMM.laranjaBMM, shadowColor: corBMM.laranjaBMM, shadowOpacity: 0.35, shadowRadius: 10, shadowOffset: { width: 0, height: 5 }, elevation: 4 },
  textoBMM: { fontSize: 14, fontFamily: fonteBMM.regularBMM, color: corBMM.textoBMM },
  textoAtivoBMM: { color: corBMM.brancoBMM, fontFamily: fonteBMM.semiBMM },
});

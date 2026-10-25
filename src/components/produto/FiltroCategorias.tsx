import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { coresBMM, fontesBMM, raioBMM } from '@/theme';

interface FiltroCategoriasPropsBMM {
  opcoesBMM: string[];
  selecionadaBMM: string;
  aoSelecionarBMM: (valorBMM: string) => void;
}

export default function FiltroCategorias({ opcoesBMM, selecionadaBMM, aoSelecionarBMM }: FiltroCategoriasPropsBMM) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={estilosBMM.linhaBMM}>
      {opcoesBMM.map((opcaoBMM) => {
        const ativaBMM = opcaoBMM === selecionadaBMM;
        return (
          <Pressable key={opcaoBMM} onPress={() => aoSelecionarBMM(opcaoBMM)} style={[estilosBMM.chipBMM, ativaBMM && estilosBMM.chipAtivoBMM]}>
            <Text style={[estilosBMM.textoBMM, ativaBMM && estilosBMM.textoAtivoBMM]}>{opcaoBMM}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const estilosBMM = StyleSheet.create({
  linhaBMM: { paddingHorizontal: 20, paddingVertical: 16, gap: 10 },
  chipBMM: { paddingHorizontal: 18, paddingVertical: 9, borderRadius: raioBMM.pilulaBMM },
  chipAtivoBMM: { backgroundColor: coresBMM.primariaBMM, shadowColor: coresBMM.primariaBMM, shadowOpacity: 0.32, shadowRadius: 10, shadowOffset: { width: 0, height: 5 }, elevation: 4 },
  textoBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 14, color: coresBMM.tintaBMM },
  textoAtivoBMM: { fontFamily: fontesBMM.negritoBMM, color: coresBMM.brancoBMM },
});

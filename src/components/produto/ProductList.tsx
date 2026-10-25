import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ProductCard from './ProductCard';
import { ProdutoBMM } from '@/types';
import { coresBMM } from '@/theme';

interface ProductListPropsBMM {
  produtosBMM: ProdutoBMM[];
  aoAbrirBMM: (idBMM: string) => void;
  cabecalhoBMM?: React.ReactElement | null;
  vazioBMM?: React.ReactElement | null;
  atualizandoBMM?: boolean;
  aoAtualizarBMM?: () => void;
  espacoFinalBMM?: number;
}

export default function ProductList({ produtosBMM, aoAbrirBMM, cabecalhoBMM, vazioBMM, atualizandoBMM = false, aoAtualizarBMM, espacoFinalBMM = 28 }: ProductListPropsBMM) {
  // Completa a última linha com um espaço vazio para o card não esticar quando a quantidade é ímpar.
  const dadosBMM: (ProdutoBMM | null)[] = produtosBMM.length % 2 === 1 ? [...produtosBMM, null] : produtosBMM;

  return (
    <FlatList
      data={dadosBMM}
      keyExtractor={(itemBMM, indiceBMM) => (itemBMM ? itemBMM.idBMM : `vazio-${indiceBMM}`)}
      numColumns={2}
      columnWrapperStyle={estilosBMM.colunasBMM}
      ListHeaderComponent={cabecalhoBMM}
      ListEmptyComponent={vazioBMM}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: espacoFinalBMM }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      refreshing={atualizandoBMM}
      onRefresh={aoAtualizarBMM}
      renderItem={({ item: itemBMM }) => (
        <View style={estilosBMM.celulaBMM}>{itemBMM ? <ProductCard produtoBMM={itemBMM} aoAbrirBMM={aoAbrirBMM} /> : null}</View>
      )}
    />
  );
}

const estilosBMM = StyleSheet.create({
  colunasBMM: { gap: 14, marginBottom: 14, backgroundColor: coresBMM.fundoBMM },
  celulaBMM: { flex: 1 },
});

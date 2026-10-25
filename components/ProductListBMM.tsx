import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ProductCardBMM from './ProductCardBMM';
import { ProdutoBMM } from '../data/catalogoBMM';

interface ProductListPropsBMM {
  produtosBMM: ProdutoBMM[];
  aoAbrirBMM: (idBMM: string) => void;
  cabecalhoBMM?: React.ReactElement;
  vazioBMM?: React.ReactElement;
}

export default function ProductListBMM({ produtosBMM, aoAbrirBMM, cabecalhoBMM, vazioBMM }: ProductListPropsBMM) {
  const dadosBMM: (ProdutoBMM | null)[] = produtosBMM.length % 2 === 1 ? [...produtosBMM, null] : produtosBMM;
  return (
    <FlatList
      data={dadosBMM}
      keyExtractor={(itemBMM, indiceBMM) => (itemBMM ? itemBMM.idBMM : `vazio-${indiceBMM}`)}
      numColumns={2}
      columnWrapperStyle={estilosBMM.colunasBMM}
      ListHeaderComponent={cabecalhoBMM}
      ListEmptyComponent={vazioBMM}
      contentContainerStyle={estilosBMM.listaBMM}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item: itemBMM }) => (
        <View style={estilosBMM.celulaBMM}>
          {itemBMM ? <ProductCardBMM produtoBMM={itemBMM} aoAbrirBMM={aoAbrirBMM} /> : null}
        </View>
      )}
    />
  );
}

const estilosBMM = StyleSheet.create({
  listaBMM: { paddingHorizontal: 20, paddingBottom: 28 },
  colunasBMM: { gap: 16, marginBottom: 16 },
  celulaBMM: { flex: 1 },
});

import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import CabecalhoTela from '@/components/ui/CabecalhoTela';
import ProductList from '@/components/produto/ProductList';
import TelaVazia from '@/components/ui/TelaVazia';
import { useProdutosBMM } from '@/hooks/useProdutos';
import { useFavoritosBMM } from '@/store';
import { coresBMM } from '@/theme';

export default function FavoritosBMM() {
  const roteadorBMM = useRouter();
  const { idsBMM } = useFavoritosBMM();
  const { produtosBMM, carregandoBMM, atualizandoBMM, erroBMM, recarregarBMM, atualizarBMM } = useProdutosBMM();
  const listaBMM = produtosBMM.filter((pBMM) => idsBMM.includes(pBMM.idBMM));

  const estadoVazioBMM = carregandoBMM ? (
    <ActivityIndicator size="large" color={coresBMM.primariaBMM} style={{ marginTop: 64 }} />
  ) : erroBMM !== '' ? (
    <TelaVazia iconeBMM="cloud-offline-outline" tituloBMM="Sem conexão com a API" textoBMM={erroBMM} rotuloBotaoBMM="Tentar novamente" aoPressionarBMM={recarregarBMM} />
  ) : (
    <TelaVazia iconeBMM="heart-outline" tituloBMM="Nenhum favorito ainda" textoBMM="Toque no coração de um produto para guardá-lo aqui." rotuloBotaoBMM="Ver produtos" aoPressionarBMM={() => roteadorBMM.push('/inicio')} />
  );

  return (
    <View style={estilosBMM.telaBMM}>
      <StatusBar style="dark" />
      <CabecalhoTela tituloBMM="Favoritos" subtituloBMM={`${listaBMM.length} ${listaBMM.length === 1 ? 'produto salvo' : 'produtos salvos'}`} />
      <ProductList produtosBMM={listaBMM} aoAbrirBMM={(idBMM) => roteadorBMM.push({ pathname: '/produto/[id]', params: { id: idBMM } })} vazioBMM={estadoVazioBMM} atualizandoBMM={atualizandoBMM} aoAtualizarBMM={atualizarBMM} />
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  telaBMM: { flex: 1, backgroundColor: coresBMM.fundoBMM },
});

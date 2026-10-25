import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductListBMM from '../../components/ProductListBMM';
import EstadoVazioBMM from '../../components/EstadoVazioBMM';
import { useProdutosBMM } from '../../hooks/useProdutosBMM';
import { useLojaBMM } from '../../context/LojaBMM';
import { corBMM, fonteBMM } from '../../constants/temaBMM';

export default function FavoritosBMM() {
  const roteadorBMM = useRouter();
  const insetsBMM = useSafeAreaInsets();
  const { favoritosBMM } = useLojaBMM();
  const { produtosBMM, carregandoBMM, erroBMM, recarregarBMM } = useProdutosBMM();
  const listaBMM = produtosBMM.filter((pBMM) => favoritosBMM.includes(pBMM.idBMM));

  const estadoVazioBMM = carregandoBMM ? (
    <ActivityIndicator size="large" color={corBMM.laranjaBMM} style={{ marginTop: 64 }} />
  ) : erroBMM !== '' ? (
    <EstadoVazioBMM iconeBMM="cloud-offline-outline" tituloBMM="Sem conexão com a API" textoBMM={erroBMM} botaoBMM="Tentar novamente" aoPressionarBMM={recarregarBMM} />
  ) : (
    <EstadoVazioBMM iconeBMM="heart-outline" tituloBMM="Nenhum favorito ainda" textoBMM="Toque no coração de um produto para guardá-lo aqui." botaoBMM="Ver produtos" aoPressionarBMM={() => roteadorBMM.push('/inicio')} />
  );

  return (
    <View style={estilosBMM.telaBMM}>
      <StatusBar style="dark" />
      <View style={{ paddingTop: insetsBMM.top + 16, paddingHorizontal: 20, paddingBottom: 14 }}>
        <Text style={estilosBMM.tituloBMM}>Favoritos</Text>
        <Text style={estilosBMM.subtituloBMM}>{listaBMM.length} {listaBMM.length === 1 ? 'produto' : 'produtos'}</Text>
      </View>
      <ProductListBMM
        produtosBMM={listaBMM}
        aoAbrirBMM={(idBMM) => roteadorBMM.push({ pathname: '/produto/[id]', params: { id: idBMM } })}
        vazioBMM={estadoVazioBMM}
      />
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  telaBMM: { flex: 1, backgroundColor: corBMM.fundoBMM },
  tituloBMM: { fontSize: 28, fontFamily: fonteBMM.semiBMM, color: corBMM.textoBMM },
  subtituloBMM: { fontSize: 13, fontFamily: fonteBMM.regularBMM, color: corBMM.suaveBMM, marginTop: 2 },
});

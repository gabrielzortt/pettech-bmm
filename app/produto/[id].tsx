import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagemBMM from '../../components/ImagemBMM';
import BotaoBMM from '../../components/BotaoBMM';
import EstadoVazioBMM from '../../components/EstadoVazioBMM';
import { ProdutoBMM, TamanhoBMM, formatarAvaliacoesBMM, formatarPrecoBMM, tamanhosBMM, nomeTamanhoBMM } from '../../data/catalogoBMM';
import { buscarProdutoPorIdBMM } from '../../services/apiBMM';
import { useLojaBMM } from '../../context/LojaBMM';
import { corBMM, fonteBMM, sombraBMM } from '../../constants/temaBMM';

const limiteDescricaoBMM: number = 110;

export default function DetalhesBMM() {
  const { id: idBMM } = useLocalSearchParams<{ id: string }>();
  const roteadorBMM = useRouter();
  const insetsBMM = useSafeAreaInsets();
  const { width: larguraBMM } = useWindowDimensions();
  const { favoritosBMM, alternarFavoritoBMM, adicionarBMM, mostrarToastBMM } = useLojaBMM();
  const [produtoBMM, setProdutoBMM] = useState<ProdutoBMM | null>(null);
  const [carregandoBMM, setCarregandoBMM] = useState<boolean>(true);
  const [erroBMM, setErroBMM] = useState<string>('');
  const [tamanhoBMM, setTamanhoBMM] = useState<TamanhoBMM>('M');
  const [expandidaBMM, setExpandidaBMM] = useState<boolean>(false);

  const carregarBMM = useCallback(async () => {
    setCarregandoBMM(true);
    setErroBMM('');
    try {
      setProdutoBMM(await buscarProdutoPorIdBMM(idBMM ?? ''));
    } catch (falhaBMM) {
      setErroBMM(falhaBMM instanceof Error ? falhaBMM.message : 'Erro inesperado ao carregar o produto.');
    } finally {
      setCarregandoBMM(false);
    }
  }, [idBMM]);

  useEffect(() => {
    carregarBMM();
  }, [carregarBMM]);

  const voltarBMM = () => (roteadorBMM.canGoBack() ? roteadorBMM.back() : roteadorBMM.replace('/inicio'));

  if (carregandoBMM) {
    return (
      <View style={[estilosBMM.telaBMM, { alignItems: 'center', justifyContent: 'center' }]}>
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color={corBMM.laranjaBMM} />
      </View>
    );
  }

  if (!produtoBMM) {
    return (
      <View style={[estilosBMM.telaBMM, { justifyContent: 'center' }]}>
        <StatusBar style="dark" />
        <EstadoVazioBMM
          iconeBMM="alert-circle-outline"
          tituloBMM="Produto indisponível"
          textoBMM={erroBMM || 'Não foi possível carregar este produto.'}
          botaoBMM="Voltar"
          aoPressionarBMM={voltarBMM}
        />
      </View>
    );
  }

  const favoritoBMM = favoritosBMM.includes(produtoBMM.idBMM);
  const larguraImagemBMM = Math.min(larguraBMM - 40, 420);

  const adicionarAoCarrinhoBMM = () => {
    adicionarBMM(produtoBMM, tamanhoBMM, 1);
    mostrarToastBMM(`${produtoBMM.nomeBMM} adicionado ao carrinho`);
  };

  return (
    <View style={estilosBMM.telaBMM}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={{ paddingTop: insetsBMM.top + 60, alignItems: 'center' }}>
          <ImagemBMM uriBMM={produtoBMM.imagemBMM} estiloBMM={{ width: larguraImagemBMM, height: larguraImagemBMM * 0.9, borderRadius: 36 }} />
        </View>
        <TouchableOpacity style={[estilosBMM.iconeTopoBMM, { top: insetsBMM.top + 12, left: 20 }]} onPress={voltarBMM} accessibilityLabel="Voltar">
          <Ionicons name="chevron-back" size={24} color={corBMM.textoBMM} />
        </TouchableOpacity>
        <TouchableOpacity style={[estilosBMM.iconeTopoBMM, { top: insetsBMM.top + 12, right: 20 }]} onPress={() => alternarFavoritoBMM(produtoBMM.idBMM)} accessibilityLabel="Favoritar">
          <Ionicons name={favoritoBMM ? 'heart' : 'heart-outline'} size={24} color={favoritoBMM ? corBMM.erroBMM : corBMM.textoBMM} />
        </TouchableOpacity>

        <View style={estilosBMM.corpoBMM}>
          <View style={estilosBMM.linhaTituloBMM}>
            <View style={{ flex: 1 }}>
              <Text style={estilosBMM.nomeBMM}>{produtoBMM.nomeBMM}</Text>
              <Text style={estilosBMM.subtituloBMM}>{produtoBMM.subtituloBMM}</Text>
            </View>
            <View style={estilosBMM.notaLinhaBMM}>
              <Ionicons name="star" size={22} color={corBMM.estrelaBMM} />
              <Text style={estilosBMM.notaBMM}>{produtoBMM.notaBMM.toFixed(1)}</Text>
              <Text style={estilosBMM.avaliacoesBMM}>({formatarAvaliacoesBMM(produtoBMM.avaliacoesBMM)})</Text>
            </View>
          </View>

          <View style={estilosBMM.divisorBMM} />

          <Text style={estilosBMM.secaoBMM}>Descrição</Text>
          <Text style={estilosBMM.descricaoBMM}>
            {expandidaBMM || produtoBMM.descricaoBMM.length <= limiteDescricaoBMM ? produtoBMM.descricaoBMM : `${produtoBMM.descricaoBMM.slice(0, limiteDescricaoBMM)}.. `}
            {produtoBMM.descricaoBMM.length > limiteDescricaoBMM && (
              <Text style={estilosBMM.lerMaisBMM} onPress={() => setExpandidaBMM(!expandidaBMM)}>
                {expandidaBMM ? ' Ler menos' : 'Ler mais'}
              </Text>
            )}
          </Text>

          <Text style={[estilosBMM.secaoBMM, { marginTop: 24 }]}>Porte do pet</Text>
          <View style={estilosBMM.tamanhosBMM}>
            {tamanhosBMM.map((gBMM) => {
              const ativoBMM = gBMM === tamanhoBMM;
              return (
                <TouchableOpacity key={gBMM} activeOpacity={0.85} onPress={() => setTamanhoBMM(gBMM)} style={[estilosBMM.tamanhoBMM, ativoBMM && estilosBMM.tamanhoAtivoBMM]}>
                  <Text style={[estilosBMM.tamanhoTextoBMM, ativoBMM && estilosBMM.tamanhoTextoAtivoBMM]}>{gBMM}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={estilosBMM.tamanhoLegendaBMM}>{nomeTamanhoBMM[tamanhoBMM]}</Text>
        </View>
      </ScrollView>

      <View style={[estilosBMM.rodapeBMM, { paddingBottom: Math.max(insetsBMM.bottom, 16) }]}>
        <View>
          <Text style={estilosBMM.precoRotuloBMM}>Preço</Text>
          <Text style={estilosBMM.precoBMM}>{formatarPrecoBMM(produtoBMM.precoBMM)}</Text>
        </View>
        <BotaoBMM tituloBMM="Adicionar ao Carrinho" iconeBMM="bag-add-outline" aoPressionarBMM={adicionarAoCarrinhoBMM} alturaBMM={56} estiloBMM={{ flex: 1 }} />
      </View>
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  telaBMM: { flex: 1, backgroundColor: corBMM.brancoBMM },
  iconeTopoBMM: { position: 'absolute', width: 42, height: 42, borderRadius: 14, backgroundColor: corBMM.brancoBMM, alignItems: 'center', justifyContent: 'center', ...sombraBMM.suaveBMM },
  corpoBMM: { paddingHorizontal: 20, marginTop: 26 },
  linhaTituloBMM: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  nomeBMM: { fontSize: 22, fontFamily: fonteBMM.semiBMM, color: corBMM.textoBMM },
  subtituloBMM: { fontSize: 13, fontFamily: fonteBMM.regularBMM, color: corBMM.suaveBMM, marginTop: 6 },
  notaLinhaBMM: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  notaBMM: { fontSize: 20, fontFamily: fonteBMM.semiBMM, color: corBMM.textoBMM },
  avaliacoesBMM: { fontSize: 13, fontFamily: fonteBMM.regularBMM, color: corBMM.suaveBMM },
  divisorBMM: { height: 1, backgroundColor: '#EBEFEE', marginVertical: 18 },
  secaoBMM: { fontSize: 16, fontFamily: fonteBMM.semiBMM, color: corBMM.textoBMM },
  descricaoBMM: { fontSize: 14, lineHeight: 25, fontFamily: fonteBMM.regularBMM, color: '#52605F', marginTop: 12 },
  lerMaisBMM: { fontFamily: fonteBMM.semiBMM, color: corBMM.laranjaBMM },
  tamanhosBMM: { flexDirection: 'row', gap: 16, marginTop: 14 },
  tamanhoBMM: { flex: 1, height: 48, borderRadius: 14, borderWidth: 1.5, borderColor: '#E3EBE9', backgroundColor: corBMM.brancoBMM, alignItems: 'center', justifyContent: 'center' },
  tamanhoAtivoBMM: { borderColor: corBMM.laranjaBMM, backgroundColor: corBMM.cremeBMM },
  tamanhoTextoBMM: { fontSize: 15, fontFamily: fonteBMM.regularBMM, color: corBMM.textoBMM },
  tamanhoTextoAtivoBMM: { fontFamily: fonteBMM.semiBMM, color: corBMM.laranjaBMM },
  tamanhoLegendaBMM: { fontSize: 12, fontFamily: fonteBMM.regularBMM, color: corBMM.suaveBMM, marginTop: 8, textAlign: 'center' },
  rodapeBMM: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingHorizontal: 20, paddingTop: 14, backgroundColor: corBMM.brancoBMM },
  precoRotuloBMM: { fontSize: 14, fontFamily: fonteBMM.regularBMM, color: corBMM.suaveBMM },
  precoBMM: { fontSize: 20, fontFamily: fonteBMM.semiBMM, color: corBMM.laranjaBMM, marginTop: 2 },
});

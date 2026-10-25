import React, { useRef, useState } from 'react';
import { ActivityIndicator, Animated, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FotoBMM from '@/components/ui/FotoBMM';
import BotaoAcao from '@/components/ui/BotaoAcao';
import TelaVazia from '@/components/ui/TelaVazia';
import ContadorQuantidade from '@/components/ui/ContadorQuantidade';
import SeletorPorte from '@/components/produto/SeletorPorte';
import { useProdutoBMM } from '@/hooks/useProdutos';
import { useCarrinhoBMM, useFavoritosBMM, useFeedbackBMM } from '@/store';
import { PorteBMM } from '@/types';
import { formatarMilharBMM, formatarMoedaBMM } from '@/utils/formatadores';
import { coresBMM, fontesBMM, raioBMM, sombrasBMM } from '@/theme';

const limiteDescricaoBMM: number = 120;

export default function DetalhesProdutoBMM() {
  const { id: idBMM } = useLocalSearchParams<{ id: string }>();
  const roteadorBMM = useRouter();
  const insetsBMM = useSafeAreaInsets();
  const { width: larguraBMM } = useWindowDimensions();
  const { produtoBMM, carregandoBMM, erroBMM, recarregarBMM } = useProdutoBMM(idBMM);
  const { ehFavoritoBMM, alternarBMM } = useFavoritosBMM();
  const { adicionarBMM } = useCarrinhoBMM();
  const { mostrarBMM } = useFeedbackBMM();
  const [porteBMM, setPorteBMM] = useState<PorteBMM>('M');
  const [quantidadeBMM, setQuantidadeBMM] = useState<number>(1);
  const [expandidaBMM, setExpandidaBMM] = useState<boolean>(false);
  const rolagemBMM = useRef(new Animated.Value(0)).current;

  const voltarBMM = () => (roteadorBMM.canGoBack() ? roteadorBMM.back() : roteadorBMM.replace('/inicio'));
  const alturaHeroBMM = Math.min(larguraBMM, 460);

  if (carregandoBMM) {
    return (
      <View style={[estilosBMM.telaBMM, { alignItems: 'center', justifyContent: 'center' }]}>
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color={coresBMM.primariaBMM} />
      </View>
    );
  }

  if (!produtoBMM) {
    return (
      <View style={[estilosBMM.telaBMM, { justifyContent: 'center' }]}>
        <StatusBar style="dark" />
        <TelaVazia iconeBMM="alert-circle-outline" tituloBMM="Produto indisponível" textoBMM={erroBMM || 'Não foi possível carregar este produto.'} rotuloBotaoBMM={erroBMM.startsWith('Não foi possível conectar') ? 'Tentar novamente' : 'Voltar'} aoPressionarBMM={erroBMM.startsWith('Não foi possível conectar') ? recarregarBMM : voltarBMM} />
      </View>
    );
  }

  const favoritoBMM = ehFavoritoBMM(produtoBMM.idBMM);
  const textoLongoBMM = produtoBMM.descricaoBMM.length > limiteDescricaoBMM;

  const adicionarAoCarrinhoBMM = () => {
    adicionarBMM(produtoBMM, porteBMM, quantidadeBMM);
    mostrarBMM(`${quantidadeBMM}× ${produtoBMM.nomeBMM} no carrinho`, { rotuloBMM: 'Ver carrinho', aoPressionarBMM: () => roteadorBMM.replace('/carrinho') });
  };

  return (
    <View style={estilosBMM.telaBMM}>
      <StatusBar style="dark" />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: rolagemBMM } } }], { useNativeDriver: true })}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Animated.View
          style={{
            height: alturaHeroBMM,
            transform: [
              { translateY: rolagemBMM.interpolate({ inputRange: [-300, 0, 300], outputRange: [-150, 0, 120], extrapolate: 'clamp' }) },
              { scale: rolagemBMM.interpolate({ inputRange: [-300, 0], outputRange: [1.6, 1], extrapolateRight: 'clamp' }) },
            ],
          }}
        >
          <FotoBMM origemBMM={produtoBMM.imagemBMM} estiloBMM={{ width: '100%', height: '100%' }} />
        </Animated.View>

        <View style={estilosBMM.corpoBMM}>
          <View style={estilosBMM.linhaTituloBMM}>
            <View style={{ flex: 1 }}>
              <Text style={estilosBMM.nomeBMM}>{produtoBMM.nomeBMM}</Text>
              <Text style={estilosBMM.subtituloBMM}>{produtoBMM.subtituloBMM}</Text>
            </View>
            <View style={estilosBMM.notaBMM}>
              <Ionicons name="star" size={20} color={coresBMM.estrelaBMM} />
              <Text style={estilosBMM.notaValorBMM}>{produtoBMM.notaBMM.toFixed(1)}</Text>
              <Text style={estilosBMM.notaTotalBMM}>({formatarMilharBMM(produtoBMM.avaliacoesBMM)})</Text>
            </View>
          </View>

          <View style={estilosBMM.etiquetasBMM}>
            <View style={estilosBMM.etiquetaBMM}><Text style={estilosBMM.etiquetaTextoBMM}>{produtoBMM.categoriaBMM}</Text></View>
            {produtoBMM.novoBMM && <View style={[estilosBMM.etiquetaBMM, { backgroundColor: coresBMM.sucessoFundoBMM }]}><Text style={[estilosBMM.etiquetaTextoBMM, { color: coresBMM.sucessoBMM }]}>Lançamento</Text></View>}
          </View>

          <View style={estilosBMM.divisorBMM} />

          <Text style={estilosBMM.secaoBMM}>Descrição</Text>
          <Text style={estilosBMM.descricaoBMM}>
            {expandidaBMM || !textoLongoBMM ? produtoBMM.descricaoBMM : `${produtoBMM.descricaoBMM.slice(0, limiteDescricaoBMM)}.. `}
            {textoLongoBMM && (
              <Text style={estilosBMM.lerMaisBMM} onPress={() => setExpandidaBMM(!expandidaBMM)}>{expandidaBMM ? ' Ler menos' : 'Ler mais'}</Text>
            )}
          </Text>

          <Text style={[estilosBMM.secaoBMM, { marginTop: 24, marginBottom: 12 }]}>Porte do pet</Text>
          <SeletorPorte valorBMM={porteBMM} aoMudarBMM={setPorteBMM} />

          <View style={estilosBMM.quantidadeBMM}>
            <Text style={estilosBMM.secaoBMM}>Quantidade</Text>
            <ContadorQuantidade valorBMM={quantidadeBMM} aoDiminuirBMM={() => setQuantidadeBMM(Math.max(1, quantidadeBMM - 1))} aoAumentarBMM={() => setQuantidadeBMM(Math.min(10, quantidadeBMM + 1))} tamanhoBMM={38} />
          </View>
        </View>
      </Animated.ScrollView>

      <Pressable style={[estilosBMM.botaoTopoBMM, { top: insetsBMM.top + 12, left: 20 }]} onPress={voltarBMM} accessibilityLabel="Voltar">
        <Ionicons name="chevron-back" size={23} color={coresBMM.tintaBMM} />
      </Pressable>
      <Pressable style={[estilosBMM.botaoTopoBMM, { top: insetsBMM.top + 12, right: 20 }]} onPress={() => alternarBMM(produtoBMM.idBMM)} accessibilityLabel="Favoritar">
        <Ionicons name={favoritoBMM ? 'heart' : 'heart-outline'} size={23} color={favoritoBMM ? coresBMM.perigoBMM : coresBMM.tintaBMM} />
      </Pressable>

      <View style={[estilosBMM.rodapeBMM, { paddingBottom: Math.max(insetsBMM.bottom, 16) }]}>
        <View>
          <Text style={estilosBMM.precoRotuloBMM}>Preço</Text>
          <Text style={estilosBMM.precoBMM}>{formatarMoedaBMM(produtoBMM.precoBMM * quantidadeBMM)}</Text>
        </View>
        <BotaoAcao tituloBMM="Adicionar ao Carrinho" iconeBMM="bag-add-outline" alturaBMM={56} aoPressionarBMM={adicionarAoCarrinhoBMM} estiloBMM={{ flex: 1 }} />
      </View>
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  telaBMM: { flex: 1, backgroundColor: coresBMM.fundoBMM },
  botaoTopoBMM: { position: 'absolute', width: 42, height: 42, borderRadius: raioBMM.mdBMM, backgroundColor: coresBMM.superficieBMM, alignItems: 'center', justifyContent: 'center', ...sombrasBMM.leveBMM },
  corpoBMM: { backgroundColor: coresBMM.superficieBMM, borderTopLeftRadius: raioBMM.xlBMM, borderTopRightRadius: raioBMM.xlBMM, marginTop: -28, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 8 },
  linhaTituloBMM: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  nomeBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 22, color: coresBMM.tintaBMM },
  subtituloBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 13, color: coresBMM.tintaSuaveBMM, marginTop: 4 },
  notaBMM: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  notaValorBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 19, color: coresBMM.tintaBMM },
  notaTotalBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 13, color: coresBMM.tintaSuaveBMM },
  etiquetasBMM: { flexDirection: 'row', gap: 8, marginTop: 14 },
  etiquetaBMM: { backgroundColor: coresBMM.primariaFundoBMM, borderRadius: raioBMM.pilulaBMM, paddingHorizontal: 12, paddingVertical: 5 },
  etiquetaTextoBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 12, color: coresBMM.primariaEscuraBMM },
  divisorBMM: { height: 1, backgroundColor: '#EBEFEE', marginVertical: 18 },
  secaoBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 16, color: coresBMM.tintaBMM },
  descricaoBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 14, lineHeight: 25, color: '#52605F', marginTop: 10 },
  lerMaisBMM: { fontFamily: fontesBMM.negritoBMM, color: coresBMM.primariaBMM },
  quantidadeBMM: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 26 },
  rodapeBMM: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingHorizontal: 20, paddingTop: 14, backgroundColor: coresBMM.superficieBMM, ...sombrasBMM.elevadaBMM },
  precoRotuloBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 13, color: coresBMM.tintaSuaveBMM },
  precoBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 21, color: coresBMM.primariaBMM, marginTop: 1 },
});

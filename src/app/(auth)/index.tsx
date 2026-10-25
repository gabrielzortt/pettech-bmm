import React, { useRef, useState } from 'react';
import { Animated, FlatList, NativeScrollEvent, NativeSyntheticEvent, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BotaoAcao from '@/components/ui/BotaoAcao';
import FotoBMM from '@/components/ui/FotoBMM';
import { herosBoasVindasBMM } from '@/data/imagensLocais';
import { coresBMM, fontesBMM } from '@/theme';

const slidesBMM = [
  { idBMM: 'a', tituloBMM: 'Tecnologia para quem você ama', textoBMM: 'Coleiras, câmeras e comedouros inteligentes para o seu pet, entregues na sua porta. Comece agora!', imagemBMM: herosBoasVindasBMM[0] },
  { idBMM: 'b', tituloBMM: 'Cuide mesmo de longe', textoBMM: 'Acompanhe localização, alimentação e brincadeiras do seu melhor amigo direto pelo celular.', imagemBMM: herosBoasVindasBMM[1] },
  { idBMM: 'c', tituloBMM: 'Compra simples e segura', textoBMM: 'Escolha, pague com Pix ou cartão e acompanhe o pedido do clique até a sua casa.', imagemBMM: herosBoasVindasBMM[2] },
];

export default function BoasVindasBMM() {
  const roteadorBMM = useRouter();
  const insetsBMM = useSafeAreaInsets();
  const { width: larguraBMM, height: alturaBMM } = useWindowDimensions();
  const listaBMM = useRef<FlatList>(null);
  const posicaoBMM = useRef(new Animated.Value(0)).current;
  const [indiceBMM, setIndiceBMM] = useState<number>(0);

  const ultimoBMM = indiceBMM === slidesBMM.length - 1;
  const alturaImagemBMM = alturaBMM * 0.6;

  const aoFinalizarRolagemBMM = (eventoBMM: NativeSyntheticEvent<NativeScrollEvent>) =>
    setIndiceBMM(Math.round(eventoBMM.nativeEvent.contentOffset.x / larguraBMM));

  const avancarBMM = () => {
    if (ultimoBMM) {
      roteadorBMM.push('/entrar');
      return;
    }
    listaBMM.current?.scrollToIndex({ index: indiceBMM + 1, animated: true });
    setIndiceBMM(indiceBMM + 1);
  };

  return (
    <View style={estilosBMM.telaBMM}>
      <StatusBar style="light" />
      <Animated.FlatList
        ref={listaBMM}
        data={slidesBMM}
        keyExtractor={(slideBMM) => slideBMM.idBMM}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: posicaoBMM } } }], { useNativeDriver: false })}
        onMomentumScrollEnd={aoFinalizarRolagemBMM}
        getItemLayout={(_dadosBMM, posBMM) => ({ length: larguraBMM, offset: larguraBMM * posBMM, index: posBMM })}
        renderItem={({ item: slideBMM }) => (
          <View style={{ width: larguraBMM }}>
            <FotoBMM origemBMM={slideBMM.imagemBMM} estiloBMM={{ width: larguraBMM, height: alturaImagemBMM, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }} />
            <View style={estilosBMM.textosBMM}>
              <Text style={estilosBMM.tituloBMM}>{slideBMM.tituloBMM}</Text>
              <Text style={estilosBMM.textoBMM}>{slideBMM.textoBMM}</Text>
            </View>
          </View>
        )}
      />

      {!ultimoBMM && (
        <Pressable style={[estilosBMM.pularBMM, { top: insetsBMM.top + 14 }]} onPress={() => roteadorBMM.push('/entrar')} accessibilityLabel="Pular apresentação">
          <Text style={estilosBMM.pularTextoBMM}>Pular</Text>
        </Pressable>
      )}

      <View style={[estilosBMM.rodapeBMM, { paddingBottom: Math.max(insetsBMM.bottom, 18) + 8 }]}>
        <View style={estilosBMM.pontosBMM}>
          {slidesBMM.map((slideBMM, iBMM) => {
            const faixaBMM = [(iBMM - 1) * larguraBMM, iBMM * larguraBMM, (iBMM + 1) * larguraBMM];
            return (
              <Animated.View
                key={slideBMM.idBMM}
                style={[estilosBMM.pontoBMM, {
                  width: posicaoBMM.interpolate({ inputRange: faixaBMM, outputRange: [8, 28, 8], extrapolate: 'clamp' }),
                  opacity: posicaoBMM.interpolate({ inputRange: faixaBMM, outputRange: [0.4, 1, 0.4], extrapolate: 'clamp' }),
                }]}
              />
            );
          })}
        </View>
        <BotaoAcao tituloBMM={ultimoBMM ? 'Começar' : 'Próximo'} iconeBMM={ultimoBMM ? 'paw' : 'arrow-forward'} aoPressionarBMM={avancarBMM} />
      </View>
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  telaBMM: { flex: 1, backgroundColor: coresBMM.petroleoBMM },
  textosBMM: { paddingHorizontal: 28, paddingTop: 22 },
  tituloBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 25, lineHeight: 34, color: coresBMM.brancoBMM },
  textoBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 15, lineHeight: 24, color: '#C9DBD8', marginTop: 10 },
  pularBMM: { position: 'absolute', right: 20, backgroundColor: 'rgba(0,0,0,0.35)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  pularTextoBMM: { fontFamily: fontesBMM.mediaBMM, fontSize: 13, color: coresBMM.brancoBMM },
  rodapeBMM: { position: 'absolute', left: 28, right: 28, bottom: 0, gap: 18 },
  pontosBMM: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  pontoBMM: { height: 8, borderRadius: 4, backgroundColor: coresBMM.brancoBMM },
});

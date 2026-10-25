import React, { useRef, useState } from 'react';
import { View, Text, Animated, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Redirect, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagemBMM from '../components/ImagemBMM';
import BotaoBMM from '../components/BotaoBMM';
import { useLojaBMM } from '../context/LojaBMM';
import { corBMM, fonteBMM, IconeBMM } from '../constants/temaBMM';
import { imagensBMM } from '../constants/imagensBMM';

interface SlideBMM {
  idBMM: string;
  tituloBMM: string;
  textoBMM: string;
  iconeBMM: IconeBMM;
  imagemBMM: string;
}

const slidesBMM: SlideBMM[] = [
  { idBMM: '1', tituloBMM: 'Tecnologia para quem você ama', textoBMM: 'Coleiras, comedouros e câmeras inteligentes para o seu pet, direto na sua porta. Comece agora!', iconeBMM: 'paw', imagemBMM: imagensBMM.boasVindasBMM[0] },
  { idBMM: '2', tituloBMM: 'Cuide mesmo de longe', textoBMM: 'Acompanhe localização, alimentação e brincadeiras do seu melhor amigo pelo celular.', iconeBMM: 'videocam', imagemBMM: imagensBMM.boasVindasBMM[1] },
  { idBMM: '3', tituloBMM: 'Entrega segura', textoBMM: 'Do clique até a sua casa, com acompanhamento do pedido e embalagem protegida.', iconeBMM: 'cube', imagemBMM: imagensBMM.boasVindasBMM[2] },
];

export default function BoasVindasBMM() {
  const roteadorBMM = useRouter();
  const insetsBMM = useSafeAreaInsets();
  const { width: larguraBMM, height: alturaBMM } = useWindowDimensions();
  const { usuarioBMM } = useLojaBMM();
  const rolagemBMM = useRef<ScrollView>(null);
  const posicaoBMM = useRef(new Animated.Value(0)).current;
  const [indiceBMM, setIndiceBMM] = useState<number>(0);

  if (usuarioBMM) return <Redirect href="/inicio" />;

  const alturaImagemBMM = alturaBMM * 0.62;
  const ultimoBMM = indiceBMM === slidesBMM.length - 1;

  const aoTerminarRolagemBMM = (eventoBMM: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndiceBMM(Math.round(eventoBMM.nativeEvent.contentOffset.x / larguraBMM));
  };

  const avancarBMM = () => {
    if (ultimoBMM) {
      roteadorBMM.push('/login');
      return;
    }
    const proximoBMM = indiceBMM + 1;
    rolagemBMM.current?.scrollTo({ x: proximoBMM * larguraBMM, animated: true });
    setIndiceBMM(proximoBMM);
  };

  return (
    <View style={estilosBMM.telaBMM}>
      <StatusBar style="light" />
      <Animated.ScrollView
        ref={rolagemBMM}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: posicaoBMM } } }], { useNativeDriver: false })}
        onMomentumScrollEnd={aoTerminarRolagemBMM}
      >
        {slidesBMM.map((slideBMM, iBMM) => {
          const faixaBMM = [(iBMM - 1) * larguraBMM, iBMM * larguraBMM, (iBMM + 1) * larguraBMM];
          const deslocamentoBMM = posicaoBMM.interpolate({ inputRange: faixaBMM, outputRange: [larguraBMM * 0.25, 0, -larguraBMM * 0.25], extrapolate: 'clamp' });
          const opacidadeBMM = posicaoBMM.interpolate({ inputRange: faixaBMM, outputRange: [0, 1, 0], extrapolate: 'clamp' });
          return (
            <View key={slideBMM.idBMM} style={{ width: larguraBMM, height: alturaBMM }}>
              <View style={{ height: alturaImagemBMM, borderBottomLeftRadius: 44, borderBottomRightRadius: 44, overflow: 'hidden' }}>
                <ImagemBMM escuroBMM uriBMM={slideBMM.imagemBMM} iconeBMM={slideBMM.iconeBMM} estiloBMM={{ width: '100%', height: '100%', borderRadius: 0 }} />
              </View>
              <Animated.View style={[estilosBMM.textosBMM, { opacity: opacidadeBMM, transform: [{ translateX: deslocamentoBMM }] }]}>
                <Text style={estilosBMM.tituloBMM}>{slideBMM.tituloBMM}</Text>
                <Text style={estilosBMM.textoBMM}>{slideBMM.textoBMM}</Text>
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>

      {!ultimoBMM && (
        <TouchableOpacity style={[estilosBMM.pularBMM, { top: insetsBMM.top + 14 }]} onPress={() => roteadorBMM.push('/login')} accessibilityLabel="Pular apresentação">
          <Text style={estilosBMM.pularTextoBMM}>Pular</Text>
        </TouchableOpacity>
      )}

      <View style={[estilosBMM.rodapeBMM, { paddingBottom: Math.max(insetsBMM.bottom, 20) + 6 }]}>
        <View style={estilosBMM.pontosBMM}>
          {slidesBMM.map((slideBMM, iBMM) => {
            const faixaBMM = [(iBMM - 1) * larguraBMM, iBMM * larguraBMM, (iBMM + 1) * larguraBMM];
            const larguraPontoBMM = posicaoBMM.interpolate({ inputRange: faixaBMM, outputRange: [8, 30, 8], extrapolate: 'clamp' });
            const opacidadePontoBMM = posicaoBMM.interpolate({ inputRange: faixaBMM, outputRange: [0.5, 1, 0.5], extrapolate: 'clamp' });
            return <Animated.View key={slideBMM.idBMM} style={[estilosBMM.pontoBMM, { width: larguraPontoBMM, opacity: opacidadePontoBMM }]} />;
          })}
        </View>
        <BotaoBMM tituloBMM={ultimoBMM ? 'Começar' : 'Próximo'} aoPressionarBMM={avancarBMM} />
      </View>
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  telaBMM: { flex: 1, backgroundColor: corBMM.petroleoBMM },
  textosBMM: { paddingHorizontal: 30, marginTop: 8 },
  tituloBMM: { fontSize: 26, lineHeight: 36, fontFamily: fonteBMM.semiBMM, color: corBMM.brancoBMM },
  textoBMM: { fontSize: 15, lineHeight: 24, fontFamily: fonteBMM.regularBMM, color: '#D5E3E1', marginTop: 12 },
  pularBMM: { position: 'absolute', right: 20, backgroundColor: 'rgba(0,0,0,0.35)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  pularTextoBMM: { fontSize: 13, fontFamily: fonteBMM.mediaBMM, color: corBMM.brancoBMM },
  rodapeBMM: { position: 'absolute', left: 30, right: 30, bottom: 0, gap: 20 },
  pontosBMM: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  pontoBMM: { height: 8, borderRadius: 4, backgroundColor: corBMM.brancoBMM },
});

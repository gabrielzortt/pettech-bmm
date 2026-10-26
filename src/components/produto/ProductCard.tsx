import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FotoBMM from '@/components/ui/FotoBMM';
import { ProdutoBMM } from '@/types';
import { useFavoritosBMM } from '@/store';
import { formatarMoedaBMM } from '@/utils/formatadores';
import { coresBMM, fontesBMM, raioBMM, sombrasBMM } from '@/theme';

interface ProductCardPropsBMM {
  produtoBMM: ProdutoBMM;
  aoAbrirBMM: (idBMM: string) => void;
}

export default function ProductCard({ produtoBMM, aoAbrirBMM }: ProductCardPropsBMM) {
  const { ehFavoritoBMM, alternarBMM } = useFavoritosBMM();
  const favoritoBMM = ehFavoritoBMM(produtoBMM.idBMM);

  return (
    <Pressable style={({ pressed: pressionadoBMM }) => [estilosBMM.cartaoBMM, pressionadoBMM && { transform: [{ scale: 0.98 }] }]} onPress={() => aoAbrirBMM(produtoBMM.idBMM)}>
      <View>
        <FotoBMM origemBMM={produtoBMM.imagemBMM} reservaBMM={produtoBMM.imagemReservaBMM} estiloBMM={estilosBMM.fotoBMM} />
        <View style={estilosBMM.notaBMM}>
          <Ionicons name="star" size={11} color={coresBMM.estrelaBMM} />
          <Text style={estilosBMM.notaTextoBMM}>{produtoBMM.notaBMM.toFixed(1)}</Text>
        </View>
        <Pressable style={estilosBMM.coracaoBMM} onPress={() => alternarBMM(produtoBMM.idBMM)} hitSlop={6} accessibilityLabel="Favoritar">
          <Ionicons name={favoritoBMM ? 'heart' : 'heart-outline'} size={16} color={favoritoBMM ? coresBMM.perigoBMM : coresBMM.tintaBMM} />
        </Pressable>
        {produtoBMM.novoBMM ? (
          <View style={estilosBMM.novoBMM}>
            <Text style={estilosBMM.novoTextoBMM}>Novo</Text>
          </View>
        ) : null}
      </View>
      <Text style={estilosBMM.nomeBMM} numberOfLines={1}>{produtoBMM.nomeBMM}</Text>
      <Text style={estilosBMM.subtituloBMM} numberOfLines={1}>{produtoBMM.subtituloBMM}</Text>
      <View style={estilosBMM.rodapeBMM}>
        <Text style={estilosBMM.precoBMM}>{formatarMoedaBMM(produtoBMM.precoBMM)}</Text>
        <Pressable style={estilosBMM.detalhesBMM} onPress={() => aoAbrirBMM(produtoBMM.idBMM)} accessibilityLabel={`Ver detalhes de ${produtoBMM.nomeBMM}`}>
          <Ionicons name="add" size={20} color={coresBMM.brancoBMM} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const estilosBMM = StyleSheet.create({
  cartaoBMM: { flex: 1, backgroundColor: coresBMM.superficieBMM, borderRadius: raioBMM.lgBMM, padding: 8, paddingBottom: 14, ...sombrasBMM.leveBMM },
  fotoBMM: { width: '100%', aspectRatio: 1, borderRadius: raioBMM.mdBMM },
  notaBMM: { position: 'absolute', top: 8, left: 8, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(10,31,36,0.62)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  notaTextoBMM: { color: coresBMM.brancoBMM, fontSize: 11, fontFamily: fontesBMM.negritoBMM },
  coracaoBMM: { position: 'absolute', top: 8, right: 8, width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.94)', alignItems: 'center', justifyContent: 'center' },
  novoBMM: { position: 'absolute', bottom: 8, left: 8, backgroundColor: coresBMM.destaqueBMM, paddingHorizontal: 9, paddingVertical: 3, borderRadius: 9 },
  novoTextoBMM: { color: coresBMM.brancoBMM, fontSize: 10, fontFamily: fontesBMM.negritoBMM },
  nomeBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 14, color: coresBMM.tintaBMM, marginTop: 11, marginHorizontal: 6 },
  subtituloBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 12, color: coresBMM.tintaSuaveBMM, marginTop: 1, marginHorizontal: 6 },
  rodapeBMM: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 11, marginHorizontal: 6 },
  precoBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 15, color: coresBMM.petroleoBMM },
  detalhesBMM: { width: 32, height: 32, borderRadius: 10, backgroundColor: coresBMM.primariaBMM, alignItems: 'center', justifyContent: 'center' },
});

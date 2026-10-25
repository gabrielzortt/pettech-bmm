import React from 'react';
import { View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ImagemBMM from './ImagemBMM';
import { ProdutoBMM, formatarPrecoBMM } from '../data/catalogoBMM';
import { useLojaBMM } from '../context/LojaBMM';
import { corBMM, fonteBMM, sombraBMM } from '../constants/temaBMM';

interface ProductCardPropsBMM {
  produtoBMM: ProdutoBMM;
  aoAbrirBMM: (idBMM: string) => void;
}

export default function ProductCardBMM({ produtoBMM, aoAbrirBMM }: ProductCardPropsBMM) {
  const { favoritosBMM, alternarFavoritoBMM } = useLojaBMM();
  const favoritoBMM = favoritosBMM.includes(produtoBMM.idBMM);

  return (
    <Pressable style={({ pressed: pressionadoBMM }) => [estilosBMM.cartaoBMM, pressionadoBMM && { transform: [{ scale: 0.98 }] }]} onPress={() => aoAbrirBMM(produtoBMM.idBMM)}>
      <View>
        <ImagemBMM uriBMM={produtoBMM.imagemBMM} estiloBMM={estilosBMM.imagemBMM} compactoBMM />
        <View style={estilosBMM.notaBMM}>
          <Ionicons name="star" size={11} color={corBMM.estrelaBMM} />
          <Text style={estilosBMM.notaTextoBMM}>{produtoBMM.notaBMM.toFixed(1)}</Text>
        </View>
        {produtoBMM.novoBMM ? (
          <View style={estilosBMM.novoBMM}>
            <Text style={estilosBMM.novoTextoBMM}>Novo</Text>
          </View>
        ) : null}
        <TouchableOpacity style={estilosBMM.coracaoBMM} onPress={() => alternarFavoritoBMM(produtoBMM.idBMM)} accessibilityLabel="Favoritar">
          <Ionicons name={favoritoBMM ? 'heart' : 'heart-outline'} size={16} color={favoritoBMM ? corBMM.erroBMM : corBMM.textoBMM} />
        </TouchableOpacity>
      </View>
      <Text style={estilosBMM.nomeBMM} numberOfLines={1}>{produtoBMM.nomeBMM}</Text>
      <Text style={estilosBMM.subtituloBMM} numberOfLines={1}>{produtoBMM.subtituloBMM}</Text>
      <View style={estilosBMM.rodapeBMM}>
        <Text style={estilosBMM.precoBMM}>{formatarPrecoBMM(produtoBMM.precoBMM)}</Text>
        <TouchableOpacity style={estilosBMM.botaoBMM} activeOpacity={0.85} onPress={() => aoAbrirBMM(produtoBMM.idBMM)} accessibilityLabel={`Ver detalhes de ${produtoBMM.nomeBMM}`}>
          <Ionicons name="add" size={20} color={corBMM.brancoBMM} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

const estilosBMM = StyleSheet.create({
  cartaoBMM: { flex: 1, backgroundColor: corBMM.brancoBMM, borderRadius: 22, padding: 8, paddingBottom: 14, ...sombraBMM.suaveBMM },
  imagemBMM: { width: '100%', aspectRatio: 1, borderRadius: 18 },
  notaBMM: { position: 'absolute', bottom: 8, left: 8, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(10,31,36,0.62)', paddingHorizontal: 9, paddingVertical: 5, borderRadius: 12 },
  notaTextoBMM: { color: corBMM.brancoBMM, fontSize: 11, fontFamily: fonteBMM.semiBMM },
  novoBMM: { position: 'absolute', top: 8, left: 8, backgroundColor: corBMM.menteBMM, paddingHorizontal: 9, paddingVertical: 4, borderRadius: 10 },
  novoTextoBMM: { color: corBMM.brancoBMM, fontSize: 10, fontFamily: fonteBMM.semiBMM },
  coracaoBMM: { position: 'absolute', top: 8, right: 8, width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.93)', alignItems: 'center', justifyContent: 'center' },
  nomeBMM: { fontSize: 15, fontFamily: fonteBMM.semiBMM, color: corBMM.textoBMM, marginTop: 12, marginHorizontal: 6 },
  subtituloBMM: { fontSize: 12, fontFamily: fonteBMM.regularBMM, color: corBMM.suaveBMM, marginTop: 2, marginHorizontal: 6 },
  rodapeBMM: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, marginHorizontal: 6 },
  precoBMM: { fontSize: 15, fontFamily: fonteBMM.semiBMM, color: corBMM.precoBMM },
  botaoBMM: { width: 34, height: 34, borderRadius: 11, backgroundColor: corBMM.laranjaBMM, alignItems: 'center', justifyContent: 'center', shadowColor: corBMM.laranjaBMM, shadowOpacity: 0.35, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
});

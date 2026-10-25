import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagemBMM from '../../components/ImagemBMM';
import SeletorQuantidadeBMM from '../../components/SeletorQuantidadeBMM';
import BotaoBMM from '../../components/BotaoBMM';
import EstadoVazioBMM from '../../components/EstadoVazioBMM';
import ConfirmarModalBMM from '../../components/ConfirmarModalBMM';
import { useLojaBMM } from '../../context/LojaBMM';
import { formatarPrecoBMM } from '../../data/catalogoBMM';
import { corBMM, fonteBMM, sombraBMM } from '../../constants/temaBMM';

export default function CarrinhoBMM() {
  const roteadorBMM = useRouter();
  const insetsBMM = useSafeAreaInsets();
  const { itensBMM, alterarQuantidadeBMM, removerBMM, limparCarrinhoBMM, subtotalBMM, freteBMM, totalBMM, mostrarToastBMM } = useLojaBMM();
  const [finalizarAbertoBMM, setFinalizarAbertoBMM] = useState<boolean>(false);

  const finalizarCompraBMM = () => {
    setFinalizarAbertoBMM(false);
    limparCarrinhoBMM();
    mostrarToastBMM('Pedido simulado realizado com sucesso!');
  };

  const resumoBMM = (
    <View style={estilosBMM.resumoBMM}>
      <View style={estilosBMM.linhaResumoBMM}>
        <Text style={estilosBMM.resumoRotuloBMM}>Subtotal</Text>
        <Text style={estilosBMM.resumoValorBMM}>{formatarPrecoBMM(subtotalBMM)}</Text>
      </View>
      <View style={estilosBMM.linhaResumoBMM}>
        <Text style={estilosBMM.resumoRotuloBMM}>Frete</Text>
        <Text style={estilosBMM.resumoValorBMM}>{freteBMM === 0 ? 'Grátis' : formatarPrecoBMM(freteBMM)}</Text>
      </View>
      {freteBMM > 0 && <Text style={estilosBMM.dicaFreteBMM}>Frete grátis em compras acima de R$ 300,00</Text>}
    </View>
  );

  return (
    <View style={estilosBMM.telaBMM}>
      <StatusBar style="dark" />
      <View style={{ paddingTop: insetsBMM.top + 16, paddingHorizontal: 20, paddingBottom: 14 }}>
        <Text style={estilosBMM.tituloBMM}>Carrinho</Text>
        <Text style={estilosBMM.subtituloBMM}>{itensBMM.length} {itensBMM.length === 1 ? 'item' : 'itens'}</Text>
      </View>
      <FlatList
        data={itensBMM}
        keyExtractor={(iBMM) => `${iBMM.produtoBMM.idBMM}-${iBMM.tamanhoBMM}`}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EstadoVazioBMM iconeBMM="bag-outline" tituloBMM="Seu carrinho está vazio" textoBMM="Que tal conhecer os produtos inteligentes para o seu pet?" botaoBMM="Explorar produtos" aoPressionarBMM={() => roteadorBMM.push('/inicio')} />}
        ListFooterComponent={itensBMM.length > 0 ? resumoBMM : null}
        renderItem={({ item: itemBMM }) => (
          <View style={estilosBMM.itemBMM}>
            <ImagemBMM uriBMM={itemBMM.produtoBMM.imagemBMM} compactoBMM estiloBMM={estilosBMM.miniaturaBMM} />
            <View style={{ flex: 1, gap: 3 }}>
              <Text style={estilosBMM.nomeBMM} numberOfLines={1}>{itemBMM.produtoBMM.nomeBMM}</Text>
              <Text style={estilosBMM.detalheBMM} numberOfLines={1}>{itemBMM.produtoBMM.subtituloBMM} · Porte {itemBMM.tamanhoBMM}</Text>
              <Text style={estilosBMM.precoBMM}>{formatarPrecoBMM(itemBMM.produtoBMM.precoBMM * itemBMM.quantidadeBMM)}</Text>
              <View style={estilosBMM.acoesBMM}>
                <SeletorQuantidadeBMM
                  valorBMM={itemBMM.quantidadeBMM}
                  aoDiminuirBMM={() => alterarQuantidadeBMM(itemBMM.produtoBMM.idBMM, itemBMM.tamanhoBMM, -1)}
                  aoAumentarBMM={() => alterarQuantidadeBMM(itemBMM.produtoBMM.idBMM, itemBMM.tamanhoBMM, 1)}
                />
                <TouchableOpacity onPress={() => removerBMM(itemBMM.produtoBMM.idBMM, itemBMM.tamanhoBMM)} accessibilityLabel="Remover item" style={estilosBMM.lixoBMM}>
                  <Ionicons name="trash-outline" size={20} color={corBMM.erroBMM} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      {itensBMM.length > 0 && (
        <View style={estilosBMM.rodapeBMM}>
          <View>
            <Text style={estilosBMM.totalRotuloBMM}>Total</Text>
            <Text style={estilosBMM.totalBMM}>{formatarPrecoBMM(totalBMM)}</Text>
          </View>
          <BotaoBMM tituloBMM="Finalizar compra" iconeBMM="arrow-forward" aoPressionarBMM={() => setFinalizarAbertoBMM(true)} estiloBMM={{ flex: 1 }} />
        </View>
      )}
      <ConfirmarModalBMM
        visivelBMM={finalizarAbertoBMM}
        tituloBMM="Finalizar compra?"
        textoBMM={`O pedido será simulado no valor de ${formatarPrecoBMM(totalBMM)}. Nenhuma cobrança real é feita.`}
        confirmarBMM="Finalizar"
        aoConfirmarBMM={finalizarCompraBMM}
        aoCancelarBMM={() => setFinalizarAbertoBMM(false)}
      />
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  telaBMM: { flex: 1, backgroundColor: corBMM.fundoBMM },
  tituloBMM: { fontSize: 28, fontFamily: fonteBMM.semiBMM, color: corBMM.textoBMM },
  subtituloBMM: { fontSize: 13, fontFamily: fonteBMM.regularBMM, color: corBMM.suaveBMM, marginTop: 2 },
  itemBMM: { flexDirection: 'row', gap: 14, backgroundColor: corBMM.brancoBMM, borderRadius: 22, padding: 12, marginBottom: 14, ...sombraBMM.suaveBMM },
  miniaturaBMM: { width: 92, height: 120, borderRadius: 16 },
  nomeBMM: { fontSize: 16, fontFamily: fonteBMM.semiBMM, color: corBMM.textoBMM },
  detalheBMM: { fontSize: 12, fontFamily: fonteBMM.regularBMM, color: corBMM.suaveBMM },
  precoBMM: { fontSize: 15, fontFamily: fonteBMM.semiBMM, color: corBMM.laranjaEscuroBMM },
  acoesBMM: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  lixoBMM: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#FCEDEA', alignItems: 'center', justifyContent: 'center' },
  resumoBMM: { backgroundColor: corBMM.brancoBMM, borderRadius: 22, padding: 16, gap: 12, marginTop: 4, ...sombraBMM.suaveBMM },
  linhaResumoBMM: { flexDirection: 'row', justifyContent: 'space-between' },
  resumoRotuloBMM: { fontSize: 14, fontFamily: fonteBMM.regularBMM, color: corBMM.suaveBMM },
  resumoValorBMM: { fontSize: 14, fontFamily: fonteBMM.semiBMM, color: corBMM.textoBMM },
  dicaFreteBMM: { fontSize: 12, fontFamily: fonteBMM.regularBMM, color: corBMM.laranjaEscuroBMM },
  rodapeBMM: { flexDirection: 'row', alignItems: 'center', gap: 18, paddingHorizontal: 20, paddingVertical: 14, backgroundColor: corBMM.brancoBMM, ...sombraBMM.forteBMM },
  totalRotuloBMM: { fontSize: 12, fontFamily: fonteBMM.regularBMM, color: corBMM.suaveBMM },
  totalBMM: { fontSize: 22, fontFamily: fonteBMM.semiBMM, color: corBMM.textoBMM },
});

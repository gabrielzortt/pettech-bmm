import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import CabecalhoTela from '@/components/ui/CabecalhoTela';
import TelaVazia from '@/components/ui/TelaVazia';
import { usePedidosBMM } from '@/store';
import { PagamentoBMM } from '@/types';
import { formatarDataBMM, formatarMoedaBMM } from '@/utils/formatadores';
import { coresBMM, fontesBMM, raioBMM, sombrasBMM } from '@/theme';

const nomePagamentoBMM: Record<PagamentoBMM, string> = { pix: 'Pix', cartao: 'Cartão de crédito', dinheiro: 'Dinheiro na entrega' };

export default function PedidosBMM() {
  const roteadorBMM = useRouter();
  const { pedidosBMM } = usePedidosBMM();

  return (
    <View style={estilosBMM.telaBMM}>
      <StatusBar style="dark" />
      <CabecalhoTela comVoltarBMM tituloBMM="Meus pedidos" subtituloBMM={`${pedidosBMM.length} ${pedidosBMM.length === 1 ? 'pedido' : 'pedidos'}`} />
      <FlatList
        data={pedidosBMM}
        keyExtractor={(pedidoBMM) => pedidoBMM.idBMM}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<TelaVazia iconeBMM="receipt-outline" tituloBMM="Nenhum pedido ainda" textoBMM="Quando você finalizar uma compra, ela aparece aqui." rotuloBotaoBMM="Ver produtos" aoPressionarBMM={() => roteadorBMM.replace('/inicio')} />}
        renderItem={({ item: pedidoBMM }) => (
          <View style={estilosBMM.cartaoBMM}>
            <View style={estilosBMM.topoBMM}>
              <View>
                <Text style={estilosBMM.codigoBMM}>Pedido #{pedidoBMM.idBMM}</Text>
                <Text style={estilosBMM.dataBMM}>{formatarDataBMM(new Date(pedidoBMM.dataBMM))}</Text>
              </View>
              <View style={estilosBMM.statusBMM}><Text style={estilosBMM.statusTextoBMM}>{pedidoBMM.statusBMM}</Text></View>
            </View>
            <View style={estilosBMM.linhasBMM}>
              {pedidoBMM.linhasBMM.map((linhaBMM, iBMM) => (
                <View key={`${linhaBMM.nomeBMM}-${iBMM}`} style={estilosBMM.linhaBMM}>
                  <Text style={estilosBMM.linhaNomeBMM} numberOfLines={1}>{linhaBMM.quantidadeBMM}× {linhaBMM.nomeBMM} (porte {linhaBMM.porteBMM})</Text>
                  <Text style={estilosBMM.linhaValorBMM}>{formatarMoedaBMM(linhaBMM.subtotalBMM)}</Text>
                </View>
              ))}
            </View>
            <Text style={estilosBMM.infoBMM}>Pagamento: {nomePagamentoBMM[pedidoBMM.pagamentoBMM]}</Text>
            <Text style={estilosBMM.infoBMM} numberOfLines={2}>Entrega: {pedidoBMM.enderecoBMM}</Text>
            <View style={estilosBMM.totalLinhaBMM}>
              <Text style={estilosBMM.totalRotuloBMM}>Total</Text>
              <Text style={estilosBMM.totalBMM}>{formatarMoedaBMM(pedidoBMM.totalBMM)}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  telaBMM: { flex: 1, backgroundColor: coresBMM.fundoBMM },
  cartaoBMM: { backgroundColor: coresBMM.superficieBMM, borderRadius: raioBMM.lgBMM, padding: 16, marginBottom: 14, gap: 10, ...sombrasBMM.leveBMM },
  topoBMM: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  codigoBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 16, color: coresBMM.tintaBMM },
  dataBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 12, color: coresBMM.tintaSuaveBMM, marginTop: 1 },
  statusBMM: { backgroundColor: coresBMM.sucessoFundoBMM, borderRadius: raioBMM.pilulaBMM, paddingHorizontal: 12, paddingVertical: 5 },
  statusTextoBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 12, color: coresBMM.sucessoBMM },
  linhasBMM: { gap: 6, paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: coresBMM.linhaBMM },
  linhaBMM: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  linhaNomeBMM: { flex: 1, fontFamily: fontesBMM.regularBMM, fontSize: 13, color: coresBMM.tintaBMM },
  linhaValorBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 13, color: coresBMM.tintaBMM },
  infoBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 12, color: coresBMM.tintaSuaveBMM },
  totalLinhaBMM: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 },
  totalRotuloBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 13, color: coresBMM.tintaSuaveBMM },
  totalBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 18, color: coresBMM.primariaEscuraBMM },
});

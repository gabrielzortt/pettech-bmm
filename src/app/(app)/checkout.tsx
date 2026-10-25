import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Redirect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CabecalhoTela from '@/components/ui/CabecalhoTela';
import CampoTexto from '@/components/ui/CampoTexto';
import BotaoAcao from '@/components/ui/BotaoAcao';
import { useCarrinhoBMM, useFeedbackBMM, usePedidosBMM } from '@/store';
import { PagamentoBMM } from '@/types';
import { formatarMoedaBMM } from '@/utils/formatadores';
import { coresBMM, fontesBMM, IconeBMM, raioBMM, sombrasBMM } from '@/theme';

const formasBMM: { chaveBMM: PagamentoBMM; rotuloBMM: string; dicaBMM: string; iconeBMM: IconeBMM }[] = [
  { chaveBMM: 'pix', rotuloBMM: 'Pix', dicaBMM: 'Aprovação imediata', iconeBMM: 'qr-code-outline' },
  { chaveBMM: 'cartao', rotuloBMM: 'Cartão de crédito', dicaBMM: 'Em até 3x sem juros', iconeBMM: 'card-outline' },
  { chaveBMM: 'dinheiro', rotuloBMM: 'Dinheiro na entrega', dicaBMM: 'Pague ao receber', iconeBMM: 'cash-outline' },
];

export default function CheckoutBMM() {
  const roteadorBMM = useRouter();
  const insetsBMM = useSafeAreaInsets();
  const { itensBMM, subtotalBMM, freteBMM, totalBMM, limparBMM } = useCarrinhoBMM();
  const { registrarPedidoBMM } = usePedidosBMM();
  const { mostrarBMM } = useFeedbackBMM();
  const [ruaBMM, setRuaBMM] = useState<string>('');
  const [bairroBMM, setBairroBMM] = useState<string>('');
  const [complementoBMM, setComplementoBMM] = useState<string>('');
  const [pagamentoBMM, setPagamentoBMM] = useState<PagamentoBMM>('pix');
  const [errosBMM, setErrosBMM] = useState<{ ruaBMM?: string; bairroBMM?: string }>({});

  if (itensBMM.length === 0) return <Redirect href="/carrinho" />;

  const confirmarPedidoBMM = () => {
    const novosErrosBMM: { ruaBMM?: string; bairroBMM?: string } = {};
    if (ruaBMM.trim().length < 5) novosErrosBMM.ruaBMM = 'Informe a rua e o número da entrega.';
    if (bairroBMM.trim().length < 2) novosErrosBMM.bairroBMM = 'Informe o bairro.';
    setErrosBMM(novosErrosBMM);
    if (Object.keys(novosErrosBMM).length > 0) return;

    const enderecoBMM = [ruaBMM.trim(), bairroBMM.trim(), complementoBMM.trim(), 'Manaus, AM'].filter((parteBMM) => parteBMM !== '').join(' · ');
    const pedidoBMM = registrarPedidoBMM({ itensBMM, freteBMM, totalBMM, pagamentoBMM, enderecoBMM });
    limparBMM();
    mostrarBMM(`Pedido #${pedidoBMM.idBMM} confirmado! (compra simulada)`);
    roteadorBMM.replace('/pedidos');
  };

  return (
    <KeyboardAvoidingView style={estilosBMM.telaBMM} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="dark" />
      <CabecalhoTela comVoltarBMM tituloBMM="Finalizar pedido" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text style={estilosBMM.secaoBMM}>Endereço de entrega</Text>
        <View style={{ gap: 12 }}>
          <CampoTexto iconeBMM="location-outline" placeholderBMM="Rua e número" valorBMM={ruaBMM} aoMudarBMM={setRuaBMM} capitalizarBMM="words" erroBMM={errosBMM.ruaBMM} />
          <CampoTexto iconeBMM="map-outline" placeholderBMM="Bairro" valorBMM={bairroBMM} aoMudarBMM={setBairroBMM} capitalizarBMM="words" erroBMM={errosBMM.bairroBMM} />
          <CampoTexto iconeBMM="home-outline" placeholderBMM="Complemento (opcional)" valorBMM={complementoBMM} aoMudarBMM={setComplementoBMM} capitalizarBMM="sentences" />
        </View>

        <Text style={[estilosBMM.secaoBMM, { marginTop: 26 }]}>Forma de pagamento</Text>
        <View style={{ gap: 10 }}>
          {formasBMM.map((formaBMM) => {
            const ativaBMM = formaBMM.chaveBMM === pagamentoBMM;
            return (
              <Pressable key={formaBMM.chaveBMM} style={[estilosBMM.formaBMM, ativaBMM && estilosBMM.formaAtivaBMM]} onPress={() => setPagamentoBMM(formaBMM.chaveBMM)} accessibilityState={{ selected: ativaBMM }}>
                <View style={estilosBMM.formaIconeBMM}>
                  <Ionicons name={formaBMM.iconeBMM} size={22} color={coresBMM.primariaEscuraBMM} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={estilosBMM.formaTituloBMM}>{formaBMM.rotuloBMM}</Text>
                  <Text style={estilosBMM.formaDicaBMM}>{formaBMM.dicaBMM}</Text>
                </View>
                <Ionicons name={ativaBMM ? 'radio-button-on' : 'radio-button-off'} size={22} color={ativaBMM ? coresBMM.primariaBMM : coresBMM.inativoBMM} />
              </Pressable>
            );
          })}
        </View>

        <Text style={[estilosBMM.secaoBMM, { marginTop: 26 }]}>Resumo</Text>
        <View style={estilosBMM.resumoBMM}>
          {itensBMM.map((itemBMM) => (
            <View key={itemBMM.chaveBMM} style={estilosBMM.linhaBMM}>
              <Text style={estilosBMM.itemNomeBMM} numberOfLines={1}>{itemBMM.quantidadeBMM}× {itemBMM.produtoBMM.nomeBMM} (porte {itemBMM.porteBMM})</Text>
              <Text style={estilosBMM.itemValorBMM}>{formatarMoedaBMM(itemBMM.produtoBMM.precoBMM * itemBMM.quantidadeBMM)}</Text>
            </View>
          ))}
          <View style={estilosBMM.separadorBMM} />
          <View style={estilosBMM.linhaBMM}><Text style={estilosBMM.itemNomeBMM}>Subtotal</Text><Text style={estilosBMM.itemValorBMM}>{formatarMoedaBMM(subtotalBMM)}</Text></View>
          <View style={estilosBMM.linhaBMM}><Text style={estilosBMM.itemNomeBMM}>Frete</Text><Text style={[estilosBMM.itemValorBMM, freteBMM === 0 && { color: coresBMM.sucessoBMM }]}>{freteBMM === 0 ? 'Grátis' : formatarMoedaBMM(freteBMM)}</Text></View>
        </View>
      </ScrollView>

      <View style={[estilosBMM.rodapeBMM, { paddingBottom: Math.max(insetsBMM.bottom, 16) }]}>
        <View>
          <Text style={estilosBMM.totalRotuloBMM}>Total</Text>
          <Text style={estilosBMM.totalBMM}>{formatarMoedaBMM(totalBMM)}</Text>
        </View>
        <BotaoAcao tituloBMM="Confirmar pedido" iconeBMM="checkmark-circle-outline" aoPressionarBMM={confirmarPedidoBMM} estiloBMM={{ flex: 1 }} />
      </View>
    </KeyboardAvoidingView>
  );
}

const estilosBMM = StyleSheet.create({
  telaBMM: { flex: 1, backgroundColor: coresBMM.fundoBMM },
  secaoBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 16, color: coresBMM.tintaBMM, marginBottom: 12 },
  formaBMM: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: coresBMM.superficieBMM, borderRadius: raioBMM.mdBMM, borderWidth: 1.5, borderColor: coresBMM.linhaBMM, padding: 12 },
  formaAtivaBMM: { borderColor: coresBMM.primariaBMM, backgroundColor: coresBMM.primariaFundoBMM },
  formaIconeBMM: { width: 42, height: 42, borderRadius: 13, backgroundColor: coresBMM.superficieBMM, alignItems: 'center', justifyContent: 'center' },
  formaTituloBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 14, color: coresBMM.tintaBMM },
  formaDicaBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 12, color: coresBMM.tintaSuaveBMM },
  resumoBMM: { backgroundColor: coresBMM.superficieBMM, borderRadius: raioBMM.lgBMM, padding: 16, gap: 10, ...sombrasBMM.leveBMM },
  linhaBMM: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  itemNomeBMM: { flex: 1, fontFamily: fontesBMM.regularBMM, fontSize: 13, color: coresBMM.tintaSuaveBMM },
  itemValorBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 13, color: coresBMM.tintaBMM },
  separadorBMM: { height: 1, backgroundColor: coresBMM.linhaBMM },
  rodapeBMM: { flexDirection: 'row', alignItems: 'center', gap: 18, paddingHorizontal: 20, paddingTop: 14, backgroundColor: coresBMM.superficieBMM, ...sombrasBMM.elevadaBMM },
  totalRotuloBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 12, color: coresBMM.tintaSuaveBMM },
  totalBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 21, color: coresBMM.tintaBMM },
});

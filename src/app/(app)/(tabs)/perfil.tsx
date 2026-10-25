import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DialogoConfirmacao from '@/components/ui/DialogoConfirmacao';
import { useAuthBMM, useCarrinhoBMM, useFavoritosBMM, usePedidosBMM } from '@/store';
import { coresBMM, fontesBMM, IconeBMM, raioBMM, sombrasBMM } from '@/theme';

export default function PerfilBMM() {
  const roteadorBMM = useRouter();
  const insetsBMM = useSafeAreaInsets();
  const { usuarioBMM, sairBMM } = useAuthBMM();
  const { idsBMM } = useFavoritosBMM();
  const { totalItensBMM } = useCarrinhoBMM();
  const { pedidosBMM } = usePedidosBMM();
  const [sairAbertoBMM, setSairAbertoBMM] = useState<boolean>(false);

  const estatisticasBMM = [
    { rotuloBMM: 'Pedidos', valorBMM: pedidosBMM.length },
    { rotuloBMM: 'Favoritos', valorBMM: idsBMM.length },
    { rotuloBMM: 'No carrinho', valorBMM: totalItensBMM },
  ];

  const menuBMM: { rotuloBMM: string; iconeBMM: IconeBMM; aoPressionarBMM: () => void }[] = [
    { rotuloBMM: 'Meus pedidos', iconeBMM: 'receipt-outline', aoPressionarBMM: () => roteadorBMM.push('/pedidos') },
    { rotuloBMM: 'Meus favoritos', iconeBMM: 'heart-outline', aoPressionarBMM: () => roteadorBMM.push('/favoritos') },
    { rotuloBMM: 'Meu carrinho', iconeBMM: 'bag-outline', aoPressionarBMM: () => roteadorBMM.push('/carrinho') },
    { rotuloBMM: 'Continuar comprando', iconeBMM: 'paw-outline', aoPressionarBMM: () => roteadorBMM.push('/inicio') },
  ];

  return (
    <View style={estilosBMM.telaBMM}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={[estilosBMM.topoBMM, { paddingTop: insetsBMM.top + 28 }]}>
          <View style={estilosBMM.avatarBMM}>
            <Text style={estilosBMM.avatarTextoBMM}>{(usuarioBMM?.nomeBMM ?? 'P').charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={estilosBMM.nomeBMM}>{usuarioBMM?.nomeBMM}</Text>
          <Text style={estilosBMM.emailBMM}>{usuarioBMM?.emailBMM}</Text>
        </View>

        <View style={estilosBMM.estatisticasBMM}>
          {estatisticasBMM.map((estBMM, iBMM) => (
            <View key={estBMM.rotuloBMM} style={[estilosBMM.estatisticaBMM, iBMM < estatisticasBMM.length - 1 && estilosBMM.divisorBMM]}>
              <Text style={estilosBMM.estatisticaValorBMM}>{estBMM.valorBMM}</Text>
              <Text style={estilosBMM.estatisticaRotuloBMM}>{estBMM.rotuloBMM}</Text>
            </View>
          ))}
        </View>

        <View style={estilosBMM.menuBMM}>
          {menuBMM.map((itemBMM, iBMM) => (
            <Pressable key={itemBMM.rotuloBMM} style={({ pressed: pressionadoBMM }) => [estilosBMM.itemBMM, iBMM < menuBMM.length - 1 && estilosBMM.itemBordaBMM, pressionadoBMM && { opacity: 0.6 }]} onPress={itemBMM.aoPressionarBMM}>
              <View style={estilosBMM.itemIconeBMM}>
                <Ionicons name={itemBMM.iconeBMM} size={20} color={coresBMM.primariaEscuraBMM} />
              </View>
              <Text style={estilosBMM.itemTextoBMM}>{itemBMM.rotuloBMM}</Text>
              <Ionicons name="chevron-forward" size={18} color={coresBMM.inativoBMM} />
            </Pressable>
          ))}
        </View>

        <Pressable style={estilosBMM.sairBMM} onPress={() => setSairAbertoBMM(true)}>
          <Ionicons name="log-out-outline" size={20} color={coresBMM.perigoBMM} />
          <Text style={estilosBMM.sairTextoBMM}>Sair da conta</Text>
        </Pressable>
        <Text style={estilosBMM.versaoBMM}>PetTech · versão 1.0.0</Text>
      </ScrollView>

      <DialogoConfirmacao visivelBMM={sairAbertoBMM} tituloBMM="Sair da conta?" textoBMM="Seu carrinho e seus favoritos desta sessão serão limpos." rotuloConfirmarBMM="Sair" perigoBMM aoConfirmarBMM={() => { setSairAbertoBMM(false); sairBMM(); }} aoCancelarBMM={() => setSairAbertoBMM(false)} />
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  telaBMM: { flex: 1, backgroundColor: coresBMM.fundoBMM },
  topoBMM: { alignItems: 'center', backgroundColor: coresBMM.petroleoBMM, paddingBottom: 60, borderBottomLeftRadius: 34, borderBottomRightRadius: 34 },
  avatarBMM: { width: 92, height: 92, borderRadius: 30, backgroundColor: coresBMM.primariaBMM, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: 'rgba(255,255,255,0.18)' },
  avatarTextoBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 40, color: coresBMM.brancoBMM },
  nomeBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 21, color: coresBMM.brancoBMM, marginTop: 14 },
  emailBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 13, color: '#B9CFCC', marginTop: 2 },
  estatisticasBMM: { flexDirection: 'row', marginHorizontal: 20, marginTop: -34, backgroundColor: coresBMM.superficieBMM, borderRadius: raioBMM.lgBMM, paddingVertical: 18, ...sombrasBMM.elevadaBMM },
  estatisticaBMM: { flex: 1, alignItems: 'center' },
  divisorBMM: { borderRightWidth: 1, borderRightColor: coresBMM.linhaBMM },
  estatisticaValorBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 23, color: coresBMM.tintaBMM },
  estatisticaRotuloBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 12, color: coresBMM.tintaSuaveBMM, marginTop: 2 },
  menuBMM: { marginHorizontal: 20, marginTop: 22, backgroundColor: coresBMM.superficieBMM, borderRadius: raioBMM.lgBMM, paddingHorizontal: 6, ...sombrasBMM.leveBMM },
  itemBMM: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, paddingHorizontal: 12 },
  itemBordaBMM: { borderBottomWidth: 1, borderBottomColor: '#EEF3F2' },
  itemIconeBMM: { width: 40, height: 40, borderRadius: 13, backgroundColor: coresBMM.primariaFundoBMM, alignItems: 'center', justifyContent: 'center' },
  itemTextoBMM: { flex: 1, fontFamily: fontesBMM.mediaBMM, fontSize: 15, color: coresBMM.tintaBMM },
  sairBMM: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginHorizontal: 20, marginTop: 18, height: 52, borderRadius: raioBMM.lgBMM, backgroundColor: coresBMM.perigoFundoBMM },
  sairTextoBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 15, color: coresBMM.perigoBMM },
  versaoBMM: { textAlign: 'center', fontFamily: fontesBMM.regularBMM, fontSize: 12, color: coresBMM.inativoBMM, marginTop: 18 },
});

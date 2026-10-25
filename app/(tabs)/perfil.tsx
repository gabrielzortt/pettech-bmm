import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ConfirmarModalBMM from '../../components/ConfirmarModalBMM';
import { useLojaBMM } from '../../context/LojaBMM';
import { corBMM, fonteBMM, gradienteBMM, sombraBMM, IconeBMM } from '../../constants/temaBMM';

export default function PerfilBMM() {
  const roteadorBMM = useRouter();
  const insetsBMM = useSafeAreaInsets();
  const { usuarioBMM, favoritosBMM, quantidadeTotalBMM, sairBMM } = useLojaBMM();
  const [sairAbertoBMM, setSairAbertoBMM] = useState<boolean>(false);

  const menuBMM: { rotuloBMM: string; iconeBMM: IconeBMM; aoPressionarBMM: () => void }[] = [
    { rotuloBMM: 'Meus favoritos', iconeBMM: 'heart-outline', aoPressionarBMM: () => roteadorBMM.push('/favoritos') },
    { rotuloBMM: 'Meu carrinho', iconeBMM: 'bag-outline', aoPressionarBMM: () => roteadorBMM.push('/carrinho') },
    { rotuloBMM: 'Continuar comprando', iconeBMM: 'paw-outline', aoPressionarBMM: () => roteadorBMM.push('/inicio') },
  ];

  const estatisticasBMM = [
    { rotuloBMM: 'Favoritos', valorBMM: favoritosBMM.length },
    { rotuloBMM: 'No carrinho', valorBMM: quantidadeTotalBMM },
  ];

  const confirmarSairBMM = () => {
    setSairAbertoBMM(false);
    sairBMM();
    roteadorBMM.replace('/login');
  };

  return (
    <View style={estilosBMM.telaBMM}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <LinearGradient colors={gradienteBMM.perfilBMM} style={[estilosBMM.topoBMM, { paddingTop: insetsBMM.top + 24 }]}>
          <View style={estilosBMM.avatarBMM}>
            <Text style={estilosBMM.avatarTextoBMM}>{(usuarioBMM?.nomeBMM ?? 'C').charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={estilosBMM.nomeBMM}>{usuarioBMM?.nomeBMM}</Text>
          <Text style={estilosBMM.emailBMM}>{usuarioBMM?.emailBMM}</Text>
        </LinearGradient>

        <View style={estilosBMM.estatisticasBMM}>
          {estatisticasBMM.map((eBMM, iBMM) => (
            <View key={eBMM.rotuloBMM} style={[estilosBMM.estatisticaBMM, iBMM < estatisticasBMM.length - 1 && estilosBMM.divisorBMM]}>
              <Text style={estilosBMM.estatisticaValorBMM}>{eBMM.valorBMM}</Text>
              <Text style={estilosBMM.estatisticaRotuloBMM}>{eBMM.rotuloBMM}</Text>
            </View>
          ))}
        </View>

        <View style={estilosBMM.menuBMM}>
          {menuBMM.map((itemBMM, iBMM) => (
            <TouchableOpacity key={itemBMM.rotuloBMM} style={[estilosBMM.itemBMM, iBMM < menuBMM.length - 1 && estilosBMM.itemBordaBMM]} activeOpacity={0.7} onPress={itemBMM.aoPressionarBMM}>
              <View style={estilosBMM.itemIconeBMM}>
                <Ionicons name={itemBMM.iconeBMM} size={21} color={corBMM.laranjaEscuroBMM} />
              </View>
              <Text style={estilosBMM.itemTextoBMM}>{itemBMM.rotuloBMM}</Text>
              <Ionicons name="chevron-forward" size={18} color="#A7B3B2" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={estilosBMM.sairBMM} onPress={() => setSairAbertoBMM(true)} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color={corBMM.erroBMM} />
          <Text style={estilosBMM.sairTextoBMM}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>

      <ConfirmarModalBMM
        visivelBMM={sairAbertoBMM}
        tituloBMM="Sair da conta?"
        textoBMM="Você precisará entrar novamente e o carrinho será esvaziado."
        confirmarBMM="Sair"
        aoConfirmarBMM={confirmarSairBMM}
        aoCancelarBMM={() => setSairAbertoBMM(false)}
      />
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  telaBMM: { flex: 1, backgroundColor: corBMM.fundoBMM },
  topoBMM: { alignItems: 'center', paddingBottom: 60, borderBottomLeftRadius: 34, borderBottomRightRadius: 34 },
  avatarBMM: { width: 96, height: 96, borderRadius: 32, backgroundColor: corBMM.laranjaBMM, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: 'rgba(255,255,255,0.18)' },
  avatarTextoBMM: { fontSize: 42, fontFamily: fonteBMM.semiBMM, color: corBMM.brancoBMM },
  nomeBMM: { fontSize: 22, fontFamily: fonteBMM.semiBMM, color: corBMM.brancoBMM, marginTop: 14 },
  emailBMM: { fontSize: 13, fontFamily: fonteBMM.regularBMM, color: '#B9CFCC', marginTop: 3 },
  estatisticasBMM: { flexDirection: 'row', marginHorizontal: 20, marginTop: -34, backgroundColor: corBMM.brancoBMM, borderRadius: 22, paddingVertical: 18, ...sombraBMM.forteBMM },
  estatisticaBMM: { flex: 1, alignItems: 'center' },
  divisorBMM: { borderRightWidth: 1, borderRightColor: corBMM.bordaBMM },
  estatisticaValorBMM: { fontSize: 24, fontFamily: fonteBMM.semiBMM, color: corBMM.textoBMM },
  estatisticaRotuloBMM: { fontSize: 12, fontFamily: fonteBMM.regularBMM, color: corBMM.suaveBMM, marginTop: 2 },
  menuBMM: { marginHorizontal: 20, marginTop: 22, backgroundColor: corBMM.brancoBMM, borderRadius: 22, paddingHorizontal: 6, ...sombraBMM.suaveBMM },
  itemBMM: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 15, paddingHorizontal: 12 },
  itemBordaBMM: { borderBottomWidth: 1, borderBottomColor: '#EEF3F2' },
  itemIconeBMM: { width: 40, height: 40, borderRadius: 13, backgroundColor: corBMM.cremeBMM, alignItems: 'center', justifyContent: 'center' },
  itemTextoBMM: { flex: 1, fontSize: 15, fontFamily: fonteBMM.mediaBMM, color: corBMM.textoBMM },
  sairBMM: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginHorizontal: 20, marginTop: 18, height: 54, borderRadius: 18, backgroundColor: '#FCEDEA' },
  sairTextoBMM: { fontSize: 15, fontFamily: fonteBMM.semiBMM, color: corBMM.erroBMM },
});

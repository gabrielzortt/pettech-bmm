import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CabecalhoTela from '@/components/ui/CabecalhoTela';
import FotoBMM from '@/components/ui/FotoBMM';
import ContadorQuantidade from '@/components/ui/ContadorQuantidade';
import BotaoAcao from '@/components/ui/BotaoAcao';
import TelaVazia from '@/components/ui/TelaVazia';
import DialogoConfirmacao from '@/components/ui/DialogoConfirmacao';
import { useCarrinhoBMM, freteGratisAPartirDeBMM } from '@/store';
import { formatarMoedaBMM } from '@/utils/formatadores';
import { coresBMM, fontesBMM, raioBMM, sombrasBMM } from '@/theme';

export default function CarrinhoBMM() {
  const roteadorBMM = useRouter();
  const { itensBMM, totalItensBMM, subtotalBMM, freteBMM, totalBMM, alterarQuantidadeBMM, removerBMM, limparBMM } = useCarrinhoBMM();
  const [esvaziarAbertoBMM, setEsvaziarAbertoBMM] = useState<boolean>(false);

  const faltaParaGratisBMM = Math.max(0, freteGratisAPartirDeBMM - subtotalBMM);

  const resumoBMM = (
    <View style={estilosBMM.resumoBMM}>
      <View style={estilosBMM.linhaResumoBMM}>
        <Text style={estilosBMM.rotuloBMM}>Subtotal</Text>
        <Text style={estilosBMM.valorBMM}>{formatarMoedaBMM(subtotalBMM)}</Text>
      </View>
      <View style={estilosBMM.linhaResumoBMM}>
        <Text style={estilosBMM.rotuloBMM}>Frete</Text>
        <Text style={[estilosBMM.valorBMM, freteBMM === 0 && { color: coresBMM.sucessoBMM }]}>{freteBMM === 0 ? 'Grátis' : formatarMoedaBMM(freteBMM)}</Text>
      </View>
      {faltaParaGratisBMM > 0 && (
        <View style={estilosBMM.dicaBMM}>
          <Ionicons name="bicycle-outline" size={16} color={coresBMM.primariaEscuraBMM} />
          <Text style={estilosBMM.dicaTextoBMM}>Faltam {formatarMoedaBMM(faltaParaGratisBMM)} para o frete grátis</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={estilosBMM.telaBMM}>
      <StatusBar style="dark" />
      <CabecalhoTela
        tituloBMM="Carrinho"
        subtituloBMM={`${totalItensBMM} ${totalItensBMM === 1 ? 'item' : 'itens'}`}
        direitaBMM={itensBMM.length > 0 ? (
          <Pressable onPress={() => setEsvaziarAbertoBMM(true)} hitSlop={8}>
            <Text style={estilosBMM.esvaziarBMM}>Esvaziar</Text>
          </Pressable>
        ) : undefined}
      />
      <FlatList
        data={itensBMM}
        keyExtractor={(itemBMM) => itemBMM.chaveBMM}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<TelaVazia iconeBMM="bag-outline" tituloBMM="Seu carrinho está vazio" textoBMM="Que tal conhecer os produtos inteligentes para o seu pet?" rotuloBotaoBMM="Explorar produtos" aoPressionarBMM={() => roteadorBMM.push('/inicio')} />}
        ListFooterComponent={itensBMM.length > 0 ? resumoBMM : null}
        renderItem={({ item: itemBMM }) => (
          <Pressable style={estilosBMM.itemBMM} onPress={() => roteadorBMM.push({ pathname: '/produto/[id]', params: { id: itemBMM.produtoBMM.idBMM } })}>
            <FotoBMM origemBMM={itemBMM.produtoBMM.imagemBMM} reservaBMM={itemBMM.produtoBMM.imagemReservaBMM} estiloBMM={estilosBMM.fotoBMM} />
            <View style={{ flex: 1, gap: 3 }}>
              <Text style={estilosBMM.nomeBMM} numberOfLines={1}>{itemBMM.produtoBMM.nomeBMM}</Text>
              <Text style={estilosBMM.detalheBMM} numberOfLines={1}>Porte {itemBMM.porteBMM} · {formatarMoedaBMM(itemBMM.produtoBMM.precoBMM)} cada</Text>
              <Text style={estilosBMM.precoBMM}>{formatarMoedaBMM(itemBMM.produtoBMM.precoBMM * itemBMM.quantidadeBMM)}</Text>
              <View style={estilosBMM.acoesBMM}>
                <ContadorQuantidade valorBMM={itemBMM.quantidadeBMM} aoDiminuirBMM={() => alterarQuantidadeBMM(itemBMM.chaveBMM, -1)} aoAumentarBMM={() => alterarQuantidadeBMM(itemBMM.chaveBMM, 1)} />
                <Pressable style={estilosBMM.lixoBMM} onPress={() => removerBMM(itemBMM.chaveBMM)} accessibilityLabel="Remover item">
                  <Ionicons name="trash-outline" size={19} color={coresBMM.perigoBMM} />
                </Pressable>
              </View>
            </View>
          </Pressable>
        )}
      />
      {itensBMM.length > 0 && (
        <View style={estilosBMM.rodapeBMM}>
          <View>
            <Text style={estilosBMM.totalRotuloBMM}>Total</Text>
            <Text style={estilosBMM.totalBMM}>{formatarMoedaBMM(totalBMM)}</Text>
          </View>
          <BotaoAcao tituloBMM="Ir para o pagamento" iconeBMM="arrow-forward" aoPressionarBMM={() => roteadorBMM.push('/checkout')} estiloBMM={{ flex: 1 }} />
        </View>
      )}
      <DialogoConfirmacao visivelBMM={esvaziarAbertoBMM} tituloBMM="Esvaziar carrinho?" textoBMM="Todos os itens serão removidos do carrinho." rotuloConfirmarBMM="Esvaziar" perigoBMM aoConfirmarBMM={() => { limparBMM(); setEsvaziarAbertoBMM(false); }} aoCancelarBMM={() => setEsvaziarAbertoBMM(false)} />
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  telaBMM: { flex: 1, backgroundColor: coresBMM.fundoBMM },
  esvaziarBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 13, color: coresBMM.perigoBMM },
  itemBMM: { flexDirection: 'row', gap: 14, backgroundColor: coresBMM.superficieBMM, borderRadius: raioBMM.lgBMM, padding: 10, marginBottom: 12, ...sombrasBMM.leveBMM },
  fotoBMM: { width: 96, height: 112, borderRadius: raioBMM.mdBMM },
  nomeBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 15, color: coresBMM.tintaBMM },
  detalheBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 12, color: coresBMM.tintaSuaveBMM },
  precoBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 15, color: coresBMM.primariaEscuraBMM },
  acoesBMM: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  lixoBMM: { width: 36, height: 36, borderRadius: 11, backgroundColor: coresBMM.perigoFundoBMM, alignItems: 'center', justifyContent: 'center' },
  resumoBMM: { backgroundColor: coresBMM.superficieBMM, borderRadius: raioBMM.lgBMM, padding: 16, gap: 12, marginTop: 4, ...sombrasBMM.leveBMM },
  linhaResumoBMM: { flexDirection: 'row', justifyContent: 'space-between' },
  rotuloBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 14, color: coresBMM.tintaSuaveBMM },
  valorBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 14, color: coresBMM.tintaBMM },
  dicaBMM: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: coresBMM.primariaFundoBMM, borderRadius: raioBMM.smBMM, paddingHorizontal: 12, paddingVertical: 9 },
  dicaTextoBMM: { flex: 1, fontFamily: fontesBMM.mediaBMM, fontSize: 12, color: coresBMM.primariaEscuraBMM },
  rodapeBMM: { flexDirection: 'row', alignItems: 'center', gap: 18, paddingHorizontal: 20, paddingVertical: 14, backgroundColor: coresBMM.superficieBMM, ...sombrasBMM.elevadaBMM },
  totalRotuloBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 12, color: coresBMM.tintaSuaveBMM },
  totalBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 21, color: coresBMM.tintaBMM },
});

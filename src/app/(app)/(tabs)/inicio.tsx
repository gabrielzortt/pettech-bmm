import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductList from '@/components/produto/ProductList';
import FiltroCategorias from '@/components/produto/FiltroCategorias';
import TelaVazia from '@/components/ui/TelaVazia';
import { categoriasBMM, ordenarProdutosBMM, ordensBMM } from '@/data/catalogo';
import { useProdutosBMM } from '@/hooks/useProdutos';
import { useAuthBMM } from '@/store';
import { OrdemBMM } from '@/types';
import { primeiroNomeBMM } from '@/utils/formatadores';
import { coresBMM, fontesBMM, raioBMM, sombrasBMM } from '@/theme';

export default function InicioBMM() {
  const roteadorBMM = useRouter();
  const insetsBMM = useSafeAreaInsets();
  const { usuarioBMM } = useAuthBMM();
  const { produtosBMM, origemBMM, carregandoBMM, atualizandoBMM, erroBMM, recarregarBMM, atualizarBMM } = useProdutosBMM();
  const [buscaBMM, setBuscaBMM] = useState<string>('');
  const [categoriaBMM, setCategoriaBMM] = useState<string>(categoriasBMM[0]);
  const [ordemBMM, setOrdemBMM] = useState<OrdemBMM>('relevancia');
  const [ordenarAbertoBMM, setOrdenarAbertoBMM] = useState<boolean>(false);

  const listaBMM = useMemo(() => {
    const termoBMM = buscaBMM.trim().toLowerCase();
    const filtradaBMM = produtosBMM.filter(
      (pBMM) =>
        (categoriaBMM === 'Todos' || pBMM.categoriaBMM === categoriaBMM) &&
        (termoBMM === '' || `${pBMM.nomeBMM} ${pBMM.subtituloBMM}`.toLowerCase().includes(termoBMM))
    );
    return ordenarProdutosBMM(filtradaBMM, ordemBMM);
  }, [produtosBMM, buscaBMM, categoriaBMM, ordemBMM]);

  const rotuloOrdemBMM = ordensBMM.find((oBMM) => oBMM.chaveBMM === ordemBMM)?.rotuloBMM ?? '';

  const abrirDetalhesBMM = (idBMM: string) => roteadorBMM.push({ pathname: '/produto/[id]', params: { id: idBMM } });

  const estadoVazioBMM = carregandoBMM ? (
    <View style={estilosBMM.carregandoBMM}>
      <ActivityIndicator size="large" color={coresBMM.primariaBMM} />
      <Text style={estilosBMM.carregandoTextoBMM}>Buscando produtos...</Text>
    </View>
  ) : erroBMM !== '' ? (
    <TelaVazia iconeBMM="cloud-offline-outline" tituloBMM="Sem conexão com a API" textoBMM={erroBMM} rotuloBotaoBMM="Tentar novamente" aoPressionarBMM={recarregarBMM} />
  ) : (
    <TelaVazia iconeBMM="search-outline" tituloBMM="Nada encontrado" textoBMM="Tente outro nome ou escolha outra categoria." rotuloBotaoBMM="Limpar filtros" aoPressionarBMM={() => { setBuscaBMM(''); setCategoriaBMM('Todos'); }} />
  );

  const cabecalhoListaBMM = (
    <View style={{ marginHorizontal: -20 }}>
      {origemBMM === 'local' && (
        <Pressable style={estilosBMM.avisoBMM} onPress={recarregarBMM}>
          <Ionicons name="cloud-offline-outline" size={16} color={coresBMM.primariaEscuraBMM} />
          <Text style={estilosBMM.avisoTextoBMM}>Modo demonstração: API indisponível. Toque para tentar de novo.</Text>
        </Pressable>
      )}
      <FiltroCategorias opcoesBMM={categoriasBMM} selecionadaBMM={categoriaBMM} aoSelecionarBMM={setCategoriaBMM} />
      {!carregandoBMM && erroBMM === '' && (
        <Text style={estilosBMM.resumoBMM}>{listaBMM.length} {listaBMM.length === 1 ? 'produto' : 'produtos'} · {rotuloOrdemBMM}</Text>
      )}
    </View>
  );

  return (
    <View style={estilosBMM.telaBMM}>
      <StatusBar style="light" />
      <View style={[estilosBMM.topoBMM, { paddingTop: insetsBMM.top + 16 }]}>
        <View style={estilosBMM.linhaTopoBMM}>
          <View>
            <Text style={estilosBMM.rotuloBMM}>Entregar em</Text>
            <View style={estilosBMM.localBMM}>
              <Text style={estilosBMM.localTextoBMM}>Manaus, AM</Text>
              <Ionicons name="chevron-down" size={16} color={coresBMM.brancoBMM} />
            </View>
          </View>
          <Pressable style={estilosBMM.avatarBMM} onPress={() => roteadorBMM.push('/perfil')} accessibilityLabel="Abrir perfil">
            <Text style={estilosBMM.avatarTextoBMM}>{(usuarioBMM?.nomeBMM ?? 'P').charAt(0).toUpperCase()}</Text>
          </Pressable>
        </View>
        <Text style={estilosBMM.saudacaoBMM}>Olá, {primeiroNomeBMM(usuarioBMM?.nomeBMM ?? '')}! O que seu pet precisa hoje?</Text>
      </View>

      <View style={estilosBMM.buscaBMM}>
        <Ionicons name="search-outline" size={23} color={coresBMM.tintaBMM} />
        <TextInput style={estilosBMM.buscaEntradaBMM} placeholder="Buscar produtos" placeholderTextColor={coresBMM.tintaSuaveBMM} value={buscaBMM} onChangeText={setBuscaBMM} returnKeyType="search" />
        {buscaBMM !== '' && (
          <Pressable onPress={() => setBuscaBMM('')} hitSlop={8} accessibilityLabel="Limpar busca">
            <Ionicons name="close-circle" size={20} color={coresBMM.inativoBMM} />
          </Pressable>
        )}
        <Pressable style={estilosBMM.filtroBMM} onPress={() => setOrdenarAbertoBMM(true)} accessibilityLabel="Ordenar produtos">
          <Ionicons name="options-outline" size={21} color={coresBMM.brancoBMM} />
        </Pressable>
      </View>

      <ProductList produtosBMM={listaBMM} aoAbrirBMM={abrirDetalhesBMM} cabecalhoBMM={cabecalhoListaBMM} vazioBMM={estadoVazioBMM} atualizandoBMM={atualizandoBMM} aoAtualizarBMM={atualizarBMM} />

      <Modal visible={ordenarAbertoBMM} transparent animationType="slide" onRequestClose={() => setOrdenarAbertoBMM(false)}>
        <Pressable style={estilosBMM.fundoModalBMM} onPress={() => setOrdenarAbertoBMM(false)}>
          <Pressable style={estilosBMM.folhaBMM} onPress={() => undefined}>
            <View style={estilosBMM.alcaBMM} />
            <Text style={estilosBMM.folhaTituloBMM}>Ordenar por</Text>
            {ordensBMM.map((opcaoBMM) => {
              const ativaBMM = opcaoBMM.chaveBMM === ordemBMM;
              return (
                <Pressable key={opcaoBMM.chaveBMM} style={[estilosBMM.opcaoBMM, ativaBMM && { backgroundColor: coresBMM.primariaFundoBMM }]} onPress={() => { setOrdemBMM(opcaoBMM.chaveBMM); setOrdenarAbertoBMM(false); }}>
                  <Text style={[estilosBMM.opcaoTextoBMM, ativaBMM && { fontFamily: fontesBMM.negritoBMM, color: coresBMM.primariaEscuraBMM }]}>{opcaoBMM.rotuloBMM}</Text>
                  {ativaBMM && <Ionicons name="checkmark-circle" size={22} color={coresBMM.primariaBMM} />}
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  telaBMM: { flex: 1, backgroundColor: coresBMM.fundoBMM },
  topoBMM: { backgroundColor: coresBMM.petroleoBMM, paddingHorizontal: 20, paddingBottom: 48 },
  linhaTopoBMM: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rotuloBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 12, color: '#9FB8B5' },
  localBMM: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3 },
  localTextoBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 15, color: coresBMM.brancoBMM },
  avatarBMM: { width: 44, height: 44, borderRadius: 15, backgroundColor: coresBMM.primariaBMM, alignItems: 'center', justifyContent: 'center' },
  avatarTextoBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 18, color: coresBMM.brancoBMM },
  saudacaoBMM: { fontFamily: fontesBMM.mediaBMM, fontSize: 14, color: '#D5E3E1', marginTop: 16 },
  buscaBMM: { flexDirection: 'row', alignItems: 'center', gap: 10, height: 58, marginTop: -29, marginHorizontal: 20, backgroundColor: coresBMM.superficieBMM, borderRadius: raioBMM.lgBMM, paddingLeft: 16, paddingRight: 7, zIndex: 2, ...sombrasBMM.elevadaBMM },
  buscaEntradaBMM: { flex: 1, height: '100%', fontFamily: fontesBMM.regularBMM, fontSize: 14, color: coresBMM.tintaBMM },
  filtroBMM: { width: 44, height: 44, borderRadius: 13, backgroundColor: coresBMM.primariaBMM, alignItems: 'center', justifyContent: 'center' },
  avisoBMM: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 20, marginTop: 14, backgroundColor: coresBMM.primariaFundoBMM, borderRadius: raioBMM.mdBMM, paddingHorizontal: 12, paddingVertical: 10 },
  avisoTextoBMM: { flex: 1, fontFamily: fontesBMM.mediaBMM, fontSize: 12, color: coresBMM.primariaEscuraBMM },
  resumoBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 12, color: coresBMM.tintaSuaveBMM, marginHorizontal: 20, marginBottom: 12, marginTop: -4 },
  carregandoBMM: { alignItems: 'center', paddingVertical: 64, gap: 14 },
  carregandoTextoBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 14, color: coresBMM.tintaSuaveBMM },
  fundoModalBMM: { flex: 1, backgroundColor: 'rgba(10,31,36,0.5)', justifyContent: 'flex-end' },
  folhaBMM: { backgroundColor: coresBMM.superficieBMM, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24, paddingBottom: 36 },
  alcaBMM: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: coresBMM.linhaBMM, marginBottom: 18 },
  folhaTituloBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 19, color: coresBMM.tintaBMM, marginBottom: 10 },
  opcaoBMM: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, paddingHorizontal: 14, borderRadius: raioBMM.mdBMM },
  opcaoTextoBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 15, color: coresBMM.tintaBMM },
});

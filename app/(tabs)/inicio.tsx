import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductListBMM from '../../components/ProductListBMM';
import CategoriaChipsBMM from '../../components/CategoriaChipsBMM';
import EstadoVazioBMM from '../../components/EstadoVazioBMM';
import { OrdemBMM, filtrosBMM, filtrarPorChipBMM, ordenarBMM, ordensBMM } from '../../data/catalogoBMM';
import { useProdutosBMM } from '../../hooks/useProdutosBMM';
import { useLojaBMM } from '../../context/LojaBMM';
import { corBMM, fonteBMM, sombraBMM } from '../../constants/temaBMM';

export default function InicioBMM() {
  const roteadorBMM = useRouter();
  const insetsBMM = useSafeAreaInsets();
  const { usuarioBMM } = useLojaBMM();
  const { produtosBMM, origemBMM, carregandoBMM, erroBMM, recarregarBMM } = useProdutosBMM();
  const [buscaBMM, setBuscaBMM] = useState<string>('');
  const [filtroBMM, setFiltroBMM] = useState<string>(filtrosBMM[0]);
  const [ordemBMM, setOrdemBMM] = useState<OrdemBMM>('relevancia');
  const [ordenarAbertoBMM, setOrdenarAbertoBMM] = useState<boolean>(false);

  const listaBMM = useMemo(() => {
    const termoBMM = buscaBMM.trim().toLowerCase();
    const filtradaBMM = produtosBMM.filter(
      (pBMM) => filtrarPorChipBMM(pBMM, filtroBMM) && (termoBMM === '' || `${pBMM.nomeBMM} ${pBMM.subtituloBMM}`.toLowerCase().includes(termoBMM))
    );
    return ordenarBMM(filtradaBMM, ordemBMM);
  }, [produtosBMM, buscaBMM, filtroBMM, ordemBMM]);

  const estadoVazioBMM = carregandoBMM ? (
    <View style={estilosBMM.carregandoBMM}>
      <ActivityIndicator size="large" color={corBMM.laranjaBMM} />
      <Text style={estilosBMM.carregandoTextoBMM}>Buscando produtos...</Text>
    </View>
  ) : erroBMM !== '' ? (
    <EstadoVazioBMM iconeBMM="cloud-offline-outline" tituloBMM="Sem conexão com a API" textoBMM={erroBMM} botaoBMM="Tentar novamente" aoPressionarBMM={recarregarBMM} />
  ) : (
    <EstadoVazioBMM iconeBMM="search-outline" tituloBMM="Nada encontrado" textoBMM="Tente buscar por outro nome ou mude a categoria." botaoBMM="Limpar filtros" aoPressionarBMM={() => { setBuscaBMM(''); setFiltroBMM('Todos'); }} />
  );

  return (
    <View style={estilosBMM.telaBMM}>
      <StatusBar style="light" />
      <View style={[estilosBMM.topoBMM, { paddingTop: insetsBMM.top + 18 }]}>
        <View style={estilosBMM.linhaTopoBMM}>
          <View>
            <Text style={estilosBMM.rotuloBMM}>Entregar em</Text>
            <View style={estilosBMM.localBMM}>
              <Text style={estilosBMM.localTextoBMM}>Manaus, AM</Text>
              <Ionicons name="chevron-down" size={16} color={corBMM.brancoBMM} />
            </View>
          </View>
          <TouchableOpacity style={estilosBMM.avatarBMM} onPress={() => roteadorBMM.push('/perfil')} accessibilityLabel="Perfil">
            <Text style={estilosBMM.avatarTextoBMM}>{(usuarioBMM?.nomeBMM ?? 'C').charAt(0).toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={estilosBMM.buscaBMM}>
        <Ionicons name="search-outline" size={24} color={corBMM.textoBMM} />
        <TextInput
          style={estilosBMM.buscaEntradaBMM}
          placeholder="Buscar produtos para o seu pet"
          placeholderTextColor={corBMM.suaveBMM}
          value={buscaBMM}
          onChangeText={setBuscaBMM}
        />
        <TouchableOpacity style={estilosBMM.filtroBMM} activeOpacity={0.85} onPress={() => setOrdenarAbertoBMM(true)} accessibilityLabel="Ordenar">
          <Ionicons name="options-outline" size={22} color={corBMM.brancoBMM} />
        </TouchableOpacity>
      </View>

      <ProductListBMM
        produtosBMM={listaBMM}
        aoAbrirBMM={(idBMM) => roteadorBMM.push({ pathname: '/produto/[id]', params: { id: idBMM } })}
        cabecalhoBMM={
          <View style={{ marginHorizontal: -20 }}>
            {origemBMM === 'local' && (
              <TouchableOpacity style={estilosBMM.avisoBMM} onPress={recarregarBMM} activeOpacity={0.8}>
                <Ionicons name="cloud-offline-outline" size={16} color={corBMM.laranjaEscuroBMM} />
                <Text style={estilosBMM.avisoTextoBMM}>Modo demonstração: API indisponível. Toque para tentar de novo.</Text>
              </TouchableOpacity>
            )}
            <CategoriaChipsBMM opcoesBMM={filtrosBMM} selecionadaBMM={filtroBMM} aoSelecionarBMM={setFiltroBMM} />
          </View>
        }
        vazioBMM={estadoVazioBMM}
      />

      <Modal visible={ordenarAbertoBMM} transparent animationType="slide" onRequestClose={() => setOrdenarAbertoBMM(false)}>
        <Pressable style={estilosBMM.fundoModalBMM} onPress={() => setOrdenarAbertoBMM(false)}>
          <Pressable style={estilosBMM.folhaBMM} onPress={() => undefined}>
            <View style={estilosBMM.alcaBMM} />
            <Text style={estilosBMM.folhaTituloBMM}>Ordenar por</Text>
            {ordensBMM.map((oBMM) => {
              const ativaBMM = oBMM.chaveBMM === ordemBMM;
              return (
                <TouchableOpacity key={oBMM.chaveBMM} style={[estilosBMM.opcaoBMM, ativaBMM && estilosBMM.opcaoAtivaBMM]} onPress={() => { setOrdemBMM(oBMM.chaveBMM); setOrdenarAbertoBMM(false); }}>
                  <Text style={[estilosBMM.opcaoTextoBMM, ativaBMM && { fontFamily: fonteBMM.semiBMM, color: corBMM.laranjaEscuroBMM }]}>{oBMM.rotuloBMM}</Text>
                  {ativaBMM && <Ionicons name="checkmark-circle" size={22} color={corBMM.laranjaBMM} />}
                </TouchableOpacity>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  telaBMM: { flex: 1, backgroundColor: corBMM.fundoBMM },
  topoBMM: { backgroundColor: corBMM.petroleoBMM, paddingHorizontal: 20, paddingBottom: 50 },
  linhaTopoBMM: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rotuloBMM: { fontSize: 12, fontFamily: fonteBMM.regularBMM, color: '#9FB8B5' },
  localBMM: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  localTextoBMM: { fontSize: 15, fontFamily: fonteBMM.semiBMM, color: corBMM.brancoBMM },
  avatarBMM: { width: 46, height: 46, borderRadius: 16, backgroundColor: corBMM.laranjaBMM, alignItems: 'center', justifyContent: 'center' },
  avatarTextoBMM: { fontSize: 18, fontFamily: fonteBMM.semiBMM, color: corBMM.brancoBMM },
  buscaBMM: {
    flexDirection: 'row', alignItems: 'center', gap: 10, height: 58, marginTop: -29, marginHorizontal: 20,
    backgroundColor: corBMM.brancoBMM, borderRadius: 18, paddingLeft: 16, paddingRight: 7, zIndex: 2, ...sombraBMM.forteBMM,
  },
  buscaEntradaBMM: { flex: 1, height: '100%', fontSize: 14, fontFamily: fonteBMM.regularBMM, color: corBMM.textoBMM },
  filtroBMM: { width: 44, height: 44, borderRadius: 13, backgroundColor: corBMM.laranjaBMM, alignItems: 'center', justifyContent: 'center' },
  avisoBMM: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 20, marginTop: 14, backgroundColor: corBMM.areiaBMM, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10 },
  avisoTextoBMM: { flex: 1, fontSize: 12, fontFamily: fonteBMM.mediaBMM, color: corBMM.laranjaEscuroBMM },
  carregandoBMM: { alignItems: 'center', paddingVertical: 64, gap: 14 },
  carregandoTextoBMM: { fontSize: 14, fontFamily: fonteBMM.regularBMM, color: corBMM.suaveBMM },
  fundoModalBMM: { flex: 1, backgroundColor: 'rgba(10,31,36,0.5)', justifyContent: 'flex-end' },
  folhaBMM: { backgroundColor: corBMM.brancoBMM, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24, paddingBottom: 36 },
  alcaBMM: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: corBMM.bordaBMM, marginBottom: 18 },
  folhaTituloBMM: { fontSize: 20, fontFamily: fonteBMM.semiBMM, color: corBMM.textoBMM, marginBottom: 10 },
  opcaoBMM: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 14, borderRadius: 14 },
  opcaoAtivaBMM: { backgroundColor: corBMM.cremeBMM },
  opcaoTextoBMM: { fontSize: 15, fontFamily: fonteBMM.regularBMM, color: corBMM.textoBMM },
});

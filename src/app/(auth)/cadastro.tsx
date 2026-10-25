import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BotaoAcao from '@/components/ui/BotaoAcao';
import CampoTexto from '@/components/ui/CampoTexto';
import { useAuthBMM, useFeedbackBMM } from '@/store';
import { emailValidoBMM } from '@/utils/validadores';
import { coresBMM, fontesBMM } from '@/theme';

interface ErrosCadastroBMM {
  nomeBMM?: string;
  emailBMM?: string;
  senhaBMM?: string;
  confirmacaoBMM?: string;
}

export default function CadastroBMM() {
  const roteadorBMM = useRouter();
  const insetsBMM = useSafeAreaInsets();
  const { cadastrarBMM } = useAuthBMM();
  const { mostrarBMM } = useFeedbackBMM();
  const [nomeBMM, setNomeBMM] = useState<string>('');
  const [emailBMM, setEmailBMM] = useState<string>('');
  const [senhaBMM, setSenhaBMM] = useState<string>('');
  const [confirmacaoBMM, setConfirmacaoBMM] = useState<string>('');
  const [errosBMM, setErrosBMM] = useState<ErrosCadastroBMM>({});

  const validarCadastroBMM = (): ErrosCadastroBMM => {
    const novosErrosBMM: ErrosCadastroBMM = {};
    if (nomeBMM.trim().length < 2) novosErrosBMM.nomeBMM = 'Informe seu nome completo.';
    if (!emailValidoBMM(emailBMM)) novosErrosBMM.emailBMM = 'Informe um e-mail válido, como nome@email.com.';
    if (senhaBMM.length < 6) novosErrosBMM.senhaBMM = 'A senha deve ter pelo menos 6 caracteres.';
    if (confirmacaoBMM !== senhaBMM) novosErrosBMM.confirmacaoBMM = 'As senhas não conferem.';
    return novosErrosBMM;
  };

  const criarContaBMM = () => {
    const encontradosBMM = validarCadastroBMM();
    if (Object.keys(encontradosBMM).length > 0) {
      setErrosBMM(encontradosBMM);
      return;
    }
    const erroServicoBMM = cadastrarBMM({ nomeBMM, emailBMM, senhaBMM });
    if (erroServicoBMM) {
      setErrosBMM({ emailBMM: erroServicoBMM });
      return;
    }
    mostrarBMM('Conta criada com sucesso! Bem-vindo(a) ao PetTech.');
  };

  return (
    <KeyboardAvoidingView style={estilosBMM.telaBMM} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={[estilosBMM.conteudoBMM, { paddingTop: insetsBMM.top + 16, paddingBottom: insetsBMM.bottom + 28 }]} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Pressable style={estilosBMM.voltarBMM} onPress={() => (roteadorBMM.canGoBack() ? roteadorBMM.back() : roteadorBMM.replace('/entrar'))} accessibilityLabel="Voltar">
          <Ionicons name="chevron-back" size={22} color={coresBMM.brancoBMM} />
        </Pressable>

        <View style={estilosBMM.selosBMM}>
          <Ionicons name="paw" size={30} color={coresBMM.primariaBMM} />
        </View>
        <Text style={estilosBMM.tituloBMM}>Criar conta</Text>
        <Text style={estilosBMM.subtituloBMM}>Leva menos de um minuto. Depois é só escolher os produtos do seu pet.</Text>

        <View style={{ gap: 14, marginTop: 10 }}>
          <CampoTexto escuroBMM iconeBMM="person-outline" placeholderBMM="Nome completo" valorBMM={nomeBMM} aoMudarBMM={setNomeBMM} capitalizarBMM="words" erroBMM={errosBMM.nomeBMM} />
          <CampoTexto escuroBMM iconeBMM="mail-outline" placeholderBMM="E-mail" valorBMM={emailBMM} aoMudarBMM={setEmailBMM} tecladoBMM="email-address" erroBMM={errosBMM.emailBMM} />
          <CampoTexto escuroBMM iconeBMM="lock-closed-outline" placeholderBMM="Senha (mínimo 6 caracteres)" valorBMM={senhaBMM} aoMudarBMM={setSenhaBMM} senhaBMM erroBMM={errosBMM.senhaBMM} />
          <CampoTexto escuroBMM iconeBMM="shield-checkmark-outline" placeholderBMM="Confirmar senha" valorBMM={confirmacaoBMM} aoMudarBMM={setConfirmacaoBMM} senhaBMM aoEnviarBMM={criarContaBMM} erroBMM={errosBMM.confirmacaoBMM} />
        </View>

        <BotaoAcao tituloBMM="Criar conta" aoPressionarBMM={criarContaBMM} estiloBMM={{ marginTop: 22 }} />

        <View style={estilosBMM.rodapeBMM}>
          <Text style={estilosBMM.rodapeTextoBMM}>Já tem uma conta?</Text>
          <Link href="/entrar" replace style={estilosBMM.rodapeLinkBMM}>Entrar</Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilosBMM = StyleSheet.create({
  telaBMM: { flex: 1, backgroundColor: coresBMM.petroleoBMM },
  conteudoBMM: { paddingHorizontal: 28, flexGrow: 1 },
  voltarBMM: { width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  selosBMM: { width: 64, height: 64, borderRadius: 22, backgroundColor: 'rgba(240,138,36,0.16)', alignItems: 'center', justifyContent: 'center', marginTop: 26 },
  tituloBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 28, color: coresBMM.brancoBMM, marginTop: 16 },
  subtituloBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 14, lineHeight: 21, color: '#B9CFCC', marginTop: 6 },
  rodapeBMM: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 22 },
  rodapeTextoBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 14, color: '#B9CFCC' },
  rodapeLinkBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 14, color: coresBMM.primariaBMM },
});

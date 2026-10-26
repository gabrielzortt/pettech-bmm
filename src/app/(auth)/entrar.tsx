import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BotaoAcao from '@/components/ui/BotaoAcao';
import CampoTexto from '@/components/ui/CampoTexto';
import { useAuthBMM, usuarioPadraoBMM } from '@/store';
import FotoBMM from '@/components/ui/FotoBMM';
import { heroLoginBMM } from '@/data/imagensLocais';
import { fotosRemotasBMM } from '@/data/imagensRemotas';
import { coresBMM, fontesBMM } from '@/theme';

export default function EntrarBMM() {
  const roteadorBMM = useRouter();
  const insetsBMM = useSafeAreaInsets();
  const { height: alturaBMM } = useWindowDimensions();
  const { entrarBMM } = useAuthBMM();
  const [emailBMM, setEmailBMM] = useState<string>('');
  const [senhaBMM, setSenhaBMM] = useState<string>('');
  const [erroBMM, setErroBMM] = useState<string>('');

  const verificarLoginBMM = () => {
    const resultadoBMM = entrarBMM(emailBMM, senhaBMM);
    setErroBMM(resultadoBMM ?? '');
  };

  const preencherContaTesteBMM = () => {
    setEmailBMM(usuarioPadraoBMM.emailBMM);
    setSenhaBMM(usuarioPadraoBMM.senhaBMM);
    setErroBMM('');
  };

  const erroEmailBMM = erroBMM.startsWith('E-mail') || erroBMM.startsWith('Preencha');
  const erroSenhaBMM = erroBMM.startsWith('Senha') || erroBMM.startsWith('Preencha');

  return (
    <KeyboardAvoidingView style={estilosBMM.telaBMM} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" bounces={false} showsVerticalScrollIndicator={false}>
        <View style={{ height: Math.max(alturaBMM * 0.4, 280) }}>
          <FotoBMM origemBMM={{ uri: fotosRemotasBMM.loginBMM }} reservaBMM={heroLoginBMM} estiloBMM={StyleSheet.absoluteFill} />
          <LinearGradient colors={['rgba(15,43,49,0)', coresBMM.petroleoBMM]} style={StyleSheet.absoluteFill} />
          <Pressable
            style={[estilosBMM.voltarBMM, { top: insetsBMM.top + 12 }]}
            onPress={() => (roteadorBMM.canGoBack() ? roteadorBMM.back() : roteadorBMM.replace('/'))}
            accessibilityLabel="Voltar"
          >
            <Ionicons name="chevron-back" size={22} color={coresBMM.brancoBMM} />
          </Pressable>
        </View>

        <View style={estilosBMM.painelBMM}>
          <Text style={estilosBMM.tituloBMM}>Bem-vindo ao PetTech</Text>
          <Text style={estilosBMM.subtituloBMM}>Entre para cuidar do seu pet com tecnologia.</Text>

          <View style={{ gap: 14, marginTop: 6 }}>
            <CampoTexto escuroBMM iconeBMM="mail-outline" placeholderBMM="E-mail" valorBMM={emailBMM} aoMudarBMM={setEmailBMM} tecladoBMM="email-address" marcarErroBMM={erroEmailBMM} />
            <CampoTexto escuroBMM iconeBMM="lock-closed-outline" placeholderBMM="Senha" valorBMM={senhaBMM} aoMudarBMM={setSenhaBMM} senhaBMM aoEnviarBMM={verificarLoginBMM} marcarErroBMM={erroSenhaBMM} />
          </View>

          {erroBMM !== '' && (
            <View style={estilosBMM.avisoBMM}>
              <Ionicons name="alert-circle" size={18} color={coresBMM.perigoClaroBMM} />
              <Text style={estilosBMM.avisoTextoBMM}>{erroBMM}</Text>
            </View>
          )}

          <BotaoAcao tituloBMM="Entrar" aoPressionarBMM={verificarLoginBMM} estiloBMM={{ marginTop: 6 }} />

          <Pressable onPress={preencherContaTesteBMM} style={estilosBMM.linkBMM}>
            <Text style={estilosBMM.linkTextoBMM}>Preencher com a conta de teste</Text>
          </Pressable>

          <View style={estilosBMM.rodapeBMM}>
            <Text style={estilosBMM.rodapeTextoBMM}>Ainda não tem conta?</Text>
            <Link href="/cadastro" style={estilosBMM.rodapeLinkBMM}>Criar conta</Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilosBMM = StyleSheet.create({
  telaBMM: { flex: 1, backgroundColor: coresBMM.petroleoBMM },
  voltarBMM: { position: 'absolute', left: 20, width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' },
  painelBMM: { flex: 1, backgroundColor: coresBMM.petroleoBMM, paddingHorizontal: 28, paddingBottom: 32, gap: 14, marginTop: -10 },
  tituloBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 26, color: coresBMM.brancoBMM },
  subtituloBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 14, color: '#B9CFCC', marginTop: -6 },
  avisoBMM: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(229,72,77,0.16)', borderRadius: 14, padding: 12 },
  avisoTextoBMM: { flex: 1, fontFamily: fontesBMM.mediaBMM, fontSize: 13, color: coresBMM.perigoClaroBMM },
  linkBMM: { alignSelf: 'center', padding: 4 },
  linkTextoBMM: { fontFamily: fontesBMM.mediaBMM, fontSize: 13, color: coresBMM.primariaClaraBMM },
  rodapeBMM: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 6 },
  rodapeTextoBMM: { fontFamily: fontesBMM.regularBMM, fontSize: 14, color: '#B9CFCC' },
  rodapeLinkBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 14, color: coresBMM.primariaBMM },
});

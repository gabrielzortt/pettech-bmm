import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagemBMM from '../components/ImagemBMM';
import CampoBMM from '../components/CampoBMM';
import BotaoBMM from '../components/BotaoBMM';
import { useLojaBMM } from '../context/LojaBMM';
import { corBMM, fonteBMM } from '../constants/temaBMM';
import { imagensBMM } from '../constants/imagensBMM';

export default function LoginBMM() {
  const roteadorBMM = useRouter();
  const insetsBMM = useSafeAreaInsets();
  const { height: alturaBMM } = useWindowDimensions();
  const { entrarBMM } = useLojaBMM();
  const [emailBMM, setEmailBMM] = useState<string>('');
  const [senhaBMM, setSenhaBMM] = useState<string>('');
  const [erroBMM, setErroBMM] = useState<string>('');

  const verificarLoginBMM = () => {
    const resultadoBMM = entrarBMM(emailBMM, senhaBMM);
    if (resultadoBMM) {
      setErroBMM(resultadoBMM);
      return;
    }
    setErroBMM('');
    roteadorBMM.replace('/inicio');
  };

  const usarContaTesteBMM = () => {
    setEmailBMM('cliente@pettech.com');
    setSenhaBMM('123456');
    setErroBMM('');
  };

  const erroEmailBMM = erroBMM.startsWith('E-mail') || erroBMM.startsWith('Preencha');
  const erroSenhaBMM = erroBMM.startsWith('Senha') || erroBMM.startsWith('Preencha');

  return (
    <KeyboardAvoidingView style={estilosBMM.telaBMM} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" bounces={false} showsVerticalScrollIndicator={false}>
        <View style={{ height: Math.max(alturaBMM * 0.42, 300) }}>
          <ImagemBMM escuroBMM uriBMM={imagensBMM.loginBMM} estiloBMM={{ width: '100%', height: '100%', borderRadius: 0 }} />
          <TouchableOpacity
            style={[estilosBMM.voltarBMM, { top: insetsBMM.top + 12 }]}
            onPress={() => (roteadorBMM.canGoBack() ? roteadorBMM.back() : roteadorBMM.replace('/'))}
            accessibilityLabel="Voltar"
          >
            <Ionicons name="chevron-back" size={22} color={corBMM.brancoBMM} />
          </TouchableOpacity>
        </View>

        <View style={estilosBMM.painelBMM}>
          <Text style={estilosBMM.tituloBMM}>Bem-vindo ao PetTech</Text>
          <Text style={estilosBMM.subtituloBMM}>Entre para cuidar do seu pet com tecnologia.</Text>
          <View style={{ gap: 14, marginTop: 8 }}>
            <CampoBMM iconeBMM="mail-outline" placeholderBMM="E-mail" valorBMM={emailBMM} aoMudarBMM={setEmailBMM} tecladoBMM="email-address" comErroBMM={erroEmailBMM} />
            <CampoBMM iconeBMM="lock-closed-outline" placeholderBMM="Senha" valorBMM={senhaBMM} aoMudarBMM={setSenhaBMM} senhaBMM aoEnviarBMM={verificarLoginBMM} comErroBMM={erroSenhaBMM} />
          </View>
          {erroBMM !== '' && (
            <View style={estilosBMM.erroBMM}>
              <Ionicons name="alert-circle" size={18} color={corBMM.erroClaroBMM} />
              <Text style={estilosBMM.erroTextoBMM}>{erroBMM}</Text>
            </View>
          )}
          <BotaoBMM tituloBMM="Entrar" aoPressionarBMM={verificarLoginBMM} estiloBMM={{ marginTop: 10 }} />
          <TouchableOpacity onPress={usarContaTesteBMM} style={estilosBMM.testeBMM}>
            <Text style={estilosBMM.testeTextoBMM}>Preencher com a conta de teste</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilosBMM = StyleSheet.create({
  telaBMM: { flex: 1, backgroundColor: corBMM.petroleoBMM },
  voltarBMM: { position: 'absolute', left: 20, width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' },
  painelBMM: { flex: 1, backgroundColor: corBMM.petroleoBMM, marginTop: -34, borderTopLeftRadius: 34, borderTopRightRadius: 34, paddingHorizontal: 28, paddingTop: 30, paddingBottom: 32, gap: 14 },
  tituloBMM: { fontSize: 26, fontFamily: fonteBMM.semiBMM, color: corBMM.brancoBMM },
  subtituloBMM: { fontSize: 14, fontFamily: fonteBMM.regularBMM, color: '#B9CFCC', marginTop: -6 },
  erroBMM: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(229,72,77,0.16)', borderRadius: 14, padding: 12 },
  erroTextoBMM: { flex: 1, color: corBMM.erroClaroBMM, fontSize: 13, fontFamily: fonteBMM.mediaBMM },
  testeBMM: { alignSelf: 'center', padding: 6 },
  testeTextoBMM: { fontSize: 13, fontFamily: fonteBMM.mediaBMM, color: corBMM.laranjaClaroBMM },
});

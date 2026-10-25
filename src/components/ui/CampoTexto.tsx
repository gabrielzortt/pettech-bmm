import React, { useState } from 'react';
import { KeyboardTypeOptions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { coresBMM, fontesBMM, IconeBMM, raioBMM } from '@/theme';

interface CampoTextoPropsBMM {
  iconeBMM?: IconeBMM;
  placeholderBMM: string;
  valorBMM: string;
  aoMudarBMM: (textoBMM: string) => void;
  erroBMM?: string;
  senhaBMM?: boolean;
  tecladoBMM?: KeyboardTypeOptions;
  capitalizarBMM?: 'none' | 'words' | 'sentences';
  aoEnviarBMM?: () => void;
  escuroBMM?: boolean;
  marcarErroBMM?: boolean;
}

export default function CampoTexto({ iconeBMM, placeholderBMM, valorBMM, aoMudarBMM, erroBMM = '', senhaBMM = false, tecladoBMM, capitalizarBMM = 'none', aoEnviarBMM, escuroBMM = false, marcarErroBMM = false }: CampoTextoPropsBMM) {
  const [focoBMM, setFocoBMM] = useState<boolean>(false);
  const [visivelBMM, setVisivelBMM] = useState<boolean>(false);
  const temErroBMM = erroBMM !== '' || marcarErroBMM;

  return (
    <View>
      <View
        style={[
          estilosBMM.campoBMM,
          escuroBMM ? estilosBMM.campoCremeBMM : estilosBMM.campoClaroBMM,
          focoBMM && estilosBMM.focoBMM,
          temErroBMM && { borderColor: coresBMM.perigoBMM },
        ]}
      >
        {iconeBMM ? <Ionicons name={iconeBMM} size={21} color={temErroBMM ? coresBMM.perigoBMM : coresBMM.primariaBMM} /> : null}
        <TextInput
          style={estilosBMM.entradaBMM}
          placeholder={placeholderBMM}
          placeholderTextColor="#8E9A9B"
          value={valorBMM}
          onChangeText={aoMudarBMM}
          secureTextEntry={senhaBMM && !visivelBMM}
          keyboardType={tecladoBMM}
          autoCapitalize={capitalizarBMM}
          autoCorrect={false}
          onFocus={() => setFocoBMM(true)}
          onBlur={() => setFocoBMM(false)}
          onSubmitEditing={aoEnviarBMM}
        />
        {senhaBMM ? (
          <Pressable onPress={() => setVisivelBMM(!visivelBMM)} hitSlop={10} accessibilityLabel="Mostrar ou ocultar senha">
            <Ionicons name={visivelBMM ? 'eye-off-outline' : 'eye-outline'} size={21} color="#8E9A9B" />
          </Pressable>
        ) : null}
      </View>
      {erroBMM !== '' ? <Text style={[estilosBMM.erroBMM, escuroBMM && { color: coresBMM.perigoClaroBMM }]}>{erroBMM}</Text> : null}
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  campoBMM: { flexDirection: 'row', alignItems: 'center', gap: 12, height: 54, borderRadius: raioBMM.pilulaBMM, borderWidth: 1.5, paddingHorizontal: 18 },
  campoCremeBMM: { backgroundColor: '#FFF6EC', borderColor: coresBMM.primariaBMM },
  campoClaroBMM: { backgroundColor: coresBMM.superficieBMM, borderColor: coresBMM.linhaBMM },
  focoBMM: { borderColor: coresBMM.primariaBMM, shadowColor: coresBMM.primariaBMM, shadowOpacity: 0.25, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
  entradaBMM: { flex: 1, height: '100%', fontFamily: fontesBMM.regularBMM, fontSize: 15, color: coresBMM.tintaBMM },
  erroBMM: { marginTop: 6, marginLeft: 18, fontFamily: fontesBMM.mediaBMM, fontSize: 12, color: coresBMM.perigoBMM },
});

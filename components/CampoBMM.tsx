import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { corBMM, fonteBMM, IconeBMM } from '../constants/temaBMM';

interface CampoPropsBMM {
  iconeBMM?: IconeBMM;
  placeholderBMM: string;
  valorBMM: string;
  aoMudarBMM: (textoBMM: string) => void;
  senhaBMM?: boolean;
  tecladoBMM?: KeyboardTypeOptions;
  comErroBMM?: boolean;
  aoEnviarBMM?: () => void;
}

export default function CampoBMM({ iconeBMM, placeholderBMM, valorBMM, aoMudarBMM, senhaBMM = false, tecladoBMM, comErroBMM = false, aoEnviarBMM }: CampoPropsBMM) {
  const [focoBMM, setFocoBMM] = useState<boolean>(false);
  const [visivelBMM, setVisivelBMM] = useState<boolean>(false);

  return (
    <View style={[estilosBMM.campoBMM, focoBMM && estilosBMM.focoBMM, comErroBMM && estilosBMM.erroCampoBMM]}>
      {iconeBMM ? <Ionicons name={iconeBMM} size={24} color={corBMM.laranjaBMM} /> : null}
      <TextInput
        style={estilosBMM.entradaBMM}
        placeholder={placeholderBMM}
        placeholderTextColor="#8E9A9B"
        value={valorBMM}
        onChangeText={aoMudarBMM}
        secureTextEntry={senhaBMM && !visivelBMM}
        keyboardType={tecladoBMM}
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={() => setFocoBMM(true)}
        onBlur={() => setFocoBMM(false)}
        onSubmitEditing={aoEnviarBMM}
      />
      {senhaBMM ? (
        <TouchableOpacity onPress={() => setVisivelBMM(!visivelBMM)} accessibilityLabel="Mostrar ou ocultar senha">
          <Ionicons name={visivelBMM ? 'eye-off-outline' : 'eye-outline'} size={22} color="#8E9A9B" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  campoBMM: {
    flexDirection: 'row', alignItems: 'center', gap: 12, height: 54, borderRadius: 27,
    backgroundColor: corBMM.cremeBMM, borderWidth: 1.5, borderColor: corBMM.laranjaBMM, paddingHorizontal: 18,
  },
  focoBMM: { backgroundColor: corBMM.brancoBMM, shadowColor: corBMM.laranjaBMM, shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  erroCampoBMM: { borderColor: corBMM.erroBMM },
  entradaBMM: { flex: 1, height: '100%', fontSize: 15, fontFamily: fonteBMM.regularBMM, color: corBMM.textoBMM },
});

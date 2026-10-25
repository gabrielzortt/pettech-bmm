import React from 'react';
import { Text, Pressable, StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { corBMM, fonteBMM, gradienteBMM, IconeBMM } from '../constants/temaBMM';

interface BotaoPropsBMM {
  tituloBMM: string;
  aoPressionarBMM: () => void;
  varianteBMM?: 'primario' | 'secundario' | 'escuro';
  sobreEscuroBMM?: boolean;
  iconeBMM?: IconeBMM;
  estiloBMM?: StyleProp<ViewStyle>;
  alturaBMM?: number;
}

export default function BotaoBMM({ tituloBMM, aoPressionarBMM, varianteBMM = 'primario', sobreEscuroBMM = false, iconeBMM, estiloBMM, alturaBMM = 54 }: BotaoPropsBMM) {
  const raioBMM = alturaBMM / 2;
  const corTextoBMM =
    varianteBMM === 'primario' ? corBMM.brancoBMM : varianteBMM === 'escuro' ? corBMM.cremeBMM : sobreEscuroBMM ? corBMM.brancoBMM : corBMM.laranjaEscuroBMM;

  return (
    <Pressable
      onPress={aoPressionarBMM}
      accessibilityRole="button"
      style={({ pressed: pressionadoBMM }) => [
        estilosBMM.baseBMM,
        { height: alturaBMM, borderRadius: raioBMM },
        varianteBMM === 'primario' && estilosBMM.sombraPrimarioBMM,
        varianteBMM === 'secundario' && estilosBMM.secundarioBMM,
        varianteBMM === 'escuro' && estilosBMM.escuroBMM,
        pressionadoBMM && { transform: [{ scale: 0.97 }], opacity: 0.93 },
        estiloBMM,
      ]}
    >
      {varianteBMM === 'primario' && (
        <LinearGradient colors={gradienteBMM.laranjaBMM} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[StyleSheet.absoluteFill, { borderRadius: raioBMM }]} />
      )}
      <View style={estilosBMM.conteudoBMM}>
        {iconeBMM ? <Ionicons name={iconeBMM} size={20} color={corTextoBMM} /> : null}
        <Text style={[estilosBMM.textoBMM, { color: corTextoBMM }]}>{tituloBMM}</Text>
      </View>
    </Pressable>
  );
}

const estilosBMM = StyleSheet.create({
  baseBMM: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 22 },
  sombraPrimarioBMM: { shadowColor: corBMM.laranjaBMM, shadowOpacity: 0.35, shadowRadius: 14, shadowOffset: { width: 0, height: 7 }, elevation: 5 },
  secundarioBMM: { borderWidth: 1.5, borderColor: corBMM.laranjaBMM, backgroundColor: 'transparent' },
  escuroBMM: { backgroundColor: corBMM.petroleoBMM },
  conteudoBMM: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  textoBMM: { fontFamily: fonteBMM.semiBMM, fontSize: 16, letterSpacing: 0.2 },
});

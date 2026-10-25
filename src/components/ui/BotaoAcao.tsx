import React from 'react';
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { coresBMM, fontesBMM, IconeBMM, raioBMM } from '@/theme';

type VarianteBMM = 'primario' | 'contorno' | 'suave' | 'perigo';

interface BotaoAcaoPropsBMM {
  tituloBMM: string;
  aoPressionarBMM: () => void;
  varianteBMM?: VarianteBMM;
  iconeBMM?: IconeBMM;
  alturaBMM?: number;
  carregandoBMM?: boolean;
  estiloBMM?: StyleProp<ViewStyle>;
}

const paletaBMM: Record<VarianteBMM, { fundoBMM: string; textoBMM: string; bordaBMM?: string }> = {
  primario: { fundoBMM: coresBMM.primariaBMM, textoBMM: coresBMM.brancoBMM },
  contorno: { fundoBMM: 'transparent', textoBMM: coresBMM.primariaEscuraBMM, bordaBMM: coresBMM.primariaBMM },
  suave: { fundoBMM: coresBMM.primariaFundoBMM, textoBMM: coresBMM.primariaEscuraBMM },
  perigo: { fundoBMM: coresBMM.perigoFundoBMM, textoBMM: coresBMM.perigoBMM },
};

export default function BotaoAcao({ tituloBMM, aoPressionarBMM, varianteBMM = 'primario', iconeBMM, alturaBMM = 54, carregandoBMM = false, estiloBMM }: BotaoAcaoPropsBMM) {
  const paletaAtualBMM = paletaBMM[varianteBMM];
  return (
    <Pressable
      accessibilityRole="button"
      disabled={carregandoBMM}
      onPress={aoPressionarBMM}
      style={({ pressed: pressionadoBMM }) => [
        estilosBMM.baseBMM,
        { height: alturaBMM, backgroundColor: paletaAtualBMM.fundoBMM, borderColor: paletaAtualBMM.bordaBMM, borderWidth: paletaAtualBMM.bordaBMM ? 1.5 : 0 },
        varianteBMM === 'primario' && estilosBMM.brilhoBMM,
        pressionadoBMM && { opacity: 0.88, transform: [{ scale: 0.98 }] },
        estiloBMM,
      ]}
    >
      {carregandoBMM ? (
        <ActivityIndicator color={paletaAtualBMM.textoBMM} />
      ) : (
        <>
          {iconeBMM ? <Ionicons name={iconeBMM} size={19} color={paletaAtualBMM.textoBMM} /> : null}
          <Text style={[estilosBMM.textoBMM, { color: paletaAtualBMM.textoBMM }]}>{tituloBMM}</Text>
        </>
      )}
    </Pressable>
  );
}

const estilosBMM = StyleSheet.create({
  baseBMM: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: raioBMM.pilulaBMM, paddingHorizontal: 22 },
  brilhoBMM: { shadowColor: coresBMM.primariaBMM, shadowOpacity: 0.32, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 4 },
  textoBMM: { fontFamily: fontesBMM.negritoBMM, fontSize: 15, letterSpacing: 0.2 },
});

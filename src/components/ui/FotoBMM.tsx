import React, { useEffect, useState } from 'react';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { coresBMM, IconeBMM } from '@/theme';

interface FotoPropsBMM {
  origemBMM?: ImageSourcePropType;
  reservaBMM?: ImageSourcePropType;
  estiloBMM?: StyleProp<ViewStyle>;
  iconeBMM?: IconeBMM;
  modoBMM?: 'cover' | 'contain';
}

export default function FotoBMM({ origemBMM, reservaBMM, estiloBMM, iconeBMM = 'paw', modoBMM = 'cover' }: FotoPropsBMM) {
  const [falhouBMM, setFalhouBMM] = useState<boolean>(false);
  const [reservaFalhouBMM, setReservaFalhouBMM] = useState<boolean>(false);
  const chaveBMM = JSON.stringify(origemBMM ?? null);

  useEffect(() => {
    setFalhouBMM(false);
    setReservaFalhouBMM(false);
  }, [chaveBMM]);

  return (
    <View style={[estilosBMM.baseBMM, estiloBMM]}>
      {origemBMM && !falhouBMM ? (
        <Image source={origemBMM} style={StyleSheet.absoluteFill} resizeMode={modoBMM} onError={() => setFalhouBMM(true)} />
      ) : reservaBMM && !reservaFalhouBMM ? (
        <Image source={reservaBMM} style={StyleSheet.absoluteFill} resizeMode={modoBMM} onError={() => setReservaFalhouBMM(true)} />
      ) : (
        <Ionicons name={iconeBMM} size={40} color={coresBMM.primariaBMM} />
      )}
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  baseBMM: { overflow: 'hidden', backgroundColor: coresBMM.primariaFundoBMM, alignItems: 'center', justifyContent: 'center' },
});

import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { corBMM, IconeBMM } from '../constants/temaBMM';

interface ImagemPropsBMM {
  uriBMM?: string;
  estiloBMM?: StyleProp<ViewStyle>;
  iconeBMM?: IconeBMM;
  escuroBMM?: boolean;
  compactoBMM?: boolean;
}

export default function ImagemBMM({ uriBMM, estiloBMM, iconeBMM = 'paw', escuroBMM = false, compactoBMM = false }: ImagemPropsBMM) {
  const [falhouBMM, setFalhouBMM] = useState<boolean>(false);

  useEffect(() => {
    setFalhouBMM(false);
  }, [uriBMM]);

  return (
    <View style={[estilosBMM.baseBMM, escuroBMM ? estilosBMM.escuroBMM : estilosBMM.claroBMM, estiloBMM]}>
      {uriBMM && !falhouBMM ? (
        <Image source={{ uri: uriBMM }} style={StyleSheet.absoluteFill} resizeMode="cover" onError={() => setFalhouBMM(true)} />
      ) : (
        <Ionicons name={iconeBMM} size={compactoBMM ? 28 : 48} color={escuroBMM ? corBMM.laranjaClaroBMM : corBMM.laranjaBMM} />
      )}
    </View>
  );
}

const estilosBMM = StyleSheet.create({
  baseBMM: { overflow: 'hidden', borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  claroBMM: { backgroundColor: corBMM.areiaBMM },
  escuroBMM: { backgroundColor: corBMM.petroleoClaroBMM },
});

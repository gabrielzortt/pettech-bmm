import React, { createContext, useCallback, useContext, useRef, useState, ReactNode } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { coresBMM, fontesBMM, raioBMM } from '@/theme';

interface AcaoFeedbackBMM {
  rotuloBMM: string;
  aoPressionarBMM: () => void;
}

interface FeedbackContextoBMM {
  mostrarBMM: (mensagemBMM: string, acaoBMM?: AcaoFeedbackBMM) => void;
}

const ContextoBMM = createContext<FeedbackContextoBMM | null>(null);

export function FeedbackProviderBMM({ children: childrenBMM }: { children: ReactNode }) {
  const [mensagemBMM, setMensagemBMM] = useState<string>('');
  const [acaoBMM, setAcaoBMM] = useState<AcaoFeedbackBMM | undefined>(undefined);
  const [visivelBMM, setVisivelBMM] = useState<boolean>(false);
  const opacidadeBMM = useRef(new Animated.Value(0)).current;
  const temporizadorBMM = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mostrarBMM = useCallback(
    (textoBMM: string, acaoRecebidaBMM?: AcaoFeedbackBMM) => {
      setMensagemBMM(textoBMM);
      setAcaoBMM(acaoRecebidaBMM);
      setVisivelBMM(true);
      if (temporizadorBMM.current) clearTimeout(temporizadorBMM.current);
      Animated.timing(opacidadeBMM, { toValue: 1, duration: 180, useNativeDriver: true }).start();
      temporizadorBMM.current = setTimeout(() => {
        Animated.timing(opacidadeBMM, { toValue: 0, duration: 240, useNativeDriver: true }).start(() => setVisivelBMM(false));
      }, 3200);
    },
    [opacidadeBMM]
  );

  return (
    <ContextoBMM.Provider value={{ mostrarBMM }}>
      {childrenBMM}
      {visivelBMM && (
        <Animated.View style={[estilosBMM.areaBMM, { opacity: opacidadeBMM }]} pointerEvents="box-none">
          <View style={estilosBMM.caixaBMM}>
            <Text style={estilosBMM.textoBMM} numberOfLines={2}>{mensagemBMM}</Text>
            {acaoBMM && (
              <Pressable onPress={() => { acaoBMM.aoPressionarBMM(); setVisivelBMM(false); }} hitSlop={8}>
                <Text style={estilosBMM.acaoBMM}>{acaoBMM.rotuloBMM}</Text>
              </Pressable>
            )}
          </View>
        </Animated.View>
      )}
    </ContextoBMM.Provider>
  );
}

export function useFeedbackBMM(): FeedbackContextoBMM {
  const contextoBMM = useContext(ContextoBMM);
  if (!contextoBMM) throw new Error('useFeedbackBMM deve ser usado dentro de FeedbackProviderBMM');
  return contextoBMM;
}

const estilosBMM = StyleSheet.create({
  areaBMM: { position: 'absolute', left: 16, right: 16, bottom: 92 },
  caixaBMM: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: coresBMM.noiteBMM, borderRadius: raioBMM.mdBMM, paddingHorizontal: 16, paddingVertical: 13 },
  textoBMM: { flex: 1, color: coresBMM.brancoBMM, fontFamily: fontesBMM.mediaBMM, fontSize: 13 },
  acaoBMM: { color: coresBMM.primariaClaraBMM, fontFamily: fontesBMM.negritoBMM, fontSize: 13 },
});

import React, { createContext, useContext, useRef, useState, ReactNode } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { ProdutoBMM, TamanhoBMM } from '../data/catalogoBMM';
import { corBMM, fonteBMM } from '../constants/temaBMM';

export interface UsuarioBMM {
  nomeBMM: string;
  emailBMM: string;
  senhaBMM: string;
}

export interface ItemCarrinhoBMM {
  produtoBMM: ProdutoBMM;
  tamanhoBMM: TamanhoBMM;
  quantidadeBMM: number;
}

interface LojaContextoBMM {
  usuarioBMM: UsuarioBMM | null;
  entrarBMM: (emailBMM: string, senhaBMM: string) => string | null;
  sairBMM: () => void;
  itensBMM: ItemCarrinhoBMM[];
  quantidadeTotalBMM: number;
  adicionarBMM: (produtoBMM: ProdutoBMM, tamanhoBMM?: TamanhoBMM, quantidadeBMM?: number) => void;
  alterarQuantidadeBMM: (idBMM: string, tamanhoBMM: TamanhoBMM, deltaBMM: number) => void;
  removerBMM: (idBMM: string, tamanhoBMM: TamanhoBMM) => void;
  limparCarrinhoBMM: () => void;
  favoritosBMM: string[];
  alternarFavoritoBMM: (idBMM: string) => void;
  subtotalBMM: number;
  freteBMM: number;
  totalBMM: number;
  mostrarToastBMM: (mensagemBMM: string) => void;
}

const ContextoBMM = createContext<LojaContextoBMM | null>(null);

const freteGratisAcimaBMM: number = 300;
const valorFreteBMM: number = 19.9;

export function LojaProviderBMM({ children: childrenBMM }: { children: ReactNode }) {
  const [usuarioCadastradoBMM] = useState<UsuarioBMM>({
    nomeBMM: 'Cliente PetTech',
    emailBMM: 'cliente@pettech.com',
    senhaBMM: '123456',
  });
  const [usuarioBMM, setUsuarioBMM] = useState<UsuarioBMM | null>(null);
  const [itensBMM, setItensBMM] = useState<ItemCarrinhoBMM[]>([]);
  const [favoritosBMM, setFavoritosBMM] = useState<string[]>([]);
  const [toastBMM, setToastBMM] = useState<string>('');
  const opacidadeBMM = useRef(new Animated.Value(0)).current;
  const temporizadorBMM = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mostrarToastBMM = (mensagemBMM: string) => {
    setToastBMM(mensagemBMM);
    if (temporizadorBMM.current) clearTimeout(temporizadorBMM.current);
    Animated.timing(opacidadeBMM, { toValue: 1, duration: 180, useNativeDriver: true }).start();
    temporizadorBMM.current = setTimeout(() => {
      Animated.timing(opacidadeBMM, { toValue: 0, duration: 260, useNativeDriver: true }).start();
    }, 2200);
  };

  const entrarBMM = (emailDigitadoBMM: string, senhaDigitadaBMM: string): string | null => {
    const emailLimpoBMM = emailDigitadoBMM.trim().toLowerCase();
    if (emailLimpoBMM === '' || senhaDigitadaBMM === '') return 'Preencha o e-mail e a senha para entrar.';
    if (emailLimpoBMM !== usuarioCadastradoBMM.emailBMM) return 'E-mail incorreto. Confira o endereço digitado.';
    if (senhaDigitadaBMM !== usuarioCadastradoBMM.senhaBMM) return 'Senha incorreta. Tente novamente.';
    setUsuarioBMM(usuarioCadastradoBMM);
    return null;
  };

  const sairBMM = () => {
    setUsuarioBMM(null);
    setItensBMM([]);
    setFavoritosBMM([]);
  };

  const adicionarBMM = (produtoBMM: ProdutoBMM, tamanhoBMM: TamanhoBMM = 'M', quantidadeBMM: number = 1) => {
    setItensBMM((anteriorBMM) => {
      const existeBMM = anteriorBMM.some((iBMM) => iBMM.produtoBMM.idBMM === produtoBMM.idBMM && iBMM.tamanhoBMM === tamanhoBMM);
      if (existeBMM) {
        return anteriorBMM.map((iBMM) =>
          iBMM.produtoBMM.idBMM === produtoBMM.idBMM && iBMM.tamanhoBMM === tamanhoBMM
            ? { ...iBMM, quantidadeBMM: iBMM.quantidadeBMM + quantidadeBMM }
            : iBMM
        );
      }
      return [...anteriorBMM, { produtoBMM, tamanhoBMM, quantidadeBMM }];
    });
  };

  const alterarQuantidadeBMM = (idBMM: string, tamanhoBMM: TamanhoBMM, deltaBMM: number) => {
    setItensBMM((anteriorBMM) =>
      anteriorBMM
        .map((iBMM) =>
          iBMM.produtoBMM.idBMM === idBMM && iBMM.tamanhoBMM === tamanhoBMM
            ? { ...iBMM, quantidadeBMM: iBMM.quantidadeBMM + deltaBMM }
            : iBMM
        )
        .filter((iBMM) => iBMM.quantidadeBMM > 0)
    );
  };

  const removerBMM = (idBMM: string, tamanhoBMM: TamanhoBMM) =>
    setItensBMM((anteriorBMM) => anteriorBMM.filter((iBMM) => !(iBMM.produtoBMM.idBMM === idBMM && iBMM.tamanhoBMM === tamanhoBMM)));

  const limparCarrinhoBMM = () => setItensBMM([]);

  const alternarFavoritoBMM = (idBMM: string) =>
    setFavoritosBMM((anteriorBMM) =>
      anteriorBMM.includes(idBMM) ? anteriorBMM.filter((fBMM) => fBMM !== idBMM) : [...anteriorBMM, idBMM]
    );

  const quantidadeTotalBMM = itensBMM.reduce((somaBMM, iBMM) => somaBMM + iBMM.quantidadeBMM, 0);
  const subtotalBMM = itensBMM.reduce((somaBMM, iBMM) => somaBMM + iBMM.produtoBMM.precoBMM * iBMM.quantidadeBMM, 0);
  const freteBMM = itensBMM.length === 0 || subtotalBMM >= freteGratisAcimaBMM ? 0 : valorFreteBMM;
  const totalBMM = subtotalBMM + freteBMM;

  return (
    <ContextoBMM.Provider
      value={{
        usuarioBMM, entrarBMM, sairBMM,
        itensBMM, quantidadeTotalBMM, adicionarBMM, alterarQuantidadeBMM, removerBMM, limparCarrinhoBMM,
        favoritosBMM, alternarFavoritoBMM, subtotalBMM, freteBMM, totalBMM, mostrarToastBMM,
      }}
    >
      {childrenBMM}
      <Animated.View pointerEvents="none" style={[estilosBMM.toastBMM, { opacity: opacidadeBMM }]}>
        <Text style={estilosBMM.toastTextoBMM}>{toastBMM}</Text>
      </Animated.View>
    </ContextoBMM.Provider>
  );
}

export function useLojaBMM(): LojaContextoBMM {
  const contextoBMM = useContext(ContextoBMM);
  if (!contextoBMM) throw new Error('useLojaBMM deve ser usado dentro de LojaProviderBMM');
  return contextoBMM;
}

const estilosBMM = StyleSheet.create({
  toastBMM: { position: 'absolute', left: 24, right: 24, bottom: 96, alignItems: 'center' },
  toastTextoBMM: {
    backgroundColor: corBMM.noiteBMM,
    color: corBMM.brancoBMM,
    fontFamily: fonteBMM.mediaBMM,
    fontSize: 13,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    overflow: 'hidden',
    textAlign: 'center',
  },
});

import React, { createContext, useContext, useEffect, useMemo, useReducer, ReactNode } from 'react';
import { ItemCarrinhoBMM, PorteBMM, ProdutoBMM } from '@/types';
import { useAuthBMM } from './AuthProvider';

type AcaoBMM =
  | { tipoBMM: 'adicionar'; produtoBMM: ProdutoBMM; porteBMM: PorteBMM; quantidadeBMM: number }
  | { tipoBMM: 'alterar'; chaveBMM: string; deltaBMM: number }
  | { tipoBMM: 'remover'; chaveBMM: string }
  | { tipoBMM: 'limpar' };

interface CarrinhoContextoBMM {
  itensBMM: ItemCarrinhoBMM[];
  totalItensBMM: number;
  subtotalBMM: number;
  freteBMM: number;
  totalBMM: number;
  adicionarBMM: (produtoBMM: ProdutoBMM, porteBMM: PorteBMM, quantidadeBMM: number) => void;
  alterarQuantidadeBMM: (chaveBMM: string, deltaBMM: number) => void;
  removerBMM: (chaveBMM: string) => void;
  limparBMM: () => void;
}

export const freteGratisAPartirDeBMM: number = 300;
const valorFreteBMM: number = 19.9;
const limiteQuantidadeBMM: number = 10;

const criarChaveBMM = (idBMM: string, porteBMM: PorteBMM): string => `${idBMM}-${porteBMM}`;

function reducerBMM(estadoBMM: ItemCarrinhoBMM[], acaoBMM: AcaoBMM): ItemCarrinhoBMM[] {
  switch (acaoBMM.tipoBMM) {
    case 'adicionar': {
      const chaveBMM = criarChaveBMM(acaoBMM.produtoBMM.idBMM, acaoBMM.porteBMM);
      const existenteBMM = estadoBMM.find((iBMM) => iBMM.chaveBMM === chaveBMM);
      if (existenteBMM) {
        return estadoBMM.map((iBMM) =>
          iBMM.chaveBMM === chaveBMM ? { ...iBMM, quantidadeBMM: Math.min(limiteQuantidadeBMM, iBMM.quantidadeBMM + acaoBMM.quantidadeBMM) } : iBMM
        );
      }
      return [...estadoBMM, { chaveBMM, produtoBMM: acaoBMM.produtoBMM, porteBMM: acaoBMM.porteBMM, quantidadeBMM: acaoBMM.quantidadeBMM }];
    }
    case 'alterar':
      return estadoBMM
        .map((iBMM) => (iBMM.chaveBMM === acaoBMM.chaveBMM ? { ...iBMM, quantidadeBMM: Math.min(limiteQuantidadeBMM, iBMM.quantidadeBMM + acaoBMM.deltaBMM) } : iBMM))
        .filter((iBMM) => iBMM.quantidadeBMM > 0);
    case 'remover':
      return estadoBMM.filter((iBMM) => iBMM.chaveBMM !== acaoBMM.chaveBMM);
    case 'limpar':
      return [];
  }
}

const ContextoBMM = createContext<CarrinhoContextoBMM | null>(null);

export function CarrinhoProviderBMM({ children: childrenBMM }: { children: ReactNode }) {
  const { usuarioBMM } = useAuthBMM();
  const [itensBMM, despacharBMM] = useReducer(reducerBMM, []);

  useEffect(() => {
    if (!usuarioBMM) despacharBMM({ tipoBMM: 'limpar' });
  }, [usuarioBMM]);

  const valoresBMM = useMemo(() => {
    const subtotalBMM = itensBMM.reduce((somaBMM, iBMM) => somaBMM + iBMM.produtoBMM.precoBMM * iBMM.quantidadeBMM, 0);
    const freteBMM = itensBMM.length === 0 || subtotalBMM >= freteGratisAPartirDeBMM ? 0 : valorFreteBMM;
    return {
      totalItensBMM: itensBMM.reduce((somaBMM, iBMM) => somaBMM + iBMM.quantidadeBMM, 0),
      subtotalBMM,
      freteBMM,
      totalBMM: subtotalBMM + freteBMM,
    };
  }, [itensBMM]);

  return (
    <ContextoBMM.Provider
      value={{
        itensBMM,
        ...valoresBMM,
        adicionarBMM: (produtoBMM, porteBMM, quantidadeBMM) => despacharBMM({ tipoBMM: 'adicionar', produtoBMM, porteBMM, quantidadeBMM }),
        alterarQuantidadeBMM: (chaveBMM, deltaBMM) => despacharBMM({ tipoBMM: 'alterar', chaveBMM, deltaBMM }),
        removerBMM: (chaveBMM) => despacharBMM({ tipoBMM: 'remover', chaveBMM }),
        limparBMM: () => despacharBMM({ tipoBMM: 'limpar' }),
      }}
    >
      {childrenBMM}
    </ContextoBMM.Provider>
  );
}

export function useCarrinhoBMM(): CarrinhoContextoBMM {
  const contextoBMM = useContext(ContextoBMM);
  if (!contextoBMM) throw new Error('useCarrinhoBMM deve ser usado dentro de CarrinhoProviderBMM');
  return contextoBMM;
}

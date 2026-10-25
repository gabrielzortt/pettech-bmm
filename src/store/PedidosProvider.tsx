import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ItemCarrinhoBMM, PagamentoBMM, PedidoBMM } from '@/types';
import { lerJsonBMM, salvarJsonBMM } from '@/services/armazenamento';
import { useAuthBMM } from './AuthProvider';

interface NovoPedidoBMM {
  itensBMM: ItemCarrinhoBMM[];
  freteBMM: number;
  totalBMM: number;
  pagamentoBMM: PagamentoBMM;
  enderecoBMM: string;
}

interface PedidosContextoBMM {
  pedidosBMM: PedidoBMM[];
  registrarPedidoBMM: (dadosBMM: NovoPedidoBMM) => PedidoBMM;
}

const chavePedidosBMM = '@pettech:pedidos';

const ContextoBMM = createContext<PedidosContextoBMM | null>(null);

export function PedidosProviderBMM({ children: childrenBMM }: { children: ReactNode }) {
  const { usuarioBMM } = useAuthBMM();
  const [porUsuarioBMM, setPorUsuarioBMM] = useState<Record<string, PedidoBMM[]>>({});

  useEffect(() => {
    lerJsonBMM<Record<string, PedidoBMM[]>>(chavePedidosBMM, {}).then(setPorUsuarioBMM);
  }, []);

  const pedidosBMM = usuarioBMM ? porUsuarioBMM[usuarioBMM.emailBMM] ?? [] : [];

  const registrarPedidoBMM = (dadosBMM: NovoPedidoBMM): PedidoBMM => {
    const novoBMM: PedidoBMM = {
      idBMM: String(Date.now()).slice(-6),
      dataBMM: new Date().toISOString(),
      linhasBMM: dadosBMM.itensBMM.map((iBMM) => ({
        nomeBMM: iBMM.produtoBMM.nomeBMM,
        porteBMM: iBMM.porteBMM,
        quantidadeBMM: iBMM.quantidadeBMM,
        subtotalBMM: iBMM.produtoBMM.precoBMM * iBMM.quantidadeBMM,
      })),
      totalBMM: dadosBMM.totalBMM,
      freteBMM: dadosBMM.freteBMM,
      pagamentoBMM: dadosBMM.pagamentoBMM,
      enderecoBMM: dadosBMM.enderecoBMM,
      statusBMM: 'Em preparação',
    };
    if (usuarioBMM) {
      const atualizadoBMM = { ...porUsuarioBMM, [usuarioBMM.emailBMM]: [novoBMM, ...(porUsuarioBMM[usuarioBMM.emailBMM] ?? [])] };
      setPorUsuarioBMM(atualizadoBMM);
      salvarJsonBMM(chavePedidosBMM, atualizadoBMM);
    }
    return novoBMM;
  };

  return <ContextoBMM.Provider value={{ pedidosBMM, registrarPedidoBMM }}>{childrenBMM}</ContextoBMM.Provider>;
}

export function usePedidosBMM(): PedidosContextoBMM {
  const contextoBMM = useContext(ContextoBMM);
  if (!contextoBMM) throw new Error('usePedidosBMM deve ser usado dentro de PedidosProviderBMM');
  return contextoBMM;
}

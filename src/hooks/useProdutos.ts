import { useCallback, useEffect, useState } from 'react';
import { ProdutoBMM } from '@/types';
import { buscarProdutoBMM, buscarProdutosBMM } from '@/services/api';

const mensagemErroBMM = (falhaBMM: unknown): string =>
  falhaBMM instanceof Error ? falhaBMM.message : 'Erro inesperado. Tente novamente.';

export function useProdutosBMM() {
  const [produtosBMM, setProdutosBMM] = useState<ProdutoBMM[]>([]);
  const [carregandoBMM, setCarregandoBMM] = useState<boolean>(true);
  const [atualizandoBMM, setAtualizandoBMM] = useState<boolean>(false);
  const [erroBMM, setErroBMM] = useState<string>('');

  const carregarBMM = useCallback(async (silenciosoBMM: boolean = false) => {
    if (silenciosoBMM) setAtualizandoBMM(true);
    else setCarregandoBMM(true);
    setErroBMM('');
    try {
      setProdutosBMM(await buscarProdutosBMM());
    } catch (falhaBMM) {
      setErroBMM(mensagemErroBMM(falhaBMM));
    } finally {
      setCarregandoBMM(false);
      setAtualizandoBMM(false);
    }
  }, []);

  useEffect(() => {
    carregarBMM();
  }, [carregarBMM]);

  return {
    produtosBMM,
    carregandoBMM,
    atualizandoBMM,
    erroBMM,
    recarregarBMM: () => carregarBMM(false),
    atualizarBMM: () => carregarBMM(true),
  };
}

export function useProdutoBMM(idBMM: string | undefined) {
  const [produtoBMM, setProdutoBMM] = useState<ProdutoBMM | null>(null);
  const [carregandoBMM, setCarregandoBMM] = useState<boolean>(true);
  const [erroBMM, setErroBMM] = useState<string>('');

  const carregarBMM = useCallback(async () => {
    setCarregandoBMM(true);
    setErroBMM('');
    try {
      setProdutoBMM(await buscarProdutoBMM(idBMM ?? ''));
    } catch (falhaBMM) {
      setErroBMM(mensagemErroBMM(falhaBMM));
    } finally {
      setCarregandoBMM(false);
    }
  }, [idBMM]);

  useEffect(() => {
    carregarBMM();
  }, [carregarBMM]);

  return { produtoBMM, carregandoBMM, erroBMM, recarregarBMM: carregarBMM };
}

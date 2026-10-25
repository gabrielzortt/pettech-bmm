import { useCallback, useEffect, useState } from 'react';
import { ProdutoBMM } from '../data/catalogoBMM';
import { buscarProdutosBMM, OrigemBMM } from '../services/apiBMM';

export function useProdutosBMM() {
  const [produtosBMM, setProdutosBMM] = useState<ProdutoBMM[]>([]);
  const [carregandoBMM, setCarregandoBMM] = useState<boolean>(true);
  const [erroBMM, setErroBMM] = useState<string>('');
  const [origemBMM, setOrigemBMM] = useState<OrigemBMM>('api');

  const carregarBMM = useCallback(async () => {
    setCarregandoBMM(true);
    setErroBMM('');
    try {
      const respostaBMM = await buscarProdutosBMM();
      setProdutosBMM(respostaBMM.produtosBMM);
      setOrigemBMM(respostaBMM.origemBMM);
    } catch (falhaBMM) {
      setErroBMM(falhaBMM instanceof Error ? falhaBMM.message : 'Erro inesperado ao carregar os produtos.');
    } finally {
      setCarregandoBMM(false);
    }
  }, []);

  useEffect(() => {
    carregarBMM();
  }, [carregarBMM]);

  return { produtosBMM, origemBMM, carregandoBMM, erroBMM, recarregarBMM: carregarBMM };
}

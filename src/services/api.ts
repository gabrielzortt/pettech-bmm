import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { ProdutoBMM } from '@/types';
import { produtosLocaisBMM } from '@/data/produtosLocais';

export type OrigemBMM = 'api' | 'local';

interface ProdutoApiBMM {
  id: number;
  nome: string;
  subtitulo: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
  nota: number;
  avaliacoes: number;
  novo: boolean;
}

const portaApiBMM: number = 3333;
const tempoLimiteBMM: number = 8000;
const erroRedeBMM = 'Não foi possível conectar ao servidor. Confira se a API está rodando.';

const obterUrlBaseBMM = (): string => {
  const urlConfiguradaBMM = process.env.EXPO_PUBLIC_API_URL;
  if (urlConfiguradaBMM) return urlConfiguradaBMM;
  const hostBMM = Constants.expoConfig?.hostUri?.split(':')[0];
  if (hostBMM) return `http://${hostBMM}:${portaApiBMM}`;
  return Platform.OS === 'android' ? `http://10.0.2.2:${portaApiBMM}` : `http://localhost:${portaApiBMM}`;
};

const converterBMM = (produtoApiBMM: ProdutoApiBMM): ProdutoBMM => ({
  idBMM: String(produtoApiBMM.id),
  nomeBMM: produtoApiBMM.nome,
  subtituloBMM: produtoApiBMM.subtitulo,
  descricaoBMM: produtoApiBMM.descricao,
  precoBMM: produtoApiBMM.preco,
  imagemBMM: { uri: produtoApiBMM.imagem },
  categoriaBMM: produtoApiBMM.categoria,
  notaBMM: produtoApiBMM.nota,
  avaliacoesBMM: produtoApiBMM.avaliacoes,
  novoBMM: produtoApiBMM.novo,
});

class ErroApiBMM extends Error {
  constructor(mensagemBMM: string, readonly redeBMM: boolean) {
    super(mensagemBMM);
  }
}

async function requisitarBMM<TipoBMM>(caminhoBMM: string): Promise<TipoBMM> {
  const controladorBMM = new AbortController();
  const temporizadorBMM = setTimeout(() => controladorBMM.abort(), tempoLimiteBMM);
  let respostaBMM: Response;
  try {
    respostaBMM = await fetch(`${obterUrlBaseBMM()}${caminhoBMM}`, { signal: controladorBMM.signal });
  } catch {
    throw new ErroApiBMM(erroRedeBMM, true);
  } finally {
    clearTimeout(temporizadorBMM);
  }
  if (respostaBMM.status === 404) throw new ErroApiBMM('Produto não encontrado.', false);
  if (!respostaBMM.ok) throw new ErroApiBMM(`O servidor respondeu com erro (${respostaBMM.status}).`, false);
  return (await respostaBMM.json()) as TipoBMM;
}

export async function buscarProdutosBMM(): Promise<{ produtosBMM: ProdutoBMM[]; origemBMM: OrigemBMM }> {
  try {
    const listaBMM = await requisitarBMM<ProdutoApiBMM[]>('/produtos');
    return { produtosBMM: listaBMM.map(converterBMM), origemBMM: 'api' };
  } catch (falhaBMM) {
    if (falhaBMM instanceof ErroApiBMM && falhaBMM.redeBMM) return { produtosBMM: produtosLocaisBMM, origemBMM: 'local' };
    throw falhaBMM;
  }
}

export async function buscarProdutoBMM(idBMM: string): Promise<ProdutoBMM> {
  try {
    return converterBMM(await requisitarBMM<ProdutoApiBMM>(`/produtos/${encodeURIComponent(idBMM)}`));
  } catch (falhaBMM) {
    if (!(falhaBMM instanceof ErroApiBMM) || !falhaBMM.redeBMM) throw falhaBMM;
    const localBMM = produtosLocaisBMM.find((produtoBMM) => produtoBMM.idBMM === idBMM);
    if (!localBMM) throw new Error('Produto não encontrado.');
    return localBMM;
  }
}

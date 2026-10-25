import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { ProdutoBMM } from '../data/catalogoBMM';
import { produtosLocaisBMM } from '../data/produtosLocaisBMM';

export type OrigemBMM = 'api' | 'local';

interface ProdutoApiBMM {
  id: string;
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

const obterUrlBaseBMM = (): string => {
  const urlConfiguradaBMM = process.env.EXPO_PUBLIC_API_URL;
  if (urlConfiguradaBMM) return urlConfiguradaBMM;
  const hostBMM = Constants.expoConfig?.hostUri?.split(':')[0];
  if (hostBMM) return `http://${hostBMM}:${portaApiBMM}`;
  return Platform.OS === 'android' ? `http://10.0.2.2:${portaApiBMM}` : `http://localhost:${portaApiBMM}`;
};

const converterBMM = (produtoApiBMM: ProdutoApiBMM): ProdutoBMM => ({
  idBMM: produtoApiBMM.id,
  nomeBMM: produtoApiBMM.nome,
  subtituloBMM: produtoApiBMM.subtitulo,
  descricaoBMM: produtoApiBMM.descricao,
  precoBMM: produtoApiBMM.preco,
  imagemBMM: produtoApiBMM.imagem,
  categoriaBMM: produtoApiBMM.categoria,
  notaBMM: produtoApiBMM.nota,
  avaliacoesBMM: produtoApiBMM.avaliacoes,
  novoBMM: produtoApiBMM.novo,
});

async function requisitarBMM<TipoBMM>(caminhoBMM: string): Promise<TipoBMM> {
  const controladorBMM = new AbortController();
  const temporizadorBMM = setTimeout(() => controladorBMM.abort(), tempoLimiteBMM);
  try {
    const respostaBMM = await fetch(`${obterUrlBaseBMM()}${caminhoBMM}`, { signal: controladorBMM.signal });
    if (respostaBMM.status === 404) throw new Error('Produto não encontrado.');
    if (!respostaBMM.ok) throw new Error(`O servidor respondeu com erro (${respostaBMM.status}).`);
    return (await respostaBMM.json()) as TipoBMM;
  } catch (falhaBMM) {
    if (falhaBMM instanceof Error && falhaBMM.message.startsWith('Produto não')) throw falhaBMM;
    if (falhaBMM instanceof Error && falhaBMM.message.startsWith('O servidor')) throw falhaBMM;
    throw new Error('Não foi possível conectar ao servidor. Confira se a API está rodando.');
  } finally {
    clearTimeout(temporizadorBMM);
  }
}

const ehFalhaDeRedeBMM = (falhaBMM: unknown): boolean =>
  falhaBMM instanceof Error && falhaBMM.message.startsWith('Não foi possível conectar');

export async function buscarProdutosBMM(): Promise<{ produtosBMM: ProdutoBMM[]; origemBMM: OrigemBMM }> {
  try {
    const listaBMM = await requisitarBMM<ProdutoApiBMM[]>('/produtos');
    return { produtosBMM: listaBMM.map(converterBMM), origemBMM: 'api' };
  } catch (falhaBMM) {
    if (ehFalhaDeRedeBMM(falhaBMM)) return { produtosBMM: produtosLocaisBMM, origemBMM: 'local' };
    throw falhaBMM;
  }
}

export async function buscarProdutoPorIdBMM(idBMM: string): Promise<ProdutoBMM> {
  try {
    const produtoApiBMM = await requisitarBMM<ProdutoApiBMM>(`/produtos/${encodeURIComponent(idBMM)}`);
    return converterBMM(produtoApiBMM);
  } catch (falhaBMM) {
    if (!ehFalhaDeRedeBMM(falhaBMM)) throw falhaBMM;
    const localBMM = produtosLocaisBMM.find((pBMM) => pBMM.idBMM === idBMM);
    if (!localBMM) throw new Error('Produto não encontrado.');
    return localBMM;
  }
}

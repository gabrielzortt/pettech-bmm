import { ImageSourcePropType } from 'react-native';
import { ProdutoBMM } from '@/types';
import { tempoLimiteApiBMM, urlApiBMM } from '@/config/ambiente';
import { imagensProdutosBMM } from '@/data/imagensLocais';

interface ProdutoApiBMM {
  id: string;
  nome: string;
  subtitulo: string;
  descricao: string;
  preco: number;
  imagem: string;
  slug: string;
  categoria: string;
  nota: number;
  avaliacoes: number;
  novo: boolean;
}

const erroRedeBMM = 'Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.';

// Se a foto remota não carregar, o app mostra a ilustração do produto guardada no próprio aplicativo.
const obterReservaBMM = (slugBMM: string): ImageSourcePropType =>
  (imagensProdutosBMM as Record<string, ImageSourcePropType>)[slugBMM] ?? imagensProdutosBMM.padrao;

const converterBMM = (produtoApiBMM: ProdutoApiBMM): ProdutoBMM => ({
  idBMM: String(produtoApiBMM.id),
  nomeBMM: produtoApiBMM.nome,
  subtituloBMM: produtoApiBMM.subtitulo,
  descricaoBMM: produtoApiBMM.descricao,
  precoBMM: produtoApiBMM.preco,
  imagemBMM: { uri: produtoApiBMM.imagem },
  imagemReservaBMM: obterReservaBMM(produtoApiBMM.slug),
  slugBMM: produtoApiBMM.slug,
  categoriaBMM: produtoApiBMM.categoria,
  notaBMM: produtoApiBMM.nota,
  avaliacoesBMM: produtoApiBMM.avaliacoes,
  novoBMM: produtoApiBMM.novo,
});

async function requisitarBMM<TipoBMM>(caminhoBMM: string): Promise<TipoBMM> {
  const controladorBMM = new AbortController();
  const temporizadorBMM = setTimeout(() => controladorBMM.abort(), tempoLimiteApiBMM);
  let respostaBMM: Response;
  try {
    respostaBMM = await fetch(`${urlApiBMM}${caminhoBMM}`, { signal: controladorBMM.signal });
  } catch {
    throw new Error(erroRedeBMM);
  } finally {
    clearTimeout(temporizadorBMM);
  }
  if (respostaBMM.status === 404) throw new Error('Produto não encontrado.');
  if (!respostaBMM.ok) throw new Error(`O servidor respondeu com erro (${respostaBMM.status}).`);
  return (await respostaBMM.json()) as TipoBMM;
}

export async function buscarProdutosBMM(): Promise<ProdutoBMM[]> {
  const listaBMM = await requisitarBMM<ProdutoApiBMM[]>('/produtos');
  return listaBMM.map(converterBMM);
}

export async function buscarProdutoBMM(idBMM: string): Promise<ProdutoBMM> {
  return converterBMM(await requisitarBMM<ProdutoApiBMM>(`/produtos/${encodeURIComponent(idBMM)}`));
}

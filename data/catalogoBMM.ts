export type TamanhoBMM = 'P' | 'M' | 'G';
export type OrdemBMM = 'relevancia' | 'menor' | 'maior' | 'nota';

export interface ProdutoBMM {
  idBMM: string;
  nomeBMM: string;
  subtituloBMM: string;
  descricaoBMM: string;
  precoBMM: number;
  imagemBMM: string;
  categoriaBMM: string;
  notaBMM: number;
  avaliacoesBMM: number;
  novoBMM: boolean;
}

export const filtrosBMM: string[] = ['Todos', 'Coleiras', 'Alimentação', 'Câmeras', 'Brinquedos', 'Higiene'];

export const tamanhosBMM: TamanhoBMM[] = ['P', 'M', 'G'];

export const nomeTamanhoBMM: Record<TamanhoBMM, string> = {
  P: 'Pet pequeno',
  M: 'Pet médio',
  G: 'Pet grande',
};

export const ordensBMM: { chaveBMM: OrdemBMM; rotuloBMM: string }[] = [
  { chaveBMM: 'relevancia', rotuloBMM: 'Relevância' },
  { chaveBMM: 'menor', rotuloBMM: 'Menor preço' },
  { chaveBMM: 'maior', rotuloBMM: 'Maior preço' },
  { chaveBMM: 'nota', rotuloBMM: 'Melhor avaliação' },
];

export const filtrarPorChipBMM = (produtoBMM: ProdutoBMM, chipBMM: string): boolean =>
  chipBMM === 'Todos' || produtoBMM.categoriaBMM === chipBMM;

export const ordenarBMM = (listaBMM: ProdutoBMM[], ordemBMM: OrdemBMM): ProdutoBMM[] => {
  const copiaBMM = [...listaBMM];
  if (ordemBMM === 'menor') return copiaBMM.sort((aBMM, bBMM) => aBMM.precoBMM - bBMM.precoBMM);
  if (ordemBMM === 'maior') return copiaBMM.sort((aBMM, bBMM) => bBMM.precoBMM - aBMM.precoBMM);
  if (ordemBMM === 'nota') return copiaBMM.sort((aBMM, bBMM) => bBMM.notaBMM - aBMM.notaBMM);
  return copiaBMM;
};

export const formatarPrecoBMM = (valorBMM: number): string =>
  `R$ ${valorBMM.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

export const formatarAvaliacoesBMM = (valorBMM: number): string => valorBMM.toLocaleString('pt-BR');

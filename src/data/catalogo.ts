import { OrdemBMM, PorteBMM, ProdutoBMM } from '@/types';

export const categoriasBMM: string[] = ['Todos', 'Coleiras', 'Alimentação', 'Câmeras', 'Brinquedos', 'Higiene'];

export const portesBMM: { chaveBMM: PorteBMM; rotuloBMM: string; dicaBMM: string }[] = [
  { chaveBMM: 'P', rotuloBMM: 'P', dicaBMM: 'Pet pequeno · até 7 kg' },
  { chaveBMM: 'M', rotuloBMM: 'M', dicaBMM: 'Pet médio · de 8 a 20 kg' },
  { chaveBMM: 'G', rotuloBMM: 'G', dicaBMM: 'Pet grande · acima de 20 kg' },
];

export const ordensBMM: { chaveBMM: OrdemBMM; rotuloBMM: string }[] = [
  { chaveBMM: 'relevancia', rotuloBMM: 'Relevância' },
  { chaveBMM: 'menor', rotuloBMM: 'Menor preço' },
  { chaveBMM: 'maior', rotuloBMM: 'Maior preço' },
  { chaveBMM: 'nota', rotuloBMM: 'Melhor avaliação' },
];

export const ordenarProdutosBMM = (listaBMM: ProdutoBMM[], ordemBMM: OrdemBMM): ProdutoBMM[] => {
  const copiaBMM = [...listaBMM];
  if (ordemBMM === 'menor') return copiaBMM.sort((aBMM, bBMM) => aBMM.precoBMM - bBMM.precoBMM);
  if (ordemBMM === 'maior') return copiaBMM.sort((aBMM, bBMM) => bBMM.precoBMM - aBMM.precoBMM);
  if (ordemBMM === 'nota') return copiaBMM.sort((aBMM, bBMM) => bBMM.notaBMM - aBMM.notaBMM);
  return copiaBMM;
};

export const categoriasValidasBMM = ['Coleiras', 'Alimentação', 'Câmeras', 'Brinquedos', 'Higiene'] as const;

export type CategoriaBMM = (typeof categoriasValidasBMM)[number];

export interface ProdutoBMM {
  id: string;
  nome: string;
  subtitulo: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: CategoriaBMM;
  nota: number;
  avaliacoes: number;
  novo: boolean;
}

export type NovoProdutoBMM = Omit<ProdutoBMM, 'id'>;

export type ResultadoValidacaoBMM =
  | { validoBMM: true; dadosBMM: NovoProdutoBMM }
  | { validoBMM: false; errosBMM: string[] };

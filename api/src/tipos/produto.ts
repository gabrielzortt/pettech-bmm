export interface ProdutoBMM {
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

export type DadosProdutoBMM = Omit<ProdutoBMM, 'id'>;

export interface FiltrosProdutoBMM {
  categoriaBMM?: string;
  buscaBMM?: string;
}

export const categoriasValidasBMM = ['Coleiras', 'Alimentação', 'Câmeras', 'Brinquedos', 'Higiene'] as const;

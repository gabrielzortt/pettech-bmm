import { ImageSourcePropType } from 'react-native';

export type PorteBMM = 'P' | 'M' | 'G';
export type OrdemBMM = 'relevancia' | 'menor' | 'maior' | 'nota';
export type PagamentoBMM = 'pix' | 'cartao' | 'dinheiro';

export interface ProdutoBMM {
  idBMM: string;
  nomeBMM: string;
  subtituloBMM: string;
  descricaoBMM: string;
  precoBMM: number;
  imagemBMM: ImageSourcePropType;
  categoriaBMM: string;
  notaBMM: number;
  avaliacoesBMM: number;
  novoBMM: boolean;
}

export interface ItemCarrinhoBMM {
  chaveBMM: string;
  produtoBMM: ProdutoBMM;
  porteBMM: PorteBMM;
  quantidadeBMM: number;
}

export interface UsuarioBMM {
  nomeBMM: string;
  emailBMM: string;
  senhaBMM: string;
}

export interface LinhaPedidoBMM {
  nomeBMM: string;
  porteBMM: PorteBMM;
  quantidadeBMM: number;
  subtotalBMM: number;
}

export interface PedidoBMM {
  idBMM: string;
  dataBMM: string;
  linhasBMM: LinhaPedidoBMM[];
  totalBMM: number;
  freteBMM: number;
  pagamentoBMM: PagamentoBMM;
  enderecoBMM: string;
  statusBMM: string;
}

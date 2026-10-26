import { bancoBMM } from '../firebase/firestore';
import { produtosIniciaisBMM } from '../db/semente';
import { DadosProdutoBMM, FiltrosProdutoBMM, ProdutoBMM } from '../tipos/produto';

interface DocumentoProdutoBMM extends DadosProdutoBMM {
  ordem: number;
  criadoEm: string;
}

const nomeColecaoBMM = 'produtos';
const caminhoContadorBMM = 'meta/contadorProdutos';

const colecaoBMM = () => bancoBMM().collection(nomeColecaoBMM);

const paraProdutoBMM = (idBMM: string, dadosBMM: DocumentoProdutoBMM): ProdutoBMM => ({
  id: idBMM,
  nome: dadosBMM.nome,
  subtitulo: dadosBMM.subtitulo,
  descricao: dadosBMM.descricao,
  preco: dadosBMM.preco,
  imagem: dadosBMM.imagem,
  slug: dadosBMM.slug,
  categoria: dadosBMM.categoria,
  nota: dadosBMM.nota,
  avaliacoes: dadosBMM.avaliacoes,
  novo: dadosBMM.novo,
});

export const produtosRepositorioBMM = {
  async listarBMM(filtrosBMM: FiltrosProdutoBMM = {}): Promise<ProdutoBMM[]> {
    // O catálogo é pequeno: filtramos e ordenamos em memória para não depender de índices compostos do Firestore.
    const respostaBMM = await colecaoBMM().get();
    const termoBMM = filtrosBMM.buscaBMM?.toLowerCase();
    return respostaBMM.docs
      .map((docBMM) => ({ idBMM: docBMM.id, dadosBMM: docBMM.data() as DocumentoProdutoBMM }))
      .filter(({ dadosBMM }) => !filtrosBMM.categoriaBMM || dadosBMM.categoria === filtrosBMM.categoriaBMM)
      .filter(({ dadosBMM }) => !termoBMM || `${dadosBMM.nome} ${dadosBMM.subtitulo}`.toLowerCase().includes(termoBMM))
      .sort((aBMM, bBMM) => aBMM.dadosBMM.ordem - bBMM.dadosBMM.ordem)
      .map(({ idBMM, dadosBMM }) => paraProdutoBMM(idBMM, dadosBMM));
  },

  async buscarPorIdBMM(idBMM: string): Promise<ProdutoBMM | undefined> {
    const docBMM = await colecaoBMM().doc(idBMM).get();
    return docBMM.exists ? paraProdutoBMM(docBMM.id, docBMM.data() as DocumentoProdutoBMM) : undefined;
  },

  async inserirBMM(dadosBMM: DadosProdutoBMM): Promise<ProdutoBMM> {
    const bancoAtualBMM = bancoBMM();
    const refContadorBMM = bancoAtualBMM.doc(caminhoContadorBMM);
    // A transação garante que dois cadastros simultâneos não recebam o mesmo id.
    return bancoAtualBMM.runTransaction(async (transacaoBMM) => {
      const contadorBMM = await transacaoBMM.get(refContadorBMM);
      const proximoBMM = ((contadorBMM.data()?.ultimoId as number | undefined) ?? 0) + 1;
      const documentoBMM: DocumentoProdutoBMM = { ...dadosBMM, ordem: proximoBMM, criadoEm: new Date().toISOString() };
      transacaoBMM.set(colecaoBMM().doc(String(proximoBMM)), documentoBMM);
      transacaoBMM.set(refContadorBMM, { ultimoId: proximoBMM });
      return paraProdutoBMM(String(proximoBMM), documentoBMM);
    });
  },

  async atualizarBMM(idBMM: string, dadosBMM: DadosProdutoBMM): Promise<ProdutoBMM | undefined> {
    const refBMM = colecaoBMM().doc(idBMM);
    const atualBMM = await refBMM.get();
    if (!atualBMM.exists) return undefined;
    await refBMM.update({ ...dadosBMM });
    return this.buscarPorIdBMM(idBMM);
  },

  async removerBMM(idBMM: string): Promise<boolean> {
    const refBMM = colecaoBMM().doc(idBMM);
    const atualBMM = await refBMM.get();
    if (!atualBMM.exists) return false;
    await refBMM.delete();
    return true;
  },

  async listarCategoriasBMM(): Promise<string[]> {
    const listaBMM = await this.listarBMM();
    return [...new Set(listaBMM.map((produtoBMM) => produtoBMM.categoria))].sort((aBMM, bBMM) => aBMM.localeCompare(bBMM, 'pt-BR'));
  },

  async popularSeVazioBMM(): Promise<number> {
    const existentesBMM = await colecaoBMM().limit(1).get();
    if (!existentesBMM.empty) return 0;
    const bancoAtualBMM = bancoBMM();
    const loteBMM = bancoAtualBMM.batch();
    produtosIniciaisBMM.forEach((dadosBMM, indiceBMM) => {
      const numeroBMM = indiceBMM + 1;
      const documentoBMM: DocumentoProdutoBMM = { ...dadosBMM, ordem: numeroBMM, criadoEm: new Date().toISOString() };
      loteBMM.set(colecaoBMM().doc(String(numeroBMM)), documentoBMM);
    });
    loteBMM.set(bancoAtualBMM.doc(caminhoContadorBMM), { ultimoId: produtosIniciaisBMM.length });
    await loteBMM.commit();
    return produtosIniciaisBMM.length;
  },
};

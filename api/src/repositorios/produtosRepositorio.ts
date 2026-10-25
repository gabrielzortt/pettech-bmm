import { bancoBMM } from '../db/conexao';
import { produtosIniciaisBMM } from '../db/semente';
import { DadosProdutoBMM, FiltrosProdutoBMM, ProdutoBMM } from '../tipos/produto';

interface LinhaProdutoBMM extends Omit<ProdutoBMM, 'novo'> {
  novo: number;
}

const converterLinhaBMM = (linhaBMM: LinhaProdutoBMM): ProdutoBMM => ({ ...linhaBMM, novo: linhaBMM.novo === 1 });

const colunasBMM = 'id, nome, subtitulo, descricao, preco, imagem, categoria, nota, avaliacoes, novo';

const parametrosBMM = (dadosBMM: DadosProdutoBMM) => ({ ...dadosBMM, novo: dadosBMM.novo ? 1 : 0 });

export const produtosRepositorioBMM = {
  listarBMM(filtrosBMM: FiltrosProdutoBMM = {}): ProdutoBMM[] {
    const condicoesBMM: string[] = [];
    const valoresBMM: Record<string, string> = {};
    if (filtrosBMM.categoriaBMM) {
      condicoesBMM.push('categoria = @categoria');
      valoresBMM.categoria = filtrosBMM.categoriaBMM;
    }
    if (filtrosBMM.buscaBMM) {
      condicoesBMM.push('(nome LIKE @busca OR subtitulo LIKE @busca)');
      valoresBMM.busca = `%${filtrosBMM.buscaBMM}%`;
    }
    const filtroSqlBMM = condicoesBMM.length > 0 ? `WHERE ${condicoesBMM.join(' AND ')}` : '';
    const linhasBMM = bancoBMM.prepare(`SELECT ${colunasBMM} FROM produtos ${filtroSqlBMM} ORDER BY id`).all(valoresBMM) as LinhaProdutoBMM[];
    return linhasBMM.map(converterLinhaBMM);
  },

  buscarPorIdBMM(idBMM: number): ProdutoBMM | undefined {
    const linhaBMM = bancoBMM.prepare(`SELECT ${colunasBMM} FROM produtos WHERE id = ?`).get(idBMM) as LinhaProdutoBMM | undefined;
    return linhaBMM ? converterLinhaBMM(linhaBMM) : undefined;
  },

  inserirBMM(dadosBMM: DadosProdutoBMM): ProdutoBMM {
    const resultadoBMM = bancoBMM
      .prepare(
        `INSERT INTO produtos (nome, subtitulo, descricao, preco, imagem, categoria, nota, avaliacoes, novo)
         VALUES (@nome, @subtitulo, @descricao, @preco, @imagem, @categoria, @nota, @avaliacoes, @novo)`
      )
      .run(parametrosBMM(dadosBMM));
    return this.buscarPorIdBMM(Number(resultadoBMM.lastInsertRowid)) as ProdutoBMM;
  },

  atualizarBMM(idBMM: number, dadosBMM: DadosProdutoBMM): ProdutoBMM | undefined {
    const resultadoBMM = bancoBMM
      .prepare(
        `UPDATE produtos SET nome=@nome, subtitulo=@subtitulo, descricao=@descricao, preco=@preco, imagem=@imagem,
         categoria=@categoria, nota=@nota, avaliacoes=@avaliacoes, novo=@novo WHERE id=@id`
      )
      .run({ ...parametrosBMM(dadosBMM), id: idBMM });
    return resultadoBMM.changes > 0 ? this.buscarPorIdBMM(idBMM) : undefined;
  },

  removerBMM(idBMM: number): boolean {
    return bancoBMM.prepare('DELETE FROM produtos WHERE id = ?').run(idBMM).changes > 0;
  },

  listarCategoriasBMM(): string[] {
    const linhasBMM = bancoBMM.prepare('SELECT DISTINCT categoria FROM produtos ORDER BY categoria').all() as { categoria: string }[];
    return linhasBMM.map((linhaBMM) => linhaBMM.categoria);
  },

  popularSeVazioBMM(): number {
    const { total: totalBMM } = bancoBMM.prepare('SELECT COUNT(*) AS total FROM produtos').get() as { total: number };
    if (totalBMM > 0) return 0;
    const inserirTodosBMM = bancoBMM.transaction((listaBMM: typeof produtosIniciaisBMM) => {
      listaBMM.forEach((dadosBMM) => this.inserirBMM(dadosBMM));
    });
    inserirTodosBMM(produtosIniciaisBMM);
    return produtosIniciaisBMM.length;
  },
};

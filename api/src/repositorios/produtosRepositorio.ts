import { bancoBMM } from '../db/conexao';
import { produtosIniciaisBMM } from '../db/semente';
import { DadosProdutoBMM, FiltrosProdutoBMM, ProdutoBMM } from '../tipos/produto';

interface LinhaProdutoBMM extends Omit<ProdutoBMM, 'id' | 'novo'> {
  id: number;
  novo: number;
}

const colunasBMM = 'id, nome, subtitulo, descricao, preco, imagem, slug, categoria, nota, avaliacoes, novo';

const converterLinhaBMM = (linhaBMM: LinhaProdutoBMM): ProdutoBMM => ({ ...linhaBMM, id: String(linhaBMM.id), novo: linhaBMM.novo === 1 });

const parametrosBMM = (dadosBMM: DadosProdutoBMM) => ({ ...dadosBMM, novo: dadosBMM.novo ? 1 : 0 });

// Camada de acesso ao banco. O controlador não conhece SQL: trocar de banco só exige reescrever este arquivo.
export const produtosRepositorioBMM = {
  async listarBMM(filtrosBMM: FiltrosProdutoBMM = {}): Promise<ProdutoBMM[]> {
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

  async buscarPorIdBMM(idBMM: string): Promise<ProdutoBMM | undefined> {
    const linhaBMM = bancoBMM.prepare(`SELECT ${colunasBMM} FROM produtos WHERE id = ?`).get(Number(idBMM)) as LinhaProdutoBMM | undefined;
    return linhaBMM ? converterLinhaBMM(linhaBMM) : undefined;
  },

  async inserirBMM(dadosBMM: DadosProdutoBMM): Promise<ProdutoBMM> {
    const resultadoBMM = bancoBMM
      .prepare(
        `INSERT INTO produtos (nome, subtitulo, descricao, preco, imagem, slug, categoria, nota, avaliacoes, novo)
         VALUES (@nome, @subtitulo, @descricao, @preco, @imagem, @slug, @categoria, @nota, @avaliacoes, @novo)`
      )
      .run(parametrosBMM(dadosBMM));
    return (await this.buscarPorIdBMM(String(resultadoBMM.lastInsertRowid))) as ProdutoBMM;
  },

  async atualizarBMM(idBMM: string, dadosBMM: DadosProdutoBMM): Promise<ProdutoBMM | undefined> {
    const resultadoBMM = bancoBMM
      .prepare(
        `UPDATE produtos SET nome=@nome, subtitulo=@subtitulo, descricao=@descricao, preco=@preco, imagem=@imagem,
         slug=@slug, categoria=@categoria, nota=@nota, avaliacoes=@avaliacoes, novo=@novo WHERE id=@id`
      )
      .run({ ...parametrosBMM(dadosBMM), id: Number(idBMM) });
    return resultadoBMM.changes > 0 ? this.buscarPorIdBMM(idBMM) : undefined;
  },

  async removerBMM(idBMM: string): Promise<boolean> {
    return bancoBMM.prepare('DELETE FROM produtos WHERE id = ?').run(Number(idBMM)).changes > 0;
  },

  async listarCategoriasBMM(): Promise<string[]> {
    const linhasBMM = bancoBMM.prepare('SELECT DISTINCT categoria FROM produtos ORDER BY categoria').all() as { categoria: string }[];
    return linhasBMM.map((linhaBMM) => linhaBMM.categoria);
  },

  async popularSeVazioBMM(): Promise<number> {
    const { total: totalBMM } = bancoBMM.prepare('SELECT COUNT(*) AS total FROM produtos').get() as { total: number };
    if (totalBMM > 0) return 0;
    const inserirTodosBMM = bancoBMM.transaction((listaBMM: typeof produtosIniciaisBMM) => {
      listaBMM.forEach((dadosBMM) => {
        bancoBMM
          .prepare(
            `INSERT INTO produtos (nome, subtitulo, descricao, preco, imagem, slug, categoria, nota, avaliacoes, novo)
             VALUES (@nome, @subtitulo, @descricao, @preco, @imagem, @slug, @categoria, @nota, @avaliacoes, @novo)`
          )
          .run(parametrosBMM(dadosBMM));
      });
    });
    inserirTodosBMM(produtosIniciaisBMM);
    return produtosIniciaisBMM.length;
  },
};

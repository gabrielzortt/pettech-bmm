import { BindParams } from 'sql.js';
import { consultarBMM, emTransacaoBMM, executarBMM } from '../db/conexao';
import { produtosIniciaisBMM } from '../db/semente';
import { DadosProdutoBMM, FiltrosProdutoBMM, ProdutoBMM } from '../tipos/produto';

interface LinhaProdutoBMM extends Omit<ProdutoBMM, 'id' | 'novo'> {
  id: number;
  novo: number;
}

const colunasBMM = 'id, nome, subtitulo, descricao, preco, imagem, slug, categoria, nota, avaliacoes, novo';

const converterLinhaBMM = (linhaBMM: LinhaProdutoBMM): ProdutoBMM => ({ ...linhaBMM, id: String(linhaBMM.id), novo: linhaBMM.novo === 1 });

// Nomes dos parâmetros com @ para o sql.js (o valor nunca é colado no texto do SQL: isso impede injeção de SQL).
const parametrosBMM = (dadosBMM: DadosProdutoBMM): BindParams => ({
  '@nome': dadosBMM.nome,
  '@subtitulo': dadosBMM.subtitulo,
  '@descricao': dadosBMM.descricao,
  '@preco': dadosBMM.preco,
  '@imagem': dadosBMM.imagem,
  '@slug': dadosBMM.slug,
  '@categoria': dadosBMM.categoria,
  '@nota': dadosBMM.nota,
  '@avaliacoes': dadosBMM.avaliacoes,
  '@novo': dadosBMM.novo ? 1 : 0,
});

const sqlInserirBMM = `INSERT INTO produtos (nome, subtitulo, descricao, preco, imagem, slug, categoria, nota, avaliacoes, novo)
  VALUES (@nome, @subtitulo, @descricao, @preco, @imagem, @slug, @categoria, @nota, @avaliacoes, @novo)`;

// Camada de acesso ao banco. O controlador não conhece SQL: trocar de banco só exige reescrever este arquivo.
export const produtosRepositorioBMM = {
  async listarBMM(filtrosBMM: FiltrosProdutoBMM = {}): Promise<ProdutoBMM[]> {
    const condicoesBMM: string[] = [];
    const valoresBMM: Record<string, string> = {};
    if (filtrosBMM.categoriaBMM) {
      condicoesBMM.push('categoria = @categoria');
      valoresBMM['@categoria'] = filtrosBMM.categoriaBMM;
    }
    if (filtrosBMM.buscaBMM) {
      condicoesBMM.push('(nome LIKE @busca OR subtitulo LIKE @busca)');
      valoresBMM['@busca'] = `%${filtrosBMM.buscaBMM}%`;
    }
    const filtroSqlBMM = condicoesBMM.length > 0 ? `WHERE ${condicoesBMM.join(' AND ')}` : '';
    return consultarBMM<LinhaProdutoBMM>(`SELECT ${colunasBMM} FROM produtos ${filtroSqlBMM} ORDER BY id`, valoresBMM).map(converterLinhaBMM);
  },

  async buscarPorIdBMM(idBMM: string): Promise<ProdutoBMM | undefined> {
    const [linhaBMM] = consultarBMM<LinhaProdutoBMM>(`SELECT ${colunasBMM} FROM produtos WHERE id = ?`, [Number(idBMM)]);
    return linhaBMM ? converterLinhaBMM(linhaBMM) : undefined;
  },

  async inserirBMM(dadosBMM: DadosProdutoBMM): Promise<ProdutoBMM> {
    const { ultimoIdBMM } = executarBMM(sqlInserirBMM, parametrosBMM(dadosBMM));
    return (await this.buscarPorIdBMM(String(ultimoIdBMM))) as ProdutoBMM;
  },

  async atualizarBMM(idBMM: string, dadosBMM: DadosProdutoBMM): Promise<ProdutoBMM | undefined> {
    const { alteradasBMM } = executarBMM(
      `UPDATE produtos SET nome=@nome, subtitulo=@subtitulo, descricao=@descricao, preco=@preco, imagem=@imagem,
       slug=@slug, categoria=@categoria, nota=@nota, avaliacoes=@avaliacoes, novo=@novo WHERE id=@id`,
      { ...parametrosBMM(dadosBMM) as Record<string, string | number>, '@id': Number(idBMM) }
    );
    return alteradasBMM > 0 ? this.buscarPorIdBMM(idBMM) : undefined;
  },

  async removerBMM(idBMM: string): Promise<boolean> {
    return executarBMM('DELETE FROM produtos WHERE id = ?', [Number(idBMM)]).alteradasBMM > 0;
  },

  async listarCategoriasBMM(): Promise<string[]> {
    return consultarBMM<{ categoria: string }>('SELECT DISTINCT categoria FROM produtos ORDER BY categoria').map((linhaBMM) => linhaBMM.categoria);
  },

  async popularSeVazioBMM(): Promise<number> {
    const [{ total: totalBMM }] = consultarBMM<{ total: number }>('SELECT COUNT(*) AS total FROM produtos');
    if (totalBMM > 0) return 0;
    emTransacaoBMM(() => {
      produtosIniciaisBMM.forEach((dadosBMM) => executarBMM(sqlInserirBMM, parametrosBMM(dadosBMM), false));
    });
    return produtosIniciaisBMM.length;
  },
};

import fs from 'fs';
import path from 'path';
import initSqlJs, { BindParams, Database } from 'sql.js';
import { ambienteBMM } from '../config/ambiente';

// SQLite em JavaScript puro (sql.js): não precisa compilar nada na instalação, funciona em qualquer computador.
// O banco vive na memória e é gravado no arquivo server/dados/pettech.db a cada alteração.

let bancoBMM: Database | null = null;

export async function abrirBancoBMM(): Promise<void> {
  const SQLBMM = await initSqlJs();
  fs.mkdirSync(path.dirname(ambienteBMM.arquivoBancoBMM), { recursive: true });
  bancoBMM = fs.existsSync(ambienteBMM.arquivoBancoBMM)
    ? new SQLBMM.Database(fs.readFileSync(ambienteBMM.arquivoBancoBMM))
    : new SQLBMM.Database();

  bancoBMM.exec(`
    CREATE TABLE IF NOT EXISTS produtos (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      nome       TEXT    NOT NULL,
      subtitulo  TEXT    NOT NULL DEFAULT '',
      descricao  TEXT    NOT NULL,
      preco      REAL    NOT NULL CHECK (preco > 0),
      imagem     TEXT    NOT NULL,
      slug       TEXT    NOT NULL DEFAULT '',
      categoria  TEXT    NOT NULL,
      nota       REAL    NOT NULL DEFAULT 0 CHECK (nota BETWEEN 0 AND 5),
      avaliacoes INTEGER NOT NULL DEFAULT 0 CHECK (avaliacoes >= 0),
      novo       INTEGER NOT NULL DEFAULT 1 CHECK (novo IN (0, 1)),
      criado_em  TEXT    NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON produtos (categoria);
  `);
  salvarBancoBMM();
}

const obterBancoBMM = (): Database => {
  if (!bancoBMM) throw new Error('O banco de dados ainda não foi aberto.');
  return bancoBMM;
};

// Grava o banco no arquivo (escreve em um temporário e renomeia, para nunca deixar o arquivo pela metade).
export function salvarBancoBMM(): void {
  const temporarioBMM = `${ambienteBMM.arquivoBancoBMM}.tmp`;
  fs.writeFileSync(temporarioBMM, Buffer.from(obterBancoBMM().export()));
  fs.renameSync(temporarioBMM, ambienteBMM.arquivoBancoBMM);
}

// SELECT: devolve as linhas como objetos.
export function consultarBMM<TipoBMM>(sqlBMM: string, parametrosBMM: BindParams = []): TipoBMM[] {
  const instrucaoBMM = obterBancoBMM().prepare(sqlBMM);
  try {
    instrucaoBMM.bind(parametrosBMM);
    const linhasBMM: TipoBMM[] = [];
    while (instrucaoBMM.step()) linhasBMM.push(instrucaoBMM.getAsObject() as TipoBMM);
    return linhasBMM;
  } finally {
    instrucaoBMM.free();
  }
}

// INSERT/UPDATE/DELETE: devolve quantas linhas mudaram e o último id gerado, e grava o arquivo.
export function executarBMM(sqlBMM: string, parametrosBMM: BindParams = [], salvarBMM: boolean = true): { alteradasBMM: number; ultimoIdBMM: number } {
  const instanciaBMM = obterBancoBMM();
  instanciaBMM.run(sqlBMM, parametrosBMM);
  const alteradasBMM = instanciaBMM.getRowsModified();
  const [{ id: ultimoIdBMM }] = consultarBMM<{ id: number }>('SELECT last_insert_rowid() AS id');
  if (salvarBMM) salvarBancoBMM();
  return { alteradasBMM, ultimoIdBMM };
}

// Executa vários comandos como uma única transação: ou todos entram, ou nenhum.
export function emTransacaoBMM(funcaoBMM: () => void): void {
  const instanciaBMM = obterBancoBMM();
  instanciaBMM.exec('BEGIN');
  try {
    funcaoBMM();
    instanciaBMM.exec('COMMIT');
  } catch (erroBMM) {
    instanciaBMM.exec('ROLLBACK');
    throw erroBMM;
  }
  salvarBancoBMM();
}

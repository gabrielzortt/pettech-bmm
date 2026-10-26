import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';
import { ambienteBMM } from '../config/ambiente';

fs.mkdirSync(path.dirname(ambienteBMM.arquivoBancoBMM), { recursive: true });

export const bancoBMM = new Database(ambienteBMM.arquivoBancoBMM);

bancoBMM.pragma('journal_mode = WAL');
bancoBMM.pragma('foreign_keys = ON');

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

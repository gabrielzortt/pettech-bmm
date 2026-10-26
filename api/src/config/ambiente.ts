import path from 'path';

const raizBMM = path.resolve(__dirname, '..', '..');

export const ambienteBMM = {
  portaBMM: Number(process.env.PORT) || 3333,
  arquivoBancoBMM: process.env.DB_ARQUIVO || path.join(raizBMM, 'dados', 'pettech.db'),
  pastaPublicaBMM: path.join(raizBMM, 'public'),
};

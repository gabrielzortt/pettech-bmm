import path from 'path';

const raizBMM = path.resolve(__dirname, '..', '..');

export const ambienteBMM = {
  portaBMM: Number(process.env.PORT) || 3333,
  pastaPublicaBMM: path.join(raizBMM, 'public'),
};

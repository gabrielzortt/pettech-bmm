import { NextFunction, Request, Response } from 'express';

export const rotaNaoEncontradaBMM = (_reqBMM: Request, resBMM: Response): void => {
  resBMM.status(404).json({ erro: 'Rota não encontrada.' });
};

export const tratarErrosBMM = (erroBMM: { type?: string }, _reqBMM: Request, resBMM: Response, _proximoBMM: NextFunction): void => {
  if (erroBMM.type === 'entity.parse.failed') {
    resBMM.status(400).json({ erro: 'JSON inválido no corpo da requisição.' });
    return;
  }
  console.error(erroBMM);
  resBMM.status(500).json({ erro: 'Erro interno do servidor.' });
};

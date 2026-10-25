import { Router, Request, Response } from 'express';
import { produtosBMM } from '../data/produtos';
import { validarNovoProdutoBMM } from '../validacao';
import { ProdutoBMM } from '../tipos';

export const rotasProdutosBMM = Router();

const gerarProximoIdBMM = (): string => {
  const maiorIdBMM = produtosBMM.reduce((maiorBMM, produtoBMM) => Math.max(maiorBMM, Number(produtoBMM.id)), 0);
  return String(maiorIdBMM + 1);
};

rotasProdutosBMM.get('/', (_reqBMM: Request, resBMM: Response) => {
  resBMM.status(200).json(produtosBMM);
});

rotasProdutosBMM.get('/:id', (reqBMM: Request, resBMM: Response) => {
  const idBMM = String(reqBMM.params.id);
  if (!/^\d+$/.test(idBMM)) {
    resBMM.status(400).json({ erro: 'ID inválido. Informe um número inteiro positivo.' });
    return;
  }
  const produtoBMM = produtosBMM.find((itemBMM) => itemBMM.id === idBMM);
  if (!produtoBMM) {
    resBMM.status(404).json({ erro: `Produto com id ${idBMM} não encontrado.` });
    return;
  }
  resBMM.status(200).json(produtoBMM);
});

rotasProdutosBMM.post('/', (reqBMM: Request, resBMM: Response) => {
  const resultadoBMM = validarNovoProdutoBMM(reqBMM.body);
  if (!resultadoBMM.validoBMM) {
    resBMM.status(400).json({ erro: 'Dados inválidos.', detalhes: resultadoBMM.errosBMM });
    return;
  }
  const novoBMM: ProdutoBMM = { id: gerarProximoIdBMM(), ...resultadoBMM.dadosBMM };
  produtosBMM.push(novoBMM);
  resBMM.status(201).location(`/produtos/${novoBMM.id}`).json(novoBMM);
});

import { Request, Response } from 'express';
import { produtosRepositorioBMM } from '../repositorios/produtosRepositorio';
import { validarProdutoBMM } from '../validacao/produtoValidacao';
import { ProdutoBMM } from '../tipos/produto';

const montarUrlBaseBMM = (reqBMM: Request): string => `${reqBMM.protocol}://${reqBMM.get('host')}`;

const comImagemAbsolutaBMM = (produtoBMM: ProdutoBMM, urlBaseBMM: string): ProdutoBMM => ({
  ...produtoBMM,
  imagem: produtoBMM.imagem.startsWith('/') ? `${urlBaseBMM}${produtoBMM.imagem}` : produtoBMM.imagem,
});

const lerIdBMM = (reqBMM: Request, resBMM: Response): number | null => {
  const idTextoBMM = String(reqBMM.params.id);
  if (!/^[1-9]\d*$/.test(idTextoBMM)) {
    resBMM.status(400).json({ erro: 'ID inválido. Informe um número inteiro positivo.' });
    return null;
  }
  return Number(idTextoBMM);
};

const lerTextoConsultaBMM = (valorBMM: unknown): string | undefined =>
  typeof valorBMM === 'string' && valorBMM.trim() !== '' ? valorBMM.trim() : undefined;

export const produtosControladorBMM = {
  listarBMM(reqBMM: Request, resBMM: Response): void {
    const listaBMM = produtosRepositorioBMM.listarBMM({
      categoriaBMM: lerTextoConsultaBMM(reqBMM.query.categoria),
      buscaBMM: lerTextoConsultaBMM(reqBMM.query.busca),
    });
    const urlBaseBMM = montarUrlBaseBMM(reqBMM);
    resBMM.status(200).json(listaBMM.map((produtoBMM) => comImagemAbsolutaBMM(produtoBMM, urlBaseBMM)));
  },

  buscarBMM(reqBMM: Request, resBMM: Response): void {
    const idBMM = lerIdBMM(reqBMM, resBMM);
    if (idBMM === null) return;
    const produtoBMM = produtosRepositorioBMM.buscarPorIdBMM(idBMM);
    if (!produtoBMM) {
      resBMM.status(404).json({ erro: `Produto com id ${idBMM} não encontrado.` });
      return;
    }
    resBMM.status(200).json(comImagemAbsolutaBMM(produtoBMM, montarUrlBaseBMM(reqBMM)));
  },

  criarBMM(reqBMM: Request, resBMM: Response): void {
    const resultadoBMM = validarProdutoBMM(reqBMM.body);
    if (!resultadoBMM.validoBMM) {
      resBMM.status(400).json({ erro: 'Dados inválidos.', detalhes: resultadoBMM.errosBMM });
      return;
    }
    const criadoBMM = produtosRepositorioBMM.inserirBMM(resultadoBMM.dadosBMM);
    resBMM.status(201).location(`/produtos/${criadoBMM.id}`).json(comImagemAbsolutaBMM(criadoBMM, montarUrlBaseBMM(reqBMM)));
  },

  atualizarBMM(reqBMM: Request, resBMM: Response): void {
    const idBMM = lerIdBMM(reqBMM, resBMM);
    if (idBMM === null) return;
    const resultadoBMM = validarProdutoBMM(reqBMM.body);
    if (!resultadoBMM.validoBMM) {
      resBMM.status(400).json({ erro: 'Dados inválidos.', detalhes: resultadoBMM.errosBMM });
      return;
    }
    const atualizadoBMM = produtosRepositorioBMM.atualizarBMM(idBMM, resultadoBMM.dadosBMM);
    if (!atualizadoBMM) {
      resBMM.status(404).json({ erro: `Produto com id ${idBMM} não encontrado.` });
      return;
    }
    resBMM.status(200).json(comImagemAbsolutaBMM(atualizadoBMM, montarUrlBaseBMM(reqBMM)));
  },

  removerBMM(reqBMM: Request, resBMM: Response): void {
    const idBMM = lerIdBMM(reqBMM, resBMM);
    if (idBMM === null) return;
    if (!produtosRepositorioBMM.removerBMM(idBMM)) {
      resBMM.status(404).json({ erro: `Produto com id ${idBMM} não encontrado.` });
      return;
    }
    resBMM.status(204).send();
  },

  listarCategoriasBMM(_reqBMM: Request, resBMM: Response): void {
    resBMM.status(200).json(produtosRepositorioBMM.listarCategoriasBMM());
  },
};

import { Request, Response } from 'express';
import { produtosRepositorioBMM } from '../repositorios/produtosRepositorio';
import { validarProdutoBMM } from '../validacao/produtoValidacao';
import { ProdutoBMM } from '../tipos/produto';

const montarUrlBaseBMM = (reqBMM: Request): string => `${reqBMM.protocol}://${reqBMM.get('host')}`;

const comImagemAbsolutaBMM = (produtoBMM: ProdutoBMM, urlBaseBMM: string): ProdutoBMM => ({
  ...produtoBMM,
  imagem: produtoBMM.imagem.startsWith('/') ? `${urlBaseBMM}${produtoBMM.imagem}` : produtoBMM.imagem,
});

const lerIdBMM = (reqBMM: Request, resBMM: Response): string | null => {
  const idTextoBMM = String(reqBMM.params.id);
  if (!/^[1-9]\d*$/.test(idTextoBMM)) {
    resBMM.status(400).json({ erro: 'ID inválido. Informe um número inteiro positivo.' });
    return null;
  }
  return idTextoBMM;
};

const lerTextoConsultaBMM = (valorBMM: unknown): string | undefined =>
  typeof valorBMM === 'string' && valorBMM.trim() !== '' ? valorBMM.trim() : undefined;

export const produtosControladorBMM = {
  async listarBMM(reqBMM: Request, resBMM: Response): Promise<void> {
    const listaBMM = await produtosRepositorioBMM.listarBMM({
      categoriaBMM: lerTextoConsultaBMM(reqBMM.query.categoria),
      buscaBMM: lerTextoConsultaBMM(reqBMM.query.busca),
    });
    const urlBaseBMM = montarUrlBaseBMM(reqBMM);
    resBMM.status(200).json(listaBMM.map((produtoBMM) => comImagemAbsolutaBMM(produtoBMM, urlBaseBMM)));
  },

  async buscarBMM(reqBMM: Request, resBMM: Response): Promise<void> {
    const idBMM = lerIdBMM(reqBMM, resBMM);
    if (idBMM === null) return;
    const produtoBMM = await produtosRepositorioBMM.buscarPorIdBMM(idBMM);
    if (!produtoBMM) {
      resBMM.status(404).json({ erro: `Produto com id ${idBMM} não encontrado.` });
      return;
    }
    resBMM.status(200).json(comImagemAbsolutaBMM(produtoBMM, montarUrlBaseBMM(reqBMM)));
  },

  async criarBMM(reqBMM: Request, resBMM: Response): Promise<void> {
    const resultadoBMM = validarProdutoBMM(reqBMM.body);
    if (!resultadoBMM.validoBMM) {
      resBMM.status(400).json({ erro: 'Dados inválidos.', detalhes: resultadoBMM.errosBMM });
      return;
    }
    const criadoBMM = await produtosRepositorioBMM.inserirBMM(resultadoBMM.dadosBMM);
    resBMM.status(201).location(`/produtos/${criadoBMM.id}`).json(comImagemAbsolutaBMM(criadoBMM, montarUrlBaseBMM(reqBMM)));
  },

  async atualizarBMM(reqBMM: Request, resBMM: Response): Promise<void> {
    const idBMM = lerIdBMM(reqBMM, resBMM);
    if (idBMM === null) return;
    const resultadoBMM = validarProdutoBMM(reqBMM.body);
    if (!resultadoBMM.validoBMM) {
      resBMM.status(400).json({ erro: 'Dados inválidos.', detalhes: resultadoBMM.errosBMM });
      return;
    }
    const atualizadoBMM = await produtosRepositorioBMM.atualizarBMM(idBMM, resultadoBMM.dadosBMM);
    if (!atualizadoBMM) {
      resBMM.status(404).json({ erro: `Produto com id ${idBMM} não encontrado.` });
      return;
    }
    resBMM.status(200).json(comImagemAbsolutaBMM(atualizadoBMM, montarUrlBaseBMM(reqBMM)));
  },

  async removerBMM(reqBMM: Request, resBMM: Response): Promise<void> {
    const idBMM = lerIdBMM(reqBMM, resBMM);
    if (idBMM === null) return;
    if (!(await produtosRepositorioBMM.removerBMM(idBMM))) {
      resBMM.status(404).json({ erro: `Produto com id ${idBMM} não encontrado.` });
      return;
    }
    resBMM.status(204).send();
  },

  async listarCategoriasBMM(_reqBMM: Request, resBMM: Response): Promise<void> {
    resBMM.status(200).json(await produtosRepositorioBMM.listarCategoriasBMM());
  },
};

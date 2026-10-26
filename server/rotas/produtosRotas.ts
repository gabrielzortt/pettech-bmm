import { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import { produtosControladorBMM } from '../controladores/produtosControlador';

export const produtosRotasBMM = Router();

// Express 4 não captura erros de funções assíncronas sozinho: repassamos para o middleware de erros.
export const assincronoBMM =
  (funcaoBMM: (reqBMM: Request, resBMM: Response) => Promise<void>): RequestHandler =>
  (reqBMM: Request, resBMM: Response, proximoBMM: NextFunction) => {
    funcaoBMM(reqBMM, resBMM).catch(proximoBMM);
  };

produtosRotasBMM.get('/', assincronoBMM(produtosControladorBMM.listarBMM));
produtosRotasBMM.get('/:id', assincronoBMM(produtosControladorBMM.buscarBMM));
produtosRotasBMM.post('/', assincronoBMM(produtosControladorBMM.criarBMM));
produtosRotasBMM.put('/:id', assincronoBMM(produtosControladorBMM.atualizarBMM));
produtosRotasBMM.delete('/:id', assincronoBMM(produtosControladorBMM.removerBMM));

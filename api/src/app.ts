import express from 'express';
import cors from 'cors';
import { ambienteBMM } from './config/ambiente';
import { produtosRotasBMM } from './rotas/produtosRotas';
import { produtosControladorBMM } from './controladores/produtosControlador';
import { rotaNaoEncontradaBMM, tratarErrosBMM } from './middlewares/erros';

export const appBMM = express();

appBMM.use(cors());
appBMM.use(express.json());
appBMM.use('/imagens', express.static(`${ambienteBMM.pastaPublicaBMM}/imagens`, { maxAge: '7d' }));

appBMM.get('/', (_reqBMM, resBMM) => {
  resBMM.status(200).json({
    api: 'PetTech API',
    status: 'online',
    rotas: ['GET /produtos', 'GET /produtos/:id', 'POST /produtos', 'PUT /produtos/:id', 'DELETE /produtos/:id', 'GET /categorias'],
  });
});
appBMM.get('/saude', (_reqBMM, resBMM) => {
  resBMM.status(200).json({ status: 'ok' });
});
appBMM.get('/categorias', produtosControladorBMM.listarCategoriasBMM);
appBMM.use('/produtos', produtosRotasBMM);

appBMM.use(rotaNaoEncontradaBMM);
appBMM.use(tratarErrosBMM);

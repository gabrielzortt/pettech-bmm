import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { rotasProdutosBMM } from './routes/produtos';

const appBMM = express();
const portaBMM: number = Number(process.env.PORT) || 3333;

appBMM.use(cors());
appBMM.use(express.json());

appBMM.get('/', (_reqBMM: Request, resBMM: Response) => {
  resBMM.status(200).json({ api: 'PetTech API', status: 'online', rotas: ['GET /produtos', 'GET /produtos/:id', 'POST /produtos'] });
});

appBMM.use('/produtos', rotasProdutosBMM);

appBMM.use((_reqBMM: Request, resBMM: Response) => {
  resBMM.status(404).json({ erro: 'Rota não encontrada.' });
});

appBMM.use((erroBMM: { type?: string }, _reqBMM: Request, resBMM: Response, _proximoBMM: NextFunction) => {
  if (erroBMM.type === 'entity.parse.failed') {
    resBMM.status(400).json({ erro: 'JSON inválido no corpo da requisição.' });
    return;
  }
  console.error(erroBMM);
  resBMM.status(500).json({ erro: 'Erro interno do servidor.' });
});

appBMM.listen(portaBMM, '0.0.0.0', () => {
  console.log(`PetTech API rodando em http://localhost:${portaBMM}`);
});

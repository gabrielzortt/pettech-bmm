import { Router } from 'express';
import { produtosControladorBMM } from '../controladores/produtosControlador';

export const produtosRotasBMM = Router();

produtosRotasBMM.get('/', produtosControladorBMM.listarBMM);
produtosRotasBMM.get('/:id', produtosControladorBMM.buscarBMM);
produtosRotasBMM.post('/', produtosControladorBMM.criarBMM);
produtosRotasBMM.put('/:id', produtosControladorBMM.atualizarBMM);
produtosRotasBMM.delete('/:id', produtosControladorBMM.removerBMM);

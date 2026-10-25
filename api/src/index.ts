import { appBMM } from './app';
import { ambienteBMM } from './config/ambiente';
import { produtosRepositorioBMM } from './repositorios/produtosRepositorio';

const inseridosBMM = produtosRepositorioBMM.popularSeVazioBMM();
if (inseridosBMM > 0) console.log(`Banco criado com ${inseridosBMM} produtos iniciais.`);

appBMM.listen(ambienteBMM.portaBMM, '0.0.0.0', () => {
  console.log(`PetTech API rodando em http://localhost:${ambienteBMM.portaBMM}`);
});

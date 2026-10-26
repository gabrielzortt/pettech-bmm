import { appBMM } from './app';
import { ambienteBMM } from './config/ambiente';
import { produtosRepositorioBMM } from './repositorios/produtosRepositorio';

async function iniciarBMM(): Promise<void> {
  const inseridosBMM = await produtosRepositorioBMM.popularSeVazioBMM();
  if (inseridosBMM > 0) console.log(`Firestore populado com ${inseridosBMM} produtos iniciais.`);

  appBMM.listen(ambienteBMM.portaBMM, '0.0.0.0', () => {
    console.log(`PetTech API rodando na porta ${ambienteBMM.portaBMM}`);
  });
}

iniciarBMM().catch((erroBMM) => {
  console.error('Falha ao iniciar a API:', erroBMM instanceof Error ? erroBMM.message : erroBMM);
  process.exit(1);
});

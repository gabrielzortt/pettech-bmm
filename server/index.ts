import { appBMM } from './app';
import { ambienteBMM } from './config/ambiente';
import { abrirBancoBMM } from './db/conexao';
import { produtosRepositorioBMM } from './repositorios/produtosRepositorio';

// Abre o banco, cria os produtos iniciais (se for a primeira vez) e liga o servidor Express.
export async function iniciarServidorBMM(): Promise<void> {
  await abrirBancoBMM();
  const inseridosBMM = await produtosRepositorioBMM.popularSeVazioBMM();
  if (inseridosBMM > 0) console.log(`[API] Banco criado com ${inseridosBMM} produtos iniciais.`);

  await new Promise<void>((resolverBMM) => {
    const servidorBMM = appBMM.listen(ambienteBMM.portaBMM, '0.0.0.0', () => {
      console.log(`[API] PetTech API rodando em http://localhost:${ambienteBMM.portaBMM}`);
      resolverBMM();
    });
    servidorBMM.on('error', (erroBMM: NodeJS.ErrnoException) => {
      if (erroBMM.code === 'EADDRINUSE') {
        console.log(`[API] A porta ${ambienteBMM.portaBMM} já está em uso: o app vai usar a API que já está rodando.`);
        resolverBMM();
        return;
      }
      console.error('[API] Falha ao iniciar:', erroBMM.message);
      process.exit(1);
    });
  });
}

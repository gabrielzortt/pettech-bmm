// Ponto único de entrada do projeto: "npm start" sobe a API (Express + SQLite) e o app (Expo) juntos.
require('tsx/cjs');
const { spawn } = require('child_process');
const { iniciarServidorBMM } = require('../server/index.ts');

async function principalBMM() {
  const argumentosBMM = process.argv.slice(2);
  const somenteApiBMM = argumentosBMM.includes('--so-api');

  await iniciarServidorBMM();
  if (somenteApiBMM) return;

  console.log('[APP] Iniciando o Expo...\n');
  const expoBMM = spawn('npx', ['expo', 'start', ...argumentosBMM], { stdio: 'inherit', shell: true });
  expoBMM.on('exit', (codigoBMM) => process.exit(codigoBMM ?? 0));
}

principalBMM().catch((erroBMM) => {
  console.error('Falha ao iniciar o projeto:', erroBMM);
  process.exit(1);
});

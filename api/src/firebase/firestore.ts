import { cert, getApps, initializeApp, ServiceAccount } from 'firebase-admin/app';
import { Firestore, getFirestore } from 'firebase-admin/firestore';

const lerCredenciaisBMM = (): ServiceAccount => {
  const textoBase64BMM = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  const textoJsonBMM = process.env.FIREBASE_SERVICE_ACCOUNT ?? (textoBase64BMM ? Buffer.from(textoBase64BMM, 'base64').toString('utf8') : undefined);

  if (!textoJsonBMM) {
    throw new Error(
      'Credenciais do Firebase ausentes. Defina a variável de ambiente FIREBASE_SERVICE_ACCOUNT com o JSON da conta de serviço (Firebase Console > Configurações do projeto > Contas de serviço > Gerar nova chave privada).'
    );
  }

  const dadosBMM = JSON.parse(textoJsonBMM) as { project_id: string; client_email: string; private_key: string };
  return {
    projectId: dadosBMM.project_id,
    clientEmail: dadosBMM.client_email,
    privateKey: dadosBMM.private_key.replace(/\\n/g, '\n'),
  };
};

let instanciaBMM: Firestore | null = null;

export const bancoBMM = (): Firestore => {
  if (!instanciaBMM) {
    if (getApps().length === 0) initializeApp({ credential: cert(lerCredenciaisBMM()) });
    instanciaBMM = getFirestore();
  }
  return instanciaBMM;
};

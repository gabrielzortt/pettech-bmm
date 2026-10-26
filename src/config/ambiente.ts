import { Platform } from 'react-native';
import Constants from 'expo-constants';

const portaApiBMM: number = 3333;

// Descobre onde está a API:
// 1) EXPO_PUBLIC_API_URL, se definida (ex.: API hospedada);
// 2) o IP do computador que está rodando o Expo (celular e PC na mesma rede Wi-Fi);
// 3) localhost (navegador) ou 10.0.2.2 (emulador Android).
const descobrirUrlBMM = (): string => {
  const urlConfiguradaBMM = process.env.EXPO_PUBLIC_API_URL;
  if (urlConfiguradaBMM) return urlConfiguradaBMM.replace(/\/$/, '');
  const hostBMM = Constants.expoConfig?.hostUri?.split(':')[0];
  if (hostBMM) return `http://${hostBMM}:${portaApiBMM}`;
  return Platform.OS === 'android' ? `http://10.0.2.2:${portaApiBMM}` : `http://localhost:${portaApiBMM}`;
};

export const urlApiBMM: string = descobrirUrlBMM();
export const tempoLimiteApiBMM: number = 15000;

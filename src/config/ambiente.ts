// URL da API hospedada (Express + Firebase). Pode ser trocada com a variável EXPO_PUBLIC_API_URL.
export const urlApiBMM: string = (process.env.EXPO_PUBLIC_API_URL || 'https://pettech-api-bmm.onrender.com').replace(/\/$/, '');

// Servidores gratuitos "dormem" quando ficam parados e levam alguns segundos para acordar.
export const tempoLimiteApiBMM: number = 45000;

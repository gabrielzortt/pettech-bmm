const unsplashBMM = (idFotoBMM: string, larguraBMM: number): string =>
  `https://images.unsplash.com/${idFotoBMM}?auto=format&fit=crop&w=${larguraBMM}&q=80`;

// Fotos reais (Unsplash) usadas no login e no carrossel de boas-vindas.
export const fotosRemotasBMM = {
  loginBMM: unsplashBMM('photo-1587300003388-59208cc962cb', 900),
  boasVindasBMM: [
    unsplashBMM('photo-1548199973-03cce0bbc87b', 1000),
    unsplashBMM('photo-1514888286974-6c03e2ca1dba', 1000),
    unsplashBMM('photo-1543466835-00a7907e9de1', 1000),
  ],
};

const montarBMM = (idFotoBMM: string, larguraBMM: number): string =>
  `https://images.unsplash.com/${idFotoBMM}?auto=format&fit=crop&w=${larguraBMM}&q=80`;

export const imagensBMM = {
  loginBMM: montarBMM('photo-1587300003388-59208cc962cb', 900),
  boasVindasBMM: [
    montarBMM('photo-1548199973-03cce0bbc87b', 1000),
    montarBMM('photo-1514888286974-6c03e2ca1dba', 1000),
    montarBMM('photo-1543466835-00a7907e9de1', 1000),
  ],
};

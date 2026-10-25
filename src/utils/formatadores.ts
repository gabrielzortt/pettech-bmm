export const formatarMoedaBMM = (valorBMM: number): string =>
  `R$ ${valorBMM.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

export const formatarMilharBMM = (valorBMM: number): string => valorBMM.toLocaleString('pt-BR');

export const formatarDataBMM = (dataBMM: Date): string =>
  dataBMM.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

export const primeiroNomeBMM = (nomeBMM: string): string => nomeBMM.trim().split(' ')[0] ?? '';

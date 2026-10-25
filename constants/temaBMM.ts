import { Ionicons } from '@expo/vector-icons';

export type IconeBMM = keyof typeof Ionicons.glyphMap;

export const corBMM = {
  noiteBMM: '#0A1F24',
  petroleoBMM: '#0F2B31',
  petroleoClaroBMM: '#1B4249',
  laranjaBMM: '#F08A24',
  laranjaClaroBMM: '#FFC48A',
  laranjaEscuroBMM: '#C4650A',
  menteBMM: '#3FB8A5',
  cremeBMM: '#FFF6EC',
  areiaBMM: '#FCE9D4',
  fundoBMM: '#F6F8F7',
  brancoBMM: '#FFFFFF',
  textoBMM: '#1C2B2F',
  precoBMM: '#0F2B31',
  suaveBMM: '#879698',
  bordaBMM: '#E3EBE9',
  erroBMM: '#E5484D',
  erroClaroBMM: '#FFB4A8',
  sucessoBMM: '#2E7D5B',
  estrelaBMM: '#FBBE21',
  inativoBMM: '#A7B3B2',
};

export const gradienteBMM = {
  laranjaBMM: ['#FFA94D', '#F08A24', '#D9710F'] as const,
  petroleoBMM: ['#0A1F24', '#0F2B31'] as const,
  perfilBMM: ['#0F2B31', '#1B4249'] as const,
};

export const fonteBMM = {
  regularBMM: 'Poppins_400Regular',
  mediaBMM: 'Poppins_500Medium',
  semiBMM: 'Poppins_600SemiBold',
};

export const sombraBMM = {
  suaveBMM: {
    shadowColor: '#0F2B31',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  forteBMM: {
    shadowColor: '#0A1F24',
    shadowOpacity: 0.16,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
};

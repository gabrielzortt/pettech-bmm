import AsyncStorage from '@react-native-async-storage/async-storage';

export async function lerJsonBMM<TipoBMM>(chaveBMM: string, padraoBMM: TipoBMM): Promise<TipoBMM> {
  try {
    const textoBMM = await AsyncStorage.getItem(chaveBMM);
    return textoBMM ? (JSON.parse(textoBMM) as TipoBMM) : padraoBMM;
  } catch {
    return padraoBMM;
  }
}

export async function salvarJsonBMM(chaveBMM: string, valorBMM: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(chaveBMM, JSON.stringify(valorBMM));
  } catch {
    // Persistência é um recurso extra: se falhar, o app continua funcionando em memória.
  }
}

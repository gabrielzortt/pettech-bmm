import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuthBMM } from './AuthProvider';

interface FavoritosContextoBMM {
  idsBMM: string[];
  ehFavoritoBMM: (idBMM: string) => boolean;
  alternarBMM: (idBMM: string) => void;
}

const ContextoBMM = createContext<FavoritosContextoBMM | null>(null);

export function FavoritosProviderBMM({ children: childrenBMM }: { children: ReactNode }) {
  const { usuarioBMM } = useAuthBMM();
  const [idsBMM, setIdsBMM] = useState<string[]>([]);

  useEffect(() => {
    if (!usuarioBMM) setIdsBMM([]);
  }, [usuarioBMM]);

  const alternarBMM = (idBMM: string) =>
    setIdsBMM((anteriorBMM) => (anteriorBMM.includes(idBMM) ? anteriorBMM.filter((fBMM) => fBMM !== idBMM) : [...anteriorBMM, idBMM]));

  return (
    <ContextoBMM.Provider value={{ idsBMM, ehFavoritoBMM: (idBMM) => idsBMM.includes(idBMM), alternarBMM }}>{childrenBMM}</ContextoBMM.Provider>
  );
}

export function useFavoritosBMM(): FavoritosContextoBMM {
  const contextoBMM = useContext(ContextoBMM);
  if (!contextoBMM) throw new Error('useFavoritosBMM deve ser usado dentro de FavoritosProviderBMM');
  return contextoBMM;
}

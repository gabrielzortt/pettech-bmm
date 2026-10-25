import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { UsuarioBMM } from '@/types';
import { lerJsonBMM, salvarJsonBMM } from '@/services/armazenamento';

interface DadosCadastroBMM {
  nomeBMM: string;
  emailBMM: string;
  senhaBMM: string;
}

interface AuthContextoBMM {
  prontoBMM: boolean;
  usuarioBMM: UsuarioBMM | null;
  entrarBMM: (emailBMM: string, senhaBMM: string) => string | null;
  cadastrarBMM: (dadosBMM: DadosCadastroBMM) => string | null;
  sairBMM: () => void;
}

const chaveUsuariosBMM = '@pettech:usuarios';

export const usuarioPadraoBMM: UsuarioBMM = {
  nomeBMM: 'Cliente PetTech',
  emailBMM: 'cliente@pettech.com',
  senhaBMM: '123456',
};

const ContextoBMM = createContext<AuthContextoBMM | null>(null);

export function AuthProviderBMM({ children: childrenBMM }: { children: ReactNode }) {
  // Estado local com os usuários cadastrados. O primeiro vem fixo no código; os demais vêm do cadastro no app.
  const [usuariosBMM, setUsuariosBMM] = useState<UsuarioBMM[]>([usuarioPadraoBMM]);
  const [usuarioBMM, setUsuarioBMM] = useState<UsuarioBMM | null>(null);
  const [prontoBMM, setProntoBMM] = useState<boolean>(false);

  useEffect(() => {
    lerJsonBMM<UsuarioBMM[]>(chaveUsuariosBMM, []).then((salvosBMM) => {
      setUsuariosBMM([usuarioPadraoBMM, ...salvosBMM]);
      setProntoBMM(true);
    });
  }, []);

  const entrarBMM = (emailDigitadoBMM: string, senhaDigitadaBMM: string): string | null => {
    const emailLimpoBMM = emailDigitadoBMM.trim().toLowerCase();
    if (emailLimpoBMM === '' || senhaDigitadaBMM === '') return 'Preencha o e-mail e a senha para entrar.';
    const encontradoBMM = usuariosBMM.find((uBMM) => uBMM.emailBMM === emailLimpoBMM);
    if (!encontradoBMM) return 'E-mail incorreto. Confira o endereço digitado.';
    if (encontradoBMM.senhaBMM !== senhaDigitadaBMM) return 'Senha incorreta. Tente novamente.';
    setUsuarioBMM(encontradoBMM);
    return null;
  };

  const cadastrarBMM = ({ nomeBMM, emailBMM, senhaBMM }: DadosCadastroBMM): string | null => {
    const emailLimpoBMM = emailBMM.trim().toLowerCase();
    if (usuariosBMM.some((uBMM) => uBMM.emailBMM === emailLimpoBMM)) return 'Este e-mail já está cadastrado. Tente entrar.';
    const novoBMM: UsuarioBMM = { nomeBMM: nomeBMM.trim(), emailBMM: emailLimpoBMM, senhaBMM };
    const atualizadosBMM = [...usuariosBMM, novoBMM];
    setUsuariosBMM(atualizadosBMM);
    salvarJsonBMM(chaveUsuariosBMM, atualizadosBMM.filter((uBMM) => uBMM.emailBMM !== usuarioPadraoBMM.emailBMM));
    setUsuarioBMM(novoBMM);
    return null;
  };

  const sairBMM = () => setUsuarioBMM(null);

  return <ContextoBMM.Provider value={{ prontoBMM, usuarioBMM, entrarBMM, cadastrarBMM, sairBMM }}>{childrenBMM}</ContextoBMM.Provider>;
}

export function useAuthBMM(): AuthContextoBMM {
  const contextoBMM = useContext(ContextoBMM);
  if (!contextoBMM) throw new Error('useAuthBMM deve ser usado dentro de AuthProviderBMM');
  return contextoBMM;
}

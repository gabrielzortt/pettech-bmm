export const emailValidoBMM = (emailBMM: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailBMM.trim());

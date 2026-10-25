import { categoriasValidasBMM, CategoriaBMM, ResultadoValidacaoBMM } from './tipos';

const ehTextoBMM = (valorBMM: unknown): valorBMM is string => typeof valorBMM === 'string';
const ehNumeroBMM = (valorBMM: unknown): valorBMM is number => typeof valorBMM === 'number' && Number.isFinite(valorBMM);

const ehUrlHttpBMM = (valorBMM: string): boolean => {
  try {
    const urlBMM = new URL(valorBMM);
    return urlBMM.protocol === 'http:' || urlBMM.protocol === 'https:';
  } catch {
    return false;
  }
};

export function validarNovoProdutoBMM(corpoBMM: unknown): ResultadoValidacaoBMM {
  if (typeof corpoBMM !== 'object' || corpoBMM === null || Array.isArray(corpoBMM)) {
    return { validoBMM: false, errosBMM: ['O corpo da requisição deve ser um objeto JSON.'] };
  }

  const entradaBMM = corpoBMM as Record<string, unknown>;
  const errosBMM: string[] = [];

  const nomeBMM = ehTextoBMM(entradaBMM.nome) ? entradaBMM.nome.trim() : '';
  if (nomeBMM.length < 2 || nomeBMM.length > 80) errosBMM.push('nome é obrigatório e deve ter entre 2 e 80 caracteres.');

  const descricaoBMM = ehTextoBMM(entradaBMM.descricao) ? entradaBMM.descricao.trim() : '';
  if (descricaoBMM.length < 10 || descricaoBMM.length > 1000) errosBMM.push('descricao é obrigatória e deve ter entre 10 e 1000 caracteres.');

  if (!ehNumeroBMM(entradaBMM.preco) || entradaBMM.preco <= 0) errosBMM.push('preco é obrigatório e deve ser um número maior que zero.');

  const imagemBMM = ehTextoBMM(entradaBMM.imagem) ? entradaBMM.imagem.trim() : '';
  if (!ehUrlHttpBMM(imagemBMM)) errosBMM.push('imagem é obrigatória e deve ser uma URL http ou https válida.');

  if (!ehTextoBMM(entradaBMM.categoria) || !(categoriasValidasBMM as readonly string[]).includes(entradaBMM.categoria)) {
    errosBMM.push(`categoria é obrigatória e deve ser uma de: ${categoriasValidasBMM.join(', ')}.`);
  }

  const subtituloBMM = entradaBMM.subtitulo === undefined ? '' : entradaBMM.subtitulo;
  if (!ehTextoBMM(subtituloBMM) || subtituloBMM.length > 80) errosBMM.push('subtitulo, quando enviado, deve ser um texto de até 80 caracteres.');

  const notaBMM = entradaBMM.nota === undefined ? 0 : entradaBMM.nota;
  if (!ehNumeroBMM(notaBMM) || notaBMM < 0 || notaBMM > 5) errosBMM.push('nota, quando enviada, deve ser um número entre 0 e 5.');

  const avaliacoesBMM = entradaBMM.avaliacoes === undefined ? 0 : entradaBMM.avaliacoes;
  if (!ehNumeroBMM(avaliacoesBMM) || !Number.isInteger(avaliacoesBMM) || avaliacoesBMM < 0) {
    errosBMM.push('avaliacoes, quando enviadas, devem ser um número inteiro maior ou igual a zero.');
  }

  const novoBMM = entradaBMM.novo === undefined ? true : entradaBMM.novo;
  if (typeof novoBMM !== 'boolean') errosBMM.push('novo, quando enviado, deve ser verdadeiro ou falso.');

  if (errosBMM.length > 0) return { validoBMM: false, errosBMM };

  return {
    validoBMM: true,
    dadosBMM: {
      nome: nomeBMM,
      subtitulo: (subtituloBMM as string).trim(),
      descricao: descricaoBMM,
      preco: Math.round((entradaBMM.preco as number) * 100) / 100,
      imagem: imagemBMM,
      categoria: entradaBMM.categoria as CategoriaBMM,
      nota: notaBMM as number,
      avaliacoes: avaliacoesBMM as number,
      novo: novoBMM as boolean,
    },
  };
}

import { ProdutoBMM } from '../tipos';

const fotoBMM = (idFotoBMM: string): string => `https://images.unsplash.com/${idFotoBMM}?auto=format&fit=crop&w=900&q=80`;

export const produtosBMM: ProdutoBMM[] = [
  {
    id: '1', nome: 'Coleira GPS TrackPet', subtitulo: 'Localização em tempo real', categoria: 'Coleiras',
    preco: 289.9, nota: 4.8, avaliacoes: 1240, novo: false, imagem: fotoBMM('photo-1587300003388-59208cc962cb'),
    descricao: 'Coleira com GPS e conexão 4G que mostra no celular onde o seu pet está, a qualquer hora. Cria zonas seguras e avisa na hora se ele se afastar de casa. Resistente à água, com bateria de até 7 dias.',
  },
  {
    id: '2', nome: 'Comedouro FeedSmart', subtitulo: 'Alimentação programada', categoria: 'Alimentação',
    preco: 349, nota: 4.7, avaliacoes: 980, novo: true, imagem: fotoBMM('photo-1583511655857-d19b40a7a54e'),
    descricao: 'Comedouro automático com reservatório de 4 litros e porções controladas pelo aplicativo. Programe até 6 refeições por dia e acompanhe o histórico de consumo. Funciona mesmo sem internet.',
  },
  {
    id: '3', nome: 'Câmera PetCam 360', subtitulo: 'Vídeo, áudio e petisco', categoria: 'Câmeras',
    preco: 419.9, nota: 4.9, avaliacoes: 2330, novo: false, imagem: fotoBMM('photo-1514888286974-6c03e2ca1dba'),
    descricao: 'Câmera Full HD que gira 360 graus, com visão noturna e conversa por áudio. Receba alertas de movimento e solte um petisco à distância para recompensar o seu pet quando estiver fora.',
  },
  {
    id: '4', nome: 'Fonte Aqua Flow', subtitulo: 'Bebedouro com filtro', categoria: 'Alimentação',
    preco: 179.9, nota: 4.5, avaliacoes: 640, novo: false, imagem: fotoBMM('photo-1543466835-00a7907e9de1'),
    descricao: 'Bebedouro em fonte com filtro de carvão ativado que mantém a água fresca e circulando. Estimula o pet a beber mais água e avisa pelo aplicativo quando é hora de trocar o filtro ou reabastecer.',
  },
  {
    id: '5', nome: 'Laser Bolt', subtitulo: 'Brinquedo interativo', categoria: 'Brinquedos',
    preco: 129, nota: 4.4, avaliacoes: 410, novo: true, imagem: fotoBMM('photo-1415369629372-26f2fe60c467'),
    descricao: 'Brinquedo com laser seguro que desenha trajetos aleatórios pelo chão. Liga sozinho em horários definidos, desliga ao fim da brincadeira e ajuda a gastar a energia de gatos e cães pequenos.',
  },
  {
    id: '6', nome: 'CleanBox Auto', subtitulo: 'Caixa de areia autolimpante', categoria: 'Higiene',
    preco: 899, nota: 4.6, avaliacoes: 770, novo: false, imagem: fotoBMM('photo-1518791841217-8f162f1e1131'),
    descricao: 'Caixa de areia que se limpa sozinha após cada uso e guarda os resíduos em gaveta lacrada. Sensor de peso monitora a frequência do gato e envia alertas se algo fugir do normal.',
  },
  {
    id: '7', nome: 'Coleira VitalTag', subtitulo: 'Monitor de saúde e sono', categoria: 'Coleiras',
    preco: 259.9, nota: 4.3, avaliacoes: 355, novo: false, imagem: fotoBMM('photo-1548199973-03cce0bbc87b'),
    descricao: 'Coleira leve que acompanha atividade, sono e batimentos do seu pet. Os dados viram relatórios semanais no aplicativo, fáceis de compartilhar com o veterinário nas consultas de rotina.',
  },
  {
    id: '8', nome: 'Bola Rolly Smart', subtitulo: 'Bola que se move sozinha', categoria: 'Brinquedos',
    preco: 99.9, nota: 4.6, avaliacoes: 520, novo: true, imagem: fotoBMM('photo-1601758228041-f3b2795255f1'),
    descricao: 'Bola recarregável que rola e muda de direção sozinha ao ser tocada. Tem três modos de brincadeira e desliga automaticamente quando o pet para de interagir, economizando bateria.',
  },
];

import { DadosProdutoBMM } from '../tipos/produto';

const fotoBMM = (idBMM: string, extensaoBMM: 'jpg' | 'png' = 'jpg'): string => `https://i.ebayimg.com/images/g/${idBMM}/s-l1600.${extensaoBMM}`;

// Cada produto aponta para uma foto real do tipo de produto e tem uma ilustração própria (slug) usada como reserva no app.
export const produtosIniciaisBMM: DadosProdutoBMM[] = [
  {
    nome: 'Coleira GPS TrackPet', subtitulo: 'Localização em tempo real', categoria: 'Coleiras', slug: 'coleira-gps-trackpet',
    preco: 289.9, nota: 4.8, avaliacoes: 1240, novo: false, imagem: fotoBMM('4GsAAeSwH-5oGXSp'),
    descricao: 'Coleira com GPS e conexão 4G que mostra no celular onde o seu pet está, a qualquer hora. Cria zonas seguras e avisa na hora se ele se afastar de casa. Resistente à água, com bateria de até 7 dias.',
  },
  {
    nome: 'Comedouro FeedSmart', subtitulo: 'Alimentação programada', categoria: 'Alimentação', slug: 'comedouro-feedsmart',
    preco: 349, nota: 4.7, avaliacoes: 980, novo: true, imagem: fotoBMM('EmQAAeSwyG9pruQl'),
    descricao: 'Comedouro automático com reservatório de 4 litros e porções controladas pelo aplicativo. Programe até 6 refeições por dia e acompanhe o histórico de consumo. Funciona mesmo sem internet.',
  },
  {
    nome: 'Câmera PetCam 360', subtitulo: 'Vídeo, áudio e petisco', categoria: 'Câmeras', slug: 'camera-petcam-360',
    preco: 419.9, nota: 4.9, avaliacoes: 2330, novo: false, imagem: fotoBMM('1xYAAeSwI6dpreTd'),
    descricao: 'Câmera Full HD que gira 360 graus, com visão noturna e conversa por áudio. Receba alertas de movimento e solte um petisco à distância para recompensar o seu pet quando estiver fora.',
  },
  {
    nome: 'Fonte Aqua Flow', subtitulo: 'Bebedouro com filtro', categoria: 'Alimentação', slug: 'fonte-aqua-flow',
    preco: 179.9, nota: 4.5, avaliacoes: 640, novo: false, imagem: fotoBMM('SCoAAOSwGw1nZiq8', 'png'),
    descricao: 'Bebedouro em fonte com filtro de carvão ativado que mantém a água fresca e circulando. Estimula o pet a beber mais água e avisa pelo aplicativo quando é hora de trocar o filtro ou reabastecer.',
  },
  {
    nome: 'Laser Bolt', subtitulo: 'Brinquedo interativo', categoria: 'Brinquedos', slug: 'laser-bolt',
    preco: 129, nota: 4.4, avaliacoes: 410, novo: true, imagem: fotoBMM('5EgAAeSw7NhpMIzf', 'png'),
    descricao: 'Brinquedo com laser seguro que desenha trajetos aleatórios pelo chão. Liga sozinho em horários definidos, desliga ao fim da brincadeira e ajuda a gastar a energia de gatos e cães pequenos.',
  },
  {
    nome: 'CleanBox Auto', subtitulo: 'Caixa de areia autolimpante', categoria: 'Higiene', slug: 'cleanbox-auto',
    preco: 899, nota: 4.6, avaliacoes: 770, novo: false, imagem: fotoBMM('GOgAAeSwu3dppF2q', 'png'),
    descricao: 'Caixa de areia que se limpa sozinha após cada uso e guarda os resíduos em gaveta lacrada. Sensor de peso monitora a frequência do gato e envia alertas se algo fugir do normal.',
  },
  {
    nome: 'Coleira VitalTag', subtitulo: 'Monitor de saúde e sono', categoria: 'Coleiras', slug: 'coleira-vitaltag',
    preco: 259.9, nota: 4.3, avaliacoes: 355, novo: false, imagem: fotoBMM('luAAAeSwLLdpUyyS'),
    descricao: 'Coleira leve que acompanha atividade, sono e batimentos do seu pet. Os dados viram relatórios semanais no aplicativo, fáceis de compartilhar com o veterinário nas consultas de rotina.',
  },
  {
    nome: 'Bola Rolly Smart', subtitulo: 'Bola que se move sozinha', categoria: 'Brinquedos', slug: 'bola-rolly-smart',
    preco: 99.9, nota: 4.6, avaliacoes: 520, novo: true, imagem: fotoBMM('FSMAAOSwnmRn9zcF'),
    descricao: 'Bola recarregável que rola e muda de direção sozinha ao ser tocada. Tem três modos de brincadeira e desliga automaticamente quando o pet para de interagir, economizando bateria.',
  },
];

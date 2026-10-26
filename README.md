# PetTech 🐾 — Loja virtual de produtos inteligentes para pets

App mobile (**React Native + Expo Router + TSX**) conectado a uma **API Express (Node + TypeScript)** hospedada na nuvem, com os dados no **Firebase Firestore**.

**Equipe: Bianca, Maria e Miguel — BMM.** Todas as variáveis, funções, estados, props e componentes levam o sufixo `BMM`.

## Arquitetura

```
App (Expo / GitHub Pages)  ──HTTP/JSON──▶  API Express (Render)  ──firebase-admin──▶  Firestore
```

Nada roda no computador: o app consome a API publicada e a API grava no Firebase.

## Publicar a API (uma vez)

**1. Firebase** — [console.firebase.google.com](https://console.firebase.google.com)
1. Crie um projeto → **Build › Firestore Database › Criar banco de dados** (modo produção, região `southamerica-east1`).
2. **Configurações do projeto › Contas de serviço › Gerar nova chave privada** → baixa um arquivo `.json`.

**2. Render** — [render.com](https://render.com)
1. **New › Blueprint** → conecte este repositório (o arquivo `render.yaml` já descreve o serviço `pettech-api-bmm`).
2. Quando pedir `FIREBASE_SERVICE_ACCOUNT`, cole **o conteúdo inteiro** do `.json` baixado.
3. Aguarde o deploy. Teste: `https://pettech-api-bmm.onrender.com/saude` → `{"status":"ok"}` e `/produtos` → lista de produtos.

No primeiro start a API cria a coleção `produtos` no Firestore com 8 produtos. Depois disso, tudo o que for cadastrado, alterado ou removido fica salvo no Firebase.

**3. Apontar o app para a API** — se o serviço do Render tiver outro nome/URL, defina no GitHub **Settings › Secrets and variables › Actions › Variables** a variável `API_URL` com a URL do serviço e rode o workflow de novo. (A URL padrão do app é `https://pettech-api-bmm.onrender.com`.)

> O plano gratuito do Render "dorme" após alguns minutos parado; a primeira chamada pode levar cerca de 30 a 50 segundos. O app avisa na tela e aguarda.

## Rodar o app

```bash
npm install
npx expo start      # Expo Go (celular), emulador ou "w" para web
```

Versão web: https://gabrielzortt.github.io/pettech-bmm/ (publicada automaticamente pelo GitHub Actions a cada push na `main`; ative em **Settings › Pages › Source: GitHub Actions**).

**Conta de teste:** `cliente@pettech.com` / `123456` — ou crie a sua em **Criar conta**.

## O que o app faz

| Fluxo | Detalhes |
|---|---|
| Boas-vindas | Carrossel com fotos de cães, indicador animado e atalho "Pular" |
| Login | Validação **local** com estado: campos vazios, e-mail incorreto e senha incorreta, cada um com mensagem amigável |
| Cadastro | Nome, e-mail, senha e confirmação com validação por campo; usuários novos ficam salvos no aparelho |
| Início | Lista vinda da API, busca, categorias, ordenação, pull-to-refresh, estados de carregamento e erro |
| Detalhes | Foto real do produto, nota, descrição com "Ler mais", porte do pet, quantidade e **Adicionar ao Carrinho** |
| Favoritos | Produtos marcados com o coração |
| Carrinho | Quantidade, remoção, subtotal, frete (grátis a partir de R$ 300) |
| Checkout e pedidos | Endereço, forma de pagamento (Pix, cartão, dinheiro) e histórico de pedidos (compra simulada) |
| Perfil | Resumo da conta, atalhos e saída |

## Navegação (Expo Router)

```
src/app
├── _layout.tsx                  fontes + provedores + Stack raiz
├── (auth)/                      grupo público (redireciona para o app se já logado)
│   ├── index.tsx                boas-vindas
│   ├── entrar.tsx               login
│   └── cadastro.tsx             cadastro
└── (app)/                       grupo protegido (redireciona para o login se não logado)
    ├── (tabs)/                  Tabs: Início · Favoritos · Carrinho · Perfil
    ├── produto/[id].tsx         Stack: detalhes (recebe o parâmetro id)
    ├── checkout.tsx             Stack
    └── pedidos.tsx              Stack
```

## Estrutura do código

```
src/
├── app/            rotas
├── components/     ui/ (BotaoAcao, CampoTexto, FotoBMM, ...) e produto/ (ProductCard, ProductList, ...)
├── store/          Auth, Carrinho (useReducer), Favoritos, Pedidos e Feedback (providers + hooks)
├── services/       api.ts (fetch + conversão) e armazenamento.ts (AsyncStorage)
├── config/         URL da API
├── hooks/  data/  theme/  types/  utils/
assets/             ilustrações dos produtos (reserva) e imagens de apoio
api/                servidor Express + Firestore (documentação em api/docs/API.md)
render.yaml         deploy da API no Render
```

Alias de import: `@/` aponta para `src/`.

## Imagens

- **Produtos:** foto real de cada tipo de produto, guardada no Firestore (campo `imagem`). Se a foto não carregar, o app mostra automaticamente a ilustração do produto (`assets/produtos`, escolhida pelo campo `slug`).
- **Login e boas-vindas:** fotos de cães do Unsplash, com imagem de reserva embutida no app.

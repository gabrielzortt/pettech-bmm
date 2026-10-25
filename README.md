# PetTech 🐾 — Loja virtual de produtos inteligentes para pets

App mobile (**React Native + Expo Router + TSX**) integrado a uma **API própria** (**Node + Express + TypeScript + SQLite**).

**Equipe: Bianca, Maria e Miguel — BMM.** Todas as variáveis, funções, estados, props e componentes levam o sufixo `BMM`.

## Como rodar

```bash
# 1) API (terminal 1)
cd api
npm install
npm run dev            # http://localhost:3333  (o banco SQLite é criado e populado no primeiro start)

# 2) App (terminal 2, na raiz do projeto)
npm install
npx expo start         # Expo Go, emulador ou "w" para web
```

O app descobre o IP do computador pelo Expo (`hostUri`), então funciona no celular físico quando celular e PC estão na mesma rede Wi-Fi.
Para apontar para outra URL: `EXPO_PUBLIC_API_URL=http://192.168.0.10:3333 npx expo start`.

**Conta de teste:** `cliente@pettech.com` / `123456` — ou crie a sua em **Criar conta**.

## O que o app faz

| Fluxo | Detalhes |
|---|---|
| Boas-vindas | 3 slides com indicador animado e atalho "Pular" |
| Login | Validação **local** com estado: campos vazios, e-mail incorreto e senha incorreta, cada um com mensagem amigável |
| Cadastro | Nome, e-mail, senha e confirmação com validação por campo; usuários novos ficam salvos no aparelho |
| Início | Lista vinda da API, busca, categorias, ordenação, pull-to-refresh, estados de carregamento e erro |
| Detalhes | Imagem em parallax, nota, descrição com "Ler mais", porte do pet, quantidade e **Adicionar ao Carrinho** |
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

Os dois grupos fazem o controle de acesso: ao entrar ou sair, o próprio layout redireciona para o lugar certo.

## Arquitetura

```
src/
├── app/            rotas
├── components/     ui/ (BotaoAcao, CampoTexto, FotoBMM, ...) e produto/ (ProductCard, ProductList, ...)
├── store/          Auth, Carrinho (useReducer), Favoritos, Pedidos e Feedback (providers + hooks)
├── services/       api.ts (fetch + conversão) e armazenamento.ts (AsyncStorage)
├── hooks/          useProdutos
├── data/           catálogo local (modo demonstração) e imagens
├── theme/          cores, fontes, espaçamentos, sombras
├── types/  utils/
assets/             produtos/ (uma ilustração por produto) e hero/
api/                servidor Express + SQLite
```

Alias de import: `@/` aponta para `src/`.

## API

Express + TypeScript + **SQLite** (`better-sqlite3`). O arquivo do banco fica em `api/dados/pettech.db` (criado automaticamente, não vai para o Git).
Rotas: `GET /produtos`, `GET /produtos/:id`, `POST /produtos`, `PUT /produtos/:id`, `DELETE /produtos/:id`, `GET /categorias`.
Documentação completa: [`api/docs/API.md`](api/docs/API.md) · Coleção Postman: [`api/docs/PetTech.postman_collection.json`](api/docs/PetTech.postman_collection.json).

Para voltar ao catálogo inicial: `cd api && npm run resetar-banco` e suba a API de novo.

## Versão web (GitHub Pages)

A cada push na `main`, o workflow `.github/workflows/deploy.yml` publica o app em `https://gabrielzortt.github.io/pettech-bmm/`.
Como a API roda no computador, a versão publicada entra em **modo demonstração**: usa uma cópia local do catálogo e mostra um aviso na tela inicial.
Com a API acessível, o app usa os dados do servidor normalmente.

## Imagens

Cada produto tem uma ilustração própria em `api/public/imagens/` (servidas pela API) e `assets/produtos/` (embutidas no app para o modo demonstração).
Para usar fotos reais, troque os PNGs mantendo o mesmo nome de arquivo.

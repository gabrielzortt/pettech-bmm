# PetTech 🐾 — Loja virtual de produtos inteligentes para pets

App mobile (**React Native + Expo Router + TSX**) com **API própria (Express + TypeScript)** e banco de dados **SQLite**, tudo em **um único projeto**.

**Equipe: Bianca, Maria e Miguel — BMM.** Todas as variáveis, funções, estados, props e componentes levam o sufixo `BMM`.

## Como rodar

```bash
npm install
npm start
```

Só isso. O `npm start` sobe a **API** (porta 3333) e o **app** (Expo) juntos: o banco de dados é criado e populado sozinho no primeiro uso. Depois, no terminal do Expo:

- **celular:** escaneie o QR code com o app **Expo Go** (celular e computador na mesma rede Wi-Fi);
- **navegador:** tecle `w`;
- **emulador Android:** tecle `a`.

O app encontra a API sozinho (IP do computador no celular, `localhost` no navegador, `10.0.2.2` no emulador Android). Para encerrar, `Ctrl + C` no terminal.

**Conta de teste:** `cliente@pettech.com` / `123456` — ou crie a sua em **Criar conta**.

## Arquitetura

```
App (src/)  ──HTTP/JSON──▶  API Express (server/, porta 3333)  ──SQL──▶  SQLite (server/dados/pettech.db)
```

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

## Estrutura

```
src/        aplicativo (telas em src/app, componentes, estado, serviços, tema)
server/     API Express (rotas, controladores, repositório, banco SQLite)
assets/     imagens do app
scripts/    iniciar.js — o "npm start": liga a API e depois o Expo
docs/       documentação das rotas e coleção do Postman
```

## API

Rotas: `GET /produtos`, `GET /produtos/:id`, `POST /produtos`, `PUT /produtos/:id`, `DELETE /produtos/:id`, `GET /categorias`, `GET /saude`.
Detalhes: [`docs/API.md`](docs/API.md) · Coleção Postman: [`docs/PetTech.postman_collection.json`](docs/PetTech.postman_collection.json).
Para voltar ao catálogo inicial: `npm run resetar-banco` e `npm start` de novo.

## Imagens

- **Produtos:** foto real de cada tipo de produto (campo `imagem` no banco). Se não carregar, o app mostra a ilustração do produto (`assets/produtos`, escolhida pelo `slug`).
- **Login e boas-vindas:** fotos de cães do Unsplash, com imagem de reserva embutida.

# PetTech 🐾 — Loja virtual de produtos inteligentes para pets

App mobile (**React Native + Expo Router + TSX**) conectado a uma **API Express (Node + TypeScript)** com banco de dados **SQLite** local.

**Equipe: Bianca, Maria e Miguel — BMM.** Todas as variáveis, funções, estados, props e componentes levam o sufixo `BMM`.

## Arquitetura

```
App (Expo)  ──HTTP/JSON──▶  API Express (porta 3333)  ──SQL──▶  SQLite (api/dados/pettech.db)
```

## Como rodar

```bash
# Terminal 1 — API
cd api
npm install
npm run dev            # http://localhost:3333  (o banco é criado e populado no primeiro start)

# Terminal 2 — App (na raiz do projeto)
npm install
npx expo start         # Expo Go (celular), emulador ou "w" para web
```

O app descobre a API sozinho: usa o IP do computador que roda o Expo (celular e PC na mesma rede Wi-Fi), `localhost` no navegador e `10.0.2.2` no emulador Android.
Para apontar para outra URL: `EXPO_PUBLIC_API_URL=http://192.168.0.10:3333 npx expo start`.

**Conta de teste:** `cliente@pettech.com` / `123456` — ou crie a sua em **Criar conta**.

Se a API não estiver rodando, a tela inicial mostra "Sem conexão com a API" com o botão **Tentar novamente**.

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

## API

Rotas: `GET /produtos`, `GET /produtos/:id`, `POST /produtos`, `PUT /produtos/:id`, `DELETE /produtos/:id`, `GET /categorias`, `GET /saude`.
Detalhes: [`api/docs/API.md`](api/docs/API.md) · Coleção Postman: [`api/docs/PetTech.postman_collection.json`](api/docs/PetTech.postman_collection.json).
Para voltar ao catálogo inicial: `cd api && npm run resetar-banco` e suba a API de novo.

## Imagens

- **Produtos:** foto real de cada tipo de produto (campo `imagem` no banco). Se não carregar, o app mostra a ilustração do produto (`assets/produtos`, escolhida pelo `slug`).
- **Login e boas-vindas:** fotos de cães do Unsplash, com imagem de reserva embutida.

## Versão web (GitHub Pages)

O workflow `.github/workflows/deploy.yml` publica o app em https://gabrielzortt.github.io/pettech-bmm/ a cada push na `main`.
O site só mostra produtos se a API estiver acessível pelo navegador (por exemplo, rodando no seu computador em `localhost:3333`, ou hospedada e informada na variável `API_URL` do repositório).

# PetTech 🐾 — Loja virtual de produtos inteligentes para pets

App mobile (React Native + Expo Router + TSX) integrado a uma API própria (Node + Express + TypeScript).
Equipe: **Bianca, Maria e Miguel — BMM** (todas as variáveis, funções, estados e componentes levam o sufixo `BMM`).

## Como rodar

```bash
# 1) API (terminal 1)
cd api
npm install
npm run dev            # http://localhost:3333

# 2) App (terminal 2, na raiz do projeto)
npm install
npx expo start         # abra no Expo Go, emulador ou use "w" para web
```

O app descobre sozinho o IP do computador pelo Expo (`hostUri`), então funciona no celular físico
desde que celular e PC estejam na mesma rede Wi-Fi. Para apontar para outra URL:

```bash
EXPO_PUBLIC_API_URL=http://192.168.0.10:3333 npx expo start
```

**Conta de teste:** `cliente@pettech.com` / `123456`

## Versão web (GitHub Pages)

A cada push na `main`, o workflow `.github/workflows/deploy.yml` publica o app em
`https://<usuario>.github.io/pettech-bmm/`. Ative uma vez em **Settings → Pages → Source: GitHub Actions**.
Como a API roda no seu computador, a versão publicada entra em **modo demonstração**: usa uma cópia local do catálogo
(`data/produtosLocaisBMM.ts`) e mostra um aviso na tela inicial. Com a API acessível, o app usa os dados do servidor normalmente.

## Telas e navegação

| Tela | Rota | Navegação |
|---|---|---|
| Boas-vindas | `app/index.tsx` | Stack |
| Login | `app/login.tsx` | Stack |
| Início (lista da API) | `app/(tabs)/inicio.tsx` | Tabs |
| Favoritos | `app/(tabs)/favoritos.tsx` | Tabs |
| Carrinho | `app/(tabs)/carrinho.tsx` | Tabs |
| Perfil | `app/(tabs)/perfil.tsx` | Tabs |
| Detalhes do produto | `app/produto/[id].tsx` | Stack (param `id`) |

Fluxo: Boas-vindas → Login → Tabs (Início → Detalhes).

## Login (validação local)

`entrarBMM` em `context/LojaBMM.tsx` compara o que foi digitado com o usuário guardado em estado local e devolve mensagem amigável para:
campos vazios, e-mail incorreto e senha incorreta.

## Estrutura

```
app/            rotas (Expo Router: Stack + Tabs)
components/     BotaoBMM, CampoBMM, ImagemBMM, ProductCardBMM, ProductListBMM, CategoriaChipsBMM, ...
constants/      temaBMM.ts (cores, fontes, sombras), imagensBMM.ts
context/        LojaBMM.tsx (login, carrinho, favoritos, toast)
data/           catalogoBMM.ts (tipos, filtros, formatadores)
hooks/          useProdutosBMM.ts
services/       apiBMM.ts (fetch + conversão JSON -> ProdutoBMM)
api/            servidor Node/Express/TypeScript + docs/ (API.md e coleção Postman)
```

## API

Documentação das rotas: [`api/docs/API.md`](api/docs/API.md).
Coleção para o Postman: [`api/docs/PetTech.postman_collection.json`](api/docs/PetTech.postman_collection.json) (File → Import).

## Imagens

As URLs de imagem dos produtos ficam em `api/src/data/produtos.ts` e são fotos do Unsplash de exemplo.
Se alguma não carregar, o app mostra um ícone de patinha no lugar. Troque pelas fotos reais dos produtos quando tiver.

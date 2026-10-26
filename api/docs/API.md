# PetTech API

Express + TypeScript + **Firebase Firestore** (`firebase-admin`) · JSON.

URL publicada (Render): `https://pettech-api-bmm.onrender.com`

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `FIREBASE_SERVICE_ACCOUNT` | JSON da conta de serviço do Firebase (obrigatória). Alternativa: `FIREBASE_SERVICE_ACCOUNT_BASE64` com o mesmo JSON em base64. |
| `PORT` | Porta (o Render define sozinho). |

Sem credenciais a API **não sobe** e mostra uma mensagem explicando o que falta.

## Estrutura do código

```
src/
├── index.ts                  inicialização (popula o Firestore se estiver vazio e sobe o servidor)
├── app.ts                    Express: CORS, JSON, imagens estáticas, rotas e tratamento de erros
├── firebase/firestore.ts     conexão com o Firestore
├── repositorios/             acesso aos dados (coleção produtos)
├── controladores/            regras de cada rota (status HTTP)
├── rotas/                    mapeamento das rotas
├── validacao/                validação do corpo das requisições
├── middlewares/              404 e erros
└── db/semente.ts             8 produtos iniciais (com foto real de cada tipo de produto)
public/imagens/               ilustrações dos produtos (servidas em /imagens/...)
```

## Firestore

- Coleção **`produtos`** — um documento por produto, com id numérico em texto (`"1"`, `"2"`, ...):
  `nome`, `subtitulo`, `descricao`, `preco`, `imagem`, `slug`, `categoria`, `nota`, `avaliacoes`, `novo`, `ordem`, `criadoEm`.
- Documento **`meta/contadorProdutos`** — guarda o último id usado. Os cadastros usam uma **transação** para nunca repetir id.
- Na primeira execução, se a coleção estiver vazia, a API cria os 8 produtos iniciais.

## Modelo JSON

```json
{
  "id": "3",
  "nome": "Câmera PetCam 360",
  "subtitulo": "Vídeo, áudio e petisco",
  "descricao": "Câmera Full HD que gira 360 graus...",
  "preco": 419.9,
  "imagem": "https://i.ebayimg.com/images/g/1xYAAeSwI6dpreTd/s-l1600.jpg",
  "slug": "camera-petcam-360",
  "categoria": "Câmeras",
  "nota": 4.9,
  "avaliacoes": 2330,
  "novo": false
}
```

## Rotas

### `GET /produtos`
Lista os produtos. Filtros opcionais: `?categoria=Brinquedos` e `?busca=coleira`. **200** → array.

### `GET /produtos/:id`
- **200** → produto
- **400** → `{ "erro": "ID inválido. Informe um número inteiro positivo." }`
- **404** → `{ "erro": "Produto com id 99 não encontrado." }`

### `POST /produtos`
`Content-Type: application/json`

| Campo | Obrigatório | Regra |
|---|---|---|
| `nome` | sim | 2 a 80 caracteres |
| `descricao` | sim | 10 a 1000 caracteres |
| `preco` | sim | número maior que 0 |
| `categoria` | sim | `Coleiras`, `Alimentação`, `Câmeras`, `Brinquedos` ou `Higiene` |
| `imagem` | não | URL http/https ou caminho `/imagens/...` (padrão `/imagens/padrao.png`) |
| `slug` | não | letras minúsculas, números e hífen (liga o produto à ilustração de reserva do app) |
| `subtitulo` | não | até 80 caracteres |
| `nota` | não | 0 a 5 (padrão 0) |
| `avaliacoes` | não | inteiro ≥ 0 (padrão 0) |
| `novo` | não | booleano (padrão `true`) |

- **201** → produto criado, com `id` e header `Location: /produtos/:id`
- **400** → `{ "erro": "Dados inválidos.", "detalhes": ["preco é obrigatório e deve ser um número maior que zero.", "..."] }`
- **400** → `{ "erro": "JSON inválido no corpo da requisição." }`

### `PUT /produtos/:id`
Substitui os dados do produto (mesmas regras do POST). **200** · **400** · **404**.

### `DELETE /produtos/:id`
**204** (sem corpo) · **400** · **404**.

### `GET /categorias`
**200** → `["Alimentação", "Brinquedos", "Câmeras", "Coleiras", "Higiene"]`.

### Outras
`GET /` (informações) · `GET /saude` → `{ "status": "ok" }` · `GET /imagens/<arquivo>.png` · **404** `Rota não encontrada.` · **500** `Erro interno do servidor.`

## Comandos

```bash
npm run build     # compila para dist/
npm start         # produção (usado pelo Render)
npm run dev       # desenvolvimento com recarga (exige FIREBASE_SERVICE_ACCOUNT no ambiente)
```

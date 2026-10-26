# PetTech API

Express + TypeScript + **SQLite** (`sql.js`) · JSON · `http://localhost:3333`

A API faz parte do mesmo projeto do aplicativo: o `npm start` da raiz sobe a API e o app juntos.

## Variáveis de ambiente (todas opcionais)

| Variável | Padrão | Descrição |
|---|---|---|
| `PORT` | `3333` | Porta do servidor |
| `DB_ARQUIVO` | `server/dados/pettech.db` | Caminho do arquivo SQLite |

## Estrutura do código (pasta `server/`)

```
server/
├── index.ts                  abre o banco, popula se estiver vazio e liga o servidor
├── app.ts                    Express: CORS, JSON, imagens estáticas, rotas e tratamento de erros
├── config/ambiente.ts        porta e caminhos
├── db/conexao.ts             abre o SQLite (sql.js), cria a tabela e grava o arquivo
├── db/semente.ts             8 produtos iniciais
├── repositorios/             acesso ao banco (SQL)
├── controladores/            regras de cada rota (status HTTP)
├── rotas/                    mapeamento das rotas
├── validacao/                validação do corpo das requisições
├── middlewares/              404 e erros
├── public/imagens/           ilustrações dos produtos (servidas em /imagens/...)
└── dados/pettech.db          banco SQLite (criado sozinho; não vai para o Git)
```

## Tabela `produtos` (SQLite)

| Coluna | Tipo | Regra |
|---|---|---|
| `id` | INTEGER | chave primária, autoincremento |
| `nome` | TEXT | obrigatório |
| `subtitulo` | TEXT | padrão `''` |
| `descricao` | TEXT | obrigatória |
| `preco` | REAL | `> 0` |
| `imagem` | TEXT | URL da foto ou caminho `/imagens/...` |
| `slug` | TEXT | liga o produto à ilustração de reserva do app |
| `categoria` | TEXT | indexada |
| `nota` | REAL | entre 0 e 5 |
| `avaliacoes` | INTEGER | `>= 0` |
| `novo` | INTEGER | 0 ou 1 (a API devolve `true`/`false`) |
| `criado_em` | TEXT | data de criação |

Na primeira execução a tabela é criada e populada com 8 produtos. O que for cadastrado, alterado ou removido **persiste** no arquivo, mesmo reiniciando a API.

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

## Comandos (na raiz do projeto)

```bash
npm start            # sobe a API e o app juntos
npm run api          # sobe só a API
npm run resetar-banco   # apaga o arquivo do banco (recriado com os 8 produtos iniciais no próximo start)
```

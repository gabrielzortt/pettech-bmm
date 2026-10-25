# PetTech API

Express + TypeScript + SQLite · Base URL: `http://localhost:3333` · Formato: JSON.

Os dados ficam no arquivo `api/dados/pettech.db`. Na primeira execução a tabela `produtos` é criada e populada com 8 produtos; a partir daí tudo o que for cadastrado, alterado ou removido **persiste** entre reinicializações.

## Estrutura do código

```
src/
├── index.ts                  inicialização (popula o banco se estiver vazio e sobe o servidor)
├── app.ts                    Express: CORS, JSON, imagens estáticas, rotas e tratamento de erros
├── config/ambiente.ts        porta e caminhos
├── db/conexao.ts             conexão SQLite e criação das tabelas
├── db/semente.ts             produtos iniciais
├── repositorios/             acesso ao banco (SQL)
├── controladores/            regras de cada rota (status HTTP)
├── rotas/                    mapeamento das rotas
├── validacao/                validação do corpo das requisições
└── middlewares/              404 e erros
public/imagens/               ilustrações dos produtos (servidas em /imagens/...)
```

## Tabela `produtos`

| Coluna | Tipo | Regra |
|---|---|---|
| `id` | INTEGER | chave primária, autoincremento |
| `nome` | TEXT | obrigatório |
| `subtitulo` | TEXT | padrão `''` |
| `descricao` | TEXT | obrigatória |
| `preco` | REAL | `> 0` |
| `imagem` | TEXT | caminho `/imagens/...` ou URL |
| `categoria` | TEXT | indexada |
| `nota` | REAL | entre 0 e 5 |
| `avaliacoes` | INTEGER | `>= 0` |
| `novo` | INTEGER | 0 ou 1 (a API devolve `true`/`false`) |
| `criado_em` | TEXT | data de criação |

## Modelo JSON

```json
{
  "id": 3,
  "nome": "Câmera PetCam 360",
  "subtitulo": "Vídeo, áudio e petisco",
  "descricao": "Câmera Full HD que gira 360 graus...",
  "preco": 419.9,
  "imagem": "http://localhost:3333/imagens/camera-petcam-360.png",
  "categoria": "Câmeras",
  "nota": 4.9,
  "avaliacoes": 2330,
  "novo": false
}
```

A API sempre devolve a imagem como URL absoluta.

## Rotas

### `GET /produtos`
Lista os produtos. Filtros opcionais: `?categoria=Brinquedos` e `?busca=coleira` (procura no nome e no subtítulo). **200** → array.

### `GET /produtos/:id`
- **200** → produto
- **400** → `{ "erro": "ID inválido. Informe um número inteiro positivo." }`
- **404** → `{ "erro": "Produto com id 99 não encontrado." }`

### `POST /produtos`
Cadastra um produto (`Content-Type: application/json`).

| Campo | Obrigatório | Regra |
|---|---|---|
| `nome` | sim | 2 a 80 caracteres |
| `descricao` | sim | 10 a 1000 caracteres |
| `preco` | sim | número maior que 0 |
| `categoria` | sim | `Coleiras`, `Alimentação`, `Câmeras`, `Brinquedos` ou `Higiene` |
| `imagem` | não | URL http/https ou caminho `/imagens/...` (padrão `/imagens/padrao.png`) |
| `subtitulo` | não | até 80 caracteres |
| `nota` | não | 0 a 5 (padrão 0) |
| `avaliacoes` | não | inteiro ≥ 0 (padrão 0) |
| `novo` | não | booleano (padrão `true`) |

- **201** → produto criado, com o `id` e o header `Location: /produtos/:id`
- **400** → `{ "erro": "Dados inválidos.", "detalhes": ["preco é obrigatório e deve ser um número maior que zero.", "..."] }`
- **400** → `{ "erro": "JSON inválido no corpo da requisição." }`

### `PUT /produtos/:id`
Substitui os dados do produto (mesmas regras do POST). **200** → produto atualizado · **400** → dados ou id inválidos · **404** → não encontrado.

### `DELETE /produtos/:id`
**204** (sem corpo) · **400** → id inválido · **404** → não encontrado.

### `GET /categorias`
**200** → `["Alimentação", "Brinquedos", "Coleiras", "Câmeras", "Higiene"]` (as categorias existentes no banco).

### Outras
- `GET /` → informações da API · `GET /saude` → `{ "status": "ok" }`
- `GET /imagens/<arquivo>.png` → imagens dos produtos
- **404** `{ "erro": "Rota não encontrada." }` · **500** `{ "erro": "Erro interno do servidor." }`

## Comandos

```bash
npm run dev             # desenvolvimento com recarga automática
npm run build && npm start   # produção
npm run resetar-banco   # apaga o arquivo do banco (será recriado com os 8 produtos iniciais)
```

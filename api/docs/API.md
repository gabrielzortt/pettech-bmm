# PetTech API

Base URL: `http://localhost:3333` · Formato: JSON · Dados em memória (array), reiniciam ao reiniciar o servidor.

## Modelo de produto

| Campo | Tipo | Observação |
|---|---|---|
| `id` | string | gerado pelo servidor |
| `nome` | string | 2 a 80 caracteres |
| `subtitulo` | string | opcional, até 80 caracteres (padrão `""`) |
| `descricao` | string | 10 a 1000 caracteres |
| `preco` | number | maior que 0 |
| `imagem` | string | URL http/https |
| `categoria` | string | `Coleiras`, `Alimentação`, `Câmeras`, `Brinquedos` ou `Higiene` |
| `nota` | number | opcional, 0 a 5 (padrão `0`) |
| `avaliacoes` | integer | opcional, ≥ 0 (padrão `0`) |
| `novo` | boolean | opcional (padrão `true`) |

## Rotas

### `GET /produtos`
Lista todos os produtos. **200** → array de produtos.

### `GET /produtos/:id`
Busca um produto.
- **200** → produto
- **400** → `{ "erro": "ID inválido. Informe um número inteiro positivo." }`
- **404** → `{ "erro": "Produto com id 99 não encontrado." }`

### `POST /produtos`
Cadastra um produto. Header `Content-Type: application/json`.

```json
{
  "nome": "Tapete Sensor",
  "descricao": "Tapete com sensor de peso para acompanhar o pet.",
  "preco": 159.9,
  "imagem": "https://example.com/tapete.jpg",
  "categoria": "Higiene"
}
```
- **201** → produto criado (com `id`) e header `Location: /produtos/:id`
- **400** → `{ "erro": "Dados inválidos.", "detalhes": ["preco é obrigatório e deve ser um número maior que zero.", "..."] }`
- **400** → `{ "erro": "JSON inválido no corpo da requisição." }`

## Outros códigos
- **404** `{ "erro": "Rota não encontrada." }` para qualquer rota inexistente
- **500** `{ "erro": "Erro interno do servidor." }`

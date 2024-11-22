# Shortener URL

### Criar arquivo com variaveis de ambiente para desenvolvimento.
``touch .dev.env``

```
NODE_ENV=development
ENV=dev
DB_PASSWORD=senhadb
DB_HOST=localhost
DB_PORT=5432
DB_CLIENT=pg
DB_NAME=shortener-url
API_PORT=3000
HOST_PORT=8080
ENV_FILE=.dev.env
```
### Criando as tabelas necessarias

``npm run knex:dev migrate:latest``

### Subindo somente o Banco de Dados ambiente de desenvolvimento localmente.

``npm run db:dev:up``


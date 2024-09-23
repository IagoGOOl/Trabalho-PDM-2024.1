
# API

## Requisitos

- **pnpm** instalado
- **Node.js** instalado

## Como rodar o projeto

### 1. Instalar as dependências

Execute o comando abaixo para baixar todas as dependências necessárias:

```bash
pnpm install
```

### 2. Rodar as migrações do Prisma

Certifique-se de que as migrações estão aplicadas ao banco de dados SQLite:

```bash
npx prisma migrate dev
```

### 3. Gerar o cliente Prisma

Gere o cliente Prisma para que o ORM esteja atualizado:

```bash
npx prisma generate
```

### 4. Rodar a aplicação

Inicie a aplicação com o seguinte comando:

```bash
npm start
```

A aplicação estará rodando na porta `3000`. Você pode acessá-la no navegador pelo endereço:

```
http://localhost:3000
```

### 5. Visualizar o banco de dados (Opcional)

Para visualizar os dados armazenados no banco de dados SQLite, utilize o Prisma Studio:

```bash
npx prisma studio
```


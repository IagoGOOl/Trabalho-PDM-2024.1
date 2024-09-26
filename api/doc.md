# Documentação da API

## Sumário

- **Rotas de Autenticação**
  - [POST /login](#post-login)
  - [POST /register](#post-register)
- **Rotas de Usuário**
  - [GET /user/me](#get-userme)
  - [PATCH /user/me](#patch-userme)
  - [DELETE /user/me](#delete-userme)
  - [PATCH /user/me/upload](#patch-usermeupload)
- **Rotas de Postagens**
  - [POST /post](#post-post)
  - [GET /post](#get-post)
  - [GET /post/:postId](#get-postpostid)
  - [PUT /post/:postId](#put-postpostid)
  - [DELETE /post/:postId](#delete-postpostid)
  - [GET /post/user](#get-postuser)
- **Rotas de Instituições**
  - [POST /instituicao](#post-instituicao)
  - [GET /instituicao](#get-instituicao)
  - [PUT /instituicao/:instituicaoId](#put-instituicaoinstituicaoid)
  - [DELETE /instituicao/:instituicaoId](#delete-instituicaoinstituicaoid)
- **Rotas de Comentários**
  - [POST /post/:postId/comment](#post-postpostidcomment)
  - [GET /post/:postId/comment](#get-postpostidcomment)
  - [GET /post/:postId/comment/:id](#get-postpostidcommentid)
  - [PUT /post/:postId/comment/:id](#put-postpostidcommentid)
  - [DELETE /post/:postId/comment/:id](#delete-postpostidcommentid)

---

## Rotas de Autenticação

### POST /login

- **Descrição:** Autentica um usuário e retorna um token JWT.
- **Requer autenticação:** Não
- **Corpo da Requisição:**

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

- **Resposta de Sucesso (201):**

  ```json
  {
    "user": {
      "id": "number",
      "email": "string"
    },
    "token": "string"
  }
  ```

- **Possíveis Erros:**
  - 401 Unauthorized: "email or password invalide"

---

### POST /register

- **Descrição:** Registra um novo usuário no sistema.
- **Requer autenticação:** Não
- **Corpo da Requisição:**

  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

- **Resposta de Sucesso (201):**

  ```json
  {
    "message": "Usuário Criado com sucesso"
  }
  ```

- **Possíveis Erros:**
  - 400 Bad Request: Campos obrigatórios não fornecidos ou email já cadastrado.
  - 500 Internal Server Error: "Erro ao criar o Usuário"

---

## Rotas de Usuário

### GET /user/me

- **Descrição:** Retorna as informações do usuário autenticado.
- **Requer autenticação:** Sim (Token JWT no cabeçalho `Authorization`)
- **Resposta de Sucesso (200):**

  ```json
  {
    "user": {
      "id": "number",
      "name": "string",
      "email": "string",
      "image": "string | null"
    }
  }
  ```

- **Possíveis Erros:**
  - 401 Unauthorized: Usuário não autenticado.
  - 500 Internal Server Error: "Erro ao procurar por Usuário"

---

### PATCH /user/me

- **Descrição:** Atualiza as informações do usuário autenticado.
- **Requer autenticação:** Sim
- **Corpo da Requisição:**

  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

- **Resposta de Sucesso (200):**

  ```json
  {
    "message": "Usuário atualizado com sucesso"
  }
  ```

- **Possíveis Erros:**
  - 400 Bad Request: Campos obrigatórios não fornecidos.
  - 500 Internal Server Error: "Erro ao atualizar dados de Usuário"

---

### DELETE /user/me

- **Descrição:** Exclui a conta do usuário autenticado.
- **Requer autenticação:** Sim
- **Resposta de Sucesso (200):**

  ```json
  {
    "message": "Usuário excluido com sucesso"
  }
  ```

- **Possíveis Erros:**
  - 500 Internal Server Error: "Erro ao excluir Usuário"

---

### PATCH /user/me/upload

- **Descrição:** Atualiza a imagem de perfil do usuário autenticado.
- **Requer autenticação:** Sim
- **Formato da Requisição:** Multipart/form-data com o campo `image` contendo o arquivo.
- **Resposta de Sucesso (200):**

  ```json
  {
    "message": "Imagem de perfil salva com sucesso!",
    "image": "string" // URL da imagem
  }
  ```

---

## Rotas de Postagens

### POST /post

- **Descrição:** Cria uma nova postagem.
- **Requer autenticação:** Sim
- **Corpo da Requisição:**

  ```json
  {
    "title": "string",
    "description": "string"
  }
  ```

- **Resposta de Sucesso (201):**

  ```json
  {
    "message": "Sua postagem foi salva com sucesso"
  }
  ```

- **Possíveis Erros:**
  - 400 Bad Request: Campos obrigatórios não fornecidos.
  - 401 Unauthorized: Usuário não autenticado.
  - 500 Internal Server Error: "Erro ao criar postagem"

---

### GET /post

- **Descrição:** Retorna todas as postagens.
- **Requer autenticação:** Sim
- **Resposta de Sucesso (200):**

  ```json
  [
    {
      "id": "number",
      "title": "string",
      "description": "string",
      "author": {
        "id": "number",
        "name": "string",
        "image": "string | null"
      },
      "comments": [
        {
          "id": "number",
          "description": "string",
          "author": {
            "id": "number",
            "name": "string",
            "image": "string | null"
          }
        }
        // ... mais comentários
      ]
    }
    // ... mais postagens
  ]
  ```

- **Possíveis Erros:**
  - 401 Unauthorized: Usuário não autenticado.
  - 404 Not Found: "Postagens não encontradas"

---

### GET /post/:postId

- **Descrição:** Retorna uma postagem específica pelo ID.
- **Requer autenticação:** Sim
- **Parâmetros de Rota:**
  - `postId` (number): ID da postagem.
- **Resposta de Sucesso (200):**

  ```json
  {
    "id": "number",
    "title": "string",
    "description": "string",
    "author": {
      "id": "number",
      "name": "string",
      "image": "string | null"
    },
    "comments": [
      {
        "id": "number",
        "description": "string",
        "author": {
          "id": "number",
          "name": "string",
          "image": "string | null"
        }
      }
      // ... mais comentários
    ]
  }
  ```

- **Possíveis Erros:**
  - 401 Unauthorized: Usuário não autenticado.
  - 404 Not Found: "Postagem não encontrada"
  - 500 Internal Server Error: "Erro ao buscar postagem"

---

### PUT /post/:postId

- **Descrição:** Atualiza uma postagem específica.
- **Requer autenticação:** Sim
- **Parâmetros de Rota:**
  - `postId` (number): ID da postagem.
- **Corpo da Requisição:**

  ```json
  {
    "title": "string",
    "description": "string"
  }
  ```

- **Resposta de Sucesso (200):**

  ```json
  {
    "message": "Postagem atualizada com sucesso"
  }
  ```

- **Possíveis Erros:**
  - 400 Bad Request: Campos obrigatórios não fornecidos.
  - 404 Not Found: "Postagem não encontrada"
  - 500 Internal Server Error: "Não foi possível atualizar a postagem"

---

### DELETE /post/:postId

- **Descrição:** Exclui uma postagem específica.
- **Requer autenticação:** Sim
- **Parâmetros de Rota:**
  - `postId` (number): ID da postagem.
- **Resposta de Sucesso (200):**

  ```json
  {
    "message": "Postagem deletada com sucesso"
  }
  ```

- **Possíveis Erros:**
  - 404 Not Found: "Postagem não encontrada"
  - 500 Internal Server Error: "Não foi possível deletar a postagem"

---

### GET /post/user

- **Descrição:** Retorna todas as postagens do usuário autenticado.
- **Requer autenticação:** Sim
- **Resposta de Sucesso (200):**

  ```json
  [
    {
      "id": "number",
      "title": "string",
      "description": "string",
      "comments": [
        // ... comentários
      ]
    }
    // ... mais postagens
  ]
  ```

- **Possíveis Erros:**
  - 401 Unauthorized: Usuário não autenticado.
  - 404 Not Found: "Postagens não encontradas"

---

## Rotas de Instituições

### POST /instituicao

- **Descrição:** Cria uma nova instituição.
- **Requer autenticação:** Sim
- **Corpo da Requisição:**

  ```json
  {
    "name": "string",
    "latitude": "string",
    "longitude": "string"
  }
  ```

- **Resposta de Sucesso (201):**

  ```json
  {
    "message": "Instituição criada com sucesso"
  }
  ```

- **Possíveis Erros:**
  - 400 Bad Request: Campos obrigatórios não fornecidos.
  - 401 Unauthorized: Usuário não autenticado.
  - 500 Internal Server Error: "Erro ao criar a instituição"

---

### GET /instituicao

- **Descrição:** Retorna todas as instituições.
- **Requer autenticação:** Sim
- **Resposta de Sucesso (200):**

  ```json
  [
    {
      "id": "number",
      "name": "string",
      "latitude": "string",
      "longitude": "string",
      "createdBy": {
        "id": "number",
        "name": "string"
      }
    }
    // ... mais instituições
  ]
  ```

- **Possíveis Erros:**
  - 401 Unauthorized: Usuário não autenticado.
  - 404 Not Found: "Instituições não encontradas"

---

### PUT /instituicao/:instituicaoId

- **Descrição:** Atualiza uma instituição específica.
- **Requer autenticação:** Sim
- **Parâmetros de Rota:**
  - `instituicaoId` (number): ID da instituição.
- **Corpo da Requisição:**

  ```json
  {
    "name": "string",
    "latitude": "string",
    "longitude": "string"
  }
  ```

- **Resposta de Sucesso (200):**

  ```json
  {
    "message": "Instituição atualizada com sucesso"
  }
  ```

- **Possíveis Erros:**
  - 400 Bad Request: Campos obrigatórios não fornecidos.
  - 404 Not Found: "Erro ao atualizar a instituição"

---

### DELETE /instituicao/:instituicaoId

- **Descrição:** Exclui uma instituição específica.
- **Requer autenticação:** Sim
- **Parâmetros de Rota:**
  - `instituicaoId` (number): ID da instituição.
- **Resposta de Sucesso (200):**

  ```json
  {
    "message": "Instituição excluída com sucesso"
  }
  ```

- **Possíveis Erros:**
  - 404 Not Found: "Instituição não encontrada"

---

## Rotas de Comentários

### POST /post/:postId/comment

- **Descrição:** Cria um novo comentário em uma postagem específica.
- **Requer autenticação:** Sim
- **Parâmetros de Rota:**
  - `postId` (number): ID da postagem.
- **Corpo da Requisição:**

  ```json
  {
    "description": "string"
  }
  ```

- **Resposta de Sucesso (200):**

  ```json
  {
    "message": "Seu comentário foi salvo com sucesso"
  }
  ```

- **Possíveis Erros:**
  - 400 Bad Request: "Não é possível criar um comentário vazio"
  - 401 Unauthorized: Usuário não autenticado.
  - 500 Internal Server Error: "Erro ao criar comentário"

---

### GET /post/:postId/comment

- **Descrição:** Retorna todos os comentários de uma postagem específica.
- **Requer autenticação:** Sim
- **Parâmetros de Rota:**
  - `postId` (number): ID da postagem.
- **Resposta de Sucesso (200):**

  ```json
  [
    {
      "id": "number",
      "description": "string",
      "author": {
        "id": "number",
        "name": "string",
        "image": "string | null"
      }
    }
    // ... mais comentários
  ]
  ```

- **Possíveis Erros:**
  - 400 Bad Request: "Postagem não especificada"
  - 404 Not Found: "Comentários não encontrados"

---

### GET /post/:postId/comment/:id

- **Descrição:** Retorna um comentário específico de uma postagem.
- **Requer autenticação:** Sim
- **Parâmetros de Rota:**
  - `postId` (number): ID da postagem.
  - `id` (number): ID do comentário.
- **Resposta de Sucesso (200):**

  ```json
  {
    "id": "number",
    "description": "string",
    "authorId": "number",
    "postId": "number"
  }
  ```

- **Possíveis Erros:**
  - 404 Not Found: "Comentário não encontrado"

---

### PUT /post/:postId/comment/:id

- **Descrição:** Atualiza um comentário específico.
- **Requer autenticação:** Sim
- **Parâmetros de Rota:**
  - `postId` (number): ID da postagem.
  - `id` (number): ID do comentário.
- **Corpo da Requisição:**

  ```json
  {
    "description": "string"
  }
  ```

- **Resposta de Sucesso (200):**

  ```json
  {
    "message": "Comentário atualizado com sucesso"
  }
  ```

- **Possíveis Erros:**
  - 400 Bad Request: "Não é possível atualizar um comentário vazio"
  - 403 Forbidden: "Você não pode atualizar esse comentário!"
  - 404 Not Found: "Comentário não encontrado"

---

### DELETE /post/:postId/comment/:id

- **Descrição:** Exclui um comentário específico.
- **Requer autenticação:** Sim
- **Parâmetros de Rota:**
  - `postId` (number): ID da postagem.
  - `id` (number): ID do comentário.
- **Resposta de Sucesso (200):**

  ```json
  {
    "message": "Comentário deletado com sucesso"
  }
  ```

- **Possíveis Erros:**
  - 403 Forbidden: "Você não pode deletar esse comentário!"
  - 404 Not Found: "Comentário não encontrado"

---

## Autenticação

- **Método de Autenticação:** Token JWT
- **Como fornecer o token:** O token deve ser fornecido no cabeçalho da requisição `Authorization` no formato `Bearer {token}`.

---

## Observações Gerais

- **Formato dos IDs:** Todos os IDs são números inteiros.
- **Campos Obrigatórios:** Todos os campos marcados como obrigatórios devem ser fornecidos; caso contrário, a API retornará um erro 400.
- **Mensagens de Erro:** A API retorna mensagens de erro em um objeto JSON no formato `{ "message": "Descrição do erro" }`.

---

## Exemplo de Uso do Token JWT

Ao fazer login com sucesso através da rota `POST /login`, você receberá um token JWT. Para acessar rotas que requerem autenticação, inclua o token no cabeçalho da requisição:

```
Authorization: Bearer seu_token_jwt_aqui
```

---


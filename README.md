## Flora Energia API

- Backend desenvolvido para pesquisa e gerenciamento de palavras em inglês;

## Instalação
- Clone o repositório
```
git clone  <git hub template url> <project_name>
```

- Nvm use
```
nvm use
```

- Instale as dependencias 
```
yarn ou yarn install
```

- Preencha o arquivo .env com as informações do banco de dados Postgresql

- Rode docker-compose
```
docker-compose up -d
```

- Rode as migrations
```
yarn prisma migrate dev
```

- Rode o script para popular o banco
```
yarn seed
```

- Rode o servidor
```
yarn start:dev
```


## Endpoints
### Criar novo usuário

`POST /auth/signup - status 201`

Request
  
  ```
  {
	"name": "user",
	"email": "user@mail.com",
	"password": "123"
}
  
  ```

Response
```
{
	"name": "User",
	"email": "User@mail.com",
	"id": "4c0e89f0-c0e2-4caf-813e-4751488f830a"
}
  ```
 
### Login com usuário
  `POST /auth/signin - status 200`

Request
  
  ```
  {
	"email": "user@mail.com",
	"password": "123"
}
  ```
Response
```
 {
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 }
  ```
  ### Rotas que necessitam de TOKEN
  ---------------------
  ### Listar palavras
  `GET /entries/en - status 200`
  
  Response
  
  ```
 {
    "results": [
        "test",
        "testa",
        "testability",
        "testable",
        "testacea"
    ],
    "totalDocs": 118,
    "page": 1,
    "totalPages": 23,
    "hasNext": true,
    "hasPrev": false
}
  
  ```

  ### Buscar detalhes da palavras
  `GET /entries/en/:word - status 200`
  - Faz a listagem das transações em ordem crescente de data.
  - Faz a listagem de 5 transações por página.
  
  Response
  
  ```
[
    {
        "word": "first",
        "phonetic": "/fɪrst/",
        "phonetics": [
            {
                "text": "/fɪrst/",
                "audio": ""
            },
            {
                "text": "/fɜːst/",
                "audio": ""
            },
            {
                "text": "/fɝst/",
                "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/first-us.mp3",
                "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=195881",
                "license": {
                    "name": "BY-SA 3.0",
                    "url": "https://creativecommons.org/licenses/by-sa/3.0"
                }
            }
        ],
    ...
    }
  ```
  
  ### Favoritar uma palavra
  `POST /entries/en/:word/favorite - status 200`
  
  
  ### Remover palavra dos favoritos
  `[DELETE] /entries/en/:word/unfavorite - status 201`
  
  ### Perfil do usuário
`GET /user/me - status 201`

Response
```
{
    "user": {
        "id": "a0c1e4c6-0173-4542-9118-48ff125f0844",
        "username": "Teste3",
        "email": "email3@teste.com",
        "createdAt": "2024-12-21T20:50:05.682Z"
    }
}
  ```

  ### Lista das palavras visitadas
`GET /user/me/history - status 201`

Response
```
{
    "results": [
        {
            "word": "test",
            "added": "2024-12-22T04:13:44.961Z"
        },
        {
            "word": "love",
            "added": "2024-12-22T05:47:46.491Z"
        },
        {
            "word": "first",
            "added": "2024-12-23T18:21:50.633Z"
        }
    ],
    "totalDocs": 3,
    "page": 1,
    "totalPages": 0,
    "hasNext": true,
    "hasPrev": false
}
  ```

  ### Lista das palavras favoritas
`GET /user/me/favorites - status 201`

Response
```
{
    "results": [
        {
            "word": "test",
            "added": "2024-12-22T04:13:44.961Z"
        },
        {
            "word": "love",
            "added": "2024-12-22T05:47:46.491Z"
        },
        {
            "word": "first",
            "added": "2024-12-23T18:21:50.633Z"
        }
    ],
    "totalDocs": 3,
    "page": 1,
    "totalPages": 0,
    "hasNext": true,
    "hasPrev": false
}
  ```
  
  ## Tecnologias utilizadas
  - Node
  - Typescript
  - Fastify
  - Prisma
  - PostgreSQL
  
  [⬆ Voltar ao topo](#Flora Energia API)<br>

<<<<<<< HEAD
# StockzBucketz
=======
Project link : https://stockz-bucketz.vercel.app

# Getting Started with Create React App
>>>>>>> joao

StockzBucketz é uma aplicação para gerenciamento de portfólios de ações, utilizando React, .NET 8, e Firebase.

## Pré-visualização

https://github.com/user-attachments/assets/1a065863-717b-4490-b44c-b9e518c40011
![foto1](https://github.com/user-attachments/assets/a6c063d7-8704-4f40-b260-6927a72788e5)
![foto2](https://github.com/user-attachments/assets/350be491-5bf4-404d-acb0-dc164010cf7d)


## Pré-requisitos

- Node.js (>= 20.17)
- npm (>= 6.x) ou Yarn (>= 1.x)

## Tecnologias Utilizadas
 - Docker
 - React
 - Typescript
 - Firebase

## Instalação

1. Clone o repositório:

   git clone https://github.com/jfmartinsvred1/StockzBucketz.git
   cd StockzBucketz
2. Instale as dependências:

   npm install
   # ou
   yarn install
3.Crie uma conta no Firebase e obtenha as chaves de configuração.

4.Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

    bash
    Copiar código
    REACT_APP_FIREBASE_API_KEY="sua-chave-api"
    REACT_APP_FIREBASE_AUTH_DOMAIN="seu-auth-domain"
    REACT_APP_FIREBASE_PROJECT_ID="seu-project-id"
    REACT_APP_FIREBASE_STORAGE_BUCKET="seu-storage-bucket"
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID="seu-messaging-sender-id"
    REACT_APP_FIREBASE_APP_ID="seu-app-id"
    REACT_APP_FIREBASE_MEASUREMENT_ID="seu-measurement-id"
    REACT_APP_LOCAL_URL_API="https://localhost:7142"
## 5. Configure a API corretamente

Para que o frontend funcione corretamente, você precisará baixar e configurar a API do projeto.

1. Clone o repositório da API:

   ```bash
   git clone https://github.com/jfmartinsvred1/StockzBucketz-api.git
   cd StockzBucketz-api
2. Siga as instruções no README.md do repositório da API para configurá-la e rodá-la localmente ou utilizando Docker.

Repositório da API:
https://github.com/jfmartinsvred1/StockzBucketz-api/tree/main

    
Scripts Disponíveis
  No diretório do projeto, você pode executar:

    npm start
    Roda a aplicação em modo de desenvolvimento.
    Abra http://localhost:3000 para visualizar no navegador.

    npm test
    Executa os testes.

    npm run build
    Compila a aplicação para produção na pasta build.

Observações:

1. O projeto ainda não está 100% completo e segue recebendo atualizações.
2. Certifique-se de que o banco de dados SQL Server ou MySQL esteja em execução e acessível.
3. As variáveis de ambiente precisam estar corretamente configuradas no arquivo .env para que a aplicação funcione corretamente.

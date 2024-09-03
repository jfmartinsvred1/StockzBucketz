# StockzBucketz

StockzBucketz é uma aplicação para gerenciamento de portfólios de ações, utilizando React, .NET 8, e Firebase.

## Pré-visualização

https://github.com/user-attachments/assets/1a065863-717b-4490-b44c-b9e518c40011

## Pré-requisitos

- Node.js (>= 20.17)
- npm (>= 6.x) ou Yarn (>= 1.x)
- .NET 8
- Banco de dados SQL Server ou MySQL configurado na máquina
- Docker (opcional)

## Tecnologias Utilizadas
 - Docker
 - .NET 8
 - React
 - Typescript
 - Firebase
 - SqlServe
 - MySql

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
5.Configure o banco de dados SQL Server ou MySQL na sua máquina.

6.Para rodar a aplicação localmente, você pode escolher uma das opções abaixo:

 ..Rodando o backend com .NET 8:
  

  Navegue até a pasta da API e rode o backend com o seguinte comando:

    bash
    Copiar código
    cd StockzBucketz.Api
    dotnet run
  Verifique as URLs da API:

  Certifique-se de que as URLs da API configuradas no serviço ApiService do React estejam apontando para a mesma URL em que o backend .NET está rodando.

  ..Usando Docker:

  Certifique-se de que o Docker esteja instalado e em execução, depois utilize:

    bash
    Copiar código
    docker-compose up
  Scripts Disponíveis
  No diretório do projeto, você pode executar:

    npm start
    Roda a aplicação em modo de desenvolvimento.
    Abra http://localhost:3000 para visualizar no navegador.

    npm test
    Executa os testes.

    npm run build
    Compila a aplicação para produção na pasta build.

Observações
Certifique-se de que o banco de dados SQL Server ou MySQL esteja em execução e acessível.
As variáveis de ambiente precisam estar corretamente configuradas no arquivo .env para que a aplicação funcione corretamente.-

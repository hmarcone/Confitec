# Confitec - Cadastro de Usuários
 Projeto DDD com .Net 5 e Angular 12

Este é um projeto de CRUD simples de uma lista de usuários.

## Technologies

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Angular 12](https://angular.io/guide/setup-local#install-the-angular-cli)
- [ASP.NET Core Runtime 5.0.11](https://dotnet.microsoft.com/download/dotnet/5.0)
- [Entity Framework](https://docs.microsoft.com/pt-br/dotnet/framework/data/adonet/ef/)

## Como rodar

Clone o projeto e acesse sua pasta.

```bash
$ git clone git@github.com:hmarcone/Confitec.git
$ cd crud-usuario
```

### Backend

A solução tem um projeto separado em camadas. O projeto depende de migração e, portanto, todos os dados e estruturas necessitam da utilizazão do add-migration e do update-database

### Frontend

Para iniciar o projeto, siga as etapas abaixo:

```bash
# Instalar as dependências
$ npm install

# Start o projeto
$ npm start
```
O aplicativo estará disponível em seu navegador na url: http://localhost:4200/.

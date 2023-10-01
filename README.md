# API RESTful
Esta é uma API RESTful para a realização das operações de CRUD (Create, Read, Update e Delete), desenvolvida para a disciplina Plataforma Node.js da *Especialização em Arquitetura de Software Distribuído* na PUC Minas, utilizando Node.js e Express.

## *Funcionalidades*
A API apresenta a seguinte estrutura:
| Ação                        	   |  Operação (CRUD) 	| Mapeamento da URL        	|
|-----------------------------	   |------------------	|--------------------------	|
| Incluir um filme            	   | **C**REATE       	| **POST**   /filmes      	   |
| Obter a lista de filems     	   | **R**ETRIEVE     	| **GET**    /filmes       	|
| Obter um filme específico   	   | **R**ETRIEVE     	| **GET**    /filmes/:id   	|
| Alterar um filme            	   | **U**PDATE       	| **PUT**    /filmes/:id   	|
| Excluir um filme            	   | **D**ELETE       	| **DELETE** /filmes/:id   	|
|                                                                                      |
| Incluir um usuario             	| **C**REATE       	| **POST**   /usuarios   	   |
| Incluir um administrador          | **C**REATE       	| **POST**   /administradores |
| Excluir um usuario/administrador  | **D**ELETE       	| **DELETE** /usuarios      	|
|                                                                                      |
| Realizar login na aplicação       | N/A                 | **POST**   /login          |


## *Requisitos para Execução*
- Node.js 
- npm
- Docker

## *Execução*
1. Clone este repositório:
   git clone https://github.com/masassuncao/arq-nodejs-pucMinas.git

2. Instale as dependências:
   npm install

3. Configure o arquivo .env com os valores desejados.

   Atenção: O arquivo .env encontra-se preenchido com valores default não devendo ser utilizado em produção.

3. Inicie o servidor:
   npm start

4. O servidor estará em execução, bastando acessar o seguinte endereço:
   http://localhost:3000

## *Segurança*
A aplicação implementa autenticação e autorização por meio de JSON Web Token (JWT), de forma que para acesso aos recursos de qualquer rota, o usuário deverá estar autenticado no sistema.

Encontram-se definidos dois perfis de usuários:
   - USER: Trata-se do usuário do sistema, tendo acesso a listar todos os filmes disponíveis e buscar filmes por id.
   - ADMIN: Trata-se do administrador do sistema que, além dos acessos concedidos ao usuário comum (listar/buscar filmes), pode também inserir, alterar, ou excluir filmes da base de dados.

Por padrão, a aplicação é inicializada com dois usuários no banco de dados (*admin* e *user*) ambos com a mesma senha cadastrada ("1234").

## *Usuários*
**User**: Um usuário pode fazer o seu cadastro na aplicação, enviando uma requisição POST para a rota ***"/api/v3/usuarios"***. Deverão ser enviadas as seguintes informações em um objeto json:
 - nome:  String
 - login: String
 - senha: String
 - email: String

**Admin**: Apenas administradores podem cadastrar outros administradores. Para isso, deverá ser enviada uma requisição POST para a rota ***"/api/v3/administradores"***. As informações a serem enviadas são as mesmas listadas no item anterior.

**Exclusão de usuários/administradores**: Apenas administradores podem realizar a exclusão de usuários ou de outros administradores. Para isso, deverá ser enviada uma requisição DELETE para a rota ***"/api/v3/usuarios"***, a requisição deverá conter em seu body o login do usuário/administrador a ser excluído.


## *Rotas*
### Login
- POST      /api/seg/login             -> Obtem token de autenticação.

### Usuários
- POST      /api/v3/usuarios           -> Inclui um novo usuário.
- POST      /api/v3/administradores    -> Inclui um novo administrador.
- DELETE    /api/v3/usuarios           -> Exclui um usuário/administrador.

### Filmes
- POST      /api/v3/filmes             -> Inclui um novo filme.
- GET       /api/v3/filmes             -> Retorna uma lista com todos os filmes.
- GET       /api/v3/filmes/:id         -> Retorna um filme específico por ID.
- PUT       /api/v3/filmes/:id         -> Altera um filme existente.
- DELETE    /api/v3/filmes/:id         -> Exclui um filme existente.
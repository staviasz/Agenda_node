# Documentação da Aplicação de Agenda de Contatos

## Introdução

A Aplicação de Agenda de Contatos é uma aplicação full-stack desenvolvida para gerenciar informações de contatos pessoais. Utiliza o padrão MVC (Model-View-Controller) para garantir uma estrutura organizada e de fácil manutenção. A aplicação é construída utilizando a linguagem de programação JavaScript, o framework Express.js e o banco de dados MongoDB para armazenar os dados de contatos.

## Funcionalidades

A Aplicação de Agenda de Contatos oferece as seguintes funcionalidades:

- Registro de Usuário: Permite que os usuários criem uma conta com informações de login seguras, incluindo criptografia de senha utilizando o pacote bcryptjs.

- Autenticação e Sessões: Fornece autenticação de usuário e gerenciamento de sessões de login usando o pacote express-session.

- Gerenciamento de Contatos: Os usuários podem adicionar, visualizar, atualizar e excluir informações de contatos na agenda.

- Validações de Dados: As entradas de dados são validadas tanto no back-end quanto no front-end para garantir a integridade e a segurança dos dados.

## Arquitetura MVC

A aplicação segue o padrão de arquitetura MVC, o que significa que as responsabilidades são divididas da seguinte forma:

- **Model**: Responsável pela interação com o banco de dados MongoDB e pela definição dos esquemas dos documentos.

- **View**: Responsável pela apresentação dos dados ao usuário. Utiliza o mecanismo de visualização EJS para renderizar as páginas dinamicamente.

- **Controller**: Responsável pelo controle das ações do usuário e pela lógica de negócios. Gerencia as rotas e interage com os modelos e as visualizações.

## Requisitos

- **Linguagem de Programação**: JavaScript
- **Banco de Dados**: MongoDB

## Dependências

As seguintes dependências estão sendo utilizadas para o desenvolvimento da aplicação:

**Dependencies:**

- bcryptjs
- ejs
- express
- express-session
- helmet
- mongodb
- mongoose
- validator

**Dev Dependencies:**

- babel-loader
- nodemon
- webpack

## Como Usar

1. Clone este repositório para sua máquina local.

2. Instale as dependências necessárias usando `npm install`.

3. Configure as variáveis de ambiente no arquivo `.env` para conexão com o banco de dados MongoDB, chaves secretas, etc.

4. Execute a aplicação usando `npm start` ou `nodemon`.

5. Acesse a aplicação em seu navegador em http://localhost:3000.

## Licença

Este projeto está licenciado sob a Licença MIT. Foi desenvolvido por **Erick Staviasz** durante o curso de JavaScript e TypeScript ministrado por Otávio Miranda.

## Contato

Se você tiver alguma dúvida ou sugestão, entre em contato com staviasz_developer@outlook.com

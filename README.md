<h1 align="center">
	NLW Setup (Rocketseat) - Vue.js
</h1>

<p align="center">Front-end da Trilha Ignite do Evento Next Level Week Setup realizada utilizando Vue.JS</p>

## 🚀 Projeto

Um componente destinado a realizar o registro de hábitos diários, similar ao registro de commits do Github!
<br />

## 🔧 Tecnologias

- Vite
- TailWindCSS
- VueJS
- Typescript
- Axios

## 🚀 Instalando e executando o projeto

Para executar o projeto localmente na sua máquina, siga as seguintes etapas:

### Pré-requisitos

Para instalar as dependências necessárias do projeto (frontend) utilizaremos o yarn, para instala-lo, execute o seguinte comando:

  ```sh
  npm install --global yarn
  ```

Clone o repositório em sua máquina através do seguinte comando:

   ```sh
   git clone https://github.com/cn-2k/nlw-setup-vuejs
   ```

### Backend

Siga as etapas seguintes para instalar e executar o projeto backend:

1. Acesse o diretório ``/backend`` e instale as dependências:

   ```sh
   npm install
   ```
   
2. Altere o nome da variável de ambiente ``.env.example`` para ``.env``

 
3. Execute o seguinte comando para carregar a variável de ambiente:

   ```js
   npx prisma generate
   ``` 
   
   
3. Execute o servidor em modo desenvolvimento:

   ```js
   npm run dev
   ``` 
   

### Frontend

Siga as etapas seguintes para instalar e executar o projeto frontend:

1. Acesse o diretório ``/frontend`` e instale as dependências:

   ```sh
   yarn install
   ```
   
2. Execute o projeto frontend em modo desenvolvimento:

   ```js
   yarn dev
   ``` 
<br />

[⬆ Voltar ao topo](#-projeto)

# Projeto Demo Spotify

Este é um projeto demo do Spotify desenvolvido em TypeScript utilizando as seguintes tecnologias:

- Next.js 13
- Tailwind CSS
- Redux
- NextAuth
- Middleware
- Spotify API

O objetivo deste projeto é criar uma aplicação web que replica a interface do Spotify, permitindo o acesso a recursos como auteticação de usuário, visualização de playlists do usuário e reprodução de músicas.

## Funcionalidades

- Auteticação de usuário
- Visualização de playlists do usuário
- Reprodução de músicas

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter os seguintes pré-requisitos instalados em sua máquina:

- Node.js (versão 14 ou superior)
- npm ou yarn

## Instalação

Siga as etapas abaixo para configurar e executar o projeto localmente:

1. Clone este repositório para o seu ambiente de desenvolvimento:

   ```bash
   git clone https://github.com/pedrohxiv/spotify-demo.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd spotify-demo
   ```

3. Instale as dependências do projeto:

   ```bash
   npm install
   # ou
   yarn install
   ```

4. Configure as credenciais da API do Spotify:

   Para utilizar a API do Spotify, é necessário obter credenciais de acesso. Siga as instruções da documentação oficial do Spotify para criar um aplicativo e obter as chaves de acesso (client ID e client secret).

   Após obter as chaves de acesso, crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis de ambiente:

   ```
   NEXTAUTH_URL='http://localhost:3000'
   SPOTIFY_CLIENT_SECRET=your-client-secret
   SPOTIFY_CLIENT_ID=your-client-id
   JWT_SECRET=your-secret-token
   ```

   Substitua `your-client-id` e `your-client-secret` pelas suas próprias chaves de acesso e o `your-secret-token` por um token secreto.

5. Execute o projeto:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

6. Acesse o projeto no seu navegador:

   O projeto estará disponível no endereço [http://localhost:3000](http://localhost:3000).

## Estrutura do Projeto

A estrutura do projeto é baseada no framework Next.js e segue a convenção de pastas recomendada:

- `/app`: Contém as páginas da aplicação
- `/components`: Contém os componentes reutilizáveis
- `/hooks`: Contém hooks utilizados para facilitar na utilização dos componentes.
- `/lib`: Contém função de acesso ao Spotify API e uma função de conversão de milisegundos para minutos e segundos.
- `/store`: Contém toda estrutura do Redux da aplicação.

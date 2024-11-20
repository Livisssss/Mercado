
## :rocket: Tecnologias

Esse projeto foi desenvolvido com a utilização das seguintes tecnologias:
- React Native
- Context API
- AsyncStorage
- Axios
- Expo cli

## :information_source: Como usar

Para copiar e executar essa aplicação, você precisa de três pré-requisitos: [Git](https://git-scm.com), [Node.js][nodejs] + [Yarn][yarn] intalados no seu computador.

No terminal, digite os comandos a seguir:

### Baixar e instalar o projeto

```bash
# Clonar esse repositório
$ git clone <link>

# Vá para o ropositório
$ cd Mercado

# Instale as dependências
$ npm install
```
### Alterar IP

No arquivo 'src/servicos/api.js' é necessário adicionar na URL o IP atual da máquina em que está sendo executado o projeto.

### Executar o Mobile

```bash
# Irá instalar o EXPO e rodar o projeto
$ npm run android --verbose
```

### Executar a Web API

```bash
# Sistitua o IP pelo que o EXPO mostra, lembre de colocar esse mesmo IP na requisição de api
$ nvm use v16
$ json-server --watch --host 192.168.1.102 db.json
```


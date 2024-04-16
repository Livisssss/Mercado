
## :rocket: Tecnologias

Esse projeto foi desenvolvido com a utilização das seguintes tecnologias:
- [React Native][rn]
- [Expo][expo]

## :information_source: Como usar

Para copiar e executar essa aplicação, você precisa de três pré-requisitos: [Git](https://git-scm.com), [Node.js][nodejs] + [Yarn][yarn] intalados no seu computador.

No terminal, digite os comandos a seguir:

### Baixar e instalar o projeto

```bash
# Clonar esse repositório
$ git clone https://github.com/alura-cursos/react-native-context-api.git

# Vá para o ropositório
$ cd Mercado

# Instale as dependências
$ npm install
```

### Executar o Mobile

```bash
# Irá instalar o EXPO e rodar o projeto
$ sudo npm run android --verbose
```

### Executar a Web API

```bash
# Sistitua o IP pelo que o EXPO mostra, lembre de colocar esse mesmo IP na requisição de api
$ sudo $(which json-server) --watch --host 192.168.209.163 db.json
```


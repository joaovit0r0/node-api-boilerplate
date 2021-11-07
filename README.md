# Node API Boilerplate

## Banco de dados

Antes de iniciar o servidor é necessário inserir um `usuário` válido para acessar o mongo, assim como a base `ho-database`

Com o **docker** rodando execute os comandos abaixo:

```sh
# conecta no docker
docker exec -it ho-mongo bash

# conecta na base de dados
mongo -u ho_root -p

# adiciona uma base de dados caso não exista
use ho-database

# adiciona usuário para acesso ao banco
db.createUser({
    user: 'ho_baseapi',
    pwd: '562f71639f6c004e088193f3',
    roles: [ { role: 'readWrite', db: 'baseapi'} ],
    passwordDigestor: 'server'
});
```

## Docker

Para iniciar o projeto é necessário ter o `docker` e o `docker-compose` instalados.

Docker: <https://docs.docker.com/engine/install/>

Docker Compose: <https://docs.docker.com/compose/install/>

## Iniciando o servidor

Instale as dependências rodando o comando abaixo na raiz do diretório:

```sh
npm install
```

Na primeira vez que iniciar o projeto é necessário gerar o build do `Dockerfile` com o comando:

```sh
docker-compose up --build
```

Para rodar o projeto basta executar o comando:

```sh
docker-compose up
```

`OBS`: Verifique as informações de conexão no arquivo `src/config/database`

Se tudo estiver ok a api e a documentação deve estar rodando nos endereços:

**API**: <http://localhost:4444>

**Documentação de endpoints**: <http://localhost:4444/swagger>

## NGROK

Em alguns navegadores para acessar o swagger ou a documentação do código, será preciso rodar em modo https, para isso basta executar o ngrok

```bash
ngrok http 4444
```

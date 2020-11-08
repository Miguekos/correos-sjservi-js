## utils

### Tipo de proyecto
- Nodejs 8
- Express

#### Puertos utilizados en el proyecto, de usarlos
- 5008

#### Instalación de dependencias y preparación del ambiente, de ser necesario
- npm install
Si es un servidor nuevo, ver [**Instalación de Node.**](AMBIENTE.md)

#### Pasos para deploy o puesta en marcha
- De no estar iniciado:

**PRODUCCIÓN**:

```sh
$ cd /usr/local/nodeapps/utils
$ npm install
$ pm2 start server.config.js --env production
$ pm2 startup
$ pm2 save
```

**DESARROLLO**:

```sh
$ cd /usr/local/nodeapps/utils
$ npm install
$ pm2 start server.config.js --env development
$ pm2 startup
$ pm2 save
```

- De estar iniciado, (si agregó una nueva dependencia, ejecute el npm install. Si no omita ese comando):

```sh
$ cd /usr/local/nodeapps/utils
$ npm install
$ pm2 reload utils
```

#### Pasos para detener el proyecto
```sh
$ cd /usr/local/nodeapps/utils
$ pm2 stop utils
```

#### Proceso de Rollback
```sh
$ cd /usr/local/nodeapps/utils
$ git reset --hard HEAD~1
```

#### Solución de problemas del proyecto, de ser necesario
- n/a

#### Iniciar como Programador

Para iniciar en el servidor de Desarollo
 
```sh
$ cd /usr/local/nodeapps/utils
$ yarn install
$ yarn dev
```

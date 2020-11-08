## INTALACIÓN DE NODE JS

Instalacion utilizando PPA

```sh
$ cd ~
$ curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
$ sudo bash nodesource_setup.sh
$ sudo apt-get install -y nodejs
```

Para verificar qué versión de Node.js ha instalado después de estos pasos iniciales, escriba:
```sh
$ nodejs -v
v8.9.4
```

El paquete  **nodejs**  también contiene el binario **npm**, por lo que no es necesario instalarlo por separado.

**npm** utiliza un archivo de configuración en su directorio de inicio para realizar un seguimiento de las actualizaciones. Se creará la primera vez que corras **npm**. Ejecute este comando para verificar que **npm** esté instalado y para crear el archivo de configuración:

```sh
$ npm -v
5.6.0
```

Para que algunos paquetes **npm**  funcionen (por ejemplolos, que requieren compilar código de origen), deberá instalar el  paquete **build-essential**:

```sh
$ sudo apt-get install -y build-essential
```




## INSTALACIÓN DE PM2
Es un gestor de procesos de produccion para aplicaciones Node.js. que permite mantener vivas las aplicaciones node. [[Sitio PM2 official]](http://pm2.keymetrics.io/)


El comando de instalacion se realiza con npm de manera global.
```sh
$ sudo npm install pm2 -g
```

El comando básico para iniciar una aplicación node:
```sh
$ pm2 start app.js --name "my-app-node"
```

Para visualizar todos los aplicativos corriendo en produccion ejecutas el siguiente comando.
```sh
$ pm2 list
```

Para detener, reiniciar, eliminar y ver el logs de tus procesos:
```sh
$ pm2 stop  0  
$ pm2 restart 0
$ pm2 delete  0
$ pm2 logs 0
```
En los comandos anteriores "0" es el id del Proceso en PM2, esto puede variar por los aplicativos que tengas en producción.



##### PM2 LOGS (OBLIGATORIO)

[**pm2-logrotate**](https://github.com/keymetrics/pm2-logrotate#configure) auto rota los registros de PM2 y las aplicaciones administradas: 

Instalación:

```sh
$ pm2 install pm2-logrotate
```

Configuración para **rotar cada día**:

```sh
$ pm2 set pm2-logrotate:rotateInterval '0 0 */1 * *'
```

Configuración para **formato de fecha**:

```sh
$ pm2 set pm2-logrotate:dateFormat 'YYYY-MM-DD'
```
[Ver más opciones](https://github.com/keymetrics/pm2-logrotate#configure)





## INSTALACIÓN DE REDIS 

Redis es una tienda de key-value en memoria conocida por su flexibilidad, rendimiento y amplio soporte de idiomas.


##### UBUNTU 14.04  

[Guia completa en Digitalocean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis)

Instalación:
```sh
$ wget http://download.redis.io/releases/redis-stable.tar.gz
$ tar xzf redis-stable.tar.gz
$ cd redis-stable
$ make
$ make test
$ sudo make install
$ cd utils
$ sudo ./install_server.sh
```

A medida que se ejecuta el script, puede elegir las opciones predeterminadas presionando enter. (Eliga todas la predeterminadas) Una vez que la secuencia de comandos finaliza, el **redis-server** se ejecutará en segundo plano.

Puede comenzar y detener el redis con estos comandos (el número depende del puerto que configuró durante la instalación. 6379 es la configuración de puerto predeterminada):

```sh
$ sudo service redis_6379 start
$ sudo service redis_6379 stop
```



##### UBUNTU 16.04

[Guia completa en Digitalocean](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-redis-on-ubuntu-16-04)

Para obtener la última versión de Redis, compilaremos e instalaremos el software desde la fuente.

Para hacer esto, podemos instalar el **build-essential** metapaquete desde los repositorios de Ubuntu. También descargaremos el **tcl** paquete, que podemos usar para probar nuestros binarios.


```sh
$ sudo apt-get update
$ sudo apt-get install build-essential tcl
```
Descargar, compilar e instalar Redis:

```sh
$ cd /tmp
$ curl -O http://download.redis.io/redis-stable.tar.gz
$ tar xzvf redis-stable.tar.gz
$ cd redis-stable
$ make
$ make test
$ sudo make install
```

#### PRUEBA DE FUNCIONALIDAD

Para iniciar en la consola de Redis Cliente, ingrese el siguiente comando.
```sh
$ redis-cli
```
Una vez ingrese en el entorno Redis cliente, puedes realizar las consultas con los sentencias.[Comandos Redis](https://redis.io/commands)
```sh
> KEYS *
```
El comando anterior lista todos los keys almacenados. Donde "KEYS" en la sentencia y "*" el patron de busqueda.

```sh
> INFO
```
El comando "info" muestra toda la configuracion de redis, se puede visualizaar tambien el espacio que utiliza en la memoria.

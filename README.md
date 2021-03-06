# Sistemas Distribuidos - Tarea 3

En este repositorio tendremos el código y las instrucciones para ejecutar la tarea 3 de sistemas distribuidos, esta consiste en implementar un servicio api rest con replicas administradas por un balanceador de carga con nginx y una base de datos con esquema master-slave, para efectos de nuestro proyecto utilizaremos nodejs y docker para lograr los objetivos.

Los integrantes son:

- Cristian Villavicencio
- Brayan Espina
- Esteban Garay

## Dependencias

- [nodejs](https://nodejs.org/es/download/package-manager/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [postgresql](https://www.postgresql.org)
- [nginx](https://www.nginx.com)
- [docker](https://docs.docker.com/engine/install/)
- [docker-compose](https://docs.docker.com/compose/install/)
- [postgresql (docker)](https://hub.docker.com/r/bitnami/postgresql)
- [nginx (docker)](https://hub.docker.com/_/nginx)


## Ejecutar

Antes de ejecutar cabe destacar revisar las configuraciones de las variables de entorno antes de ejecutar para no generar conflictos, por default tenemos la siguiente configuración en el archivo .env

```.env
POSTGRESQL_USERNAME=postgres # USUARIO DB MASTER
POSTGRESQL_PASSWORD=postgres # PASSWORD DB MASTER
POSTGRESQL_DATABASE=postgres # NOMBRE DB MASTER
POSTGRESQL_REPLICATION_USER=postgres # USUARIO DB SLAVE
POSTGRESQL_REPLICATION_PASSWORD=postgres # PASSWORD DB SLAVE
API_PORT=3000 # PUERTO USADO POR LA API
LOAD_BALANCER_PORT=80 # PUERTO USADO POR NGINX
DB_REPLICAS=3  # CANTIDAD DE REPLICAS SLAVE
API_REPLICAS=5 # CANTIDAD DE REPLICAS API
```

Con esto definimos la configuración de los puertos, replicas y credenciales para la base de datos, cabe destacar que existe un archivo script.sql el cual define y crea la tabla utilizada en la base de datos, este se genera solo, pues se encuentra configurado en el docker-compose, además, gracias a las estas variables de entorno no es necesario configurar con algún comando especial, solo debemos ejecutar :).

Luego ejecutamos con

```sh
    docker-compose up -d --build # Se recomienda quitar el tag -d para ver los logs y asi ver las interacciones entre las distintas réplicas y él --build si no se desea rebuilder.
```

IMPORTANTE: Al iniciar se debe esperar unos segundos o minutos a que se termine de levantar e iniciar los contenedores y las apps, se recomierda ir viendo los logs.

## Rutas

### /add_product

Método http post que ingresa un producto, recibe un body:

Ejemplo:

```json
{
    "name": "tusisabes",
    "stock": 33,
    "price": 420
}
```

Devuelve estado 200 y json.

```json
{
  "status": "success",
  "message": "Product added successfully",
  "data": {
    "name": "tusisabes",
    "stock": 33,
    "price": 420
  }
}
```

### /get_products

Método http get que recibe un parámetro de búsqueda, este devuelve la lista de productos que coincidan con la búsqueda realizada.

Ejemplo:

/get_products?search=tusisabes

```json
{
  "status": "success",
  "message": "Products found",
  "data": [
    {
      "id": 1,
      "name": "tusisabes",
      "price": 420,
      "stock": 33
    },
    {
      "id": 2,
      "name": "tusisabes",
      "price": 420,
      "stock": 33
    },
    {
      "id": 7,
      "name": "xd tusisabes v2",
      "price": 420,
      "stock": 33
    }
  ]
}
```
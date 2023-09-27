# Despliegue de un entorno de eesarrollo con Node.js (Express.js), MySQL, Adminer y NextJS usando Docker-Compose

Este proyecto permite desplegar un entorno de desarrollo que consta de dos contenedores y dos aplicaciones independientes

- **MySQL:** Base de datos
- **Adminer:** Herramienta para administración de la base de datos
- **Aplicación backend:** app básica con Express JS que hace una consulta a la base de datos.
- **Aplicación frontend:** app básica con NextJS que muestra los datos de la consulta


## Tabla de Contenidos

1. [Instrucciones de instalación](#instrucciones-de-instalación)
2. [Acceso a los servicios](#acceso-a-los-servicios)
3. [Nota importante](#nota-importante)

## Instrucciones de instalación

### Preparación

Dependiendo de la arquitectura de tu procesador (x86 o arm64), hay que descomentar las líneas correspondientes en los ficheros `Dockerfile` y `.env`.

- **Dockerfile**

    ```dockerfile
    # ARG PLATFORM=amd64 # Descomentar para Windows, Linux o Mac con Intel
    # ARG PLATFORM=arm64v8 # Descomentar para Mac con procesador Apple Silicon
    ```

- **.env**

    ```dotenv
    # BUILDPLATFORM=amd64 # Descomentar para Windows, Linux o Mac con Intel
    # BUILDPLATFORM=arm64v8 # Descomentar para Mac con procesador Apple Silicon
    ```

### Pasos de Instalación

1. **Ir** al directorio local donde deseas desplegar el entorno.
2. **Clonar** este repositorio:

    ```bash
    git clone https://github.com/GestoresIOC2023/GestoresCocina.git
    ```
3. **Arrancar la base de datos**
    - Instalar Docker Desktop.
    - Instalar el [plugin de docker](https://code.visualstudio.com/docs/containers/overview) para VScode.
    - Abrir el fichero *compose.yaml*. 
	- Botón derecho -> Compose up.

4. **Entrar en la carpeta backend**
    ```js
    npm install
    npm run dev
    ```

5.  **Entrar en la carpeta frontend**
    ```js
    npm install
    npm run build
    npm start
    ```    


## Acceso a los servicios

Acceder a las siguientes URLs desde el navegador:

- **Adminer**: [http://localhost:8080](http://localhost:8080)
- **front**: [http://localhost:3000](http://localhost:3000)
- **back**: [http://localhost:5001](http://localhost:3000)

### Datos para Adminer

Para acceder a la base de datos mediante **Adminer**, utilizar los siguientes datos:

- **System**: MySQL
- **Server**: host.docker.internal
- **Username**: gestor
- **Password**: ioc
- **Database**: gestores


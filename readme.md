# Prueba Técnica Desarrollador Backend

La prueba consiste en desarrollar una API RESTful de gestión de usuarios utilizando Node.js y
Express.js para la gestión de usuarios.

## Requisitos Previos

Antes de comenzar con la instalación y ejecución del proyecto, asegúrate de tener instalado lo siguiente:

- Node.js 16.14.0
- Cuenta en MongoDB Atlas

## Instalación

Sigue los siguientes pasos para instalar y configurar el proyecto:

1. Clona este repositorio en tu máquina local: `git clone https://github.com/antonygiomarx/test-users-with-auth.git`
2. Ve al directorio del proyecto: `cd test-users-with-auth`
3. Instala las dependencias: `npm install`

## Configuración

Antes de ejecutar el proyecto, asegúrate de configurar los siguientes archivos de configuración:

- Variables de entorno: `.env`

  ```env
  PORT=3000
  MONGO_URI=mongodb+srv://<username>:<password>@<host>/<database>?retryWrites=true&w=majority
  JWT_SECRET=secret
  DB_NAME=users
  DB_COLLECTION=users
  JWT_EXPIRES_IN=30d
  JWT_SECRET=secret
  ```

### Importante:

Reemplaza los valores de las variables de entorno por los valores correspondientes a tu entorno de
desarrollo o el proyecto no funcionará.

## Uso

Para ejecutar el proyecto, sigue los siguientes pasos:

1. Ejecuta el proyecto: `npm run dev`
2. Accede a la aplicación desde tu navegador en: `http://localhost:3000/api/`
3. Registra un usuario en: `http://localhost:3000/api/auth/register`
    - Ejemplo de datos:
      ```json
      {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "123456"
      }
      ```
    - Ejemplo de respuesta:
      ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
      ```

## Funcionalidades Principales

### Autenticación

#### Registro de Usuarios

`POST /api/auth/register`

- Ejemplo de datos:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "123456"
  }
  ```
- Ejemplo de respuesta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Importante

Si no se registra un usuario, no se podrá acceder a las funcionalidades de la API.

#### Inicio de Sesión

`POST /api/auth/login`

- Ejemplo de datos:

  ```json
  {
    "email": "john.doe@example.com",
    "password": "123456"
  }
  ```

- Ejemplo de respuesta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Usuarios

`GET /api/users`

- Ejemplo de respuesta:

```json
[
  {
    "id": "61f0f0f0f0f0f0f0f0f0f0f0",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2022-01-26T00:00:00.000Z",
    "updatedAt": "2022-01-26T00:00:00.000Z"
  }
]
```

`GET /api/users/:id`

- Ejemplo de respuesta:

```json
{
  "id": "61f0f0f0f0f0f0f0f0f0f0f0",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "createdAt": "2022-01-26T00:00:00.000Z",
  "updatedAt": "2022-01-26T00:00:00.000Z"
}
```

`POST /api/users`

- Ejemplo de datos:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "123456",
    "createdAt": "2022-01-26T00:00:00.000Z",
    "updatedAt": "2022-01-26T00:00:00.000Z"
  }
  ```

`PUT /api/users/:id`

- Ejemplo de datos:
  ```json
  {
    "name": "John Doe"
  }
  ```

`DELETE /api/users/:id`


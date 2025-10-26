# Academlo UsersAPI

API REST profesional para operaciones CRUD de usuarios, construida con TypeScript, Node.js, Express, Sequelize y PostgreSQL.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Docker](#docker)
- [Scripts Disponibles](#scripts-disponibles)
- [Licencia](#licencia)

## ✨ Características

- ✅ API RESTful completa con operaciones CRUD
- ✅ TypeScript para tipado seguro
- ✅ Base de datos PostgreSQL con Sequelize ORM
- ✅ Validación de datos
- ✅ Manejo centralizado de errores
- ✅ ESLint y Prettier configurados
- ✅ Estructura de proyecto profesional
- ✅ Docker y Docker Compose incluidos
- ✅ Variables de entorno con dotenv
- ✅ Código y comentarios en inglés

## 🛠️ Tecnologías

- **Node.js** - Entorno de ejecución de JavaScript
- **TypeScript** - Superset tipado de JavaScript
- **Express** - Framework web minimalista
- **Sequelize** - ORM para Node.js
- **PostgreSQL** - Base de datos relacional
- **pg & pg-hstore** - Drivers de PostgreSQL
- **dotenv** - Gestión de variables de entorno
- **ESLint** - Linter para código JavaScript/TypeScript
- **Prettier** - Formateador de código

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior) - [Descargar](https://nodejs.org/)
- **PostgreSQL** (v12 o superior) - [Descargar](https://www.postgresql.org/download/)
- **pnpm** - [Instalar](https://pnpm.io/installation): `npm install -g pnpm`
- **Git** - [Descargar](https://git-scm.com/)

### Opcional (para Docker)

- **Docker** - [Descargar](https://www.docker.com/)
- **Docker Compose** - Viene con Docker Desktop

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/academlo-usersapi.git
cd academlo-usersapi
```

### 2. Instalar dependencias

```bash
pnpm install
```

## ⚙️ Configuración

### 1. Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

### 2. Editar el archivo `.env`

Abre el archivo `.env` y configura tus credenciales de base de datos:

```env
# Environment
NODE_ENV=development

# Server
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=usersdb
DB_USER=postgres
DB_PASSWORD=tu_contraseña_aqui
```

### 3. Crear la base de datos

Abre PostgreSQL y crea la base de datos:

```sql
CREATE DATABASE usersdb;
```

O desde la terminal:

```bash
psql -U postgres -c "CREATE DATABASE usersdb;"
```

## 🏃 Ejecución

### Modo Desarrollo

Ejecuta el servidor en modo desarrollo con recarga automática:

```bash
pnpm dev
```

El servidor estará disponible en `http://localhost:3000`

### Modo Producción

1. Compila el código TypeScript:

```bash
pnpm build
```

2. Inicia el servidor:

```bash
pnpm start
```

### Verificar que funciona

Abre tu navegador y visita:

- `http://localhost:3000` - Mensaje de bienvenida
- `http://localhost:3000/api/v1/health` - Estado de salud de la API

## 📁 Estructura del Proyecto

```
academlo-usersapi/
├── src/
│   ├── config/
│   │   ├── database.ts          # Configuración de Sequelize
│   │   └── index.ts             # Configuración general
│   ├── controllers/
│   │   └── user.controller.ts   # Controladores de usuarios
│   ├── middleware/
│   │   ├── error.middleware.ts  # Manejo de errores
│   │   └── validation.middleware.ts  # Validación de datos
│   ├── models/
│   │   ├── user.model.ts        # Modelo de usuario
│   │   └── index.ts             # Export de modelos
│   ├── routes/
│   │   ├── user.routes.ts       # Rutas de usuarios
│   │   └── index.ts             # Rutas principales
│   ├── app.ts                   # Configuración de Express
│   └── server.ts                # Punto de entrada
├── .env.example                 # Ejemplo de variables de entorno
├── .eslintrc.json              # Configuración de ESLint
├── .prettierrc                 # Configuración de Prettier
├── .gitignore                  # Archivos ignorados por Git
├── docker-compose.yml          # Configuración de Docker Compose
├── Dockerfile                  # Configuración de Docker
├── LICENSE                     # Licencia Apache 2.0
├── package.json                # Dependencias y scripts
├── tsconfig.json               # Configuración de TypeScript
└── README.md                   # Este archivo
```

## 🔌 API Endpoints

### Base URL

```
http://localhost:3000/api/v1
```

### User Model

| Field     | Type   | Description                        | Required |
| --------- | ------ | ---------------------------------- | -------- |
| id        | number | Unique user identifier             | Auto     |
| firstName | string | User's first name                  | Yes      |
| lastName  | string | User's last name                   | Yes      |
| email     | string | User's email (unique)              | Yes      |
| password  | string | User's password (min 8 characters) | Yes      |
| birthday  | date   | User's birth date (YYYY-MM-DD)     | Yes      |
| createdAt | date   | Record creation timestamp          | Auto     |
| updatedAt | date   | Record last update timestamp       | Auto     |

> **Security Note:** The `password` field is never returned in API responses for security reasons.

---

### Available Endpoints

#### 1. Get all users

```http
GET /api/v1/users
```

**Description:** Retrieves a complete list of all registered users in the database. The response includes all model fields except the password. Users are automatically sorted by ID in ascending order.

**Parameters:** None

**Successful response (200):**

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "birthday": "1992-05-03",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": 2,
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane@example.com",
      "birthday": "1995-08-15",
      "createdAt": "2024-01-02T00:00:00.000Z",
      "updatedAt": "2024-01-02T00:00:00.000Z"
    }
  ],
  "count": 2
}
```

**Possible errors:**

- `500` - Database connection error or error retrieving users

---

#### 2. Get user by ID

```http
GET /api/v1/users/:id
```

**Description:** Retrieves detailed information about a specific user using their unique identifier. Useful for getting complete user data when you only know their ID. The password is not included in the response for security.

**URL Parameters:**

- `id` (number, required) - Unique user identifier

**Request example:**

```http
GET /api/v1/users/1
```

**Successful response (200):**

```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "birthday": "1992-05-03",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Possible errors:**

- `404` - User not found with the specified ID
- `500` - Database connection error

---

#### 3. Create a new user

```http
POST /api/v1/users
```

**Description:** Creates a new user record in the database. Validates that all required fields are present and that the email format is correct. Verifies that no other user exists with the same email before creating the record. Password must be at least 8 characters long.

**Headers:**

```
Content-Type: application/json
```

**Body (JSON):**

```json
{
  "firstName": "Michael",
  "lastName": "Johnson",
  "email": "michael@example.com",
  "password": "securepass123",
  "birthday": "1990-12-25"
}
```

**Validations:**

- `firstName` - Required, non-empty string
- `lastName` - Required, non-empty string
- `email` - Required, valid email format, must be unique
- `password` - Required, minimum 8 characters
- `birthday` - Required, valid date format (YYYY-MM-DD)

**Successful response (201):**

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 3,
    "firstName": "Michael",
    "lastName": "Johnson",
    "email": "michael@example.com",
    "birthday": "1990-12-25",
    "createdAt": "2024-01-03T00:00:00.000Z",
    "updatedAt": "2024-01-03T00:00:00.000Z"
  }
}
```

**Possible errors:**

- `400` - Invalid validation data or email already exists
- `500` - Error creating user in database

---

#### 4. Update user

```http
PUT /api/v1/users/:id
```

**Description:** Updates information for an existing user. You can update one or several fields at once. Only fields sent in the body will be updated, the rest will remain unchanged. If you try to change the email, it will be verified that it's not in use by another user.

**URL Parameters:**

- `id` (number, required) - User identifier to update

**Headers:**

```
Content-Type: application/json
```

**Body (JSON):** All fields are optional

```json
{
  "firstName": "Michael Andrew",
  "lastName": "Johnson Smith",
  "email": "michael.johnson@example.com",
  "password": "newpassword123",
  "birthday": "1990-12-25"
}
```

**Partial update example:**

```json
{
  "firstName": "Michael Andrew",
  "email": "michael.new@example.com"
}
```

**Validations:**

- `email` - If sent, must have valid format and not be in use
- `password` - If sent, must have minimum 8 characters
- `birthday` - If sent, must have valid date format

**Successful response (200):**

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 3,
    "firstName": "Michael Andrew",
    "lastName": "Johnson Smith",
    "email": "michael.johnson@example.com",
    "birthday": "1990-12-25",
    "createdAt": "2024-01-03T00:00:00.000Z",
    "updatedAt": "2024-01-04T10:30:00.000Z"
  }
}
```

**Possible errors:**

- `400` - Invalid validation data or email already exists
- `404` - User not found with specified ID
- `500` - Error updating user

---

#### 5. Delete user

```http
DELETE /api/v1/users/:id
```

**Description:** Permanently deletes a user from the database. This operation cannot be undone. Useful for deactivating users or complying with data deletion policies. First verifies that the user exists before attempting to delete them.

**URL Parameters:**

- `id` (number, required) - User identifier to delete

**Request example:**

```http
DELETE /api/v1/users/3
```

**Successful response (200):**

```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {
    "id": 3
  }
}
```

**Possible errors:**

- `404` - User not found with specified ID
- `500` - Error deleting user from database

---

#### 6. Health Check

```http
GET /api/v1/health
```

**Description:** Server status verification endpoint. Useful for monitoring, load balancers, and verifying that the API is responding correctly. Returns a current timestamp and confirmation message.

**Parameters:** None

**Successful response (200):**

```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2024-01-04T15:30:00.000Z"
}
```

---

### HTTP Status Codes

| Code | Meaning               | Description                       |
| ---- | --------------------- | --------------------------------- |
| 200  | OK                    | Request completed successfully    |
| 201  | Created               | Resource was created successfully |
| 400  | Bad Request           | Invalid or incomplete data sent   |
| 404  | Not Found             | Requested resource does not exist |
| 500  | Internal Server Error | Server or database error          |

---

### 💡 Usage Examples with cURL

#### Get all users

```bash
curl -X GET http://localhost:3000/api/v1/users
```

#### Create a user

```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Emma",
    "lastName": "Wilson",
    "email": "emma@example.com",
    "password": "password123",
    "birthday": "1998-03-20"
  }'
```

#### Update a user

```bash
curl -X PUT http://localhost:3000/api/v1/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Emma Rose",
    "lastName": "Wilson Brown"
  }'
```

#### Delete a user

```bash
curl -X DELETE http://localhost:3000/api/v1/users/1
```

## 🐳 Docker

### Opción 1: Docker Compose (Recomendado)

Ejecuta la aplicación junto con PostgreSQL:

```bash
docker-compose up -d
```

Esto iniciará:

- API en `http://localhost:3000`
- PostgreSQL en `localhost:5432`

Para detener los contenedores:

```bash
docker-compose down
```

### Opción 2: Solo Docker

Construir la imagen:

```bash
docker build -t academlo-usersapi .
```

Ejecutar el contenedor:

```bash
docker run -p 3000:3000 --env-file .env academlo-usersapi
```

## 📜 Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `pnpm dev`

Inicia el servidor en modo desarrollo con recarga automática usando `ts-node-dev`.

### `pnpm build`

Compila el código TypeScript a JavaScript en la carpeta `dist/`.

### `pnpm start`

Ejecuta el servidor en modo producción usando el código compilado.

### `pnpm lint`

Ejecuta ESLint para verificar errores en el código.

### `pnpm lint:fix`

Ejecuta ESLint y corrige automáticamente los errores que se puedan arreglar.

### `pnpm format`

Formatea todo el código usando Prettier.

### `pnpm format:check`

Verifica si el código está formateado correctamente sin hacer cambios.

## 🧪 Pruebas con Postman / Thunder Client

### Importar colección

Puedes probar la API usando cualquier cliente HTTP. Aquí hay algunos ejemplos de uso:

1. **GET** `http://localhost:3000/api/v1/users` - Get all users
2. **POST** `http://localhost:3000/api/v1/users` - Create user
   ```json
   {
     "firstName": "Sarah",
     "lastName": "Connor",
     "email": "sarah@example.com",
     "password": "password123",
     "birthday": "1995-08-15"
   }
   ```
3. **GET** `http://localhost:3000/api/v1/users/1` - Get user by ID
4. **PUT** `http://localhost:3000/api/v1/users/1` - Update user
5. **DELETE** `http://localhost:3000/api/v1/users/1` - Delete user

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Buenas Prácticas Implementadas

- ✅ Código y comentarios en inglés
- ✅ Tipado estricto con TypeScript
- ✅ Estructura modular y escalable
- ✅ Manejo centralizado de errores
- ✅ Validación de datos de entrada
- ✅ Variables de entorno para configuración
- ✅ Código limpio y legible
- ✅ Convenciones de nomenclatura consistentes
- ✅ Configuración de linting y formateo
- ✅ Documentación completa

## 📄 Licencia

Este proyecto está bajo la Licencia Apache 2.0. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

Proyecto desarrollado como parte de un proyecto universitario para Academlo.

---

**¿Necesitas ayuda?** Abre un issue en el repositorio o contacta al equipo de desarrollo.

¡Feliz codificación! 🚀

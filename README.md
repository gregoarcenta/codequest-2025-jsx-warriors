# 🚀 DevTalles Blog - CodeQuest 2025

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌐 Demo y Visión General

¡Bienvenido al blog de DevTalles! Este proyecto es nuestra entrada para el **CodeQuest 2025**. El objetivo es
crear una plataforma de blog moderna y funcional para la comunidad de DevTalles. Puedes ver una demostración en vivo de
nuestra aplicación en el siguiente enlace:

👉 **[Ir a la demo en vivo](https://blog-devtalles.jspadev.com)**

---

## 🛠️ Tecnologías Utilizadas

Este proyecto se ha desarrollado con un enfoque **Full-Stack**, utilizando las siguientes tecnologías:

### **Frontend**

* **Next.js**: Framework de React para el lado del servidor y generación de sitios estáticos.
* **Tailwind CSS**: Framework CSS para un desarrollo rápido y diseño responsivo.
* **shadcn/ui**: Componentes de UI personalizables y accesibles.

### **Backend**

* **NestJS**: Framework de Node.js robusto y escalable.
* **PostgreSQL**: Base de datos relacional para la persistencia de datos.

---

## 📦 Estructura del Proyecto

La aplicación se organiza en dos directorios principales: `frontend` y `backend`.

```
/devtalles-blog
├── /backend/
│   ├── /src/          # Código fuente del backend
│   └── .env           # Variables de entorno
├── /frontend/
│   ├── /app/          # Páginas y rutas de Next.js
│   ├── /components/   # Componentes de React
│   └── tailwind.config.js
├── docker-compose.yml     # Docker Compose para desarrollo
└── docker-compose.prod.yml# Docker Compose para producción
```

---

## 💻 Guía de Instalación y Ejecución

Para ejecutar el proyecto, te ofrecemos dos opciones: un modo de producción optimizado para demostraciones rápidas, y un
modo de desarrollo para trabajar en el código.

---

### **1. Requisitos Previos**

Asegúrate de tener **Docker** y **Docker Compose** instalados en tu sistema. Estos son necesarios para ejecutar los
contenedores de la aplicación.

---

### **2. Preparar el Repositorio**

1. **Clonar el repositorio:**
   ```sh
   git clone https://github.com/gregoarcenta/codequest-2025-jsx-warriors.git
   ```
2. **Navegar al directorio del proyecto:**
   ```sh
   cd codequest-2025-jsx-warriors
   ```

---

### **3. Configuración de Entorno**

Este proyecto utiliza variables de entorno para su configuración. Para el backend, necesitarás crear y configurar un
archivo `.env`.

1. **Crear el archivo `.env`:**
   Copia el archivo de ejemplo proporcionado para crear tu archivo de configuración.
    ```sh
    cp backend/.env.example backend/.env
    ```
2. **Configurar tus variables:**
   Abre el archivo `backend/.env` que acabas de crear y edita las variables de entorno necesarias (por ejemplo,
   credenciales de base de datos, claves de API, etc.) para que la aplicación funcione correctamente.

### ⚙️ Variables de Entorno Requeridas

Este proyecto utiliza variables de entorno para su configuración. Si estas variables no se configuran correctamente, la
aplicación podría no funcionar.

A continuación, se detalla el propósito de cada variable y cómo obtener los valores necesarios.

| Variable                                                                  | Descripción                                                        | Notas y Referencias                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|:--------------------------------------------------------------------------|:-------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `NODE_ENV`                                                                | Define el entorno de la aplicación.                                | **`development`** para desarrollo.<br>**`production`** para despliegue.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `DB_HOST`                                                                 | Host de la base de datos.                                          | **Crucial para la conexión.** <br> • Usa **`localhost`** en el modo de desarrollo.<br>• Usa **`postgresdb`** en el modo de producción.                                                                                                                                                                                                                                                                                                                                                                                         |
| `DB_PORT`<br> `POSTGRES_USER`<br> `POSTGRES_PASSWORD`<br> `POSTGRES_DB`   | Credenciales de conexión a la base de datos PostgreSQL.            | Estos valores se definen en el archivo `.env` y son leídos por Docker Compose para configurar el contenedor de la base de datos.                                                                                                                                                                                                                                                                                                                                                                                               |
| `JWT_SECRET`                                                              | Clave secreta para firmar y verificar tokens de autenticación JWT. | Crea una cadena de texto larga y aleatoria.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `FRONTEND_URL`                                                            | URL del frontend para la configuración de CORS.                    | En desarrollo, usa **`http://localhost:3001`**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `APP_NAME`                                                                | Nombre de la aplicación.                                           | Nombre visible, como en los correos electrónicos.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `DISCORD_CLIENT_ID`<br>`DISCORD_CLIENT_SECRET`                            | Claves de la API de Discord para autenticación social.             | <br> Para que el login funcione, ve al **[Discord Developer Portal](https://discord.com/developers/applications)**, selecciona tu aplicación y navega a la pestaña **`OAuth2`**. Dentro de la sub-pestaña **`Redirects`**, añade el siguiente URL: `http://localhost:3000/api/auth/discord/callback`. <br> **Nota:** Esta URL es un **endpoint** del backend. Discord envía el código de autorización a este endpoint para que tu servidor lo procese y complete la autenticación. Es vital que esta URL coincida exactamente. |
| `CLOUDINARY_NAME`<br>`CLOUDINARY_API_KEY`<br>`CLOUDINARY_API_SECRET`      | Credenciales de Cloudinary para la gestión de imágenes.            | <br> En el panel de control de tu cuenta de **[Cloudinary](https://cloudinary.com/console/dashboard)**, encontrarás el "Cloud name", la "API Key" y el "API Secret".                                                                                                                                                                                                                                                                                                                                                           |
| `SMTP_HOST`<br>`SMTP_PORT`<br>`SMTP_USER`<br>`SMTP_PASS`<br>`SMTP_SECURE` | Configuración para el envío de correos electrónicos.               | Si usas Gmail, `SMTP_USER` es tu correo. Para `SMTP_PASS`, necesitas una "Contraseña de aplicación" de Google. <br> Sigue este [**enlace de ayuda de Google**](https://support.google.com/accounts/answer/185833) para generarla.                                                                                                                                                                                                                                                                                              |
| `SUPPORT_EMAIL`                                                           | Correo de soporte para notificaciones.                             | Usa un correo de la misma cuenta de `SMTP_USER`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

### **Recomendación para la ejecución del proyecto**

> Para una evaluación rápida y exitosa del proyecto, es **obligatorio** que la variable `NODE_ENV` en el archivo `.env`
> se establezca en **`development`**.
>
> **Razones principales:**
>
> 1. **Datos precargados:** El modo de desarrollo inicializa la base de datos automáticamente con información de
     prueba (usuarios, posts, etc.). Esto permite una exploración inmediata sin la necesidad de crear contenido.
>
> 2. **Compatibilidad local:** El `docker-compose.yml` que se usa en el modo de producción local no tiene soporte para
     SSL. En el modo de `development`, la aplicación no espera una conexión segura, por lo que no habrá errores de
     conexión.
>
> **Consideraciones sobre Producción:**
>
> El modo de producción no incluye datos precargados. Si se decide probar este modo, deberá ejecutar las migraciones
> manualmente para crear la estructura de la base de datos. Además, el primer usuario que se registre será
> automáticamente asignado como `admin`
>
> Los comandos para ello son:
>
> ```sh
> # Primero, compila el código
> npm run build
>
> # Luego, ejecuta las migraciones
> npx typeorm migration:run -d dist/config/typeorm.config.js
> ```
>
> Insistimos en el modo de desarrollo, ya que garantiza que el proyecto funcione sin contratiempos, permitiendo una
> experiencia de prueba fluida y completa.

---

### **4. Modo de Producción Local**

Este modo levanta la aplicación completa utilizando imágenes de Docker ya construidas, ideal para una demostración sin
necesidad de configuración adicional.

1. **Levantar los servicios:**
   ```sh
   docker compose -f docker-compose.prod.yml up --build -d
   ```
2. **Verificar el estado de los servicios:**
   ```sh
   docker compose -f docker-compose.prod.yml ps
   ```
3. **Acceder a la aplicación:**
    * **Aplicación Frontend:** `http://localhost:3001`
    * **API del Backend:** `http://localhost:3000`
    * **Documentación de Swagger:** `http://localhost:3000/api`


4. **Detener la Aplicación:**

```sh
  docker compose -f docker-compose.prod.yml down
```

---

### **5. Modo de Desarrollo**

Este modo está diseñado para un flujo de trabajo de desarrollo, permitiendo modificaciones en el código fuente con un
ciclo de retroalimentación rápido.

---

1. **Levantar la Base de Datos**

```sh
  docker compose up --build -d
```

2. **Ejecutar el backend:**
   ```sh
   cd backend
   npm install
   npm run start:dev
   ```
3. **Ejecutar el frontend:**
   ```sh
   cd ../frontend
   npm install
   npm run dev
   ```
5. **Acceder a la aplicación:**
    * **Aplicación Frontend:** `http://localhost:3001`
    * **API del Backend:** `http://localhost:3000`
    * **Documentación de Swagger:** `http://localhost:3000/api`

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Para más detalles, consulta el archivo `LICENSE`.
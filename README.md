# 🚀 DevTalles Blog - CodeQuest 2025

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌐 Demo y Visión General

¡Bienvenido al blog de DevTalles! Este proyecto es nuestra entrada para el concurso **CodeQuest 2025**. El objetivo es
crear una plataforma de blog moderna y funcional para la comunidad de DevTalles. Puedes ver una demostración en vivo de
nuestra aplicación en el siguiente enlace:

👉 **[Ir a la demo en vivo](https://devtalles-blog-frontend.vercel.app/)**

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

### **Modo de Producción**

Este modo levanta la aplicación completa utilizando imágenes de Docker ya construidas, ideal para una demostración sin
necesidad de configuración adicional.

1. **Clonar el repositorio**
   ```sh
   git clone https://github.com/gregoarcenta/codequest-2025-jsx-warriors.git
   
   ```
   Una vez que la clonación haya finalizado, navega al directorio del proyecto:
   ```sh
   cd codequest-2025-jsx-warriors
    ```
2. **Configurar las variables de entorno**

   Este proyecto utiliza variables de entorno para su configuración. Para el backend, necesitarás crear un archivo
   ```.env``` a partir del archivo de ejemplo proporcionado ```.env.example```. Esto es crucial para que la aplicación
   funcione correctamente.

    ```sh
   cp backend/.env.example backend/.env
   ```

3. **Ejecutar la aplicación completa**

   Para ejecutar la aplicación con todos sus servicios (backend, frontend, base de datos, etc.), usaremos Docker
   Compose. Esto simplificará el proceso al levantar todos los contenedores de forma simultánea. Ejecuta el siguiente
   comando para construir las imágenes y levantar los servicios en modo detached
   ```sh
   docker compose -f docker-compose.prod.yml up --build -d
   ```

### **Modo de Desarrollo**

Este modo está diseñado para un flujo de trabajo de desarrollo, permitiendo modificaciones en el código fuente.

1. **Prerrequisitos**: Asegúrate de tener **Docker** y **Docker Compose** instalados.

2. **Clonar el repositorio**
   ```sh
   git clone [https://github.com/tu-usuario/nombre-del-repo.git](https://github.com/tu-usuario/nombre-del-repo.git)
   cd nombre-del-repo
   ```

3. **Configurar las variables de entorno**
   ```sh
   cp backend/.env.example backend/.env
   ```
   > **Importante**: En el archivo `.env` del backend, la variable `DB_HOST` debe ser **`postgresdb`** para que la
   conexión a la base de datos funcione dentro de la red de Docker.

4. **Levantar el backend y la base de datos**
   ```sh
   docker compose --profile backend up --build -d
   ```

5. **Ejecutar el frontend**
   ```sh
   cd frontend
   npm install
   npm run dev
   ```

---

## 📜 URLs de la Aplicación

Una vez que la aplicación esté en ejecución, podrás acceder a los siguientes servicios:

* **Frontend**: `http://localhost:3001`
* **Backend**: `http://localhost:3000`
* **Documentación de la API (Swagger)**: `http://localhost:3000/api`

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Para más detalles, consulta el archivo `LICENSE`.
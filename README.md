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
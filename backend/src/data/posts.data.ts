// Usa esta constante para la relación con los likes. Los posts sin likes tendrán una lista vacía.
import { Post } from '../posts/entities/post.entity';
import { PostStatus } from '../posts/enums/post-status';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';

export const POST_DATA: Partial<Post>[] = [
  {
    id: '1e34c9c1-420b-4f51-a20c-83b65a5a1e2b',
    title: 'Guía de NestJS para principiantes',
    slug: 'guia-de-nestjs-para-principiantes',
    content:
      '<h1>Introducción a NestJS</h1><p>NestJS es un framework para construir aplicaciones eficientes y escalables del lado del servidor. Está construido con TypeScript y utiliza una arquitectura inspirada en Angular.</p><h2>Conceptos Clave</h2><ul><li>Módulos: Organizan la estructura de tu aplicación.</li><li>Controladores: Manejan las peticiones entrantes y devuelven respuestas.</li><li>Servicios: Contienen la lógica de negocio de la aplicación.</li><li>Inyección de Dependencias: Permite que las clases dependan de otras sin instanciarlas directamente.</li></ul><p>Este framework es ideal para la creación de APIs REST y aplicaciones de microservicios.</p>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758621702/posts/Gemini_Generated_Image_3o3a0n3o3a0n3o3a_dryvul.png',
    status: PostStatus.PUBLISHED,
    isFeatured: true,
    viewsCount: 150,
    publishedAt: new Date('2024-09-19T10:00:00Z'),
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    category: { id: 'ba59da87-c94d-4925-9484-cd4ad57dd08b' } as Category,
  },
  {
    id: '2a5b6d7f-8e9a-4c2d-9b0e-1f2a3b4c5d6f',
    title: 'Las 5 mejores librerías de React para el 2025',
    slug: 'las-5-mejores-librerias-de-react-para-el-2025',
    content:
      '<h1>Top 5 de librerías para React</h1><p>A medida que React continúa evolucionando, el ecosistema de librerías a su alrededor también lo hace. Aquí te presentamos las 5 librerías más útiles y populares que deberías considerar para tus proyectos en el 2025.</p><h2>1. Zustand</h2><p>Zustand es una librería de gestión de estado pequeña, rápida y escalable. A diferencia de Redux, es mucho más sencilla de configurar y usar, lo que la hace ideal para proyectos de todos los tamaños.</p><h3>2. React Query</h3><p>Para la gestión de datos asíncronos y el cacheo, React Query se ha convertido en el estándar de la industria. Simplifica enormemente la obtención, el almacenamiento en caché, la sincronización y la actualización de datos.</p>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758621702/posts/Gemini_Generated_Image_7w0e7b7w0e7b7w0e_kv4soq.png',
    status: PostStatus.PUBLISHED,
    isFeatured: true,
    viewsCount: 500,
    publishedAt: new Date('2024-09-18T12:30:00Z'),
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    category: { id: '9118d1bc-63cd-4099-8ed6-9c16bed9baf6' } as Category,
  },
  {
    id: '3c8e5f9d-1b2c-4e8a-8c1d-2b3a4c5d6e7f',
    title: 'Cómo construir una API RESTful con Python y FastAPI',
    slug: 'como-construir-una-api-restful-con-python-y-fastapi',
    content:
      '<h1>Construyendo una API con FastAPI</h1><p>FastAPI es un framework web de alto rendimiento para construir APIs con Python 3.7+ basado en tipado estándar. Es conocido por su velocidad, su código moderno y su documentación automática.</p><h2>Primeros pasos con FastAPI</h2><p>Para empezar, necesitas instalar FastAPI y uvicorn. Luego, puedes crear tu primera API en un archivo `main.py`.</p><code>from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\nasync def root():\n    return {"message": "Hello World"}</code>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758622200/posts/Gemini_Generated_Image_ygfoliygfoliygfo_m72fxb.png',
    status: PostStatus.PUBLISHED,
    isFeatured: true,
    viewsCount: 80,
    publishedAt: new Date('2024-09-17T09:15:00Z'),
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    category: { id: 'ba59da87-c94d-4925-9484-cd4ad57dd08b' } as Category,
  },
  {
    id: '4d1f2e8c-5a6b-4d7e-9c2b-8a9b0c1d2e3f',
    title: 'Flutter vs React Native: ¿Cuál elegir en el 2025?',
    slug: 'flutter-vs-react-native-cual-elegir-en-el-2025',
    content:
      '<h1>Flutter vs React Native</h1><p>La elección entre Flutter y React Native es una de las decisiones más importantes en el desarrollo móvil multiplataforma. Ambos frameworks tienen sus fortalezas y debilidades, y la mejor opción depende del proyecto.</p><h2>Flutter</h2><p>Flutter, desarrollado por Google, usa el lenguaje Dart y renderiza sus propios widgets. Esto le da un rendimiento casi nativo y una consistencia visual sin igual entre plataformas.</p><h2>React Native</h2><p>React Native, de Facebook, usa JavaScript y compila a componentes nativos. Su principal ventaja es que permite a los desarrolladores web reutilizar sus conocimientos de React para construir aplicaciones móviles.</p>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758622199/posts/Gemini_Generated_Image_qsbxvfqsbxvfqsbx_of0wxl.png',
    status: PostStatus.PUBLISHED,
    isFeatured: true,
    viewsCount: 250,
    publishedAt: new Date('2024-09-16T15:45:00Z'),
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    category: { id: 'f1c471ec-1f3e-4291-b99f-7bc9f6fd77ad' } as Category,
  },
  {
    id: '5e3a7c8b-6d9f-4b0e-8c2d-9a1f2b3c4d5e',
    title: 'Introducción a la Inteligencia Artificial Generativa',
    slug: 'introduccion-a-la-inteligencia-artificial-generativa',
    content:
      '<h1>IA Generativa: Qué es y cómo funciona</h1><p>La IA generativa es una rama de la inteligencia artificial que se centra en la creación de nuevo contenido, como texto, imágenes, música y videos. Modelos como ChatGPT y DALL-E 2 son ejemplos populares de esta tecnología.</p><h2>Aplicaciones de la IA Generativa</h2><p><ul><li>Creación de arte digital y diseño.</li><li>Generación de código y asistencia a programadores.</li><li>Redacción de textos y guiones.</li><li>Diseño de medicamentos y materiales.</li></ul></p>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758622346/posts/Gemini_Generated_Image_5dqxnq5dqxnq5dqx_wq7qab.png',
    status: PostStatus.PUBLISHED,
    isFeatured: true,
    viewsCount: 600,
    publishedAt: new Date('2024-09-15T11:00:00Z'),
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    category: { id: '8873be61-cfa7-48bb-9d4d-db6036706755' } as Category,
  },
  {
    id: '6a4b5c7d-8e9f-4c1d-9b2e-0f3a4b5c6d7e',
    title: 'Guía práctica para iniciar con Docker y Kubernetes',
    slug: 'guia-practica-para-iniciar-con-docker-y-kubernetes',
    content:
      '<h1>Dominando Docker y Kubernetes</h1><p>Docker y Kubernetes son las dos herramientas más importantes en el mundo de DevOps para la gestión de contenedores. Mientras Docker se enfoca en la empaquetación de aplicaciones, Kubernetes se encarga de orquestar esos contenedores a gran escala.</p><h2>Primeros pasos con Docker</h2><p>Para empezar con Docker, solo necesitas instalarlo y crear tu primer `Dockerfile`. Luego, puedes construir una imagen y ejecutar un contenedor.</p><code>FROM node:18-alpine\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD ["npm", "start"]</code>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758622345/posts/Gemini_Generated_Image_qsac5zqsac5zqsac_krvepj.png',
    status: PostStatus.PUBLISHED,
    isFeatured: true,
    viewsCount: 320,
    publishedAt: new Date('2024-09-14T17:20:00Z'),
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    category: { id: '54c3c359-bfec-46bf-b3ad-aa5c58622b9c' } as Category,
  },
  {
    id: '7b5c8d9e-1f2a-4d3c-9a4b-5c6d7e8f9a0b',
    title: 'Los beneficios de usar TypeScript en tus proyectos de JavaScript',
    slug: 'los-beneficios-de-usar-typescript-en-tus-proyectos-de-javascript',
    content:
      '<h1>Por qué usar TypeScript</h1><p>TypeScript es un superconjunto tipado de JavaScript que se compila a JavaScript plano. Sus principales beneficios son la detección de errores en tiempo de compilación y una mejor legibilidad del código, lo que es crucial para proyectos grandes.</p><h2>Principales Ventajas</h2><ul><li>**Tipado Estático:** Previene errores comunes de tipo.</li><li>**Mejor Autocompletado:** Mejora la experiencia de desarrollo.</li><li>**Refactorización Segura:** Facilita la modificación del código sin romperlo.</li><li>**Clases e Interfaces:** Permite una arquitectura más sólida.</li></ul>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758622452/posts/Gemini_Generated_Image_yj4wm1yj4wm1yj4w_rx8ljo.png',
    status: PostStatus.PUBLISHED,
    isFeatured: false,
    viewsCount: 950,
    publishedAt: new Date('2024-09-13T08:40:00Z'),
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    category: { id: '9118d1bc-63cd-4099-8ed6-9c16bed9baf6' } as Category,
  },
  {
    id: '8a6d9e0f-1b2c-4d3e-8c4f-5a6b7c8d9e0f',
    title: 'Backend As a Service (BaaS): ¿Es la solución para tu proyecto?',
    slug: 'backend-as-a-service-es-la-solucion-para-tu-proyecto',
    content:
      '<h1>BaaS: ¿Qué es y cuándo usarlo?</h1><p>Backend as a Service (BaaS) es un modelo de servicio en la nube que automatiza la gestión del backend de tu aplicación. Te proporciona funcionalidades listas para usar como autenticación, bases de datos y almacenamiento en la nube, lo que te permite enfocarte en el frontend.</p><h2>Ventajas y Desventajas</h2><p>**Ventajas:** Rápido desarrollo, menos código de backend, ideal para prototipos. **Desventajas:** Menos control, dependencia del proveedor, posibles limitaciones de personalización.</p>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758622451/posts/Gemini_Generated_Image_as4r4ras4r4ras4r_a5dr1d.png',
    status: PostStatus.PUBLISHED,
    isFeatured: false,
    viewsCount: 180,
    publishedAt: new Date('2024-09-12T14:10:00Z'),
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    category: { id: 'ba59da87-c94d-4925-9484-cd4ad57dd08b' } as Category,
  },
  {
    id: '9c7e0f1a-2b3c-4d4e-8c5d-6e7f8a9b0c1d',
    title: 'Desarrollo de Apps Nativas con Swift y Kotlin',
    slug: 'desarrollo-de-apps-nativas-con-swift-y-kotlin',
    content:
      '<h1>Desarrollo Nativo en 2025</h1><p>Aunque el desarrollo multiplataforma ha ganado popularidad, las aplicaciones nativas siguen siendo la opción preferida para proyectos que requieren el máximo rendimiento y acceso a las APIs más recientes de cada sistema operativo (iOS y Android).</p><h2>Swift para iOS</h2><p>Swift es el lenguaje moderno de Apple para el desarrollo en su ecosistema. Ofrece un rendimiento excepcional y una sintaxis limpia y segura.</p><h2>Kotlin para Android</h2><p>Kotlin se ha convertido en el lenguaje oficial para el desarrollo en Android, ofreciendo un mejor manejo de nulos y una sintaxis más concisa que Java.</p>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758622559/posts/Gemini_Generated_Image_7vb17p7vb17p7vb1_z8xupu.png',
    status: PostStatus.PUBLISHED,
    isFeatured: false,
    viewsCount: 420,
    publishedAt: new Date('2024-09-11T16:50:00Z'),
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    category: { id: 'f1c471ec-1f3e-4291-b99f-7bc9f6fd77ad' } as Category,
  },
  {
    id: '0d8f1e2a-3b4c-4d5e-9c6f-7d8e9f0a1b2c',
    title: 'Machine Learning para principiantes: Tu primer modelo',
    slug: 'machine-learning-para-principiantes-tu-primer-modelo',
    content:
      '<h1>Tu primer modelo de ML</h1><p>El Machine Learning (ML) es una rama de la IA que se enfoca en el desarrollo de algoritmos que aprenden de los datos. Para tu primer modelo, puedes usar la librería Scikit-learn de Python. Es simple, eficiente y muy popular.</p><h2>Pasos para crear un modelo de regresión</h2><p><ol><li>Importa los datos.</li><li>Divide los datos en entrenamiento y prueba.</li><li>Elige un modelo (e.g., Regresión Lineal).</li><li>Entrena el modelo con los datos de entrenamiento.</li><li>Evalúa el rendimiento con los datos de prueba.</li></ol></p>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758622557/posts/Gemini_Generated_Image_q0kykhq0kykhq0ky_enmy6r.png',
    status: PostStatus.PUBLISHED,
    isFeatured: false,
    viewsCount: 710,
    publishedAt: new Date('2024-09-10T11:25:00Z'),
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    category: { id: '8873be61-cfa7-48bb-9d4d-db6036706755' } as Category,
  },
  {
    id: '1e9a2b3c-4d5e-4f6a-9b7c-8d9e0f1a2b3c',
    title: 'CI/CD: Automatiza tu despliegue con GitHub Actions',
    slug: 'ci-cd-automatiza-tu-despliegue-con-github-actions',
    content:
      '<h1>Automatizando con GitHub Actions</h1><p>CI/CD (Integración y Despliegue Continuo) es una práctica de DevOps que automatiza el proceso de construcción, prueba y despliegue de software. GitHub Actions es una de las herramientas más populares para implementar CI/CD directamente en tu repositorio de GitHub.</p><h2>Workflow Básico</h2><p>Un workflow de GitHub Actions se define en un archivo YAML. Por ejemplo, un workflow para Node.js puede lucir así:</p><code>name: Node.js CI\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Use Node.js\n        uses: actions/setup-node@v3\n        with:\n          node-version: "18.x"\n      - run: npm ci\n      - run: npm test</code>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758622723/posts/Gemini_Generated_Image_wxwbcewxwbcewxwb_aebdke.png',
    status: PostStatus.PUBLISHED,
    isFeatured: false,
    viewsCount: 880,
    publishedAt: new Date('2024-09-09T09:00:00Z'),
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    category: { id: '54c3c359-bfec-46bf-b3ad-aa5c58622b9c' } as Category,
  },
  {
    id: '2f0b3c4d-5e6f-4a7b-8c8d-9e9f0a1b2c3d',
    title: 'Cómo usar CSS-in-JS con Styled Components',
    slug: 'como-usar-css-in-js-con-styled-components',
    content:
      '<h1>Styling con Styled Components</h1><p>Styled Components es una de las librerías más populares para escribir CSS-in-JS. Permite crear componentes de React que tienen estilos adjuntos, lo que mejora la reutilización del código y previene conflictos de nombres de clases.</p><h2>Beneficios</h2><ul><li>**Sin conflictos de clases:** Los estilos son únicos para cada componente.</li><li>**Lógica de estilo dinámica:** Puedes usar props para cambiar estilos.</li><li>**Fácil de depurar:** Los nombres de las clases son generados automáticamente y son legibles.</li></ul>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758622721/posts/Gemini_Generated_Image_h5zb2yh5zb2yh5zb_pvtpov.png',
    status: PostStatus.PUBLISHED,
    isFeatured: false,
    viewsCount: 45,
    publishedAt: new Date('2024-09-08T13:30:00Z'),
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    category: { id: '9118d1bc-63cd-4099-8ed6-9c16bed9baf6' } as Category,
  },
  {
    id: '3a1c4d5e-6f7a-4b8c-9d9e-0f1a2b3c4d5e',
    title: 'Microservicios con NestJS y RabbitMQ',
    slug: 'microservicios-con-nestjs-y-rabbitmq',
    content:
      '<h1>Arquitectura de Microservicios</h1><p>Los microservicios son un enfoque de arquitectura de software que descompone una aplicación en un conjunto de servicios pequeños e independientes. NestJS es un excelente framework para construir estos servicios, y RabbitMQ un Message Broker popular para la comunicación entre ellos.</p><h2>Por qué RabbitMQ</h2><p>RabbitMQ permite la comunicación asíncrona y desacoplada, lo que es esencial en una arquitectura de microservicios. Facilita la distribución de tareas y la resiliencia del sistema.</p>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758623142/posts/Gemini_Generated_Image_4acpxh4acpxh4acp_kf6xrx.png',
    status: PostStatus.PUBLISHED,
    isFeatured: false,
    viewsCount: 380,
    publishedAt: new Date('2024-09-07T10:00:00Z'),
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    category: { id: 'ba59da87-c94d-4925-9484-cd4ad57dd08b' } as Category,
  },
  {
    id: '4b2d5e6f-7a8b-4c9d-9e0f-1a2b3c4d5e6f',
    title: 'Cómo publicar tu primera app en Google Play Store',
    slug: 'como-publicar-tu-primera-app-en-google-play-store',
    content:
      '<h1>Guía para publicar en Play Store</h1><p>Publicar tu primera aplicación en Google Play Store puede parecer un proceso abrumador. Esta guía te llevará paso a paso, desde la preparación de tu APK o AAB hasta el llenado de la información de la tienda y la configuración de la distribución.</p><h2>Requisitos Clave</h2><ul><li>Una cuenta de desarrollador de Google Play.</li><li>Una aplicación empaquetada y firmada.</li><li>Capturas de pantalla y un ícono de la aplicación.</li><li>Descripción corta y completa.</li></ul>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758623067/posts/Gemini_Generated_Image_r4ub12r4ub12r4ub_lvuy6a.png',
    status: PostStatus.PUBLISHED,
    isFeatured: false,
    viewsCount: 120,
    publishedAt: new Date('2024-09-06T15:00:00Z'),
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    category: { id: 'f1c471ec-1f3e-4291-b99f-7bc9f6fd77ad' } as Category,
  },
  {
    id: '5c3e6f7a-8b9c-4d0e-9f1a-2b3c4d5e6f7a',
    title: 'Visión por Computadora: De la Teoría a la Práctica',
    slug: 'vision-por-computadora-de-la-teoria-a-la-practica',
    content:
      '<h1>Fundamentos de la Visión por Computadora</h1><p>La visión por computadora es un campo de la IA que se enfoca en enseñar a las computadoras a interpretar y entender el mundo visual. Se utiliza en todo, desde el reconocimiento facial hasta los coches autónomos.</p><h2>Librerías Populares</h2><p>Python es el lenguaje dominante en este campo, con librerías como OpenCV, Scikit-image y TensorFlow que facilitan la implementación de modelos.</p>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758623247/posts/Gemini_Generated_Image_l8b6bul8b6bul8b6_c2qao4.png',
    status: PostStatus.PUBLISHED,
    isFeatured: false,
    viewsCount: 220,
    publishedAt: new Date('2024-09-05T10:30:00Z'),
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    category: { id: '8873be61-cfa7-48bb-9d4d-db6036706755' } as Category,
  },
  {
    id: '6d4f7a8b-9c0d-4e1f-9a2b-3c4d5e6f7a8b',
    title: 'Automatizando la Infraestructura con Terraform',
    slug: 'automatizando-la-infraestructura-con-terraform',
    content:
      '<h1>Infraestructura como Código con Terraform</h1><p>Terraform es una herramienta de Infraestructura como Código (IaC) que te permite definir y aprovisionar infraestructura en la nube usando archivos de configuración. Esto simplifica la gestión de recursos y garantiza que tu entorno sea consistente y reproducible.</p><h2>Ventajas de Terraform</h2><ul><li>**Automatización:** Provisiona recursos de manera automática.</li><li>**Consistencia:** Evita la desviación de la configuración.</li><li>**Multi-cloud:** Soporta AWS, Azure, Google Cloud, y muchos más.</li></ul>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758623343/posts/Gemini_Generated_Image_7ksic7ksic7ksic7_sv2l1u.png',
    status: PostStatus.PUBLISHED,
    isFeatured: false,
    viewsCount: 160,
    publishedAt: new Date('2024-09-04T12:00:00Z'),
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    category: { id: '54c3c359-bfec-46bf-b3ad-aa5c58622b9c' } as Category,
  },
  {
    id: '7e5a8b9c-0d1e-4f2a-9b3c-4d5e6f7a8b9c',
    title: 'Componentes reutilizables en React con Storybook',
    slug: 'componentes-reutilizables-en-react-con-storybook',
    content:
      '<h1>Storybook para componentes</h1><p>Storybook es una herramienta de código abierto para desarrollar componentes de interfaz de usuario de forma aislada. Te permite visualizar, probar y documentar tus componentes sin necesidad de ejecutar toda la aplicación. Es una herramienta esencial para la creación de sistemas de diseño.</p><h2>Beneficios de Storybook</h2><ul><li>**Desarrollo aislado:** Enfócate en un solo componente a la vez.</li><li>**Pruebas interactivas:** Interactúa con tus componentes en diferentes estados.</li><li>**Documentación automática:** Crea una guía de estilo en vivo para tu equipo.</li></ul>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758623496/posts/Gemini_Generated_Image_guu1slguu1slguu1_mp1950.png',
    status: PostStatus.PUBLISHED,
    isFeatured: false,
    viewsCount: 280,
    publishedAt: new Date('2024-09-03T18:45:00Z'),
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    category: { id: '9118d1bc-63cd-4099-8ed6-9c16bed9baf6' } as Category,
  },
  {
    id: '8f6b9c0d-1e2f-4a3b-9c4d-5e6f7a8b9c0d',
    title: 'Construyendo un servidor de chat en tiempo real con WebSocket',
    slug: 'construyendo-un-servidor-de-chat-en-tiempo-real-con-websocket',
    content:
      '<h1>WebSockets en Node.js</h1><p>WebSocket es un protocolo de comunicación que permite una conexión bidireccional y persistente entre un cliente y un servidor, lo que es ideal para aplicaciones en tiempo real como chats o juegos online. En Node.js, librerías como `socket.io` simplifican su uso.</p><h2>Diferencia con HTTP</h2><p>HTTP es un protocolo stateless (sin estado) de petición-respuesta. WebSocket, en cambio, mantiene la conexión abierta, lo que elimina la sobrecarga de múltiples peticiones y respuestas, mejorando el rendimiento.</p>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758623719/posts/Gemini_Generated_Image_7gk4op7gk4op7gk4_1_pla7s4.png',
    status: PostStatus.PUBLISHED,
    isFeatured: false,
    viewsCount: 510,
    publishedAt: new Date('2024-09-02T11:00:00Z'),
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    category: { id: 'ba59da87-c94d-4925-9484-cd4ad57dd08b' } as Category,
  },
  {
    id: '9c7d0e1f-2a3b-4b4c-9d5e-6f7a8b9c0d1e',
    title: 'SwiftUI para el desarrollo de iOS: Una guía rápida',
    slug: 'swiftui-para-el-desarrollo-de-ios-una-guia-rapida',
    content:
      '<h1>Introducción a SwiftUI</h1><p>SwiftUI es el framework de Apple para construir interfaces de usuario de manera declarativa en todas sus plataformas. Con una sintaxis limpia y fácil de entender, SwiftUI simplifica la creación de interfaces de usuario complejas y reactivas.</p><h2>Diferencias con UIKit</h2><p>UIKit es el framework tradicional y basado en la programación imperativa. Con SwiftUI, describes cómo quieres que sea tu vista, y el framework se encarga de que se vea así, lo que reduce la cantidad de código y los posibles errores.</p>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758623703/posts/Gemini_Generated_Image_2wvrq2wvrq2wvrq2_mgulev.png',
    status: PostStatus.PUBLISHED,
    isFeatured: false,
    viewsCount: 95,
    publishedAt: new Date('2024-09-01T09:00:00Z'),
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    category: { id: 'f1c471ec-1f3e-4291-b99f-7bc9f6fd77ad' } as Category,
  },
  {
    id: '0d8e1f2a-3b4c-4c5d-9e6f-7a8b9c0d1e2f',
    title: 'Fundamentos de Machine Learning con TensorFlow.js',
    slug: 'fundamentos-de-machine-learning-con-tensorflow-js',
    content:
      '<h1>ML en el navegador con TensorFlow.js</h1><p>TensorFlow.js es una librería de Machine Learning para JavaScript que te permite entrenar y desplegar modelos directamente en el navegador o en Node.js. Esto abre un mundo de posibilidades para aplicaciones interactivas de IA en el cliente.</p><h2>Cómo funciona</h2><p>Funciona utilizando la aceleración por hardware del navegador (WebGPU) para realizar cálculos de manera eficiente. Puedes usar modelos pre-entrenados o crear y entrenar tus propios modelos desde cero.</p>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758624472/posts/Gemini_Generated_Image_7uj1277uj1277uj1_yihojo.png',
    status: PostStatus.PUBLISHED,
    isFeatured: false,
    viewsCount: 65,
    publishedAt: new Date('2024-08-31T12:00:00Z'),
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    category: { id: '8873be61-cfa7-48bb-9d4d-db6036706755' } as Category,
  },
  {
    id: '1e9f2a3b-4c5d-4d6e-9f7a-8b9c0d1e2f3a',
    title: 'Monitoreo de aplicaciones con Prometheus y Grafana',
    slug: 'monitoreo-de-aplicaciones-con-prometheus-y-grafana',
    content:
      '<h1>Prometheus y Grafana en DevOps</h1><p>El monitoreo es una parte crucial del ciclo de vida de desarrollo de software. Prometheus es una base de datos de series de tiempo de código abierto que recolecta métricas de tus servicios, mientras que Grafana es una herramienta de visualización que te ayuda a entender esos datos a través de dashboards interactivos.</p><h2>Arquitectura del stack</h2><ul><li>**Prometheus:** Recolecta las métricas a través de "endpoints" de tus servicios.</li><li>**Alertmanager:** Envía alertas cuando las métricas superan un umbral.</li><li>**Grafana:** Se conecta a Prometheus y visualiza los datos en gráficos y paneles.</li></ul>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758624514/posts/Gemini_Generated_Image_nxb5d9nxb5d9nxb5_ddi5qt.png',
    status: PostStatus.PUBLISHED,
    isFeatured: false,
    viewsCount: 190,
    publishedAt: new Date('2024-08-30T10:00:00Z'),
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    category: { id: '54c3c359-bfec-46bf-b3ad-aa5c58622b9c' } as Category,
  },
  {
    id: '2f0a3b4c-5d6e-4e7f-9a8b-9c0d1e2f3a4b',
    title: 'Aprende a usar Redux Toolkit en 10 minutos',
    slug: 'aprende-a-usar-redux-toolkit-en-10-minutos',
    content:
      '<h1>Redux Toolkit para una gestión de estado simple</h1><p>Redux Toolkit (RTK) es la forma oficial recomendada de escribir lógica de Redux. Resuelve los principales problemas de Redux tradicional: configuración complicada, demasiado código repetitivo y dificultad para depurar. RTK simplifica enormemente el proceso.</p><h2>Funcionalidades Clave</h2><ul><li>`createSlice`: Genera automáticamente reducers y action creators.</li><li>`configureStore`: Simplifica la configuración de la tienda.</li><li>`createAsyncThunk`: Maneja la lógica asíncrona de manera sencilla.</li></ul>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758625012/posts/Gemini_Generated_Image_pai1skpai1skpai1_a8tocv.png',
    status: PostStatus.PUBLISHED,
    isFeatured: false,
    viewsCount: 50,
    publishedAt: new Date('2024-08-29T14:20:00Z'),
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    category: { id: '9118d1bc-63cd-4099-8ed6-9c16bed9baf6' } as Category,
  },
  {
    id: '3a1b4c5d-6e7f-4f8a-9b9c-0d1e2f3a4b5c',
    title: 'Desarrollo de backends robustos con NestJS y TypeORM',
    slug: 'desarrollo-de-backends-robustos-con-nestjs-y-typeorm',
    content:
      '<h1>Construyendo Backends con NestJS</h1><p>NestJS y TypeORM forman una combinación poderosa para el desarrollo de backends en Node.js. NestJS proporciona una arquitectura modular, mientras que TypeORM es un ORM (Object-Relational Mapper) que facilita la interacción con la base de datos.</p><h2>Características Clave</h2><ul><li>**Patrones de diseño:** NestJS sigue patrones como el Módulo, el Proveedor y el Controlador.</li><li>**Manejo de la base de datos:** TypeORM permite gestionar la base de datos con objetos JavaScript/TypeScript.</li><li>**Validación de datos:** Se integra fácilmente con librerías de validación como `class-validator`.</li></ul>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758625009/posts/Gemini_Generated_Image_6ri1x46ri1x46ri1_mvkok8.png',
    status: PostStatus.PUBLISHED,
    isFeatured: false,
    viewsCount: 75,
    publishedAt: new Date('2024-08-28T16:00:00Z'),
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    category: { id: 'ba59da87-c94d-4925-9484-cd4ad57dd08b' } as Category,
  },
  {
    id: '4b2c5d6e-7f8a-4b9c-9d0e-1f2a3b4c5d6e',
    title: 'Lo nuevo de Flutter 3.0: Widgets y Rendimiento',
    slug: 'lo-nuevo-de-flutter-3-0-widgets-y-rendimiento',
    content:
      '<h1>Flutter 3.0 y más allá</h1><p>Flutter 3.0 marcó un hito importante, extendiendo el soporte a todas las plataformas (iOS, Android, web, macOS, Windows y Linux). Esta nueva versión se centró en mejorar la productividad y el rendimiento para desarrolladores.</p><h2>Widgets de la nueva generación</h2><p>La actualización trajo consigo nuevos widgets y mejoras en el motor de renderizado Skia, lo que resultó en una experiencia de usuario más fluida y un mejor rendimiento en general.</p>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758625005/posts/Gemini_Generated_Image_1kjtvt1kjtvt1kjt_dsywo4.png',
    status: PostStatus.PUBLISHED,
    isFeatured: false,
    viewsCount: 300,
    publishedAt: new Date('2024-08-27T11:00:00Z'),
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    category: { id: 'f1c471ec-1f3e-4291-b99f-7bc9f6fd77ad' } as Category,
  },
  {
    id: '5c3d6e7f-8a9b-4c0d-9e1f-2a3b4c5d6e7f',
    title: 'Explorando las Redes Neuronales Convolucionales (CNNs)',
    slug: 'explorando-las-redes-neuronales-convolucionales-cnns',
    content:
      '<h1>Entendiendo las CNNs</h1><p>Las Redes Neuronales Convolucionales (CNNs) son una clase de redes neuronales profundas que se han vuelto dominantes en el campo de la visión por computadora. Su nombre proviene de la operación de convolución, que se aplica a los datos de entrada para extraer características relevantes.</p><h2>Cómo funcionan</h2><p>Las CNNs consisten en capas de convolución, capas de pooling y capas totalmente conectadas. Cada capa de convolución aprende a detectar diferentes características, como bordes, texturas o formas.</p>',
    coverImageUrl:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1758625082/posts/Gemini_Generated_Image_9a36hj9a36hj9a36_vcsvmj.png',
    status: PostStatus.PUBLISHED,
    isFeatured: false,
    viewsCount: 110,
    publishedAt: new Date('2024-08-26T14:00:00Z'),
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    category: { id: '8873be61-cfa7-48bb-9d4d-db6036706755' } as Category,
  },
];

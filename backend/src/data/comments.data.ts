import { Comment } from '../comments/entities/comment.entity';
import { Post } from '../posts/entities/post.entity';
import { User } from '../users/entities/user.entity';

export const COMMENTS_DATA: Partial<Comment>[] = [
  {
    id: '6a4b5c7d-8e9f-4c1d-9b2e-0f3a4b5c6d7e',
    content:
      '¡Increíble guía! NestJS se ve muy robusto. ¿Han considerado usarlo con GraphQL?',
    post: { id: '1e34c9c1-420b-4f51-a20c-83b65a5a1e2b' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
  },
  {
    id: '7b5c8d9e-1f2a-4d3c-9a4b-5c6d7e8f9a0b',
    content:
      'Sí, la combinación de NestJS y GraphQL es poderosa. Hay un módulo oficial para eso, @nestjs/graphql.',
    post: { id: '1e34c9c1-420b-4f51-a20c-83b65a5a1e2b' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    parent: { id: '6a4b5c7d-8e9f-4c1d-9b2e-0f3a4b5c6d7e' } as Comment,
  },
  {
    id: '8c6d9e0f-2b3c-4d4e-8c5d-6e7f8a9b0c1d',
    content:
      'Me gustaría ver un artículo sobre cómo implementar microservicios con NestJS y Kafka.',
    post: { id: '1e34c9c1-420b-4f51-a20c-83b65a5a1e2b' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
  },
  {
    id: '7c6d9e0f-2b3c-4d4e-8c5d-6e7f8a9b0c1c',
    content:
      'La inyección de dependencias en NestJS es fantástica, simplifica mucho el código.',
    post: { id: '1e34c9c1-420b-4f51-a20c-83b65a5a1e2b' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    parent: { id: '8c6d9e0f-2b3c-4d4e-8c5d-6e7f8a9b0c1d' } as Comment,
  },
  {
    id: '9d7e0f1a-3c4d-4e5f-9a6b-7c8d9e0f1a2b',
    content:
      'Jotai también es muy bueno, lo uso en proyectos pequeños. Pero para apps grandes, Redux Toolkit es insuperable.',
    post: { id: '2a5b6d7f-8e9a-4c2d-9b0e-1f2a3b4c5d6f' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
  },
  {
    id: '0e8f1a2b-4d5e-4f6a-9b7c-8d9e0f1a2b3c',
    content:
      'Me gusta la simplicidad de Zustand, pero me preocupa la escalabilidad a largo plazo. ¿Alguna experiencia con eso?',
    post: { id: '2a5b6d7f-8e9a-4c2d-9b0e-1f2a3b4c5d6f' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    parent: { id: '9d7e0f1a-3c4d-4e5f-9a6b-7c8d9e0f1a2b' } as Comment,
  },
  {
    id: '1f9a2b3c-5d6e-4f7a-9c8d-9e0f1a2b3c4d',
    content:
      'Yo lo he usado en un proyecto mediano y no tuve problemas. Con un buen diseño de estado, funciona muy bien.',
    post: { id: '2a5b6d7f-8e9a-4c2d-9b0e-1f2a3b4c5d6f' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    parent: { id: '9d7e0f1a-3c4d-4e5f-9a6b-7c8d9e0f1a2b' } as Comment,
  },
  {
    id: '1a9a2b3c-5d6e-4f7a-9c8d-9e0f1a2b3c4f',
    content:
      'Para la mayoría de los casos de uso, useContext es suficiente. No hay necesidad de librerías externas.',
    post: { id: '2a5b6d7f-8e9a-4c2d-9b0e-1f2a3b4c5d6f' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
  },
  {
    id: '2f0a3b4c-6e7f-4f8a-9b9c-0d1e2f3a4b5c',
    content:
      'FastAPI es el futuro para Python. Es muy rápido y la integración de tipado es genial.',
    post: { id: '3c8e5f9d-1b2c-4e8a-8c1d-2b3a4c5d6e7f' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
  },
  {
    id: '1b0a3b4c-6e7f-4f8a-9b9c-0d1e2f3a4b5d',
    content:
      'Totalmente de acuerdo. La validación de datos con Pydantic es un salvavidas.',
    post: { id: '3c8e5f9d-1b2c-4e8a-8c1d-2b3a4c5d6e7f' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    parent: { id: '2f0a3b4c-6e7f-4f8a-9b9c-0d1e2f3a4b5c' } as Comment,
  },
  {
    id: '3a1b4c5d-7f8a-4b9c-9d0e-1f2a3b4c5d6e',
    content:
      'El hot reload de Flutter es una maravilla. Hace que el desarrollo sea muy fluido.',
    post: { id: '4d1f2e8c-5a6b-4d7e-9c2b-8a9b0c1d2e3f' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
  },
  {
    id: '4b2c5d6e-8a9b-4c0d-9e1f-2a3b4c5d6e7f',
    content:
      '¿Han probado React Native con Expo? Simplifica mucho la configuración.',
    post: { id: '4d1f2e8c-5a6b-4d7e-9c2b-8a9b0c1d2e3f' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    parent: { id: '3a1b4c5d-7f8a-4b9c-9d0e-1f2a3b4c5d6e' } as Comment,
  },
  {
    id: '5c3d6e7f-9a0b-4c1d-9e2f-3a4b5c6d7e8f',
    content:
      'Sí, Expo es genial para prototipos rápidos, pero para aplicaciones complejas a veces se queda corto.',
    post: { id: '4d1f2e8c-5a6b-4d7e-9c2b-8a9b0c1d2e3f' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    parent: { id: '3a1b4c5d-7f8a-4b9c-9d0e-1f2a3b4c5d6e' } as Comment,
  },
  {
    id: '6d4f7a8b-0c1d-4e2f-9a3b-4c5d6e7f8a9b',
    content:
      'La IA generativa está cambiando el mundo. ¿Creen que los desarrolladores de software serán reemplazados por completo?',
    post: { id: '5e3a7c8b-6d9f-4b0e-8c2d-9a1f2b3c4d5e' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
  },
  {
    id: '7e5a8b9c-1d2e-4f3a-9b4c-5d6e7f8a9b0c',
    content:
      'No lo creo. Será una herramienta más para aumentar nuestra productividad.',
    post: { id: '5e3a7c8b-6d9f-4b0e-8c2d-9a1f2b3c4d5e' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    parent: { id: '6d4f7a8b-0c1d-4e2f-9a3b-4c5d6e7f8a9b' } as Comment,
  },
  {
    id: '8f6b9c0d-2e3f-4a4b-9c5d-6e7f8a9b0c1d',
    content:
      'La verdad es que es una locura lo que se puede hacer. He visto modelos que generan código funcional.',
    post: { id: '5e3a7c8b-6d9f-4b0e-8c2d-9a1f2b3c4d5e' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
  },
  {
    id: '11111111-2e3f-4a4b-9c5d-6e7f8a9b0c1e',
    content:
      'Es un debate interesante. Creo que la creatividad y la resolución de problemas seguirán siendo humanas.',
    post: { id: '5e3a7c8b-6d9f-4b0e-8c2d-9a1f2b3c4d5e' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    parent: { id: '8f6b9c0d-2e3f-4a4b-9c5d-6e7f8a9b0c1d' } as Comment,
  },
  {
    id: '22222222-2e3f-4a4b-9c5d-6e7f8a9b0c1f',
    content:
      'Estoy de acuerdo. Nos tocará adaptarnos y trabajar con estas herramientas.',
    post: { id: '5e3a7c8b-6d9f-4b0e-8c2d-9a1f2b3c4d5e' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    parent: { id: '8f6b9c0d-2e3f-4a4b-9c5d-6e7f8a9b0c1d' } as Comment,
  },
  {
    id: '9c7d0e1f-3a4b-4b5c-9d6e-7f8a9b0c1d2e',
    content:
      'Docker y Kubernetes son la base de la modernización de infraestructura. ¡Artículo muy útil!',
    post: { id: '6a4b5c7d-8e9f-4c1d-9b2e-0f3a4b5c6d7e' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
  },
  {
    id: '0d8e1f2a-4b5c-4c6d-9e7f-8a9b0c1d2e3f',
    content:
      'La curva de aprendizaje de Kubernetes es empinada, pero vale la pena.',
    post: { id: '6a4b5c7d-8e9f-4c1d-9b2e-0f3a4b5c6d7e' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    parent: { id: '9c7d0e1f-3a4b-4b5c-9d6e-7f8a9b0c1d2e' } as Comment,
  },
  {
    id: 'ca437d29-fa6b-4e39-8e2e-ffc8ce857dbc',
    content:
      'Sí, es un cambio de mentalidad, pero una vez que lo dominas, la gestión de despliegues es muy robusta.',
    post: { id: '6a4b5c7d-8e9f-4c1d-9b2e-0f3a4b5c6d7e' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    parent: { id: '9c7d0e1f-3a4b-4b5c-9d6e-7f8a9b0c1d2e' } as Comment,
  },
  {
    id: '7f337f39-3400-492f-a81c-bc520107d9f2',
    content:
      'No entiendo la necesidad de TypeScript en proyectos pequeños, me parece sobreingeniería.',
    post: { id: '7b5c8d9e-1f2a-4d3c-9a4b-5c6d7e8f9a0b' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
  },
  {
    id: '0c1cd47b-539a-4f53-b1ca-9a77a0261c19',
    content:
      'Incluso en proyectos pequeños, TypeScript evita errores y ayuda a mantener el código limpio.',
    post: { id: '7b5c8d9e-1f2a-4d3c-9a4b-5c6d7e8f9a0b' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    parent: { id: '7f337f39-3400-492f-a81c-bc520107d9f2' } as Comment,
  },
  {
    id: '31bcbd82-506b-402d-824b-fbf171416e9b',
    content:
      'BaaS es una gran opción para startups. Acelera mucho el desarrollo inicial.',
    post: { id: '8a6d9e0f-1b2c-4d3e-8c4f-5a6b7c8d9e0f' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
  },
  {
    id: '53f57ae3-eea2-49e1-9edb-e5e24c3c77e1',
    content:
      '¿Y para proyectos grandes? ¿Creen que los costos se disparan? No me siento cómodo con la dependencia de un solo proveedor.',
    post: { id: '8a6d9e0f-1b2c-4d3e-8c4f-5a6b7c8d9e0f' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
  },
  {
    id: '4815a64a-7cc9-4ae1-a805-8c1ffcd64500',
    content:
      'Es un trade-off. Para los primeros años, el tiempo de desarrollo es clave.',
    post: { id: '8a6d9e0f-1b2c-4d3e-8c4f-5a6b7c8d9e0f' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    parent: { id: '53f57ae3-eea2-49e1-9edb-e5e24c3c77e1' } as Comment,
  },
  {
    id: '2df38beb-3d24-4231-894e-e9d70cbc7f9f',
    content:
      'Yo sigo prefiriendo el desarrollo nativo para apps que requieren mucho rendimiento, como juegos.',
    post: { id: '9c7e0f1a-2b3c-4d4e-8c5d-6e7f8a9b0c1d' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
  },
  {
    id: 'dabde3b8-12d0-4256-ac2f-a13f85ed6ef7',
    content:
      'Buen punto. Aunque para aplicaciones de negocio, multiplataforma es más eficiente en costos.',
    post: { id: '9c7e0f1a-2b3c-4d4e-8c5d-6e7f8a9b0c1d' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    parent: { id: '2df38beb-3d24-4231-894e-e9d70cbc7f9f' } as Comment,
  },
  {
    id: '62fdf1f9-a04c-4a1c-8623-e68d9acfa309',
    content: 'Me gustó la introducción al ML. Los pasos son muy claros.',
    post: { id: '0d8f1e2a-3b4c-4d5e-9c6f-7d8e9f0a1b2c' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
  },
  {
    id: '1b464633-2943-4a40-ac0d-17f18530faf0',
    content:
      '¿Cuál es su recomendación para empezar? ¿Python con Scikit-learn o R?',
    post: { id: '0d8f1e2a-3b4c-4d5e-9c6f-7d8e9f0a1b2c' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    parent: { id: '62fdf1f9-a04c-4a1c-8623-e68d9acfa309' } as Comment,
  },
  {
    id: '712a4be3-ea25-4ae1-a80b-13d46ffc07d6',
    content:
      'GitHub Actions ha mejorado mucho. Ahora es mucho más fácil de configurar.',
    post: { id: '1e9a2b3c-4d5e-4f6a-9b7c-8d9e0f1a2b3c' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
  },
  {
    id: 'a2913b22-452d-44af-b4c7-b800d57abfd4',
    content:
      'Estoy empezando a usarlo, ¿algún consejo para optimizar los tiempos de build?',
    post: { id: '1e9a2b3c-4d5e-4f6a-9b7c-8d9e0f1a2b3c' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    parent: { id: '712a4be3-ea25-4ae1-a80b-13d46ffc07d6' } as Comment,
  },
  {
    id: '5e559154-16c1-4d3e-be54-55996a00338b',
    content:
      '¡Claro! Usa el cache de los módulos de npm. Acelera mucho las cosas.',
    post: { id: '1e9a2b3c-4d5e-4f6a-9b7c-8d9e0f1a2b3c' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    parent: { id: '712a4be3-ea25-4ae1-a80b-13d46ffc07d6' } as Comment,
  },
  {
    id: '468b10f3-49c9-4a53-a3fe-cf9a1cba4ef7',
    content:
      'Styled Components es mi librería favorita. Me encanta la sintaxis.',
    post: { id: '2f0b3c4d-5e6f-4a7b-8c8d-9e9f0a1b2c3d' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
  },
  {
    id: 'e0ee2c81-e0f3-4c42-b627-7d27f7631721',
    content: 'Nunca he usado RabbitMQ, ¿es fácil de configurar con NestJS?',
    post: { id: '3a1c4d5e-6f7a-4b8c-9d9e-0f1a2b3c4d5e' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
  },
  {
    id: '15ebb25b-149c-499a-9307-5ceae6b353fe',
    content:
      'Sí, el módulo de Microservices de NestJS tiene una integración muy limpia. Es bastante simple.',
    post: { id: '3a1c4d5e-6f7a-4b8c-9d9e-0f1a2b3c4d5e' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    parent: { id: 'e0ee2c81-e0f3-4c42-b627-7d27f7631721' } as Comment,
  },
  {
    id: 'a80cb7fb-75f0-46f0-af92-59ff000ad553',
    content:
      'Publicar en la Play Store siempre es una pesadilla, ¡gracias por la guía!',
    post: { id: '4b2d5e6f-7a8b-4c9d-9e0f-1a2b3c4d5e6f' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
  },
  {
    id: 'f2bd209c-8004-4cee-9b0c-0d160904ca8c',
    content:
      '¡De nada! Nos alegra que les sea útil. Estamos trabajando en una guía para la App Store ahora mismo.',
    post: { id: '4b2d5e6f-7a8b-4c9d-9e0f-1a2b3c4d5e6f' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    parent: { id: 'a80cb7fb-75f0-46f0-af92-59ff000ad553' } as Comment,
  },
  {
    id: 'f53d4db3-d902-4b3b-8559-e5bfe4488052',
    content:
      'La visión por computadora es el futuro. La aplico en mis proyectos para detectar objetos en tiempo real.',
    post: { id: '5c3d6e7f-8a9b-4c0d-9e1f-2a3b4c5d6e7f' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
  },
  {
    id: '5874820a-f2ea-4d48-a9bf-1291d3dff14b',
    content:
      '¿Qué librerías usas para eso? ¿OpenCV o algo más moderno como YOLO?',
    post: { id: '5c3d6e7f-8a9b-4c0d-9e1f-2a3b4c5d6e7f' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    parent: { id: 'f53d4db3-d902-4b3b-8559-e5bfe4488052' } as Comment,
  },
  {
    id: 'fdcaad3c-22bf-427f-9b64-cc2c73c97c71',
    content:
      'El artículo sobre Terraform es muy útil para quienes están empezando con IaC.',
    post: { id: '6d4f7a8b-9c0d-4e1f-9a2b-3c4d5e6f7a8b' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
  },
  {
    id: 'a66d5274-3620-42b4-87b8-7978c23aa36c',
    content:
      'Storybook es una herramienta que todo desarrollador de frontend debería conocer. ¡Muy útil!',
    post: { id: '7e5a8b9c-0d1e-4f2a-9b3c-4d5e6f7a8b9c' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
  },
  {
    id: '05b7cc37-4dd2-4005-9e39-fa63c1bcbad6',
    content:
      'Sí, es genial para documentar y probar componentes de forma aislada.',
    post: { id: '7e5a8b9c-0d1e-4f2a-9b3c-4d5e6f7a8b9c' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    parent: { id: 'a66d5274-3620-42b4-87b8-7978c23aa36c' } as Comment,
  },
  {
    id: '4355ef93-8ab8-49fd-8b37-2ce645f785d8',
    content:
      '¿Cómo manejan los WebSockets en el cliente? ¿Usan una librería en particular?',
    post: { id: '8f6b9c0d-1e2f-4a3b-9c4d-5e6f7a8b9c0d' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
  },
  {
    id: '2eba45d0-46be-48d5-bedc-b58af1ed57a5',
    content:
      'Generalmente, `socket.io-client` es la mejor opción. Funciona de maravilla con `socket.io` en el backend.',
    post: { id: '8f6b9c0d-1e2f-4a3b-9c4d-5e6f7a8b9c0d' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    parent: { id: '4355ef93-8ab8-49fd-8b37-2ce645f785d8' } as Comment,
  },
  {
    id: '7dbf3385-c0e9-4e1e-9936-30975fae5794',
    content:
      'Me gusta la sintaxis de SwiftUI, pero UIKit sigue siendo necesario para algunos casos avanzados.',
    post: { id: '9c7d0e1f-2a3b-4b4c-9d5e-6f7a8b9c0d1e' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
  },
  {
    id: 'abfbd2d9-d17f-48a7-824f-cb20c07bdafa',
    content:
      'Es cierto. La interoperabilidad es clave en el desarrollo iOS moderno.',
    post: { id: '9c7d0e1f-2a3b-4b4c-9d5e-6f7a8b9c0d1e' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
    parent: { id: '7dbf3385-c0e9-4e1e-9936-30975fae5794' } as Comment,
  },
  {
    id: '8b31f11f-d172-46b5-8fcf-cd13145437a6',
    content:
      'TensorFlow.js es impresionante. He visto demos de reconocimiento de imágenes en tiempo real.',
    post: { id: '0d8e1f2a-3b4c-4c5d-9e6f-7a8b9c0d1e2f' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
  },
  {
    id: '120d4b52-25f3-4486-8569-d689f3382be6',
    content:
      'Es fascinante cómo la IA se está moviendo al navegador. ¿Y para reconocimiento de voz?',
    post: { id: '0d8e1f2a-3b4c-4c5d-9e6f-7a8b9c0d1e2f' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
    parent: { id: '8b31f11f-d172-46b5-8fcf-cd13145437a6' } as Comment,
  },
  {
    id: '6d950be6-7a35-412f-8460-1870be1ff485',
    content:
      'Prometheus y Grafana es un combo esencial para cualquier proyecto de producción.',
    post: { id: '1e9f2a3b-4c5d-4d6e-9f7a-8b9c0d1e2f3a' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
  },
  {
    id: '844fcb57-2049-49c7-9fd9-58d0438bfa28',
    content:
      'Redux Toolkit es un salvavidas. Hizo que Redux sea mucho más accesible para mí.',
    post: { id: '2f0a3b4c-5d6e-4e7f-9a8b-9c0d1e2f3a4b' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
  },
  {
    id: '57538d2a-425a-409c-acbf-b721be10827b',
    content:
      'La combinación de NestJS y TypeORM es la mejor para backends robustos y escalables.',
    post: { id: '3a1b4c5d-6e7f-4f8a-9b9c-0d1e2f3a4b5c' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
  },
  {
    id: '92240133-482d-4bb9-b1af-6f7322170bc0',
    content:
      'Prefiero Prisma. Es mucho más moderno y la experiencia de desarrollador es superior.',
    post: { id: '3a1b4c5d-6e7f-4f8a-9b9c-0d1e2f3a4b5c' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
  },
  {
    id: 'f0562203-94d8-47c6-8852-e81b705dfff0',
    content:
      'Flutter 3.0 es una gran actualización. El rendimiento es impresionante.',
    post: { id: '4b2c5d6e-7f8a-4b9c-9d0e-1f2a3b4c5d6e' } as Post,
    author: { id: '9bd4f59c-3e6c-4742-9905-4501b526f34f' } as User,
  },
  {
    id: '0da69a6b-57a9-4d18-a769-9d9b57feacbc',
    content:
      'Las CNNs son la base de la visión por computadora. Es un campo muy interesante.',
    post: { id: '5c3d6e7f-8a9b-4c0d-9e1f-2a3b4c5d6e7f' } as Post,
    author: { id: '8f05462d-85ce-435c-ac49-7de04b87e0ea' } as User,
  },
];

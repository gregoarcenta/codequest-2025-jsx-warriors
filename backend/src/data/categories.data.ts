import { Category } from '../categories/entities/category.entity';

export const categoriesInitialData: Pick<
  Category,
  'name' | 'description' | 'isFeatured' | 'isActive'
>[] = [
  {
    name: 'Frontend',
    description: 'React, vue, Angular y más tecnologías frontend',
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Backend',
    description: 'Node.js, Python, .NET y tecnologías de servidor',
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Mobile',
    description: 'React Native, Flutter y desarrollo móvil',
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'IA',
    description: 'Modelos de IA y machine learning y más',
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'DevOps',
    description:
      'CI/CD, contenedores, infraestructura en la nube y automatización',
    isFeatured: true,
    isActive: true,
  },
];

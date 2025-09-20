import { Category } from '../categories/entities/category.entity';

export const CATEGORIES_DATA: Partial<Category>[] = [
  {
    id: '9118d1bc-63cd-4099-8ed6-9c16bed9baf6',
    name: 'Frontend',
    description: 'React, vue, Angular y más tecnologías frontend',
    isFeatured: true,
    isActive: true,
  },
  {
    id: 'ba59da87-c94d-4925-9484-cd4ad57dd08b',
    name: 'Backend',
    description: 'Node.js, Python, .NET y tecnologías de servidor',
    isFeatured: true,
    isActive: true,
  },
  {
    id: 'f1c471ec-1f3e-4291-b99f-7bc9f6fd77ad',
    name: 'Mobile',
    description: 'React Native, Flutter y desarrollo móvil',
    isFeatured: true,
    isActive: true,
  },
  {
    id: '8873be61-cfa7-48bb-9d4d-db6036706755',
    name: 'IA',
    description: 'Modelos de IA y machine learning y más',
    isFeatured: true,
    isActive: true,
  },
  {
    id: '54c3c359-bfec-46bf-b3ad-aa5c58622b9c',
    name: 'DevOps',
    description:
      'CI/CD, contenedores, infraestructura en la nube y automatización',
    isFeatured: true,
    isActive: true,
  },
];

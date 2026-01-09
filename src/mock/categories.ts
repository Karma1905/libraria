export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId?: string;
  productCount: number;
}

export interface CategoryTree extends Category {
  children?: CategoryTree[];
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Fiction',
    slug: 'fiction',
    description: 'Explore imaginative narratives and literary masterpieces',
    image: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400&h=300&fit=crop',
    productCount: 245,
  },
  {
    id: '2',
    name: 'Non-Fiction',
    slug: 'non-fiction',
    description: 'Discover real stories, biographies, and educational content',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop',
    productCount: 189,
  },
  {
    id: '3',
    name: "Children's Books",
    slug: 'children',
    description: 'Magical stories and educational books for young readers',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop',
    productCount: 156,
  },
  {
    id: '4',
    name: 'Mystery & Thriller',
    slug: 'mystery',
    description: 'Heart-pounding suspense and detective stories',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    productCount: 98,
  },
  {
    id: '5',
    name: 'Romance',
    slug: 'romance',
    description: 'Love stories that warm the heart',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
    productCount: 134,
  },
  {
    id: '6',
    name: 'Science Fiction & Fantasy',
    slug: 'scifi',
    description: 'Journey to other worlds and imagined futures',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
    productCount: 112,
  },
  // Subcategories
  {
    id: '7',
    name: 'Literary Fiction',
    slug: 'literary-fiction',
    description: 'Character-driven narratives with artistic merit',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop',
    parentId: '1',
    productCount: 67,
  },
  {
    id: '8',
    name: 'Historical Fiction',
    slug: 'historical-fiction',
    description: 'Stories set in fascinating historical periods',
    image: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=400&h=300&fit=crop',
    parentId: '1',
    productCount: 54,
  },
  {
    id: '9',
    name: 'Contemporary Fiction',
    slug: 'contemporary-fiction',
    description: 'Modern stories reflecting current times',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop',
    parentId: '1',
    productCount: 89,
  },
  {
    id: '10',
    name: 'Biography & Memoir',
    slug: 'biography',
    description: 'True stories of remarkable lives',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop',
    parentId: '2',
    productCount: 45,
  },
  {
    id: '11',
    name: 'Self-Help',
    slug: 'self-help',
    description: 'Books for personal growth and development',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
    parentId: '2',
    productCount: 78,
  },
  {
    id: '12',
    name: 'Picture Books',
    slug: 'picture-books',
    description: 'Illustrated stories for the youngest readers',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    parentId: '3',
    productCount: 89,
  },
  {
    id: '13',
    name: 'Young Adult',
    slug: 'young-adult',
    description: 'Stories for teens and young readers',
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=300&fit=crop',
    parentId: '3',
    productCount: 67,
  },
];

export const getCategoryTree = (): CategoryTree[] => {
  const rootCategories = categories.filter(c => !c.parentId);
  return rootCategories.map(root => ({
    ...root,
    children: categories.filter(c => c.parentId === root.id),
  }));
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(c => c.slug === slug);
};

export const getSubcategories = (parentId: string): Category[] => {
  return categories.filter(c => c.parentId === parentId);
};

export const getBreadcrumbs = (slug: string): Category[] => {
  const category = getCategoryBySlug(slug);
  if (!category) return [];
  
  const breadcrumbs: Category[] = [category];
  if (category.parentId) {
    const parent = categories.find(c => c.id === category.parentId);
    if (parent) breadcrumbs.unshift(parent);
  }
  return breadcrumbs;
};

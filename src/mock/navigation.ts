export interface NavItem {
  id: string;
  label: string;
  href: string;
  description?: string;
  icon?: string;
}

export const mainNavigation: NavItem[] = [
  { id: 'books', label: 'All Books', href: '/books', description: 'Browse our complete collection' },
  { id: 'categories', label: 'Categories', href: '/categories', description: 'Explore by genre' },
  { id: 'children', label: "Children's Books", href: '/categories/children', description: 'Books for young readers' },
  { id: 'about', label: 'About', href: '/about', description: 'Learn about us' },
];

export const featuredCategories: NavItem[] = [
  { id: 'fiction', label: 'Fiction', href: '/categories/fiction', description: 'Novels, short stories & literary works' },
  { id: 'non-fiction', label: 'Non-Fiction', href: '/categories/non-fiction', description: 'Real stories & knowledge' },
  { id: 'children', label: "Children's", href: '/categories/children', description: 'Books for young minds' },
  { id: 'mystery', label: 'Mystery & Thriller', href: '/categories/mystery', description: 'Suspense & detective stories' },
  { id: 'romance', label: 'Romance', href: '/categories/romance', description: 'Love stories & relationships' },
  { id: 'scifi', label: 'Sci-Fi & Fantasy', href: '/categories/scifi', description: 'Imaginative worlds & futures' },
];

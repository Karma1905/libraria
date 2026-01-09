import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { CategoryCard } from '@/components/CategoryCard';
import { CategoryGridSkeleton } from '@/components/Skeletons';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { fetchCategories, fetchNavigation } from '@/lib/api';

const Categories = () => {
  const [params] = useSearchParams();
  const navigationId = params.get('navigationId');

  // Fetch navigation to get the proper label for the breadcrumbs (e.g., "Books")
  const { data: navigation = [] } = useQuery({
    queryKey: ['navigation'],
    queryFn: fetchNavigation,
  });

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories', navigationId],
    queryFn: () =>
      fetchCategories(navigationId ? Number(navigationId) : undefined),
  });

  // Find the active navigation title to show in breadcrumbs
  const activeNav = navigation.find((nav: any) => nav.id === Number(navigationId));

  // Build breadcrumb items dynamically
  const breadcrumbItems = [{ label: 'Categories', href: navigationId ? '/categories' : undefined }];
  
  if (activeNav) {
    breadcrumbItems.push({
      label: activeNav.title,
      href: ''
    });
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        {/* FIXED: Breadcrumbs now show the path hierarchy */}
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            {activeNav ? activeNav.title : 'All Categories'}
          </h1>
          <p className="text-muted-foreground mt-2">
            Explore our collection of {activeNav ? activeNav.title.toLowerCase() : 'books'} by genre.
          </p>
        </div>

        {isLoading ? (
          <CategoryGridSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category: any) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Categories;
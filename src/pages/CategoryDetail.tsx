import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { ProductGrid } from '@/components/ProductGrid';
import { CategoryGridSkeleton, ProductGridSkeleton } from '@/components/Skeletons';
import { fetchCategories, fetchProductsByCategory } from '@/lib/api';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const CategoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  // Fetch all categories to find the one matching our slug
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
  });

  const category = categories?.find(
    (c: any) => c.slug === slug
  );

  // Fetch products for the found category
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products', category?.id],
    queryFn: () => fetchProductsByCategory(category.id),
    enabled: !!category?.id,
  });

  // 1. Handle Loading State
  if (categoriesLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 lg:py-12">
          {/* Keep breadcrumbs here so they show during load */}
          <Breadcrumbs 
            items={[
              { label: 'Categories', href: '/categories' }, 
              { label: 'Loading...' }
            ]} 
          />
          <CategoryGridSkeleton count={6} />
        </div>
      </Layout>
    );
  }

  // 2. Handle Not Found State
  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto py-16 text-center">
          <h1 className="font-heading text-2xl text-foreground mb-4">
            Category Not Found
          </h1>
          <Link to="/categories" className="text-primary underline">
            Back to categories
          </Link>
        </div>
      </Layout>
    );
  }

  // 3. Main Render State (Data is ready)
  return (
    <Layout>
      <div className="container mx-auto py-8 lg:py-12 px-4">
        {/* FIXED: Breadcrumbs added here so they stay visible after loading */}
        <Breadcrumbs 
          items={[
            { label: 'Categories', href: '/categories' }, 
            { label: category.title }
          ]} 
        />

        <div className="mb-10">
          <h1 className="font-heading text-3xl lg:text-4xl font-semibold text-foreground mb-3">
            {category.title}
          </h1>
          <p className="text-muted-foreground">
            Explore our collection of {category.title.toLowerCase()} books.
          </p>
        </div>

        <ProductGrid
          products={products?.items || products || []} // Handles both paginated and flat arrays
          isLoading={productsLoading}
          emptyMessage={`No books found in ${category.title}`}
        />
      </div>
    </Layout>
  );
};

export default CategoryDetail;
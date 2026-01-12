import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { ProductGrid } from '@/components/ProductGrid';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { fetchProductsByCategory, fetchSearchResults } from '@/lib/api';

const Books = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [params] = useSearchParams();
  const search = params.get('search');

  const { data = [], isLoading } = useQuery({
    queryKey: ['products', categoryId, search],
    queryFn: () => {
      if (search && search.trim().length > 0) {
        return fetchSearchResults(search);
      }
      return fetchProductsByCategory(categoryId ?? '1');
    },
  });

  
  const products = data?.items ?? [];

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <Breadcrumbs
          items={[
            { label: 'Books', href: '/categories' },
            ...(search ? [{ label: `Search: "${search}"` }] : []),
          ]}
        />

        <ProductGrid
          products={products}
          isLoading={isLoading}
          emptyMessage={
            search
              ? `No books found for "${search}"`
              : 'No books available in this category'
          }
        />
      </div>
    </Layout>
  );
};

export default Books;

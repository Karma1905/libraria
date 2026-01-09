import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, BookOpen, Sparkles, TrendingUp, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/ProductGrid';
import { CategoryCard } from '@/components/CategoryCard';
import { CategoryGridSkeleton } from '@/components/Skeletons';
import { Layout } from '@/components/Layout';
import { fetchCategories } from '@/lib/api';

const Index = () => {
  // Fetch Categories for the high-level headings requirement 
  const { data: categories, isLoading: categoriesLoading } = useQuery<any[]>({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
  });

  // NEW: Fetch Recently Viewed History from the backend 
  const { data: historyProducts, isLoading: historyLoading } = useQuery({
    queryKey: ['view-history'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/products/history?limit=4');
      if (!response.ok) return [];
      return response.json();
    },
    // We keep this data fresh to show immediate updates after browsing
    staleTime: 1000 * 30, 
  });

  // Fetch Featured Products (Homepage Grid) 
  const { data: featuredProducts, isLoading: productsLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/products');
      if (!response.ok) throw new Error('Backend route not found (404)');
      return response.json();
    },
    retry: 1,
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center animate-slide-up">
          <span className="inline-flex items-center gap-2 text-primary font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Discover Your Next Great Read
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            A World of Stories <span className="text-primary">Awaits You</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore our curated collection of books from World of Books.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg"><Link to="/books">Browse Collection</Link></Button>
            <Button asChild variant="outline" size="lg"><Link to="/categories">Explore Categories</Link></Button>
          </div>
        </div>
      </section>

      
      {historyProducts && historyProducts.length > 0 && (
        <section className="py-16 border-b bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-primary font-medium mb-2">
              <History className="h-4 w-4" />
              <span>Continue Browsing</span>
            </div>
            <h2 className="text-2xl font-semibold mb-8">Recently Viewed</h2>
            <ProductGrid 
              products={historyProducts} 
              isLoading={historyLoading} 
            />
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-8">Browse by Category</h2>
          {categoriesLoading ? (
            <CategoryGridSkeleton count={3} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories?.slice(0, 3).map((category: any) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-primary font-medium mb-2">
            <TrendingUp className="h-4 w-4" />
            <span>Top Rated</span>
          </div>
          <h2 className="text-2xl font-semibold mb-8">Featured Books</h2>

          <ProductGrid 
            products={featuredProducts} 
            isLoading={productsLoading} 
            emptyMessage="No books found. Check your backend console for errors."
          />
        </div>
      </section>
    </Layout>
  );
};

export default Index;
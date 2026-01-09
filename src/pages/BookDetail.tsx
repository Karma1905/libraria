import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductDetailSkeleton } from '@/components/Skeletons';
import { Button } from '@/components/ui/button';
import { fetchProductById } from '@/lib/api';
import { useCart } from '@/context/CartContext';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  // NEW: PERSIST USER BROWSING HISTORY 
  useEffect(() => {
    if (product) {
      const trackView = async () => {
        try {
          // Trigger backend view tracking with the required pathJson
          await fetch(`http://localhost:3001/products/${product.id}/view`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              path: `Home > Books > ${product.title}` 
            }),
          });
        } catch (error) {
          console.error("Failed to track view history:", error);
        }
      };
      trackView();
    }
  }, [product]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <ProductDetailSkeleton />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto py-16 text-center">
          <h1 className="text-xl mb-4">Book Not Found</h1>
          <Button asChild>
            <Link to="/categories">Back to Categories</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const coverImage = product.sourceId 
    ? `https://covers.openlibrary.org/b/isbn/${product.sourceId}-L.jpg` 
    : 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800';

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {/* Breadcrumb Navigation for Requirement 15 */}
        <Breadcrumbs items={[{ label: 'Books', href: '/books' }, { label: product.title }]} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
          {/* Image Section */}
          <div className="bg-muted rounded-xl overflow-hidden shadow-lg aspect-[3/4]">
            <img 
              src={coverImage} 
              alt={product.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800';
              }}
            />
          </div>

          {/* Info Section */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-foreground mb-2">{product.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">by {product.author || 'Unknown Author'}</p>
            
            <div className="bg-secondary/30 p-6 rounded-lg mb-8">
              <p className="text-3xl font-bold text-primary">
                £{product.price ? Number(product.price).toFixed(2) : '0.00'}
              </p>
              <p className="text-sm text-muted-foreground mt-1 italic">Free delivery on orders over £25</p>
            </div>

            <div className="prose prose-sm text-muted-foreground mb-8">
              <h3 className="text-foreground font-semibold">Description</h3>
              <p>{product.detail?.description || "No description available for this title."}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="flex-1 md:flex-none md:px-12"
                onClick={() => addToCart(product)}
              >
                Add to Basket
              </Button>
              <Button variant="outline" size="lg" className="flex-1 md:flex-none">
                Wishlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookDetail;
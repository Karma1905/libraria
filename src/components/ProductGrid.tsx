import { ProductCard } from './ProductCard';
import { ProductGridSkeleton } from './Skeletons';
import { cn } from '@/lib/utils';

/**
 * NOTE:
 * We intentionally keep `products` as `unknown` because
 * backend responses may not always be arrays at runtime.
 */
interface ProductGridProps {
  products: unknown;
  isLoading?: boolean;
  className?: string;
  emptyMessage?: string;
}

export const ProductGrid = ({
  products,
  isLoading = false,
  className,
  emptyMessage = 'No books found',
}: ProductGridProps) => {
  // Loading state
  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  // Runtime safety: ensure products is an array
  if (!Array.isArray(products)) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">{emptyMessage}</p>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">{emptyMessage}</p>
      </div>
    );
  }

  // Render grid
  return (
    <div
      className={cn(
        'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6',
        className,
      )}
    >
      {products.map((product: any, index: number) => (
        <div
          key={product.id ?? index}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

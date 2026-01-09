import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: any;
  className?: string;
}

/** * Open Library provides a reliable way to get book covers by ISBN.
 * If the ISBN is missing or image fails, it falls back to a generic book cover.
 */
const getBookCover = (isbn: string) => {
  if (!isbn || isbn.length < 10) return 'https://covers.openlibrary.org/b/isbn/9780141036144-M.jpg';
  return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
};

export const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <Link
      to={`/books/${product.id}`}
      className={cn(
        "group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border",
        className
      )}
    >
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        <img
          src={getBookCover(product.sourceId)}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // Ultimate fallback if Open Library also fails
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400';
          }}
        />
      </div>

      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-medium text-sm line-clamp-2 text-foreground group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <p className="text-xs text-muted-foreground">{product.author}</p>
        
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-base">£{Number(product.price).toFixed(2)}</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="text-xs">{product.detail?.ratingsAvg ?? '4.5'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const getCategoryThumbnail = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('fiction')) return 'https://images.unsplash.com/photo-1474933166133-d726f0815bb4?w=600&q=80';
  if (t.includes('children')) return 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80';
  if (t.includes('rare') || t.includes('antique')) return 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80';
  // General high-quality book fallback
  return 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&q=80';
};

export const CategoryCard = ({ category, className }: any) => {
  const displayImage = getCategoryThumbnail(category.title);

  return (
    <Link
      to={`/categories/${category.slug}`}
      className={cn(
        'group relative bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-card transition-all duration-300',
        className
      )}
    >
      <div className="aspect-[4/3] bg-muted overflow-hidden">
        <img
          src={displayImage}
          alt={category.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Improved overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end">
        <h3 className="text-white text-xl font-bold mb-1">
          {category.title}
        </h3>
        <span className="flex items-center gap-2 text-white/90 text-sm font-medium group-hover:translate-x-1 transition-transform">
          Browse Collection <ArrowRight className="h-4 w-4 text-primary" />
        </span>
      </div>
    </Link>
  );
};
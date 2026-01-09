import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1 text-sm mb-6", className)}>
      <Link 
        to="/" 
        className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only sm:not-sr-only">Home</span>
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          {item.href ? (
            <Link 
              to={item.href}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

/**
 * Dynamic Category Breadcrumbs
 * Use this when viewing a specific category list or product
 */
export const CategoryBreadcrumbs = ({ 
  currentCategory 
}: { 
  currentCategory?: { title: string; slug: string }; 
}) => {
  // Always start with the base Categories link
  const items: BreadcrumbItem[] = [
    { label: 'Categories', href: '/categories' }
  ];

  // If we have a specific category from the DB, add it to the trail
  if (currentCategory) {
    items.push({ 
      label: currentCategory.title, 
      href: undefined // Last item is not clickable
    });
  }

  return <Breadcrumbs items={items} />;
};
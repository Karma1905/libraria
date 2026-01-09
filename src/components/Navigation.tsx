import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, Search, ShoppingBasket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Books', href: '/books' },
  { label: 'Categories', href: '/categories' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  const { cart } = useCart(); 
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/books?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        
        
        <div className="flex w-1/4 justify-start">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold hidden sm:inline-block text-lg tracking-tight">Libraria</span>
          </Link>
        </div>

        
        <nav className="hidden md:flex items-center justify-center gap-8 text-sm font-medium flex-1">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'transition-colors hover:text-primary relative py-1',
                location.pathname === item.href 
                  ? 'text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary' 
                  : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        
        <div className="flex w-1/4 items-center justify-end gap-2 sm:gap-4">
          <form onSubmit={onSearch} className="relative hidden lg:flex w-full max-w-[180px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 pl-8 bg-muted/40 border-none focus-visible:ring-1"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </form>

          <div className="flex items-center gap-1">
            <Button asChild variant="ghost" size="icon" className="relative h-9 w-9">
              <Link to="/cart">
                <ShoppingBasket className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm">
                    {itemCount}
                  </span>
                )}
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t bg-background p-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-4 text-center">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-muted-foreground hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
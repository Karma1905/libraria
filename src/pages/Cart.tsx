import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <ShoppingBag className="h-8 w-8 text-primary" />
          Your Basket
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-muted/30 rounded-2xl border-2 border-dashed">
            <p className="text-xl text-muted-foreground mb-6">Your basket is empty</p>
            <Button asChild>
              <Link to="/categories">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* List of Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-sm"
                >
                  <img 
                    src={item.imageUrl || 'https://covers.openlibrary.org/b/isbn/9780141036144-L.jpg'} 
                    alt={item.title} 
                    className="w-20 h-28 object-cover rounded-md shadow-sm"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                    <p className="text-primary font-bold">£{item.price.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
              
              <Button variant="outline" size="sm" onClick={clearCart} className="mt-4">
                Clear Basket
              </Button>
            </div>

            {/* Order Summary */}
            <div className="bg-card p-6 rounded-2xl border border-border shadow-md h-fit">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>£{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">£{totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full py-6 text-lg" size="lg">
                Proceed to Checkout
              </Button>
              <Link 
                to="/categories" 
                className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue Browsing
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
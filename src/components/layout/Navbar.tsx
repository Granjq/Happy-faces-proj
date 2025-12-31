import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, User, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Collections", href: "/collections" },
  { name: "My Designs", href: "/design/mine" }, // Added to signal platform depth
  { name: "How It Works", href: "/how-it-works" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, cartTotal, items, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();

  const handleCheckoutClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setIsCartOpen(false);
      setIsAuthModalOpen(true);
    } else {
      setIsCartOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/10 transition-all duration-300">
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="HappyShop Logo" className="w-8 h-8 object-contain rounded-full" />
            <span className="font-display text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
              T<span className="text-primary">FASHION</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "nav-link text-sm font-medium tracking-wide hover:text-primary transition-colors",
                  location.pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions Group */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop Auth Actions */}
            {isAuthenticated ? (
              <div className="hidden lg:flex items-center gap-4">
                <span className="text-sm font-medium text-charcoal hidden md:block">Hi, {user?.name.split(' ')[0]}</span>
                <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-red-500">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="hidden lg:flex items-center gap-2 text-muted-foreground hover:text-foreground"
                onClick={() => setIsAuthModalOpen(true)}
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            )}

            {/* Cart Dropdown Container */}
            <div
              className="relative"
              onMouseEnter={() => setIsCartOpen(true)}
              onMouseLeave={() => setIsCartOpen(false)}
            >
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Button>

              {/* Cart Popover */}
              <AnimatePresence>
                {isCartOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-black/5 overflow-hidden z-[60]"
                  >
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <span className="font-display font-medium text-charcoal">My Cart ({cartCount})</span>
                      <span className="text-xs text-muted-foreground">Free Delivery</span>
                    </div>

                    <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                      {items.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground text-sm flex flex-col items-center gap-2">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                            <ShoppingBag className="w-5 h-5 opacity-40" />
                          </div>
                          <p>Your bag is empty.</p>
                          <Button variant="link" size="sm" className="text-primary h-auto p-0" onClick={() => setIsCartOpen(false)}>Start Designing</Button>
                        </div>
                      ) : (
                        <div className="p-2 space-y-1">
                          {items.map((item) => (
                            <div key={item.id} className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg group transition-colors">
                              <div className="w-16 h-16 rounded bg-gray-100 flex-shrink-0 overflow-hidden border border-black/5">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <h4 className="text-sm font-medium text-charcoal truncate pr-2">{item.name}</h4>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }}
                                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-1">{item.fabricType} • {item.length}m</p>
                                <div className="flex justify-between items-end mt-1">
                                  <span className="text-xs text-muted-foreground bg-white border border-gray-100 px-1.5 py-0.5 rounded">Qty: {item.quantity}</span>
                                  <span className="text-sm font-medium">KES {(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {items.length > 0 && (
                      <div className="p-4 bg-gray-50/50 border-t border-gray-100">
                        <div className="flex justify-between mb-4">
                          <span className="text-sm text-muted-foreground">Subtotal</span>
                          <span className="font-medium text-charcoal">KES {cartTotal.toLocaleString()}</span>
                        </div>
                        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg shadow-primary/20">
                          <Link to="/checkout" onClick={handleCheckoutClick}>Checkout</Link>
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-background border-b border-border animate-fade-in">

            <div className="container mx-auto px-6 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block nav-link py-2",
                    location.pathname === item.href && "text-primary"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex gap-4 pt-4 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1">
                  Account
                </Button>
                <Button variant="hero" size="sm" className="flex-1">
                  Cart (0)
                </Button>
              </div>
            </div>
          </div>
        )
        }
      </header>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}

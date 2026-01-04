import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, User, ShoppingBag, Trash2, Home, Layers, Palette, HelpCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Shop", href: "/shop", icon: ShoppingBag },
  { name: "Collections", href: "/collections", icon: Layers },
  { name: "My Designs", href: "/design/mine", icon: Palette },
  { name: "How It Works", href: "/how-it-works", icon: HelpCircle },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, cartTotal, items, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const handleCheckoutClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setIsCartOpen(false);
      setIsAuthModalOpen(true);
    } else {
      setIsCartOpen(false);
    }
  };

  const MobileDrawer = () => (
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[190] lg:hidden"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
            className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-[320px] bg-white z-[200] shadow-2xl flex flex-col lg:hidden"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex justify-between items-start mb-6">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 -ml-2 rounded-full hover:bg-gray-200/50 transition-colors"
                >
                  <X className="w-6 h-6 text-charcoal" />
                </button>
                <div className="text-right">
                  <span className="block text-lg font-display font-medium text-charcoal">
                    {isAuthenticated ? `Hi, ${user?.name.split(' ')[0]} 👋` : "Welcome 👋"}
                  </span>
                  {isAuthenticated && (
                    <span className="text-xs text-muted-foreground">{user?.email || "user@tfashion.com"}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
                      isActive
                        ? "bg-primary/5 text-primary font-medium"
                        : "text-muted-foreground hover:bg-gray-50 hover:text-charcoal"
                    )}
                  >
                    <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-gray-400 group-hover:text-charcoal")} />
                    <span className="text-base">{item.name}</span>
                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                  </Link>
                )
              })}
            </nav>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/30 space-y-2">
              {/* Quick Cart Link in Drawer */}
              <button
                onClick={() => { setMobileMenuOpen(false); setIsCartOpen(true); }}
                className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-muted-foreground hover:bg-gray-50 hover:text-charcoal transition-all"
              >
                <ShoppingBag className="w-5 h-5 text-gray-400" />
                <span>Cart ({cartCount})</span>
              </button>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-muted-foreground hover:bg-gray-50 hover:text-charcoal transition-all"
                  >
                    <User className="w-5 h-5 text-gray-400" />
                    <span>Account</span>
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-red-500/80 hover:bg-red-50 hover:text-red-600 transition-all font-medium"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setIsAuthModalOpen(true); setMobileMenuOpen(false); }}
                  className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-primary font-medium hover:bg-primary/5 transition-all"
                >
                  <User className="w-5 h-5" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/10 transition-all duration-300">
        <nav className="container mx-auto flex items-center justify-between py-3 px-4 lg:py-4 lg:px-6">

          {/* ---- MOBILE LAYOUT (Start) ---- */}
          <div className="flex lg:hidden items-center justify-between w-full">
            {/* Left Group: Menu + Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-charcoal hover:bg-gray-100 rounded-full transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>

              <Link to="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="Tfashion Logo" className="w-7 h-7 object-contain rounded-full" />
                <span className="font-display text-lg font-semibold tracking-tight">
                  T<span className="text-primary">FASHION</span>
                </span>
              </Link>
            </div>

            {/* Right Group: Greeting + Cart */}
            <div className="flex items-center gap-3">
              {/* Greeting */}
              <Link to={isAuthenticated ? "/account" : "#"} className="flex flex-col items-end">
                <span className="font-display font-medium text-charcoal/90 text-sm">
                  {isAuthenticated ? `Hi, ${user?.name.split(' ')[0]} 👋` : "Hi, Guest 👋"}
                </span>
              </Link>

              {/* Cart */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-charcoal hover:text-primary transition-colors hover:bg-transparent p-0"
                  onClick={() => setIsCartOpen(!isCartOpen)}
                >
                  <ShoppingBag className="h-6 w-6" />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full font-bold shadow-sm"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </Button>
              </div>
            </div>
          </div>
          {/* ---- MOBILE LAYOUT (End) ---- */}


          {/* ---- DESKTOP LAYOUT (Start) ---- */}

          {/* Logo (Desktop Only) */}
          <Link to="/" className="hidden lg:flex items-center gap-2 group">
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

          {/* Actions Group (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-3 sm:gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-charcoal">Hi, {user?.name.split(' ')[0]}</span>
                <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-red-500">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
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
          {/* ---- DESKTOP LAYOUT (End) ---- */}

        </nav>
      </header>

      {/* Mobile Drawer Component - Placed outside header to avoid stacking context issues */}
      <MobileDrawer />

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}

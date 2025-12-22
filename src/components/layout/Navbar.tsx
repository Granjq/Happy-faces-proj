import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, User, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Collections", href: "/collections" },
  { name: "My Designs", href: "/design/mine" }, // Added to signal platform depth
  { name: "How It Works", href: "/how-it-works" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
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

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <User className="h-4 w-4" />
            <span>Sign In</span>
          </Button>
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full font-bold">
              0
            </span>
          </Button>
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
      )}
    </header>
  );
}

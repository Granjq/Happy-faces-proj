import { Link } from "react-router-dom";
import { ArrowRight, Instagram, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  shop: [
    { name: "All Products", href: "/shop" },
    { name: "Bags", href: "/shop?category=bags" },
    { name: "Clothing", href: "/shop?category=clothing" },
    { name: "Accessories", href: "/shop?category=accessories" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Impact", href: "/impact" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
  ],
  support: [
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Shipping", href: "/shipping" },
    { name: "Returns", href: "/returns" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-charcoal text-charcoal-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-charcoal-foreground/10">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-medium mb-2">
                Stay in the loop
              </h3>
              <p className="text-charcoal-foreground/70 font-body">
                New designs, exclusive drops, and production updates.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-4 py-3 bg-transparent border border-charcoal-foreground/20 text-charcoal-foreground placeholder:text-charcoal-foreground/40 font-body focus:outline-none focus:border-primary"
              />
              <Button variant="terracotta" className="ml-0 border-l-0">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display text-xl font-semibold tracking-tight">
              TEXTILE<span className="text-primary">STUDIO</span>
            </Link>
            <p className="mt-4 text-charcoal-foreground/70 font-body text-sm leading-relaxed">
              AI-powered fabric design meets artisan production. Create custom textiles that tell your story.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-charcoal-foreground/60 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-charcoal-foreground/60 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-charcoal-foreground/60 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="label-text text-charcoal-foreground/60 mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-charcoal-foreground/80 hover:text-primary transition-colors font-body text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="label-text text-charcoal-foreground/60 mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-charcoal-foreground/80 hover:text-primary transition-colors font-body text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="label-text text-charcoal-foreground/60 mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-charcoal-foreground/80 hover:text-primary transition-colors font-body text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-foreground/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-charcoal-foreground/60 text-sm font-body">
            <p>© 2024 TextileStudio. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

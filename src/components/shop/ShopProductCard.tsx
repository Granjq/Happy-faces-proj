import { motion } from "framer-motion";
import { Eye, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Product } from "@/components/home/FeaturedProducts";

interface ShopProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export function ShopProductCard({ product, onQuickView, onAddToCart }: ShopProductCardProps) {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-transparent hover:border-black/5 hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
      
      {/* 1. Image Container with "Fabric Tag" Overlay */}
      <div 
        className="relative aspect-[4/5] overflow-hidden bg-[#F8F9FA] cursor-pointer" 
        onClick={() => onQuickView(product)}
      >
        {/* Fabric Identity Tag */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-20 group-hover:scale-105 transition-transform duration-300">
            <Badge 
              className={cn(
                "rounded-full pl-1 pr-3 py-1 text-[10px] font-bold uppercase tracking-wider border-none shadow-sm flex items-center gap-2", 
                "bg-white text-charcoal hover:bg-white" // Clean white pill style
              )}
            >
              {/* Fabric Thumbnail Icon */}
              {product.fabricImage && (
                <div className="w-5 h-5 rounded-full overflow-hidden border border-black/10">
                  <img src={product.fabricImage} alt="Fabric" className="w-full h-full object-cover" />
                </div>
              )}
              {product.tag}
            </Badge>
          </div>
        )}

        {/* Fabric Preview Background (Revealed on Hover) */}
        {product.fabricImage && (
          <div 
            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ 
              backgroundImage: `url(${product.fabricImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
        
        {/* Main Product Image */}
        <div className="relative z-10 w-full h-full transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2 group-hover:mix-blend-multiply">
           <img
            src={product.image}
            alt={product.name}
            className={cn(
              "w-full h-full object-cover",
              product.isSoldOut && "opacity-60 grayscale"
            )}
          />
        </div>

        {/* Hover: "Inspired by..." Text */}
        <div className="absolute bottom-12 left-0 right-0 p-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <p className="text-white text-xs font-medium text-center drop-shadow-md">
           {product.intent ? `“${product.intent}”` : "Inspired by local traditions"}
          </p>
        </div>

        {/* Quick View Button */}
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
           {/* Button visual only, click handled by parent div */}
           <div className="bg-white/90 backdrop-blur text-charcoal px-4 py-2 rounded-full font-medium text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
             Quick View
           </div>
        </div>
      </div>

      {/* 2. Details Section */}
      <div className="p-5 flex flex-col flex-grow relative z-20 bg-white">
        <h3 
          className="font-display text-lg font-bold text-charcoal leading-tight group-hover:text-primary transition-colors cursor-pointer"
          onClick={() => onQuickView(product)}
        >
          {product.name}
        </h3>
        
        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
          {product.category} Collection
        </p>

        <div className="flex items-baseline gap-2 mt-2 mb-4">
          <span className="font-semibold text-base text-charcoal">{product.price}</span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through decoration-red-500/30">{product.oldPrice}</span>
          )}
        </div>

        <div className="mt-auto space-y-2">
          <Button
            className="w-full rounded-full bg-charcoal text-white hover:bg-primary transition-all shadow-lg shadow-charcoal/5 group-hover:shadow-primary/20"
            disabled={product.isSoldOut}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            {product.isSoldOut ? "Notify Me" : "Add to Cart"}
          </Button>

          <Link
            to="/design"
            className="group/link flex items-center justify-center text-[10px] uppercase font-bold tracking-wider text-muted-foreground hover:text-primary transition-colors py-1"
          >
            View Fabric Story
            <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}

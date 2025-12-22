import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ShopHero } from "@/components/shop/ShopHero";
import { ProductQuickView } from "@/components/shop/ProductQuickView";
import { Product } from "@/components/home/FeaturedProducts";

import { SlidersHorizontal, ShoppingBag, Eye, PenTool, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// Assets
import pattern1 from "@/assets/pattern-1.jpg";
import pattern2 from "@/assets/pattern-2.jpg";
import pattern3 from "@/assets/pattern-3.jpg";
import pattern4 from "@/assets/pattern-4.jpg";
import catWomen from "@/assets/cat-women.png";
import catMen from "@/assets/cat-men.png";
import catChildren from "@/assets/cat-children.png";
import catBags from "@/assets/cat-bags.png";

const categories = ["All", "Men", "Women", "Kids"];
const designs = ["All", "Bold", "Minimal", "Traditional", "Modern"];

const allProducts: Product[] = [
  {
    id: "1",
    name: "Savannah Tote – Canvas",
    price: "KES 14,800",
    oldPrice: "KES 16,500",
    category: "Women",
    image: catBags,
    fabricImage: pattern1,
    tag: "AI Fabric",
    tagColor: "bg-primary text-primary-foreground",
    intent: "Made from an AI-designed wildlife pattern",
    rating: 4.8,
    reviews: 124,
    stockStatus: "Only 3 in stock!"
  },
  {
    id: "2",
    name: "Nairobi Commuter Backpack",
    price: "KES 28,500",
    category: "Men",
    image: catMen,
    fabricImage: pattern2,
    tag: "Utility",
    tagColor: "bg-charcoal text-white",
    intent: "Durable weave for daily movement",
    rating: 5.0,
    reviews: 18
  },
  {
    id: "3",
    name: "Market Day Carry-All",
    price: "KES 12,500",
    oldPrice: "KES 15,000",
    category: "Women",
    image: catWomen,
    fabricImage: pattern3,
    tag: "Community Fabric",
    tagColor: "bg-orange-500 text-white",
    intent: "Pattern by local artisan: @MamaWanjiku",
    rating: 4.6,
    reviews: 86,
    stockStatus: "Selling fast"
  },
  {
    id: "4",
    name: "Mini Explorer Pack",
    price: "KES 8,500",
    category: "Kids",
    image: catChildren,
    fabricImage: pattern4,
    tag: "Limited Print",
    tagColor: "bg-blue-600 text-white",
    intent: "Bright, playful geometric prints",
    rating: 4.9,
    reviews: 42,
    isSoldOut: true
  },
  {
    id: "5",
    name: "Weekend Duffle",
    price: "KES 32,000",
    category: "Men",
    image: catBags, // Placeholder duplicate
    fabricImage: pattern2,
    intent: "High capacity woven travel bag",
    rating: 4.7,
    reviews: 34
  },
  {
    id: "6",
    name: "Laptop Sleeve",
    price: "KES 4,500",
    category: "Women",
    image: pattern1, // Placeholder
    fabricImage: pattern1,
    tag: "New",
    intent: "Protective padded sleeve",
    rating: 4.5,
    reviews: 12
  }
];

export default function ShopPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDesign, setSelectedDesign] = useState("All");

  // Quick View State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const filteredProducts = allProducts.filter(p => {
    if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
    return true;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-transparent hover:border-black/5 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F8F9FA] cursor-pointer" onClick={() => handleProductClick(product)}>
        {product.tag && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className={cn("rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider border-none shadow-sm", product.tagColor || "bg-charcoal text-white")}>
              {product.tag}
            </Badge>
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply",
            product.isSoldOut && "opacity-60 grayscale"
          )}
        />
        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
          <Button size="sm" variant="secondary" className="shadow-xl rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-4 h-4 mr-2" />
            Quick View
          </Button>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex gap-4 mb-3">
          {product.fabricImage && (
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-100 hover:scale-110 transition-transform">
                <img src={product.fabricImage} alt="Fabric" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
          <div>
            <h3 className="font-display text-lg font-bold text-charcoal leading-tight group-hover:text-primary transition-colors cursor-pointer" onClick={() => handleProductClick(product)}>
              {product.name}
            </h3>
            {product.intent && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {product.intent}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-4 pl-[3.5rem]">
          <span className="font-semibold text-base text-charcoal">{product.price}</span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through decoration-red-500/30">{product.oldPrice}</span>
          )}
        </div>

        <div className="mt-auto space-y-2">
          <Button
            className="w-full rounded-full bg-charcoal text-white hover:bg-primary transition-colors shadow-lg shadow-charcoal/10"
            disabled={product.isSoldOut}
            onClick={() => handleProductClick(product)}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            {product.isSoldOut ? "Sold Out" : "Buy Bag"}
          </Button>

          <div className="text-center">
            <Link
              to="/design"
              className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors group/link"
            >
              <PenTool className="w-3 h-3 mr-1.5" />
              Use this fabric
              <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <ShopHero />

      {/* Main Catalog Section */}
      <div className="bg-background pt-8 pb-24 border-t border-black/5" id="catalogue">
        <div className="container mx-auto px-6">

          {/* Catalog Header & Filters - Compact Mobile */}
          <div className="sticky top-[73px] z-30 bg-background/80 backdrop-blur-md py-3 -mx-6 px-6 mb-8">
            <div className="flex flex-row items-center justify-between gap-2 overflow-hidden">
              {/* Category Pills - Scrollable */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1 mask-linear-fade">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-full transition-all h-8 text-xs whitespace-nowrap px-4 border-charcoal/10",
                      selectedCategory === cat ? "shadow-sm" : "bg-transparent hover:bg-secondary"
                    )}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              {/* Filter Icon Button */}
              <Button
                variant="outline"
                size="icon"
                className="flex-shrink-0 w-8 h-8 rounded-full border-charcoal/20 bg-background"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* Expandable Filter Area */}
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="overflow-hidden mt-3 pt-3 border-t border-dashed border-black/10"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mr-1">Style:</span>
                  {designs.map(d => (
                    <button
                      key={d}
                      onClick={() => setSelectedDesign(d)}
                      className={cn(
                        "px-2 py-1 text-[10px] rounded-full border transition-colors",
                        selectedDesign === d ? "bg-charcoal text-white border-charcoal" : "border-charcoal/20 hover:border-charcoal hover:bg-secondary"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Products Grid - Desktop */}
          <div className="hidden lg:grid grid-cols-4 gap-6 gap-y-12">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {/* Products Carousel - Mobile/Tablet */}
          <div className="lg:hidden">
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent className="">
                {filteredProducts.map((product) => (
                  <CarouselItem key={product.id} className="basis-[85%] sm:basis-[50%] pl-4">
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

        </div>
      </div>

      {/* Product Popup Modal */}
      <ProductQuickView
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />

    </Layout>
  );
}

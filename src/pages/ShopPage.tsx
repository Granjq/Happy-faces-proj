import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ShopHero } from "@/components/shop/ShopHero";
import { ProductQuickView } from "@/components/shop/ProductQuickView";
import { CatalogueSection } from "@/components/shop/CatalogueSection";
import { Product } from "@/components/home/FeaturedProducts";

// Assets
import pattern1 from "@/assets/pattern-1.jpg";
import pattern2 from "@/assets/pattern-2.jpg";
import pattern3 from "@/assets/pattern-3.jpg";
import pattern4 from "@/assets/pattern-4.jpg";
import catWomen from "@/assets/cat-women.png";
import catMen from "@/assets/cat-men.png";
import catChildren from "@/assets/cat-children.png";
import catBags from "@/assets/cat-bags.png";

// Mock Data
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
    image: catBags,
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
    image: pattern1,
    fabricImage: pattern1,
    tag: "New",
    intent: "Protective padded sleeve",
    rating: 4.5,
    reviews: 12
  }
];

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleAddToCart = (product: Product) => {
    console.log("Added to cart:", product.name);
    // In a real app, dispatch to cart context/store here
    // And show a toast
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <ShopHero />

      {/* SECTION 1: Shop by Season */}
      <CatalogueSection
        id="seasonal"
        title="Seasonal Edit"
        subtitle="Curated for the weather"
        filters={[
          { id: "summer", label: "Summer Carry" },
          { id: "rainy", label: "Rainy Season" },
          { id: "holiday", label: "Festive / Holiday" },
          { id: "staples", label: "All-Season Staples" },
        ]}
        products={allProducts.slice(0, 4)} // Mock subset
        onQuickView={handleQuickView}
        onAddToCart={handleAddToCart}
      />

      {/* SECTION 2: Shop by Event & Lifestyle */}
      <CatalogueSection
        id="lifestyle"
        title="Designed for the Moment"
        subtitle="Find your flow"
        featured={true}
        filters={[
          { id: "travel", label: "Travel & Weekend" },
          { id: "gym", label: "Gym & Active" },
          { id: "work", label: "Work & Commute" },
          { id: "campus", label: "School & Campus" },
        ]}
        products={[allProducts[1], allProducts[4], allProducts[5], allProducts[0]]} // Mock subset
        onQuickView={handleQuickView}
        onAddToCart={handleAddToCart}
      />

      {/* SECTION 3: Shop by Person */}
      <CatalogueSection
        id="person"
        title="Designed for Every Body"
        subtitle="For everyone"
        filters={[
          { id: "women", label: "Women" },
          { id: "men", label: "Men" },
          { id: "kids", label: "Kids" },
          { id: "unisex", label: "Unisex" },
          { id: "gifting", label: "Gifting" },
        ]}
        products={allProducts}
        onQuickView={handleQuickView}
        onAddToCart={handleAddToCart}
      />

      {/* Product Popup Modal */}
      <ProductQuickView
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />

    </Layout>
  );
}

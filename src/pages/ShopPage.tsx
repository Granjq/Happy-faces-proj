import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, Heart } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import pattern1 from "@/assets/pattern-1.jpg";
import pattern2 from "@/assets/pattern-2.jpg";
import pattern3 from "@/assets/pattern-3.jpg";
import pattern4 from "@/assets/pattern-4.jpg";
import pattern5 from "@/assets/pattern-5.jpg";
import pattern6 from "@/assets/pattern-6.jpg";

const categories = ["All", "Bags", "Clothing", "Accessories", "Fabric"];
const genders = ["All", "Women", "Men", "Unisex"];
const fabricTypes = ["All", "Cotton", "Silk", "Linen", "Polyester"];
const origins = ["All", "AI Original", "Ready-made"];

const products = [
  {
    id: 1,
    name: "Heritage Tote",
    price: 148,
    category: "Bags",
    gender: "Unisex",
    fabric: "Cotton",
    origin: "AI Original",
    image: pattern1,
  },
  {
    id: 2,
    name: "Kimono Jacket",
    price: 285,
    category: "Clothing",
    gender: "Women",
    fabric: "Silk",
    origin: "AI Original",
    image: pattern2,
  },
  {
    id: 3,
    name: "Wrap Dress",
    price: 225,
    category: "Clothing",
    gender: "Women",
    fabric: "Linen",
    origin: "Ready-made",
    image: pattern3,
  },
  {
    id: 4,
    name: "Crossbody Bag",
    price: 125,
    category: "Bags",
    gender: "Unisex",
    fabric: "Cotton",
    origin: "AI Original",
    image: pattern4,
  },
  {
    id: 5,
    name: "Wide Leg Pants",
    price: 185,
    category: "Clothing",
    gender: "Women",
    fabric: "Linen",
    origin: "Ready-made",
    image: pattern5,
  },
  {
    id: 6,
    name: "Silk Scarf",
    price: 95,
    category: "Accessories",
    gender: "Unisex",
    fabric: "Silk",
    origin: "AI Original",
    image: pattern6,
  },
  {
    id: 7,
    name: "Custom Fabric",
    price: 28,
    category: "Fabric",
    gender: "Unisex",
    fabric: "Cotton",
    origin: "AI Original",
    image: pattern1,
    unit: "/meter",
  },
  {
    id: 8,
    name: "Camp Collar Shirt",
    price: 165,
    category: "Clothing",
    gender: "Men",
    fabric: "Cotton",
    origin: "Ready-made",
    image: pattern2,
  },
];

export default function ShopPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedFabric, setSelectedFabric] = useState("All");
  const [selectedOrigin, setSelectedOrigin] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== "All" && product.category !== selectedCategory) return false;
    if (selectedGender !== "All" && product.gender !== selectedGender) return false;
    if (selectedFabric !== "All" && product.fabric !== selectedFabric) return false;
    if (selectedOrigin !== "All" && product.origin !== selectedOrigin) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedGender("All");
    setSelectedFabric("All");
    setSelectedOrigin("All");
    setPriceRange([0, 500]);
    setSearchQuery("");
  };

  const hasActiveFilters = 
    selectedCategory !== "All" || 
    selectedGender !== "All" || 
    selectedFabric !== "All" || 
    selectedOrigin !== "All" ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 500;

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border">
          <div className="container mx-auto px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="label-text text-primary mb-4">The Collection</p>
              <h1 className="section-heading mb-4">Shop</h1>
              <p className="body-large text-muted-foreground max-w-xl mx-auto">
                Curated pieces crafted with AI-designed textiles and artisan production.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="border-b border-border sticky top-[73px] bg-background z-30">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 border border-border bg-transparent font-body text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} products
                </span>
                <Button
                  variant={showFilters ? "hero" : "outline"}
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-2 w-2 h-2 bg-primary rounded-full" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border bg-card"
          >
            <div className="container mx-auto px-6 py-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {/* Category */}
                <div>
                  <h4 className="label-text mb-4">Category</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "px-3 py-1.5 text-sm font-body border transition-colors",
                          selectedCategory === cat
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <h4 className="label-text mb-4">Gender</h4>
                  <div className="flex flex-wrap gap-2">
                    {genders.map((gender) => (
                      <button
                        key={gender}
                        onClick={() => setSelectedGender(gender)}
                        className={cn(
                          "px-3 py-1.5 text-sm font-body border transition-colors",
                          selectedGender === gender
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary"
                        )}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fabric */}
                <div>
                  <h4 className="label-text mb-4">Fabric</h4>
                  <div className="flex flex-wrap gap-2">
                    {fabricTypes.map((fabric) => (
                      <button
                        key={fabric}
                        onClick={() => setSelectedFabric(fabric)}
                        className={cn(
                          "px-3 py-1.5 text-sm font-body border transition-colors",
                          selectedFabric === fabric
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary"
                        )}
                      >
                        {fabric}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Origin */}
                <div>
                  <h4 className="label-text mb-4">Origin</h4>
                  <div className="flex flex-wrap gap-2">
                    {origins.map((origin) => (
                      <button
                        key={origin}
                        onClick={() => setSelectedOrigin(origin)}
                        className={cn(
                          "px-3 py-1.5 text-sm font-body border transition-colors",
                          selectedOrigin === origin
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary"
                        )}
                      >
                        {origin}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear */}
                <div className="flex items-end">
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="h-4 w-4 mr-2" />
                      Clear filters
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        <div className="container mx-auto px-6 py-12">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[3/4] overflow-hidden mb-4 bg-secondary relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button className="absolute top-4 right-4 w-10 h-10 bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
                      <Heart className="h-5 w-5" />
                    </button>
                    {product.origin === "AI Original" && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-body uppercase tracking-wider">
                        AI Original
                      </span>
                    )}
                  </div>
                  <p className="label-text text-muted-foreground mb-1">{product.category}</p>
                  <h3 className="font-display text-lg font-medium mb-1">{product.name}</h3>
                  <p className="font-body text-primary font-medium">
                    ${product.price}{product.unit || ""}
                  </p>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

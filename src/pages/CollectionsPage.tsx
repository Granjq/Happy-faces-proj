import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Sparkles, ArrowDown } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CollectionsMasonryGrid, CollectionItem } from "@/components/shop/CollectionsMasonryGrid";

import pattern1 from "@/assets/pattern-1.jpg";
import pattern2 from "@/assets/pattern-2.jpg";
import pattern3 from "@/assets/pattern-3.jpg";
import pattern4 from "@/assets/pattern-4.jpg";

const collectionsData: CollectionItem[] = [
  {
    id: "african-heritage",
    name: "African Heritage",
    description: "Bold geometric patterns inspired by traditional African textiles — kente, mudcloth, and Ankara prints reimagined.",
    image: pattern1,
    productCount: 24,
    tags: ["Culture", "Geometric"]
  },
  {
    id: "pacific-islands",
    name: "Pacific Islands",
    description: "Samoan and Polynesian motifs celebrating Pacific Island culture. Traditional tapa patterns meet modern textile production.",
    image: pattern2,
    productCount: 18,
    tags: ["Island", "Ocean"]
  },
  {
    id: "botanical-modern",
    name: "Botanical Modern",
    description: "Contemporary floral designs ranging from delicate line art to bold tropical prints. Nature reimagined through AI creativity.",
    image: pattern3,
    productCount: 32,
    tags: ["Nature", "Floral"]
  },
  {
    id: "geometric-minimal",
    name: "Geometric Minimal",
    description: "Clean lines, mathematical precision, architectural influence. For those who prefer understated elegance.",
    image: pattern4,
    productCount: 21,
    tags: ["Modern", "Abstract"]
  },
  // Duplicate for grid density demo
  {
    id: "urban-nomad",
    name: "Urban Nomad",
    description: "Functional patterns for the city dweller. Gritty textures meets high-end fashion.",
    image: pattern2,
    productCount: 15,
    tags: ["City", "Tech"]
  },
  {
    id: "sunset-hues",
    name: "Sunset Hues",
    description: "Warm gradients and emotional color palettes derived from savanna sunsets.",
    image: pattern1,
    productCount: 9,
    tags: ["Color", "Warm"]
  }
];

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCollections = collectionsData.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Layout>
      {/* 1. Collections Hero (Add Search + Intent) */}
      <section className="relative pt-20 pb-12 bg-background overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 right-0 h-[30vh] bg-gradient-to-b from-secondary/50 to-transparent z-0 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="flex items-center justify-center gap-2 text-primary text-sm font-medium mb-3 label-text">
              <Sparkles className="w-4 h-4" />
              Design Gallery
            </p>
            <h1 className="editorial-heading text-4xl md:text-5xl mb-6">
              Curated Stories.
            </h1>

            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto mb-8 group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground">
                <Search className="w-4 h-4 group-focus-within:text-primary transition-colors" />
              </div>
              <Input
                type="text"
                placeholder="Search styles..."
                className="pl-10 pr-10 h-11 rounded-full border-black/10 text-base shadow-sm focus:ring-1 focus:ring-primary/20 focus:border-primary transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <Button variant="ghost" size="icon" className="rounded-full w-7 h-7">
                  <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
              <span>Trending:</span>
              <button onClick={() => setSearchQuery('African')} className="hover:text-primary underline decoration-dotted">African Heritage</button>
              <button onClick={() => setSearchQuery('Floral')} className="hover:text-primary underline decoration-dotted">Floral</button>
              <button onClick={() => setSearchQuery('Modern')} className="hover:text-primary underline decoration-dotted">Modern</button>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 2. Pinterest-Style Grid & Mobile Carousel */}
      <section className="pb-32 bg-background min-h-screen">
        <div className="container mx-auto px-6">
          <div className="mb-8 text-sm text-muted-foreground">
            Showing {filteredCollections.length} collections
          </div>

          <CollectionsMasonryGrid collections={filteredCollections} />
        </div>
      </section>

    </Layout>
  );
}

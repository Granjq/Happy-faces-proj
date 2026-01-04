import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShopProductCard } from "./ShopProductCard";
import { Product } from "@/components/home/FeaturedProducts";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface FilterOption {
    id: string;
    label: string;
}

interface CatalogueSectionProps {
    id?: string;
    title: string;
    subtitle?: string;
    filters: FilterOption[]; // e.g., ["Summer Carry", "Rainy Season", "Festive"]
    products: Product[];
    onQuickView: (product: Product) => void;
    onAddToCart?: (product: Product) => void;
    featured?: boolean; // Highlight style for the section
}

export function CatalogueSection({
    id,
    title,
    subtitle,
    filters,
    products,
    onQuickView,
    onAddToCart,
    featured = false
}: CatalogueSectionProps) {
    const [activeFilter, setActiveFilter] = useState(filters[0].id);

    // In a real app, you might filter 'products' based on 'activeFilter' here.
    // For demo purposes, we might just shuffle or show all, 
    // but let's assume the parent passes all products and we manually filter or 
    // just pretend to filter for the visual transition.

    // Mock filter logic for visual change:
    const displayProducts = products;

    return (
        <section id={id} className={cn("py-16 scroll-mt-20", featured ? "bg-secondary/30" : "bg-background")}>
            <div className="container mx-auto px-6">

                {/* Section Header */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-xl">
                        {subtitle && <p className="label-text text-primary mb-2">{subtitle}</p>}
                        <h2 className="editorial-heading text-3xl md:text-4xl">{title}</h2>
                    </div>

                    {/* Internal Navigation Chips */}
                    <div className="flex overflow-x-auto pb-2 no-scrollbar gap-2 mask-linear-fade md:mask-none">
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={cn(
                                    "whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                                    activeFilter === filter.id
                                        ? "bg-charcoal text-white border-charcoal"
                                        : "bg-white text-muted-foreground border-transparent hover:border-black/10 hover:bg-secondary"
                                )}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid (Desktop) / Carousel (Mobile) */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Desktop Grid */}
                        <div className="hidden lg:grid grid-cols-4 gap-x-6 gap-y-12">
                            {displayProducts.map((product, idx) => (
                                <motion.div
                                    key={`${product.id}-${activeFilter}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <ShopProductCard
                                        product={product}
                                        onQuickView={onQuickView}
                                        onAddToCart={onAddToCart}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Mobile Carousel */}
                        <div className="lg:hidden -mx-6 px-6">
                            <Carousel opts={{ align: "start", loop: false }} className="w-full">
                                <CarouselContent>
                                    {displayProducts.map((product) => (
                                        <CarouselItem key={product.id} className="basis-[85%] sm:basis-[50%] md:basis-[40%] pl-4">
                                            <ShopProductCard
                                                product={product}
                                                onQuickView={onQuickView}
                                                onAddToCart={onAddToCart}
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </div>

                    </motion.div>
                </AnimatePresence>

            </div>
        </section>
    );
}

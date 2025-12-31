import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Eye, PenTool, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

// Types for our product
export interface Product {
    id: string;
    name: string;
    price: string;
    oldPrice?: string;
    category: string;
    image: string;

    // New fields for Fabrix/Bag UX
    fabricImage?: string;
    tag?: string; // "AI Fabric", "Community Fabric", "Limited Print"
    tagColor?: string;
    intent?: string; // Micro-copy like "Made from an AI-designed wildlife pattern"

    rating: number;
    reviews: number;
    stockStatus?: string;
    isSoldOut?: boolean;
}

interface FeaturedProductsProps {
    products: Product[];
    title?: string;
    subtitle?: string;
}

export function FeaturedProducts({ products, title = "Choose Your Canvas", subtitle = "Our Bag Catalogue" }: FeaturedProductsProps) {

    // Product Card Component
    const ProductCard = ({ product }: { product: Product }) => (
        <div className="group relative bg-white rounded-xl overflow-hidden border border-transparent hover:border-black/5 hover:shadow-xl transition-all duration-300 h-full flex flex-col">

            {/* Main Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F8F9FA]">
                {/* Top-left Tag */}
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

                {/* Hover Actions (Desktop) */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <Button size="icon" variant="secondary" className="rounded-full w-10 h-10 shadow-lg bg-white hover:bg-black hover:text-white transition-colors" title="Quick View">
                        <Eye className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Details Section */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Fabric Swatch & Title Row */}
                <div className="flex gap-4 mb-3">
                    {product.fabricImage && (
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-100 group-hover:scale-110 transition-transform">
                                <img src={product.fabricImage} alt="Fabric used" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    )}

                    <div>
                        <h3 className="font-display text-lg font-bold text-charcoal leading-tight group-hover:text-primary transition-colors">
                            {product.name}
                        </h3>
                        {product.intent && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {product.intent}
                            </p>
                        )}
                    </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4 pl-[3.5rem]">
                    <span className="font-semibold text-base text-charcoal">{product.price}</span>
                    {product.oldPrice && (
                        <span className="text-xs text-muted-foreground line-through decoration-red-500/30">{product.oldPrice}</span>
                    )}
                </div>

                {/* Actions */}
                <div className="mt-auto space-y-2">
                    {/* Primary Button */}
                    <Button className="w-full rounded-full bg-charcoal text-white hover:bg-primary transition-colors shadow-lg shadow-charcoal/10" disabled={product.isSoldOut}>
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        {product.isSoldOut ? "Sold Out" : "Buy Bag"}
                    </Button>

                    {/* Secondary Link */}
                    <div className="text-center">
                        <Link
                            to="/design"
                            className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors group/link"
                        >
                            <PenTool className="w-3 h-3 mr-1.5" />
                            Use this fabric to design your own
                            <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section id="bag-catalogue" className="py-12 bg-background border-t border-black/5">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                {/* Header */}
                {(title || subtitle) && (
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <motion.div
                            className="max-w-xl"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            {subtitle && <p className="label-text text-primary mb-3">{subtitle}</p>}
                            {title && <h2 className="section-heading">{title}</h2>}
                            <p className="body-large text-muted-foreground mt-4">
                                Explore our catalogue of made-to-order bags, or pick a fabric and create your own custom piece.
                            </p>
                        </motion.div>

                        <div className="md:text-right">
                            <Button variant="outline" className="rounded-full px-6 border-charcoal/20 hover:bg-charcoal hover:text-white transition-colors">
                                View All Bags
                            </Button>
                        </div>
                    </div>
                )}

                {/* DESKTOP GRID */}
                <div className="hidden lg:grid grid-cols-4 gap-6 gap-y-12">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>

                {/* MOBILE/TABLET CAROUSEL */}
                <div className="lg:hidden relative">
                    <Carousel
                        opts={{
                            align: "center",
                            loop: false,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4 pb-4">
                            {products.map((product) => (
                                <CarouselItem key={product.id} className="pl-4 basis-[85%] sm:basis-[60%] md:basis-[45%]">
                                    <ProductCard product={product} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <div className="hidden sm:block">
                            <CarouselPrevious className="left-2 bg-white/90 backdrop-blur border-none shadow-lg hover:bg-primary hover:text-white" />
                            <CarouselNext className="right-2 bg-white/90 backdrop-blur border-none shadow-lg hover:bg-primary hover:text-white" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

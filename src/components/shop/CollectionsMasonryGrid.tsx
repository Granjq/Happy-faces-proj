import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { toast } from "sonner";

// We'll define a type for the Collection Item here or import it
export interface CollectionItem {
    id: string;
    name: string;
    description: string;
    image: string;
    productCount: number;
    tags?: string[];
}

interface CollectionsMasonryGridProps {
    collections: CollectionItem[];
}

export function CollectionsMasonryGrid({ collections }: CollectionsMasonryGridProps) {

    const handleAddToCart = (e: React.MouseEvent, item: CollectionItem) => {
        e.preventDefault();
        e.stopPropagation();
        toast.success(`${item.name} Collection added to cart`, {
            description: `${item.productCount} items included in this bundle.`
        });
    };

    const CollectionCard = ({ item }: { item: CollectionItem }) => (
        <div className="relative group overflow-hidden rounded-2xl mb-6 break-inside-avoid bg-gray-50 transform transition-all duration-500 hover:shadow-2xl">
            {/* Image Layer */}
            <div className="relative aspect-[3/4] overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-2 opacity-80 text-xs uppercase tracking-widest font-medium">
                    <span>{item.productCount} Items</span>
                    {item.tags?.map(tag => (
                        <span key={tag} className="border border-white/30 px-2 py-0.5 rounded-full text-[10px]">{tag}</span>
                    ))}
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-medium mb-2 leading-tight">{item.name}</h3>
                <p className="text-sm text-white/80 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.description}
                </p>

                {/* Hover Actions */}
                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 pt-2">
                    <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full shadow-lg h-9 bg-white text-charcoal hover:bg-primary hover:text-white transition-colors border-none"
                        onClick={(e) => handleAddToCart(e, item)}
                    >
                        Add Collection <ShoppingBag className="w-3.5 h-3.5 ml-2" />
                    </Button>

                    <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full h-9 bg-transparent border-white/30 text-white hover:bg-white hover:text-charcoal backdrop-blur-md"
                        asChild
                    >
                        <Link to="/checkout">
                            Buy Now <ArrowRight className="w-3.5 h-3.5 ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Masonry Grid using Columns */}
            <div className="hidden lg:block columns-2 md:columns-3 gap-6 space-y-6">
                {collections.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <CollectionCard item={item} />
                    </motion.div>
                ))}
            </div>

            {/* Mobile Carousel */}
            <div className="lg:hidden">
                <Carousel opts={{ align: "start", loop: false }} className="w-full">
                    <CarouselContent className="">
                        {collections.map((item) => (
                            <CarouselItem key={item.id} className="pl-4 basis-[85%]">
                                <CollectionCard item={item} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </>
    );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, ShoppingBag, Truck, ShieldCheck, Sun, Info } from "lucide-react";
import { Product } from "@/components/home/FeaturedProducts";

interface ProductQuickViewProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
    const navigate = useNavigate();
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    if (!product) return null;

    // Mock additional images since our product data might only have one
    // In a real app, this would come from the product object
    const images = [
        product.image,
        product.fabricImage || product.image,
        product.image, // Duplicate for demo
        product.fabricImage || product.image,
    ].filter(Boolean) as string[];

    const handleAddToCart = () => {
        setIsAddingToCart(true);
        // Simulate API call
        setTimeout(() => {
            setIsAddingToCart(false);
            // Maybe show toast here
            onClose();
        }, 800);
    };

    const handleBuyNow = () => {
        onClose();
        navigate("/checkout");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-none shadow-2xl">
                <div className="grid md:grid-cols-2 h-[80vh] md:h-auto overflow-y-auto md:overflow-hidden">

                    {/* Left: Image Carousel */}
                    <div className="relative bg-secondary/20 min-h-[300px] md:h-full">
                        <Carousel className="w-full h-full">
                            <CarouselContent>
                                {images.map((img, i) => (
                                    <CarouselItem key={i} className="h-[400px] md:h-[600px]">
                                        <img
                                            src={img}
                                            alt={`${product.name} view ${i + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            {/* Floating Controls */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                {/* Dots indicators could go here */}
                            </div>
                            <CarouselPrevious className="left-4 bg-white/10 backdrop-blur-md border-transparent text-white hover:bg-white/20" />
                            <CarouselNext className="right-4 bg-white/10 backdrop-blur-md border-transparent text-white hover:bg-white/20" />
                        </Carousel>

                        {/* Tag Overlay */}
                        {product.tag && (
                            <div className="absolute top-6 left-6">
                                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${product.tagColor || "bg-black text-white"}`}>
                                    {product.tag}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Right: Details */}
                    <div className="p-8 md:p-10 flex flex-col h-full bg-white">
                        <DialogHeader>
                            <div className="flex items-center gap-2 text-primary text-xs font-bold tracking-widest uppercase mb-3">
                                <Sun className="w-4 h-4" />
                                <span>Best for: Summer & Daily Travel</span>
                            </div>
                            <DialogTitle className="font-display text-3xl md:text-4xl text-charcoal mb-2">
                                {product.name}
                            </DialogTitle>
                        </DialogHeader>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-200"}`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground font-medium underline">
                                {product.reviews} reviews
                            </span>
                        </div>

                        {/* Price */}
                        <div className="mb-8">
                            <p className="font-display text-2xl font-medium text-charcoal">
                                {product.price}
                                {product.oldPrice && (
                                    <span className="text-lg text-muted-foreground line-through ml-3 decoration-red-500/20">
                                        {product.oldPrice}
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Description / Story */}
                        <div className="space-y-6 mb-8 flex-grow">
                            <div>
                                <h4 className="font-bold text-sm mb-2 text-charcoal">The Fabric Story</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {product.intent || "This piece features a unique AI-generated textile pattern, inspired by local narratives and crafted with sustainable materials."}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-secondary/10 p-4 rounded-xl">
                                    <Truck className="w-5 h-5 text-primary mb-2" />
                                    <p className="text-xs font-medium text-charcoal">Global Shipping</p>
                                    <p className="text-[10px] text-muted-foreground">3-5 business days</p>
                                </div>
                                <div className="bg-secondary/10 p-4 rounded-xl">
                                    <ShieldCheck className="w-5 h-5 text-primary mb-2" />
                                    <p className="text-xs font-medium text-charcoal">Quality Promise</p>
                                    <p className="text-[10px] text-muted-foreground">Hand-finished details</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-4 mt-auto">
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-12 border-charcoal/10 hover:border-charcoal hover:bg-transparent text-charcoal"
                                onClick={handleAddToCart}
                                disabled={isAddingToCart || product.isSoldOut}
                            >
                                {isAddingToCart ? "Adding..." : "Add to Cart"}
                            </Button>
                            <Button
                                size="lg"
                                className="h-12 bg-charcoal text-white hover:bg-primary"
                                onClick={handleBuyNow}
                                disabled={product.isSoldOut}
                            >
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                {product.isSoldOut ? "Sold Out" : "Buy Now"}
                            </Button>
                        </div>

                        <p className="text-center text-xs text-muted-foreground mt-4">
                            Secure checkout powered by Stripe
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

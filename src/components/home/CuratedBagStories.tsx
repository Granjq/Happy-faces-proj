import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import sectionWomen from "@/assets/cat-women.png";
import sectionMen from "@/assets/cat-men.png";
import sectionChildren from "@/assets/cat-children.png";
import sectionSeasonal from "@/assets/cat-bags.png"; // Fallback/Placeholder
import pattern1 from "@/assets/pattern-1.jpg";
import pattern2 from "@/assets/pattern-2.jpg";
import pattern3 from "@/assets/pattern-3.jpg";
import pattern4 from "@/assets/pattern-4.jpg";

const collections = [
    {
        id: "women",
        title: "Everyday Carry",
        subtitle: "Designed for Her Days",
        intent: "Elegant • Expressive • Cultural",
        description: "Designed fabrics shaped into everyday companions.",
        image: sectionWomen,
        fabric: pattern1,
        theme: "bg-[#F5F0EB]", // Soft elegant tone
        link: "/collections/women"
    },
    {
        id: "men",
        title: "Utility Meets Culture",
        subtitle: "Built to Carry",
        intent: "Earthy • Bold • Structured",
        description: "Functional gear with deep cultural roots.",
        image: sectionMen,
        fabric: pattern2,
        theme: "bg-[#E8ECE9]", // Muted earthy tone
        link: "/collections/men"
    },
    {
        id: "children",
        title: "Little Stories",
        subtitle: "Printed for Play",
        intent: "Playful • Bright • Durable",
        description: "Designed fabrics that grow with curious minds.",
        image: sectionChildren,
        fabric: pattern3,
        theme: "bg-[#FFF0EB]", // Warm playful tone
        link: "/collections/children"
    },
    {
        id: "seasonal",
        title: "Summer Carry",
        subtitle: "Season Essentials",
        intent: "Vibrant • Light • Fresh",
        description: "New stories for the changing seasons.",
        image: sectionSeasonal,
        fabric: pattern4,
        theme: "bg-[#F0F7FF]", // Cool fresh tone
        link: "/collections/seasonal"
    }
];

export function CuratedBagStories() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.02)_100%)] pointer-events-none" />

            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-primary font-medium text-xs tracking-[0.2em] uppercase mb-3 block">
                        Curated Bag Stories
                    </span>
                    <h2 className="editorial-heading text-4xl md:text-5xl text-charcoal mb-6">
                        Designed for Real Life
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        We curated these fabric-driven collections so you don’t have to think too hard.
                        Find the story that fits your journey.
                    </p>
                </motion.div>

                {/* Desktop Grid */}
                <div className="hidden md:grid md:grid-cols-2 gap-8">
                    {collections.map((collection, index) => (
                        <motion.div
                            key={collection.id}
                            className="group relative rounded-3xl overflow-hidden cursor-pointer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className={cn("absolute inset-0 transition-colors duration-500", collection.theme)} />

                            <div className="relative grid grid-cols-1 md:grid-cols-2 h-full min-h-[400px]">
                                {/* Text Side */}
                                <div className="p-8 md:p-10 flex flex-col justify-center relative z-10 order-2 md:order-1">
                                    <div className="mb-auto">
                                        <span className="inline-block px-3 py-1 rounded-full bg-white/60 backdrop-blur-md border border-black/5 text-[10px] font-bold tracking-widest uppercase text-charcoal mb-4">
                                            {collection.subtitle}
                                        </span>
                                        <h3 className="font-display text-3xl font-medium text-charcoal mb-3 group-hover:text-primary transition-colors">
                                            {collection.title}
                                        </h3>
                                        <p className="font-body text-sm font-medium text-charcoal/60 mb-2">
                                            {collection.intent}
                                        </p>
                                        <p className="text-muted-foreground text-sm leading-relaxed max-w-[250px]">
                                            {collection.description}
                                        </p>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-black/5 flex items-center gap-2 text-charcoal font-medium text-sm group/btn">
                                        <span>Explore this collection</span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </div>
                                </div>

                                {/* Image Side */}
                                <div className="relative h-[300px] md:h-auto order-1 md:order-2 overflow-hidden">
                                    <div className="absolute inset-0 bg-secondary/10" />
                                    <img
                                        src={collection.image}
                                        alt={collection.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Fabric Overlay */}
                                    <div className="absolute bottom-6 right-6 w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden group-hover:scale-110 transition-transform duration-500">
                                        <img
                                            src={collection.fabric}
                                            alt="Fabric detail"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/10" />
                                        <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Carousel */}
                <div className="md:hidden relative px-4">
                    <Carousel opts={{ align: "start", loop: true }} className="w-full">
                        <CarouselContent className="-ml-4">
                            {collections.map((collection) => (
                                <CarouselItem key={collection.id} className="pl-4 basis-[90%]">
                                    <div className="group relative rounded-3xl overflow-hidden cursor-pointer h-full">
                                        <div className={cn("absolute inset-0", collection.theme)} />
                                        <div className="relative flex flex-col h-full min-h-[480px]">
                                            {/* Image - Top on mobile */}
                                            <div className="relative h-[240px] overflow-hidden">
                                                <img
                                                    src={collection.image}
                                                    alt={collection.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full border-2 border-white shadow-lg overflow-hidden">
                                                    <img src={collection.fabric} className="w-full h-full object-cover" />
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 flex flex-col flex-grow relative z-10">
                                                <span className="inline-block px-2 py-1 rounded-full bg-white/60 text-[9px] font-bold tracking-widest uppercase text-charcoal mb-3 self-start">
                                                    {collection.subtitle}
                                                </span>
                                                <h3 className="font-display text-2xl font-medium text-charcoal mb-2">
                                                    {collection.title}
                                                </h3>
                                                <p className="font-body text-xs font-medium text-charcoal/60 mb-2">
                                                    {collection.intent}
                                                </p>
                                                <p className="text-muted-foreground text-sm flex-grow">
                                                    {collection.description}
                                                </p>

                                                <div className="mt-6 pt-6 border-t border-black/5 flex items-center justify-between text-charcoal font-medium text-sm">
                                                    <span>Explore</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="flex justify-end gap-2 mt-4 pr-4">
                            <CarouselPrevious className="static translate-y-0" />
                            <CarouselNext className="static translate-y-0" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import catWomen from "@/assets/cat-women.png";
import catMen from "@/assets/cat-men.png";
import catBags from "@/assets/cat-bags.png";
import pattern1 from "@/assets/pattern-1.jpg";
import pattern3 from "@/assets/pattern-3.jpg";

const categories = [
    {
        id: "bags",
        title: "Artisan Bags",
        subtitle: "Hand-crafted functionality",
        image: catBags,
        colSpan: "col-span-12 md:col-span-6 lg:col-span-8",
        rowSpan: "row-span-2",
    },
    {
        id: "fabrics",
        title: "Premium Fabrics",
        subtitle: "By the meter",
        image: pattern1,
        colSpan: "col-span-6 md:col-span-6 lg:col-span-4",
        rowSpan: "row-span-1",
    },
    {
        id: "women",
        title: "Women's Wear",
        subtitle: "Tailored to you",
        image: catWomen,
        colSpan: "col-span-6 md:col-span-3 lg:col-span-4",
        rowSpan: "row-span-1",
    },
    {
        id: "men",
        title: "Men's Collection",
        subtitle: "Modern classics",
        image: catMen,
        colSpan: "col-span-12 md:col-span-3 lg:col-span-4",
        rowSpan: "row-span-1",
    },
    {
        id: "accessories",
        title: "Accessories",
        subtitle: "The perfect finish",
        image: pattern3,
        colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
        rowSpan: "row-span-1",
    },
];

export function InteractiveCatalog() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section className="pt-4 pb-24 bg-background overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <h2 className="section-heading mb-4">Curated Collections</h2>
                        <p className="body-large text-muted-foreground">
                            Explore our diverse range of products, from raw fabrics to finished artisan pieces.
                        </p>
                    </div>
                    <Button variant="link" className="text-primary hover:text-primary/80 group">
                        View Full Catalog <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Button>
                </div>

                <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
                    {categories.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className={`relative group overflow-hidden rounded-xl cursor-pointer ${item.colSpan} ${item.rowSpan}`}
                            onMouseEnter={() => setHoveredId(item.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 bg-gray-200">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-sm font-medium opacity-90 mb-1 tracking-wide uppercase">{item.subtitle}</p>
                                    <h3 className="font-display text-2xl md:text-3xl font-medium">{item.title}</h3>

                                    <div className={`mt-4 overflow-hidden transition-all duration-300 ${hoveredId === item.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <Button size="sm" variant="secondary" className="rounded-full">
                                            Explore {item.title}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

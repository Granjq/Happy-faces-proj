import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Briefcase, Laptop, Plane, Gift, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Assets
import pattern1 from "@/assets/pattern-1.jpg";
import pattern2 from "@/assets/pattern-2.jpg";
import pattern3 from "@/assets/pattern-3.jpg";
import pattern4 from "@/assets/pattern-4.jpg";

const heroPatterns = [pattern1, pattern2, pattern3, pattern4];

const catalogueChips = [
    { label: "Backpacks", icon: ShoppingBag, id: "backpacks" },
    { label: "Totes & Carry-Alls", icon: Briefcase, id: "totes" },
    { label: "Laptop & Tablet", icon: Laptop, id: "tech" },
    { label: "Travel & Gym", icon: Plane, id: "travel" },
    { label: "Gifting", icon: Gift, id: "gifting", highlight: true },
    { label: "Kids", icon: Baby, id: "kids" },
];

export function ShopHero() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative bg-charcoal text-white overflow-hidden min-h-[400px] md:h-[45vh] flex flex-col justify-center">
            {/* Layer 3: Visual Motion Background */}
            <div className="absolute inset-0 z-0">
                {heroPatterns.map((pattern, index) => (
                    <motion.div
                        key={index}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${pattern})` }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.4, 0] }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            delay: index * 2,
                            ease: "easeInOut",
                        }}
                    />
                ))}
                {/* Overlays for readability */}
                <div className="absolute inset-0 bg-charcoal/80 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
            </div>

            <div className="container mx-auto px-6 relative z-20 pt-8 pb-8">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Layer 1: Headline (Clarity + Authority) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-8"
                    >
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-[0.9] tracking-tight mb-4">
                            Print-led bags,<br />
                            <span className="text-white/50 italic">designed by culture.</span>
                        </h1>
                        <p className="font-body text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
                            African, Pacific & global pattern stories — crafted into bags for every journey.
                        </p>
                    </motion.div>

                    {/* Layer 2: Hero Interaction (Catalogue Chips) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="flex flex-wrap justify-center gap-2 md:gap-3"
                    >
                        {catalogueChips.map((chip) => (
                            <motion.button
                                key={chip.id}
                                onClick={() => scrollToSection(chip.id)}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className={cn(
                                    "group relative overflow-hidden px-4 py-2 rounded-full flex items-center gap-1.5 transition-all duration-300",
                                    chip.highlight
                                        ? "bg-white text-charcoal shadow-[0_0_20px_rgba(255,255,255,0.3)] border border-white"
                                        : "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/30"
                                )}
                            >
                                {/* Hover Fabric Texture Reveal */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-[url('@/assets/pattern-1.jpg')] bg-cover bg-center mix-blend-overlay" />

                                <chip.icon className={cn("w-3.5 h-3.5", chip.highlight ? "text-primary" : "text-white/70 group-hover:text-white")} />
                                <span className="text-xs md:text-sm font-medium tracking-wide">{chip.label}</span>
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Decorative Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10" />
        </section>
    );
}


import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import pattern1 from "@/assets/pattern-1.jpg";
import pattern2 from "@/assets/pattern-2.jpg";
import pattern3 from "@/assets/pattern-3.jpg";
import pattern4 from "@/assets/pattern-4.jpg";

const heroPatterns = [pattern1, pattern2, pattern3, pattern4];

export function ShopHero() {
    return (
        <section className="relative overflow-hidden bg-charcoal text-white min-h-[450px] lg:h-[70vh] flex items-center">
            {/* Background Animation Layer (Subtle) */}
            <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-4 h-full">
                    {heroPatterns.map((img, i) => (
                        <motion.div
                            key={i}
                            className="h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${img})` }}
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 4, repeat: Infinity, delay: i * 1, ease: "easeInOut" }}
                        />
                    ))}
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-2 text-primary mb-6">
                            <Sparkles className="w-5 h-5" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase">Fabric First Design</span>
                        </div>

                        <h1 className="font-display text-5xl md:text-8xl font-medium leading-[1] mb-6 tracking-tight">
                            Designed as fabric.<br />
                            <span className="text-white/40">Made to carry.</span>
                        </h1>

                        <p className="font-body text-xl text-white/70 mb-0 max-w-lg leading-relaxed">
                            Every product here begins as a custom textile — generated with AI and brought to life by artisans.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side Visual Highlight */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block overflow-hidden">
                <div className="h-full w-full bg-white/5 backdrop-blur-sm border-l border-white/10 p-8 flex flex-col justify-center">
                    <div className="space-y-6">
                        {/* Simulated "Fabric Swatches" floating */}
                        <motion.div
                            className="ml-auto w-48 aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 rotate-3"
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <img src={pattern1} className="w-full h-full object-cover" alt="Fabric" />
                        </motion.div>
                        <motion.div
                            className="ml-auto mr-12 w-48 aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 -rotate-6"
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <img src={pattern3} className="w-full h-full object-cover" alt="Fabric" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

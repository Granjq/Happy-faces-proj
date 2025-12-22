import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import pattern1 from "@/assets/pattern-1.jpg";
import pattern2 from "@/assets/pattern-2.jpg";
import pattern3 from "@/assets/pattern-3.jpg";
import pattern4 from "@/assets/pattern-4.jpg";

const patterns = [pattern1, pattern2, pattern3, pattern4];

export function LivePatternCanvas() {
    const [currentPattern, setCurrentPattern] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPattern((prev) => (prev + 1) % patterns.length);
        }, 6000); // Slow morph every 6 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden bg-secondary/20">
            {/* Texture Overlay */}
            <div className="absolute inset-0 z-10 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')]" />

            {/* Living Patterns */}
            <div className="absolute inset-0 flex items-center justify-center">
                {patterns.map((pattern, index) => (
                    <motion.div
                        key={index}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${pattern})` }}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{
                            opacity: index === currentPattern ? 1 : 0,
                            scale: index === currentPattern ? 1 : 1.1,
                            rotate: index === currentPattern ? 0 : 2
                        }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                ))}

                {/* Soft Vignette / Gradient Overlay to ensure text readability if needed (though text is on left) */}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent z-10" />
            </div>

            {/* Floating Elements / "Alive" indicators */}
            <div className="absolute bottom-8 right-8 z-20 flex gap-2">
                {patterns.map((_, idx) => (
                    <motion.div
                        key={idx}
                        className={`w-2 h-2 rounded-full ${idx === currentPattern ? 'bg-primary' : 'bg-primary/20'}`}
                        layout
                    />
                ))}
            </div>
        </div>
    );
}


import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import catBags from "@/assets/cat-bags.png"; // Re-using an asset for visual connection

export function PromotionPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const navigate = useNavigate();

    // Reset standard trigger logic to ensure it fires once per session or reload
    useEffect(() => {
        const handleScroll = () => {
            if (hasTriggered) return;

            // Target element: "FeaturedProducts" section
            // Since we can't easily pass refs across the heavy lifting, we'll look for an ID or just estimate scroll depth.
            // But best practice is to attach an ID to the target section in HomePage.
            // Let's assume we add id="bag-catalogue" to the FeaturedProducts section.
            const element = document.getElementById("bag-catalogue");

            if (element) {
                const rect = element.getBoundingClientRect();
                // Trigger if the top of the section is within the viewport (e.g. < 60% of viewport height)
                const isInView = rect.top < window.innerHeight * 0.7 && rect.bottom >= 0;

                if (isInView) {
                    setIsVisible(true);
                    setHasTriggered(true);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasTriggered]);

    const handleDismiss = () => {
        setIsVisible(false);
    };

    const handleShopNow = () => {
        setIsVisible(false);
        navigate("/shop?category=bags");
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 100, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 100, scale: 0.9 }}
                    transition={{ type: "spring", bounce: 0.4 }}
                    className="fixed bottom-6 left-6 z-[90] max-w-sm w-[calc(100%-3rem)] md:w-96"
                >
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-black/5 relative flex">
                        {/* Close Button */}
                        <button
                            onClick={handleDismiss}
                            className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-gray-100 text-gray-500 transition-colors z-20"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Image Side */}
                        <div className="w-1/3 bg-gray-100 relative overflow-hidden hidden sm:block">
                            <img
                                src={catBags}
                                alt="Bag Promo"
                                className="w-full h-full object-cover mix-blend-multiply opacity-90 hover:scale-110 transition-transform duration-700"
                            />
                            {/* Decorative Badge */}
                            <div className="absolute top-0 left-0 bg-primary/90 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg">
                                20% OFF
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="flex-1 p-5 sm:pl-4 relative">
                            {/* Mobile Badge */}
                            <div className="sm:hidden absolute top-4 left-4 bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 inline-block">
                                20% OFF
                            </div>

                            <div className="sm:hidden h-4" /> {/* Spacer */}

                            <h3 className="font-display text-lg font-bold text-charcoal mb-1 leading-tight">
                                Custom Bag Weekend
                            </h3>
                            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                                Create your own tote or backpack with any fabric design. Limited time offer.
                            </p>

                            <Button
                                onClick={handleShopNow}
                                size="sm"
                                className="w-full rounded-full bg-charcoal text-white hover:bg-primary shadow-lg shadow-charcoal/10 text-xs h-9"
                            >
                                <ShoppingBag className="w-3 h-3 mr-2" />
                                Shop Bags
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

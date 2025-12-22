import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import sectionWomen from "@/assets/cat-women.png";
import sectionMen from "@/assets/cat-men.png";
import sectionChildren from "@/assets/cat-children.png";
// Placeholder for thumbnails - usually these would be different product shots
import thumb1 from "@/assets/pattern-1.jpg";
import thumb2 from "@/assets/pattern-2.jpg";
import thumb3 from "@/assets/pattern-3.jpg";

const shopCollections = [
    {
        id: "travel",
        title: "Travel & Everyday",
        description: "Durable fabrics, bold patterns, built for daily movement.",
        heroImage: sectionMen,
        thumbnails: [thumb1, thumb2, thumb3],
        theme: "bg-[#F4F4F5]", // Zinc-100
        link: "/shop?category=travel"
    },
    {
        id: "school",
        title: "School & Kids",
        description: "Playful patterns and bright colors for curious minds.",
        heroImage: sectionChildren,
        thumbnails: [thumb3, thumb1, thumb2], // varied order
        theme: "bg-[#FFF1F2]", // Rose-50
        link: "/shop?category=school"
    },
    {
        id: "minimal",
        title: "Minimal & Earth",
        description: "Subtle prints and neutral palettes with an artisan vibe.",
        heroImage: sectionWomen,
        thumbnails: [thumb2, thumb3, thumb1],
        theme: "bg-[#F0FDF4]", // Green-50
        link: "/shop?category=minimal"
    }
];

export function ShopCollections() {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    <h2 className="section-heading mb-4">Curated Bag Stories</h2>
                    <p className="text-muted-foreground text-lg">Collections designed for specific moments in life.</p>
                </div>

                <div className="space-y-8">
                    {shopCollections.map((collection, index) => (
                        <motion.div
                            key={collection.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={cn("rounded-3xl overflow-hidden p-8 lg:p-12", collection.theme)}
                        >
                            <div className="flex flex-col lg:flex-row gap-12 items-center">
                                {/* Hero Image */}
                                <div className="w-full lg:w-1/3 aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden relative shadow-lg">
                                    <img src={collection.heroImage} alt={collection.title} className="w-full h-full object-cover" />
                                </div>

                                {/* Content & Thumbnails */}
                                <div className="w-full lg:w-2/3 flex flex-col justify-between h-full">
                                    <div>
                                        <h3 className="font-display text-3xl md:text-4xl font-medium mb-4">{collection.title}</h3>
                                        <p className="text-lg text-muted-foreground mb-8 max-w-md">
                                            {collection.description}
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex gap-4 overflow-x-auto pb-2">
                                            {collection.thumbnails.map((thumb, i) => (
                                                <div key={i} className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 border-white shadow-sm hover:scale-105 transition-transform cursor-pointer">
                                                    <img src={thumb} alt="Fabric detail" className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                            <div className="w-24 h-24 flex-shrink-0 rounded-xl border-2 border-dashed border-black/10 flex items-center justify-center text-xs text-muted-foreground font-medium">
                                                +5 more
                                            </div>
                                        </div>

                                        <Button variant="outline" className="rounded-full px-8 border-black/10 hover:bg-black hover:text-white transition-colors bg-white/50 backdrop-blur-sm">
                                            Explore collection
                                            <ArrowRight className="ml-2 w-4 h-4" />
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

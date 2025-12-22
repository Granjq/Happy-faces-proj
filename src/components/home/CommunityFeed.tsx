import { motion } from "framer-motion";
import { Heart, User } from "lucide-react";
import pattern2 from "@/assets/pattern-2.jpg";
import pattern3 from "@/assets/pattern-3.jpg";
import pattern4 from "@/assets/pattern-4.jpg";
import pattern5 from "@/assets/pattern-5.jpg";
import catWomen from "@/assets/cat-women.png";

const designs = [
    {
        id: 1,
        image: pattern2,
        author: "Sarah K.",
        prompt: "Sunset over Mara",
        likes: 124
    },
    {
        id: 2,
        image: pattern3,
        author: "David M.",
        prompt: "Nairobi geometric",
        likes: 89
    },
    {
        id: 3,
        image: catWomen,
        author: "Amani Designs",
        prompt: "Coastal florals",
        likes: 256
    },
    {
        id: 4,
        image: pattern4,
        author: "Joy W.",
        prompt: "Abstract beads",
        likes: 67
    },
    {
        id: 5,
        image: pattern5,
        author: "Kofi A.",
        prompt: "Kente remix",
        likes: 190
    }
];

export function CommunityFeed() {
    return (
        <section className="py-24 bg-background border-t border-border/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="section-heading mb-4">Designed by creators like you</h2>
                    <p className="text-muted-foreground">Join thousands of designers turning words into wearable art.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {designs.map((design, index) => (
                        <motion.div
                            key={design.id}
                            className="group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <img
                                src={design.image}
                                alt={design.prompt}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                                <p className="text-white font-medium text-sm mb-1 line-clamp-1">"{design.prompt}"</p>
                                <div className="flex items-center justify-between text-white/80 text-xs">
                                    <div className="flex items-center gap-1">
                                        <User className="w-3 h-3" /> {design.author}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Heart className="w-3 h-3 fill-white/50" /> {design.likes}
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

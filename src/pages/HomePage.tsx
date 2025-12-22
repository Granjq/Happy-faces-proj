import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Layers, Truck, Palette, Repeat, Scissors, Eye, ShieldCheck, Globe, Clock, Wand2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroFabric from "@/assets/hero-fabric.jpg";
import pattern1 from "@/assets/pattern-1.jpg";
import pattern2 from "@/assets/pattern-2.jpg";
import pattern3 from "@/assets/pattern-3.jpg";
import pattern4 from "@/assets/pattern-4.jpg";
import pattern5 from "@/assets/pattern-5.jpg";
// pattern6 removed as requested (kept comment)
import catWomen from "@/assets/cat-women.png";
import catMen from "@/assets/cat-men.png";
import catChildren from "@/assets/cat-children.png";
import catBags from "@/assets/cat-bags.png";
import { HeroFabricBuilder } from "@/components/home/HeroFabricBuilder";
import { FeaturedProducts, type Product } from "@/components/home/FeaturedProducts";
import { CuratedBagStories } from "@/components/home/CuratedBagStories";
import { CommunityFeed } from "@/components/home/CommunityFeed";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const patterns = [pattern1, pattern2, pattern3, pattern4, pattern5];

const steps = [
  {
    number: "01",
    title: "Design",
    description: "Describe your idea. AI generates fabric patterns inspired by global cultures and modern design.",
    icon: Sparkles
  },
  {
    number: "02",
    title: "Customize",
    description: "Adjust colors, scale, and repeat. Preview on fabric and fashion products.",
    icon: Palette
  },
  {
    number: "03",
    title: "Produce",
    description: "Order fabric by the meter or turn designs into finished pieces. Printed locally with transparent pricing.",
    icon: Truck
  }
];

// Updated for Bag Catalogue
const products: Product[] = [
  {
    id: "1",
    name: "Savannah Tote – Canvas",
    price: "KES 14,800",
    oldPrice: "KES 16,500",
    category: "Bags",
    image: catBags, // Placeholder for bag image
    fabricImage: pattern1,
    tag: "AI Fabric",
    tagColor: "bg-primary text-primary-foreground",
    intent: "Made from an AI-designed wildlife pattern",
    rating: 4.8,
    reviews: 124,
    stockStatus: "Only 3 in stock!"
  },
  {
    id: "2",
    name: "Nairobi Commuter Backpack",
    price: "KES 28,500",
    category: "Men",
    image: catMen, // Placeholder
    fabricImage: pattern2,
    tag: "Utility",
    tagColor: "bg-charcoal text-white",
    intent: "Durable weave for daily movement",
    rating: 5.0,
    reviews: 18
  },
  {
    id: "3",
    name: "Market Day Carry-All",
    price: "KES 12,500",
    oldPrice: "KES 15,000",
    category: "Women",
    image: catWomen, // Placeholder
    fabricImage: pattern3,
    tag: "Community Fabric",
    tagColor: "bg-orange-500 text-white",
    intent: "Pattern by local artisan: @MamaWanjiku",
    rating: 4.6,
    reviews: 86,
    stockStatus: "Selling fast"
  },
  {
    id: "4",
    name: "Mini Explorer Pack",
    price: "KES 8,500",
    category: "Children",
    image: catChildren, // Placeholder
    fabricImage: pattern4,
    tag: "Limited Print",
    tagColor: "bg-blue-600 text-white",
    intent: "Bright, playful geometric prints",
    rating: 4.9,
    reviews: 42,
    isSoldOut: true
  }
];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section - Creation First */}
      <section className="relative min-h-[auto] lg:min-h-[95vh] flex items-start lg:items-center justify-center pt-[25px] lg:pt-[25px] pb-6 lg:pb-12 overflow-hidden bg-background">
        <div className="container mx-auto px-4 lg:px-6 relative z-10 w-full max-w-7xl mt-0 lg:mt-0">
          <HeroFabricBuilder />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-white/50 backdrop-blur-sm border-b border-black/5">
        <div className="container mx-auto px-6">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-12"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Left: Heading - Minimalist */}
            <div className="md:w-1/4 text-center md:text-left">
              <span className="text-primary font-medium text-xs tracking-[0.2em] uppercase mb-2 block">The Process</span>
              <h2 className="editorial-heading text-3xl md:text-4xl text-charcoal">How It Works</h2>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed hidden md:block">
                From your imagination to premium fabric in three simple steps.
              </p>
            </div>

            {/* Desktop: Horizontal Flow */}
            <div className="hidden md:grid md:w-3/4 grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent z-0" />

              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  className="relative z-10 flex flex-col items-center text-center group"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-white border border-primary/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center text-primary mb-4 transition-all duration-300 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] group-hover:-translate-y-1">
                    <step.icon className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-primary/40 tracking-widest uppercase block mb-1">Step {step.number}</span>
                    <h3 className="font-display text-lg font-medium text-charcoal">{step.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed max-w-[200px] mx-auto">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile: Carousel Flow */}
            <div className="md:hidden w-full relative pl-2">
              <Carousel
                opts={{
                  align: "start",
                  loop: false,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4 pb-4">
                  {steps.map((step, index) => (
                    <CarouselItem key={step.number} className="pl-4 basis-[80%]">
                      <motion.div
                        className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-black/5 shadow-sm h-full"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-4">
                          <step.icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold text-primary/40 tracking-widest uppercase mb-2">Step {step.number}</span>
                        <h3 className="font-display text-xl font-medium text-charcoal mb-2">{step.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Bag Catalogue (Featured Products) - Now First */}
      <section className="pt-12 pb-24 bg-background">
        <div className="container mx-auto px-6">
          <FeaturedProducts products={products} />
        </div>
      </section>

      {/* SECTION 1: Curated Bag Stories - Now Second */}
      <CuratedBagStories />

      {/* Impact Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="label-text text-primary-foreground/80 mb-4">Our Impact</p>
              <h2 className="section-heading mb-6">Design with purpose</h2>
              <p className="body-large text-primary-foreground/90 mb-8 max-w-lg leading-relaxed">
                Every design supports responsible production and artisan partners.
                We combine digital design with local craftsmanship to create textiles that last.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="font-display text-4xl font-medium text-white">500+</p>
                  <p className="font-body text-sm text-primary-foreground/70 mt-1">Artisans Supported</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-medium text-white">12</p>
                  <p className="font-body text-sm text-primary-foreground/70 mt-1">Countries</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-medium text-white">Zero</p>
                  <p className="font-body text-sm text-primary-foreground/70 mt-1">Waste Production</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img src={pattern1} alt="Artisan work" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[3/4] overflow-hidden mt-8">
                <img src={pattern3} alt="Textile production" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

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

const products = [
  {
    name: "Heritage Tote",
    price: "KES 14,800",
    oldPrice: "KES 16,500",
    category: "Bags",
    image: pattern1,
    badge: "Sale - 10%",
    badgeColor: "bg-red-600"
  },
  {
    name: "Kimono Jacket",
    price: "KES 28,500",
    category: "Women",
    image: catWomen,
    badge: "New Arrival",
    badgeColor: "bg-green-600"
  },
  {
    name: "Woven Shirt",
    price: "KES 12,500",
    oldPrice: "KES 15,000",
    category: "Men",
    image: catMen,
    badge: "Sale - 15%",
    badgeColor: "bg-red-600"
  },
  {
    name: "Kids Play Suit",
    price: "KES 8,500",
    category: "Children",
    image: catChildren,
    badge: "Community Design",
    badgeColor: "bg-blue-600"
  }
];

const categories = [
  { name: "Women", image: catWomen },
  { name: "Men", image: catMen },
  { name: "Children", image: catChildren },
  { name: "Bags", image: catBags },
  { name: "Accessories", image: pattern3 } // Fallback for accessories
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory); // Simplified filter logic (mock) - mainly visual for now

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroFabric})` }}
        >
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="mb-6 flex items-center gap-2">
               <Badge variant="outline" className="text-primary border-primary/30 py-1 px-3 bg-primary/5 backdrop-blur-sm">
                 <Sparkles className="w-3 h-3 mr-2" />
                 No design skills required
               </Badge>
            </motion.div>
            
            <motion.h1 
              className="editorial-heading text-charcoal-foreground mb-6"
              variants={fadeInUp}
            >
              Design fabric.<br />Make it real.
            </motion.h1>
            
            <motion.div variants={fadeInUp} className="mb-10 max-w-xl">
              <p className="body-large text-charcoal-foreground/90 mb-2">
                Create custom textile patterns with AI. From cultural heritage to contemporary abstracts.
              </p>
              <p className="text-sm text-charcoal-foreground/60 font-medium tracking-wide uppercase">
                Customize colors, scale, and fabric type. Order by the meter or as finished pieces.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeInUp}
            >
              <Button variant="terracotta" size="lg" className="min-w-[180px]" asChild>
                <Link to="/design">
                  Design Your Fabric
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-charcoal-foreground text-charcoal-foreground hover:bg-charcoal-foreground hover:text-charcoal min-w-[180px]" asChild>
                <Link to="/shop">
                  Shop Collection
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="label-text text-primary mb-4">The Process</p>
            <h2 className="section-heading">How It Works</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="border border-border p-8 lg:p-10 h-full bg-card hover:border-primary transition-all duration-300 hover:shadow-lg group">
                  <span className="font-display text-4xl font-light text-primary/40 group-hover:text-primary transition-colors">{step.number}</span>
                  <step.icon className="h-8 w-8 text-primary mt-6 mb-4" />
                  <h3 className="font-display text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground font-body leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-16 pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Secure checkout</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Printed locally</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Production in 3-5 days</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Ships across Kenya</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Studio Preview */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="label-text text-primary mb-2">AI Fabric Studio</p>
              <h2 className="section-heading max-w-lg mb-2">Patterns born from your imagination</h2>
              <p className="text-muted-foreground text-sm max-w-md">
                Explore AI-generated textile patterns — customize colors, scale, and fabric type, or start from scratch.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button variant="hero" asChild>
                <Link to="/design">
                  Start Designing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {patterns.map((pattern, index) => (
              <motion.div
                key={index}
                className="aspect-square relative overflow-hidden group cursor-pointer rounded-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <img
                  src={pattern}
                  alt={`AI generated pattern ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
                   <Badge variant="secondary" className="bg-white/90 text-xs font-normal">
                     <Wand2 className="w-3 h-3 mr-1" /> AI Generated
                   </Badge>
                   <div className="flex gap-2 mt-2">
                     <Button size="sm" variant="secondary" className="h-8 text-xs">
                       View Details
                     </Button>
                     <Button size="sm" className="h-8 text-xs bg-primary hover:bg-primary/90">
                       Customize
                     </Button>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products & Shop Categories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          
          {/* Shop By Category - Inspiration from Screenshot */}
          <div className="mb-24">
            <motion.div
               className="text-center mb-12"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
            >
              <h2 className="section-heading tracking-tight">Explore Our Categories</h2>
              <p className="text-muted-foreground mt-2">Find your unique style</p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.slice(0, 4).map((cat, index) => (
                <motion.div
                  key={cat.name}
                  className="group cursor-pointer relative aspect-[3/4] overflow-hidden rounded-sm"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 items-center text-center">
                    <h3 className="text-white font-display text-2xl font-medium mb-4">{cat.name}</h3>
                    <Button size="sm" variant="secondary" className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Shop Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>


          <div className="flex flex-col items-center mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                 <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                 <p className="label-text text-primary">Best Sellers</p>
              </div>
              <h2 className="section-heading mb-8">Featured Products</h2>
              
              {/* Filter Pills - Optional but kept for UX */}
              {/* <div className="flex flex-wrap justify-center gap-2 mb-8 opacity-60 hover:opacity-100 transition-opacity">
                 ... logic kept if needed
              </div> */}
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {filteredProducts.map((product, index) => (
              <motion.article
                key={product.name}
                className="group cursor-pointer relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="aspect-[3/4] overflow-hidden mb-4 bg-secondary rounded-sm relative">
                  {/* Badge */}
                  {product.badge && (
                    <Badge className={`absolute top-3 left-3 z-10 text-white ${product.badgeColor} hover:${product.badgeColor} border-none rounded-sm px-3 py-1 text-xs font-medium uppercase tracking-wider`}>
                      {product.badge}
                    </Badge>
                  )}
                  
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Hover Actions (Cart) */}
                  <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <Button size="icon" className="rounded-full shadow-lg bg-white text-charcoal hover:bg-primary hover:text-white transition-colors">
                       <Truck className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-1 text-center"> {/* Centered text as per screenshot */}
                   <p className="label-text text-muted-foreground text-[10px] uppercase tracking-widest">{product.category}</p>
                   <h3 className="font-display text-lg font-medium leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                   <div className="flex items-center justify-center gap-2">
                      <p className="font-body text-primary font-bold text-lg">{product.price}</p>
                      {product.oldPrice && (
                        <p className="text-muted-foreground text-sm line-through decoration-red-500/50">{product.oldPrice}</p>
                      )}
                   </div>
                </div>
              </motion.article>
            ))}
          </div>
          
          <div className="mt-16 text-center">
             <Button size="lg" className="bg-charcoal text-white hover:bg-primary transition-colors min-w-[200px]" asChild>
                <Link to="/shop">
                  View All Products
                </Link>
             </Button>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-charcoal text-charcoal-foreground">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="label-text text-primary mb-4">Our Impact</p>
              <h2 className="section-heading mb-6">Design with purpose</h2>
              <p className="body-large text-charcoal-foreground/70 mb-8 max-w-lg leading-relaxed">
                Every design supports responsible production and artisan partners. 
                We combine digital design with local craftsmanship to create textiles that last.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="font-display text-4xl font-medium text-primary">500+</p>
                  <p className="font-body text-sm text-charcoal-foreground/60 mt-1">Artisans Supported</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-medium text-primary">12</p>
                  <p className="font-body text-sm text-charcoal-foreground/60 mt-1">Countries</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-medium text-primary">Zero</p>
                  <p className="font-body text-sm text-charcoal-foreground/60 mt-1">Waste Production</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
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

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-heading text-primary-foreground mb-6">
              Ready to create?
            </h2>
            <p className="body-large text-primary-foreground/80 mb-10 max-w-xl mx-auto">
              Turn your ideas into premium textiles. Start designing with AI today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="ivory" size="lg" asChild className="min-w-[200px]">
                <Link to="/design">
                  Create your fabric
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary min-w-[200px]">
                 Browse Designs
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Layers, Truck, Palette, Repeat, Scissors } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import heroFabric from "@/assets/hero-fabric.jpg";
import pattern1 from "@/assets/pattern-1.jpg";
import pattern2 from "@/assets/pattern-2.jpg";
import pattern3 from "@/assets/pattern-3.jpg";
import pattern4 from "@/assets/pattern-4.jpg";
import pattern5 from "@/assets/pattern-5.jpg";
import pattern6 from "@/assets/pattern-6.jpg";

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

const patterns = [pattern1, pattern2, pattern3, pattern4, pattern5, pattern6];

const steps = [
  {
    number: "01",
    title: "Design",
    description: "Describe your vision. Our AI generates unique fabric patterns inspired by global cultures and modern aesthetics.",
    icon: Sparkles
  },
  {
    number: "02",
    title: "Customize",
    description: "Fine-tune colors, scale, and repeat. Preview your design on different fabrics and product mockups.",
    icon: Palette
  },
  {
    number: "03",
    title: "Produce",
    description: "Order fabric by the meter or create finished products. Artisan production with transparent pricing.",
    icon: Truck
  }
];

const products = [
  {
    name: "Heritage Tote",
    price: "$148",
    category: "Bags",
    image: pattern1
  },
  {
    name: "Kimono Jacket",
    price: "$285",
    category: "Clothing",
    image: pattern2
  },
  {
    name: "Wrap Dress",
    price: "$225",
    category: "Clothing",
    image: pattern3
  },
  {
    name: "Crossbody Bag",
    price: "$125",
    category: "Bags",
    image: pattern4
  }
];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
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
            <motion.p 
              className="label-text text-primary mb-6"
              variants={fadeInUp}
            >
              AI-Powered Textile Design
            </motion.p>
            
            <motion.h1 
              className="editorial-heading text-charcoal-foreground mb-6"
              variants={fadeInUp}
            >
              Design fabric.<br />Make it real.
            </motion.h1>
            
            <motion.p 
              className="body-large text-charcoal-foreground/80 mb-10 max-w-xl"
              variants={fadeInUp}
            >
              Create custom textile patterns with AI. From cultural heritage to contemporary abstracts. 
              Print on premium fabrics or craft finished fashion pieces.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeInUp}
            >
              <Button variant="terracotta" size="lg" asChild>
                <Link to="/design">
                  Design Your Fabric
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" className="border-charcoal-foreground text-charcoal-foreground hover:bg-charcoal-foreground hover:text-charcoal" asChild>
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
                <div className="border border-border p-8 lg:p-10 h-full bg-card hover:border-primary transition-colors duration-300">
                  <span className="font-display text-6xl font-light text-primary/20">{step.number}</span>
                  <step.icon className="h-8 w-8 text-primary mt-4 mb-4" />
                  <h3 className="font-display text-2xl font-medium mb-4">{step.title}</h3>
                  <p className="text-muted-foreground font-body leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
              <p className="label-text text-primary mb-4">AI Fabric Studio</p>
              <h2 className="section-heading max-w-lg">Patterns born from your imagination</h2>
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
                className="aspect-square overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <img
                  src={pattern}
                  alt={`AI generated pattern ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="label-text text-primary mb-4">Featured</p>
              <h2 className="section-heading">Shop the Collection</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button variant="minimal" asChild>
                <Link to="/shop">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.article
                key={product.name}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="aspect-[3/4] overflow-hidden mb-4 bg-secondary">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="label-text text-muted-foreground mb-1">{product.category}</p>
                <h3 className="font-display text-lg font-medium mb-1">{product.name}</h3>
                <p className="font-body text-primary font-medium">{product.price}</p>
              </motion.article>
            ))}
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
              <p className="body-large text-charcoal-foreground/70 mb-8">
                Every pattern tells a story. Every purchase supports artisan communities. 
                We partner with textile producers across Africa and the Pacific to preserve 
                traditional techniques while creating sustainable livelihoods.
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
            <Button variant="ivory" size="lg" asChild>
              <Link to="/design">
                Start Your First Design
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

import { motion } from "framer-motion";
import { ArrowRight, Leaf, Users, Heart, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import pattern1 from "@/assets/pattern-1.jpg";
import pattern2 from "@/assets/pattern-2.jpg";
import pattern5 from "@/assets/pattern-5.jpg";

const stats = [
  { value: "500+", label: "Artisans Supported" },
  { value: "12", label: "Countries" },
  { value: "85%", label: "Women Artisans" },
  { value: "Zero", label: "Waste Production" },
];

const pillars = [
  {
    icon: Users,
    title: "Artisan Livelihoods",
    description: "We partner directly with textile communities across Africa and the Pacific Islands, providing fair wages and consistent work. Our artisan partners earn 40% above market rates.",
  },
  {
    icon: Leaf,
    title: "Sustainable Production",
    description: "On-demand printing means zero fabric waste. We use water-based, eco-friendly inks and source materials from certified sustainable suppliers.",
  },
  {
    icon: Heart,
    title: "Cultural Preservation",
    description: "Traditional patterns and techniques are documented and celebrated. We work with cultural advisors to ensure authentic representation and proper attribution.",
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Every design tells a story. We connect creators worldwide with the cultural heritage that inspires them, building bridges through textile art.",
  },
];

export default function ImpactPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${pattern5})` }}
        >
          <div className="absolute inset-0 bg-charcoal/80" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="label-text text-primary mb-4">Our Impact</p>
            <h1 className="editorial-heading text-charcoal-foreground mb-6">
              Design with purpose
            </h1>
            <p className="body-large text-charcoal-foreground/80 max-w-xl">
              Every pattern tells a story. Every purchase supports the hands that craft it. 
              We're building a fashion industry that values people and planet alongside profit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-4xl lg:text-5xl font-medium text-primary-foreground">
                  {stat.value}
                </p>
                <p className="font-body text-sm text-primary-foreground/70 mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="label-text text-primary mb-4">Our Commitment</p>
            <h2 className="section-heading">Four Pillars of Impact</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-border p-8 lg:p-10"
              >
                <div className="w-14 h-14 border border-primary flex items-center justify-center mb-6">
                  <pillar.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-medium mb-4">{pillar.title}</h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="label-text text-primary mb-4">Our Story</p>
              <h2 className="section-heading mb-6">Where tradition meets technology</h2>
              <div className="space-y-6 text-muted-foreground font-body leading-relaxed">
                <p>
                  TextileStudio was born from a simple observation: the world's most beautiful 
                  textile traditions are fading, while fast fashion floods the market with 
                  forgettable designs.
                </p>
                <p>
                  We built a platform that does both: uses AI to unlock creativity for everyone, 
                  while channeling that creativity through the skilled hands of traditional artisans.
                </p>
                <p>
                  Every piece we produce supports the communities who have kept textile arts alive 
                  for generations. Technology amplifies tradition — it doesn't replace it.
                </p>
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
                <img src={pattern2} alt="Textile production" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="label-text text-primary mb-4">Partners</p>
            <h2 className="section-heading mb-4">Working Together</h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              We partner with organizations committed to ethical fashion, artisan empowerment, 
              and cultural preservation.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Fair Trade Certified", "B Corp", "1% for the Planet", "Textile Exchange"].map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-24 border border-border flex items-center justify-center text-center px-4"
              >
                <span className="font-display text-lg font-medium text-muted-foreground">{partner}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal text-charcoal-foreground">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading mb-6">Join the movement</h2>
            <p className="body-large text-charcoal-foreground/70 mb-10 max-w-xl mx-auto">
              Every design you create, every purchase you make, supports artisan communities 
              and sustainable fashion. Start making an impact today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="terracotta" size="lg" asChild>
                <Link to="/design">
                  Design Your Fabric
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="hero-outline" 
                size="lg" 
                className="border-charcoal-foreground text-charcoal-foreground hover:bg-charcoal-foreground hover:text-charcoal"
                asChild
              >
                <Link to="/shop">
                  Shop Collection
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

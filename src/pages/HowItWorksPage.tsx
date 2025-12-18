import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Palette, Truck, Package, Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import pattern1 from "@/assets/pattern-1.jpg";
import pattern3 from "@/assets/pattern-3.jpg";

const steps = [
  {
    number: "01",
    title: "Choose Your Direction",
    description: "Select a cultural style — African, Samoan, abstract, floral, or geometric. Define the mood and intended use for your fabric.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Describe Your Vision",
    description: "Use natural language to describe your ideal pattern. Our AI interprets your words into unique textile designs.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Review & Refine",
    description: "Choose from multiple AI-generated variations. Save favorites, regenerate, or move forward with your top pick.",
    icon: Palette,
  },
  {
    number: "04",
    title: "Customize Details",
    description: "Fine-tune colors, adjust scale and repeat, and preview your design on different fabric types.",
    icon: Palette,
  },
  {
    number: "05",
    title: "Place Your Order",
    description: "Order fabric by the meter or transform your design into finished products — bags, shirts, dresses, and more.",
    icon: Package,
  },
  {
    number: "06",
    title: "Artisan Production",
    description: "Your design is printed and produced by our network of artisan partners. Track your order from production to delivery.",
    icon: Truck,
  },
];

const faqs = [
  {
    question: "How does AI fabric design work?",
    answer: "Our AI uses advanced generative models trained on textile patterns from around the world. When you describe your vision, the AI creates unique, production-ready fabric designs that can be printed on real materials.",
  },
  {
    question: "What fabric types are available?",
    answer: "We offer cotton, silk, linen, and polyester — each with different weights, textures, and price points. All fabrics are sustainably sourced and suitable for fashion production.",
  },
  {
    question: "Can I order just the fabric or finished products?",
    answer: "Both. You can order printed fabric by the meter for your own projects, or have us produce finished fashion items using your custom design.",
  },
  {
    question: "How long does production take?",
    answer: "Fabric orders typically ship within 5-7 business days. Finished products take 10-14 business days. International shipping adds 5-10 days depending on location.",
  },
  {
    question: "Who produces the fabrics and products?",
    answer: "We partner with artisan producers across Africa and the Pacific Islands. Every purchase supports fair wages and traditional textile craftsmanship.",
  },
];

export default function HowItWorksPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="label-text text-primary mb-4">The Process</p>
            <h1 className="editorial-heading mb-6">How It Works</h1>
            <p className="body-large text-muted-foreground mb-10">
              From imagination to production. Design custom textiles with AI and bring them to life through artisan craftsmanship.
            </p>
            <Button variant="terracotta" size="lg" asChild>
              <Link to="/design">
                Start Designing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid gap-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grid lg:grid-cols-2 gap-8 border-b border-border py-12 lg:py-16"
              >
                <div className="flex items-start gap-6">
                  <span className="font-display text-5xl lg:text-6xl font-light text-primary/30">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl lg:text-3xl font-medium mb-4">{step.title}</h3>
                    <p className="text-muted-foreground font-body leading-relaxed max-w-md">
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center lg:justify-end">
                  <div className="w-16 h-16 border border-primary flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Break */}
      <section className="relative h-96">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${pattern3})` }}
        >
          <div className="absolute inset-0 bg-charcoal/60" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="font-display text-3xl lg:text-5xl font-medium text-charcoal-foreground max-w-2xl px-6">
              "Design is not just what it looks like. Design is how it works."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="label-text text-primary mb-4">Why TextileStudio</p>
            <h2 className="section-heading">Built Different</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Design",
                description: "Generate unlimited unique patterns. No design experience required. Describe your vision, and our AI brings it to life.",
              },
              {
                icon: Users,
                title: "Artisan Production",
                description: "Every piece is crafted by skilled artisans. We partner with producers who uphold traditional techniques and fair labor practices.",
              },
              {
                icon: Globe,
                title: "Cultural Integrity",
                description: "We work with cultural consultants to ensure designs respect and celebrate their heritage origins. Attribution is built into our process.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 border border-border mx-auto mb-6 flex items-center justify-center">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-medium mb-4">{item.title}</h3>
                <p className="text-muted-foreground font-body">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="label-text text-primary mb-4">Questions</p>
            <h2 className="section-heading">FAQ</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto divide-y divide-border">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="py-8"
              >
                <h3 className="font-display text-xl font-medium mb-4">{faq.question}</h3>
                <p className="text-muted-foreground font-body leading-relaxed">{faq.answer}</p>
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
            <h2 className="section-heading mb-6">Ready to create?</h2>
            <p className="body-large text-charcoal-foreground/70 mb-10 max-w-xl mx-auto">
              Your vision, our technology, artisan hands. Start designing your first custom textile today.
            </p>
            <Button variant="terracotta" size="lg" asChild>
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

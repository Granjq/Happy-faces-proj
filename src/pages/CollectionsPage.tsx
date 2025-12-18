import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import pattern1 from "@/assets/pattern-1.jpg";
import pattern2 from "@/assets/pattern-2.jpg";
import pattern3 from "@/assets/pattern-3.jpg";
import pattern4 from "@/assets/pattern-4.jpg";

const collections = [
  {
    id: "african-heritage",
    name: "African Heritage",
    description: "Bold geometric patterns inspired by traditional African textiles — kente, mudcloth, and Ankara prints reimagined for contemporary fashion.",
    image: pattern1,
    productCount: 24,
  },
  {
    id: "pacific-islands",
    name: "Pacific Islands",
    description: "Samoan and Polynesian motifs celebrating Pacific Island culture. Traditional tapa patterns meet modern textile production.",
    image: pattern2,
    productCount: 18,
  },
  {
    id: "botanical-modern",
    name: "Botanical Modern",
    description: "Contemporary floral designs ranging from delicate line art to bold tropical prints. Nature reimagined through AI creativity.",
    image: pattern3,
    productCount: 32,
  },
  {
    id: "geometric-minimal",
    name: "Geometric Minimal",
    description: "Clean lines, mathematical precision, architectural influence. For those who prefer understated elegance.",
    image: pattern4,
    productCount: 21,
  },
];

export default function CollectionsPage() {
  return (
    <Layout>
      {/* Header */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="label-text text-primary mb-4">Curated</p>
            <h1 className="editorial-heading mb-6">Collections</h1>
            <p className="body-large text-muted-foreground">
              Explore our curated collections, each celebrating a unique aesthetic tradition 
              and cultural heritage. From AI-generated originals to artisan-crafted pieces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="pb-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="space-y-0">
            {collections.map((collection, index) => (
              <motion.article
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-t border-border"
              >
                <Link 
                  to={`/shop?collection=${collection.id}`}
                  className="grid lg:grid-cols-2 gap-0 group"
                >
                  {/* Image */}
                  <div className={`aspect-[4/3] lg:aspect-auto lg:h-[500px] overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className={`flex items-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="p-8 lg:p-16">
                      <p className="label-text text-muted-foreground mb-4">
                        {collection.productCount} Products
                      </p>
                      <h2 className="font-display text-3xl lg:text-4xl font-medium mb-4 group-hover:text-primary transition-colors">
                        {collection.name}
                      </h2>
                      <p className="text-muted-foreground font-body leading-relaxed mb-8 max-w-md">
                        {collection.description}
                      </p>
                      <Button variant="outline" className="group-hover:bg-foreground group-hover:text-background transition-colors">
                        Explore Collection
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading text-primary-foreground mb-6">
              Create your own collection
            </h2>
            <p className="body-large text-primary-foreground/80 mb-10 max-w-xl mx-auto">
              Design custom patterns and build a personal collection of AI-generated textiles. 
              Save, share, and produce your unique creations.
            </p>
            <Button variant="ivory" size="lg" asChild>
              <Link to="/design">
                Start Designing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

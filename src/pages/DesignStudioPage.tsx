import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, Check, RefreshCw, Heart, Download, Sliders } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import pattern1 from "@/assets/pattern-1.jpg";
import pattern2 from "@/assets/pattern-2.jpg";
import pattern3 from "@/assets/pattern-3.jpg";
import pattern4 from "@/assets/pattern-4.jpg";
import pattern5 from "@/assets/pattern-5.jpg";
import pattern6 from "@/assets/pattern-6.jpg";

const styles = [
  { id: "african", name: "African", description: "Bold geometric patterns inspired by traditional African textiles" },
  { id: "samoan", name: "Samoan", description: "Pacific Island motifs with cultural significance" },
  { id: "abstract", name: "Abstract", description: "Modern, artistic compositions without defined forms" },
  { id: "floral", name: "Floral", description: "Botanical designs from delicate to bold" },
  { id: "geometric", name: "Geometric", description: "Clean lines, shapes, and mathematical precision" },
];

const moods = [
  { id: "modern", name: "Modern" },
  { id: "traditional", name: "Traditional" },
  { id: "minimal", name: "Minimal" },
  { id: "bold", name: "Bold" },
];

const useCases = [
  { id: "clothing", name: "Clothing", icon: "👔" },
  { id: "upholstery", name: "Upholstery", icon: "🛋️" },
  { id: "accessories", name: "Accessories", icon: "👜" },
];

const fabricTypes = [
  { id: "cotton", name: "Cotton", price: "$18/m" },
  { id: "silk", name: "Silk", price: "$45/m" },
  { id: "linen", name: "Linen", price: "$28/m" },
  { id: "polyester", name: "Polyester", price: "$12/m" },
];

const generatedPatterns = [pattern1, pattern2, pattern3, pattern4, pattern5, pattern6];

const examplePrompts = [
  "Earthy tribal pattern with geometric shapes",
  "Modern floral with muted terracotta tones",
  "Abstract waves inspired by ocean currents",
  "Bold symmetrical African kente cloth style",
];

export default function DesignStudioPage() {
  const [step, setStep] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState<number | null>(null);
  const [selectedFabric, setSelectedFabric] = useState("cotton");
  const [scale, setScale] = useState(50);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(3);
    }, 2000);
  };

  const toggleMood = (mood: string) => {
    setSelectedMoods(prev => 
      prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]
    );
  };

  const canProceedStep1 = selectedStyle && selectedUseCase;
  const canProceedStep2 = prompt.length > 10;

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Progress Bar */}
        <div className="border-b border-border bg-card sticky top-[73px] z-40">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-8 h-8 flex items-center justify-center font-body text-sm transition-colors",
                        step === s
                          ? "bg-primary text-primary-foreground"
                          : step > s
                          ? "bg-charcoal text-charcoal-foreground"
                          : "bg-secondary text-muted-foreground"
                      )}
                    >
                      {step > s ? <Check className="h-4 w-4" /> : s}
                    </div>
                    <span className={cn(
                      "hidden sm:block font-body text-sm",
                      step >= s ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {s === 1 && "Direction"}
                      {s === 2 && "Describe"}
                      {s === 3 && "Results"}
                      {s === 4 && "Customize"}
                      {s === 5 && "Order"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          <AnimatePresence mode="wait">
            {/* Step 1: Choose Design Direction */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <p className="label-text text-primary mb-4">Step 1 of 5</p>
                  <h1 className="section-heading mb-4">Choose Your Direction</h1>
                  <p className="body-large text-muted-foreground max-w-xl mx-auto">
                    Select a cultural style and define the mood for your fabric design.
                  </p>
                </div>

                {/* Cultural Styles */}
                <div className="mb-12">
                  <h3 className="font-display text-xl font-medium mb-6">Cultural Style</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {styles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={cn(
                          "p-6 border text-left transition-all duration-200",
                          selectedStyle === style.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <h4 className="font-display text-lg font-medium mb-2">{style.name}</h4>
                        <p className="text-sm text-muted-foreground">{style.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mood */}
                <div className="mb-12">
                  <h3 className="font-display text-xl font-medium mb-6">Style Mood</h3>
                  <div className="flex flex-wrap gap-3">
                    {moods.map((mood) => (
                      <button
                        key={mood.id}
                        onClick={() => toggleMood(mood.id)}
                        className={cn(
                          "px-6 py-3 border font-body text-sm uppercase tracking-wider transition-all duration-200",
                          selectedMoods.includes(mood.id)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary"
                        )}
                      >
                        {mood.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Use Case */}
                <div className="mb-12">
                  <h3 className="font-display text-xl font-medium mb-6">Primary Use</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {useCases.map((useCase) => (
                      <button
                        key={useCase.id}
                        onClick={() => setSelectedUseCase(useCase.id)}
                        className={cn(
                          "p-6 border text-center transition-all duration-200",
                          selectedUseCase === useCase.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <span className="text-3xl mb-3 block">{useCase.icon}</span>
                        <span className="font-body text-sm">{useCase.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    variant="hero" 
                    size="lg"
                    disabled={!canProceedStep1}
                    onClick={() => setStep(2)}
                  >
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Describe Design */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-3xl mx-auto"
              >
                <div className="text-center mb-12">
                  <p className="label-text text-primary mb-4">Step 2 of 5</p>
                  <h1 className="section-heading mb-4">Describe Your Design</h1>
                  <p className="body-large text-muted-foreground max-w-xl mx-auto">
                    Tell us what you envision. Be as detailed or abstract as you like.
                  </p>
                </div>

                <div className="mb-8">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your ideal fabric pattern..."
                    className="w-full h-40 p-6 border border-border bg-card font-body text-lg resize-none focus:outline-none focus:border-primary transition-colors"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    {prompt.length} characters
                  </p>
                </div>

                <div className="mb-12">
                  <p className="font-body text-sm text-muted-foreground mb-4">Try these prompts:</p>
                  <div className="flex flex-wrap gap-2">
                    {examplePrompts.map((example) => (
                      <button
                        key={example}
                        onClick={() => setPrompt(example)}
                        className="px-4 py-2 border border-border text-sm font-body hover:border-primary transition-colors"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(1)}>
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back
                  </Button>
                  <Button 
                    variant="terracotta" 
                    size="lg"
                    disabled={!canProceedStep2 || isGenerating}
                    onClick={handleGenerate}
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Generate Patterns
                        <Sparkles className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Results */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-12">
                  <p className="label-text text-primary mb-4">Step 3 of 5</p>
                  <h1 className="section-heading mb-4">Your Generated Patterns</h1>
                  <p className="body-large text-muted-foreground max-w-xl mx-auto">
                    Select a pattern to customize, or generate new variations.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                  {generatedPatterns.map((pattern, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedPattern(index)}
                      className={cn(
                        "aspect-square overflow-hidden relative group",
                        selectedPattern === index && "ring-4 ring-primary"
                      )}
                    >
                      <img
                        src={pattern}
                        alt={`Generated pattern ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className={cn(
                        "absolute inset-0 bg-charcoal/60 flex items-center justify-center gap-3 transition-opacity",
                        selectedPattern === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      )}>
                        <button className="p-3 bg-charcoal-foreground/20 hover:bg-charcoal-foreground/40 transition-colors">
                          <Heart className="h-5 w-5 text-charcoal-foreground" />
                        </button>
                        <button className="p-3 bg-charcoal-foreground/20 hover:bg-charcoal-foreground/40 transition-colors">
                          <Download className="h-5 w-5 text-charcoal-foreground" />
                        </button>
                      </div>
                      {selectedPattern === index && (
                        <div className="absolute top-4 right-4 w-8 h-8 bg-primary flex items-center justify-center">
                          <Check className="h-5 w-5 text-primary-foreground" />
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex gap-4">
                    <Button variant="ghost" onClick={() => setStep(2)}>
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Back
                    </Button>
                    <Button variant="outline" onClick={() => setStep(3)}>
                      <RefreshCw className="mr-2 h-5 w-5" />
                      Regenerate
                    </Button>
                  </div>
                  <Button 
                    variant="hero" 
                    size="lg"
                    disabled={selectedPattern === null}
                    onClick={() => setStep(4)}
                  >
                    Customize Design
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Customize */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-12">
                  <p className="label-text text-primary mb-4">Step 4 of 5</p>
                  <h1 className="section-heading mb-4">Customize Your Pattern</h1>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Preview */}
                  <div className="aspect-square bg-secondary overflow-hidden">
                    <img
                      src={generatedPatterns[selectedPattern || 0]}
                      alt="Selected pattern"
                      className="w-full h-full object-cover"
                      style={{ transform: `scale(${scale / 50})` }}
                    />
                  </div>

                  {/* Controls */}
                  <div className="space-y-8">
                    {/* Scale */}
                    <div>
                      <h3 className="font-display text-lg font-medium mb-4 flex items-center gap-2">
                        <Sliders className="h-5 w-5 text-primary" />
                        Pattern Scale
                      </h3>
                      <input
                        type="range"
                        min="25"
                        max="100"
                        value={scale}
                        onChange={(e) => setScale(Number(e.target.value))}
                        className="w-full accent-primary"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>Small</span>
                        <span>Large</span>
                      </div>
                    </div>

                    {/* Fabric Type */}
                    <div>
                      <h3 className="font-display text-lg font-medium mb-4">Fabric Type</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {fabricTypes.map((fabric) => (
                          <button
                            key={fabric.id}
                            onClick={() => setSelectedFabric(fabric.id)}
                            className={cn(
                              "p-4 border text-left transition-all duration-200",
                              selectedFabric === fabric.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <span className="font-body text-sm font-medium block">{fabric.name}</span>
                            <span className="text-sm text-primary">{fabric.price}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color Palette */}
                    <div>
                      <h3 className="font-display text-lg font-medium mb-4">Color Palette</h3>
                      <div className="flex gap-3">
                        {["#C4653C", "#E8DED5", "#2D2A26", "#D4A853", "#8B7355"].map((color) => (
                          <button
                            key={color}
                            className="w-12 h-12 border-2 border-transparent hover:border-foreground transition-colors"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-12">
                  <Button variant="ghost" onClick={() => setStep(3)}>
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back
                  </Button>
                  <Button 
                    variant="terracotta" 
                    size="lg"
                    onClick={() => setStep(5)}
                  >
                    Proceed to Order
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Order */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <p className="label-text text-primary mb-4">Step 5 of 5</p>
                  <h1 className="section-heading mb-4">Place Your Order</h1>
                  <p className="body-large text-muted-foreground max-w-xl mx-auto">
                    Choose how you'd like to bring your design to life.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Order Fabric */}
                  <div className="border border-border p-8">
                    <h3 className="font-display text-2xl font-medium mb-4">Order Fabric</h3>
                    <p className="text-muted-foreground mb-6">
                      Get your custom pattern printed on premium fabric, sold by the meter.
                    </p>
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between">
                        <span>Fabric</span>
                        <span className="font-medium capitalize">{selectedFabric}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Price</span>
                        <span className="font-medium">{fabricTypes.find(f => f.id === selectedFabric)?.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Quantity</span>
                        <div className="flex items-center gap-3">
                          <button className="w-8 h-8 border border-border">-</button>
                          <span className="w-12 text-center">2m</span>
                          <button className="w-8 h-8 border border-border">+</button>
                        </div>
                      </div>
                      <hr className="border-border" />
                      <div className="flex justify-between text-lg font-medium">
                        <span>Estimated Total</span>
                        <span className="text-primary">$36</span>
                      </div>
                    </div>
                    <Button variant="hero" className="w-full">
                      Add Fabric to Cart
                    </Button>
                  </div>

                  {/* Create Product */}
                  <div className="border border-primary bg-primary/5 p-8">
                    <h3 className="font-display text-2xl font-medium mb-4">Create a Product</h3>
                    <p className="text-muted-foreground mb-6">
                      Turn your design into a finished fashion piece — shirt, dress, bag, or accessory.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {[
                        { name: "Tote Bag", price: "from $95" },
                        { name: "Shirt", price: "from $145" },
                        { name: "Wrap Dress", price: "from $195" },
                        { name: "Scarf", price: "from $65" },
                      ].map((product) => (
                        <button
                          key={product.name}
                          className="p-4 border border-border bg-background hover:border-primary transition-colors text-left"
                        >
                          <span className="font-body text-sm font-medium block">{product.name}</span>
                          <span className="text-sm text-primary">{product.price}</span>
                        </button>
                      ))}
                    </div>
                    <Button variant="terracotta" className="w-full">
                      Choose Product
                    </Button>
                  </div>
                </div>

                <div className="flex justify-start mt-12">
                  <Button variant="ghost" onClick={() => setStep(4)}>
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to Customize
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}

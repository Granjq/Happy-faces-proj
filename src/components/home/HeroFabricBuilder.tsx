import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Wand2, RotateCcw, ShoppingBag, Check, ChevronLeft, Loader2, Layers, ShieldCheck, Globe, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { LivePatternCanvas } from "./LivePatternCanvas";
import { useCart } from "@/context/CartContext";
import pattern1 from "@/assets/pattern-1.jpg";
import pattern2 from "@/assets/pattern-2.jpg";
import pattern3 from "@/assets/pattern-3.jpg";
import pattern4 from "@/assets/pattern-4.jpg";

const heroPatterns = [pattern1, pattern2, pattern3, pattern4];

const placeholders = [
    "Kenyan kitenge floral, emerald & gold",
    "Geometric maasai beadwork pattern",
    "Abstract savannah sunset gradients",
    "Traditional kente cloth weave"
];

const fabricTypes = [
    { id: "cotton", name: "Cotton", description: "Soft & breathable" },
    { id: "silk", name: "Silk", description: "Smooth & lustrous" },
    { id: "linen", name: "Linen", description: "Light & airy" },
    { id: "canvas", name: "Canvas", description: "Durable & heavy" },
];

export function HeroFabricBuilder() {
    const { addToCart } = useCart();
    const [prompt, setPrompt] = useState("");
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [view, setView] = useState<"input" | "customize" | "loading" | "result">("input");

    // Customization state
    const [scale, setScale] = useState([50]);
    const [fabricType, setFabricType] = useState("Cotton");
    const [length, setLength] = useState(1);

    // Slideshow state for right side
    const [currentPatternIndex, setCurrentPatternIndex] = useState(0);

    // Auto-advance slideshow
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPatternIndex((prev) => (prev + 1) % heroPatterns.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Rotate placeholders
    useEffect(() => {
        if (view !== "input" || prompt) return;
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [view, prompt]);

    // Handlers
    const handleStartCustomizing = () => {
        if (!prompt.trim()) return;
        setView("customize");
    };

    const handleGenerate = () => {
        setView("loading");
        setTimeout(() => {
            setView("result");
        }, 3000); // Simulate API delay
    };

    const handleReset = () => {
        setView("input");
        setPrompt("");
        setScale([50]);
        setFabricType("Cotton");
        setLength(1);
    };

    // Total Price Calculation
    const totalPrice = 1200 * length;

    const handleAddToCart = () => {
        addToCart({
            id: `${Date.now()}`,
            name: "Custom Fabric Design",
            price: 1200,
            image: pattern2, // Using default pattern for now
            fabricType: fabricType,
            length: length,
            patternScale: scale[0]
        });
    };

    return (
        <div className="w-full min-h-[500px] lg:h-[600px] flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden shadow-2xl border border-black/5 relative transition-all duration-500">

            {/* LEFT COLUMN: Controls & Workflow */}
            <div className="w-full lg:w-[40%] p-6 pt-[25px] lg:p-12 lg:pt-[25px] flex flex-col justify-center relative z-10 bg-white">
                <AnimatePresence mode="wait">

                    {/* VIEW 1: INPUT (Restored Look) */}
                    {view === "input" && (
                        <motion.div
                            key="input"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col h-full justify-center"
                        >
                            <h2 className="editorial-heading text-4xl lg:text-5xl tracking-tight mb-4 text-charcoal">
                                Design fabric.<br />Make it real.
                            </h2>
                            <p className="text-muted-foreground/80 lg:text-muted-foreground text-lg mb-8 leading-relaxed font-medium lg:font-normal">
                                Describe a fabric. We turn it into print-ready textile in minutes.
                            </p>

                            {/* Input Area - Restored Design */}
                            <div className="relative group mb-8">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition duration-700 blur-lg"></div>
                                <div className="relative bg-white rounded-xl border border-black/5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-4 pr-16 group-hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] group-hover:border-primary/20 transition-all duration-300">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/60 mb-2 block">
                                        Describe your fabric...
                                    </label>
                                    <textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder={placeholders[placeholderIndex]}
                                        className="w-full bg-transparent border-none p-0 text-xl font-display text-charcoal placeholder:text-muted-foreground/30 focus:ring-0 resize-none min-h-[60px] leading-tight"
                                        autoFocus
                                    />
                                </div>
                                <Button
                                    onClick={handleStartCustomizing}
                                    disabled={!prompt.trim()}
                                    className="absolute right-4 bottom-4 rounded-full w-10 h-10 p-0 bg-primary hover:bg-primary/90 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 z-10"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Trust Badges - Restored */}
                            <div className="grid grid-cols-2 gap-y-6 gap-x-4 max-w-[400px]">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-charcoal font-medium">
                                        <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                                        <span className="text-[10px] uppercase tracking-widest leading-tight">Secure Checkout</span>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground pl-6 hidden sm:block">Protected payments</span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-charcoal font-medium">
                                        <Globe className="w-4 h-4 text-primary shrink-0" />
                                        <span className="text-[10px] uppercase tracking-widest leading-tight">Printed Locally</span>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground pl-6 hidden sm:block">Kenyan artisans</span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-charcoal font-medium">
                                        <Clock className="w-4 h-4 text-primary shrink-0" />
                                        <span className="text-[10px] uppercase tracking-widest leading-tight">Fast Production</span>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground pl-6 hidden sm:block">Ready in 3-5 days</span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-charcoal font-medium">
                                        <Truck className="w-4 h-4 text-primary shrink-0" />
                                        <span className="text-[10px] uppercase tracking-widest leading-tight">Shipping</span>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground pl-6 hidden sm:block">Countrywide</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* VIEW 2: CUSTOMIZE */}
                    {view === "customize" && (
                        <motion.div
                            key="customize"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col h-full overflow-y-auto pr-2"
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <button onClick={() => setView("input")} className="text-muted-foreground hover:text-charcoal transition-colors">
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <span className="text-sm font-bold text-primary uppercase tracking-widest">Step 2: Customize</span>
                            </div>

                            <div className="space-y-6 flex-1">
                                <div>
                                    <h3 className="section-heading text-2xl mb-1">Fine Tune</h3>
                                    <p className="text-muted-foreground font-body text-base line-clamp-1">"{prompt}"</p>
                                </div>

                                {/* Fabric Selection */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm font-medium text-charcoal">
                                        <Layers className="w-4 h-4" /> Material
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {fabricTypes.map((type) => (
                                            <button
                                                key={type.id}
                                                onClick={() => setFabricType(type.name)}
                                                className={`
                                                    p-3 rounded-lg border-2 text-left transition-all
                                                    ${fabricType === type.name
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-border hover:border-black/10 bg-white'}
                                                `}
                                            >
                                                <span className={`block text-sm font-bold ${fabricType === type.name ? 'text-primary' : 'text-charcoal'}`}>
                                                    {type.name}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Scale Slider */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm font-medium text-charcoal">
                                        <div className="flex items-center gap-2">
                                            <RotateCcw className="w-4 h-4" /> Pattern Scale
                                        </div>
                                        <span className="font-mono text-primary bg-primary/10 px-2 py-0.5 rounded text-xs">{scale}%</span>
                                    </div>
                                    <Slider
                                        value={scale}
                                        onValueChange={setScale}
                                        min={10}
                                        max={200}
                                        step={5}
                                        className="py-2"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 mt-auto">
                                <Button
                                    onClick={handleGenerate}
                                    size="lg"
                                    className="w-full h-12 text-base rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-1"
                                >
                                    <Wand2 className="w-4 h-4 mr-2" /> Generate Preview
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* VIEW 3: LOADING */}
                    {view === "loading" && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col justify-center items-center h-full text-center space-y-8"
                        >
                            <div className="relative w-20 h-20">
                                <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                <Sparkles className="absolute inset-0 m-auto text-primary animate-pulse w-6 h-6" />
                            </div>
                            <div className="space-y-3 max-w-xs mx-auto">
                                <h3 className="font-display text-xl font-medium">Interpreting your idea...</h3>
                                <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <Check className="w-3 h-3 text-green-500" /> Analyzing prompt
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.2 }}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <Check className="w-3 h-3 text-green-500" /> Defining vector paths
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 2.0 }}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <Loader2 className="w-3 h-3 animate-spin text-primary" /> Generating textures
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* VIEW 4: RESULT */}
                    {view === "result" && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col h-full bg-white justify-center"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                                    <Check className="w-3 h-3" /> Ready to print
                                </span>
                            </div>

                            {/* Mobile Result Image */}
                            <div className="lg:hidden w-full h-48 mb-6 rounded-xl overflow-hidden shadow-sm border border-black/5 relative group">
                                <img
                                    src={pattern2}
                                    className="w-full h-full object-cover"
                                    alt="Generated Fabric"
                                    style={{ transform: `scale(${scale[0] / 50})` }}
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                            </div>

                            <div className="space-y-4 mb-8">
                                <h3 className="editorial-heading text-3xl leading-tight">
                                    Your {fabricType} is ready.
                                </h3>
                                <div className="bg-secondary/50 p-4 rounded-xl border border-black/5 space-y-4">
                                    {/* Length Input */}
                                    <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-black/5">
                                        <span className="text-sm font-medium text-charcoal pl-2">Length (Meters)</span>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setLength(Math.max(1, length - 1))}
                                                className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 text-charcoal transition-colors"
                                            >
                                                -
                                            </button>
                                            <span className="font-mono font-medium w-4 text-center">{length}</span>
                                            <button
                                                onClick={() => setLength(length + 1)}
                                                className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 text-charcoal transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="h-px bg-black/5" />

                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-charcoal">Total Price</span>
                                            <span className="text-[10px] text-muted-foreground">KES 2,400 x {length}m</span>
                                        </div>
                                        <span className="text-xl font-bold text-primary">KES {(2400 * length).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Button
                                    onClick={handleAddToCart}
                                    size="lg"
                                    className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg"
                                >
                                    <ShoppingBag className="w-4 h-4 mr-2" /> Add to Cart
                                </Button>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="outline" onClick={() => setView("customize")} className="h-10 rounded-full border-black/10 text-sm">
                                        Refine
                                    </Button>
                                    <Button variant="ghost" onClick={handleReset} className="h-10 rounded-full text-muted-foreground hover:text-charcoal text-sm">
                                        Start Over
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* RIGHT COLUMN: Visual Canvas (60%) */}
            <div className="hidden lg:block lg:w-[60%] relative bg-secondary overflow-hidden">
                {/* Pattern Canvas - Always rendered but content changes */}
                <div className="absolute inset-0">
                    <AnimatePresence mode="wait">
                        {view === "result" ? (
                            <motion.div
                                key="result-img"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full h-full"
                            >
                                <img
                                    src={pattern2}
                                    className="w-full h-full object-cover"
                                    alt="Generated Fabric"
                                    style={{ transform: `scale(${scale[0] / 50})` }}
                                />
                                <div className="absolute bottom-6 right-6 flex gap-2">
                                    <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-xs font-bold uppercase tracking-widest text-primary">
                                        Preview Mode
                                    </div>
                                </div>
                            </motion.div>
                        ) : view === "loading" ? (
                            <motion.div
                                key="loading-shimmer"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full h-full bg-secondary relative overflow-hidden"
                            >
                                {/* Abstract Shimmer Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full -translate-x-full animate-[shimmer_1.5s_infinite]" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                    <LivePatternCanvas />
                                </div>
                            </motion.div>
                        ) : view === 'input' ? (
                            /* LIGHT, AIRY, PREMIUM STUDIO VISUALIZATION */
                            <motion.div
                                key="studio-hero-visual"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full h-full bg-[#FAFCFA] relative overflow-hidden flex flex-col justify-center items-center"
                            >
                                {/* 1. Base Depth Layer (Subtle Green Radial) */}
                                <div
                                    className="absolute inset-0 opacity-100"
                                    style={{
                                        background: 'radial-gradient(circle at 70% 40%, rgba(34, 197, 94, 0.08), transparent 60%)'
                                    }}
                                />

                                {/* 4. Ghost Text (Transformation Story) */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                                    <motion.p
                                        key={placeholderIndex} // Animate when prompt changes
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 0.06, scale: 1 }} // 6% Opacity
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        transition={{ duration: 1.5 }}
                                        className="font-display text-8xl lg:text-9xl text-charcoal font-bold whitespace-nowrap opacity-[0.04] select-none transform -rotate-12 translate-x-10 translate-y-10"
                                    >
                                        {placeholders[placeholderIndex].split(" ")[0]} Fabric
                                    </motion.p>
                                </div>

                                {/* Floating Cards Container */}
                                <div className="relative z-10 w-full h-full p-8 flex flex-col justify-center items-center">

                                    {/* Glassmorphic Background Square (Outer Box) */}
                                    <motion.div
                                        className="absolute z-10 bg-white/40 backdrop-blur-xl border border-white/50 rounded-[32px]"
                                        style={{
                                            width: '24rem', // w-96
                                            height: '24rem',
                                            boxShadow: '0 20px 40px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(255,255,255,0.5)'
                                        }}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 1, delay: 0.1 }}
                                    />

                                    {/* Secondary Card (Background, blurred - pushed further back) */}
                                    <motion.div
                                        className="absolute w-48 aspect-square rounded-2xl overflow-hidden z-0 opacity-40 grayscale-[20%]"
                                        style={{
                                            boxShadow: '0 16px 32px rgba(0,0,0,0.08)',
                                            filter: 'blur(3px)',
                                            transform: 'translate(70%, -30%) rotate(15deg)'
                                        }}
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 0.4 }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                    >
                                        <AnimatePresence mode="popLayout">
                                            <motion.img
                                                key={(currentPatternIndex + 1) % heroPatterns.length}
                                                src={heroPatterns[(currentPatternIndex + 1) % heroPatterns.length]}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                alt="Secondary Fabric"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 1 }}
                                            />
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Hero Card (Main Character - Enlarged) */}
                                    <motion.div
                                        className="relative w-80 aspect-square rounded-[24px] overflow-hidden z-20 bg-white shadow-2xl"
                                        style={{
                                            boxShadow: '0 40px 80px rgba(0,0,0,0.15)', // Enhanced shadow
                                        }}
                                        initial={{ y: 20, opacity: 0, scale: 0.95 }}
                                        animate={{
                                            y: 0,
                                            opacity: 1,
                                            scale: 1,
                                            // Gentle float animation
                                            translateY: [-5, -12, -5]
                                        }}
                                        transition={{
                                            delay: 0.2,
                                            duration: 0.8,
                                            translateY: {
                                                duration: 6,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }
                                        }}
                                    >
                                        {/* Green Highlight Outline/Glow */}
                                        <div className="absolute inset-0 rounded-[24px] pointer-events-none z-30" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.4)' }} />

                                        <AnimatePresence mode="popLayout">
                                            <motion.img
                                                key={currentPatternIndex}
                                                src={heroPatterns[currentPatternIndex]}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                alt="Hero Fabric Pattern"
                                                initial={{ opacity: 0, scale: 1.1 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 1.2 }}
                                            />
                                        </AnimatePresence>

                                        {/* Inner Gloss/Highlight */}
                                        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none z-20" />
                                    </motion.div>

                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="live-canvas"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full h-full"
                            >
                                <LivePatternCanvas />
                                <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none transition-opacity duration-500 opacity-0`} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Mobile Bg Canvas (If needed) */}
            <div className="lg:hidden absolute inset-0 z-0">
                {view === 'result' ? (
                    <img
                        src={pattern2}
                        className="w-full h-full object-cover opacity-20 blur-sm"
                        alt="Background Pattern"
                    />
                ) : (
                    <>
                        <LivePatternCanvas />
                        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/50 to-white/10 backdrop-blur-sm" />
                    </>
                )}
            </div>
        </div>
    );
}

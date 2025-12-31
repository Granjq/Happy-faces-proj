
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
    CreditCard, 
    Loader2, 
    Lock, 
    Smartphone, 
    ShoppingBag, 
    HelpCircle,
    CheckCircle2,
    Calendar,
    Truck,
    Clock
} from "lucide-react";
import { toast } from "sonner";
import { AuthModal } from "@/components/auth/AuthModal";

// --- Header Component (Checkout Safe) ---
const CheckoutHeader = () => (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] h-16">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
            {/* Logo - Navigate Home with Warning (implemented via Link for now, simplied) */}
            <Link to="/" className="flex items-center gap-2 group" onClick={(e) => {
                if (!window.confirm("Are you sure you want to leave checkout? Your details won't be saved.")) {
                    e.preventDefault();
                }
            }}>
                <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain rounded-full" />
                <span className="font-display text-xl font-semibold tracking-tight text-charcoal group-hover:text-primary transition-colors">
                    T<span className="text-primary">FASHION</span>
                </span>
            </Link>

            {/* Secure Badge */}
            <div className="hidden md:flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full border border-green-100">
                <Lock className="w-3.5 h-3.5" />
                <span className="text-xs font-bold tracking-wider uppercase">Secure Checkout</span>
            </div>

            {/* Support */}
            <a href="#" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors">
                <HelpCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Need help?</span>
            </a>
        </div>
    </header>
);

// --- Footer Component (Checkout Safe) ---
const CheckoutFooter = () => (
    <footer className="border-t border-gray-100 py-8 bg-gray-50">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-xs text-muted-foreground font-medium">
                    &copy; {new Date().getFullYear()} TFashion. All rights reserved.
                </div>
                
                <div className="flex gap-8 text-xs font-medium text-muted-foreground">
                    <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                    <Link to="/refunds" className="hover:text-primary transition-colors">Refunds</Link>
                </div>

                {/* Payment Icons (Styled Text/Icon combo) */}
                <div className="flex items-center gap-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
                    <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm">
                        <Smartphone className="w-3 h-3 text-green-600" />
                        <span className="text-[10px] font-bold text-charcoal">M-PESA</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm">
                        <CreditCard className="w-3 h-3 text-blue-600" />
                        <span className="text-[10px] font-bold text-charcoal">VISA</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm">
                        <span className="text-[10px] font-bold text-blue-800 italic font-serif">Paypal</span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card" | "paypal">("mpesa");
    
    // Step State (Mocking progress)
    const [currentStep, setCurrentStep] = useState(1); 

    useEffect(() => {
        if (!isAuthenticated) {
            setIsAuthModalOpen(true);
        }
    }, [isAuthenticated]);

    const handleAuthModalClose = () => {
        setIsAuthModalOpen(false);
        if (!isAuthenticated) {
            navigate("/");
            toast.info("Please sign in to complete your checkout.");
        }
    };

    // Form states
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        location: "",
        city: ""
    });

    const isFormValid = formData.name && formData.phone && formData.location && formData.city;

    const handleSuccess = () => {
        if (!isFormValid) {
            toast.error("Please fill in all delivery details");
            // Highlight delivery section
            document.getElementById("delivery-section")?.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        setIsLoading(true);
        // Simulate processing
        setTimeout(() => {
            setIsLoading(false);
            clearCart();
            // toast.success("Payment Received!", { description: "Your order is now being processed." });
            navigate("/order-tracking");
        }, 3000);
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFCFA]">
                <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
                <h2 className="text-2xl font-display font-medium mb-4 text-charcoal">Your cart is empty</h2>
                <Button onClick={() => navigate("/shop")} className="rounded-full px-8">Continue Shopping</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFCFA] flex flex-col font-sans">
            <CheckoutHeader />

            <main className="flex-1 pt-24 pb-12 w-full">
                <div className="container mx-auto px-6 max-w-6xl">
                    
                    {/* Header: Title & Steps */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-black/5 pb-6">
                        <h1 className="editorial-heading text-4xl text-charcoal">Checkout</h1>
                        
                        {/* Step Indicator */}
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <span className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs ${currentStep >= 1 ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>1</span>
                                Delivery
                            </span>
                            <div className="w-8 h-px bg-gray-200 mx-1" />
                            <span className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs ${currentStep >= 1 ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>2</span>
                                Payment
                            </span>
                            <div className="w-8 h-px bg-gray-200 mx-1" />
                            <span className={`flex items-center gap-2 text-gray-400`}>
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center border border-gray-300 text-xs`}>3</span>
                                Confirmation
                            </span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        
                        {/* LEFT: Forms (Span 7) */}
                        <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">

                            {/* 1. Delivery Info */}
                            <section id="delivery-section" className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">1</div>
                                    <h2 className="font-display text-xl font-medium text-charcoal">Delivery Details</h2>
                                </div>

                                <div className="grid gap-6">
                                    <div>
                                        <Label htmlFor="name" className="text-muted-foreground text-xs uppercase tracking-wider font-bold ml-1">Full Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="e.g. Jane Doe"
                                            className="mt-2 h-12 bg-gray-50/50 border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all rounded-xl"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone" className="text-muted-foreground text-xs uppercase tracking-wider font-bold ml-1">Phone Number (M-Pesa)</Label>
                                        <Input
                                            id="phone"
                                            placeholder="0712 345 678"
                                            className="mt-2 h-12 bg-gray-50/50 border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all rounded-xl"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="location" className="text-muted-foreground text-xs uppercase tracking-wider font-bold ml-1">Location / Street</Label>
                                            <Input
                                                id="location"
                                                placeholder="Apartment, Road..."
                                                className="mt-2 h-12 bg-gray-50/50 border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all rounded-xl"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="city" className="text-muted-foreground text-xs uppercase tracking-wider font-bold ml-1">City / Area</Label>
                                            <Input
                                                id="city"
                                                placeholder="Nairobi"
                                                className="mt-2 h-12 bg-gray-50/50 border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all rounded-xl"
                                                value={formData.city}
                                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 2. Payment Method */}
                            <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">2</div>
                                    <h2 className="font-display text-xl font-medium text-charcoal">Payment Method</h2>
                                </div>

                                {/* Payment Tabs */}
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <button
                                        onClick={() => setPaymentMethod("mpesa")}
                                        className={`
                                        flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden
                                        ${paymentMethod === "mpesa" ? "border-green-500 bg-green-50/50 text-green-700 shadow-sm" : "border-gray-100 hover:border-green-200 text-muted-foreground hover:bg-green-50/30"}
                                    `}
                                    >
                                        <Smartphone className="w-6 h-6" />
                                        <span className="text-xs font-bold uppercase tracking-wider">M-Pesa</span>
                                        {paymentMethod === "mpesa" && (
                                            <motion.div layoutId="activeCheck" className="absolute top-2 right-2 text-green-600">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </motion.div>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod("card")}
                                        className={`
                                        flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden
                                        ${paymentMethod === "card" ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-gray-100 hover:border-primary/30 text-muted-foreground hover:bg-primary/5"}
                                    `}
                                    >
                                        <CreditCard className="w-6 h-6" />
                                        <span className="text-xs font-bold uppercase tracking-wider">Card</span>
                                        {paymentMethod === "card" && (
                                            <motion.div layoutId="activeCheck" className="absolute top-2 right-2 text-primary">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </motion.div>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod("paypal")}
                                        className={`
                                        flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden
                                        ${paymentMethod === "paypal" ? "border-blue-500 bg-blue-50/50 text-blue-700 shadow-sm" : "border-gray-100 hover:border-blue-200 text-muted-foreground hover:bg-blue-50/30"}
                                    `}
                                    >
                                        <span className="font-display font-bold text-xl italic">P</span>
                                        <span className="text-xs font-bold uppercase tracking-wider">PayPal</span>
                                        {paymentMethod === "paypal" && (
                                            <motion.div layoutId="activeCheck" className="absolute top-2 right-2 text-blue-600">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </motion.div>
                                        )}
                                    </button>
                                </div>

                                {/* Content based on selection */}
                                <AnimatePresence mode="wait">
                                    {paymentMethod === "mpesa" && (
                                        <motion.div
                                            key="mpesa"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-4 overflow-hidden"
                                        >
                                            <div className="bg-green-50 p-6 rounded-xl border border-green-100 flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full bg-green-200/50 flex items-center justify-center flex-shrink-0 text-green-700">
                                                    <Smartphone className="w-5 h-5 animate-pulse" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-green-900 mb-1">Confirm on your phone</h4>
                                                    <p className="text-sm text-green-800/80 leading-relaxed">
                                                        A payment request will be sent to <strong>{formData.phone || "your phone number"}</strong>. 
                                                        Please unlock your phone and check for the M-Pesa prompt.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {paymentMethod === "card" && (
                                        <motion.div
                                            key="card"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-4 overflow-hidden"
                                        >
                                           <div className="p-1">
                                                <Label className="text-xs uppercase tracking-wide text-muted-foreground font-bold mb-2 block">Card Details</Label>
                                                <div className="relative">
                                                     <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                                     <Input placeholder="Card Number" className="pl-10 h-12 bg-gray-50/50 border-gray-200 rounded-xl mb-4" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <Input placeholder="MM / YY" className="h-12 bg-gray-50/50 border-gray-200 rounded-xl" />
                                                    <Input placeholder="CVC" className="h-12 bg-gray-50/50 border-gray-200 rounded-xl" />
                                                </div>
                                           </div>
                                        </motion.div>
                                    )}

                                    {paymentMethod === "paypal" && (
                                         <motion.div
                                            key="paypal"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-4 overflow-hidden"
                                        >
                                             <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-blue-200/50 flex items-center justify-center flex-shrink-0 text-blue-700">
                                                    <Lock className="w-5 h-5" />
                                                </div>
                                                <p className="text-sm text-blue-900/80">
                                                    You will be securely redirected to PayPal to complete your purchase.
                                                </p>
                                             </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Action Button */}
                                <div className="mt-8 pt-8 border-t border-black/5">
                                    <Button
                                        onClick={handleSuccess}
                                        disabled={isLoading || !isFormValid}
                                        className="w-full h-14 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary/30 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/10 translate-y-full hover:translate-y-0 transition-transform duration-300" />
                                        
                                        {isLoading ? (
                                            <div className="flex items-center gap-2 relative z-10">
                                                <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                                            </div>
                                        ) : (
                                            <span className="font-medium relative z-10 flex items-center gap-2">
                                                Pay KES {cartTotal.toLocaleString()} <span className="opacity-60">→</span> Start Production
                                            </span>
                                        )}
                                    </Button>

                                    <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
                                        <Lock className="w-3 h-3" /> Encrypted and secured. No hidden fees.
                                    </p>
                                </div>
                            </section>
                        </div>

                        {/* RIGHT: Order Summary (Span 5) - Sticky */}
                        <div className="lg:col-span-5 order-1 lg:order-2 h-full">
                            <div className="sticky top-24 space-y-6">
                                
                                {/* Order Card */}
                                <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
                                    <h2 className="font-display text-xl font-medium mb-6 flex items-center gap-2 text-charcoal">
                                        <ShoppingBag className="w-5 h-5 text-primary" /> Order Summary
                                    </h2>

                                    <div className="space-y-6 mb-8 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex gap-4 group">
                                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-black/5 relative">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h3 className="font-medium text-sm text-charcoal truncate pr-2" title={item.name}>{item.name}</h3>
                                                        <span className="font-bold text-sm whitespace-nowrap">KES {(item.price * item.quantity).toLocaleString()}</span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mb-2 truncate">{item.fabricType} • {item.length}m</p>
                                                    <div className="text-[10px] font-medium text-muted-foreground bg-gray-100 inline-block px-1.5 py-0.5 rounded border border-gray-200">
                                                        Qty: {item.quantity}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-3 pt-6 border-t border-black/5">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span className="font-medium">KES {cartTotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Delivery</span>
                                            <span className="text-green-600 font-medium flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Free</span>
                                        </div>
                                        <div className="flex justify-between text-xl font-bold pt-4 border-t border-black/5 mt-4 text-charcoal">
                                            <span>Total</span>
                                            <span>KES {cartTotal.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Estimates (New) */}
                                <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm space-y-4">
                                     <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Estimated Timeline</h3>
                                     
                                     <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mt-0.5">
                                            <Clock className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-charcoal">Production: 3–5 days</p>
                                            <p className="text-xs text-muted-foreground">Custom printed just for you</p>
                                        </div>
                                     </div>

                                     <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mt-0.5">
                                            <Truck className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-charcoal">Delivery: 1–2 days</p>
                                            <p className="text-xs text-muted-foreground">Standard countrywide shipping</p>
                                        </div>
                                     </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <CheckoutFooter />
            <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthModalClose} />
        </div>
    );
}

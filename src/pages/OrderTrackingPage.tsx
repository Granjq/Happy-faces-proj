
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Check,
    Truck,
    Sparkles,
    Package,
    MessageSquare,
    MapPin,
    Copy,
    Clock,
    RefreshCcw,
    ChevronDown,
    ChevronUp,
    Phone,
    Mail
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import pattern1 from "@/assets/pattern-1.jpg"; // Re-using existing asset for preview

// --- Mock Data ---
const ORDER_DETAILS = {
    id: "TF-8821",
    date: "Sept 21, 2024",
    total: "KES 2,400",
    status: "In Production",
    address: "Block B, Apartment 4B, Kileleshwa, Nairobi",
    eta: "Sept 25 - Sept 27"
};

const TIMELINE_STEPS = [
    {
        id: 1,
        title: "Payment Received",
        date: "Sept 21, 10:43 AM",
        description: "Your order has been confirmed securely.",
        status: "completed",
        icon: Check
    },
    {
        id: 2,
        title: "Design Finalized",
        date: "Sept 21, 11:15 AM",
        description: "Your custom fabric pattern has been locked in for printing.",
        status: "completed",
        icon: Sparkles
    },
    {
        id: 3,
        title: "In Production",
        date: "In progress",
        description: "Your fabric is being carefully printed by our artisans. This usually takes 2-3 days.",
        status: "current",
        icon: Package,
        progress: 65 // % complete for this step
    },
    {
        id: 4,
        title: "Quality Check",
        date: "Est. Sept 24",
        description: "We inspect every inch to ensure it meets our premium standards.",
        status: "upcoming",
        icon: Check
    },
    {
        id: 5,
        title: "Out for Delivery",
        date: "Est. Sept 25",
        description: "It's on the move to you!",
        status: "upcoming",
        icon: Truck
    },
    {
        id: 6,
        title: "Delivered",
        date: "-",
        description: "We hope you love it. Tell us how it feels.",
        status: "upcoming",
        icon: MapPin
    }
];

export default function OrderTrackingPage() {
    const [lastUpdated, setLastUpdated] = useState<string>("Just now");
    const [refreshing, setRefreshing] = useState(false);
    const [progress, setProgress] = useState(0);

    // Simulate "Live" feeling
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setLastUpdated(`${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`);
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    // Simulate initial load progress for the "current" step
    useEffect(() => {
        const timer = setTimeout(() => setProgress(65), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            const now = new Date();
            setLastUpdated(`Just now`);
        }, 1500);
    };

    return (
        <Layout>
            <div className="min-h-screen bg-[#FAFCFA] pb-24">

                {/* Header Section */}
                <div className="bg-white border-b border-black/5 pt-12 pb-8">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1 rounded-full text-xs uppercase tracking-wider font-bold gap-1.5">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        Live Status
                                    </Badge>
                                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                                        Last updated: {lastUpdated}
                                        <button onClick={handleRefresh} className={`ml-2 hover:bg-gray-100 p-1 rounded-full transition-all ${refreshing ? 'animate-spin' : ''}`}>
                                            <RefreshCcw className="w-3 h-3 text-gray-500" />
                                        </button>
                                    </span>
                                </div>
                                <h1 className="editorial-heading text-3xl md:text-4xl text-charcoal">
                                    Tracker <span className="text-gray-300 font-light">#TF-8821</span>
                                </h1>
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" className="rounded-full gap-2">
                                    <MessageSquare className="w-4 h-4" /> Support
                                </Button>
                                <Button asChild className="rounded-full bg-charcoal text-white hover:bg-charcoal/90">
                                    <Link to="/shop">Shop New Arrival</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 mt-8 max-w-6xl">
                    <div className="grid lg:grid-cols-12 gap-8">

                        {/* LEFT: Live Timeline (Span 8) */}
                        <div className="lg:col-span-8 space-y-8">

                            {/* Timeline Card */}
                            <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 md:p-8">
                                <h2 className="font-display text-xl font-medium mb-8">Order Progress</h2>

                                <div className="relative pl-4 md:pl-6 space-y-10">
                                    {/* Vertical Line */}
                                    <div className="absolute left-[23px] md:left-[31px] top-4 bottom-4 w-0.5 bg-gray-100" />

                                    {TIMELINE_STEPS.map((step, index) => (
                                        <div key={step.id} className="relative flex gap-6 md:gap-8 group">
                                            {/* Icon Node */}
                                            <div className={`
                                                w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center z-10 border-4 transition-all duration-500 flex-shrink-0 bg-white
                                                ${step.status === 'completed' ? 'border-primary text-primary' : ''}
                                                ${step.status === 'current' ? 'border-primary text-primary shadow-[0_0_0_4px_rgba(22,163,74,0.1)]' : ''}
                                                ${step.status === 'upcoming' ? 'border-gray-100 text-gray-300' : ''}
                                            `}>
                                                <step.icon className={`w-5 h-5 md:w-6 md:h-6 ${step.status === 'upcoming' ? '' : ''}`} />
                                            </div>

                                            {/* Content */}
                                            <div className={`flex-1 pt-1 space-y-2 transition-opacity duration-500 ${step.status === 'upcoming' ? 'opacity-50 blur-[0.5px] group-hover:opacity-80 group-hover:blur-0' : ''}`}>
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                                                    <h3 className={`font-display text-lg font-medium ${step.status === 'upcoming' ? 'text-gray-500' : 'text-charcoal'}`}>
                                                        {step.title}
                                                    </h3>
                                                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-gray-50 px-2 py-0.5 rounded w-fit">
                                                        {step.date}
                                                    </span>
                                                </div>

                                                <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                                                    {step.description}
                                                </p>

                                                {/* Current Step Progress Bar */}
                                                {step.status === 'current' && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        className="pt-3 max-w-xs"
                                                    >
                                                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-primary mb-1">
                                                            <span>Printing in progress</span>
                                                            <span>{progress}%</span>
                                                        </div>
                                                        <Progress value={progress} className="h-2 bg-green-100" indicatorClassName="bg-primary" />
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Delivery Tracking (Simulated 'Out for Delivery' Preview) */}
                            {/* User asked for this when 'Out for delivery' - putting a placeholder or future state preview */}
                            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-blue-100 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <Truck className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-blue-800">Coming Soon: Delivery Tracking</span>
                                </div>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Courier</p>
                                        <p className="font-medium text-charcoal">Sendy</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Tracking #</p>
                                        <p className="font-medium text-charcoal">Pending</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">ETA</p>
                                        <p className="font-medium text-charcoal">Sept 25, 2–6 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Order Summary Card (Span 4) */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm sticky top-24">
                                <h2 className="font-display text-lg font-medium mb-6 flex items-center gap-2">
                                    Order Summary
                                </h2>

                                {/* Product Preview */}
                                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                                    <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden border border-black/5">
                                        <img src={pattern1} alt="Fabric Pattern" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-charcoal text-sm">Custom Fabric Design</p>
                                        <p className="text-xs text-muted-foreground">Linen • 3m</p>
                                        <p className="text-xs font-medium mt-1">Order #{ORDER_DETAILS.id}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-2">Delivery Address</p>
                                        <div className="flex items-start gap-2">
                                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                            <p className="text-sm text-charcoal leading-relaxed">{ORDER_DETAILS.address}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-2">Estimated Arrival</p>
                                        <div className="flex items-start gap-2">
                                            <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                                            <p className="text-sm text-charcoal">{ORDER_DETAILS.eta}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <h3 className="text-sm font-medium mb-3">Need help with this order?</h3>
                                    <div className="space-y-2">
                                        <Button variant="outline" size="sm" className="w-full justify-start text-xs h-9 gap-2">
                                            <Phone className="w-3.5 h-3.5" /> Call Support
                                        </Button>
                                        <Button variant="outline" size="sm" className="w-full justify-start text-xs h-9 gap-2">
                                            <Mail className="w-3.5 h-3.5" /> Email Us
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* "Share" Teaser */}
                            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                                <h3 className="font-display font-medium text-charcoal mb-2">Share your creation</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Your design is unique. Show it off to your friends while it's being made.
                                </p>
                                <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-primary/10">
                                    <code className="text-[10px] text-muted-foreground flex-1 truncate">
                                        tfashion.co/track/{ORDER_DETAILS.id}
                                    </code>
                                    <Button size="icon" variant="ghost" className="h-6 w-6">
                                        <Copy className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
}

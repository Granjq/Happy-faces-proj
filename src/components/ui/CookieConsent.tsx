import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Shield, BarChart3, Megaphone, Settings2, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface CookiePreferences {
    necessary: boolean; // Always true
    analytics: boolean;
    marketing: boolean;
}

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    // Default preferences: Necessary is always on
    const [preferences, setPreferences] = useState<CookiePreferences>({
        necessary: true,
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        // Check if user has already made a choice
        const storedConsent = localStorage.getItem("cookie-consent-v2");
        if (!storedConsent) {
            // Delay showing the banner slightly for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        } else {
            // Load stored preferences if needed in the future for a "manage cookies" footer link
            try {
                setPreferences(JSON.parse(storedConsent));
            } catch (e) {
                // Fallback or legacy format handling could go here
            }
        }
    }, []);

    const saveConsent = (prefs: CookiePreferences) => {
        localStorage.setItem("cookie-consent-v2", JSON.stringify(prefs));
        setIsVisible(false);
        // Here you would trigger actual tracking scripts based on 'prefs'
        // e.g., if (prefs.analytics) enableGoogleAnalytics();
    };

    const handleAcceptAll = () => {
        const allEnabled = { necessary: true, analytics: true, marketing: true };
        setPreferences(allEnabled);
        saveConsent(allEnabled);
    };

    const handleDeclineAll = () => {
        const allDisabled = { necessary: true, analytics: false, marketing: false };
        setPreferences(allDisabled);
        saveConsent(allDisabled);
    };

    const handleSavePreferences = () => {
        saveConsent(preferences);
    };

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    layout
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 sm:bottom-4 right-0 sm:right-4 z-[100] w-full sm:w-[450px]"
                >
                    <div className="bg-white/95 backdrop-blur-md border-t sm:border border-gray-100 p-0 sm:rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">

                        {/* Header / Main Banner Content */}
                        <div className="p-6 relative">
                            {/* Decorative background blur */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                            {!showSettings ? (
                                // --- Simple View ---
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col gap-4"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gray-50 rounded-xl flex-shrink-0">
                                            <Cookie className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <h3 className="font-display font-medium text-charcoal text-base">We value your privacy</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.
                                                <button
                                                    onClick={() => setShowSettings(true)}
                                                    className="ml-1 text-primary hover:underline font-medium inline-flex items-center"
                                                >
                                                    Customize <Settings2 className="w-3 h-3 ml-0.5" />
                                                </button>
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setIsVisible(false)}
                                            className="text-gray-400 hover:text-charcoal transition-colors p-1"
                                            aria-label="Close"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                        <Button
                                            variant="outline"
                                            onClick={handleDeclineAll}
                                            className="flex-1 border-gray-200 hover:bg-gray-50 text-xs sm:text-sm h-10"
                                        >
                                            Decline All
                                        </Button>
                                        <Button
                                            onClick={handleAcceptAll}
                                            className="flex-1 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 text-xs sm:text-sm h-10 font-medium"
                                        >
                                            Accept All
                                        </Button>
                                    </div>
                                </motion.div>
                            ) : (
                                // --- Settings View ---
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex flex-col h-full"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setShowSettings(false)}
                                                className="h-8 w-8 -ml-2 text-muted-foreground hover:text-charcoal"
                                            >
                                                <ChevronDown className="h-5 w-5 rotate-90" />
                                            </Button>
                                            <h3 className="font-display font-medium text-charcoal text-lg">Cookie Preferences</h3>
                                        </div>
                                        <button
                                            onClick={() => setIsVisible(false)}
                                            className="text-gray-400 hover:text-charcoal p-1"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <ScrollArea className="flex-1 pr-4 -mr-4 max-h-[300px]">
                                        <div className="space-y-4">
                                            {/* Necessary */}
                                            <div className="flex items-start justify-between gap-4 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                                                <div className="flex gap-3">
                                                    <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <p className="font-medium text-sm text-charcoal">Strictly Necessary</p>
                                                        <p className="text-xs text-muted-foreground mt-1">Required for the website to function (e.g., login, cart).</p>
                                                    </div>
                                                </div>
                                                <Switch checked={true} disabled aria-label="Strictly necessary cookies" />
                                            </div>

                                            {/* Analytics */}
                                            <div className="flex items-start justify-between gap-4 p-3 hover:bg-gray-50 rounded-xl border border-transparent hover:border-gray-100 transition-colors">
                                                <div className="flex gap-3">
                                                    <BarChart3 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <p className="font-medium text-sm text-charcoal">Analytics</p>
                                                        <p className="text-xs text-muted-foreground mt-1">Help us improve by collecting anonymous usage data.</p>
                                                    </div>
                                                </div>
                                                <Switch
                                                    checked={preferences.analytics}
                                                    onCheckedChange={(checked) => setPreferences(p => ({ ...p, analytics: checked }))}
                                                />
                                            </div>

                                            {/* Marketing */}
                                            <div className="flex items-start justify-between gap-4 p-3 hover:bg-gray-50 rounded-xl border border-transparent hover:border-gray-100 transition-colors">
                                                <div className="flex gap-3">
                                                    <Megaphone className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <p className="font-medium text-sm text-charcoal">Marketing</p>
                                                        <p className="text-xs text-muted-foreground mt-1">Allow personalized ads and relevant content.</p>
                                                    </div>
                                                </div>
                                                <Switch
                                                    checked={preferences.marketing}
                                                    onCheckedChange={(checked) => setPreferences(p => ({ ...p, marketing: checked }))}
                                                />
                                            </div>
                                        </div>
                                    </ScrollArea>

                                    <div className="flex gap-3 pt-6 mt-2 border-t border-gray-100">
                                        <Button
                                            variant="outline"
                                            onClick={handleDeclineAll}
                                            className="flex-1 text-xs"
                                        >
                                            Decline All
                                        </Button>
                                        <Button
                                            onClick={handleSavePreferences}
                                            className="flex-[2] bg-charcoal hover:bg-black text-white text-xs font-medium"
                                        >
                                            Save Preferences
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

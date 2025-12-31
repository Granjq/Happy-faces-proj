import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2, ArrowLeft, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

interface ForgotPasswordProps {
    onBack: () => void;
}

export function ForgotPassword({ onBack }: ForgotPasswordProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [method, setMethod] = useState("email");
    const [isSent, setIsSent] = useState(false);

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API delay
        setTimeout(() => {
            setIsSent(true);
            toast.success(`Reset instructions sent to your ${method}!`);
            setIsLoading(false);
        }, 1500);
    };

    if (isSent) {
        return (
            <div className="space-y-6 py-4 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold">Check your {method}</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                    We have sent a password reset link to <span className="font-medium text-foreground">{method === "email" ? email : phone}</span>.
                </p>
                <Button variant="outline" className="w-full" onClick={onBack}>
                    Back to Login
                </Button>
                <div className="text-sm text-muted-foreground">
                    Didn't receive the code? <button className="text-primary hover:underline" onClick={() => setIsSent(false)}>Resend</button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 py-4">
            <div className="space-y-2">
                <Button variant="ghost" size="sm" className="pl-0 hover:bg-transparent text-muted-foreground" onClick={onBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                </Button>
                <h3 className="text-2xl font-display font-bold">Forgot Password?</h3>
                <p className="text-muted-foreground text-sm">
                    No worries, we'll send you reset instructions.
                </p>
            </div>

            <Tabs defaultValue="email" className="w-full" onValueChange={setMethod}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="email">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                    </TabsTrigger>
                    <TabsTrigger value="phone">
                        <Phone className="w-4 h-4 mr-2" />
                        Phone
                    </TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <TabsContent value="email" className="space-y-4 mt-0">
                        <div className="space-y-2">
                            <Label htmlFor="reset-email">Email Address</Label>
                            <Input
                                id="reset-email"
                                placeholder="name@example.com"
                                type="email"
                                required
                                disabled={isLoading}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="phone" className="space-y-4 mt-0">
                        <div className="space-y-2">
                            <Label htmlFor="reset-phone">Phone Number</Label>
                            <Input
                                id="reset-phone"
                                placeholder="+254 7..."
                                type="tel"
                                required
                                disabled={isLoading}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </TabsContent>

                    <Button className="w-full bg-charcoal text-white hover:bg-primary" type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Reset Password
                    </Button>
                </form>
            </Tabs>

        </div>
    );
}

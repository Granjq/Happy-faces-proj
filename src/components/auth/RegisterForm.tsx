import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { SocialAuthButtons } from "./SocialAuthButtons";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

interface RegisterFormProps {
    onSuccess: () => void;
    onLoginClick: () => void;
}

export function RegisterForm({ onSuccess, onLoginClick }: RegisterFormProps) {
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsLoading(true);

        // Simulate API delay
        setTimeout(() => {
            login({
                id: "3",
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${formData.name}`
            });
            toast.success("Account created successfully!");
            onSuccess();
            setIsLoading(false);
        }, 1500);
    };

    const handleSocialLogin = (provider: "google" | "apple") => {
        setIsLoading(true);
        setTimeout(() => {
            login({
                id: "2",
                name: `Social User (${provider})`,
                email: `user@${provider}.com`,
                avatar: "https://github.com/shadcn.png"
            });
            toast.success(`Successfully signed up with ${provider}!`);
            onSuccess();
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="space-y-6 py-4">
            <div className="space-y-2 text-center">
                <h3 className="text-2xl font-display font-bold">Create an Account</h3>
                <p className="text-muted-foreground text-sm">
                    Join us to track orders and save your designs
                </p>
            </div>

            <SocialAuthButtons isLoading={isLoading} onSocialLogin={handleSocialLogin} />

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or sign up with
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        placeholder="John Doe"
                        required
                        disabled={isLoading}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        required
                        disabled={isLoading}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                        id="phone"
                        placeholder="+254 7..."
                        type="tel"
                        disabled={isLoading}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            required
                            disabled={isLoading}
                            className="pr-10"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                        </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        required
                        disabled={isLoading}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                </div>

                <Button className="w-full bg-charcoal text-white hover:bg-primary" type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                </Button>

                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={onLoginClick}
                        className="font-medium text-primary hover:underline"
                    >
                        Log in
                    </button>
                </div>
            </form>
        </div>
    );
}

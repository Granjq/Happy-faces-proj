import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { SocialAuthButtons } from "./SocialAuthButtons";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

interface LoginFormProps {
    onSuccess: () => void;
    onForgotPassword: () => void;
}

export function LoginForm({ onSuccess, onForgotPassword }: LoginFormProps) {
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API delay
        setTimeout(() => {
            // Mock validation
            if (formData.email && formData.password.length >= 6) {
                login({
                    id: "1",
                    name: "John Doe",
                    email: formData.email,
                    avatar: "https://github.com/shadcn.png"
                });
                toast.success("Successfully logged in!");
                onSuccess();
            } else {
                toast.error("Invalid credentials. Password must be at least 6 characters.");
            }
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
            toast.success(`Successfully logged in with ${provider}!`);
            onSuccess();
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="space-y-6 py-4">
            <div className="space-y-2 text-center">
                <h3 className="text-2xl font-display font-bold">Welcome Back</h3>
                <p className="text-muted-foreground text-sm">
                    Enter your credentials to access your account
                </p>
            </div>

            <SocialAuthButtons isLoading={isLoading} onSocialLogin={handleSocialLogin} />

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email or Phone</Label>
                    <Input
                        id="email"
                        placeholder="name@example.com"
                        type="text"
                        required
                        disabled={isLoading}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Button
                            variant="link"
                            className="px-0 font-normal h-auto text-xs"
                            onClick={(e) => { e.preventDefault(); onForgotPassword(); }}
                        >
                            Forgot password?
                        </Button>
                    </div>
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

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="remember"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                    />
                    <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                        Remember me for 30 days
                    </Label>
                </div>

                <Button className="w-full bg-charcoal text-white hover:bg-primary" type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                </Button>
            </form>
        </div>
    );
}

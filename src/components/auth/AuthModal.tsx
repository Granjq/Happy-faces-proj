import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ForgotPassword } from "./ForgotPassword";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultView?: "login" | "register";
}

export function AuthModal({ isOpen, onClose, defaultView = "login" }: AuthModalProps) {
    const [view, setView] = useState<"login" | "register" | "forgot">(defaultView);

    // Reset view when modal opens
    if (!isOpen && view !== defaultView) {
        setTimeout(() => setView(defaultView), 200);
    }

    const handleSuccess = () => {
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] p-6 gap-0 bg-background border border-border shadow-2xl">
                {view === "login" && (
                    <LoginForm
                        onSuccess={handleSuccess}
                        onForgotPassword={() => setView("forgot")}
                    />
                )}
                {view === "register" && (
                    <RegisterForm
                        onSuccess={handleSuccess}
                        onLoginClick={() => setView("login")}
                    />
                )}
                {view === "forgot" && (
                    <ForgotPassword
                        onBack={() => setView("login")}
                    />
                )}

                {view === "login" && (
                    <div className="mt-4 text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <button
                            onClick={() => setView("register")}
                            className="font-medium text-primary hover:underline outline-none"
                        >
                            Sign up
                        </button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

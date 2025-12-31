import { Button } from "@/components/ui/button";
import { Chrome, Apple } from "lucide-react";

interface SocialAuthButtonsProps {
  isLoading: boolean;
  onSocialLogin: (provider: "google" | "apple") => void;
}

export function SocialAuthButtons({ isLoading, onSocialLogin }: SocialAuthButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        onClick={() => onSocialLogin("google")}
        disabled={isLoading}
        className="w-full"
      >
        <Chrome className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button
        variant="outline"
        onClick={() => onSocialLogin("apple")}
        disabled={isLoading}
        className="w-full"
      >
        <Apple className="mr-2 h-4 w-4" />
        Apple
      </Button>
    </div>
  );
}

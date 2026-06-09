import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";


export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <Input
                {...props}
                ref={ref}
                type={showPassword ? "text" : "password"}
                className={cn("pr-10", className)}
            />

            <Button
                type="button"
                variant="ghost"
                size="icon"
                tabIndex={-1}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
            >
                {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                ) : (
                    <Eye className="h-4 w-4" />
                )}
            </Button>
        </div>
    );
});

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };


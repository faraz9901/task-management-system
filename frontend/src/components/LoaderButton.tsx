import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { Spinner } from "./ui/spinner";

type LoadingButtonProps = ComponentProps<typeof Button> & {
    loading?: boolean;
    loadingText?: string;
};

export function LoadingButton({
    loading = false,
    loadingText,
    children,
    disabled,
    className,
    ...props
}: LoadingButtonProps) {
    return (
        <Button
            disabled={disabled || loading}
            className={cn(className)}
            {...props}
        >
            {loading && (
                <Spinner className="h-4 w-4" />
            )}

            {loading && loadingText
                ? loadingText
                : children}
        </Button>
    );
}
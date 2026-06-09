import { LoadingButton } from "@/components/LoaderButton";
import { PasswordInput } from "@/components/PasswordInput";
import PublicRoute from "@/components/PublicRoute";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useLogin } from "../hooks/useAuth";
import { loginSchema, type LoginFormData } from "../utils/auth.schemas";

type FormErrors = Partial<Record<keyof LoginFormData, string>>;

export default function LoginPage() {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });
    const login = useLogin()

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name as keyof LoginFormData]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = loginSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors: FormErrors = {};

            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof LoginFormData;

                if (!fieldErrors[field]) {
                    fieldErrors[field] = issue.message;
                }
            });

            setErrors(fieldErrors);
            return;
        }

        await login.mutateAsync(formData);
    };

    return (
        <PublicRoute redirectIfAuthenticated>
            <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Sign In
                        </CardTitle>
                        <CardDescription>
                            Enter your credentials to continue
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    Email
                                </Label>

                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                                {errors.email && (
                                    <p className="text-sm text-destructive">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">
                                    Password
                                </Label>

                                <PasswordInput
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="********"
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                                {errors.password && (
                                    <p className="text-sm text-destructive">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <LoadingButton
                                type="submit"
                                className="w-full"
                                loading={login.isPending}
                                loadingText="Signing In..."
                            >
                                Sign In
                            </LoadingButton>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </PublicRoute>
    );
}
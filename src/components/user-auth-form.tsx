import { Login } from "@/lib/api";
import { useUserStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { useFormik } from "formik";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>("");
    const { setToken } = useUserStore();
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate: values => {
            const errors: any = {};
            if (!values.username) {
                errors.username = "Required";
            } else if (values.username.length < 4) {
                errors.username = "Username must be at least 4 characters";
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 6) {
                errors.password = 'Password must be at least 6 characters';
            }
            return errors;
        },
        onSubmit: values => {
            setIsLoading(true);
            Login(values.username, values.password).then((response) => {
                setToken(response.data);
                if (response.data.is_admin)
                    router.push('/admin');
                else
                    router.push('/');
            }).catch((error) => {
                if (!error.response) {
                    setError("Server error, please try again later.");
                }
                else if (error.response.status === 401) {
                    setError("Invalid username or password");
                }
            }
            ).finally(() => {
                setIsLoading(false);
            });
        },
    });


    return (
        <div className={cn("grid gap-6", className)} {...props}>
            {
                error && <Alert variant="destructive">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>خطأ</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Alert>
            }
            <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-5">
                    <div className="grid gap-2">
                        <Label className="sr-only" htmlFor="email">
                            Username
                        </Label>
                        <Input
                            id="username"
                            name="username"
                            placeholder="Username"
                            type="text"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label className="sr-only" htmlFor="email">
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            placeholder="Password"
                            type="password"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <Button disabled={isLoading} type="submit">
                        {isLoading && (
                            <Clock className="m-2 h-4 w-4 animate-spin" />
                        )}
                        Login
                    </Button>
                </div>
            </form>
        </div>
    );
}
"use client";
import { LockIcon } from "@radix-ui/react-icons";
import { UserAuthForm } from "@/components/user-auth-form";


export default function AuthenticationPage() {
    return (
        <>
            <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0">
                <div className="lg:p-8 md:mt-10">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <LockIcon className="mx-auto my-2 h-12 w-12 text-primary" />
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Login
                            </h1>
                            <p className="white text-sm text-muted-foreground">
                                Enter your credentials to access your account
                            </p>
                        </div>
                        <UserAuthForm />
                    </div>
                </div>
            </div>
        </>
    );
}
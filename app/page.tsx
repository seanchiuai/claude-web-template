"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { SignUpButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Authenticated>
        <RedirectToDashboard />
      </Authenticated>
      <Unauthenticated>
        <SignInForm />
      </Unauthenticated>
    </>
  );
}

function RedirectToDashboard() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return null;
}

function SignInForm() {
  return (
    <div className="min-h-screen texture-minimal flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-12">
        <div className="text-center space-y-3 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold tracking-tight text-foreground">
            Welcome
          </h1>
          <p className="text-sm text-muted-foreground font-light tracking-wide">
            Sign in to continue or create a new account
          </p>
        </div>

        <div className="flex flex-col gap-3 animate-fade-in stagger-1">
          <SignInButton mode="modal">
            <Button 
              className="w-full h-12 text-base font-medium tracking-wide transition-all duration-200 hover:shadow-md hover:scale-[1.01] active:scale-[0.99]" 
              size="lg"
            >
              Sign in
            </Button>
          </SignInButton>

          <SignUpButton mode="modal">
            <Button 
              variant="outline" 
              className="w-full h-12 text-base font-medium tracking-wide border-border/60 transition-all duration-200 hover:border-border hover:bg-muted/50 hover:shadow-sm active:scale-[0.99]" 
              size="lg"
            >
              Sign up
            </Button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}


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
      <div className="w-full max-w-xs">
        <div className="flex flex-col gap-4">
          <SignInButton mode="modal">
            <Button className="w-full" size="lg">
              Sign in
            </Button>
          </SignInButton>

          <SignUpButton mode="modal">
            <Button variant="outline" className="w-full" size="lg">
              Sign up
            </Button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}


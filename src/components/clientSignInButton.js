"use client";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function ClientSignInButton({ title = "Login" }) {
  return (
    <SignInButton>
      <Button className="bg-[#fa5407] text-white hover:text-white">{title}</Button>
    </SignInButton>
  );
}


"use client";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function ClientSignInButton({ title = "Login" }) {
  return (
    <SignInButton>
      <Button className="bg-[#75E379] text-black hover:text-white">{title}</Button>
    </SignInButton>
  );
}


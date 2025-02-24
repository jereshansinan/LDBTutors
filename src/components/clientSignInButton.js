"use client";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function ClientSignInButton() {
  return (
    <SignInButton>
      <Button className="bg-[#75E379] text-black hover:text-white">Login</Button>
    </SignInButton>
  );
}

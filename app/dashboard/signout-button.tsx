"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export function SignoutButton() {
  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (!error) {
      redirect("/");
    }

    alert("Error signing out: " + error?.message);
  };

  return (
    <Button variant="outline" onClick={handleSignOut}>
      Sign out
    </Button>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createClient, isSupabaseEnabled } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const onSignOut = async () => {
    setPending(true);
    if (isSupabaseEnabled) {
      const supabase = createClient();
      await supabase?.auth.signOut();
    } else {
      sessionStorage.removeItem("form-demo-user");
    }
    toast.success("Signed out");
    router.push("/");
    router.refresh();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full"
      onClick={onSignOut}
      disabled={pending}
    >
      {pending ? "Signing out…" : "Sign out"}
    </Button>
  );
}

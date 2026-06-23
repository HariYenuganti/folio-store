"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SignOutButton } from "@/components/sign-out-button";
import { cn } from "@/lib/utils";
import { createClient, isSupabaseEnabled } from "@/lib/supabase/client";

const LINKS = [
  { href: "/account", label: "Profile" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/account/wishlist", label: "Wishlist" },
];

export function AccountNav() {
  const pathname = usePathname();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (!isSupabaseEnabled) {
      setSignedIn(!!sessionStorage.getItem("form-demo-user"));
      return;
    }
    const supabase = createClient();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setSignedIn(!!data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) =>
      setSignedIn(!!session?.user),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <aside>
      <nav className="flex flex-col text-sm">
        {LINKS.map((link) => {
          const active =
            link.href === "/account"
              ? pathname === "/account"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "border-l-2 py-2 pl-4 transition-colors",
                active
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      {signedIn && (
        <>
          <Separator className="my-6" />
          <SignOutButton />
        </>
      )}
    </aside>
  );
}

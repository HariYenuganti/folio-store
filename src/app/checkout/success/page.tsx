import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SuccessClear } from "./success-clear";
import { createClient } from "@/lib/supabase/server";
import { retrievePaidSession, persistOrderFromSession } from "@/lib/orders";

export const metadata = { title: "Order confirmed" };

/**
 * Records the paid order for the signed-in user as soon as they land here, so it
 * shows up instantly. The Stripe webhook records it too (covering closed tabs /
 * guests); both share persistOrderFromSession and are idempotent.
 */
async function recordOrder(sessionId: string) {
  const supabase = await createClient();
  if (!supabase) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  try {
    const session = await retrievePaidSession(sessionId);
    if (session) await persistOrderFromSession(supabase, session, user.id);
  } catch {
    // Best-effort — never block the confirmation page.
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; order?: string }>;
}) {
  const sp = await searchParams;
  if (sp.session_id) await recordOrder(sp.session_id);

  const orderId =
    sp.order ??
    (sp.session_id ? sp.session_id.slice(-12).toUpperCase() : "DEMO");

  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <SuccessClear />
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground">
        <Check className="h-6 w-6" />
      </div>
      <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
        Thank you for your order
      </p>
      <h1 className="mt-3 font-serif text-4xl">Order confirmed</h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        Your order is confirmed and your pieces are being prepared with care,
        typically shipping within 2–4 business days.
      </p>
      <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
        Order reference
      </p>
      <p className="mt-1 font-mono text-sm tracking-tight">{orderId}</p>

      <div className="mt-10 flex gap-3">
        <Button asChild variant="outline" className="rounded-none">
          <Link href="/account/orders">View orders</Link>
        </Button>
        <Button asChild className="rounded-none">
          <Link href="/shop">Keep browsing</Link>
        </Button>
      </div>
    </div>
  );
}

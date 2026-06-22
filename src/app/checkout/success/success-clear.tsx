"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useCart, cartSubtotal } from "@/store/cart";
import { createClient } from "@/lib/supabase/client";

/**
 * Runs once on the success page (post-Stripe redirect): records the order to
 * Supabase for the signed-in user (best-effort, idempotent by session id),
 * then clears the cart.
 */
export function SuccessClear() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const params = useSearchParams();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const sessionId = params.get("session_id") ?? params.get("order") ?? null;
    const snapshot = items;

    (async () => {
      try {
        const supabase = createClient();
        if (supabase && snapshot.length > 0) {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (user) {
            const subtotal = cartSubtotal(snapshot);
            const shipping = subtotal >= 20000 ? 0 : 1500;
            await supabase.from("orders").upsert(
              {
                user_id: user.id,
                email: user.email,
                status: "paid",
                total: subtotal + shipping,
                items: snapshot.map((i) => ({
                  name: i.name,
                  slug: i.slug,
                  price: i.price,
                  quantity: i.quantity,
                  size: i.size,
                  color: i.color,
                  image: i.image,
                })),
                stripe_session_id: sessionId,
              },
              { onConflict: "stripe_session_id", ignoreDuplicates: true },
            );
          }
        }
      } catch {
        // Best-effort — never block the confirmation page.
      } finally {
        clear();
      }
    })();
  }, [items, clear, params]);

  return null;
}

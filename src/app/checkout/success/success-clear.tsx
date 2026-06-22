"use client";

import { useEffect } from "react";
import { useCart } from "@/store/cart";

/** Clears the cart once the success page mounts (post-Stripe redirect). */
export function SuccessClear() {
  const clear = useCart((s) => s.clear);
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}

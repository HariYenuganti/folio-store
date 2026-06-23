/**
 * Single source of truth for shipping pricing (all amounts in cents).
 * Free over the threshold, otherwise a flat rate. Used by the cart, the
 * checkout summary, and the Stripe Checkout session so they never drift.
 */
export const FREE_SHIPPING_THRESHOLD = 20000; // $200
export const FLAT_SHIPPING_RATE = 1500; // $15

/** Shipping cost (cents) for a given subtotal (cents). */
export function shippingFor(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;
}

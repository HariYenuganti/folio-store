import { describe, it, expect, beforeEach } from "vitest";
import { useCart, cartSubtotal, cartCount } from "@/store/cart";
import type { CartItem } from "@/types";

const item = (over: Partial<CartItem> = {}): CartItem => ({
  productId: "p1",
  slug: "tee",
  name: "Tee",
  price: 2000,
  image: "/x.jpg",
  size: "M",
  color: "Black",
  quantity: 1,
  ...over,
});

beforeEach(() => useCart.setState({ items: [], isOpen: false }));

describe("cart store", () => {
  it("adds an item and opens the drawer", () => {
    useCart.getState().add(item());
    expect(useCart.getState().items).toHaveLength(1);
    expect(useCart.getState().isOpen).toBe(true);
  });

  it("merges quantity for the same product/size/color line", () => {
    useCart.getState().add(item({ quantity: 1 }));
    useCart.getState().add(item({ quantity: 2 }));
    expect(useCart.getState().items).toHaveLength(1);
    expect(useCart.getState().items[0].quantity).toBe(3);
  });

  it("keeps different size or color as separate lines", () => {
    useCart.getState().add(item({ size: "M" }));
    useCart.getState().add(item({ size: "L" }));
    expect(useCart.getState().items).toHaveLength(2);
  });

  it("removes a line", () => {
    useCart.getState().add(item());
    useCart.getState().remove("p1", "M", "Black");
    expect(useCart.getState().items).toHaveLength(0);
  });

  it("clamps quantity to a minimum of 1", () => {
    useCart.getState().add(item());
    useCart.getState().setQuantity("p1", "M", "Black", 0);
    expect(useCart.getState().items[0].quantity).toBe(1);
  });

  it("computes subtotal and count", () => {
    useCart.getState().add(item({ price: 2000, quantity: 2 }));
    useCart.getState().add(item({ size: "L", price: 1500, quantity: 1 }));
    const items = useCart.getState().items;
    expect(cartSubtotal(items)).toBe(5500);
    expect(cartCount(items)).toBe(3);
  });
});

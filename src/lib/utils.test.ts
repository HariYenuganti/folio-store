import { describe, it, expect } from "vitest";
import { cn, formatPrice, slugify, truncate } from "@/lib/utils";

describe("formatPrice", () => {
  it("formats cents as USD", () => {
    expect(formatPrice(2539)).toBe("$25.39");
    expect(formatPrice(10000)).toBe("$100");
  });
});

describe("cn", () => {
  it("merges and dedupes conflicting tailwind classes", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
  it("drops falsy values", () => {
    expect(cn("text-sm", false && "hidden", "font-bold")).toBe(
      "text-sm font-bold",
    );
  });
});

describe("slugify", () => {
  it("kebab-cases and strips punctuation", () => {
    expect(slugify("Blue & Black Check Shirt")).toBe("blue-black-check-shirt");
  });
});

describe("truncate", () => {
  it("truncates long strings with an ellipsis", () => {
    expect(truncate("hello world", 5)).toBe("hell…");
  });
  it("leaves short strings untouched", () => {
    expect(truncate("hi", 5)).toBe("hi");
  });
});

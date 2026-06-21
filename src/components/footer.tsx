import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const GROUPS = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All products" },
      { href: "/shop?category=outerwear", label: "Outerwear" },
      { href: "/shop?category=knitwear", label: "Knitwear" },
      { href: "/shop?category=tops", label: "Tops" },
      { href: "/shop?category=bottoms", label: "Bottoms" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "#", label: "Our story" },
      { href: "#", label: "Materials" },
      { href: "#", label: "Sustainability" },
      { href: "#", label: "Journal" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "#", label: "Shipping" },
      { href: "#", label: "Returns" },
      { href: "#", label: "Sizing" },
      { href: "#", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="wordmark text-xl">FORM</p>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Considered essentials, made by craftspeople we trust. Sign up for
              new arrivals, restocks, and dispatches from the studio.
            </p>
            <form className="mt-6 flex max-w-sm gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-none"
              />
              <Button size="sm" className="rounded-none">
                Subscribe
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-3 gap-8 md:col-span-7">
            {GROUPS.map((g) => (
              <div key={g.title}>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {g.title}
                </p>
                <ul className="mt-4 space-y-2">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} FORM Studio. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

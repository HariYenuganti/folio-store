"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/** Footer newsletter signup. Demo-only — validates and confirms with a toast,
 *  no request is sent. */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    // Simulated subscribe — swap for a real endpoint when wiring a provider.
    setTimeout(() => {
      toast.success("You're on the list. Welcome to FORM.");
      setEmail("");
      setSubmitting(false);
    }, 400);
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 flex max-w-sm gap-2">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        aria-label="Email address"
        className="flex-1 rounded-none"
      />
      <Button
        type="submit"
        size="sm"
        className="rounded-none"
        disabled={submitting}
      >
        {submitting ? "…" : "Subscribe"}
      </Button>
    </form>
  );
}

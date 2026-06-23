"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  label: z.string().optional(),
  line1: z.string().min(1, "Required"),
  line2: z.string().optional(),
  city: z.string().min(1, "Required"),
  state: z.string().optional(),
  postal_code: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
});

type Values = z.infer<typeof schema>;

interface AddressRow extends Values {
  id: string;
}

// Normalized dedup key — matches the DB's addr_key (lowercased, trimmed).
const addrKey = (a: { line1?: string; postal_code?: string }) =>
  `${(a.line1 ?? "").trim().toLowerCase()}|${(a.postal_code ?? "").trim().toLowerCase()}`;

export function AddressesClient() {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<AddressRow[]>([]);
  const [adding, setAdding] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { country: "United States" },
  });

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      if (!supabase) {
        setLoading(false);
        return;
      }
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      setSignedIn(true);
      setUserId(user.id);
      const { data } = await supabase
        .from("addresses")
        .select("*")
        .order("created_at", { ascending: false });
      setAddresses((data as AddressRow[]) ?? []);
      setLoading(false);
    })();
  }, []);

  const onAdd = handleSubmit(async (values) => {
    const supabase = createClient();
    if (!supabase || !userId) return;

    // Trim everything so stray whitespace doesn't create "different" addresses.
    const trimmed = {
      label: values.label?.trim() || undefined,
      line1: values.line1.trim(),
      line2: values.line2?.trim() || undefined,
      city: values.city.trim(),
      state: values.state?.trim() || undefined,
      postal_code: values.postal_code.trim(),
      country: values.country.trim(),
    };

    // Skip if the same address (normalized line1 + postal code) is already saved.
    if (addresses.some((a) => addrKey(a) === addrKey(trimmed))) {
      toast.error("That address is already saved");
      return;
    }

    const { data, error } = await supabase
      .from("addresses")
      .insert({ ...trimmed, user_id: userId })
      .select()
      .single();
    if (error) {
      toast.error(
        error.code === "23505"
          ? "That address is already saved"
          : error.message,
      );
      return;
    }
    setAddresses((prev) => [data as AddressRow, ...prev]);
    toast.success("Address saved");
    reset({ country: "United States" });
    setAdding(false);
  });

  const onDelete = async (id: string) => {
    const supabase = createClient();
    if (!supabase) return;
    const prev = addresses;
    setAddresses((a) => a.filter((x) => x.id !== id)); // optimistic
    const { error } = await supabase.from("addresses").delete().eq("id", id);
    if (error) {
      setAddresses(prev);
      toast.error(error.message);
    } else {
      toast.success("Address removed");
    }
  };

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading addresses…</p>;
  }

  if (!signedIn) {
    return (
      <div className="border border-border p-12 text-center">
        <p className="font-serif text-2xl">Sign in to manage addresses</p>
        <Button asChild className="mt-6 rounded-none">
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {addresses.length === 0 && !adding && (
        <div className="border border-border p-8 text-center">
          <p className="font-serif text-2xl">No saved addresses</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Save an address to speed up future checkouts.
          </p>
        </div>
      )}

      {addresses.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((a) => (
            <div
              key={a.id}
              className="relative border border-border p-5 text-sm"
            >
              <button
                onClick={() => onDelete(a.id)}
                aria-label="Remove address"
                className="absolute right-3 top-3 text-muted-foreground transition-colors hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              {a.label && (
                <p className="mb-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {a.label}
                </p>
              )}
              <address className="not-italic leading-relaxed">
                <span className="block">{a.line1}</span>
                {a.line2 && <span className="block">{a.line2}</span>}
                <span className="block">
                  {[a.city, a.state, a.postal_code].filter(Boolean).join(", ")}
                </span>
                <span className="block">{a.country}</span>
              </address>
            </div>
          ))}
        </div>
      )}

      {adding ? (
        <form
          onSubmit={onAdd}
          noValidate
          className="space-y-4 border border-border p-6"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            New address
          </p>
          <FormField
            id="label"
            label="Label (optional)"
            placeholder="Home, Work…"
            {...register("label")}
          />
          <FormField
            id="line1"
            label="Address"
            autoComplete="address-line1"
            error={errors.line1?.message}
            {...register("line1")}
          />
          <FormField
            id="line2"
            label="Apt, suite (optional)"
            autoComplete="address-line2"
            {...register("line2")}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="city"
              label="City"
              autoComplete="address-level2"
              error={errors.city?.message}
              {...register("city")}
            />
            <FormField
              id="state"
              label="State (optional)"
              autoComplete="address-level1"
              {...register("state")}
            />
            <FormField
              id="postal_code"
              label="Postal code"
              autoComplete="postal-code"
              error={errors.postal_code?.message}
              {...register("postal_code")}
            />
            <FormField
              id="country"
              label="Country"
              autoComplete="country-name"
              error={errors.country?.message}
              {...register("country")}
            />
          </div>
          <div className="flex gap-3">
            <Button
              type="submit"
              className="rounded-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving…" : "Save address"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-none"
              onClick={() => {
                reset({ country: "United States" });
                setAdding(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <Button
          variant="outline"
          className="rounded-none"
          onClick={() => setAdding(true)}
        >
          <Plus className="h-4 w-4" />
          Add address
        </Button>
      )}
    </div>
  );
}

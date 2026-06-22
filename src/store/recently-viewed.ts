"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX = 8;

interface RecentlyViewedState {
  slugs: string[];
  record: (slug: string) => void;
  clear: () => void;
}

export const useRecentlyViewed = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      slugs: [],
      record: (slug) =>
        set((s) => ({
          slugs: [slug, ...s.slugs.filter((x) => x !== slug)].slice(0, MAX),
        })),
      clear: () => set({ slugs: [] }),
    }),
    { name: "folio-recently-viewed" },
  ),
);

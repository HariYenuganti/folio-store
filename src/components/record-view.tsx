"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/store/recently-viewed";

/** Records a product view in the recently-viewed history on mount. */
export function RecordView({ slug }: { slug: string }) {
  const record = useRecentlyViewed((s) => s.record);
  useEffect(() => {
    record(slug);
  }, [slug, record]);
  return null;
}

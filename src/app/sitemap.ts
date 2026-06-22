import type { MetadataRoute } from "next";
import { appUrl } from "@/lib/env";
import { CATEGORIES } from "@/lib/data/products";
import { getCatalog } from "@/lib/data/repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = appUrl.replace(/\/$/, "");
  const catalog = await getCatalog();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, priority: 1, changeFrequency: "weekly" },
    { url: `${base}/shop`, priority: 0.9, changeFrequency: "daily" },
    { url: `${base}/about`, priority: 0.5, changeFrequency: "monthly" },
    { url: `${base}/help`, priority: 0.5, changeFrequency: "monthly" },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${base}/shop?category=${c.slug}`,
    priority: 0.6,
    changeFrequency: "weekly",
  }));

  const productRoutes: MetadataRoute.Sitemap = catalog.map((p) => ({
    url: `${base}/shop/${p.slug}`,
    priority: 0.8,
    changeFrequency: "weekly",
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}

import coreWebVitals from "eslint-config-next/core-web-vitals";

const asArray = (c) => (Array.isArray(c) ? c : [c]);

export default [
  ...asArray(coreWebVitals),
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "drizzle/**",
      "next-env.d.ts",
      "src/lib/data/catalog.json",
      "*.config.*",
      "eslint.config.mjs",
    ],
  },
  {
    rules: {
      // Apostrophes/quotes render fine in modern React; the escapes hurt
      // copy readability more than they help.
      "react/no-unescaped-entities": "off",
      // New React 19 rule. It also flags canonical mount/hydration/data-load
      // effects (e.g. the next-themes `mounted` guard), so keep it as a hint
      // rather than a hard error.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

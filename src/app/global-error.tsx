"use client";

import { useEffect } from "react";

/**
 * Catches errors thrown in the root layout itself. Must render its own
 * <html>/<body> because it replaces the entire document.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem" }}>Something went wrong.</h1>
        <p style={{ color: "#666", maxWidth: "28rem" }}>
          The application hit an unexpected error. Please refresh to continue.
        </p>
        <button
          onClick={reset}
          style={{
            border: "1px solid currentColor",
            padding: "0.6rem 1.2rem",
            cursor: "pointer",
            background: "transparent",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}

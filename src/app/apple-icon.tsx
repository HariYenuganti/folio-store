import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon — the same serif "F" monogram as icon.svg, drawn with
// positioned divs (scaled from the 32px grid ×5.625) so no font is required.
export default function AppleIcon() {
  const cream = "#F9F8F5";
  const bar = (left: number, top: number, width: number, height: number) => ({
    position: "absolute" as const,
    background: cream,
    left,
    top,
    width,
    height,
  });
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#221E1C",
        position: "relative",
        display: "flex",
      }}
    >
      <div style={bar(61.9, 33.75, 20.25, 112.5)} />
      <div style={bar(61.9, 33.75, 67.5, 20.25)} />
      <div style={bar(61.9, 79.9, 52.9, 19.1)} />
      <div style={bar(50.6, 33.75, 42.75, 9.6)} />
      <div style={bar(50.6, 136.7, 42.75, 9.6)} />
    </div>,
    { ...size },
  );
}

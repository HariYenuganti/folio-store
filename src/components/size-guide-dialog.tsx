"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const ROWS = [
  { size: "XS", chest: "32–34", waist: "26–28", hip: "34–36" },
  { size: "S", chest: "35–37", waist: "29–31", hip: "37–39" },
  { size: "M", chest: "38–40", waist: "32–34", hip: "40–42" },
  { size: "L", chest: "41–43", waist: "35–37", hip: "43–45" },
  { size: "XL", chest: "44–46", waist: "38–40", hip: "46–48" },
  { size: "XXL", chest: "47–49", waist: "41–43", hip: "49–51" },
];

export function SizeGuideDialog() {
  return (
    <Dialog>
      <DialogTrigger className="text-xs uppercase tracking-widest underline-offset-4 hover:underline">
        Size guide
      </DialogTrigger>
      <DialogContent className="gap-0 p-6 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl normal-case tracking-normal">
            Size guide
          </DialogTitle>
          <DialogDescription>
            Measurements are body measurements in inches. Between sizes? Size up
            for a relaxed fit.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-widest text-muted-foreground">
                <th className="py-2 pr-4 font-normal">Size</th>
                <th className="py-2 pr-4 font-normal">Chest</th>
                <th className="py-2 pr-4 font-normal">Waist</th>
                <th className="py-2 font-normal">Hip</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr
                  key={r.size}
                  className="border-b border-border last:border-0"
                >
                  <td className="py-2.5 pr-4 font-medium uppercase tracking-widest">
                    {r.size}
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums text-muted-foreground">
                    {r.chest}&quot;
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums text-muted-foreground">
                    {r.waist}&quot;
                  </td>
                  <td className="py-2.5 tabular-nums text-muted-foreground">
                    {r.hip}&quot;
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          How to measure: keep the tape level and snug. Chest at the fullest
          point, waist at the natural waistline, hip at the widest point.
        </p>
      </DialogContent>
    </Dialog>
  );
}

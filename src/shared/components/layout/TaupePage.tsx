import type { ReactNode } from "react";

/** Public page on the taupe Figma background; `maxWidth` is the width of the content column. */
export default function TaupePage({ children, maxWidth = "max-w-[694px]" }: { children: ReactNode; maxWidth?: string }) {
  return (
    <main className="bg-page px-4 py-10">
      <div className={`mx-auto w-full ${maxWidth}`}>{children}</div>
    </main>
  );
}

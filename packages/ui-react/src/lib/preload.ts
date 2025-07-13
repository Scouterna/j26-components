import { useEffect } from "react";
import type { PreloadOptions } from "react-dom";

export type PreloadInfo = PreloadOptions & {
  href: string;
};

export function usePreloadImages(hrefs: string[]) {
  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    if (!isBrowser) return;

    const uniqueHrefs = Array.from(new Set(hrefs));

    import("react-dom")
      .then(({ preload }) => {
        for (const href of uniqueHrefs) {
          preload(href, {
            as: "image",
          });
        }
      })
      .catch((err) => console.warn("Couldn't import react-dom:", err));
  }, [isBrowser, hrefs]);
}

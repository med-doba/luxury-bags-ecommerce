"use client";

import { useEffect } from "react";

/**
 * Custom hook to handle browser extension hydration mismatches
 * This prevents hydration errors caused by browser extensions that modify the DOM
 */
export function useHydrationFix() {
  useEffect(() => {
    // Prevent hydration mismatches by ensuring consistent client-side behavior
    if (typeof window !== "undefined") {
      const cleanupExtensionAttributes = () => {
        const htmlElement = document.documentElement;

        // Specific attributes from your error: speedupyoutubeads and resize
        const extensionAttributes = [
          "speedupyoutubeads",
          "resize",
          "data-extension",
          "data-adblock",
          "data-youtube-extension",
          "cz-shortcut-listen",
          "spellcheck",
          "data-darkreader-mode",
          "data-darkreader-scheme",
        ];

        extensionAttributes.forEach((attr) => {
          if (htmlElement.hasAttribute(attr)) {
            htmlElement.removeAttribute(attr);
          }
        });

        // Also check body for similar attributes
        const bodyElement = document.body;
        if (bodyElement) {
          extensionAttributes.forEach((attr) => {
            if (bodyElement.hasAttribute(attr)) {
              bodyElement.removeAttribute(attr);
            }
          });
        }
      };

      // Run immediately
      cleanupExtensionAttributes();

      // Also run after a short delay to catch extensions that modify DOM after page load
      const timeoutId = setTimeout(cleanupExtensionAttributes, 100);

      // Optional: Set up a MutationObserver to watch for dynamic attribute changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            (mutation.target === document.documentElement ||
              mutation.target === document.body)
          ) {
            cleanupExtensionAttributes();
          }
        });
      });

      // Start observing
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: [
          "speedupyoutubeads",
          "resize",
          "data-extension",
          "data-adblock",
        ],
      });

      // Cleanup on unmount
      return () => {
        clearTimeout(timeoutId);
        observer.disconnect();
      };
    }
  }, []);
}

export default useHydrationFix;

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * A hook that calls the provided callback when the route changes
 * Useful for closing modals, drawers, etc. when navigating to a new page
 */
export function useCloseOnNavigation(callback: () => void) {
  const pathname = usePathname();

  useEffect(() => {
    // Call the callback when the pathname changes
    callback();
  }, [pathname, callback]);
}

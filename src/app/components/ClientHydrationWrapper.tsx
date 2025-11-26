"use client";

import { ReactNode } from "react";
import { useHydrationFix } from "@/app/hooks/useHydrationFix";

interface ClientHydrationWrapperProps {
  children: ReactNode;
}

/**
 * Wrapper component that handles client-side hydration fixes
 * Use this to wrap components that might have hydration issues
 */
export default function ClientHydrationWrapper({
  children,
}: ClientHydrationWrapperProps) {
  useHydrationFix();

  return <>{children}</>;
}

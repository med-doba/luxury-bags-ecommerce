import type React from "react";
export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout doesn't check authentication
  return <>{children}</>;
}

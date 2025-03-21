// /**
//  * Gets the site URL for a locally hosted application
//  */
// export function getSiteUrl(): string {
//   // If there's a custom site URL defined in environment variables, use that
//   if (process.env.NEXT_PUBLIC_SITE_URL) {
//     return process.env.NEXT_PUBLIC_SITE_URL;
//   }

//   // For local development, default to localhost:3000
//   return "http://localhost:3000";
// }

/**
 * Gets the site URL for use in absolute URLs
 */
export function getSiteUrl(): string {
  // If there's a custom site URL defined in environment variables, use that
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // For local development, default to localhost:3000
  return "http://localhost:3000";
}

import type { NextApiRequest, NextApiResponse } from "next";
import { revalidateTag } from "next/cache";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const tag = req.query.tag as string;

    if (!tag) {
      return res.status(400).json({ message: "Missing tag parameter" });
    }

    // This is a workaround since revalidateTag is a Server Action
    // and can't be directly called from an API route in Next.js 13+
    // In a real app, you'd use a more secure approach with a secret token

    // Call the revalidation function
    revalidateTag(tag);

    return res.status(200).json({ revalidated: true, tag });
  } catch (err) {
    return res.status(500).json({ message: "Error revalidating", error: err });
  }
}

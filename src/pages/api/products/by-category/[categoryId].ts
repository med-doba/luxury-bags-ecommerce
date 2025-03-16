import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { categoryId } = req.query;

  if (!categoryId || typeof categoryId !== "string") {
    return res.status(400).json({ error: "Category ID is required" });
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId: categoryId,
      },
      include: {
        category: true,
        images: true,
      },
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return res.status(500).json({ error: "Error fetching products" });
  }
}

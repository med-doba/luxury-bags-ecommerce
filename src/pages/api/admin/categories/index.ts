import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const categories = await prisma.category.findMany({
        include: { products: true },
      });
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: "Error fetching categories" });
    }
  } else if (req.method === "POST") {
    try {
      const newCategory = await prisma.category.create({
        data: req.body,
      });
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: "Error creating category" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

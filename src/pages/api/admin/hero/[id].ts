import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const updatedHeroSection = await prisma.heroSection.update({
        where: { id: String(id) },
        data: req.body,
      });
      res.status(200).json(updatedHeroSection);
    } catch (error) {
      res.status(500).json({ error: "Error updating hero section" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.heroSection.delete({
        where: { id: String(id) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Error deleting hero section" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const heroSections = await prisma.heroSection.findMany();
      res.status(200).json(heroSections);
    } catch (error) {
      res.status(500).json({ error: "Error fetching hero sections" });
    }
  } else if (req.method === "POST") {
    try {
      const { title, subtitle, imageUrl } = req.body;
      console.log("body === ", req.body);
      const newHeroSection = await prisma.heroSection.create({
        data: { title, subtitle, imageUrl },
      });
      res.status(201).json(newHeroSection);
    } catch (error) {
      res.status(500).json({ error: "Error creating hero section" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   //   console.log("req : ", req);
//   if (req.method === "GET") {
//     try {
//       const products = await prisma.product.findMany();
//       res.status(200).json(products);
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching products" });
//     }
//   } else if (req.method === "POST") {
//     try {
//       console.log("newProduct === ", req.body);
//       const newProduct = await prisma.product.create({
//         data: req.body,
//       });
//       res.status(201).json(newProduct);
//     } catch (error) {
//       //   console.log("error === ", error);
//       res.status(500).json({ error: "Error creating product" });
//     }
//   } else {
//     res.setHeader("Allow", ["GET", "POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany({
        include: { category: true },
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Error fetching products" });
    }
  } else if (req.method === "POST") {
    try {
      const { categoryId, ...productData } = req.body;
      const newProduct = await prisma.product.create({
        data: {
          ...productData,
          category: { connect: { id: categoryId } },
        },
        include: { category: true },
      });
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: "Error creating product" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

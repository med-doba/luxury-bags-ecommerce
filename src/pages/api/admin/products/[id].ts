// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { id } = req.query;
//   console.log("req : ", req);
//   if (req.method === "PUT") {
//     try {
//       const updatedProduct = await prisma.product.update({
//         where: { id: String(id) },
//         data: req.body,
//       });
//       res.status(200).json(updatedProduct);
//     } catch (error) {
//       res.status(500).json({ error: "Error updating product" });
//     }
//   } else if (req.method === "DELETE") {
//     try {
//       await prisma.product.delete({
//         where: { id: String(id) },
//       });
//       res.status(204).end();
//     } catch (error) {
//       res.status(500).json({ error: "Error deleting product" });
//     }
//   } else {
//     res.setHeader("Allow", ["PUT", "DELETE"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const { categoryId, ...productData } = req.body;
      const updatedProduct = await prisma.product.update({
        where: { id: String(id) },
        data: {
          ...productData,
          category: { connect: { id: categoryId } },
        },
        include: { category: true },
      });
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: "Error updating product" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.product.delete({
        where: { id: String(id) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Error deleting product" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

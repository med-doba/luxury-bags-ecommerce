// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../lib/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { id } = req.query;

//   if (req.method === "GET") {
//     try {
//       const product = await prisma.product.findUnique({
//         where: { id: String(id) },
//       });
//       if (product) {
//         res.status(200).json(product);
//       } else {
//         res.status(404).json({ error: "Product not found" });
//       }
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching product" });
//     }
//   } else {
//     res.setHeader("Allow", ["GET"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../lib/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { id } = req.query;

//   if (req.method === "GET") {
//     try {
//       const product = await prisma.product.findUnique({
//         where: { id: String(id) },
//         include: { category: true },
//       });
//       if (product) {
//         res.status(200).json(product);
//       } else {
//         res.status(404).json({ error: "Product not found" });
//       }
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching product" });
//     }
//   } else {
//     res.setHeader("Allow", ["GET"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../lib/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { id } = req.query;

//   if (req.method === "GET") {
//     try {
//       const product = await prisma.product.findUnique({
//         where: { id: String(id) },
//         include: { category: true },
//       });
//       if (product) {
//         res.status(200).json(product);
//       } else {
//         res.status(404).json({ error: "Product not found" });
//       }
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching product" });
//     }
//   } else {
//     res.setHeader("Allow", ["GET"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const product = await prisma.product.findUnique({
        where: { id: String(id) },
        include: {
          category: true,
          images: true,
        },
      });
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching product" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

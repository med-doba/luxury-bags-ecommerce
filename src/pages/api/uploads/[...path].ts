// import type { NextApiRequest, NextApiResponse } from "next";
// import { join } from "path";
// import { readFile } from "fs/promises";
// import { existsSync } from "fs";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     const { path } = req.query;

//     if (!path || !Array.isArray(path)) {
//       return res.status(400).json({ message: "Invalid path" });
//     }

//     // Construct the file path
//     const filePath = join(process.cwd(), "public", "uploads", ...path);

//     // Check if file exists
//     if (!existsSync(filePath)) {
//       return res.status(404).json({ message: "File not found" });
//     }

//     // Read the file
//     const fileBuffer = await readFile(filePath);

//     // Determine content type based on file extension
//     const ext = filePath.split(".").pop()?.toLowerCase();
//     let contentType = "application/octet-stream";

//     switch (ext) {
//       case "png":
//         contentType = "image/png";
//         break;
//       case "jpg":
//       case "jpeg":
//         contentType = "image/jpeg";
//         break;
//       case "gif":
//         contentType = "image/gif";
//         break;
//       case "webp":
//         contentType = "image/webp";
//         break;
//     }

//     // Set the content type header
//     res.setHeader("Content-Type", contentType);
//     res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

//     // Send the file
//     res.send(fileBuffer);
//   } catch (error) {
//     console.error("Error serving file:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import { readFile } from "fs/promises";
import { existsSync } from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { path } = req.query;

    if (!path || !Array.isArray(path)) {
      return res.status(400).json({ message: "Invalid path" });
    }

    // Construct the file path
    const filePath = join(process.cwd(), "public", "uploads", ...path);

    // Check if file exists
    if (!existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    // Read the file
    const fileBuffer = await readFile(filePath);

    // Determine content type based on file extension
    const ext = filePath.split(".").pop()?.toLowerCase();
    let contentType = "application/octet-stream";

    switch (ext) {
      case "png":
        contentType = "image/png";
        break;
      case "jpg":
      case "jpeg":
        contentType = "image/jpeg";
        break;
      case "gif":
        contentType = "image/gif";
        break;
      case "webp":
        contentType = "image/webp";
        break;
    }

    // Set the content type header
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

    // Send the file
    res.send(fileBuffer);
  } catch (error) {
    console.error("Error serving file:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

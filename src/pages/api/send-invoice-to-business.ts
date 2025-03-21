// import type { NextApiRequest, NextApiResponse } from "next";
// import nodemailer from "nodemailer";
// import type { CartItem } from "@/app/contexts/CartContext";

// interface InvoiceData {
//   orderId: string;
//   items: CartItem[];
//   customerInfo: {
//     firstName: string;
//     lastName: string;
//     address: string;
//     phone: string;
//     email?: string; // Make email optional
//   };
//   totalAmount: number;
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     const { orderId, items, customerInfo, totalAmount } =
//       req.body as InvoiceData;

//     // Create a transporter
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
//       port: Number.parseInt(process.env.EMAIL_SERVER_PORT || "587"),
//       secure: process.env.EMAIL_SERVER_SECURE === "true",
//       auth: {
//         user: process.env.EMAIL_SERVER_USER,
//         pass: process.env.EMAIL_SERVER_PASSWORD,
//       },
//     });

//     // Generate a unique cart ID based on order ID
//     const cartId = `USCART${orderId.replace(/\D/g, "")}`;

//     // Calculate total items
//     const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

//     // Generate HTML email content for admin
//     const emailContent = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Nouvelle commande #${cartId}</title>
//           <meta charset="UTF-8">
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               line-height: 1.6;
//               color: #333;
//               margin: 0;
//               padding: 0;
//             }

//             .container {
//               max-width: 800px;
//               margin: 0 auto;
//               padding: 20px;
//               border: 1px solid #eee;
//               box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
//             }

//             .header {
//               background-color: #f8f8f8;
//               padding: 20px;
//               text-align: center;
//               border-bottom: 1px solid #eee;
//             }

//             .content {
//               padding: 20px;
//             }

//             .order-details {
//               margin-bottom: 30px;
//             }

//             .customer-info {
//               margin-bottom: 30px;
//               padding: 15px;
//               background-color: #f8f8f8;
//               border-radius: 5px;
//             }

//             .items-table {
//               width: 100%;
//               border-collapse: collapse;
//               margin-bottom: 30px;
//             }

//             .items-table th, .items-table td {
//               padding: 10px;
//               border-bottom: 1px solid #eee;
//               text-align: left;
//             }

//             .items-table th {
//               background-color: #f8f8f8;
//             }

//             .total {
//               text-align: right;
//               font-size: 18px;
//               font-weight: bold;
//               margin-top: 20px;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>Nouvelle commande reçue</h1>
//               <p>Commande #${cartId}</p>
//             </div>

//             <div class="content">
//               <div class="order-details">
//                 <h2>Détails de la commande</h2>
//                 <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
//                 <p><strong>Numéro de commande:</strong> ${cartId}</p>
//                 <p><strong>Total:</strong> ${totalAmount.toLocaleString()} MAD</p>
//               </div>

//               <div class="customer-info">
//                 <h2>Informations client</h2>
//                 <p><strong>Nom:</strong> ${customerInfo.firstName} ${
//       customerInfo.lastName
//     }</p>
//                 <p><strong>Adresse:</strong> ${customerInfo.address}</p>
//                 <p><strong>Téléphone:</strong> ${customerInfo.phone}</p>
//                 ${
//                   customerInfo.email
//                     ? `<p><strong>Email:</strong> ${customerInfo.email}</p>`
//                     : ""
//                 }
//               </div>

//               <h2>Articles commandés</h2>
//               <table class="items-table">
//                 <thead>
//                   <tr>
//                     <th>Produit</th>
//                     <th>Couleur</th>
//                     <th>Taille</th>
//                     <th>Prix</th>
//                     <th>Quantité</th>
//                     <th>Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   ${items
//                     .map(
//                       (item) => `
//                     <tr>
//                       <td>${item.name}</td>
//                       <td>${item.color || "Default"}</td>
//                       <td>${item.size || "Universal"}</td>
//                       <td>${item.price.toLocaleString()} MAD</td>
//                       <td>${item.quantity}</td>
//                       <td>${(
//                         item.price * item.quantity
//                       ).toLocaleString()} MAD</td>
//                     </tr>
//                   `
//                     )
//                     .join("")}
//                 </tbody>
//               </table>

//               <div class="total">
//                 Total: ${totalAmount.toLocaleString()} MAD
//               </div>
//             </div>
//           </div>
//         </body>
//       </html>
//     `;

//     // Send email to admin only
//     await transporter.sendMail({
//       from: `"MOIÉTOI Boutique" <${
//         process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER
//       }>`,
//       to: process.env.EMAIL_ADMIN,
//       subject: `Nouvelle commande #${cartId}`,
//       html: emailContent,
//     });

//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return res.status(500).json({
//       success: false,
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// }

// import type { NextApiRequest, NextApiResponse } from "next";
// import nodemailer from "nodemailer";
// import type { CartItem } from "@/app/contexts/CartContext";
// import htmlPdf from "html-pdf-node";
// import { getSiteUrl } from "@/lib/url-utils";

// interface InvoiceData {
//   orderId: string;
//   items: CartItem[];
//   customerInfo: {
//     firstName: string;
//     lastName: string;
//     address: string;
//     phone: string;
//     email?: string; // Make email optional
//   };
//   totalAmount: number;
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     const { orderId, items, customerInfo, totalAmount } =
//       req.body as InvoiceData;

//     // Create a transporter
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
//       port: Number.parseInt(process.env.EMAIL_SERVER_PORT || "587"),
//       secure: process.env.EMAIL_SERVER_SECURE === "true",
//       auth: {
//         user: process.env.EMAIL_SERVER_USER,
//         pass: process.env.EMAIL_SERVER_PASSWORD,
//       },
//     });

//     // Generate a unique cart ID based on order ID
//     const cartId = `USCART${orderId.replace(/\D/g, "")}`;

//     // Calculate total items
//     const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

//     // Get the site URL for absolute image paths
//     const siteUrl = getSiteUrl();

//     // Generate HTML email content for admin
//     const emailContent = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Nouvelle commande #${cartId}</title>
//           <meta charset="UTF-8">
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               line-height: 1.6;
//               color: #333;
//               margin: 0;
//               padding: 0;
//             }

//             .container {
//               max-width: 800px;
//               margin: 0 auto;
//               padding: 20px;
//               border: 1px solid #eee;
//               box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
//             }

//             .header {
//               background-color: #f8f8f8;
//               padding: 20px;
//               text-align: center;
//               border-bottom: 1px solid #eee;
//             }

//             .content {
//               padding: 20px;
//             }

//             .order-details {
//               margin-bottom: 30px;
//             }

//             .customer-info {
//               margin-bottom: 30px;
//               padding: 15px;
//               background-color: #f8f8f8;
//               border-radius: 5px;
//             }

//             .items-table {
//               width: 100%;
//               border-collapse: collapse;
//               margin-bottom: 30px;
//             }

//             .items-table th, .items-table td {
//               padding: 10px;
//               border-bottom: 1px solid #eee;
//               text-align: left;
//             }

//             .items-table th {
//               background-color: #f8f8f8;
//             }

//             .total {
//               text-align: right;
//               font-size: 18px;
//               font-weight: bold;
//               margin-top: 20px;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>Nouvelle commande reçue</h1>
//               <p>Commande #${cartId}</p>
//             </div>

//             <div class="content">
//               <div class="order-details">
//                 <h2>Détails de la commande</h2>
//                 <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
//                 <p><strong>Numéro de commande:</strong> ${cartId}</p>
//                 <p><strong>Total:</strong> ${totalAmount.toLocaleString()} MAD</p>
//               </div>

//               <div class="customer-info">
//                 <h2>Informations client</h2>
//                 <p><strong>Nom:</strong> ${customerInfo.firstName} ${
//       customerInfo.lastName
//     }</p>
//                 <p><strong>Adresse:</strong> ${customerInfo.address}</p>
//                 <p><strong>Téléphone:</strong> ${customerInfo.phone}</p>
//                 ${
//                   customerInfo.email
//                     ? `<p><strong>Email:</strong> ${customerInfo.email}</p>`
//                     : ""
//                 }
//               </div>

//               <h2>Articles commandés</h2>
//               <table class="items-table">
//                 <thead>
//                   <tr>
//                     <th>Produit</th>
//                     <th>Couleur</th>
//                     <th>Taille</th>
//                     <th>Prix</th>
//                     <th>Quantité</th>
//                     <th>Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   ${items
//                     .map(
//                       (item) => `
//                     <tr>
//                       <td>${item.name}</td>
//                       <td>${item.color || "Default"}</td>
//                       <td>${item.size || "Universal"}</td>
//                       <td>${item.price.toLocaleString()} MAD</td>
//                       <td>${item.quantity}</td>
//                       <td>${(
//                         item.price * item.quantity
//                       ).toLocaleString()} MAD</td>
//                     </tr>
//                   `
//                     )
//                     .join("")}
//                 </tbody>
//               </table>

//               <div class="total">
//                 Total: ${totalAmount.toLocaleString()} MAD
//               </div>
//             </div>
//           </div>
//         </body>
//       </html>
//     `;

//     // Generate PDF invoice with product images
//     const pdfInvoiceHtml = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Facture MOIÉTOI #${cartId}</title>
//           <meta charset="UTF-8">
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               line-height: 1.6;
//               color: #333;
//               margin: 0;
//               padding: 20px;
//             }

//             .invoice-container {
//               max-width: 800px;
//               margin: 0 auto;
//               border: 1px solid #eee;
//               padding: 20px;
//             }

//             .header {
//               display: flex;
//               justify-content: space-between;
//               margin-bottom: 40px;
//               border-bottom: 1px solid #eee;
//               padding-bottom: 20px;
//             }

//             .logo {
//               font-size: 24px;
//               font-weight: 300;
//               letter-spacing: 5px;
//               text-transform: uppercase;
//             }

//             .contact-info {
//               text-align: center;
//               margin-bottom: 40px;
//             }

//             .contact-item {
//               display: inline-block;
//               margin: 0 15px;
//             }

//             .title {
//               text-align: center;
//               margin-bottom: 30px;
//             }

//             h2 {
//               font-size: 32px;
//               font-weight: 300;
//               letter-spacing: 5px;
//               margin-bottom: 10px;
//             }

//             .order-id {
//               text-align: center;
//               margin-bottom: 40px;
//               font-size: 18px;
//             }

//             .divider {
//               border-top: 1px solid #eee;
//               margin: 30px 0;
//             }

//             .item {
//               display: flex;
//               margin-bottom: 30px;
//               page-break-inside: avoid;
//             }

//             .item-image {
//               width: 100px;
//               height: 100px;
//               margin-right: 20px;
//               border: 1px solid #eee;
//               padding: 5px;
//               object-fit: contain;
//             }

//             .item-details {
//               flex: 1;
//             }

//             .item-details h3 {
//               font-size: 18px;
//               margin-bottom: 5px;
//               margin-top: 0;
//             }

//             .item-details p {
//               font-size: 14px;
//               color: #666;
//               margin: 3px 0;
//             }

//             .item-price {
//               text-align: right;
//               min-width: 100px;
//             }

//             .summary {
//               margin-left: auto;
//               max-width: 300px;
//             }

//             .summary-row {
//               display: flex;
//               justify-content: space-between;
//               margin-bottom: 10px;
//             }

//             .summary-row.total {
//               border-top: 1px solid #eee;
//               padding-top: 10px;
//               margin-top: 10px;
//               font-weight: bold;
//             }

//             .customer-info {
//               margin-top: 40px;
//               padding-top: 20px;
//               border-top: 1px solid #eee;
//             }

//             .customer-info h3 {
//               margin-bottom: 10px;
//             }

//             .delivery-note {
//               margin-top: 40px;
//               padding-top: 20px;
//               border-top: 1px solid #eee;
//               line-height: 1.8;
//             }

//             ul.delivery-list {
//               list-style-type: disc;
//               margin-left: 20px;
//               margin-top: 10px;
//               margin-bottom: 10px;
//             }

//             ul.delivery-list li {
//               margin-bottom: 5px;
//             }

//             .thank-you {
//               margin-top: 30px;
//               text-align: center;
//               color: #777;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="invoice-container">
//             <!-- Header -->
//             <div class="header">
//               <div class="logo">MOIÉTOI</div>
//               <div>
//                 <p>Facture #${cartId}</p>
//                 <p>${new Date().toLocaleDateString()}</p>
//               </div>
//             </div>

//             <!-- Contact Info -->
//             <div class="contact-info">
//               <div class="contact-item">
//                 <span>+212 663777275</span>
//               </div>
//               <span>|</span>
//               <div class="contact-item">
//                 <span>relhammouni@gmail.com</span>
//               </div>
//             </div>

//             <hr class="divider">

//             <!-- Items -->
//             ${items
//               .map(
//                 (item) => `
//               <div class="item">
//                 <img src="${
//                   item.imageUrl.startsWith("http")
//                     ? item.imageUrl
//                     : `${siteUrl}${item.imageUrl}`
//                 }" alt="${item.name}" class="item-image">
//                 <div class="item-details">
//                   <h3>${item.name}</h3>
//                   <p>Couleur: ${item.color || "Default"}</p>
//                   <p>Taille: ${item.size || "Universal"}</p>
//                 </div>
//                 <div class="item-price">
//                   <p style="font-size: 18px; margin-bottom: 5px;">${item.price.toLocaleString()} MAD</p>
//                   <p>Qté: ${item.quantity}</p>
//                 </div>
//               </div>
//             `
//               )
//               .join("")}

//             <hr class="divider">

//             <!-- Customer Information -->
//             <div class="customer-info">
//               <h3>Informations client</h3>
//               <p><strong>Nom:</strong> ${customerInfo.firstName} ${
//       customerInfo.lastName
//     }</p>
//               <p><strong>Adresse:</strong> ${customerInfo.address}</p>
//               <p><strong>Téléphone:</strong> ${customerInfo.phone}</p>
//               ${
//                 customerInfo.email
//                   ? `<p><strong>Email:</strong> ${customerInfo.email}</p>`
//                   : ""
//               }
//             </div>

//             <!-- Delivery Note -->
//             <div class="delivery-note">
//               <p class="thank-you">
//                 Nous vous remercions pour votre confiance.
//               </p>
//             </div>
//           </div>
//         </body>
//       </html>
//     `;

//     // Generate PDF from HTML
//     const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
//       try {
//         const options = {
//           format: "A4",
//           margin: { top: 20, right: 20, bottom: 20, left: 20 },
//         };
//         const file = { content: pdfInvoiceHtml };

//         htmlPdf
//           .generatePdf(file, options)
//           .then((pdfBuffer) => {
//             resolve(pdfBuffer);
//           })
//           .catch((err) => {
//             console.error("Error generating PDF:", err);
//             reject(err);
//           });
//       } catch (error) {
//         console.error("Error in PDF generation:", error);
//         reject(error);
//       }
//     });

//     // Send email to admin only with PDF attachment
//     await transporter.sendMail({
//       from: `"MOIÉTOI Boutique" <${
//         process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER
//       }>`,
//       to: process.env.EMAIL_ADMIN,
//       subject: `Nouvelle commande #${cartId}`,
//       html: emailContent,
//       attachments: [
//         {
//           filename: `facture-${cartId}.pdf`,
//           content: pdfBuffer,
//           contentType: "application/pdf",
//         },
//       ],
//     });

//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return res.status(500).json({
//       success: false,
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// }
// import type { NextApiRequest, NextApiResponse } from "next";
// import nodemailer from "nodemailer";
// import type { CartItem } from "@/app/contexts/CartContext";
// import htmlPdf from "html-pdf-node";
// import { getSiteUrl } from "@/lib/url-utils";

// interface InvoiceData {
//   orderId: string;
//   items: CartItem[];
//   customerInfo: {
//     firstName: string;
//     lastName: string;
//     address: string;
//     phone: string;
//     email?: string; // Make email optional
//   };
//   totalAmount: number;
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     const { orderId, items, customerInfo, totalAmount } =
//       req.body as InvoiceData;

//     // Create a transporter
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
//       port: Number.parseInt(process.env.EMAIL_SERVER_PORT || "587"),
//       secure: process.env.EMAIL_SERVER_SECURE === "true",
//       auth: {
//         user: process.env.EMAIL_SERVER_USER,
//         pass: process.env.EMAIL_SERVER_PASSWORD,
//       },
//     });

//     // Use the exact orderId provided without modification
//     const cartId = `USCART${orderId}`;

//     // Calculate total items
//     const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

//     // Get the site URL for absolute image paths
//     const siteUrl = getSiteUrl();

//     // Generate HTML email content for admin
//     const emailContent = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Nouvelle commande #${cartId}</title>
//           <meta charset="UTF-8">
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               line-height: 1.6;
//               color: #333;
//               margin: 0;
//               padding: 0;
//             }

//             .container {
//               max-width: 800px;
//               margin: 0 auto;
//               padding: 20px;
//               border: 1px solid #eee;
//               box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
//             }

//             .header {
//               background-color: #f8f8f8;
//               padding: 20px;
//               text-align: center;
//               border-bottom: 1px solid #eee;
//             }

//             .content {
//               padding: 20px;
//             }

//             .order-details {
//               margin-bottom: 30px;
//             }

//             .customer-info {
//               margin-bottom: 30px;
//               padding: 15px;
//               background-color: #f8f8f8;
//               border-radius: 5px;
//             }

//             .items-table {
//               width: 100%;
//               border-collapse: collapse;
//               margin-bottom: 30px;
//             }

//             .items-table th, .items-table td {
//               padding: 10px;
//               border-bottom: 1px solid #eee;
//               text-align: left;
//             }

//             .items-table th {
//               background-color: #f8f8f8;
//             }

//             .total {
//               text-align: right;
//               font-size: 18px;
//               font-weight: bold;
//               margin-top: 20px;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>Nouvelle commande reçue</h1>
//               <p>Commande #${cartId}</p>
//             </div>

//             <div class="content">
//               <div class="order-details">
//                 <h2>Détails de la commande</h2>
//                 <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
//                 <p><strong>Numéro de commande:</strong> ${cartId}</p>
//                 <p><strong>Total:</strong> ${totalAmount.toLocaleString()} MAD</p>
//               </div>

//               <div class="customer-info">
//                 <h2>Informations client</h2>
//                 <p><strong>Nom:</strong> ${customerInfo.firstName} ${
//       customerInfo.lastName
//     }</p>
//                 <p><strong>Adresse:</strong> ${customerInfo.address}</p>
//                 <p><strong>Téléphone:</strong> ${customerInfo.phone}</p>
//                 ${
//                   customerInfo.email
//                     ? `<p><strong>Email:</strong> ${customerInfo.email}</p>`
//                     : ""
//                 }
//               </div>

//               <h2>Articles commandés</h2>
//               <table class="items-table">
//                 <thead>
//                   <tr>
//                     <th>Produit</th>
//                     <th>Couleur</th>
//                     <th>Taille</th>
//                     <th>Prix</th>
//                     <th>Quantité</th>
//                     <th>Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   ${items
//                     .map(
//                       (item) => `
//                     <tr>
//                       <td>${item.name}</td>
//                       <td>${item.color || "Default"}</td>
//                       <td>${item.size || "Universal"}</td>
//                       <td>${item.price.toLocaleString()} MAD</td>
//                       <td>${item.quantity}</td>
//                       <td>${(
//                         item.price * item.quantity
//                       ).toLocaleString()} MAD</td>
//                     </tr>
//                   `
//                     )
//                     .join("")}
//                 </tbody>
//               </table>

//               <div class="total">
//                 Total: ${totalAmount.toLocaleString()} MAD
//               </div>
//             </div>
//           </div>
//         </body>
//       </html>
//     `;

//     // Generate PDF invoice with product images
//     const pdfInvoiceHtml = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Facture MOIÉTOI #${cartId}</title>
//           <meta charset="UTF-8">
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               line-height: 1.6;
//               color: #333;
//               margin: 0;
//               padding: 20px;
//             }

//             .invoice-container {
//               max-width: 800px;
//               margin: 0 auto;
//               border: 1px solid #eee;
//               padding: 20px;
//             }

//             .header {
//               display: flex;
//               justify-content: space-between;
//               margin-bottom: 40px;
//               border-bottom: 1px solid #eee;
//               padding-bottom: 20px;
//             }

//             .logo {
//               font-size: 24px;
//               font-weight: 300;
//               letter-spacing: 5px;
//               text-transform: uppercase;
//             }

//             .contact-info {
//               text-align: center;
//               margin-bottom: 40px;
//             }

//             .contact-item {
//               display: inline-block;
//               margin: 0 15px;
//             }

//             .title {
//               text-align: center;
//               margin-bottom: 30px;
//             }

//             h2 {
//               font-size: 32px;
//               font-weight: 300;
//               letter-spacing: 5px;
//               margin-bottom: 10px;
//             }

//             .order-id {
//               text-align: center;
//               margin-bottom: 40px;
//               font-size: 18px;
//             }

//             .divider {
//               border-top: 1px solid #eee;
//               margin: 30px 0;
//             }

//             .item {
//               display: flex;
//               margin-bottom: 30px;
//               page-break-inside: avoid;
//             }

//             .item-image {
//               width: 100px;
//               height: 100px;
//               margin-right: 20px;
//               border: 1px solid #eee;
//               padding: 5px;
//               object-fit: contain;
//             }

//             .item-details {
//               flex: 1;
//             }

//             .item-details h3 {
//               font-size: 18px;
//               margin-bottom: 5px;
//               margin-top: 0;
//             }

//             .item-details p {
//               font-size: 14px;
//               color: #666;
//               margin: 3px 0;
//             }

//             .item-price {
//               text-align: right;
//               min-width: 100px;
//             }

//             .summary {
//               margin-left: auto;
//               max-width: 300px;
//             }

//             .summary-row {
//               display: flex;
//               justify-content: space-between;
//               margin-bottom: 10px;
//             }

//             .summary-row.total {
//               border-top: 1px solid #eee;
//               padding-top: 10px;
//               margin-top: 10px;
//               font-weight: bold;
//             }

//             .customer-info {
//               margin-top: 40px;
//               padding-top: 20px;
//               border-top: 1px solid #eee;
//             }

//             .customer-info h3 {
//               margin-bottom: 10px;
//             }

//             .delivery-note {
//               margin-top: 40px;
//               padding-top: 20px;
//               border-top: 1px solid #eee;
//               line-height: 1.8;
//             }

//             ul.delivery-list {
//               list-style-type: disc;
//               margin-left: 20px;
//               margin-top: 10px;
//               margin-bottom: 10px;
//             }

//             ul.delivery-list li {
//               margin-bottom: 5px;
//             }

//             .thank-you {
//               margin-top: 30px;
//               text-align: center;
//               color: #777;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="invoice-container">
//             <!-- Header -->
//             <div class="header">
//               <div class="logo">MOIÉTOI</div>
//               <div>
//                 <p>Facture #${cartId}</p>
//                 <p>${new Date().toLocaleDateString()}</p>
//               </div>
//             </div>

//             <!-- Contact Info -->
//             <div class="contact-info">
//               <div class="contact-item">
//                 <span>+212 663777275</span>
//               </div>
//               <span>|</span>
//               <div class="contact-item">
//                 <span>relhammouni@gmail.com</span>
//               </div>
//             </div>

//             <!-- Main Title -->
//             <div class="title">
//               <h2>MON PANIER</h2>
//               <p>Commande #${cartId}</p>
//             </div>

//             <hr class="divider">

//             <!-- Items -->
//             ${items
//               .map(
//                 (item) => `
//               <div class="item">
//                 <img src="${
//                   item.imageUrl.startsWith("http")
//                     ? item.imageUrl
//                     : `${siteUrl}${item.imageUrl}`
//                 }" alt="${item.name}" class="item-image">
//                 <div class="item-details">
//                   <h3>${item.name}</h3>
//                   <p>Réf: ${item.id.substring(0, 6).toUpperCase()}</p>
//                   <p>Style: Premium Leather</p>
//                   <p>Couleur: ${item.color || "Default"}</p>
//                   <p>Taille: ${item.size || "Universal"}</p>
//                   <p style="font-weight: 600; margin-top: 10px;">DISPONIBLE</p>
//                   <p>Livraison gratuite</p>
//                 </div>
//                 <div class="item-price">
//                   <p style="font-size: 18px; margin-bottom: 5px;">${item.price.toLocaleString()} MAD</p>
//                   <p>Qté: ${item.quantity}</p>
//                 </div>
//               </div>
//             `
//               )
//               .join("")}

//             <hr class="divider">

//             <!-- Order Summary -->
//             <div class="summary">
//               <div class="summary-row">
//                 <p>Sous-total (${totalItems} articles)</p>
//                 <p>${totalAmount.toLocaleString()} MAD</p>
//               </div>
//               <div class="summary-row">
//                 <p>Livraison</p>
//                 <p>Gratuite</p>
//               </div>
//               <div class="summary-row total">
//                 <p>Total</p>
//                 <p>${totalAmount.toLocaleString()} MAD</p>
//               </div>
//             </div>

//             <!-- Customer Information -->
//             <div class="customer-info">
//               <h3>Informations client</h3>
//               <p><strong>Nom:</strong> ${customerInfo.firstName} ${
//       customerInfo.lastName
//     }</p>
//               <p><strong>Adresse:</strong> ${customerInfo.address}</p>
//               <p><strong>Téléphone:</strong> ${customerInfo.phone}</p>
//               ${
//                 customerInfo.email
//                   ? `<p><strong>Email:</strong> ${customerInfo.email}</p>`
//                   : ""
//               }
//             </div>

//             <!-- Delivery Note -->
//             <div class="delivery-note">
//               <h3>Informations de livraison</h3>
//               <p>
//                 Cher(e) client(e),<br>
//                 Nous vous informons que nos livraisons sont effectuées selon le planning suivant:
//               </p>
//               <ul class="delivery-list">
//                 <li><strong>Rabat et environs:</strong> chaque Mercredi et Samedi</li>
//                 <li><strong>Casablanca:</strong> uniquement le Samedi</li>
//               </ul>
//               <p>
//                 Merci de bien vouloir passer vos commandes en conséquence
//                 afin de garantir leur livraison dans les meilleurs délais.
//               </p>
//               <p class="thank-you">
//                 Nous vous remercions pour votre confiance.
//               </p>
//             </div>
//           </div>
//         </body>
//       </html>
//     `;

//     // Generate PDF from HTML
//     const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
//       try {
//         const options = {
//           format: "A4",
//           margin: { top: 20, right: 20, bottom: 20, left: 20 },
//         };
//         const file = { content: pdfInvoiceHtml };

//         htmlPdf
//           .generatePdf(file, options)
//           .then((pdfBuffer) => {
//             resolve(pdfBuffer);
//           })
//           .catch((err) => {
//             console.error("Error generating PDF:", err);
//             reject(err);
//           });
//       } catch (error) {
//         console.error("Error in PDF generation:", error);
//         reject(error);
//       }
//     });

//     // Send email to admin only with PDF attachment
//     await transporter.sendMail({
//       from: `"MOIÉTOI Boutique" <${
//         process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER
//       }>`,
//       to: process.env.EMAIL_ADMIN,
//       subject: `Nouvelle commande #${cartId}`,
//       html: emailContent,
//       attachments: [
//         {
//           filename: `facture-${cartId}.pdf`,
//           content: pdfBuffer,
//           contentType: "application/pdf",
//         },
//       ],
//     });

//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return res.status(500).json({
//       success: false,
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import type { CartItem } from "@/app/contexts/CartContext";
import * as htmlPdf from "html-pdf-node";
import { getSiteUrl } from "@/lib/url-utils";

interface InvoiceData {
  orderId: string;
  items: CartItem[];
  customerInfo: {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    email?: string; // Make email optional
  };
  totalAmount: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { orderId, items, customerInfo, totalAmount } =
      req.body as InvoiceData;

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
      port: Number.parseInt(process.env.EMAIL_SERVER_PORT || "587"),
      secure: process.env.EMAIL_SERVER_SECURE === "true",
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Use the exact orderId provided without modification
    const cartId = `USCART${orderId}`;

    // Calculate total items
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    // Get the site URL for absolute image paths
    const siteUrl = getSiteUrl();

    // Generate HTML email content for admin
    const emailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Nouvelle commande #${cartId}</title>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
            }
            
            .container {
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #eee;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            }
            
            .header {
              background-color: #f8f8f8;
              padding: 20px;
              text-align: center;
              border-bottom: 1px solid #eee;
            }
            
            .content {
              padding: 20px;
            }
            
            .order-details {
              margin-bottom: 30px;
            }
            
            .customer-info {
              margin-bottom: 30px;
              padding: 15px;
              background-color: #f8f8f8;
              border-radius: 5px;
            }
            
            .items-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
            }
            
            .items-table th, .items-table td {
              padding: 10px;
              border-bottom: 1px solid #eee;
              text-align: left;
            }
            
            .items-table th {
              background-color: #f8f8f8;
            }
            
            .total {
              text-align: right;
              font-size: 18px;
              font-weight: bold;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nouvelle commande reçue</h1>
              <p>Commande #${cartId}</p>
            </div>
            
            <div class="content">
              <div class="order-details">
                <h2>Détails de la commande</h2>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Numéro de commande:</strong> ${cartId}</p>
                <p><strong>Total:</strong> ${totalAmount.toLocaleString()} MAD</p>
              </div>
              
              <div class="customer-info">
                <h2>Informations client</h2>
                <p><strong>Nom:</strong> ${customerInfo.firstName} ${
      customerInfo.lastName
    }</p>
                <p><strong>Adresse:</strong> ${customerInfo.address}</p>
                <p><strong>Téléphone:</strong> ${customerInfo.phone}</p>
                ${
                  customerInfo.email
                    ? `<p><strong>Email:</strong> ${customerInfo.email}</p>`
                    : ""
                }
              </div>
              
              <h2>Articles commandés</h2>
              <table class="items-table">
                <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Couleur</th>
                    <th>Taille</th>
                    <th>Prix</th>
                    <th>Quantité</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${items
                    .map(
                      (item) => `
                    <tr>
                      <td>${item.name}</td>
                      <td>${item.color || "Default"}</td>
                      <td>${item.size || "Universal"}</td>
                      <td>${item.price.toLocaleString()} MAD</td>
                      <td>${item.quantity}</td>
                      <td>${(
                        item.price * item.quantity
                      ).toLocaleString()} MAD</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
              
              <div class="total">
                Total: ${totalAmount.toLocaleString()} MAD
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Generate PDF invoice with product images
    const pdfInvoiceHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Facture MOIÉTOI #${cartId}</title>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 20px;
            }
            
            .invoice-container {
              max-width: 800px;
              margin: 0 auto;
              border: 1px solid #eee;
              padding: 20px;
            }
            
            .header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 40px;
              border-bottom: 1px solid #eee;
              padding-bottom: 20px;
            }
            
            .logo {
              font-size: 24px;
              font-weight: 300;
              letter-spacing: 5px;
              text-transform: uppercase;
            }
            
            .contact-info {
              text-align: center;
              margin-bottom: 40px;
            }
            
            .contact-item {
              display: inline-block;
              margin: 0 15px;
            }
            
            .title {
              text-align: center;
              margin-bottom: 30px;
            }
            
            h2 {
              font-size: 32px;
              font-weight: 300;
              letter-spacing: 5px;
              margin-bottom: 10px;
            }
            
            .order-id {
              text-align: center;
              margin-bottom: 40px;
              font-size: 18px;
            }
            
            .divider {
              border-top: 1px solid #eee;
              margin: 30px 0;
            }
            
            .item {
              display: flex;
              margin-bottom: 30px;
              page-break-inside: avoid;
            }
            
            .item-image {
              width: 100px;
              height: 100px;
              margin-right: 20px;
              border: 1px solid #eee;
              padding: 5px;
              object-fit: contain;
            }
            
            .item-details {
              flex: 1;
            }
            
            .item-details h3 {
              font-size: 18px;
              margin-bottom: 5px;
              margin-top: 0;
            }
            
            .item-details p {
              font-size: 14px;
              color: #666;
              margin: 3px 0;
            }
            
            .item-price {
              text-align: right;
              min-width: 100px;
            }
            
            .summary {
              margin-left: auto;
              max-width: 300px;
            }
            
            .summary-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
            }
            
            .summary-row.total {
              border-top: 1px solid #eee;
              padding-top: 10px;
              margin-top: 10px;
              font-weight: bold;
            }
            
            .customer-info {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #eee;
            }
            
            .customer-info h3 {
              margin-bottom: 10px;
            }
            
            .delivery-note {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              line-height: 1.8;
            }
            
            ul.delivery-list {
              list-style-type: disc;
              margin-left: 20px;
              margin-top: 10px;
              margin-bottom: 10px;
            }
            
            ul.delivery-list li {
              margin-bottom: 5px;
            }
            
            .thank-you {
              margin-top: 30px;
              text-align: center;
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <!-- Header -->
            <div class="header">
              <div class="logo">MOIÉTOI</div>
              <div>
                <p>Facture #${cartId}</p>
                <p>${new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <!-- Contact Info -->
            <div class="contact-info">
              <div class="contact-item">
                <span>+212 663777275</span>
              </div>
              <span>|</span>
              <div class="contact-item">
                <span>relhammouni@gmail.com</span>
              </div>
            </div>
            
            <!-- Main Title -->
            <div class="title">
              <h2>MON PANIER</h2>
              <p>Commande #${cartId}</p>
            </div>
            
            <hr class="divider">
            
            <!-- Items -->
            ${items
              .map(
                (item) => `
              <div class="item">
                <img src="${
                  item.imageUrl.startsWith("http")
                    ? item.imageUrl
                    : `${siteUrl}${item.imageUrl}`
                }" alt="${item.name}" class="item-image">
                <div class="item-details">
                  <h3>${item.name}</h3>
                  <p>Réf: ${item.id.substring(0, 6).toUpperCase()}</p>
                  <p>Style: Premium Leather</p>
                  <p>Couleur: ${item.color || "Default"}</p>
                  <p>Taille: ${item.size || "Universal"}</p>
                  <p style="font-weight: 600; margin-top: 10px;">DISPONIBLE</p>
                  <p>Livraison gratuite</p>
                </div>
                <div class="item-price">
                  <p style="font-size: 18px; margin-bottom: 5px;">${item.price.toLocaleString()} MAD</p>
                  <p>Qté: ${item.quantity}</p>
                </div>
              </div>
            `
              )
              .join("")}
            
            <hr class="divider">
            
            <!-- Order Summary -->
            <div class="summary">
              <div class="summary-row">
                <p>Sous-total (${totalItems} articles)</p>
                <p>${totalAmount.toLocaleString()} MAD</p>
              </div>
              <div class="summary-row">
                <p>Livraison</p>
                <p>Gratuite</p>
              </div>
              <div class="summary-row total">
                <p>Total</p>
                <p>${totalAmount.toLocaleString()} MAD</p>
              </div>
            </div>
            
            <!-- Customer Information -->
            <div class="customer-info">
              <h3>Informations client</h3>
              <p><strong>Nom:</strong> ${customerInfo.firstName} ${
      customerInfo.lastName
    }</p>
              <p><strong>Adresse:</strong> ${customerInfo.address}</p>
              <p><strong>Téléphone:</strong> ${customerInfo.phone}</p>
              ${
                customerInfo.email
                  ? `<p><strong>Email:</strong> ${customerInfo.email}</p>`
                  : ""
              }
            </div>
            
            <!-- Delivery Note -->
            <div class="delivery-note">
              <h3>Informations de livraison</h3>
              <p>
                Cher(e) client(e),<br>
                Nous vous informons que nos livraisons sont effectuées selon le planning suivant:
              </p>
              <ul class="delivery-list">
                <li><strong>Rabat et environs:</strong> chaque Mercredi et Samedi</li>
                <li><strong>Casablanca:</strong> uniquement le Samedi</li>
              </ul>
              <p>
                Merci de bien vouloir passer vos commandes en conséquence
                afin de garantir leur livraison dans les meilleurs délais.
              </p>
              <p class="thank-you">
                Nous vous remercions pour votre confiance.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Generate PDF from HTML using the properly typed function
    const pdfBuffer = await htmlPdf.generatePdf(
      { content: pdfInvoiceHtml },
      {
        format: "A4",
        margin: { top: 20, right: 20, bottom: 20, left: 20 },
      }
    );

    // Send email to admin only with PDF attachment
    await transporter.sendMail({
      from: `"MOIÉTOI Boutique" <${
        process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER
      }>`,
      to: process.env.EMAIL_ADMIN,
      subject: `Nouvelle commande #${cartId}`,
      html: emailContent,
      attachments: [
        {
          filename: `facture-${cartId}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

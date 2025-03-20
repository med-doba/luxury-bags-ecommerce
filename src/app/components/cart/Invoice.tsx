// // // "use client";

// // // import { useRef } from "react";
// // // import Image from "next/image";
// // // import { Printer, Phone, Mail } from "lucide-react";

// // // interface InvoiceProps {
// // //   orderId: string;
// // //   items: Array<{
// // //     id: string;
// // //     name: string;
// // //     price: number;
// // //     quantity: number;
// // //     imageUrl: string;
// // //   }>;
// // //   customerInfo: {
// // //     firstName: string;
// // //     lastName: string;
// // //     address: string;
// // //     phone: string;
// // //   };
// // //   totalAmount: number;
// // //   onClose: () => void;
// // // }

// // // export default function Invoice({
// // //   orderId,
// // //   items,
// // //   customerInfo,
// // //   totalAmount,
// // //   onClose,
// // // }: InvoiceProps) {
// // //   const invoiceRef = useRef<HTMLDivElement>(null);

// // //   const handlePrint = () => {
// // //     if (invoiceRef.current) {
// // //       const content = invoiceRef.current.innerHTML;
// // //       const printWindow = window.open("", "_blank");

// // //       if (printWindow) {
// // //         printWindow.document.write(`
// // //           <html>
// // //             <head>
// // //               <title>Invoice</title>
// // //               <style>
// // //                 body {
// // //                   font-family: Arial, sans-serif;
// // //                   padding: 20px;
// // //                   max-width: 800px;
// // //                   margin: 0 auto;
// // //                 }
// // //                 .print-button {
// // //                   display: none;
// // //                 }
// // //                 @media print {
// // //                   body {
// // //                     padding: 0;
// // //                     margin: 0;
// // //                   }
// // //                 }
// // //               </style>
// // //             </head>
// // //             <body>
// // //               ${content}
// // //               <script>
// // //                 window.onload = function() {
// // //                   window.print();
// // //                   window.onfocus = function() { window.close(); }
// // //                 }
// // //               </script>
// // //             </body>
// // //           </html>
// // //         `);
// // //         printWindow.document.close();
// // //       }
// // //     }
// // //   };

// // //   // Generate a unique cart ID based on order ID
// // //   const cartId = `USCART${orderId.replace(/\D/g, "")}`;

// // //   return (
// // //     <div className="fixed inset-0 bg-white z-50 overflow-auto">
// // //       <div className="max-w-4xl mx-auto my-8 p-8 bg-white" ref={invoiceRef}>
// // //         {/* Header */}
// // //         <div className="flex justify-between items-center mb-12">
// // //           <h1 className="text-2xl font-light tracking-widest uppercase">
// // //             MOIÉTOI
// // //           </h1>
// // //           <button
// // //             onClick={handlePrint}
// // //             className="flex items-center text-gray-700 hover:text-black print-button"
// // //           >
// // //             <Printer className="mr-2 h-5 w-5" />
// // //             <span>Print</span>
// // //           </button>
// // //         </div>

// // //         {/* Contact Info */}
// // //         <div className="flex justify-center items-center gap-6 mb-16 text-gray-700">
// // //           <div className="flex items-center">
// // //             <Phone className="h-4 w-4 mr-2" />
// // //             <span>+212 663777275</span>
// // //           </div>
// // //           <div className="text-gray-300">|</div>
// // //           <div className="flex items-center">
// // //             <Mail className="h-4 w-4 mr-2" />
// // //             <span>relhammouni@gmail.com</span>
// // //           </div>
// // //         </div>

// // //         {/* Main Title */}
// // //         <h2 className="text-4xl font-light text-center tracking-widest mb-8">
// // //           MON PANIER
// // //         </h2>

// // //         {/* Order ID */}
// // //         <p className="text-center mb-16 text-lg">SAC #{cartId}</p>

// // //         <hr className="mb-12 border-gray-200" />

// // //         {/* Items */}
// // //         {items.map((item, index) => (
// // //           <div key={item.id} className="mb-12">
// // //             <div className="flex gap-8">
// // //               <div className="w-32 h-24 relative">
// // //                 <Image
// // //                   src={item.imageUrl || "/placeholder.svg"}
// // //                   alt={item.name}
// // //                   fill
// // //                   className="object-contain"
// // //                 />
// // //               </div>
// // //               <div className="flex-1">
// // //                 <h3 className="text-xl font-medium mb-2">{item.name}</h3>
// // //                 <p className="text-sm text-gray-600 mb-1">
// // //                   Style # {item.id.substring(0, 6).toUpperCase()}
// // //                 </p>
// // //                 <p className="text-sm text-gray-600 mb-1">
// // //                   Style: Premium Leather
// // //                 </p>
// // //                 <p className="text-sm text-gray-600 mb-1">Size: Universal</p>
// // //                 <p className="text-sm font-semibold mt-2">AVAILABLE</p>
// // //                 <p className="text-sm text-gray-600">
// // //                   Enjoy complimentary delivery or Collect In Store.
// // //                 </p>
// // //               </div>
// // //               <div className="text-right">
// // //                 <p className="text-xl mb-2">
// // //                   {item.price.toLocaleString()} MAD
// // //                 </p>
// // //                 <p className="text-gray-600">Qty: {item.quantity}</p>
// // //               </div>
// // //             </div>
// // //             {index < items.length - 1 && (
// // //               <hr className="my-8 border-gray-200" />
// // //             )}
// // //           </div>
// // //         ))}

// // //         <hr className="mb-8 border-gray-200" />

// // //         {/* Order Summary */}
// // //         <div className="max-w-md ml-auto">
// // //           <div className="flex justify-between mb-4">
// // //             <p className="text-lg">Sous-total</p>
// // //             <p className="text-lg">{totalAmount.toLocaleString()} MAD</p>
// // //           </div>
// // //           <div className="flex justify-between mb-4">
// // //             <p className="text-lg">Livraison</p>
// // //             <p className="text-lg">Gratuite</p>
// // //           </div>
// // //           {/* <div className="flex justify-between mb-4">
// // //             <p className="text-lg">Estimated Tax</p>
// // //             <p className="text-lg">0.00 MAD</p>
// // //           </div> */}
// // //           <div className="flex justify-between mb-4 pt-4 border-t border-gray-200">
// // //             <p className="text-lg font-medium">Total estimé</p>
// // //             <p className="text-2xl">{totalAmount.toLocaleString()} MAD</p>
// // //           </div>
// // //         </div>

// // //         {/* Customer Information */}
// // //         <div className="mt-12 pt-8 border-t border-gray-200">
// // //           <h3 className="text-lg font-medium mb-4">Informations client</h3>
// // //           <p className="text-gray-700 mb-2">
// // //             {customerInfo.firstName} {customerInfo.lastName}
// // //           </p>
// // //           <p className="text-gray-700 mb-2">{customerInfo.address}</p>
// // //           <p className="text-gray-700">{customerInfo.phone}</p>
// // //         </div>
// // //         <div className="mt-12 pt-8 border-t border-gray-200">
// // //           <p>
// // //             Cher(e) client(e),
// // //             <br /> Nous vous informons que nos livraisons sont effectuées selon
// // //             le planning suivant :<br /> Rabat et environs : chaque Mercredi et
// // //             Samedi
// // //             <br /> Casablanca : uniquement le Samedi
// // //             <br /> Merci de bien vouloir passer vos commandes en conséquence
// // //             afin de garantir leur livraison dans les meilleurs délais.
// // //           </p>
// // //         </div>
// // //       </div>

// // //       {/* Close button (only visible when not printing) */}
// // //       <div className="mt-8 text-center print:hidden">
// // //         <button
// // //           onClick={onClose}
// // //           className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
// // //         >
// // //           Fermer
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import { useRef } from "react";
// // import Image from "next/image";
// // import { Printer, Phone, Mail } from "lucide-react";

// // interface InvoiceProps {
// //   orderId: string;
// //   items: Array<{
// //     id: string;
// //     name: string;
// //     price: number;
// //     quantity: number;
// //     imageUrl: string;
// //   }>;
// //   customerInfo: {
// //     firstName: string;
// //     lastName: string;
// //     address: string;
// //     phone: string;
// //   };
// //   totalAmount: number;
// //   onClose: () => void;
// // }

// // export default function Invoice({
// //   orderId,
// //   items,
// //   customerInfo,
// //   totalAmount,
// //   onClose,
// // }: InvoiceProps) {
// //   const invoiceRef = useRef<HTMLDivElement>(null);

// //   const handlePrint = () => {
// //     if (invoiceRef.current) {
// //       const content = invoiceRef.current.innerHTML;
// //       const printWindow = window.open("", "_blank");

// //       if (printWindow) {
// //         printWindow.document.write(`
// //           <html>
// //             <head>
// //               <title>Facture MOIÉTOI</title>
// //               <meta charset="UTF-8">
// //               <meta name="viewport" content="width=device-width, initial-scale=1.0">
// //               <style>
// //                 @page {
// //                   size: A4;
// //                   margin: 1.5cm;
// //                 }

// //                 * {
// //                   box-sizing: border-box;
// //                   margin: 0;
// //                   padding: 0;
// //                 }

// //                 body {
// //                   font-family: Arial, Helvetica, sans-serif;
// //                   line-height: 1.6;
// //                   color: #333;
// //                   background: white;
// //                   padding: 0;
// //                   margin: 0;
// //                 }

// //                 .invoice-container {
// //                   max-width: 800px;
// //                   margin: 0 auto;
// //                   padding: 30px;
// //                   border: 1px solid #eee;
// //                   box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
// //                   background: white;
// //                 }

// //                 .header {
// //                   display: flex;
// //                   justify-content: space-between;
// //                   margin-bottom: 40px;
// //                   border-bottom: 1px solid #eee;
// //                   padding-bottom: 20px;
// //                 }

// //                 .header h1 {
// //                   font-size: 24px;
// //                   font-weight: 300;
// //                   letter-spacing: 5px;
// //                 }

// //                 .contact-info {
// //                   text-align: center;
// //                   margin-bottom: 40px;
// //                 }

// //                 .contact-info span {
// //                   margin: 0 15px;
// //                 }

// //                 .title {
// //                   text-align: center;
// //                   margin-bottom: 30px;
// //                 }

// //                 .title h2 {
// //                   font-size: 32px;
// //                   font-weight: 300;
// //                   letter-spacing: 5px;
// //                 }

// //                 .order-id {
// //                   text-align: center;
// //                   margin-bottom: 40px;
// //                   font-size: 18px;
// //                 }

// //                 .divider {
// //                   border-top: 1px solid #eee;
// //                   margin: 30px 0;
// //                 }

// //                 .item {
// //                   display: flex;
// //                   margin-bottom: 30px;
// //                 }

// //                 .item-image {
// //                   width: 120px;
// //                   height: 90px;
// //                   margin-right: 30px;
// //                   background-position: center;
// //                   background-size: contain;
// //                   background-repeat: no-repeat;
// //                 }

// //                 .item-details {
// //                   flex: 1;
// //                 }

// //                 .item-details h3 {
// //                   font-size: 18px;
// //                   margin-bottom: 5px;
// //                 }

// //                 .item-details p {
// //                   font-size: 14px;
// //                   color: #666;
// //                   margin-bottom: 3px;
// //                 }

// //                 .item-price {
// //                   text-align: right;
// //                   min-width: 100px;
// //                 }

// //                 .item-price p:first-child {
// //                   font-size: 18px;
// //                   margin-bottom: 5px;
// //                 }

// //                 .summary {
// //                   margin-left: auto;
// //                   max-width: 300px;
// //                 }

// //                 .summary-row {
// //                   display: flex;
// //                   justify-content: space-between;
// //                   margin-bottom: 10px;
// //                 }

// //                 .summary-row.total {
// //                   border-top: 1px solid #eee;
// //                   padding-top: 10px;
// //                   margin-top: 10px;
// //                   font-weight: bold;
// //                 }

// //                 .summary-row.total p:last-child {
// //                   font-size: 22px;
// //                 }

// //                 .customer-info {
// //                   margin-top: 40px;
// //                   padding-top: 20px;
// //                   border-top: 1px solid #eee;
// //                 }

// //                 .customer-info h3 {
// //                   margin-bottom: 10px;
// //                 }

// //                 .delivery-note {
// //                   margin-top: 40px;
// //                   padding-top: 20px;
// //                   border-top: 1px solid #eee;
// //                   line-height: 1.8;
// //                 }

// //                 .print-button, .close-button {
// //                   display: none;
// //                 }

// //                 .logo {
// //                   font-weight: 300;
// //                   letter-spacing: 5px;
// //                   font-size: 24px;
// //                 }

// //                 .icon {
// //                   display: inline-block;
// //                   width: 16px;
// //                   height: 16px;
// //                   margin-right: 5px;
// //                 }
// //               </style>
// //             </head>
// //             <body>
// //               <div class="invoice-container">
// //                 ${content}
// //               </div>
// //               <script>
// //                 window.onload = function() {
// //                   // Replace image elements with background images for better printing
// //                   document.querySelectorAll('.item-image-container').forEach(container => {
// //                     const img = container.querySelector('img');
// //                     if (img && img.src) {
// //                       const div = document.createElement('div');
// //                       div.className = 'item-image';
// //                       div.style.backgroundImage = 'url(' + img.src + ')';
// //                       container.replaceChild(div, img);
// //                     }
// //                   });

// //                   // Remove buttons
// //                   document.querySelectorAll('.print-button, .close-button').forEach(button => {
// //                     button.style.display = 'none';
// //                   });

// //                   // Print after a short delay to ensure styles are applied
// //                   setTimeout(() => {
// //                     window.print();
// //                     window.onfocus = function() { window.close(); }
// //                   }, 500);
// //                 }
// //               </script>
// //             </body>
// //           </html>
// //         `);
// //         printWindow.document.close();
// //       }
// //     }
// //   };

// //   // Generate a unique cart ID based on order ID
// //   const cartId = `USCART${orderId.replace(/\D/g, "")}`;

// //   // Calculate total items
// //   const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

// //   return (
// //     <div className="fixed inset-0 bg-white z-50 overflow-auto">
// //       <div
// //         className="max-w-4xl mx-auto my-8 p-8 bg-white border border-gray-200 shadow-lg"
// //         ref={invoiceRef}
// //       >
// //         {/* Header */}
// //         <div className="flex justify-between items-center mb-12 pb-6 border-b border-gray-200">
// //           <h1 className="text-2xl font-light tracking-widest uppercase logo">
// //             MOIÉTOI
// //           </h1>
// //           <div className="text-sm text-gray-500">
// //             <p>Facture #{cartId}</p>
// //             <p>{new Date().toLocaleDateString()}</p>
// //           </div>
// //         </div>

// //         {/* Contact Info */}
// //         <div className="flex justify-center items-center gap-6 mb-16 text-gray-700 contact-info">
// //           <div className="flex items-center">
// //             <Phone className="h-4 w-4 mr-2 icon" />
// //             <span>+212 663777275</span>
// //           </div>
// //           <div className="text-gray-300">|</div>
// //           <div className="flex items-center">
// //             <Mail className="h-4 w-4 mr-2 icon" />
// //             <span>relhammouni@gmail.com</span>
// //           </div>
// //         </div>

// //         {/* Main Title */}
// //         <div className="title">
// //           <h2 className="text-4xl font-light text-center tracking-widest mb-4">
// //             MON PANIER
// //           </h2>
// //           <p className="text-gray-500 text-sm">Merci pour votre commande</p>
// //         </div>

// //         {/* Order ID */}
// //         <p className="text-center mb-16 text-lg order-id">SAC #{cartId}</p>

// //         <hr className="mb-12 border-gray-200 divider" />

// //         {/* Items */}
// //         {items.map((item, index) => (
// //           <div key={item.id} className="mb-12 item">
// //             <div className="w-32 h-24 relative item-image-container">
// //               <Image
// //                 src={item.imageUrl || "/placeholder.svg"}
// //                 alt={item.name}
// //                 fill
// //                 className="object-contain"
// //               />
// //             </div>
// //             <div className="flex-1 item-details">
// //               <h3 className="text-xl font-medium mb-2">{item.name}</h3>
// //               <p className="text-sm text-gray-600 mb-1">
// //                 Réf: {item.id.substring(0, 6).toUpperCase()}
// //               </p>
// //               <p className="text-sm text-gray-600 mb-1">
// //                 Style: Premium Leather
// //               </p>
// //               <p className="text-sm text-gray-600 mb-1">Taille: Universal</p>
// //               <p className="text-sm font-semibold mt-2">DISPONIBLE</p>
// //               <p className="text-sm text-gray-600">Livraison gratuite</p>
// //             </div>
// //             <div className="text-right item-price">
// //               <p className="text-xl mb-2">{item.price.toLocaleString()} MAD</p>
// //               <p className="text-gray-600">Qté: {item.quantity}</p>
// //             </div>
// //           </div>
// //         ))}

// //         <hr className="mb-8 border-gray-200 divider" />

// //         {/* Order Summary */}
// //         <div className="max-w-md ml-auto summary">
// //           <div className="flex justify-between mb-4 summary-row">
// //             <p className="text-lg">Sous-total ({totalItems} articles)</p>
// //             <p className="text-lg">{totalAmount.toLocaleString()} MAD</p>
// //           </div>
// //           <div className="flex justify-between mb-4 summary-row">
// //             <p className="text-lg">Livraison</p>
// //             <p className="text-lg">Gratuite</p>
// //           </div>
// //           <div className="flex justify-between mb-4 pt-4 border-t border-gray-200 summary-row total">
// //             <p className="text-lg font-medium">Total</p>
// //             <p className="text-2xl">{totalAmount.toLocaleString()} MAD</p>
// //           </div>
// //         </div>

// //         {/* Customer Information */}
// //         <div className="mt-12 pt-8 border-t border-gray-200 customer-info">
// //           <h3 className="text-lg font-medium mb-4">Informations client</h3>
// //           <p className="text-gray-700 mb-2">
// //             <strong>Nom:</strong> {customerInfo.firstName}{" "}
// //             {customerInfo.lastName}
// //           </p>
// //           <p className="text-gray-700 mb-2">
// //             <strong>Adresse:</strong> {customerInfo.address}
// //           </p>
// //           <p className="text-gray-700">
// //             <strong>Téléphone:</strong> {customerInfo.phone}
// //           </p>
// //         </div>

// //         {/* Delivery Note */}
// //         <div className="mt-12 pt-8 border-t border-gray-200 delivery-note">
// //           <h3 className="text-lg font-medium mb-4">
// //             Informations de livraison
// //           </h3>
// //           <p>
// //             Cher(e) client(e),
// //             <br />
// //             Nous vous informons que nos livraisons sont effectuées selon le
// //             planning suivant :
// //           </p>
// //           <ul className="list-disc ml-6 my-4">
// //             <li>
// //               <strong>Rabat et environs :</strong> chaque Mercredi et Samedi
// //             </li>
// //             <li>
// //               <strong>Casablanca :</strong> uniquement le Samedi
// //             </li>
// //           </ul>
// //           <p>
// //             Merci de bien vouloir passer vos commandes en conséquence afin de
// //             garantir leur livraison dans les meilleurs délais.
// //           </p>
// //           <p className="mt-6 text-center text-gray-500">
// //             Nous vous remercions pour votre confiance.
// //           </p>
// //         </div>
// //       </div>

// //       {/* Print and Close buttons */}
// //       <div className="mt-8 text-center print:hidden flex justify-center gap-4 mb-12">
// //         <button
// //           onClick={handlePrint}
// //           className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-black transition-colors print-button"
// //         >
// //           <Printer className="inline-block mr-2 h-5 w-5" />
// //           Imprimer
// //         </button>
// //         <button
// //           onClick={onClose}
// //           className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors close-button"
// //         >
// //           Fermer
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // "use client";

// // import { useRef } from "react";
// // import Image from "next/image";
// // import { Printer, Phone, Mail } from "lucide-react";

// // interface InvoiceProps {
// //   orderId: string;
// //   items: Array<{
// //     id: string;
// //     name: string;
// //     price: number;
// //     quantity: number;
// //     imageUrl: string;
// //   }>;
// //   customerInfo: {
// //     firstName: string;
// //     lastName: string;
// //     address: string;
// //     phone: string;
// //   };
// //   totalAmount: number;
// //   onClose: () => void;
// // }

// // export default function Invoice({
// //   orderId,
// //   items,
// //   customerInfo,
// //   totalAmount,
// //   onClose,
// // }: InvoiceProps) {
// //   const invoiceRef = useRef<HTMLDivElement>(null);

// //   // Update the handlePrint function to properly handle images
// //   const handlePrint = () => {
// //     if (invoiceRef.current) {
// //       // First, get all image URLs
// //       const imageElements = invoiceRef.current.querySelectorAll("img");
// //       const imageUrls: { [key: string]: string } = {};

// //       imageElements.forEach((img, index) => {
// //         // Get the computed src from the rendered image
// //         const computedStyle = window.getComputedStyle(img);
// //         const backgroundImage = computedStyle.backgroundImage;

// //         // Extract URL or use src as fallback
// //         let url = img.src;
// //         if (backgroundImage && backgroundImage !== "none") {
// //           const match = backgroundImage.match(/url$$['"]?(.*?)['"]?$$/);
// //           if (match && match[1]) {
// //             url = match[1];
// //           }
// //         }

// //         // Store with a unique ID
// //         const id = `img-${index}`;
// //         imageUrls[id] = url;
// //         img.setAttribute("data-img-id", id);
// //       });

// //       const content = invoiceRef.current.innerHTML;
// //       const printWindow = window.open("", "_blank");

// //       if (printWindow) {
// //         printWindow.document.write(`
// //           <html>
// //             <head>
// //               <title>Facture MOIÉTOI</title>
// //               <meta charset="UTF-8">
// //               <meta name="viewport" content="width=device-width, initial-scale=1.0">
// //               <style>
// //                 @page {
// //                   size: A4;
// //                   margin: 1.5cm;
// //                 }

// //                 * {
// //                   box-sizing: border-box;
// //                   margin: 0;
// //                   padding: 0;
// //                 }

// //                 body {
// //                   font-family: Arial, Helvetica, sans-serif;
// //                   line-height: 1.6;
// //                   color: #333;
// //                   background: white;
// //                   padding: 0;
// //                   margin: 0;
// //                 }

// //                 .invoice-container {
// //                   max-width: 800px;
// //                   margin: 0 auto;
// //                   padding: 30px;
// //                   border: 1px solid #eee;
// //                   box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
// //                   background: white;
// //                 }

// //                 .header {
// //                   display: flex;
// //                   justify-content: space-between;
// //                   margin-bottom: 40px;
// //                   border-bottom: 1px solid #eee;
// //                   padding-bottom: 20px;
// //                 }

// //                 .header h1 {
// //                   font-size: 24px;
// //                   font-weight: 300;
// //                   letter-spacing: 5px;
// //                 }

// //                 .contact-info {
// //                   text-align: center;
// //                   margin-bottom: 40px;
// //                 }

// //                 .contact-info span {
// //                   margin: 0 15px;
// //                 }

// //                 .title {
// //                   text-align: center;
// //                   margin-bottom: 30px;
// //                 }

// //                 .title h2 {
// //                   font-size: 32px;
// //                   font-weight: 300;
// //                   letter-spacing: 5px;
// //                 }

// //                 .order-id {
// //                   text-align: center;
// //                   margin-bottom: 40px;
// //                   font-size: 18px;
// //                 }

// //                 .divider {
// //                   border-top: 1px solid #eee;
// //                   margin: 30px 0;
// //                 }

// //                 .item {
// //                   display: flex;
// //                   margin-bottom: 30px;
// //                 }

// //                 .item-image {
// //                   width: 120px;
// //                   height: 90px;
// //                   margin-right: 30px;
// //                   background-position: center;
// //                   background-size: contain;
// //                   background-repeat: no-repeat;
// //                   border: 1px solid #eee;
// //                 }

// //                 .item-details {
// //                   flex: 1;
// //                 }

// //                 .item-details h3 {
// //                   font-size: 18px;
// //                   margin-bottom: 5px;
// //                 }

// //                 .item-details p {
// //                   font-size: 14px;
// //                   color: #666;
// //                   margin-bottom: 3px;
// //                 }

// //                 .item-price {
// //                   text-align: right;
// //                   min-width: 100px;
// //                 }

// //                 .item-price p:first-child {
// //                   font-size: 18px;
// //                   margin-bottom: 5px;
// //                 }

// //                 .summary {
// //                   margin-left: auto;
// //                   max-width: 300px;
// //                 }

// //                 .summary-row {
// //                   display: flex;
// //                   justify-content: space-between;
// //                   margin-bottom: 10px;
// //                 }

// //                 .summary-row.total {
// //                   border-top: 1px solid #eee;
// //                   padding-top: 10px;
// //                   margin-top: 10px;
// //                   font-weight: bold;
// //                 }

// //                 .summary-row.total p:last-child {
// //                   font-size: 22px;
// //                 }

// //                 .customer-info {
// //                   margin-top: 40px;
// //                   padding-top: 20px;
// //                   border-top: 1px solid #eee;
// //                 }

// //                 .customer-info h3 {
// //                   margin-bottom: 10px;
// //                 }

// //                 .delivery-note {
// //                   margin-top: 40px;
// //                   padding-top: 20px;
// //                   border-top: 1px solid #eee;
// //                   line-height: 1.8;
// //                 }

// //                 .print-button, .close-button {
// //                   display: none;
// //                 }

// //                 .logo {
// //                   font-weight: 300;
// //                   letter-spacing: 5px;
// //                   font-size: 24px;
// //                 }

// //                 .icon {
// //                   display: inline-block;
// //                   width: 16px;
// //                   height: 16px;
// //                   margin-right: 5px;
// //                 }

// //                 ul.delivery-list {
// //                   list-style-type: disc;
// //                   margin-left: 20px;
// //                   margin-top: 10px;
// //                   margin-bottom: 10px;
// //                 }

// //                 ul.delivery-list li {
// //                   margin-bottom: 5px;
// //                 }
// //               </style>
// //             </head>
// //             <body>
// //               <div class="invoice-container">
// //                 ${content}
// //               </div>
// //               <script>
// //                 // Function to replace Next.js Image components with regular images
// //                 function replaceImages() {
// //                   const imageUrls = ${JSON.stringify(imageUrls)};

// //                   // Replace all image containers with proper images
// //                   document.querySelectorAll('.item-image-container').forEach(container => {
// //                     const img = container.querySelector('img');
// //                     if (img) {
// //                       const imgId = img.getAttribute('data-img-id');
// //                       const url = imageUrls[imgId] || '/placeholder.svg';

// //                       // Create a div with background image
// //                       const div = document.createElement('div');
// //                       div.className = 'item-image';
// //                       div.style.backgroundImage = 'url("' + url + '")';

// //                       // Replace the Next.js image with our div
// //                       container.innerHTML = '';
// //                       container.appendChild(div);
// //                     }
// //                   });

// //                   // Remove buttons
// //                   document.querySelectorAll('.print-button, .close-button').forEach(button => {
// //                     if (button) button.style.display = 'none';
// //                   });
// //                 }

// //                 // Wait for images to load then print
// //                 window.onload = function() {
// //                   replaceImages();

// //                   // Print after a short delay to ensure styles are applied
// //                   setTimeout(() => {
// //                     window.print();
// //                     window.onfocus = function() { window.close(); }
// //                   }, 1000);
// //                 }
// //               </script>
// //             </body>
// //           </html>
// //         `);
// //         printWindow.document.close();
// //       }
// //     }
// //   };

// //   // Generate a unique cart ID based on order ID
// //   const cartId = `USCART${orderId.replace(/\D/g, "")}`;

// //   // Calculate total items
// //   const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

// //   return (
// //     <div className="fixed inset-0 bg-white z-50 overflow-auto">
// //       <div
// //         className="max-w-4xl mx-auto my-8 p-8 bg-white border border-gray-200 shadow-lg"
// //         ref={invoiceRef}
// //       >
// //         {/* Header */}
// //         <div className="flex justify-between items-center mb-12 pb-6 border-b border-gray-200">
// //           <h1 className="text-2xl font-light tracking-widest uppercase logo">
// //             MOIÉTOI
// //           </h1>
// //           <div className="text-sm text-gray-500">
// //             <p>Facture #{cartId}</p>
// //             <p>{new Date().toLocaleDateString()}</p>
// //           </div>
// //         </div>

// //         {/* Contact Info */}
// //         <div className="flex justify-center items-center gap-6 mb-16 text-gray-700 contact-info">
// //           <div className="flex items-center">
// //             <Phone className="h-4 w-4 mr-2 icon" />
// //             <span>+212 663777275</span>
// //           </div>
// //           <div className="text-gray-300">|</div>
// //           <div className="flex items-center">
// //             <Mail className="h-4 w-4 mr-2 icon" />
// //             <span>relhammouni@gmail.com</span>
// //           </div>
// //         </div>

// //         {/* Main Title */}
// //         <div className="title">
// //           <h2 className="text-4xl font-light text-center tracking-widest mb-4">
// //             MON PANIER
// //           </h2>
// //           <p className="text-gray-500 text-sm">Merci pour votre commande</p>
// //         </div>

// //         {/* Order ID */}
// //         <p className="text-center mb-16 text-lg order-id">SAC #{cartId}</p>

// //         <hr className="mb-12 border-gray-200 divider" />

// //         {/* Items */}
// //         {items.map((item, index) => (
// //           <div key={item.id} className="mb-12 item">
// //             <div className="w-32 h-24 relative item-image-container border border-gray-200 rounded overflow-hidden">
// //               <Image
// //                 src={item.imageUrl || "/placeholder.svg"}
// //                 alt={item.name}
// //                 fill
// //                 className="object-contain"
// //                 sizes="120px"
// //                 priority
// //               />
// //             </div>
// //             <div className="flex-1 item-details">
// //               <h3 className="text-xl font-medium mb-2">{item.name}</h3>
// //               <p className="text-sm text-gray-600 mb-1">
// //                 Réf: {item.id.substring(0, 6).toUpperCase()}
// //               </p>
// //               <p className="text-sm text-gray-600 mb-1">
// //                 Style: Premium Leather
// //               </p>
// //               <p className="text-sm text-gray-600 mb-1">Taille: Universal</p>
// //               <p className="text-sm font-semibold mt-2">DISPONIBLE</p>
// //               <p className="text-sm text-gray-600">Livraison gratuite</p>
// //             </div>
// //             <div className="text-right item-price">
// //               <p className="text-xl mb-2">{item.price.toLocaleString()} MAD</p>
// //               <p className="text-gray-600">Qté: {item.quantity}</p>
// //             </div>
// //           </div>
// //         ))}

// //         <hr className="mb-8 border-gray-200 divider" />

// //         {/* Order Summary */}
// //         <div className="max-w-md ml-auto summary">
// //           <div className="flex justify-between mb-4 summary-row">
// //             <p className="text-lg">Sous-total ({totalItems} articles)</p>
// //             <p className="text-lg">{totalAmount.toLocaleString()} MAD</p>
// //           </div>
// //           <div className="flex justify-between mb-4 summary-row">
// //             <p className="text-lg">Livraison</p>
// //             <p className="text-lg">Gratuite</p>
// //           </div>
// //           <div className="flex justify-between mb-4 pt-4 border-t border-gray-200 summary-row total">
// //             <p className="text-lg font-medium">Total</p>
// //             <p className="text-2xl">{totalAmount.toLocaleString()} MAD</p>
// //           </div>
// //         </div>

// //         {/* Customer Information */}
// //         <div className="mt-12 pt-8 border-t border-gray-200 customer-info">
// //           <h3 className="text-lg font-medium mb-4">Informations client</h3>
// //           <p className="text-gray-700 mb-2">
// //             <strong>Nom:</strong> {customerInfo.firstName}{" "}
// //             {customerInfo.lastName}
// //           </p>
// //           <p className="text-gray-700 mb-2">
// //             <strong>Adresse:</strong> {customerInfo.address}
// //           </p>
// //           <p className="text-gray-700">
// //             <strong>Téléphone:</strong> {customerInfo.phone}
// //           </p>
// //         </div>

// //         {/* Delivery Note */}
// //         <div className="mt-12 pt-8 border-t border-gray-200 delivery-note">
// //           <h3 className="text-lg font-medium mb-4">
// //             Informations de livraison
// //           </h3>
// //           <p>
// //             Cher(e) client(e),
// //             <br />
// //             Nous vous informons que nos livraisons sont effectuées selon le
// //             planning suivant :
// //           </p>
// //           <ul className="delivery-list my-4">
// //             <li>
// //               <strong>Rabat et environs :</strong> chaque Mercredi et Samedi
// //             </li>
// //             <li>
// //               <strong>Casablanca :</strong> uniquement le Samedi
// //             </li>
// //           </ul>
// //           <p>
// //             Merci de bien vouloir passer vos commandes en conséquence afin de
// //             garantir leur livraison dans les meilleurs délais.
// //           </p>
// //           <p className="mt-6 text-center text-gray-500">
// //             Nous vous remercions pour votre confiance.
// //           </p>
// //         </div>
// //       </div>

// //       {/* Print and Close buttons */}
// //       <div className="mt-8 text-center print:hidden flex justify-center gap-4 mb-12">
// //         <button
// //           onClick={handlePrint}
// //           className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-black transition-colors print-button"
// //         >
// //           <Printer className="inline-block mr-2 h-5 w-5" />
// //           Imprimer
// //         </button>
// //         <button
// //           onClick={onClose}
// //           className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors close-button"
// //         >
// //           Fermer
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useRef } from "react";
// import Image from "next/image";
// import { Printer, Phone, Mail } from "lucide-react";

// interface InvoiceProps {
//   orderId: string;
//   items: Array<{
//     id: string;
//     name: string;
//     price: number;
//     quantity: number;
//     imageUrl: string;
//   }>;
//   customerInfo: {
//     firstName: string;
//     lastName: string;
//     address: string;
//     phone: string;
//   };
//   totalAmount: number;
//   onClose: () => void;
// }

// export default function Invoice({
//   orderId,
//   items,
//   customerInfo,
//   totalAmount,
//   onClose,
// }: InvoiceProps) {
//   const invoiceRef = useRef<HTMLDivElement>(null);

//   // Completely new approach for printing
//   const handlePrint = () => {
//     // Create a new window for printing
//     const printWindow = window.open("", "_blank", "width=800,height=600");

//     if (!printWindow) {
//       alert("Please allow pop-ups for this website to print the invoice.");
//       return;
//     }

//     // Generate HTML content directly (no Next.js components)
//     const printContent = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Facture MOIÉTOI</title>
//           <meta charset="UTF-8">
//           <style>
//             @page {
//               size: A4;
//               margin: 1.5cm;
//             }

//             body {
//               font-family: Arial, sans-serif;
//               line-height: 1.6;
//               color: #333;
//               margin: 0;
//               padding: 0;
//             }

//             .invoice-container {
//               max-width: 800px;
//               margin: 0 auto;
//               padding: 20px;
//               border: 1px solid #eee;
//               box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
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
//             }

//             .item-image {
//               width: 120px;
//               height: 90px;
//               margin-right: 30px;
//               border: 1px solid #eee;
//               padding: 5px;
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
//               <p>Merci pour votre commande</p>
//             </div>

//             <!-- Order ID -->
//             <p class="order-id">SAC #${cartId}</p>

//             <hr class="divider">

//             <!-- Items -->
//             ${items
//               .map(
//                 (item) => `
//               <div class="item">
//                 <img src="${item.imageUrl}" alt="${
//                   item.name
//                 }" class="item-image">
//                 <div class="item-details">
//                   <h3>${item.name}</h3>
//                   <p>Catégorie: ${item.id.substring(0, 6).toUpperCase()}</p>
//                   <p>Couleur: Premium Leather</p>
//                   <p>Taille: Universal</p>
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

//           <script>
//             // Print automatically when loaded
//             window.onload = function() {
//               // Wait for images to load
//               setTimeout(function() {
//                 window.print();
//                 window.onfocus = function() { window.close(); }
//               }, 1000);
//             }
//           </script>
//         </body>
//       </html>
//     `;

//     // Write to the new window
//     printWindow.document.write(printContent);
//     printWindow.document.close();
//   };

//   // Generate a unique cart ID based on order ID
//   const cartId = `USCART${orderId.replace(/\D/g, "")}`;

//   // Calculate total items
//   const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <div className="fixed inset-0 bg-white z-50 overflow-auto">
//       <div
//         className="max-w-4xl mx-auto my-8 p-8 bg-white border border-gray-200 shadow-lg"
//         ref={invoiceRef}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center mb-12 pb-6 border-b border-gray-200">
//           <h1 className="text-2xl font-light tracking-widest uppercase">
//             MOIÉTOI
//           </h1>
//           <div className="text-sm text-gray-500">
//             <p>Facture #{cartId}</p>
//             <p>{new Date().toLocaleDateString()}</p>
//           </div>
//         </div>

//         {/* Contact Info */}
//         <div className="flex justify-center items-center gap-6 mb-16 text-gray-700">
//           <div className="flex items-center">
//             <Phone className="h-4 w-4 mr-2" />
//             <span>+212 663777275</span>
//           </div>
//           <div className="text-gray-300">|</div>
//           <div className="flex items-center">
//             <Mail className="h-4 w-4 mr-2" />
//             <span>relhammouni@gmail.com</span>
//           </div>
//         </div>

//         {/* Main Title */}
//         <div className="text-center mb-8">
//           <h2 className="text-4xl font-light tracking-widest mb-4">
//             MON PANIER
//           </h2>
//           <p className="text-gray-500 text-sm">Merci pour votre commande</p>
//         </div>

//         {/* Order ID */}
//         <p className="text-center mb-16 text-lg">SAC #{cartId}</p>

//         <hr className="mb-12 border-gray-200" />

//         {/* Items */}
//         {items.map((item, index) => (
//           <div key={item.id} className="flex mb-12">
//             <div className="w-32 h-24 relative border border-gray-200 rounded overflow-hidden">
//               <Image
//                 src={item.imageUrl || "/placeholder.svg"}
//                 alt={item.name}
//                 fill
//                 className="object-contain"
//                 sizes="120px"
//                 priority
//               />
//             </div>
//             <div className="flex-1 ml-8">
//               <h3 className="text-xl font-medium mb-2">{item.name}</h3>
//               <p className="text-sm text-gray-600 mb-1">
//                 Catégorie: {item.id.substring(0, 6).toUpperCase()}
//               </p>
//               <p className="text-sm text-gray-600 mb-1">
//                 Couleur: Premium Leather
//               </p>
//               <p className="text-sm text-gray-600 mb-1">Taille: Universal</p>
//               <p className="text-sm font-semibold mt-2">DISPONIBLE</p>
//               <p className="text-sm text-gray-600">Livraison gratuite</p>
//             </div>
//             <div className="text-right min-w-[100px]">
//               <p className="text-xl mb-2">{item.price.toLocaleString()} MAD</p>
//               <p className="text-gray-600">Qté: {item.quantity}</p>
//             </div>
//           </div>
//         ))}

//         <hr className="mb-8 border-gray-200" />

//         {/* Order Summary */}
//         <div className="max-w-md ml-auto">
//           <div className="flex justify-between mb-4">
//             <p className="text-lg">Sous-total ({totalItems} articles)</p>
//             <p className="text-lg">{totalAmount.toLocaleString()} MAD</p>
//           </div>
//           <div className="flex justify-between mb-4">
//             <p className="text-lg">Livraison</p>
//             <p className="text-lg">Gratuite</p>
//           </div>
//           <div className="flex justify-between mb-4 pt-4 border-t border-gray-200">
//             <p className="text-lg font-medium">Total</p>
//             <p className="text-2xl">{totalAmount.toLocaleString()} MAD</p>
//           </div>
//         </div>

//         {/* Customer Information */}
//         <div className="mt-12 pt-8 border-t border-gray-200">
//           <h3 className="text-lg font-medium mb-4">Informations client</h3>
//           <p className="text-gray-700 mb-2">
//             <strong>Nom:</strong> {customerInfo.firstName}{" "}
//             {customerInfo.lastName}
//           </p>
//           <p className="text-gray-700 mb-2">
//             <strong>Adresse:</strong> {customerInfo.address}
//           </p>
//           <p className="text-gray-700">
//             <strong>Téléphone:</strong> {customerInfo.phone}
//           </p>
//         </div>

//         {/* Delivery Note */}
//         <div className="mt-12 pt-8 border-t border-gray-200">
//           <h3 className="text-lg font-medium mb-4">
//             Informations de livraison
//           </h3>
//           <p>
//             Cher(e) client(e),
//             <br />
//             Nous vous informons que nos livraisons sont effectuées selon le
//             planning suivant :
//           </p>
//           <ul className="list-disc ml-6 my-4">
//             <li>
//               <strong>Rabat et environs :</strong> chaque Mercredi et Samedi
//             </li>
//             <li>
//               <strong>Casablanca :</strong> uniquement le Samedi
//             </li>
//           </ul>
//           <p>
//             Merci de bien vouloir passer vos commandes en conséquence afin de
//             garantir leur livraison dans les meilleurs délais.
//           </p>
//           <p className="mt-6 text-center text-gray-500">
//             Nous vous remercions pour votre confiance.
//           </p>
//         </div>
//       </div>

//       {/* Print and Close buttons */}
//       <div className="mt-8 text-center print:hidden flex justify-center gap-4 mb-12">
//         <button
//           onClick={handlePrint}
//           className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-black transition-colors"
//         >
//           <Printer className="inline-block mr-2 h-5 w-5" />
//           Imprimer
//         </button>
//         <button
//           onClick={onClose}
//           className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
//         >
//           Fermer
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRef } from "react";
import Image from "next/image";
import { Printer, Phone, Mail } from "lucide-react";
import { useCart } from "@/app/contexts/CartContext";

interface InvoiceProps {
  orderId?: string; // Make orderId optional
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }>;
  customerInfo: {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
  };
  totalAmount: number;
  onClose: () => void;
}

export default function Invoice({
  orderId: propOrderId,
  items,
  customerInfo,
  totalAmount,
  onClose,
}: InvoiceProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const { orderId: contextOrderId } = useCart();

  // Use the provided orderId prop if available, otherwise use the one from context
  const orderId = propOrderId || contextOrderId;

  // Completely new approach for printing
  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank", "width=800,height=600");

    if (!printWindow) {
      alert("Please allow pop-ups for this website to print the invoice.");
      return;
    }

    // Generate HTML content directly (no Next.js components)
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Facture MOIÉTOI</title>
          <meta charset="UTF-8">
          <style>
            @page {
              size: A4;
              margin: 1.5cm;
            }
            
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
            }
            
            .invoice-container {
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #eee;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
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
            }
            
            .item-image {
              width: 120px;
              height: 90px;
              margin-right: 30px;
              border: 1px solid #eee;
              padding: 5px;
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
              <p>Merci pour votre commande</p>
            </div>
            
            <!-- Order ID -->
            <p class="order-id">SAC #${cartId}</p>
            
            <hr class="divider">
            
            <!-- Items -->
            ${items
              .map(
                (item) => `
              <div class="item">
                <img src="${item.imageUrl}" alt="${
                  item.name
                }" class="item-image">
                <div class="item-details">
                  <h3>${item.name}</h3>
                  <p>Réf: ${item.id.substring(0, 6).toUpperCase()}</p>
                  <p>Style: Premium Leather</p>
                  <p>Taille: Universal</p>
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
          
          <script>
            // Print automatically when loaded
            window.onload = function() {
              // Wait for images to load
              setTimeout(function() {
                window.print();
                window.onfocus = function() { window.close(); }
              }, 1000);
            }
          </script>
        </body>
      </html>
    `;

    // Write to the new window
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  // Generate a unique cart ID based on order ID
  const cartId = `USCART${orderId.replace(/\D/g, "")}`;

  // Calculate total items
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div
        className="max-w-4xl mx-auto my-8 p-8 bg-white border border-gray-200 shadow-lg"
        ref={invoiceRef}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-12 pb-6 border-b border-gray-200">
          <h1 className="text-2xl font-light tracking-widest uppercase">
            MOIÉTOI
          </h1>
          <div className="text-sm text-gray-500">
            <p>Facture #{cartId}</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex justify-center items-center gap-6 mb-16 text-gray-700">
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            <span>+212 663777275</span>
          </div>
          <div className="text-gray-300">|</div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            <span>relhammouni@gmail.com</span>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-light tracking-widest mb-4">
            MON PANIER
          </h2>
          <p className="text-gray-500 text-sm">Merci pour votre commande</p>
        </div>

        {/* Order ID */}
        <p className="text-center mb-16 text-lg">SAC #{cartId}</p>

        <hr className="mb-12 border-gray-200" />

        {/* Items */}
        {items.map((item, index) => (
          <div key={item.id} className="flex mb-12">
            <div className="w-32 h-24 relative border border-gray-200 rounded overflow-hidden">
              <Image
                src={item.imageUrl || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-contain"
                sizes="120px"
                priority
              />
            </div>
            <div className="flex-1 ml-8">
              <h3 className="text-xl font-medium mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                Réf: {item.id.substring(0, 6).toUpperCase()}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Style: Premium Leather
              </p>
              <p className="text-sm text-gray-600 mb-1">Taille: Universal</p>
              <p className="text-sm font-semibold mt-2">DISPONIBLE</p>
              <p className="text-sm text-gray-600">Livraison gratuite</p>
            </div>
            <div className="text-right min-w-[100px]">
              <p className="text-xl mb-2">{item.price.toLocaleString()} MAD</p>
              <p className="text-gray-600">Qté: {item.quantity}</p>
            </div>
          </div>
        ))}

        <hr className="mb-8 border-gray-200" />

        {/* Order Summary */}
        <div className="max-w-md ml-auto">
          <div className="flex justify-between mb-4">
            <p className="text-lg">Sous-total ({totalItems} articles)</p>
            <p className="text-lg">{totalAmount.toLocaleString()} MAD</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className="text-lg">Livraison</p>
            <p className="text-lg">Gratuite</p>
          </div>
          <div className="flex justify-between mb-4 pt-4 border-t border-gray-200">
            <p className="text-lg font-medium">Total</p>
            <p className="text-2xl">{totalAmount.toLocaleString()} MAD</p>
          </div>
        </div>

        {/* Customer Information */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-medium mb-4">Informations client</h3>
          <p className="text-gray-700 mb-2">
            <strong>Nom:</strong> {customerInfo.firstName}{" "}
            {customerInfo.lastName}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Adresse:</strong> {customerInfo.address}
          </p>
          <p className="text-gray-700">
            <strong>Téléphone:</strong> {customerInfo.phone}
          </p>
        </div>

        {/* Delivery Note */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-medium mb-4">
            Informations de livraison
          </h3>
          <p>
            Cher(e) client(e),
            <br />
            Nous vous informons que nos livraisons sont effectuées selon le
            planning suivant :
          </p>
          <ul className="list-disc ml-6 my-4">
            <li>
              <strong>Rabat et environs :</strong> chaque Mercredi et Samedi
            </li>
            <li>
              <strong>Casablanca :</strong> uniquement le Samedi
            </li>
          </ul>
          <p>
            Merci de bien vouloir passer vos commandes en conséquence afin de
            garantir leur livraison dans les meilleurs délais.
          </p>
          <p className="mt-6 text-center text-gray-500">
            Nous vous remercions pour votre confiance.
          </p>
        </div>
      </div>

      {/* Print and Close buttons */}
      <div className="mt-8 text-center print:hidden flex justify-center gap-4 mb-12">
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-black transition-colors"
        >
          <Printer className="inline-block mr-2 h-5 w-5" />
          Imprimer
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

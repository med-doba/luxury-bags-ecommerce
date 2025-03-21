// "use client";

// import type React from "react";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ChevronLeft, Download, CheckCircle } from "lucide-react";
// import { useCart } from "@/app/contexts/CartContext";
// import { useRouter } from "next/navigation";
// import Invoice from "./Invoice";

// interface CheckoutFlowProps {
//   initialProducts: Array<{
//     id: string;
//     name: string;
//     price: number;
//     quantity: number;
//     imageUrl: string;
//     color: string;
//   }>;
//   totalAmount: number;
// }

// const steps = [
//   { id: 1, name: "Panier" },
//   { id: 2, name: "Détails" },
//   { id: 3, name: "Livraison" },
//   { id: 4, name: "Paiement" },
// ];

// export default function CheckoutFlow({
//   initialProducts,
//   totalAmount,
// }: CheckoutFlowProps) {
//   console.log("initialProducts : ", initialProducts);
//   const [currentStep, setCurrentStep] = useState(2);
//   const [email, setEmail] = useState("");
//   const [isEmailValid, setIsEmailValid] = useState(false);
//   const [shippingInfo, setShippingInfo] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     // city: "",
//     // postalCode: "",
//     // country: "",
//     phone: "",
//   });
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [showInvoice, setShowInvoice] = useState(false);
//   const [orderId, setOrderId] = useState("");
//   const { clearCart, generateOrderId } = useCart();
//   const router = useRouter();
//   const [phoneError, setPhoneError] = useState("");

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setEmail(value);
//     setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
//   };

//   const handleShippingInfoChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { id, value } = e.target;
//     setShippingInfo((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleContinue = () => {
//     if (isEmailValid) {
//       setCurrentStep(3);
//     }
//   };

//   const isShippingFormValid = () => {
//     return (
//       Object.values(shippingInfo).every((value) => value.trim() !== "") &&
//       !phoneError
//     );
//   };

//   const handleCompleteOrder = () => {
//     // Generate a new order ID
//     const newOrderId = generateOrderId();

//     // In a real application, you would process the order here
//     // For now, we'll just redirect to the success page
//     router.push("/checkout/success");
//   };

//   const generateInvoice = () => {
//     // Generate a random order ID
//     const newOrderId = Math.floor(Math.random() * 10000000)
//       .toString()
//       .padStart(7, "0");
//     setOrderId(newOrderId);

//     // Show the invoice modal
//     setShowInvoice(true);

//     // Prevent scrolling on the body when modal is open
//     document.body.classList.add("overflow-hidden");
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-4">
//         <header className="py-20">
//           <div className="flex items-center justify-between mb-8">
//             <Link href="/basket" className="flex items-center text-sm">
//               <ChevronLeft className="h-4 w-4 mr-1" />
//               Retour au panier
//             </Link>
//             {/* <Image
//               src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-16%20at%2013.59.53-znxDQTZ0oCtklmta5tSOpxxbJnj1cS.png"
//               alt="MOIÉTOI"
//               width={120}
//               height={40}
//               className="mx-auto"
//             /> */}
//             <div className="w-20" /> {/* Spacer for centering logo */}
//           </div>

//           <div className="flex justify-center">
//             {steps.map((step, index) => (
//               <div key={step.id} className="flex items-center">
//                 <div
//                   className={`flex items-center ${
//                     step.id <= currentStep ? "text-black" : "text-gray-400"
//                   }`}
//                 >
//                   <span className="mr-2">{step.id}</span>
//                   <span>{step.name}</span>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className="mx-4 h-px w-16 bg-gray-200" />
//                 )}
//               </div>
//             ))}
//           </div>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-16">
//           <div>
//             {currentStep === 5 && (
//               <>
//                 <h2 className="text-xl font-medium mb-6">Enter your email</h2>
//                 <p className="text-sm text-gray-600 mb-6">
//                   If you have an account, you will be asked to sign in.
//                   Otherwise, you can continue as a guest and register after
//                   checkout.
//                 </p>
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={email}
//                   onChange={handleEmailChange}
//                   className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
//                     isEmailValid
//                       ? "focus:ring-green-500 border-green-500"
//                       : "focus:ring-black"
//                   }`}
//                 />
//                 <button
//                   className={`w-full py-3 mt-6 ${
//                     isEmailValid
//                       ? "bg-black text-white"
//                       : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   }`}
//                   onClick={handleContinue}
//                   disabled={!isEmailValid}
//                 >
//                   Continue
//                 </button>
//               </>
//             )}

//             {currentStep === 2 && (
//               <>
//                 <h2 className="text-xl font-medium mb-6">
//                   Informations de livraison
//                 </h2>
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label
//                         htmlFor="firstName"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Prénom *
//                       </label>
//                       <input
//                         type="text"
//                         id="firstName"
//                         value={shippingInfo.firstName}
//                         onChange={handleShippingInfoChange}
//                         className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                       />
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="lastName"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Nom de famille *
//                       </label>
//                       <input
//                         type="text"
//                         id="lastName"
//                         value={shippingInfo.lastName}
//                         onChange={handleShippingInfoChange}
//                         className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="address"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Address *
//                     </label>
//                     <input
//                       type="text"
//                       id="address"
//                       value={shippingInfo.address}
//                       onChange={handleShippingInfoChange}
//                       className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                     />
//                   </div>
//                   <div className="grid grid-cols-1 gap-4">
//                     {/* <div>
//                       <label
//                         htmlFor="city"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Ville
//                       </label>
//                       <input
//                         type="text"
//                         id="city"
//                         value={shippingInfo.city}
//                         onChange={handleShippingInfoChange}
//                         className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                       />
//                     </div> */}
//                     {/* <div>
//                       <label
//                         htmlFor="postalCode"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Postal Code
//                       </label>
//                       <input
//                         type="text"
//                         id="postalCode"
//                         value={shippingInfo.postalCode}
//                         onChange={handleShippingInfoChange}
//                         className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                       />
//                     </div> */}
//                   </div>
//                   {/* <div>
//                     <label
//                       htmlFor="country"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Country
//                     </label>
//                     <select
//                       id="country"
//                       value={shippingInfo.country}
//                       onChange={handleShippingInfoChange}
//                       className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                     >
//                       <option value="">Select Country</option>
//                       <option value="US">United States</option>
//                       <option value="CA">Canada</option>
//                       <option value="UK">United Kingdom</option>
//                       <option value="AU">Australia</option>
//                       <option value="AE">United Arab Emirates</option>
//                     </select>
//                   </div> */}
//                   <div>
//                     <label
//                       htmlFor="phone"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Numéro de téléphone *
//                     </label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       value={shippingInfo.phone}
//                       maxLength={13}
//                       minLength={10}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         // Only allow digits, spaces, and + character
//                         const sanitizedValue = value.replace(/[^\d\s+]/g, "");

//                         setShippingInfo((prev) => ({
//                           ...prev,
//                           phone: sanitizedValue,
//                         }));

//                         // Validate phone number
//                         if (sanitizedValue.trim() === "") {
//                           setPhoneError("Le numéro de téléphone est requis");
//                         } else if (sanitizedValue.trim().length < 8) {
//                           setPhoneError(
//                             "Le numéro de téléphone doit contenir au moins 8 chiffres"
//                           );
//                         } else {
//                           setPhoneError("");
//                         }
//                       }}
//                       className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
//                         phoneError
//                           ? "border-red-500 focus:ring-red-500"
//                           : "focus:ring-black"
//                       }`}
//                       placeholder="+212 600 000 000"
//                     />
//                     {phoneError && (
//                       <p className="text-red-500 text-sm mt-1">{phoneError}</p>
//                     )}
//                   </div>
//                 </div>
//                 <button
//                   className={`w-full py-3 mt-6 ${
//                     isShippingFormValid()
//                       ? "bg-black text-white"
//                       : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   }`}
//                   onClick={() => isShippingFormValid() && setCurrentStep(4)}
//                   disabled={!isShippingFormValid()}
//                 >
//                   Continuer vers le paiement
//                 </button>
//               </>
//             )}

//             {currentStep === 4 && (
//               <>
//                 <h2 className="text-xl font-medium mb-6">Mode de paiement</h2>
//                 <div className="bg-gray-50 p-6 rounded-lg mb-6">
//                   <div className="flex items-center mb-4">
//                     <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
//                     <h3 className="text-lg font-medium">
//                       Paiement à la livraison
//                     </h3>
//                   </div>
//                   <p className="text-gray-600 mb-4">
//                     Payez en espèces à la livraison de votre commande à votre
//                     domicile.
//                   </p>
//                   <div className="border-t pt-4 mt-4">
//                     <div className="flex justify-between text-lg font-medium">
//                       <span>Total à payer:</span>
//                       <span>{totalAmount.toLocaleString()} MAD</span>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   onClick={generateInvoice}
//                   className="w-full flex justify-center items-center py-3 mb-4 border border-black text-black hover:bg-gray-100"
//                 >
//                   <Download className="h-5 w-5 mr-2" />
//                   Télécharger la facture
//                 </button>

//                 <div className="mb-6">
//                   <label className="flex items-start cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={agreeToTerms}
//                       onChange={() => setAgreeToTerms(!agreeToTerms)}
//                       className="mt-1 mr-2"
//                     />
//                     <span className="text-sm text-gray-600">
//                       J'accepte les termes et conditions, la politique de
//                       confidentialité et la politique de retour. Je comprends
//                       que mes données personnelles seront traitées comme décrit
//                       dans la politique de confidentialité.
//                     </span>
//                   </label>
//                 </div>

//                 <button
//                   className={`w-full py-3 ${
//                     agreeToTerms
//                       ? "bg-black text-white"
//                       : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   }`}
//                   onClick={handleCompleteOrder}
//                   disabled={!agreeToTerms}
//                 >
//                   Finaliser la commande
//                 </button>
//               </>
//             )}
//           </div>

//           <div className="lg:pl-8">
//             <div className="bg-gray-50 p-6 rounded">
//               <h3 className="text-lg font-medium mb-4">
//                 Votre commande ({initialProducts.length})
//               </h3>
//               <div className="space-y-4 mb-6">
//                 {initialProducts.map((product) => (
//                   <div key={product.id} className="flex gap-4">
//                     <Image
//                       src={product.imageUrl || "/placeholder.svg"}
//                       alt={product.name}
//                       width={80}
//                       height={80}
//                       className="rounded"
//                     />
//                     <div className="flex-1">
//                       <h4 className="font-medium">{product.name}</h4>
//                       <p className="text-sm text-gray-600">
//                         Quantité: {product.quantity}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <span className="font-medium">
//                         {(product.price * product.quantity).toLocaleString()}MAD
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="border-t pt-4">
//                 <div className="flex justify-between mb-2">
//                   <span>Sous-total</span>
//                   <span>{totalAmount.toLocaleString()}MAD</span>
//                 </div>
//                 {/* <div className="flex justify-between mb-2">
//                   <span>Taxes et droits</span>
//                   <span>Included</span>
//                 </div> */}
//                 <div className="flex justify-between mb-4">
//                   <span>Livraison</span>
//                   <span>Gratuite</span>
//                 </div>
//                 <div className="flex justify-between font-medium">
//                   <span>Total</span>
//                   <span>{totalAmount.toLocaleString()}MAD</span>
//                 </div>
//               </div>

//               <div className="mt-6 space-y-4">
//                 {/* <div className="flex items-center gap-2">
//                   <Image
//                     src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-16%20at%2013.59.14-3OOfluGiDPbF1IEfxBNU5Og5vNxc8U.png"
//                     alt="Shipping"
//                     width={24}
//                     height={24}
//                   />
//                   <span className="text-sm">Livraison et retours gratuits</span>
//                 </div> */}
//                 <p className="text-sm">
//                   {/* Livraison : 2 à 7 jours ouvrés | Retours en ligne gratuits
//                   sous 14 jours | Échange gratuit en magasin sous 30 jours */}
//                   Rabat et environs : chaque Mercredi et Samedi | Casablanca :
//                   uniquement le Samedi
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Invoice Modal */}
//       {showInvoice && (
//         <Invoice
//           orderId={orderId}
//           items={initialProducts}
//           customerInfo={shippingInfo}
//           totalAmount={totalAmount}
//           onClose={() => setShowInvoice(false)}
//         />
//       )}
//     </div>
//   );
// }

// "use client";

// import type React from "react";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ChevronLeft, Download, CheckCircle } from "lucide-react";
// import { useCart } from "@/app/contexts/CartContext";
// import { useRouter } from "next/navigation";
// import Invoice from "./Invoice";
// import type { CartItem } from "@/app/contexts/CartContext";

// interface CheckoutFlowProps {
//   initialProducts: CartItem[];
//   totalAmount: number;
// }

// const steps = [
//   { id: 1, name: "Panier" },
//   { id: 2, name: "Détails" },
//   { id: 3, name: "Livraison" },
//   { id: 4, name: "Paiement" },
// ];

// export default function CheckoutFlow({
//   initialProducts,
//   totalAmount,
// }: CheckoutFlowProps) {
//   console.log("initialProducts : ", initialProducts);
//   const [currentStep, setCurrentStep] = useState(2);
//   const [email, setEmail] = useState("");
//   const [isEmailValid, setIsEmailValid] = useState(false);
//   const [shippingInfo, setShippingInfo] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     phone: "",
//   });
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [showInvoice, setShowInvoice] = useState(false);
//   const [orderId, setOrderId] = useState("");
//   const { clearCart, generateOrderId } = useCart();
//   const router = useRouter();
//   const [phoneError, setPhoneError] = useState("");

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setEmail(value);
//     setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
//   };

//   const handleShippingInfoChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { id, value } = e.target;
//     setShippingInfo((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleContinue = () => {
//     if (isEmailValid) {
//       setCurrentStep(3);
//     }
//   };

//   const isShippingFormValid = () => {
//     return (
//       Object.values(shippingInfo).every((value) => value.trim() !== "") &&
//       !phoneError
//     );
//   };

//   const handleCompleteOrder = () => {
//     // Generate a new order ID
//     const newOrderId = generateOrderId();

//     // In a real application, you would process the order here
//     // For now, we'll just redirect to the success page
//     router.push("/checkout/success");
//   };

//   const generateInvoice = () => {
//     // Generate a random order ID
//     const newOrderId = Math.floor(Math.random() * 10000000)
//       .toString()
//       .padStart(7, "0");
//     setOrderId(newOrderId);

//     // Show the invoice modal
//     setShowInvoice(true);

//     // Prevent scrolling on the body when modal is open
//     document.body.classList.add("overflow-hidden");
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-4">
//         <header className="py-20">
//           <div className="flex items-center justify-between mb-8">
//             <Link href="/basket" className="flex items-center text-sm">
//               <ChevronLeft className="h-4 w-4 mr-1" />
//               Retour au panier
//             </Link>
//             <div className="w-20" /> {/* Spacer for centering logo */}
//           </div>

//           <div className="flex justify-center">
//             {steps.map((step, index) => (
//               <div key={step.id} className="flex items-center">
//                 <div
//                   className={`flex items-center ${
//                     step.id <= currentStep ? "text-black" : "text-gray-400"
//                   }`}
//                 >
//                   <span className="mr-2">{step.id}</span>
//                   <span>{step.name}</span>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className="mx-4 h-px w-16 bg-gray-200" />
//                 )}
//               </div>
//             ))}
//           </div>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-16">
//           <div>
//             {currentStep === 5 && (
//               <>
//                 <h2 className="text-xl font-medium mb-6">Enter your email</h2>
//                 <p className="text-sm text-gray-600 mb-6">
//                   If you have an account, you will be asked to sign in.
//                   Otherwise, you can continue as a guest and register after
//                   checkout.
//                 </p>
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={email}
//                   onChange={handleEmailChange}
//                   className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
//                     isEmailValid
//                       ? "focus:ring-green-500 border-green-500"
//                       : "focus:ring-black"
//                   }`}
//                 />
//                 <button
//                   className={`w-full py-3 mt-6 ${
//                     isEmailValid
//                       ? "bg-black text-white"
//                       : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   }`}
//                   onClick={handleContinue}
//                   disabled={!isEmailValid}
//                 >
//                   Continue
//                 </button>
//               </>
//             )}

//             {currentStep === 2 && (
//               <>
//                 <h2 className="text-xl font-medium mb-6">
//                   Informations de livraison
//                 </h2>
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label
//                         htmlFor="firstName"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Prénom *
//                       </label>
//                       <input
//                         type="text"
//                         id="firstName"
//                         value={shippingInfo.firstName}
//                         onChange={handleShippingInfoChange}
//                         className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                       />
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="lastName"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Nom de famille *
//                       </label>
//                       <input
//                         type="text"
//                         id="lastName"
//                         value={shippingInfo.lastName}
//                         onChange={handleShippingInfoChange}
//                         className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="address"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Address *
//                     </label>
//                     <input
//                       type="text"
//                       id="address"
//                       value={shippingInfo.address}
//                       onChange={handleShippingInfoChange}
//                       className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="phone"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Numéro de téléphone *
//                     </label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       value={shippingInfo.phone}
//                       maxLength={13}
//                       minLength={10}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         // Only allow digits, spaces, and + character
//                         const sanitizedValue = value.replace(/[^\d\s+]/g, "");

//                         setShippingInfo((prev) => ({
//                           ...prev,
//                           phone: sanitizedValue,
//                         }));

//                         // Validate phone number
//                         if (sanitizedValue.trim() === "") {
//                           setPhoneError("Le numéro de téléphone est requis");
//                         } else if (sanitizedValue.trim().length < 8) {
//                           setPhoneError(
//                             "Le numéro de téléphone doit contenir au moins 8 chiffres"
//                           );
//                         } else {
//                           setPhoneError("");
//                         }
//                       }}
//                       className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
//                         phoneError
//                           ? "border-red-500 focus:ring-red-500"
//                           : "focus:ring-black"
//                       }`}
//                       placeholder="+212 600 000 000"
//                     />
//                     {phoneError && (
//                       <p className="text-red-500 text-sm mt-1">{phoneError}</p>
//                     )}
//                   </div>
//                 </div>
//                 <button
//                   className={`w-full py-3 mt-6 ${
//                     isShippingFormValid()
//                       ? "bg-black text-white"
//                       : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   }`}
//                   onClick={() => isShippingFormValid() && setCurrentStep(4)}
//                   disabled={!isShippingFormValid()}
//                 >
//                   Continuer vers le paiement
//                 </button>
//               </>
//             )}

//             {currentStep === 4 && (
//               <>
//                 <h2 className="text-xl font-medium mb-6">Mode de paiement</h2>
//                 <div className="bg-gray-50 p-6 rounded-lg mb-6">
//                   <div className="flex items-center mb-4">
//                     <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
//                     <h3 className="text-lg font-medium">
//                       Paiement à la livraison
//                     </h3>
//                   </div>
//                   <p className="text-gray-600 mb-4">
//                     Payez en espèces à la livraison de votre commande à votre
//                     domicile.
//                   </p>
//                   <div className="border-t pt-4 mt-4">
//                     <div className="flex justify-between text-lg font-medium">
//                       <span>Total à payer:</span>
//                       <span>{totalAmount.toLocaleString()} MAD</span>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   onClick={generateInvoice}
//                   className="w-full flex justify-center items-center py-3 mb-4 border border-black text-black hover:bg-gray-100"
//                 >
//                   <Download className="h-5 w-5 mr-2" />
//                   Télécharger la facture
//                 </button>

//                 <div className="mb-6">
//                   <label className="flex items-start cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={agreeToTerms}
//                       onChange={() => setAgreeToTerms(!agreeToTerms)}
//                       className="mt-1 mr-2"
//                     />
//                     <span className="text-sm text-gray-600">
//                       J'accepte les termes et conditions, la politique de
//                       confidentialité et la politique de retour. Je comprends
//                       que mes données personnelles seront traitées comme décrit
//                       dans la politique de confidentialité.
//                     </span>
//                   </label>
//                 </div>

//                 <button
//                   className={`w-full py-3 ${
//                     agreeToTerms
//                       ? "bg-black text-white"
//                       : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   }`}
//                   onClick={handleCompleteOrder}
//                   disabled={!agreeToTerms}
//                 >
//                   Finaliser la commande
//                 </button>
//               </>
//             )}
//           </div>

//           <div className="lg:pl-8">
//             <div className="bg-gray-50 p-6 rounded">
//               <h3 className="text-lg font-medium mb-4">
//                 Votre commande ({initialProducts.length})
//               </h3>
//               <div className="space-y-4 mb-6">
//                 {initialProducts.map((product) => (
//                   <div key={product.id} className="flex gap-4">
//                     <Image
//                       src={product.imageUrl || "/placeholder.svg"}
//                       alt={product.name}
//                       width={80}
//                       height={80}
//                       className="rounded"
//                     />
//                     <div className="flex-1">
//                       <h4 className="font-medium">{product.name}</h4>
//                       <p className="text-sm text-gray-600">
//                         Quantité: {product.quantity}
//                       </p>
//                       {product.color && (
//                         <p className="text-sm text-gray-600">
//                           Couleur: {product.color}
//                         </p>
//                       )}
//                       {product.size && (
//                         <p className="text-sm text-gray-600">
//                           Taille: {product.size}
//                         </p>
//                       )}
//                     </div>
//                     <div className="text-right">
//                       <span className="font-medium">
//                         {(product.price * product.quantity).toLocaleString()}MAD
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="border-t pt-4">
//                 <div className="flex justify-between mb-2">
//                   <span>Sous-total</span>
//                   <span>{totalAmount.toLocaleString()}MAD</span>
//                 </div>
//                 <div className="flex justify-between mb-4">
//                   <span>Livraison</span>
//                   <span>Gratuite</span>
//                 </div>
//                 <div className="flex justify-between font-medium">
//                   <span>Total</span>
//                   <span>{totalAmount.toLocaleString()}MAD</span>
//                 </div>
//               </div>

//               <div className="mt-6 space-y-4">
//                 <p className="text-sm">
//                   Rabat et environs : chaque Mercredi et Samedi | Casablanca :
//                   uniquement le Samedi
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Invoice Modal */}
//       {showInvoice && (
//         <Invoice
//           orderId={orderId}
//           items={initialProducts}
//           customerInfo={shippingInfo}
//           totalAmount={totalAmount}
//           onClose={() => setShowInvoice(false)}
//         />
//       )}
//     </div>
//   );
// }

// "use client";

// import type React from "react";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ChevronLeft, Download, CheckCircle } from "lucide-react";
// import { useCart } from "@/app/contexts/CartContext";
// import { useRouter } from "next/navigation";
// import Invoice from "./Invoice";
// import type { CartItem } from "@/app/contexts/CartContext";

// interface CheckoutFlowProps {
//   initialProducts: CartItem[];
//   totalAmount: number;
// }

// const steps = [
//   { id: 1, name: "Panier" },
//   { id: 2, name: "Détails" },
//   { id: 3, name: "Livraison" },
//   { id: 4, name: "Paiement" },
// ];

// export default function CheckoutFlow({
//   initialProducts,
//   totalAmount,
// }: CheckoutFlowProps) {
//   // Ensure all items have color and size properties
//   const processedProducts = initialProducts.map((item) => ({
//     ...item,
//     color: item.color || "Default",
//     size: item.size || "Universal",
//   }));

//   const [currentStep, setCurrentStep] = useState(2);
//   const [email, setEmail] = useState("");
//   const [isEmailValid, setIsEmailValid] = useState(false);
//   const [shippingInfo, setShippingInfo] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     phone: "",
//   });
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [showInvoice, setShowInvoice] = useState(false);
//   const [orderId, setOrderId] = useState("");
//   const { clearCart, generateOrderId } = useCart();
//   const router = useRouter();
//   const [phoneError, setPhoneError] = useState("");

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setEmail(value);
//     setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
//   };

//   const handleShippingInfoChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { id, value } = e.target;
//     setShippingInfo((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleContinue = () => {
//     if (isEmailValid) {
//       setCurrentStep(3);
//     }
//   };

//   const isShippingFormValid = () => {
//     return (
//       Object.values(shippingInfo).every((value) => value.trim() !== "") &&
//       !phoneError
//     );
//   };

//   const handleCompleteOrder = () => {
//     // Generate a new order ID
//     const newOrderId = generateOrderId();

//     // In a real application, you would process the order here
//     // For now, we'll just redirect to the success page
//     router.push("/checkout/success");
//   };

//   const generateInvoice = () => {
//     // Generate a random order ID
//     const newOrderId = Math.floor(Math.random() * 10000000)
//       .toString()
//       .padStart(7, "0");
//     setOrderId(newOrderId);

//     // Show the invoice modal
//     setShowInvoice(true);

//     // Prevent scrolling on the body when modal is open
//     document.body.classList.add("overflow-hidden");
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-4">
//         <header className="py-20">
//           <div className="flex items-center justify-between mb-8">
//             <Link href="/basket" className="flex items-center text-sm">
//               <ChevronLeft className="h-4 w-4 mr-1" />
//               Retour au panier
//             </Link>
//             <div className="w-20" /> {/* Spacer for centering logo */}
//           </div>

//           <div className="flex justify-center">
//             {steps.map((step, index) => (
//               <div key={step.id} className="flex items-center">
//                 <div
//                   className={`flex items-center ${
//                     step.id <= currentStep ? "text-black" : "text-gray-400"
//                   }`}
//                 >
//                   <span className="mr-2">{step.id}</span>
//                   <span>{step.name}</span>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className="mx-4 h-px w-16 bg-gray-200" />
//                 )}
//               </div>
//             ))}
//           </div>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-16">
//           <div>
//             {currentStep === 5 && (
//               <>
//                 <h2 className="text-xl font-medium mb-6">Enter your email</h2>
//                 <p className="text-sm text-gray-600 mb-6">
//                   If you have an account, you will be asked to sign in.
//                   Otherwise, you can continue as a guest and register after
//                   checkout.
//                 </p>
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={email}
//                   onChange={handleEmailChange}
//                   className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
//                     isEmailValid
//                       ? "focus:ring-green-500 border-green-500"
//                       : "focus:ring-black"
//                   }`}
//                 />
//                 <button
//                   className={`w-full py-3 mt-6 ${
//                     isEmailValid
//                       ? "bg-black text-white"
//                       : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   }`}
//                   onClick={handleContinue}
//                   disabled={!isEmailValid}
//                 >
//                   Continue
//                 </button>
//               </>
//             )}

//             {currentStep === 2 && (
//               <>
//                 <h2 className="text-xl font-medium mb-6">
//                   Informations de livraison
//                 </h2>
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label
//                         htmlFor="firstName"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Prénom *
//                       </label>
//                       <input
//                         type="text"
//                         id="firstName"
//                         value={shippingInfo.firstName}
//                         onChange={handleShippingInfoChange}
//                         className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                       />
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="lastName"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Nom de famille *
//                       </label>
//                       <input
//                         type="text"
//                         id="lastName"
//                         value={shippingInfo.lastName}
//                         onChange={handleShippingInfoChange}
//                         className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="address"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Address *
//                     </label>
//                     <input
//                       type="text"
//                       id="address"
//                       value={shippingInfo.address}
//                       onChange={handleShippingInfoChange}
//                       className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="phone"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Numéro de téléphone *
//                     </label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       value={shippingInfo.phone}
//                       maxLength={13}
//                       minLength={10}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         // Only allow digits, spaces, and + character
//                         const sanitizedValue = value.replace(/[^\d\s+]/g, "");

//                         setShippingInfo((prev) => ({
//                           ...prev,
//                           phone: sanitizedValue,
//                         }));

//                         // Validate phone number
//                         if (sanitizedValue.trim() === "") {
//                           setPhoneError("Le numéro de téléphone est requis");
//                         } else if (sanitizedValue.trim().length < 8) {
//                           setPhoneError(
//                             "Le numéro de téléphone doit contenir au moins 8 chiffres"
//                           );
//                         } else {
//                           setPhoneError("");
//                         }
//                       }}
//                       className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
//                         phoneError
//                           ? "border-red-500 focus:ring-red-500"
//                           : "focus:ring-black"
//                       }`}
//                       placeholder="+212 600 000 000"
//                     />
//                     {phoneError && (
//                       <p className="text-red-500 text-sm mt-1">{phoneError}</p>
//                     )}
//                   </div>
//                 </div>
//                 <button
//                   className={`w-full py-3 mt-6 ${
//                     isShippingFormValid()
//                       ? "bg-black text-white"
//                       : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   }`}
//                   onClick={() => isShippingFormValid() && setCurrentStep(4)}
//                   disabled={!isShippingFormValid()}
//                 >
//                   Continuer vers le paiement
//                 </button>
//               </>
//             )}

//             {currentStep === 4 && (
//               <>
//                 <h2 className="text-xl font-medium mb-6">Mode de paiement</h2>
//                 <div className="bg-gray-50 p-6 rounded-lg mb-6">
//                   <div className="flex items-center mb-4">
//                     <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
//                     <h3 className="text-lg font-medium">
//                       Paiement à la livraison
//                     </h3>
//                   </div>
//                   <p className="text-gray-600 mb-4">
//                     Payez en espèces à la livraison de votre commande à votre
//                     domicile.
//                   </p>
//                   <div className="border-t pt-4 mt-4">
//                     <div className="flex justify-between text-lg font-medium">
//                       <span>Total à payer:</span>
//                       <span>{totalAmount.toLocaleString()} MAD</span>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   onClick={generateInvoice}
//                   className="w-full flex justify-center items-center py-3 mb-4 border border-black text-black hover:bg-gray-100"
//                 >
//                   <Download className="h-5 w-5 mr-2" />
//                   Télécharger la facture
//                 </button>

//                 <div className="mb-6">
//                   <label className="flex items-start cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={agreeToTerms}
//                       onChange={() => setAgreeToTerms(!agreeToTerms)}
//                       className="mt-1 mr-2"
//                     />
//                     <span className="text-sm text-gray-600">
//                       J'accepte les termes et conditions, la politique de
//                       confidentialité et la politique de retour. Je comprends
//                       que mes données personnelles seront traitées comme décrit
//                       dans la politique de confidentialité.
//                     </span>
//                   </label>
//                 </div>

//                 <button
//                   className={`w-full py-3 ${
//                     agreeToTerms
//                       ? "bg-black text-white"
//                       : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   }`}
//                   onClick={handleCompleteOrder}
//                   disabled={!agreeToTerms}
//                 >
//                   Finaliser la commande
//                 </button>
//               </>
//             )}
//           </div>

//           <div className="lg:pl-8">
//             <div className="bg-gray-50 p-6 rounded">
//               <h3 className="text-lg font-medium mb-4">
//                 Votre commande ({processedProducts.length})
//               </h3>
//               <div className="space-y-4 mb-6">
//                 {processedProducts.map((product) => (
//                   <div key={product.id} className="flex gap-4">
//                     <Image
//                       src={product.imageUrl || "/placeholder.svg"}
//                       alt={product.name}
//                       width={80}
//                       height={80}
//                       className="rounded"
//                     />
//                     <div className="flex-1">
//                       <h4 className="font-medium">{product.name}</h4>
//                       <p className="text-sm text-gray-600">
//                         Quantité: {product.quantity}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Couleur: {product.color}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Taille: {product.size}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <span className="font-medium">
//                         {(product.price * product.quantity).toLocaleString()}{" "}
//                         MAD
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="border-t pt-4">
//                 <div className="flex justify-between mb-2">
//                   <span>Sous-total</span>
//                   <span>{totalAmount.toLocaleString()} MAD</span>
//                 </div>
//                 <div className="flex justify-between mb-4">
//                   <span>Livraison</span>
//                   <span>Gratuite</span>
//                 </div>
//                 <div className="flex justify-between font-medium">
//                   <span>Total</span>
//                   <span>{totalAmount.toLocaleString()} MAD</span>
//                 </div>
//               </div>

//               <div className="mt-6 space-y-4">
//                 <p className="text-sm">
//                   Rabat et environs : chaque Mercredi et Samedi | Casablanca :
//                   uniquement le Samedi
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Invoice Modal */}
//       {showInvoice && (
//         <Invoice
//           orderId={orderId}
//           items={processedProducts}
//           customerInfo={shippingInfo}
//           totalAmount={totalAmount}
//           onClose={() => {
//             setShowInvoice(false);
//             document.body.classList.remove("overflow-hidden");
//           }}
//         />
//       )}
//     </div>
//   );
// }

// "use client";

// import type React from "react";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ChevronLeft, Download, CheckCircle } from "lucide-react";
// import { useCart } from "@/app/contexts/CartContext";
// import { useRouter } from "next/navigation";
// import Invoice from "./Invoice";
// import type { CartItem } from "@/app/contexts/CartContext";
// import { toast } from "sonner";

// interface CheckoutFlowProps {
//   initialProducts: CartItem[];
//   totalAmount: number;
// }

// const steps = [
//   { id: 1, name: "Panier" },
//   { id: 2, name: "Détails" },
//   { id: 3, name: "Livraison" },
//   { id: 4, name: "Paiement" },
// ];

// export default function CheckoutFlow({
//   initialProducts,
//   totalAmount,
// }: CheckoutFlowProps) {
//   // Ensure all items have color and size properties
//   const processedProducts = initialProducts.map((item) => ({
//     ...item,
//     color: item.color || "Default",
//     size: item.size || "Universal",
//   }));

//   const [currentStep, setCurrentStep] = useState(2);
//   const [email, setEmail] = useState("");
//   const [isEmailValid, setIsEmailValid] = useState(false);
//   const [shippingInfo, setShippingInfo] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     phone: "",
//     email: "",
//   });
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [showInvoice, setShowInvoice] = useState(false);
//   const [orderId, setOrderId] = useState("");
//   const [isSending, setIsSending] = useState(false);
//   const { clearCart, generateOrderId } = useCart();
//   const router = useRouter();
//   const [phoneError, setPhoneError] = useState("");

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setEmail(value);
//     setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

//     // Update shipping info email as well
//     setShippingInfo((prev) => ({
//       ...prev,
//       email: value,
//     }));
//   };

//   const handleShippingInfoChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { id, value } = e.target;
//     setShippingInfo((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleContinue = () => {
//     if (isEmailValid) {
//       setCurrentStep(3);
//     }
//   };

//   const isShippingFormValid = () => {
//     return (
//       Object.values(shippingInfo).every((value) => value.trim() !== "") &&
//       !phoneError &&
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email)
//     );
//   };

//   // Updated to send invoice to your email
//   const handleCompleteOrder = async () => {
//     setIsSending(true);

//     try {
//       // Generate a new order ID
//       const newOrderId = generateOrderId();
//       setOrderId(newOrderId);

//       // Send invoice to your business email
//       await sendInvoiceToBusinessEmail(newOrderId);

//       // Show success message
//       toast.success("Commande reçue! Nous vous contacterons bientôt.");

//       // Redirect to success page
//       router.push("/checkout/success");
//     } catch (error) {
//       console.error("Error completing order:", error);
//       toast.error(
//         "Une erreur s'est produite lors de la finalisation de la commande."
//       );
//     } finally {
//       setIsSending(false);
//     }
//   };

//   // New function to send invoice to your business email
//   const sendInvoiceToBusinessEmail = async (invoiceOrderId: string) => {
//     try {
//       const response = await fetch("/api/send-invoice-to-business", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           orderId: invoiceOrderId,
//           items: processedProducts,
//           customerInfo: shippingInfo,
//           totalAmount: totalAmount,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to send invoice");
//       }

//       return true;
//     } catch (error) {
//       console.error("Error sending invoice:", error);
//       throw error;
//     }
//   };

//   const generateInvoice = () => {
//     // Generate a random order ID if not already set
//     const newOrderId =
//       orderId ||
//       Math.floor(Math.random() * 10000000)
//         .toString()
//         .padStart(7, "0");

//     if (!orderId) {
//       setOrderId(newOrderId);
//     }

//     // Show the invoice modal
//     setShowInvoice(true);

//     // Prevent scrolling on the body when modal is open
//     document.body.classList.add("overflow-hidden");
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-4">
//         <header className="py-20">
//           <div className="flex items-center justify-between mb-8">
//             <Link href="/basket" className="flex items-center text-sm">
//               <ChevronLeft className="h-4 w-4 mr-1" />
//               Retour au panier
//             </Link>
//             <div className="w-20" /> {/* Spacer for centering logo */}
//           </div>

//           <div className="flex justify-center">
//             {steps.map((step, index) => (
//               <div key={step.id} className="flex items-center">
//                 <div
//                   className={`flex items-center ${
//                     step.id <= currentStep ? "text-black" : "text-gray-400"
//                   }`}
//                 >
//                   <span className="mr-2">{step.id}</span>
//                   <span>{step.name}</span>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className="mx-4 h-px w-16 bg-gray-200" />
//                 )}
//               </div>
//             ))}
//           </div>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-16">
//           <div>
//             {currentStep === 2 && (
//               <>
//                 <h2 className="text-xl font-medium mb-6">
//                   Informations de livraison
//                 </h2>
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label
//                         htmlFor="firstName"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Prénom *
//                       </label>
//                       <input
//                         type="text"
//                         id="firstName"
//                         value={shippingInfo.firstName}
//                         onChange={handleShippingInfoChange}
//                         className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                       />
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="lastName"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Nom de famille *
//                       </label>
//                       <input
//                         type="text"
//                         id="lastName"
//                         value={shippingInfo.lastName}
//                         onChange={handleShippingInfoChange}
//                         className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Email *
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       value={shippingInfo.email}
//                       onChange={handleEmailChange}
//                       className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
//                         isEmailValid
//                           ? "focus:ring-green-500 border-green-500"
//                           : "focus:ring-black"
//                       }`}
//                       placeholder="votre@email.com"
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="address"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Address *
//                     </label>
//                     <input
//                       type="text"
//                       id="address"
//                       value={shippingInfo.address}
//                       onChange={handleShippingInfoChange}
//                       className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="phone"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Numéro de téléphone *
//                     </label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       value={shippingInfo.phone}
//                       maxLength={13}
//                       minLength={10}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         // Only allow digits, spaces, and + character
//                         const sanitizedValue = value.replace(/[^\d\s+]/g, "");

//                         setShippingInfo((prev) => ({
//                           ...prev,
//                           phone: sanitizedValue,
//                         }));

//                         // Validate phone number
//                         if (sanitizedValue.trim() === "") {
//                           setPhoneError("Le numéro de téléphone est requis");
//                         } else if (sanitizedValue.trim().length < 8) {
//                           setPhoneError(
//                             "Le numéro de téléphone doit contenir au moins 8 chiffres"
//                           );
//                         } else {
//                           setPhoneError("");
//                         }
//                       }}
//                       className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
//                         phoneError
//                           ? "border-red-500 focus:ring-red-500"
//                           : "focus:ring-black"
//                       }`}
//                       placeholder="+212 600 000 000"
//                     />
//                     {phoneError && (
//                       <p className="text-red-500 text-sm mt-1">{phoneError}</p>
//                     )}
//                   </div>
//                 </div>
//                 <button
//                   className={`w-full py-3 mt-6 ${
//                     isShippingFormValid()
//                       ? "bg-black text-white"
//                       : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   }`}
//                   onClick={() => isShippingFormValid() && setCurrentStep(4)}
//                   disabled={!isShippingFormValid()}
//                 >
//                   Continuer vers le paiement
//                 </button>
//               </>
//             )}

//             {currentStep === 4 && (
//               <>
//                 <h2 className="text-xl font-medium mb-6">Mode de paiement</h2>
//                 <div className="bg-gray-50 p-6 rounded-lg mb-6">
//                   <div className="flex items-center mb-4">
//                     <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
//                     <h3 className="text-lg font-medium">
//                       Paiement à la livraison
//                     </h3>
//                   </div>
//                   <p className="text-gray-600 mb-4">
//                     Payez en espèces à la livraison de votre commande à votre
//                     domicile.
//                   </p>
//                   <div className="border-t pt-4 mt-4">
//                     <div className="flex justify-between text-lg font-medium">
//                       <span>Total à payer:</span>
//                       <span>{totalAmount.toLocaleString()} MAD</span>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   onClick={generateInvoice}
//                   className="w-full flex justify-center items-center py-3 mb-4 border border-black text-black hover:bg-gray-100"
//                 >
//                   <Download className="h-5 w-5 mr-2" />
//                   Télécharger la facture
//                 </button>

//                 <div className="mb-6">
//                   <label className="flex items-start cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={agreeToTerms}
//                       onChange={() => setAgreeToTerms(!agreeToTerms)}
//                       className="mt-1 mr-2"
//                     />
//                     <span className="text-sm text-gray-600">
//                       J'accepte les termes et conditions, la politique de
//                       confidentialité et la politique de retour. Je comprends
//                       que mes données personnelles seront traitées comme décrit
//                       dans la politique de confidentialité.
//                     </span>
//                   </label>
//                 </div>

//                 <button
//                   className={`w-full py-3 ${
//                     agreeToTerms && !isSending
//                       ? "bg-black text-white"
//                       : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   }`}
//                   onClick={handleCompleteOrder}
//                   disabled={!agreeToTerms || isSending}
//                 >
//                   {isSending ? "Envoi en cours..." : "Finaliser la commande"}
//                 </button>
//               </>
//             )}
//           </div>

//           <div className="lg:pl-8">
//             <div className="bg-gray-50 p-6 rounded">
//               <h3 className="text-lg font-medium mb-4">
//                 Votre commande ({processedProducts.length})
//               </h3>
//               <div className="space-y-4 mb-6">
//                 {processedProducts.map((product) => (
//                   <div key={product.id} className="flex gap-4">
//                     <Image
//                       src={product.imageUrl || "/placeholder.svg"}
//                       alt={product.name}
//                       width={80}
//                       height={80}
//                       className="rounded"
//                     />
//                     <div className="flex-1">
//                       <h4 className="font-medium">{product.name}</h4>
//                       <p className="text-sm text-gray-600">
//                         Quantité: {product.quantity}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Couleur: {product.color}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Taille: {product.size}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <span className="font-medium">
//                         {(product.price * product.quantity).toLocaleString()}{" "}
//                         MAD
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="border-t pt-4">
//                 <div className="flex justify-between mb-2">
//                   <span>Sous-total</span>
//                   <span>{totalAmount.toLocaleString()} MAD</span>
//                 </div>
//                 <div className="flex justify-between mb-4">
//                   <span>Livraison</span>
//                   <span>Gratuite</span>
//                 </div>
//                 <div className="flex justify-between font-medium">
//                   <span>Total</span>
//                   <span>{totalAmount.toLocaleString()} MAD</span>
//                 </div>
//               </div>

//               <div className="mt-6 space-y-4">
//                 <p className="text-sm">
//                   Rabat et environs : chaque Mercredi et Samedi | Casablanca :
//                   uniquement le Samedi
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Invoice Modal */}
//       {showInvoice && (
//         <Invoice
//           orderId={orderId}
//           items={processedProducts}
//           customerInfo={shippingInfo}
//           totalAmount={totalAmount}
//           onClose={() => {
//             setShowInvoice(false);
//             document.body.classList.remove("overflow-hidden");
//           }}
//         />
//       )}
//     </div>
//   );
// }

// "use client";

// import type React from "react";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ChevronLeft, Download, CheckCircle } from "lucide-react";
// import { useCart } from "@/app/contexts/CartContext";
// import { useRouter } from "next/navigation";
// import Invoice from "./Invoice";
// import type { CartItem } from "@/app/contexts/CartContext";
// import { toast } from "sonner";

// interface CheckoutFlowProps {
//   initialProducts: CartItem[];
//   totalAmount: number;
// }

// const steps = [
//   { id: 1, name: "Panier" },
//   { id: 2, name: "Détails" },
//   { id: 3, name: "Livraison" },
//   { id: 4, name: "Paiement" },
// ];

// export default function CheckoutFlow({
//   initialProducts,
//   totalAmount,
// }: CheckoutFlowProps) {
//   // Ensure all items have color and size properties
//   const processedProducts = initialProducts.map((item) => ({
//     ...item,
//     color: item.color || "Default",
//     size: item.size || "Universal",
//   }));

//   const [currentStep, setCurrentStep] = useState(2);
//   const [email, setEmail] = useState("");
//   const [isEmailValid, setIsEmailValid] = useState(false);
//   // Update the shippingInfo state to make email optional
//   const [shippingInfo, setShippingInfo] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     phone: "",
//     email: "", // This will now be optional
//   });
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [showInvoice, setShowInvoice] = useState(false);
//   const [orderId, setOrderId] = useState("");
//   const [isSending, setIsSending] = useState(false);
//   const { clearCart, generateOrderId } = useCart();
//   const router = useRouter();
//   const [phoneError, setPhoneError] = useState("");

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setEmail(value);
//     setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

//     // Update shipping info email as well
//     setShippingInfo((prev) => ({
//       ...prev,
//       email: value,
//     }));
//   };

//   const handleShippingInfoChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { id, value } = e.target;
//     setShippingInfo((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleContinue = () => {
//     if (isEmailValid) {
//       setCurrentStep(3);
//     }
//   };

//   // Update the isShippingFormValid function to not require email
//   const isShippingFormValid = () => {
//     return (
//       shippingInfo.firstName.trim() !== "" &&
//       shippingInfo.lastName.trim() !== "" &&
//       shippingInfo.address.trim() !== "" &&
//       shippingInfo.phone.trim() !== "" &&
//       !phoneError
//     );
//   };

//   // Send invoice to business email only
//   const sendInvoiceToBusinessEmail = async (invoiceOrderId: string) => {
//     try {
//       // Send email to admin (business owner)
//       const response = await fetch("/api/send-invoice-to-business", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           orderId: invoiceOrderId,
//           items: processedProducts,
//           customerInfo: shippingInfo,
//           totalAmount: totalAmount,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to send invoice to admin");
//       }

//       return true;
//     } catch (error) {
//       console.error("Error processing order:", error);
//       throw error;
//     }
//   };

//   const generateInvoice = () => {
//     // Generate a random order ID if not already set
//     const newOrderId =
//       orderId ||
//       Math.floor(Math.random() * 10000000)
//         .toString()
//         .padStart(7, "0");

//     if (!orderId) {
//       setOrderId(newOrderId);
//     }

//     // Show the invoice modal
//     setShowInvoice(true);

//     // Prevent scrolling on the body when modal is open
//     document.body.classList.add("overflow-hidden");
//   };

//   const handleCompleteOrder = async () => {
//     setIsSending(true);
//     try {
//       const invoiceOrderId = generateOrderId();
//       setOrderId(invoiceOrderId);

//       // Send invoice to business email only
//       await sendInvoiceToBusinessEmail(invoiceOrderId);

//       // Show a success toast
//       toast.success("Commande effectuée avec succès !");

//       // Redirect to success page
//       router.push("/checkout/success");
//       // Clear the cart
//       // clearCart();
//     } catch (error: any) {
//       console.error("Error completing order:", error);
//       toast.error(
//         error.message ||
//           "Une erreur s'est produite lors de la finalisation de la commande."
//       );
//     } finally {
//       setIsSending(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-4">
//         <header className="py-20">
//           <div className="flex items-center justify-between mb-8">
//             <Link href="/basket" className="flex items-center text-sm">
//               <ChevronLeft className="h-4 w-4 mr-1" />
//               Retour au panier
//             </Link>
//             <div className="w-20" /> {/* Spacer for centering logo */}
//           </div>

//           <div className="flex justify-center">
//             {steps.map((step, index) => (
//               <div key={step.id} className="flex items-center">
//                 <div
//                   className={`flex items-center ${
//                     step.id <= currentStep ? "text-black" : "text-gray-400"
//                   }`}
//                 >
//                   <span className="mr-2">{step.id}</span>
//                   <span>{step.name}</span>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className="mx-4 h-px w-16 bg-gray-200" />
//                 )}
//               </div>
//             ))}
//           </div>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-16">
//           <div>
//             {currentStep === 2 && (
//               <>
//                 <h2 className="text-xl font-medium mb-6">
//                   Informations de livraison
//                 </h2>
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label
//                         htmlFor="firstName"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Prénom *
//                       </label>
//                       <input
//                         type="text"
//                         id="firstName"
//                         value={shippingInfo.firstName}
//                         onChange={handleShippingInfoChange}
//                         className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                       />
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="lastName"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Nom de famille *
//                       </label>
//                       <input
//                         type="text"
//                         id="lastName"
//                         value={shippingInfo.lastName}
//                         onChange={handleShippingInfoChange}
//                         className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Email (Optionnel)
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       value={shippingInfo.email}
//                       onChange={handleEmailChange}
//                       className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
//                         isEmailValid
//                           ? "focus:ring-green-500 border-green-500"
//                           : "focus:ring-black"
//                       }`}
//                       placeholder="votre@email.com (optionnel)"
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="address"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Address *
//                     </label>
//                     <input
//                       type="text"
//                       id="address"
//                       value={shippingInfo.address}
//                       onChange={handleShippingInfoChange}
//                       className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="phone"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Numéro de téléphone *
//                     </label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       value={shippingInfo.phone}
//                       maxLength={13}
//                       minLength={10}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         // Only allow digits, spaces, and + character
//                         const sanitizedValue = value.replace(/[^\d\s+]/g, "");

//                         setShippingInfo((prev) => ({
//                           ...prev,
//                           phone: sanitizedValue,
//                         }));

//                         // Validate phone number
//                         if (sanitizedValue.trim() === "") {
//                           setPhoneError("Le numéro de téléphone est requis");
//                         } else if (sanitizedValue.trim().length < 8) {
//                           setPhoneError(
//                             "Le numéro de téléphone doit contenir au moins 8 chiffres"
//                           );
//                         } else {
//                           setPhoneError("");
//                         }
//                       }}
//                       className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
//                         phoneError
//                           ? "border-red-500 focus:ring-red-500"
//                           : "focus:ring-black"
//                       }`}
//                       placeholder="+212 600 000 000"
//                     />
//                     {phoneError && (
//                       <p className="text-red-500 text-sm mt-1">{phoneError}</p>
//                     )}
//                   </div>
//                 </div>
//                 <button
//                   className={`w-full py-3 mt-6 ${
//                     isShippingFormValid()
//                       ? "bg-black text-white"
//                       : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   }`}
//                   onClick={() => isShippingFormValid() && setCurrentStep(4)}
//                   disabled={!isShippingFormValid()}
//                 >
//                   Continuer vers le paiement
//                 </button>
//               </>
//             )}

//             {currentStep === 4 && (
//               <>
//                 <h2 className="text-xl font-medium mb-6">Mode de paiement</h2>
//                 <div className="bg-gray-50 p-6 rounded-lg mb-6">
//                   <div className="flex items-center mb-4">
//                     <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
//                     <h3 className="text-lg font-medium">
//                       Paiement à la livraison
//                     </h3>
//                   </div>
//                   <p className="text-gray-600 mb-4">
//                     Payez en espèces à la livraison de votre commande à votre
//                     domicile.
//                   </p>
//                   <div className="border-t pt-4 mt-4">
//                     <div className="flex justify-between text-lg font-medium">
//                       <span>Total à payer:</span>
//                       <span>{totalAmount.toLocaleString()} MAD</span>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   onClick={generateInvoice}
//                   className="w-full flex justify-center items-center py-3 mb-4 border border-black text-black hover:bg-gray-100"
//                 >
//                   <Download className="h-5 w-5 mr-2" />
//                   Télécharger la facture
//                 </button>

//                 <div className="mb-6">
//                   <label className="flex items-start cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={agreeToTerms}
//                       onChange={() => setAgreeToTerms(!agreeToTerms)}
//                       className="mt-1 mr-2"
//                     />
//                     <span className="text-sm text-gray-600">
//                       J'accepte les termes et conditions, la politique de
//                       confidentialité et la politique de retour. Je comprends
//                       que mes données personnelles seront traitées comme décrit
//                       dans la politique de confidentialité.
//                     </span>
//                   </label>
//                 </div>

//                 <button
//                   className={`w-full py-3 ${
//                     agreeToTerms && !isSending
//                       ? "bg-black text-white"
//                       : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   }`}
//                   onClick={handleCompleteOrder}
//                   disabled={!agreeToTerms || isSending}
//                 >
//                   {isSending ? "Envoi en cours..." : "Finaliser la commande"}
//                 </button>
//               </>
//             )}
//           </div>

//           <div className="lg:pl-8">
//             <div className="bg-gray-50 p-6 rounded">
//               <h3 className="text-lg font-medium mb-4">
//                 Votre commande ({processedProducts.length})
//               </h3>
//               <div className="space-y-4 mb-6">
//                 {processedProducts.map((product) => (
//                   <div key={product.id} className="flex gap-4">
//                     <Image
//                       src={product.imageUrl || "/placeholder.svg"}
//                       alt={product.name}
//                       width={80}
//                       height={80}
//                       className="rounded"
//                     />
//                     <div className="flex-1">
//                       <h4 className="font-medium">{product.name}</h4>
//                       <p className="text-sm text-gray-600">
//                         Quantité: {product.quantity}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Couleur: {product.color}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Taille: {product.size}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <span className="font-medium">
//                         {(product.price * product.quantity).toLocaleString()}{" "}
//                         MAD
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="border-t pt-4">
//                 <div className="flex justify-between mb-2">
//                   <span>Sous-total</span>
//                   <span>{totalAmount.toLocaleString()} MAD</span>
//                 </div>
//                 <div className="flex justify-between mb-4">
//                   <span>Livraison</span>
//                   <span>Gratuite</span>
//                 </div>
//                 <div className="flex justify-between font-medium">
//                   <span>Total</span>
//                   <span>{totalAmount.toLocaleString()} MAD</span>
//                 </div>
//               </div>

//               <div className="mt-6 space-y-4">
//                 <p className="text-sm">
//                   Rabat et environs : chaque Mercredi et Samedi | Casablanca :
//                   uniquement le Samedi
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Invoice Modal */}
//       {showInvoice && (
//         <Invoice
//           orderId={orderId}
//           items={processedProducts}
//           customerInfo={shippingInfo}
//           totalAmount={totalAmount}
//           onClose={() => {
//             setShowInvoice(false);
//             document.body.classList.remove("overflow-hidden");
//           }}
//         />
//       )}
//     </div>
//   );
// }

// "use client";

// import type React from "react";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ChevronLeft, Download, CheckCircle } from "lucide-react";
// import { useCart } from "@/app/contexts/CartContext";
// import { useRouter } from "next/navigation";
// import Invoice from "./Invoice";
// import type { CartItem } from "@/app/contexts/CartContext";
// import { toast } from "sonner";

// interface CheckoutFlowProps {
//   initialProducts: CartItem[];
//   totalAmount: number;
// }

// const steps = [
//   { id: 1, name: "Panier" },
//   { id: 2, name: "Détails" },
//   { id: 3, name: "Livraison" },
//   { id: 4, name: "Paiement" },
// ];

// export default function CheckoutFlow({
//   initialProducts,
//   totalAmount,
// }: CheckoutFlowProps) {
//   // Ensure all items have color and size properties
//   const processedProducts = initialProducts.map((item) => ({
//     ...item,
//     color: item.color || "Default",
//     size: item.size || "Universal",
//   }));

//   const [currentStep, setCurrentStep] = useState(2);
//   const [email, setEmail] = useState("");
//   const [isEmailValid, setIsEmailValid] = useState(false);
//   // Update the shippingInfo state to make email optional
//   const [shippingInfo, setShippingInfo] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     phone: "",
//     email: "", // This will now be optional
//   });
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [showInvoice, setShowInvoice] = useState(false);
//   const [orderId, setOrderId] = useState("");
//   const [isSending, setIsSending] = useState(false);
//   const { clearCart, generateOrderId } = useCart();
//   const router = useRouter();
//   const [phoneError, setPhoneError] = useState("");

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setEmail(value);
//     setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

//     // Update shipping info email as well
//     setShippingInfo((prev) => ({
//       ...prev,
//       email: value,
//     }));
//   };

//   const handleShippingInfoChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { id, value } = e.target;
//     setShippingInfo((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleContinue = () => {
//     if (isEmailValid) {
//       setCurrentStep(3);
//     }
//   };

//   // Update the isShippingFormValid function to not require email
//   const isShippingFormValid = () => {
//     return (
//       shippingInfo.firstName.trim() !== "" &&
//       shippingInfo.lastName.trim() !== "" &&
//       shippingInfo.address.trim() !== "" &&
//       shippingInfo.phone.trim() !== "" &&
//       !phoneError
//     );
//   };

//   // Send invoice to business email only
//   const sendInvoiceToBusinessEmail = async (invoiceOrderId: string) => {
//     try {
//       // Send email to admin (business owner)
//       const response = await fetch("/api/send-invoice-to-business", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           orderId: invoiceOrderId,
//           items: processedProducts,
//           customerInfo: shippingInfo,
//           totalAmount: totalAmount,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to send invoice to admin");
//       }

//       return true;
//     } catch (error) {
//       console.error("Error processing order:", error);
//       throw error;
//     }
//   };

//   const generateInvoice = () => {
//     // Generate a random order ID if not already set
//     const newOrderId =
//       orderId ||
//       Math.floor(Math.random() * 10000000)
//         .toString()
//         .padStart(7, "0");

//     if (!orderId) {
//       setOrderId(newOrderId);
//     }

//     // Show the invoice modal
//     setShowInvoice(true);

//     // Prevent scrolling on the body when modal is open
//     document.body.classList.add("overflow-hidden");
//   };

//   const handleCompleteOrder = async () => {
//     setIsSending(true);
//     try {
//       const invoiceOrderId = generateOrderId();
//       setOrderId(invoiceOrderId);

//       // Send invoice to business email only
//       await sendInvoiceToBusinessEmail(invoiceOrderId);

//       // Show a success toast
//       toast.success("Commande effectuée avec succès !");

//       // Redirect to success page
//       router.push("/checkout/success");
//     } catch (error: any) {
//       console.error("Error completing order:", error);
//       toast.error(
//         error.message ||
//           "Une erreur s'est produite lors de la finalisation de la commande."
//       );
//     } finally {
//       setIsSending(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-4">
//         <header className="py-20">
//           <div className="flex items-center justify-between mb-8">
//             <Link href="/basket" className="flex items-center text-sm">
//               <ChevronLeft className="h-4 w-4 mr-1" />
//               Retour au panier
//             </Link>
//             <div className="w-20" /> {/* Spacer for centering logo */}
//           </div>

//           <div className="flex justify-center">
//             {steps.map((step, index) => (
//               <div key={step.id} className="flex items-center">
//                 <div
//                   className={`flex items-center ${
//                     step.id <= currentStep ? "text-black" : "text-gray-400"
//                   }`}
//                 >
//                   <span className="mr-2">{step.id}</span>
//                   <span>{step.name}</span>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className="mx-4 h-px w-16 bg-gray-200" />
//                 )}
//               </div>
//             ))}
//           </div>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-16">
//           <div>
//             {currentStep === 2 && (
//               <>
//                 <h2 className="text-xl font-medium mb-6">
//                   Informations de livraison
//                 </h2>
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label
//                         htmlFor="firstName"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Prénom *
//                       </label>
//                       <input
//                         type="text"
//                         id="firstName"
//                         value={shippingInfo.firstName}
//                         onChange={handleShippingInfoChange}
//                         className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                       />
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="lastName"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Nom de famille *
//                       </label>
//                       <input
//                         type="text"
//                         id="lastName"
//                         value={shippingInfo.lastName}
//                         onChange={handleShippingInfoChange}
//                         className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Email (Optionnel)
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       value={shippingInfo.email}
//                       onChange={handleEmailChange}
//                       className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
//                         isEmailValid
//                           ? "focus:ring-green-500 border-green-500"
//                           : "focus:ring-black"
//                       }`}
//                       placeholder="votre@email.com (optionnel)"
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="address"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Address *
//                     </label>
//                     <input
//                       type="text"
//                       id="address"
//                       value={shippingInfo.address}
//                       onChange={handleShippingInfoChange}
//                       className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="phone"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Numéro de téléphone *
//                     </label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       value={shippingInfo.phone}
//                       maxLength={13}
//                       minLength={10}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         // Only allow digits, spaces, and + character
//                         const sanitizedValue = value.replace(/[^\d\s+]/g, "");

//                         setShippingInfo((prev) => ({
//                           ...prev,
//                           phone: sanitizedValue,
//                         }));

//                         // Validate phone number
//                         if (sanitizedValue.trim() === "") {
//                           setPhoneError("Le numéro de téléphone est requis");
//                         } else if (sanitizedValue.trim().length < 8) {
//                           setPhoneError(
//                             "Le numéro de téléphone doit contenir au moins 8 chiffres"
//                           );
//                         } else {
//                           setPhoneError("");
//                         }
//                       }}
//                       className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
//                         phoneError
//                           ? "border-red-500 focus:ring-red-500"
//                           : "focus:ring-black"
//                       }`}
//                       placeholder="+212 600 000 000"
//                     />
//                     {phoneError && (
//                       <p className="text-red-500 text-sm mt-1">{phoneError}</p>
//                     )}
//                   </div>
//                 </div>
//                 <button
//                   className={`w-full py-3 mt-6 ${
//                     isShippingFormValid()
//                       ? "bg-black text-white"
//                       : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   }`}
//                   onClick={() => isShippingFormValid() && setCurrentStep(4)}
//                   disabled={!isShippingFormValid()}
//                 >
//                   Continuer vers le paiement
//                 </button>
//               </>
//             )}

//             {currentStep === 4 && (
//               <>
//                 <h2 className="text-xl font-medium mb-6">Mode de paiement</h2>
//                 <div className="bg-gray-50 p-6 rounded-lg mb-6">
//                   <div className="flex items-center mb-4">
//                     <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
//                     <h3 className="text-lg font-medium">
//                       Paiement à la livraison
//                     </h3>
//                   </div>
//                   <p className="text-gray-600 mb-4">
//                     Payez en espèces à la livraison de votre commande à votre
//                     domicile.
//                   </p>
//                   <div className="border-t pt-4 mt-4">
//                     <div className="flex justify-between text-lg font-medium">
//                       <span>Total à payer:</span>
//                       <span>{totalAmount.toLocaleString()} MAD</span>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   onClick={generateInvoice}
//                   className="w-full flex justify-center items-center py-3 mb-4 border border-black text-black hover:bg-gray-100"
//                 >
//                   <Download className="h-5 w-5 mr-2" />
//                   Télécharger la facture
//                 </button>

//                 <div className="mb-6">
//                   <label className="flex items-start cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={agreeToTerms}
//                       onChange={() => setAgreeToTerms(!agreeToTerms)}
//                       className="mt-1 mr-2"
//                     />
//                     <span className="text-sm text-gray-600">
//                       J'accepte les termes et conditions, la politique de
//                       confidentialité et la politique de retour. Je comprends
//                       que mes données personnelles seront traitées comme décrit
//                       dans la politique de confidentialité.
//                     </span>
//                   </label>
//                 </div>

//                 <button
//                   className={`w-full py-3 ${
//                     agreeToTerms && !isSending
//                       ? "bg-black text-white"
//                       : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   }`}
//                   onClick={handleCompleteOrder}
//                   disabled={!agreeToTerms || isSending}
//                 >
//                   {isSending ? "Envoi en cours..." : "Finaliser la commande"}
//                 </button>
//               </>
//             )}
//           </div>

//           <div className="lg:pl-8">
//             <div className="bg-gray-50 p-6 rounded">
//               <h3 className="text-lg font-medium mb-4">
//                 Votre commande ({processedProducts.length})
//               </h3>
//               <div className="space-y-4 mb-6">
//                 {processedProducts.map((product) => (
//                   <div key={product.id} className="flex gap-4">
//                     <Image
//                       src={product.imageUrl || "/placeholder.svg"}
//                       alt={product.name}
//                       width={80}
//                       height={80}
//                       className="rounded"
//                     />
//                     <div className="flex-1">
//                       <h4 className="font-medium">{product.name}</h4>
//                       <p className="text-sm text-gray-600">
//                         Quantité: {product.quantity}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Couleur: {product.color}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Taille: {product.size}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <span className="font-medium">
//                         {(product.price * product.quantity).toLocaleString()}{" "}
//                         MAD
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="border-t pt-4">
//                 <div className="flex justify-between mb-2">
//                   <span>Sous-total</span>
//                   <span>{totalAmount.toLocaleString()} MAD</span>
//                 </div>
//                 <div className="flex justify-between mb-4">
//                   <span>Livraison</span>
//                   <span>Gratuite</span>
//                 </div>
//                 <div className="flex justify-between font-medium">
//                   <span>Total</span>
//                   <span>{totalAmount.toLocaleString()} MAD</span>
//                 </div>
//               </div>

//               <div className="mt-6 space-y-4">
//                 <p className="text-sm">
//                   Rabat et environs : chaque Mercredi et Samedi | Casablanca :
//                   uniquement le Samedi
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Invoice Modal */}
//       {showInvoice && (
//         <Invoice
//           orderId={orderId}
//           items={processedProducts}
//           customerInfo={shippingInfo}
//           totalAmount={totalAmount}
//           onClose={() => {
//             setShowInvoice(false);
//             document.body.classList.remove("overflow-hidden");
//           }}
//         />
//       )}
//     </div>
//   );
// }
"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Download, CheckCircle } from "lucide-react";
import { useCart } from "@/app/contexts/CartContext";
import { useRouter } from "next/navigation";
import Invoice from "./Invoice";
import type { CartItem } from "@/app/contexts/CartContext";
import { toast } from "sonner";

interface CheckoutFlowProps {
  initialProducts: CartItem[];
  totalAmount: number;
}

const steps = [
  { id: 1, name: "Panier" },
  { id: 2, name: "Détails" },
  { id: 3, name: "Livraison" },
  { id: 4, name: "Paiement" },
];

export default function CheckoutFlow({
  initialProducts,
  totalAmount,
}: CheckoutFlowProps) {
  // Ensure all items have color and size properties
  const processedProducts = initialProducts.map((item) => ({
    ...item,
    color: item.color || "Default",
    size: item.size || "Universal",
  }));

  const [currentStep, setCurrentStep] = useState(2);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  // Update the shippingInfo state to make email optional
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "", // This will now be optional
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { clearCart, generateOrderId, setOrderIdInContext } = useCart();
  const router = useRouter();
  const [phoneError, setPhoneError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

    // Update shipping info email as well
    setShippingInfo((prev) => ({
      ...prev,
      email: value,
    }));
  };

  const handleShippingInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleContinue = () => {
    if (isEmailValid) {
      setCurrentStep(3);
    }
  };

  // Update the isShippingFormValid function to not require email
  const isShippingFormValid = () => {
    return (
      shippingInfo.firstName.trim() !== "" &&
      shippingInfo.lastName.trim() !== "" &&
      shippingInfo.address.trim() !== "" &&
      shippingInfo.phone.trim() !== "" &&
      !phoneError
    );
  };

  // Send invoice to business email only
  const sendInvoiceToBusinessEmail = async (invoiceOrderId: string) => {
    try {
      // Send email to admin (business owner)
      const response = await fetch("/api/send-invoice-to-business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: invoiceOrderId,
          items: processedProducts,
          customerInfo: shippingInfo,
          totalAmount: totalAmount,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send invoice to admin");
      }

      return true;
    } catch (error) {
      console.error("Error processing order:", error);
      throw error;
    }
  };

  const generateInvoice = () => {
    // Generate a random order ID if not already set
    const newOrderId =
      orderId ||
      Math.floor(Math.random() * 10000000)
        .toString()
        .padStart(7, "0");

    if (!orderId) {
      setOrderId(newOrderId);
    }

    // Show the invoice modal
    setShowInvoice(true);

    // Prevent scrolling on the body when modal is open
    document.body.classList.add("overflow-hidden");
  };

  const handleCompleteOrder = async () => {
    setIsSending(true);
    try {
      // Generate order ID only if we don't already have one
      const invoiceOrderId = orderId || generateOrderId();
      setOrderId(invoiceOrderId);

      // Important: Update the order ID in the context so it's available on the success page
      setOrderIdInContext(invoiceOrderId);

      // Send invoice to business email only
      await sendInvoiceToBusinessEmail(invoiceOrderId);

      // Show a success toast
      toast.success("Commande effectuée avec succès !");

      // Redirect to success page
      router.push("/checkout/success");
    } catch (error: any) {
      console.error("Error completing order:", error);
      toast.error(
        error.message ||
          "Une erreur s'est produite lors de la finalisation de la commande."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <header className="py-20">
          <div className="flex items-center justify-between mb-8">
            <Link href="/basket" className="flex items-center text-sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Retour au panier
            </Link>
            <div className="w-20" /> {/* Spacer for centering logo */}
          </div>

          <div className="flex justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center ${
                    step.id <= currentStep ? "text-black" : "text-gray-400"
                  }`}
                >
                  <span className="mr-2">{step.id}</span>
                  <span>{step.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="mx-4 h-px w-16 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-16">
          <div>
            {currentStep === 2 && (
              <>
                <h2 className="text-xl font-medium mb-6">
                  Informations de livraison
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Prénom *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleShippingInfoChange}
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Nom de famille *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleShippingInfoChange}
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email (Optionnel)
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={shippingInfo.email}
                      onChange={handleEmailChange}
                      className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
                        isEmailValid
                          ? "focus:ring-green-500 border-green-500"
                          : "focus:ring-black"
                      }`}
                      placeholder="votre@email.com (optionnel)"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      value={shippingInfo.address}
                      onChange={handleShippingInfoChange}
                      className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Numéro de téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={shippingInfo.phone}
                      maxLength={13}
                      minLength={10}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Only allow digits, spaces, and + character
                        const sanitizedValue = value.replace(/[^\d\s+]/g, "");

                        setShippingInfo((prev) => ({
                          ...prev,
                          phone: sanitizedValue,
                        }));

                        // Validate phone number
                        if (sanitizedValue.trim() === "") {
                          setPhoneError("Le numéro de téléphone est requis");
                        } else if (sanitizedValue.trim().length < 8) {
                          setPhoneError(
                            "Le numéro de téléphone doit contenir au moins 8 chiffres"
                          );
                        } else {
                          setPhoneError("");
                        }
                      }}
                      className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
                        phoneError
                          ? "border-red-500 focus:ring-red-500"
                          : "focus:ring-black"
                      }`}
                      placeholder="+212 600 000 000"
                    />
                    {phoneError && (
                      <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                    )}
                  </div>
                </div>
                <button
                  className={`w-full py-3 mt-6 ${
                    isShippingFormValid()
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={() => isShippingFormValid() && setCurrentStep(4)}
                  disabled={!isShippingFormValid()}
                >
                  Continuer vers le paiement
                </button>
              </>
            )}

            {currentStep === 4 && (
              <>
                <h2 className="text-xl font-medium mb-6">Mode de paiement</h2>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                    <h3 className="text-lg font-medium">
                      Paiement à la livraison
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Payez en espèces à la livraison de votre commande à votre
                    domicile.
                  </p>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between text-lg font-medium">
                      <span>Total à payer:</span>
                      <span>{totalAmount.toLocaleString()} MAD</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={generateInvoice}
                  className="w-full flex justify-center items-center py-3 mb-4 border border-black text-black hover:bg-gray-100"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Télécharger la facture
                </button>

                <div className="mb-6">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={() => setAgreeToTerms(!agreeToTerms)}
                      className="mt-1 mr-2"
                    />
                    <span className="text-sm text-gray-600">
                      J'accepte les termes et conditions, la politique de
                      confidentialité et la politique de retour. Je comprends
                      que mes données personnelles seront traitées comme décrit
                      dans la politique de confidentialité.
                    </span>
                  </label>
                </div>

                <button
                  className={`w-full py-3 ${
                    agreeToTerms && !isSending
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={handleCompleteOrder}
                  disabled={!agreeToTerms || isSending}
                >
                  {isSending ? "Envoi en cours..." : "Finaliser la commande"}
                </button>
              </>
            )}
          </div>

          <div className="lg:pl-8">
            <div className="bg-gray-50 p-6 rounded">
              <h3 className="text-lg font-medium mb-4">
                Votre commande ({processedProducts.length})
              </h3>
              <div className="space-y-4 mb-6">
                {processedProducts.map((product) => (
                  <div key={product.id} className="flex gap-4">
                    <Image
                      src={product.imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-gray-600">
                        Quantité: {product.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Couleur: {product.color}
                      </p>
                      <p className="text-sm text-gray-600">
                        Taille: {product.size}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">
                        {(product.price * product.quantity).toLocaleString()}{" "}
                        MAD
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Sous-total</span>
                  <span>{totalAmount.toLocaleString()} MAD</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Livraison</span>
                  <span>Gratuite</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{totalAmount.toLocaleString()} MAD</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <p className="text-sm">
                  Rabat et environs : chaque Mercredi et Samedi | Casablanca :
                  uniquement le Samedi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoice && (
        <Invoice
          orderId={orderId}
          items={processedProducts}
          customerInfo={shippingInfo}
          totalAmount={totalAmount}
          onClose={() => {
            setShowInvoice(false);
            document.body.classList.remove("overflow-hidden");
          }}
        />
      )}
    </div>
  );
}

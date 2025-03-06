"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Download, CheckCircle } from "lucide-react";
import { useCart } from "@/app/contexts/CartContext";
import { useRouter } from "next/navigation";

interface CheckoutFlowProps {
  initialProducts: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }>;
  totalAmount: number;
}

const steps = [
  { id: 1, name: "Basket" },
  { id: 2, name: "Details" },
  { id: 3, name: "Shipping" },
  { id: 4, name: "Payment" },
];

export default function CheckoutFlow({
  initialProducts,
  totalAmount,
}: CheckoutFlowProps) {
  const [currentStep, setCurrentStep] = useState(2);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    // postalCode: "",
    // country: "",
    phone: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { clearCart } = useCart();
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
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

  const isShippingFormValid = () => {
    return Object.values(shippingInfo).every((value) => value.trim() !== "");
  };

  const handleCompleteOrder = () => {
    // In a real application, you would process the order here
    // For now, we'll just clear the cart and redirect to the success page
    router.push("/checkout/success");
  };

  const generateInvoicePDF = () => {
    // In a real application, this would generate a PDF invoice
    // For this example, we'll create a simple text representation
    let invoiceContent = "INVOICE\n\n";
    invoiceContent += `Date: ${new Date().toLocaleDateString()}\n`;
    invoiceContent += `Order #: ORD-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}\n\n`;

    invoiceContent += "CUSTOMER INFORMATION\n";
    invoiceContent += `${shippingInfo.firstName} ${shippingInfo.lastName}\n`;
    invoiceContent += `${shippingInfo.address}\n`;
    invoiceContent += `${shippingInfo.city}, ${shippingInfo.postalCode}\n`;
    // invoiceContent += `${shippingInfo.country}\n`;
    invoiceContent += `${shippingInfo.phone}\n`;
    invoiceContent += `${email}\n\n`;

    invoiceContent += "ITEMS\n";
    initialProducts.forEach((product) => {
      invoiceContent += `${product.name} x ${product.quantity} - $${(
        product.price * product.quantity
      ).toLocaleString()}\n`;
    });

    invoiceContent += `\nSubtotal: $${totalAmount.toLocaleString()}\n`;
    invoiceContent += "Tax & duty: Included\n";
    invoiceContent += "Shipping: Free\n";
    invoiceContent += `TOTAL: $${totalAmount.toLocaleString()}\n\n`;

    invoiceContent += "PAYMENT METHOD\n";
    invoiceContent += "Cash on Delivery\n\n";

    invoiceContent += "Thank you for your order!";

    // Create a Blob with the invoice content
    const blob = new Blob([invoiceContent], { type: "text/plain" });

    // Create a download link and trigger the download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <header className="py-8">
          <div className="flex items-center justify-between mb-8">
            <Link href="/basket" className="flex items-center text-sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Basket
            </Link>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-16%20at%2013.59.53-znxDQTZ0oCtklmta5tSOpxxbJnj1cS.png"
              alt="LOEWE"
              width={120}
              height={40}
              className="mx-auto"
            />
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
            {currentStep === 5 && (
              <>
                <h2 className="text-xl font-medium mb-6">Enter your email</h2>
                <p className="text-sm text-gray-600 mb-6">
                  If you have an account, you will be asked to sign in.
                  Otherwise, you can continue as a guest and register after
                  checkout.
                </p>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
                    isEmailValid
                      ? "focus:ring-green-500 border-green-500"
                      : "focus:ring-black"
                  }`}
                />
                <button
                  className={`w-full py-3 mt-6 ${
                    isEmailValid
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={handleContinue}
                  disabled={!isEmailValid}
                >
                  Continue
                </button>
              </>
            )}

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
                        Prénom
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
                        Nom de famille
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
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      value={shippingInfo.address}
                      onChange={handleShippingInfoChange}
                      className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Ville
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={shippingInfo.city}
                        onChange={handleShippingInfoChange}
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    {/* <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Postal Code
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={handleShippingInfoChange}
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div> */}
                  </div>
                  {/* <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      value={shippingInfo.country}
                      onChange={handleShippingInfoChange}
                      className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="AE">United Arab Emirates</option>
                    </select>
                  </div> */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Numéro de téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingInfoChange}
                      className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
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
                  Continue to Payment
                </button>
              </>
            )}

            {currentStep === 4 && (
              <>
                <h2 className="text-xl font-medium mb-6">Payment Method</h2>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                    <h3 className="text-lg font-medium">Cash on Delivery</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Pay with cash when your order is delivered to your doorstep.
                  </p>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between text-lg font-medium">
                      <span>Total to Pay:</span>
                      <span>{totalAmount.toLocaleString()} MAD</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={generateInvoicePDF}
                  className="w-full flex justify-center items-center py-3 mb-4 border border-black text-black hover:bg-gray-100"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Invoice
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
                      I agree to the terms and conditions, privacy policy, and
                      return policy. I understand that my personal data will be
                      processed as described in the privacy policy.
                    </span>
                  </label>
                </div>

                <button
                  className={`w-full py-3 ${
                    agreeToTerms
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={handleCompleteOrder}
                  disabled={!agreeToTerms}
                >
                  Complete Order
                </button>
              </>
            )}
          </div>

          <div className="lg:pl-8">
            <div className="bg-gray-50 p-6 rounded">
              <h3 className="text-lg font-medium mb-4">
                Your order ({initialProducts.length})
              </h3>
              <div className="space-y-4 mb-6">
                {initialProducts.map((product) => (
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
                        Quantity: {product.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">
                        {(product.price * product.quantity).toLocaleString()}MAD
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>{totalAmount.toLocaleString()}MAD</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax & duty</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{totalAmount.toLocaleString()}MAD</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-16%20at%2013.59.14-3OOfluGiDPbF1IEfxBNU5Og5vNxc8U.png"
                    alt="Shipping"
                    width={24}
                    height={24}
                  />
                  <span className="text-sm">Free shipping and returns</span>
                </div>
                <p className="text-sm">
                  Shipping 2-7 business days | Free online returns 14 days |
                  Free exchange in store 30 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

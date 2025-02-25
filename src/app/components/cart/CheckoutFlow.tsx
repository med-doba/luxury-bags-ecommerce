"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

const steps = [
  { id: 1, name: "Basket" },
  { id: 2, name: "Details" },
  { id: 3, name: "Shipping" },
  { id: 4, name: "Payment" },
]

export default function CheckoutFlow() {
  const [currentStep, setCurrentStep] = useState(2)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <header className="py-8">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center text-sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
            <Image
              src="/classic-tote.jpg"
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
                <div className={`flex items-center ${step.id <= currentStep ? "text-black" : "text-gray-400"}`}>
                  <span className="mr-2">{step.id}</span>
                  <span>{step.name}</span>
                </div>
                {index < steps.length - 1 && <div className="mx-4 h-px w-16 bg-gray-200" />}
              </div>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-16">
          <div>
            <h2 className="text-xl font-medium mb-6">Enter your email</h2>
            <p className="text-sm text-gray-600 mb-6">
              If you have an account, you will be asked to sign in. Otherwise, you can continue as a guest and register
              after checkout.
            </p>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="w-full bg-black text-white py-3 mt-6">Continue</button>
          </div>

          <div className="lg:pl-8">
            <div className="bg-gray-50 p-6 rounded">
              <h3 className="text-lg font-medium mb-4">Your order (2)</h3>
              <div className="space-y-4 mb-6">
                {/* Order summary items */}
                <div className="flex gap-4">
                  <Image
                    // src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-16%20at%2013.58.40-3IaX3xNkDHJ1ES52bl0zUX1NTlbytr.png"
                    src="/classic-tote.jpg"
                    alt="Product"
                    width={80}
                    height={80}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">Medium Flamenco purse in mellow nappa lambskin</h4>
                    <p className="text-sm text-gray-600">Colour: Dark Burgundy</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">37,100.00د.إ</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>74,200.00د.إ</span>
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
                  <span>74,200.00د.إ</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Image
                    // src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-16%20at%2013.59.14-3OOfluGiDPbF1IEfxBNU5Og5vNxc8U.png"
                    src="/classic-tote.jpg"
                    alt="Shipping"
                    width={24}
                    height={24}
                  />
                  <span className="text-sm">Free shipping and returns</span>
                </div>
                <p className="text-sm">
                  Shipping 2-7 business days | Free online returns 14 days | Free exchange in store 30 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


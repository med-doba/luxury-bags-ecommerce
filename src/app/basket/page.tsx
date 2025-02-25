import Image from "next/image"
import { Minus, Plus, Bookmark } from "lucide-react"

export default function BasketPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium mb-8">Basket · 2</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">


          
          {/* Product items */}
          <div className="border-b pb-6">
            <div className="flex gap-4">
              <Image
                src="/classic-tote.jpg"
                alt="Product"
                width={120}
                height={120}
                className="rounded"
              />
              <div className="flex-1">
                <h2 className="font-medium">Medium Flamenco purse in mellow nappa lambskin</h2>
                <p className="text-sm text-gray-600 mt-1">Colour: Dark Burgundy</p>
                <div className="flex items-center mt-4 space-x-2">
                  <button className="p-1 border rounded">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center">1</span>
                  <button className="p-1 border rounded">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="font-medium">37,100.00د.إ</span>
                <div className="flex gap-2">
                  <button className="text-sm underline">Delete</button>
                  <button>
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:pl-8">
          <div className="bg-gray-50 p-6 rounded sticky top-4">
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>74,200.00د.إ</span>
              </div>
              <div className="flex justify-between">
                <span>Tax & duty</span>
                <span>Included</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-4 border-t">
                <span>Total</span>
                <span>74,200.00د.إ</span>
              </div>
            </div>

            <button className="w-full bg-black text-white py-3 mb-4">Checkout</button>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-white rounded">
                <Image
                  src="/classic-tote.jpg"
                  alt="Package"
                  width={40}
                  height={40}
                />
                <div className="text-sm">
                  <h3 className="font-medium mb-1">Signature packaging</h3>
                  <p>All purchases will be gift wrapped in our signature packaging.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded">
                <Image
                  src="/classic-tote.jpg"
                  alt="Message"
                  width={40}
                  height={40}
                />
                <div className="text-sm">
                  <h3 className="font-medium mb-1">Personalised message</h3>
                  <p>Add a personalised card on your gifts.</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Need Help?</h3>
                <p className="text-sm mb-1">+44 2074991284</p>
                <p className="text-sm mb-1">Call us 9am - 6pm (London time) Monday to Saturday</p>
                <a href="mailto:clientservices_eu@loewe.com" className="text-sm underline">
                  clientservices_eu@loewe.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


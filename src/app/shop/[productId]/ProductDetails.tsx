// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { Star, ShoppingCart, Heart } from "lucide-react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import type { Product } from "@/lib/types";

// export default function ProductDetails({ product }: { product: Product }) {
//   const [quantity, setQuantity] = useState(1);
//   const [mainImage, setMainImage] = useState(product.imageUrl);

//   // Assuming we have multiple images for the product
//   const images = [
//     product.imageUrl,
//     "/placeholder.svg",
//     "/placeholder.svg",
//     "/placeholder.svg",
//     "/placeholder.svg",
//   ];

//   const handleAddToCart = () => {
//     // Implement add to cart functionality
//     console.log(`Added ${quantity} of ${product.name} to cart`);
//   };

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="bg-white">
//       <div className="max-w-7xl mx-auto py-8 px-4 sm:py-16 sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
//           {/* Image gallery */}
//           <div className="flex flex-col">
//             <div className="w-full aspect-w-1 aspect-h-1 mb-4">
//               <Image
//                 src={mainImage || "/placeholder.svg"}
//                 alt={product.name}
//                 className="w-full h-full object-center object-cover rounded-lg"
//                 width={600}
//                 height={600}
//               />
//             </div>
//             <Slider {...settings}>
//               {images.map((img, index) => (
//                 <div key={index} className="px-2">
//                   <Image
//                     src={img || "/placeholder.svg"}
//                     alt={`${product.name} - Image ${index + 1}`}
//                     width={100}
//                     height={100}
//                     className="w-full h-24 object-cover rounded-lg cursor-pointer"
//                     onClick={() => setMainImage(img)}
//                   />
//                 </div>
//               ))}
//             </Slider>
//           </div>

//           {/* Product info */}
//           <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
//             <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
//               {product.name}
//             </h1>

//             <div className="mt-3 flex items-center">
//               <div className="flex items-center">
//                 {[0, 1, 2, 3, 4].map((rating) => (
//                   <Star
//                     key={rating}
//                     className={`${
//                       rating < Math.floor(4.5)
//                         ? "text-yellow-400"
//                         : "text-gray-300"
//                     } h-5 w-5 flex-shrink-0`}
//                     aria-hidden="true"
//                   />
//                 ))}
//               </div>
//               <p className="ml-2 text-sm text-gray-500">4.5 (117 reviews)</p>
//             </div>

//             <div className="mt-6">
//               <h3 className="sr-only">Description</h3>
//               <p className="text-base text-gray-900">{product.description}</p>
//             </div>

//             <div className="mt-8 flex items-center">
//               <h2 className="text-3xl font-bold text-gray-900">
//                 ${parseFloat(product.price).toFixed(2)}
//               </h2>
//               <p className="ml-4 text-lg text-gray-500 line-through">
//                 ${(product.price * 1.2).toFixed(2)}
//               </p>
//               <p className="ml-2 text-lg font-semibold text-red-600">20% OFF</p>
//             </div>

//             <div className="mt-6 space-y-4">
//               <div className="flex items-center">
//                 <span className="text-sm text-gray-600 font-medium w-20">
//                   Color:
//                 </span>
//                 <p className="ml-2 text-sm text-gray-900">{product.color}</p>
//               </div>
//               <div className="flex items-center">
//                 <span className="text-sm text-gray-600 font-medium w-20">
//                   Size:
//                 </span>
//                 <p className="ml-2 text-sm text-gray-900">{product.size}</p>
//               </div>
//               <div className="flex items-center">
//                 <span className="text-sm text-gray-600 font-medium w-20">
//                   Category:
//                 </span>
//                 <p className="ml-2 text-sm text-gray-900">
//                   {product.category.name}
//                 </p>
//               </div>
//             </div>

//             <div className="mt-8">
//               <label
//                 htmlFor="quantity"
//                 className="text-sm font-medium text-gray-700"
//               >
//                 Quantity
//               </label>
//               <div className="flex items-center mt-1">
//                 <button
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   className="px-3 py-1 border rounded-l-md"
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   id="quantity"
//                   name="quantity"
//                   min="1"
//                   value={quantity}
//                   onChange={(e) =>
//                     setQuantity(Math.max(1, Number.parseInt(e.target.value)))
//                   }
//                   className="w-16 text-center border-t border-b"
//                 />
//                 <button
//                   onClick={() => setQuantity(quantity + 1)}
//                   className="px-3 py-1 border rounded-r-md"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             <div className="mt-10 flex space-x-4">
//               <button
//                 type="button"
//                 onClick={handleAddToCart}
//                 className="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 <ShoppingCart className="mr-2 h-5 w-5" aria-hidden="true" />
//                 Add to Cart
//               </button>
//               <button
//                 type="button"
//                 className="flex-1 bg-gray-100 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//               >
//                 <Heart className="mr-2 h-5 w-5" aria-hidden="true" />
//                 Add to Wishlist
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Truck, ArrowRight } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Product } from "@/lib/types";
import ColorSelector from "../../components/ColorSelector";
import SizeSelector from "../../components/SizeSelector";
import AddToCartButton from "../../components/AddToCartButton";
import RelatedProducts from "../../components/RelatedProducts";

export default function ProductDetails({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.imageUrl);
  const router = useRouter();

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    // Navigate to checkout with product data
    router.push(`/checkout?product=${product.id}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col">
            <div className="w-full aspect-w-1 aspect-h-1 mb-4">
              <Image
                src={mainImage || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-center object-cover rounded-lg"
                width={600}
                height={600}
              />
            </div>
            <Slider {...settings}>
              {product.images.map((img, index) => (
                <div key={index} className="px-2">
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer"
                    onClick={() => setMainImage(img)}
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              {product.name}
            </h1>

            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-baseline space-x-4 mt-4">
              <p className="text-3xl font-medium text-red-600">
                ${product.price.toLocaleString()}
              </p>
              <p className="text-xl text-gray-500 line-through">
                ${product.originalPrice.toLocaleString()}
              </p>
              <p className="text-lg font-semibold text-red-600">
                -{discountPercentage}% OFF
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-900">{product.description}</p>
            </div>

            <div className="mt-8 bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Truck className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Free Shipping</span>
              </div>
              <p className="text-sm text-gray-600">
                Estimated delivery: 3-5 business days
              </p>
            </div>

            <div className="mt-8">
              <ColorSelector colors={product.colors} />
            </div>

            <div className="mt-8">
              <SizeSelector sizes={product.sizes} />
            </div>

            <div className="mt-8">
              <label
                htmlFor="quantity"
                className="text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <div className="flex items-center mt-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border rounded-l-md"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number.parseInt(e.target.value)))
                  }
                  className="w-16 text-center border-t border-b"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-10 flex space-x-4">
              <AddToCartButton onClick={handleAddToCart} />
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-red-600 text-white py-3 px-8 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Buy Now
              </button>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-8">
              <h2 className="text-lg font-medium mb-4">
                Product Specifications
              </h2>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">Material</td>
                    <td className="py-2">100% genuine Italian leather</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">Dimensions</td>
                    <td className="py-2">14" x 11" x 5"</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600">Weight</td>
                    <td className="py-2">2.5 lbs</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Closure</td>
                    <td className="py-2">Zip-top</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* <div className="mt-10 border-t border-gray-200 pt-8">
              <h2 className="text-lg font-medium mb-4">Seller Information</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{product.seller}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">
                      {product.sellerRating} Positive Feedback
                    </span>
                  </div>
                </div>
                <button className="text-primary hover:text-secondary transition-colors duration-200 flex items-center">
                  Visit Store <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div> */}
          </div>
        </div>

        {/* <div className="mt-16">
          <h2 className="text-2xl font-light mb-6">Product Description</h2>
          <div className="prose max-w-none">
            <p>{product.description}</p>
            <h3>Key Features:</h3>
            <ul>
              <li>Premium Italian leather construction</li>
              <li>Spacious main compartment with zip closure</li>
              <li>Interior zip pocket and two slip pockets</li>
              <li>Adjustable shoulder strap</li>
              <li>Gold-tone hardware accents</li>
            </ul>
            <p>
              Experience unparalleled luxury and functionality with our Elegant
              Leather Tote. Whether you're heading to the office or enjoying a
              weekend getaway, this versatile bag is the perfect companion for
              the modern, sophisticated individual.
            </p>
          </div>
        </div> */}

        <RelatedProducts category={product.category} />
      </div>
    </div>
  );
}

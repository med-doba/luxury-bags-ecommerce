import { Skeleton } from "@/app/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Minus, Plus, Truck } from "lucide-react";

export default function ProductDetailsSkeleton() {
  return (
    <div className="bg-[#f8f7f5]">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-20 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Image gallery skeleton */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full aspect-[4/5] mb-6 bg-white rounded-xl overflow-hidden shadow-sm">
              <Skeleton className="w-full h-full" />

              {/* Navigation arrows */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                <ChevronLeft className="h-6 w-6 text-gray-300" />
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                <ChevronRight className="h-6 w-6 text-gray-300" />
              </div>
            </div>

            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex-shrink-0">
                  <div className="relative w-20 h-24 bg-white rounded-lg overflow-hidden shadow-sm">
                    <Skeleton className="w-full h-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product info skeleton */}
          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="space-y-8">
              {/* Brand and title */}
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-4">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-4 rounded-full" />
                  ))}
                </div>
                <Skeleton className="h-4 w-32" />
              </div>

              {/* Description */}
              <div className="border-t border-b border-gray-200 py-6">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Color */}
              <div>
                <Skeleton className="h-4 w-24 mb-3" />
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              {/* Size */}
              <div>
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-10 w-20 rounded-md" />
              </div>

              {/* Quantity */}
              <div>
                <Skeleton className="h-4 w-24 mb-3" />
                <div className="flex items-center border-2 border-gray-200 rounded-md w-32">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Minus className="h-4 w-4 text-gray-300" />
                  </div>
                  <Skeleton className="w-12 h-6 mx-auto" />
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Plus className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <Truck className="h-5 w-5 text-gray-300" />
                  <Skeleton className="h-5 w-48" />
                </div>
                <Skeleton className="h-4 w-56 ml-8" />
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-12 w-full rounded-md" />
                  <Skeleton className="h-12 w-full rounded-md" />
                </div>
                <Skeleton className="h-12 w-full rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

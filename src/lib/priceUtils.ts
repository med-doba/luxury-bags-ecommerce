import type { Product } from "@/lib/types";

/**
 * Gets the display price for a product (without sale calculations)
 * Priority: First available size variant price > base product price
 */
export function getBaseDisplayPrice(product: Product): number {
  // First check if there are color variants with size variants
  if (product.colorVariants && product.colorVariants.length > 0) {
    for (const colorVariant of product.colorVariants) {
      if (colorVariant.sizeVariants && colorVariant.sizeVariants.length > 0) {
        for (const sizeVariant of colorVariant.sizeVariants) {
          if (sizeVariant.price && sizeVariant.price > 0) {
            return Number(sizeVariant.price);
          }
        }
      }
    }
  }

  // Fall back to legacy size variants
  if (product.sizeVariants && product.sizeVariants.length > 0) {
    for (const sizeVariant of product.sizeVariants) {
      if (sizeVariant.price && sizeVariant.price > 0) {
        return Number(sizeVariant.price);
      }
    }
  }

  // Final fallback to base product price
  return Number(product.price) || 0;
}

/**
 * Gets the display price for a product (with sale calculations if applicable)
 */
export function getDisplayPrice(product: Product): number {
  const basePrice = getBaseDisplayPrice(product);

  // Apply sale percentage if product is on sale
  if (
    product.onSale &&
    product.salePercentage &&
    product.salePercentage > 0 &&
    product.salePercentage < 100
  ) {
    return calculateSalePrice(basePrice, product.salePercentage);
  }

  return basePrice;
}

/**
 * Gets the price range for a product (min - max)
 */
export function getPriceRange(product: Product): { min: number; max: number } {
  const prices: number[] = [];

  // Collect all prices from color variants
  if (product.colorVariants && product.colorVariants.length > 0) {
    product.colorVariants.forEach((colorVariant) => {
      if (colorVariant.sizeVariants && colorVariant.sizeVariants.length > 0) {
        colorVariant.sizeVariants.forEach((sizeVariant) => {
          if (sizeVariant.price && sizeVariant.price > 0) {
            prices.push(Number(sizeVariant.price));
          }
        });
      }
    });
  }

  // Collect from legacy size variants
  if (product.sizeVariants && product.sizeVariants.length > 0) {
    product.sizeVariants.forEach((sizeVariant) => {
      if (sizeVariant.price && sizeVariant.price > 0) {
        prices.push(Number(sizeVariant.price));
      }
    });
  }

  // If no variant prices, use base price
  if (prices.length === 0) {
    const basePrice = Number(product.price) || 0;
    return { min: basePrice, max: basePrice };
  }

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

/**
 * Calculates sale percentage between original and sale price
 */
export function getSalePercentage(
  originalPrice: number,
  salePrice: number
): number {
  if (!originalPrice || originalPrice <= 0 || !salePrice || salePrice <= 0) {
    return 0;
  }

  if (salePrice >= originalPrice) {
    return 0;
  }

  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Calculates the sale price based on original price and percentage
 */
export function calculateSalePrice(
  originalPrice: number,
  percentage: number
): number {
  if (
    !originalPrice ||
    originalPrice <= 0 ||
    !percentage ||
    percentage <= 0 ||
    percentage >= 100
  ) {
    return originalPrice;
  }

  return originalPrice * (1 - percentage / 100);
}

/**
 * Gets sale information for a product with percentage-based pricing
 */
export function getSaleInfo(product: Product): {
  isOnSale: boolean;
  originalPrice: number | null;
  salePrice: number;
  percentage: number;
} {
  const isOnSale =
    product.onSale &&
    product.salePercentage &&
    product.salePercentage > 0 &&
    product.salePercentage < 100;
  const basePrice = getBaseDisplayPrice(product);
  const originalPrice = isOnSale ? basePrice : null;
  const salePrice = isOnSale
    ? calculateSalePrice(basePrice, product.salePercentage!)
    : basePrice;
  const percentage = isOnSale ? product.salePercentage! : 0;

  return {
    isOnSale: !!isOnSale,
    originalPrice,
    salePrice,
    percentage,
  };
}

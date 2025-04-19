// "use server";

// import prisma from "@/lib/prisma";

// interface UpdateStockParams {
//   productId: string;
//   quantity: number;
// }

// /**
//  * Decreases the stock quantity for a product
//  * @param productId The ID of the product
//  * @param quantity The quantity to decrease
//  * @returns Success status and message
//  */
// export async function decreaseProductStock({
//   productId,
//   quantity,
// }: UpdateStockParams) {
//   try {
//     // First, get the current stock
//     const product = await prisma.product.findUnique({
//       where: { id: productId },
//       select: { stock: true },
//     });

//     if (!product) {
//       return { success: false, message: "Product not found" };
//     }

//     const currentStock = product.stock;
//     const newStock = Math.max(0, currentStock - quantity); // Ensure stock doesn't go below 0

//     // Update the stock
//     const updatedProduct = await prisma.product.update({
//       where: { id: productId },
//       data: { stock: newStock },
//       select: { id: true, name: true, stock: true },
//     });

//     return {
//       success: true,
//       message: "Stock updated successfully",
//       previousStock: currentStock,
//       newStock: updatedProduct.stock,
//       productName: updatedProduct.name,
//     };
//   } catch (error) {
//     console.error("Error in decreaseProductStock:", error);
//     return {
//       success: false,
//       message: "An unexpected error occurred",
//       error: error instanceof Error ? error.message : String(error),
//     };
//   }
// }

// /**
//  * Updates stock for multiple products in a single transaction
//  * @param items Array of product IDs and quantities to decrease
//  * @returns Success status and message
//  */
// export async function updateProductsStock(items: UpdateStockParams[]) {
//   const results = [];
//   let allSuccessful = true;

//   // Use a transaction to ensure all updates succeed or fail together
//   try {
//     await prisma.$transaction(async (tx) => {
//       for (const item of items) {
//         // Get current product
//         const product = await tx.product.findUnique({
//           where: { id: item.productId },
//           select: { id: true, name: true, stock: true },
//         });

//         if (!product) {
//           results.push({
//             productId: item.productId,
//             success: false,
//             message: "Product not found",
//           });
//           allSuccessful = false;
//           continue;
//         }

//         const currentStock = product.stock;
//         const newStock = Math.max(0, currentStock - item.quantity);

//         // Update the stock
//         const updatedProduct = await tx.product.update({
//           where: { id: item.productId },
//           data: { stock: newStock },
//           select: { id: true, name: true, stock: true },
//         });

//         results.push({
//           productId: item.productId,
//           productName: updatedProduct.name,
//           success: true,
//           previousStock: currentStock,
//           newStock: updatedProduct.stock,
//           quantityReduced: item.quantity,
//         });
//       }
//     });

//     return {
//       success: allSuccessful,
//       message: allSuccessful
//         ? "All product stocks updated successfully"
//         : "Some product stocks failed to update",
//       results,
//     };
//   } catch (error) {
//     console.error("Error in updateProductsStock:", error);
//     return {
//       success: false,
//       message: "An unexpected error occurred",
//       error: error instanceof Error ? error.message : String(error),
//       results,
//     };
//   }
// }

// /**
//  * Validates if all products in the cart have sufficient stock
//  * @param items Array of product IDs and quantities to check
//  * @returns Validation result
//  */
// export async function validateProductStock(items: UpdateStockParams[]) {
//   try {
//     const productIds = items.map((item) => item.productId);

//     // Get all products in a single query
//     const products = await prisma.product.findMany({
//       where: {
//         id: { in: productIds },
//       },
//       select: {
//         id: true,
//         name: true,
//         stock: true,
//       },
//     });

//     // Create a map for quick lookup
//     const productMap = products.reduce((map, product) => {
//       map[product.id] = product;
//       return map;
//     }, {} as Record<string, (typeof products)[0]>);

//     // Check each item
//     const insufficientItems = [];
//     let allInStock = true;

//     for (const item of items) {
//       const product = productMap[item.productId];

//       if (!product) {
//         insufficientItems.push({
//           productId: item.productId,
//           name: "Unknown product",
//           requestedQuantity: item.quantity,
//           availableStock: 0,
//           error: "Product not found",
//         });
//         allInStock = false;
//         continue;
//       }

//       if (product.stock < item.quantity) {
//         insufficientItems.push({
//           productId: item.productId,
//           name: product.name,
//           requestedQuantity: item.quantity,
//           availableStock: product.stock,
//           error: "Insufficient stock",
//         });
//         allInStock = false;
//       }
//     }

//     return {
//       success: allInStock,
//       message: allInStock
//         ? "All products are in stock"
//         : "Some products have insufficient stock",
//       insufficientItems,
//     };
//   } catch (error) {
//     console.error("Error in validateProductStock:", error);
//     return {
//       success: false,
//       message: "An unexpected error occurred",
//       error: error instanceof Error ? error.message : String(error),
//     };
//   }
// }

"use server";

import prisma from "@/lib/prisma";

interface UpdateStockParams {
  productId: string;
  quantity: number;
}

/**
 * Decreases the stock quantity for a product
 * @param productId The ID of the product
 * @param quantity The quantity to decrease
 * @returns Success status and message
 */
export async function decreaseProductStock({
  productId,
  quantity,
}: UpdateStockParams) {
  try {
    // First, get the current stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { stock: true },
    });

    if (!product) {
      return { success: false, message: "Product not found" };
    }

    const currentStock = product.stock;
    const newStock = Math.max(0, currentStock - quantity); // Ensure stock doesn't go below 0

    // Update the stock
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { stock: newStock },
      select: { id: true, name: true, stock: true },
    });

    return {
      success: true,
      message: "Stock updated successfully",
      previousStock: currentStock,
      newStock: updatedProduct.stock,
      productName: updatedProduct.name,
    };
  } catch (error) {
    console.error("Error in decreaseProductStock:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

interface StockUpdateResult {
  productId: string;
  productName?: string;
  success: boolean;
  message?: string;
  previousStock?: number;
  newStock?: number;
  quantityReduced?: number;
}

/**
 * Updates stock for multiple products in a single transaction
 * @param items Array of product IDs and quantities to decrease
 * @returns Success status and message
 */
export async function updateProductsStock(items: UpdateStockParams[]): Promise<{
  success: boolean;
  message: string;
  results: StockUpdateResult[];
  error?: string;
}> {
  const results: StockUpdateResult[] = [];
  let allSuccessful = true;

  // Use a transaction to ensure all updates succeed or fail together
  try {
    await prisma.$transaction(async (tx) => {
      for (const item of items) {
        // Get current product
        const product = await tx.product.findUnique({
          where: { id: item.productId },
          select: { id: true, name: true, stock: true },
        });

        if (!product) {
          results.push({
            productId: item.productId,
            success: false,
            message: "Product not found",
          });
          allSuccessful = false;
          continue;
        }

        const currentStock = product.stock;
        const newStock = Math.max(0, currentStock - item.quantity);

        // Update the stock
        const updatedProduct = await tx.product.update({
          where: { id: item.productId },
          data: { stock: newStock },
          select: { id: true, name: true, stock: true },
        });

        results.push({
          productId: item.productId,
          productName: updatedProduct.name,
          success: true,
          previousStock: currentStock,
          newStock: updatedProduct.stock,
          quantityReduced: item.quantity,
        });
      }
    });

    return {
      success: allSuccessful,
      message: allSuccessful
        ? "All product stocks updated successfully"
        : "Some product stocks failed to update",
      results,
    };
  } catch (error) {
    console.error("Error in updateProductsStock:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
      error: error instanceof Error ? error.message : String(error),
      results,
    };
  }
}

/**
 * Validates if all products in the cart have sufficient stock
 * @param items Array of product IDs and quantities to check
 * @returns Validation result
 */
export async function validateProductStock(items: UpdateStockParams[]) {
  try {
    const productIds = items.map((item) => item.productId);

    // Get all products in a single query
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
      select: {
        id: true,
        name: true,
        stock: true,
      },
    });

    // Create a map for quick lookup
    const productMap = products.reduce((map, product) => {
      map[product.id] = product;
      return map;
    }, {} as Record<string, (typeof products)[0]>);

    // Check each item
    const insufficientItems = [];
    let allInStock = true;

    for (const item of items) {
      const product = productMap[item.productId];

      if (!product) {
        insufficientItems.push({
          productId: item.productId,
          name: "Unknown product",
          requestedQuantity: item.quantity,
          availableStock: 0,
          error: "Product not found",
        });
        allInStock = false;
        continue;
      }

      if (product.stock < item.quantity) {
        insufficientItems.push({
          productId: item.productId,
          name: product.name,
          requestedQuantity: item.quantity,
          availableStock: product.stock,
          error: "Insufficient stock",
        });
        allInStock = false;
      }
    }

    return {
      success: allInStock,
      message: allInStock
        ? "All products are in stock"
        : "Some products have insufficient stock",
      insufficientItems,
    };
  } catch (error) {
    console.error("Error in validateProductStock:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

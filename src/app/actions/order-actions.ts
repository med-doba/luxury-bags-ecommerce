"use server";

import prisma from "@/lib/prisma";
import type { CartItem } from "@/app/contexts/CartContext";

// Define interfaces
interface CustomerInfo {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email?: string;
}

interface SaveOrderParams {
  orderId: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  totalAmount: number;
}

/**
 * Saves an order to the database
 */
export async function saveOrder({
  orderId,
  items,
  customerInfo,
  totalAmount,
}: SaveOrderParams) {
  try {
    // Check if we need to create the necessary tables first
    let tablesExist = true;

    try {
      // Check if order table exists by trying to query it
      await prisma.$queryRaw`SELECT 1 FROM \`Order\` LIMIT 1`;
    } catch (error) {
      tablesExist = false;
      console.log("Order tables don't exist yet, will create them");

      // Create Order table
      await prisma.$executeRaw`
        CREATE TABLE \`Order\` (
          id VARCHAR(191) PRIMARY KEY,
          customer_first_name VARCHAR(191) NOT NULL,
          customer_last_name VARCHAR(191) NOT NULL,
          customer_address TEXT NOT NULL,
          customer_phone VARCHAR(191) NOT NULL,
          customer_email VARCHAR(191),
          total_amount DECIMAL(10,2) NOT NULL,
          status VARCHAR(191) NOT NULL DEFAULT 'pending',
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `;

      // Create OrderItem table
      await prisma.$executeRaw`
        CREATE TABLE \`OrderItem\` (
          id VARCHAR(191) PRIMARY KEY DEFAULT (UUID()),
          order_id VARCHAR(191) NOT NULL,
          product_id VARCHAR(191) NOT NULL,
          product_name VARCHAR(191) NOT NULL,
          quantity INT NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          color VARCHAR(191),
          size VARCHAR(191),
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (order_id) REFERENCES \`Order\`(id) ON DELETE CASCADE
        )
      `;
    }

    // Now save the order
    if (tablesExist) {
      // Use Prisma if tables exist in schema
      const order = await prisma.$executeRaw`
        INSERT INTO \`Order\` (
          id, 
          customer_first_name, 
          customer_last_name, 
          customer_address, 
          customer_phone, 
          customer_email, 
          total_amount, 
          status
        ) VALUES (
          ${orderId},
          ${customerInfo.firstName},
          ${customerInfo.lastName},
          ${customerInfo.address},
          ${customerInfo.phone},
          ${customerInfo.email || null},
          ${totalAmount},
          'pending'
        )
      `;

      // Then, save the order items
      for (const item of items) {
        await prisma.$executeRaw`
          INSERT INTO \`OrderItem\` (
            order_id,
            product_id,
            product_name,
            quantity,
            price,
            color,
            size
          ) VALUES (
            ${orderId},
            ${item.id},
            ${item.name},
            ${item.quantity},
            ${item.price},
            ${item.color || "Default"},
            ${item.size || "Universal"}
          )
        `;
      }
    }

    return { success: true, message: "Order saved successfully", orderId };
  } catch (error) {
    console.error("Error in saveOrder:", error);
    return {
      success: false,
      message: "Failed to save order",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

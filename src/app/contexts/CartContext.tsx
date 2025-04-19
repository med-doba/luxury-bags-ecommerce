// "use client";

// import type React from "react";
// import { createContext, useContext, useState, useEffect } from "react";

// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   imageUrl: string;
//   color?: string;
//   size?: string;
// }

// interface CartContextType {
//   items: CartItem[];
//   addItem: (item: CartItem) => void;
//   removeItem: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   clearCart: () => void;
//   itemCount: number;
//   totalItems: number;
//   totalPrice: number;
//   calculateTotal: () => number;
//   orderId: string;
//   generateOrderId: () => string;
//   setOrderIdInContext: (id: string) => void; // Add this new function
//   isCartOpen: boolean;
//   openCart: () => void;
//   closeCart: () => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const [items, setItems] = useState<CartItem[]>([]);
//   const [itemCount, setItemCount] = useState(0);
//   const [orderId, setOrderId] = useState("");
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   // Load cart from localStorage on initial render
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const savedCart = localStorage.getItem("cart");
//       if (savedCart) {
//         try {
//           const parsedCart = JSON.parse(savedCart);

//           // Ensure all items have color and size properties
//           const updatedCart = parsedCart.map((item: CartItem) => ({
//             ...item,
//             color: item.color || "Default",
//             size: item.size || "Universal",
//           }));

//           setItems(updatedCart);
//           setItemCount(
//             updatedCart.reduce(
//               (total: number, item: CartItem) => total + item.quantity,
//               0
//             )
//           );
//           setTotalPrice(
//             updatedCart.reduce(
//               (total: number, item: CartItem) =>
//                 total + item.price * item.quantity,
//               0
//             )
//           );
//         } catch (error) {
//           console.error("Failed to parse cart from localStorage:", error);
//         }
//       }

//       // Load order ID from localStorage if it exists
//       const savedOrderId = localStorage.getItem("orderId");
//       if (savedOrderId) {
//         setOrderId(savedOrderId);
//       }
//     }
//   }, []);

//   // Generate a new order ID
//   const generateOrderId = () => {
//     // Generate a random order ID if we don't have one
//     const newOrderId = Math.floor(Math.random() * 10000000)
//       .toString()
//       .padStart(7, "0");

//     setOrderId(newOrderId);
//     localStorage.setItem("orderId", newOrderId);
//     return newOrderId;
//   };

//   // Add a new function to set the order ID directly
//   const setOrderIdInContext = (id: string) => {
//     setOrderId(id);
//     localStorage.setItem("orderId", id);
//   };

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("cart", JSON.stringify(items));
//       setItemCount(items.reduce((total, item) => total + item.quantity, 0));
//       setTotalPrice(calculateTotal());
//     }
//   }, [items]);

//   const addItem = (newItem: CartItem) => {
//     // Ensure color and size are always defined
//     const itemWithDefaults = {
//       ...newItem,
//       color: newItem.color || "Default",
//       size: newItem.size || "Universal",
//     };

//     setItems((prevItems) => {
//       const existingItemIndex = prevItems.findIndex(
//         (item) => item.id === itemWithDefaults.id
//       );

//       if (existingItemIndex > -1) {
//         // Item exists, update quantity
//         const updatedItems = [...prevItems];
//         updatedItems[existingItemIndex] = {
//           ...updatedItems[existingItemIndex],
//           quantity:
//             updatedItems[existingItemIndex].quantity +
//             itemWithDefaults.quantity,
//           // Update color and size if they were missing
//           color:
//             updatedItems[existingItemIndex].color || itemWithDefaults.color,
//           size: updatedItems[existingItemIndex].size || itemWithDefaults.size,
//         };
//         return updatedItems;
//       } else {
//         // Item doesn't exist, add it
//         return [...prevItems, itemWithDefaults];
//       }
//     });
//     // Open cart when adding items
//     setIsCartOpen(true);
//   };

//   const removeItem = (id: string) => {
//     setItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   const updateQuantity = (id: string, quantity: number) => {
//     if (quantity <= 0) {
//       removeItem(id);
//       return;
//     }

//     setItems((prevItems) =>
//       prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
//     );
//   };

//   const clearCart = () => {
//     setItems([]);
//     // Don't clear the order ID when clearing the cart
//     // This ensures the order ID persists to the success page
//   };

//   const calculateTotal = () => {
//     return items.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   // Cart drawer functions
//   const openCart = () => {
//     setIsCartOpen(true);
//   };

//   const closeCart = () => {
//     setIsCartOpen(false);
//   };

//   // Calculate total items (same as itemCount but needed for compatibility)
//   const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <CartContext.Provider
//       value={{
//         items,
//         addItem,
//         removeItem,
//         updateQuantity,
//         clearCart,
//         itemCount,
//         totalItems,
//         totalPrice,
//         calculateTotal,
//         orderId,
//         generateOrderId,
//         setOrderIdInContext, // Add the new function to the context
//         isCartOpen,
//         openCart,
//         closeCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// }

"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  color?: string;
  size?: string;
}

// Add customer info interface
export interface CustomerInfo {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalItems: number;
  totalPrice: number;
  calculateTotal: () => number;
  orderId: string;
  generateOrderId: () => string;
  setOrderIdInContext: (id: string) => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  // Add customer info to context
  customerInfo: CustomerInfo | null;
  setCustomerInfo: (info: CustomerInfo) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Add customer info state
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);

  // Load cart from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);

          // Ensure all items have color and size properties
          const updatedCart = parsedCart.map((item: CartItem) => ({
            ...item,
            color: item.color || "Default",
            size: item.size || "Universal",
          }));

          setItems(updatedCart);
          setItemCount(
            updatedCart.reduce(
              (total: number, item: CartItem) => total + item.quantity,
              0
            )
          );
          setTotalPrice(
            updatedCart.reduce(
              (total: number, item: CartItem) =>
                total + item.price * item.quantity,
              0
            )
          );
        } catch (error) {
          console.error("Failed to parse cart from localStorage:", error);
        }
      }

      // Load order ID from localStorage if it exists
      const savedOrderId = localStorage.getItem("orderId");
      if (savedOrderId) {
        setOrderId(savedOrderId);
      }

      // Load customer info from localStorage if it exists
      const savedCustomerInfo = localStorage.getItem("customerInfo");
      if (savedCustomerInfo) {
        try {
          setCustomerInfo(JSON.parse(savedCustomerInfo));
        } catch (error) {
          console.error(
            "Failed to parse customer info from localStorage:",
            error
          );
        }
      }
    }
  }, []);

  // Save customer info to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined" && customerInfo) {
      localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
    }
  }, [customerInfo]);

  // Generate a new order ID
  const generateOrderId = () => {
    // Generate a random order ID if we don't have one
    const newOrderId = Math.floor(Math.random() * 10000000)
      .toString()
      .padStart(7, "0");

    setOrderId(newOrderId);
    localStorage.setItem("orderId", newOrderId);
    return newOrderId;
  };

  // Add a new function to set the order ID directly
  const setOrderIdInContext = (id: string) => {
    setOrderId(id);
    localStorage.setItem("orderId", id);
  };

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(items));
      setItemCount(items.reduce((total, item) => total + item.quantity, 0));
      setTotalPrice(calculateTotal());
    }
  }, [items]);

  const addItem = (newItem: CartItem) => {
    // Ensure color and size are always defined
    const itemWithDefaults = {
      ...newItem,
      color: newItem.color || "Default",
      size: newItem.size || "Universal",
    };

    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === itemWithDefaults.id
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity:
            updatedItems[existingItemIndex].quantity +
            itemWithDefaults.quantity,
          // Update color and size if they were missing
          color:
            updatedItems[existingItemIndex].color || itemWithDefaults.color,
          size: updatedItems[existingItemIndex].size || itemWithDefaults.size,
        };
        return updatedItems;
      } else {
        // Item doesn't exist, add it
        return [...prevItems, itemWithDefaults];
      }
    });
    // Open cart when adding items
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    // Don't clear the order ID or customer info when clearing the cart
    // This ensures they persist to the success page
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Cart drawer functions
  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  // Calculate total items (same as itemCount but needed for compatibility)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        totalItems,
        totalPrice,
        calculateTotal,
        orderId,
        generateOrderId,
        setOrderIdInContext,
        isCartOpen,
        openCart,
        closeCart,
        // Add customer info to context value
        customerInfo,
        setCustomerInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Load cart from localStorage and clear stale mock data
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) return [];
    
    try {
      const parsed = JSON.parse(savedCart);
      // Validate that all items have a valid 24-character hex MongoDB ObjectId
      const validItems = parsed.filter(item => 
        item._id && typeof item._id === 'string' && /^[0-9a-fA-F]{24}$/.test(item._id)
      );
      
      // If we filtered out some stale items, update localStorage immediately
      if (validItems.length !== parsed.length) {
        localStorage.setItem("cart", JSON.stringify(validItems));
      }
      return validItems;
    } catch (e) {
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item._id === product._id
      );

      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity,
        },
      ];
    });
  };

  // Remove product
  const removeFromCart = (_id) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== _id)
    );
  };

  // Increase quantity
  const increaseQty = (_id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === _id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQty = (_id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === _id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Total items
  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }, [cartItems]);

  // Cart subtotal
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) =>
        sum +
        (item.discountPrice ?? item.price) * item.quantity,
      0
    );
  }, [cartItems]);

  // Shipping (Free above ₹499)
  const shipping = useMemo(() => {
    if (cartItems.length === 0) return 0;
    return subtotal >= 499 ? 0 : 50;
  }, [subtotal, cartItems]);

  // GST (18%)
  const gst = useMemo(() => {
    return Math.round(subtotal * 0.18);
  }, [subtotal]);

  // Final Total
  const total = useMemo(() => {
    return subtotal + shipping + gst;
  }, [subtotal, shipping, gst]);

  const value = {
    cartItems,
    cartCount,
    subtotal,
    shipping,
    gst,
    total,

    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
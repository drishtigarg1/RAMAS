import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    if (!saved) return [];
    
    try {
      const parsed = JSON.parse(saved);
      const validItems = parsed.filter(item => 
        item._id && typeof item._id === 'string' && /^[0-9a-fA-F]{24}$/.test(item._id)
      );
      
      if (validItems.length !== parsed.length) {
        localStorage.setItem("wishlist", JSON.stringify(validItems));
      }
      return validItems;
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  // Add Product
  const addToWishlist = (product) => {
    const exists = wishlistItems.some(
      (item) => item._id === product._id
    );

    if (exists) return false;

    setWishlistItems((prev) => [...prev, product]);

    return true;
  };

  // Remove Product
  const removeFromWishlist = (id) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  // Toggle Wishlist
  const toggleWishlist = (product) => {
    const exists = wishlistItems.some(
      (item) => item._id === product._id
    );

    if (exists) {
      removeFromWishlist(product._id);
      return false;
    }

    addToWishlist(product);
    return true;
  };

  // Check if product exists
  const isInWishlist = (id) => {
    return wishlistItems.some(
      (item) => item._id === id
    );
  };

  // Clear Wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const wishlistCount = useMemo(
    () => wishlistItems.length,
    [wishlistItems]
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
import { useLocalStorage } from './useLocalStorage';

export const useCart = () => {
  const [cartItems, setCartItems] = useLocalStorage('cart', []);

  const addToCart = (product, quantity = 1, selectedVariant = null) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && 
        JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant)
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      }

      return [...prevItems, { ...product, quantity, selectedVariant }];
    });
  };

  const removeFromCart = (productId, selectedVariant = null) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === productId && 
        JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant))
      )
    );
  };

  const updateQuantity = (productId, quantity, selectedVariant = null) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedVariant);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && 
        JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (productId, selectedVariant = null) => {
    return cartItems.some(
      (item) => item.id === productId && 
      JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant)
    );
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isInCart,
  };
};


import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const CartContext = createContext();

function readStorefrontCart() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("sneakerCart") || "[]"
    );

    return Array.isArray(saved)
      ? saved.map((item) => ({
          ...item,
          id: item.id ?? item.name,
          quantity: Math.max(1, Number(item.quantity) || 1),
        }))
      : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStorefrontCart);

  useEffect(() => {
    const syncCart = () => {
      setItems(readStorefrontCart());
    };

    window.addEventListener("sneakerCartUpdated", syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener("sneakerCartUpdated", syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  const addItem = (product) => {
    setItems((currentItems) => {
      const existing = currentItems.find(
        (item) => item.id === (product.id ?? product.name)
      );

      const updated = existing
        ? currentItems.map((item) =>
            item.id === (product.id ?? product.name)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [
            ...currentItems,
            {
              ...product,
              id: product.id ?? product.name,
              quantity: 1,
            },
          ];

      localStorage.setItem("sneakerCart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeItem = (id) => {
    setItems((currentItems) => {
      const updated = currentItems.filter(
        (item) => item.id !== id && item.name !== id
      );

      localStorage.setItem("sneakerCart", JSON.stringify(updated));
      return updated;
    });
  };

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

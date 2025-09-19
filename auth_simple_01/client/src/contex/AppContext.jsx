import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function ContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState(false);
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    setProducts(data.products);
  };
  const value = {
    loading,
    color,
    setColor,
    setLoading,
    setProducts,
    products,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

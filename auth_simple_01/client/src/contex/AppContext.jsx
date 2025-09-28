import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();
import axios from "axios";
export default function ContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState(false);
  const [products, setProducts] = useState("");
  const [authData, setAuthData] = useState({
    email: null,
    otp: null,
  });
  const [emailA, setEmail] = useState("");
  //   const setResetData = (email, otp) => {
  //     setAuthData({ email, otp });
  //   };

  const fetchData = async () => {
    // const res = await fetch("http://localhost:4000/api/v1/getUserBlog", {
    //   method: "GET",
    // });
    // console.log(res);
    try {
      const res = await axios.get("http://localhost:4000/api/v1/usersBLog");
      console.log(res.data); // ✅ actual data
    } catch (err) {
      console.error(err);
    }
    // const data = await res.json();
    // console.log(data);
    // setProducts(data);
  };

  const value = {
    emailA,
    setEmail,
    authData,
    setAuthData,
    loading,
    color,
    fetchData,
    setColor,
    setLoading,
    setProducts,
    products,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

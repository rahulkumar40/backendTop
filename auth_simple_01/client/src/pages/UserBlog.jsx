import React from "react";
import { useContext } from "react";
import { AppContext } from "../contex/AppContext";
import { useEffect } from "react";

function UserBlog() {
  const { fetchData, products } = useContext(AppContext);
  useEffect(() => {
    fetchData();
  }, []);
  //   console.log("User data ", products);
//   console.log(products);
  return <>
    <div>
        
    </div>
  </>;
}

export default UserBlog;

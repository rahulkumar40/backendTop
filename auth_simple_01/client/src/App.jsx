import React, { useContext } from "react";
import { AppContext } from "./contex/AppContext";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import { NavLink } from "react-router-dom";
// import Home from './pages/Home.jsx'

import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
// const About = lazy(() => import("./About"));
function App() {
  const { color, setColor } = useContext(AppContext);
  console.log(color);
  const dk = color ? `dardMode` : `lightMode`;
  return (
    <div>
      React Redux tolkit (RTK)
      <div className={dk}>
        <button onClick={() => setColor(!color)}>
          {color ? "Dark Mode" : "Light Mode"}
        </button>
        <div style={{ display: "flex", margin: "5px" }}>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/go">Go</NavLink>
        </div>
        <div className={dk}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam
          quidem voluptate nesciunt quasi sed hic illum. Maiores, obcaecati quae
          ipsam illum mollitia saepe id aspernatur, sit unde odit voluptatibus,
          adipisci nisi provident possimus eligendi quas suscipit aperiam animi
          tempore sunt nobis. Labore illo aliquid corrupti reprehenderit
          sapiente sit dolorem fugiat! Fugit, esse quis! Eius odio, non
          quibusdam quis cupiditate dolore tempora facere architecto? Deleniti
          saepe quod, neque provident, fugit ut amet distinctio error mollitia
          totam, iure omnis blanditiis? Optio nobis laboriosam eveniet suscipit
          odit ipsum a officiis quidem facilis delectus, ea ducimus dolore quam
          autem, ab vitae quas? Minus, hic?
        </div>
      </div>
      <div>
        <Routes>
          <Route
            path="/home"
            element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <Home />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

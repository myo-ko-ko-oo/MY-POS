import React from "react";
import "./App.css";
import Router from "./route/Router";
import NavBar from "./components/NavBar";
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style

function App() {
  return (
    <>
      <div className="root ">
        <div className="md:mx-5 mx-1">
          <NavBar />
          <Router />
        </div>
      </div>
    </>
  );
}

export default App;

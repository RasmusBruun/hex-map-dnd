import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HexMap from "./HexMap";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HexMap />
  </React.StrictMode>
);

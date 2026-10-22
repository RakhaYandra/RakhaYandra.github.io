import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/outfit";
import "@fontsource/roboto";
import "../vars.css";
import "./blueprint.css";
import { BlueprintApp } from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BlueprintApp />
  </React.StrictMode>
);

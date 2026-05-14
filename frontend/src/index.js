import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
// Runtime safeguard: ensure document root/body allow vertical scrolling.
// This overrides temporary locks (e.g., modals) during development.
try {
  document.documentElement.style.overflowY = 'auto';
  document.body.style.overflowY = 'auto';
  document.documentElement.style.overscrollBehavior = 'auto';
} catch (e) {
  // ignore in non-browser environments
}
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import "./styles/index.css";
import SupabaseAuthProvider from "@/components/common/SupabaseAuthProvider.tsx";
import { BrowserRouter } from "react-router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <SupabaseAuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SupabaseAuthProvider>,
  // </React.StrictMode>,
);

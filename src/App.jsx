import { useState, useEffect } from "react";
import "./App.css";
import MyContextProvider from "../src/ContextAPI/ContextAPI";
import { LoadingProvider } from "./ContextAPI/LoadingContext";
import PageRoutes from "./Routes/Routes";
import Header from "./components/Header/Header";
import Loading from "./components/Loading/Loading";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <MyContextProvider>
      <LoadingProvider>
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Header />
            <div id="dropdown-container"></div>
            <div style={{ flex: 1, marginTop: "57px" }}>
              <PageRoutes />
            </div>
            <Toaster />
            <Loading />
          </div>
        </>
      </LoadingProvider>
    </MyContextProvider>
  );
}

export default App;

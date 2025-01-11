import { useState, useEffect } from "react";
import "./App.css";
import MyContextProvider from "../src/ContextAPI/ContextAPI";
import { LoadingProvider } from "./ContextAPI/LoadingContext";
import { PopUpProvider } from "./components/PopUp/PopUp";
import PageRoutes from "./Routes/Routes";
import Header from "./components/Header/Header";
import Loading from "./components/Loading/Loading";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function App() {
  const currentPage = window.location.pathname;


  return (
    <MyContextProvider>
      <LoadingProvider>
        <PopUpProvider>
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
              <div className="TopMargin">
                <PageRoutes />
              </div>
              <Toaster position="top-right" reverseOrder={false} />
              <Loading />
            </div>
          </>
        </PopUpProvider>
      </LoadingProvider>
    </MyContextProvider>
  );
}

export default App;

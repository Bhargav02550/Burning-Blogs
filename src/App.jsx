import "./App.css";
import MyContextProvider from "../src/ContextAPI/ContextAPI";
import { LoadingProvider } from "./ContextAPI/LoadingContext";
import Routes from "./Routes/Routes";
import Header from "./components/Header/Header";
import Loading from "./components/Loading/Loading";
import { Toaster } from "react-hot-toast"; 

function App() {
  return (
    <MyContextProvider>
      <LoadingProvider>
        <>
          <div>
            <Header />
            <div id="dropdown-container"></div>
            <Routes />
            <Toaster />
            <Loading />
          </div>
        </>
      </LoadingProvider>
    </MyContextProvider>
  );
}

export default App;

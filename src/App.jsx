import "./App.css";
import MyContextProvider from "./ContextAPI";
import Routes from "./Routes/Routes";
import Header from "./components/Header/Header";
//Importing routes to all pages from Routes folder using React router DOM

import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <MyContextProvider>
      <>
        <div>
          <Header />
          <Routes />
        </div>
      </>
    </MyContextProvider>
  );
}

export default App;

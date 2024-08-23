import "./App.css";
import Routes from "./Routes/Routes";
import Header from "./components/Header/Header";
//Importing routes to all pages from Routes folder using React router DOM

import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <div>
        <Header />
        <Routes />
      </div>
    </>
  );
}

export default App;

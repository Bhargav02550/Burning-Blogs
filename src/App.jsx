import "./App.css";
import Routes from "./Routes/Routes";
//Importing routes to all pages from Routes folder using React router DOM

import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes />
    </>
  );
}

export default App;

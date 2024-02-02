import "./App.css";
import MainDash from "./components/MainDash/MainDash";
import RightSide from "./components/RightSide/RightSide";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Products from "./components/Manu/Products";
import Order from "./components/Manu/Order";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="AppGlass ">
          <Sidebar />

          <Routes>
            <Route path="/" element={<MainDash />} />
            <Route path="/products" element={<Products />} />
            <Route path="/Orders/:id" element={<Order />} />
          </Routes>
          <RightSide />
        </div>{" "}
      </div>
    </BrowserRouter>
  );
}

export default App;

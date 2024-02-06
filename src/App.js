import "./App.css";
import MainDash from "./components/MainDash/MainDash";
import RightSide from "./components/RightSide/RightSide";
import { Routes, BrowserRouter, Route, redirect } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Products from "./components/Manu/Products";
import Order from "./components/Manu/details/Order";
import CustomerReview from "./components/CustomerReview/CustomerReview";
import RegistrationForm from "./components/Authentication/RegistrationForm ";
import LoginForm from "./components/Authentication/LoginForm";

function App() {
  return (
    <BrowserRouter>
      <redirect to="/Login" />
      <div className="App">
        <div className="AppGlass ">
          <Sidebar />
          <Routes>
            <Route path="/" element={<MainDash />} />
            <Route path="/products" element={<Products />} />
            <Route path="/Orders" element={<Order />} />
            <Route path="/Analytics" element={<CustomerReview />} />
            <Route path="/registration" element={<RegistrationForm />} />
            <Route path="/Login" element={<LoginForm />} />
          </Routes>
          <RightSide />
        </div>{" "}
      </div>
    </BrowserRouter>
  );
}

export default App;

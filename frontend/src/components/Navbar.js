import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./ContextReducer";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import Cookies from "js-cookie";

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const cart = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userEmail");
    navigate("/");
  };

  return (
    <div className=" pb-14">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-white no-underline text-decoration:none">
  FoodMonkey
</Link>
            <div className="hidden md:flex space-x-4 items-center">
              {Cookies.get("authToken") ? (
                <>
                  <button
                    onClick={() => setCartView(true)}
                    className="relative bg-white text-green-600 px-3 py-1 rounded-md hover:bg-green-100"
                  >
                    My Cart
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                      {cart.length}
                    </span>
                  </button>
                  {cartView && (
                    <Modal onClose={() => {
                      setCartView(false);
                      navigate('/');
                    }}>
                      <Cart />
                    </Modal>
                  )}

                  <Link to="/myorder" className="bg-white text-green-600 px-3 py-1 rounded-md hover:bg-green-100">
                    My Orders
                  </Link>
                  <button
                    onClick={logout}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    className={`px-3 py-1 rounded-md ${isHovered ? "bg-red-600 text-white" : "bg-white text-green-600"} transition`}
                  >
                    LogOut
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="bg-white text-green-600 px-3 py-1 rounded-md hover:bg-green-100 no-underline text-decoration:none">
                    Login
                  </Link>
                  <Link to="/signup" className="bg-white text-green-600 px-3 py-1 rounded-md hover:bg-green-100 no-underline text-decoration:none">
                    SignUp
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userEmail");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-white no-underline">
            FoodMonkey
          </Link>

          {/* Hamburger for mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
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
                <Link to="/login" className="bg-white text-green-600 px-3 py-1 rounded-md hover:bg-green-100">
                  Login
                </Link>
                <Link to="/signup" className="bg-white text-green-600 px-3 py-1 rounded-md hover:bg-green-100">
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-zinc-800 text-white">
          {Cookies.get("authToken") ? (
            <>
              <button
                onClick={() => {
                  setCartView(true);
                  setMenuOpen(false);
                }}
                className="w-full text-left bg-white text-green-600 px-3 py-1 rounded-md hover:bg-green-100"
              >
                My Cart ({cart.length})
              </button>
              <Link
                to="/myorder"
                onClick={() => setMenuOpen(false)}
                className="block bg-white text-green-600 px-3 py-1 rounded-md hover:bg-green-100"
              >
                My Orders
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="w-full text-left bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
              >
                LogOut
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block bg-white text-green-600 px-3 py-1 rounded-md hover:bg-green-100"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="block bg-white text-green-600 px-3 py-1 rounded-md hover:bg-green-100"
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      )}

      {/* Cart modal */}
      {cartView && (
        <Modal onClose={() => {
          setCartView(false);
          navigate('/');
        }}>
          <Cart onClose={() => {
            setCartView(false);
            navigate('/');
          }} />
        </Modal>
      )}
    </nav>
  );
}

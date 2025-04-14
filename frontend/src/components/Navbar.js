import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./ContextReducer";
import Badge from 'react-bootstrap/Badge'
import Modal from "../Modal";
import Cart from "../screens/Cart"

export default function Navbar() {

  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const cart = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate('/'); // Corrected from navigator('/') to navigate('/')
  };
  return (
    <div className="bg-black" style={{ paddingBottom: "54px" }}>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-black" >
        <div className="container-fluid">
          <Link className="navbar-brand me-auto" to="/">
            FoodMonkey
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-2 me-auto">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </div>

            <div className="d-flex">
              {localStorage.getItem("authToken") ? (
                <div>
                  <Link id="mycart" className="btn bg-white text-success mx-1" onClick={() => {
                    setCartView(true)
                  }}>
                    My Cart <Badge pill bg="danger">{cart.length}</Badge>
                  </Link>
                  {cartView ? <Modal onClose={() => {
                    setCartView(false)
                    navigate('/')
                  }}><Cart /> </Modal> : null}

                  <Link id="myorder" className="btn bg-white text-success mx-1" to="/myorder">
                    My Orders
                  </Link>
                  <button
                    className={`btn  mx-1 ${isHovered ? ' bg-danger text-white' : 'bg-white text-success'}`}
                    onClick={logout}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    LogOut
                  </button>
                </div>
              ) : (
                <div>
                  <Link id="logout" className="btn bg-white text-success mx-1" to="/login">
                    Login
                  </Link>
                  <Link id="signup" className="btn bg-white text-success mx-1" to="/signup">
                    SignUp
                  </Link>

                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

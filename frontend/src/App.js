import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp.js";
import { CartProvider } from "./components/ContextReducer.jsx";
import MyOrder from "./screens/MyOrder.js";

function App() {
  return (
    // Router has routes
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route exact path="/login" element={<Login />} />

            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/myorder" element={<MyOrder />} />

          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

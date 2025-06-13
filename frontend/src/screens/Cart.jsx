import React from "react";
import { useCart, useDispatch } from "../components/ContextReducer";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

export default function Cart() {
  let navigate = useNavigate();
  let data = useCart();
  let dispatch = useDispatch();

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen mx-auto my-5 p-5 bg-white shadow-lg rounded-lg">
        <div className="text-2xl font-semibold text-center">The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    try {
      let userEmail = Cookies.get("userEmail");
      console.log(userEmail);
      await fetch(process.env.REACT_APP_LINK + "/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          orderDate: new Date().toLocaleDateString(),
        }),
      });
      dispatch({ type: "DROP" });
      navigate('/');
    } catch (error) {
      console.log("Error in fetching data");
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="container min-h-screen mx-auto my-5 p-5 bg-white shadow-lg rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead className="text-green-600 text-lg font-semibold">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Option</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
         
          <tbody className="text-gray-700">
            {data.map((food, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{food.name}</td>
                <td className="px-4 py-2">{food.qty}</td>
                <td className="px-4 py-2">{food.size}</td>
                <td className="px-4 py-2">₹{food.price}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-5 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Total Price: ₹{totalPrice}/-</h1>
        <button
          className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
          onClick={handleCheckOut}
        >
          Check Out
        </button>
      </div>
    </div>
  );
}

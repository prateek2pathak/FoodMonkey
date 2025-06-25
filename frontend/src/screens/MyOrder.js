import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";

export default function MyOrder() {

    const [orderData, setOrderData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage =Math.min(5,orderData.length);
    const navigate = useNavigate();

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orderData.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orderData.length / ordersPerPage);

    useEffect(() => {
        const loadData = async () => {
            try {
                const userEmail = Cookies.get('userEmail');
                let response = await fetch(process.env.REACT_APP_LINK + "/api/getorderdata", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: userEmail })
                });
                let data = await response.json();
                setOrderData(data);
                console.log(data);
            } catch (error) {
                console.log('Error in fetching orders data', error);
            }
        }
        loadData();
    }, []);

    return (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <Navbar />
    <div className="max-w-6xl mx-auto mt-10 px-4">
      {currentOrders.length === 0 ? (
        <div className="h-96 flex flex-col justify-center items-center text-center">
          <svg
            className="w-20 h-20 text-gray-400 dark:text-gray-600 mb-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M10 21h4"
            />
          </svg>
          <h2 className="text-xl font-semibold">No Orders Found</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Looks like you haven't placed any orders yet.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded-lg">
              <thead className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-lg">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Order Date</th>
                  <th className="px-4 py-3 text-left">Order</th>
                  <th className="px-4 py-3 text-left">Quantity</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Size</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((orderArray, index) => {
                  const orderMeta = orderArray[0];
                  const orderItems = orderArray.slice(1);

                  return (
                    <React.Fragment key={index}>
                      {orderItems.map((order, itemIndex) => (
                        <tr
                          key={itemIndex}
                          className="border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          {itemIndex === 0 && (
                            <>
                              <td rowSpan={orderItems.length} className="px-4 py-3 align-top">
                                {indexOfFirstOrder + index + 1}
                              </td>
                              <td rowSpan={orderItems.length} className="px-4 py-3 align-top">
                                {orderMeta.OrderDate}
                              </td>
                            </>
                          )}
                          <td className="px-4 py-3">{order.name}</td>
                          <td className="px-4 py-3">{order.qty}</td>
                          <td className="px-4 py-3">{order.price}</td>
                          <td className="px-4 py-3">{order.size}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  </div>
);

}

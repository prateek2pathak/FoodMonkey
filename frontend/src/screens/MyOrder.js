import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie"

export default function MyOrder() {

    const [orderData, setOrderData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

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
            <div className="max-w-6xl mx-auto mt-10 px-4 overflow-x-auto">
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
                                            key={order.id}
                                            className="border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            {itemIndex === 0 && (
                                                <>
                                                    <td
                                                        rowSpan={orderItems.length}
                                                        className="px-4 py-3 align-top"
                                                    >
                                                        {indexOfFirstOrder + index + 1}
                                                    </td>
                                                    <td
                                                        rowSpan={orderItems.length}
                                                        className="px-4 py-3 align-top"
                                                    >
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

                {/* Pagination */}
                <div className="flex justify-center mt-6 gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 rounded-lg ${currentPage === i + 1
                                ? "bg-green-600 text-white"
                                : "bg-gray-200 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

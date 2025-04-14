import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    const userEmail = localStorage.getItem('userEmail');

    const loadData = async () => {
        try {
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

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <Navbar></Navbar>
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
                <table className="table table-hover">
                    <thead className="text-success fs-4">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Order Date</th>
                            <th scope="col">Order</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData.map((orderArray, index) => {
                            const orderMeta = orderArray[0];
                            const orderItems = orderArray.slice(1); // Slice from the second element to get order items

                            return (
                                <React.Fragment key={index}>
                                    {orderItems.map((order, itemIndex) => (
                                        <tr key={order.id}>
                                            {itemIndex === 0 && (
                                                <>
                                                    <td rowSpan={orderItems.length} scope="row">{index + 1}</td>
                                                    <td rowSpan={orderItems.length}>{orderMeta.OrderDate}</td>
                                                </>
                                            )}
                                            <td>{order.name}</td>
                                            <td>{order.qty}</td>
                                            <td>{order.price}</td>
                                            <td>{order.size}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

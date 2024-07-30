import Sidebar from "@/components/Admin/Admin-Sidebar";
import Buttons from "@/components/Admin/Buttons";
import { orders } from "@/lib/orders";
import React, { useState } from "react";

const viewOrders = () => {
  const [orderList, setOrderList] = useState(orders);

  const handleStatusChange = (id) => {
    setOrderList((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: "done" } : order
      )
    );
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="py-10 px-16 bg-gray-100 flex-grow">
        <h1 className="text-black font-bold text-2xl pb-6">Orders</h1>
        <table className="bg-white text-black w-full shadow-lg text-center">
          <thead>
            <tr>
              <th className="p-3 border border-gray-300">Order ID</th>
              <th className="p-3 border border-gray-300">Created</th>
              <th className="p-3 border border-gray-300">Price</th>
              <th className="p-3 border border-gray-300">Method</th>
              <th className="p-3 border border-gray-300">Transaction ID</th>
              <th className="p-3 border border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order.id}>
                <td className="p-3 border ">{order.id}</td>
                <td className="p-3 border ">{order.created}</td>
                <td className="p-3 border "> {order.price}</td>
                <td className="p-3 border">{order.method}</td>
                <td className="p-3 border">{order.transactionId}</td>
                <td className="p-3 border">
                  <Buttons
                    color={"green"}
                    text={order.status}
                    textColor={"white"}
                    padding={"1px 4px"}
                    bRadius={"5px"}
                    onClick = {() => handleStatusChange(order.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default viewOrders;

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Admin/Admin-Sidebar";
import Buttons from "@/components/Admin/Buttons";
import { useFetchAllOrdersQuery } from "@/store/slices/api/orderApiSlice";

const ViewOrders = () => {
  const { data } = useFetchAllOrdersQuery();
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    if (data) {
      setOrderList(data.orders);
    }
  }, [data]);

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
              <th className="p-3 border border-gray-300">Payment</th>
              <th className="p-3 border border-gray-300">Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order.id}>
                <td className="p-3 border ">{order._id}</td>
                <td className="p-3 border ">{order.createdAt}</td>
                <td className="p-3 border "> {order.totalAmount}</td>
                <td className="p-3 border">{order.paymentMethod}</td>
                <td className="p-3 border">
                  {order.paymentResult.transactionID}
                </td>
                <td className="p-3 border">
                  <Buttons
                    color={"green"}
                    text={order.paymentResult.status}
                    textColor={"white"}
                    padding={"1px 4px"}
                    bRadius={"5px"}
                    onClick={() => handlePaymentStatus(order.id)}
                  />
                </td>
                <td className="p-3 border">
                  <Buttons
                    color={"green"}
                    text={order.deliveryStatus}
                    textColor={"white"}
                    padding={"1px 4px"}
                    bRadius={"5px"}
                    onClick={() => handleDeliveryStatus(order.id)}
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

export default ViewOrders;

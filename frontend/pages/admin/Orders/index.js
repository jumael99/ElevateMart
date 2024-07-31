import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/Admin/Admin-Sidebar";
import Buttons from "@/components/Admin/Buttons";
import { useFetchAllOrdersQuery } from "@/store/slices/api/orderApiSlice";

const ViewOrders = () => {
  const { data } = useFetchAllOrdersQuery();
  const [orderList, setOrderList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setOrderList(data.orders);
    }
  }, [data]);

  const handleDeliveryStatus = (id, status) => {
    setOrderList((prevOrders) =>
      prevOrders.map((order) =>
        order._id === id ? { ...order, deliveryStatus: status } : order
      )
    );
  };

  const orderDetails = (id) => {
    router.push(`/admin/Orders/${id}`);
  };

  const deliveryStatuses = [
    "Initiated",
    "Processing",
    "On-Hold",
    "Shipped",
    "Delivered",
  ];

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
              <tr className="cursor-pointer hover:bg-gray-300">
                <td
                  className="p-3 border"
                  key={order._id}
                  onClick={() => orderDetails(order._id)}
                >
                  {order._id}
                </td>
                <td
                  className="p-3 border"
                  key={order._id}
                  onClick={() => orderDetails(order._id)}
                >
                  {order.createdAt}
                </td>
                <td
                  className="p-3 border"
                  key={order._id}
                  onClick={() => orderDetails(order._id)}
                >
                  {" "}
                  {order.totalAmount}
                </td>
                <td
                  className="p-3 border"
                  key={order._id}
                  onClick={() => orderDetails(order._id)}
                >
                  {order.paymentMethod}
                </td>
                <td
                  className="p-3 border"
                  key={order._id}
                  onClick={() => orderDetails(order._id)}
                >
                  {order.paymentResult.transactionID}
                </td>
                <td
                  className="p-3 border font-bold"
                  style={{
                    color:
                      order.paymentResult.status === "Failed" ? "red" : "green",
                  }}
                >
                  {order.paymentResult.status}
                </td>
                <td className="p-3 border font-bold">
                  <select
                    className="border p-1"
                    value={order.deliveryStatus}
                    onChange={(e) =>
                      handleDeliveryStatus(order._id, e.target.value)
                    }
                    style={{
                      backgroundColor: ["Initiated", "On-Hold"].includes(
                        order.deliveryStatus
                      )
                        ? "yellow"
                        : "green",
                      color: ["Initiated", "On-Hold"].includes(
                        order.deliveryStatus
                      )
                        ? "black"
                        : "white",
                    }}
                  >
                    {deliveryStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
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

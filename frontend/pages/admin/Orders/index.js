import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/Admin/Admin-Sidebar";
import {
  useFetchAllOrdersQuery,
  useUpdateDeliveryStatusMutation,
} from "@/store/slices/api/orderApiSlice";
import { toastManager } from "@/utils/toastManager";
import { withAuth } from "@/utils/withAuth";
import { formatToBangladeshDate } from "@/utils/formatDate";

const ViewOrders = () => {
  const router = useRouter();
  const { query } = router;
  const params = query.user;
  const { data } = useFetchAllOrdersQuery({ params });
  const [orderList, setOrderList] = useState([]);
  const [updateDeliveryStatus] = useUpdateDeliveryStatusMutation();

  useEffect(() => {
    if (data) {
      setOrderList(data.orders);
    }
  }, [data]);

  const updateOrderList = (id, status) => {
    setOrderList((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, deliveryStatus: status } : order
      )
    );
  };

  const handleDeliveryStatus = async (id, status, pay_status) => {
    const toastId = toastManager.loading("Updating delivery status...");
    if (pay_status === "Failed" || pay_status === "Pending") {
      toastManager.updateStatus(toastId, {
        render:
          "Payment status is failed. You cannot update the delivery status",
        type: "error",
      });
      return;
    }
    if (status === "Initiated") {
      toastManager.updateStatus(toastId, {
        render: "Delivery status cannot be initiated",
        type: "error",
      });
      return;
    }
    try {
      await updateDeliveryStatus({
        orderID: id,
        deliveryStatus: status,
      }).unwrap();
      toastManager.updateStatus(toastId, {
        render: "Delivery status updated successfully",
        type: "success",
      });
      updateOrderList(id, status);
    } catch (error) {
      toastManager.updateStatus(toastId, {
        render: error.message || "Failed to update delivery status",
        type: "error",
      });
    }
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
              <tr
                key={order._id}
                className={`cursor-pointer hover:bg-gray-300 ${
                  order.deliveryStatus === "Shipped"
                    ? "bg-green-200"
                    : order.deliveryStatus === "Delivered"
                    ? "bg-green-300"
                    : order.deliveryStatus === "On-Hold"
                    ? "bg-red-200"
                    : null
                }`}
              >
                <td
                  className="p-3 border"
                  onClick={() => orderDetails(order._id)}
                >
                  {order._id}
                </td>
                <td
                  className="p-3 border"
                  onClick={() => orderDetails(order._id)}
                >
                  {formatToBangladeshDate(order.createdAt)}
                </td>
                <td
                  className="p-3 border"
                  onClick={() => orderDetails(order._id)}
                >
                  {" "}
                  {order.totalAmount}
                </td>
                <td
                  className="p-3 border"
                  onClick={() => orderDetails(order._id)}
                >
                  {order.paymentMethod}
                </td>
                <td
                  className="p-3 border"
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
                    className="border p-1 px-4"
                    disabled={
                      order.deliveryStatus === "Delivered" ||
                      order.deliveryStatus === "Initiated" ||
                      order.paymentResult.status === "Failed"
                    }
                    value={order.deliveryStatus}
                    onChange={(e) =>
                      handleDeliveryStatus(
                        order._id,
                        e.target.value,
                        order.paymentResult.status
                      )
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
                      <option key={`${status}-${order._id}`} value={status}>
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

export default withAuth(ViewOrders, {
  requireLogin: true,
  requireAdmin: true,
});

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useFetchMyOrdersQuery } from "../../store/slices/api/orderApiSlice";
import { useState } from "react";

const OrderPage = () => {
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.user);
  const { data, error, isLoading } = useFetchMyOrdersQuery();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter orders based on search term
  const filteredOrders =
    data?.orders?.filter((order) =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-extrabold mb-6">My Orders</h1>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Order ID"
          className="border border-gray-300 rounded-lg p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="text-center text-gray-600">Loading orders...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error loading orders.</div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center text-gray-600">No orders found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 border-b text-left">Order ID</th>
                <th className="py-3 px-4 border-b text-left">Total Amount</th>
                <th className="py-3 px-4 border-b text-left">
                  Delivery Status
                </th>
                <th className="py-3 px-4 border-b text-left">
                  Shipping Address
                </th>
                <th className="py-3 px-4 border-b text-left">Order Items</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 border-b">{order._id}</td>
                  <td className="py-4 px-4 border-b">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 border-b">{order.deliveryStatus}</td>
                  <td className="py-4 px-4 border-b">
                    {order.shippingAddress}
                  </td>
                  <td className="py-4 px-4 border-b">
                    <ul className="list-none p-0 m-0">
                      {order.orderItems.map((item, index) => (
                        <li key={index} className="border-b py-2">
                          <p className="text-sm font-semibold">
                            Item ID: {item._id}
                          </p>
                          <p className="text-sm">Quantity: {item.quantity}</p>
                          <p className="text-sm">
                            Price: ${item.price.toFixed(2)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderPage;

import Sidebar from "@/components/Admin/Admin-Sidebar";
import { useFetchOrderByIdQuery } from "@/store/slices/api/orderApiSlice";
import React from "react";
import { useRouter } from "next/router";

const OrderDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, error } = useFetchOrderByIdQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-10 bg-gray-100 flex-grow">
        <h1 className="text-black font-bold text-2xl pb-6">Order Details</h1>
        <div className="flex gap-2">
          <div className="bg-white w-2/3 shadow-lg p-6 rounded-lg">
            <div className="bg-slate-700 p-5 ">
              <p className="text-2xl font-bold">Order#{data._id}</p>
              <p>{data.createdAt}</p>
            </div>
            <div className="pt-10 px-12">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-gray-500">
                    <th className="px-3">Item</th>
                    <th className="px-3 ">Quantity</th>
                    <th className="px-3 ">Rate</th>
                    <th className="px-3 ">Amount</th>
                  </tr>
                </thead>
                <tbody>
                    <tr className="border-b text-gray-600 ">
                        <td className="p-3 ">
                            Image
                            pen
                            </td>
                        <td className="p-3 ">pen</td>
                        <td className="p-3 ">pen</td>
                        <td className="p-3 ">pen</td>
                    </tr>
                </tbody>
              </table>
              <div className="flex justify-between">
              <p className="text-gray-500 font-bold pt-10 pb-5">Payment Method:<span className="text-gray-600 ps-3">{data.paymentMethod}</span></p>
              <p className="text-gray-500 font-bold pt-10 pe-6">Total:<span className="text-gray-600 ps-3">{data.totalAmount} BDT</span></p>
              </div>
              <p className="text-gray-600 pb-3">Transaction ID:<span className="text-gray-600 ps-3">{data.paymentResult}</span></p>
            </div>
          </div>
          <div className="flex w-2/3 gap-2 xl:w-1/3 xl:flex-wrap">
            <div className="bg-white text-black w-full shadow-lg p-6 mb-2 rounded-lg">
                <h2 className="text-gray-600 font-bold text-lg py-2">Payment Status:</h2>
                <p className="text-gray-500 pb-2">{data.paymentResult}</p>
                <h2 className="text-gray-600 font-bold text-lg py-2">Delivery Status:</h2>
                <p className="text-gray-500 pb-2">{data.deliveryStatus}</p>
            </div>
            <div className="bg-white text-black w-full shadow-lg p-6 rounded-lg">
                <p className="text-gray-500">Customer Details</p>
                <p className="text-gray-500 font-bold">Name</p>
                <p className="text-gray-500 ">Phone</p>
                <p className="text-gray-500">Email</p>
                <p className="text-gray-500">{data.shippingAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

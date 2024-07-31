import Image from "next/image";
import React from "react";

const OrderDetails = () => {

  return (
      <div className="py-16 px-20 bg-gray-100 h-screen">
        <h1 className="text-black font-bold text-2xl pb-6">Thank you for your order!</h1>
        <div className="flex gap-2 sm:flex-wrap xl:flex-nowrap">
          <div className="bg-white w-2/3 shadow-lg p-6 rounded-lg">
            <div className="bg-slate-700 p-5 ">
              <p className="text-2xl font-bold">Order Details</p>
              <p>date</p>
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
                        <td className="p-3">
                            image
                            pen
                            </td>
                        <td className="p-3 ">pen</td>
                        <td className="p-3 ">pen</td>
                        <td className="p-3 ">pen</td>
                    </tr>
                </tbody>
              </table>
              <div className="flex justify-between">
              <p className="text-gray-500 font-bold pt-10 pb-5">Payment Method:<span className="text-gray-600 ps-3">paymentMethod</span></p>
              <p className="text-gray-500 font-bold pt-10 pe-6">Total:<span className="text-gray-600 ps-3">totalAmount BDT</span></p>
              </div>
              <p className="text-gray-600 pb-3">Transaction ID:<span className="text-gray-600 ps-3">transactionID</span></p>
            </div>
          </div>
          <div className="flex w-2/3 gap-2 xl:w-1/3 xl:flex-wrap">
            <div className="bg-white text-black w-full shadow-lg p-6 mb-2 rounded-lg">
                <h2 className="text-gray-600 font-bold text-lg py-2">Payment Status:</h2>
                <p className="text-gray-500 pb-2">paymentStatus</p>
                <h2 className="text-gray-600 font-bold text-lg py-2">Delivery Status:</h2>
                <p className="text-gray-500 pb-2">deliveryStatus</p>
            </div>
            <div className="bg-white text-black w-full shadow-lg p-6 rounded-lg">
                <p className="text-gray-500">Customer Details</p>
                <p className="text-gray-500 font-bold">Name</p>
                <p className="text-gray-500 ">Phone</p>
                <p className="text-gray-500">Email</p>
                <p className="text-gray-500">Shipping Address</p>
            </div>
          </div>
        </div>
      </div>

  );
};

export default OrderDetails;

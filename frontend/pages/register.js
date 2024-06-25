import React, { useState } from "react";

export default function register() {

    return (
        <div className="min-h-screen flex flex-col justify-center items-center sm:px-6 lg:px-8 text-blue-600 ">
            <div className="sm:mx-auto ms:w-full sm:max-w-md mb-5">
                <h1 className="text-2xl sm:text-3xl font-semibold">Register to your acccount</h1>
            </div>

            <div className="bg-gray-200 shadow-lg w-80 sm:w-96 p-8 rounded-lg">
                <form onSubmit={""} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-lg font-semibold mb-2">
                            Name:
                        </label>
                        <input
                            type="text"
                            name="text"
                            autoComplete="name"
                            required
                            placeholder="Enter your name..."
                            //onChange={(e) => setName(e.target.value)}
                            className="block border border-blue-600 w-full p-2 rounded-md shadow-sm placeholde-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:border-2 sm:text-lg font-semibold text-blue-600"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-lg font-semibold mb-2">
                            Phone:
                        </label>
                        <input
                            type="tel"
                            name="mobile"
                            placeholder="Enter your mobile number..."
                            autoComplete="mobile"
                            required
                            //onChange={(e) => setMobile(e.target.value)}
                            className="block border border-blue-600 w-full p-2 rounded-md shadow-sm placeholde-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:border-2 sm:text-lg font-semibold text-blue-600"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-lg font-semibold mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            required
                            placeholder="your@email.com"
                            //onChange={(e) => setEmail(e.target.value)}
                            className="block border border-blue-600 w-full p-2 rounded-md shadow-sm placeholde-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:border-2 sm:text-lg font-semibold text-blue-600"
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="address" className="block text-lg font-semibold mb-2">
                            Address:
                        </label>
                        <input
                            type="address"
                            name="address"
                            autoComplete="address"
                            required
                            placeholder="Enter your address..."
                            //onChange={(e) => setAddress(e.target.value)}
                            className="block border border-blue-600 w-full p-2 rounded-md shadow-sm placeholde-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:border-2 sm:text-lg font-semibold text-blue-600"
                        />
                    </div>
                    <div>
                        <button type="submit" className="group relative w-full justify-center py-2 px-4 border border-transparent text-lg font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-500 mt-5">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

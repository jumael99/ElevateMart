import { set } from "mongoose";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function verify() {
    const [visible, setVisible] = useState(false);
    const [showOtp, setshowOtp]= useState(true);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center sm:px-6 lg:px-8 text-blue-600">
            <div className="sm:mx-auto ms:w-full sm:max-w-md mb-5">
                <h1 className="text-2xl sm:text-3xl font-semibold">
                    {showOtp ? "OTP" : "Set password to your account"}
                </h1>
            </div>

            <div className="bg-gray-200 shadow-lg w-80 sm:w-96 p-8 rounded-lg">
                {showOtp ? (
                    <form onSubmit={""} className="space-y-4">
                        <div className="relative">
                            <div>
                                <label htmlFor="otp" className="block text-lg font-semibold mb-2">
                                    OTP:
                                </label>
                                <input
                                    type="tel"
                                    name="otp"
                                    placeholder="Enter your otp number..."
                                    autoComplete="otp"
                                    required
                                    //onChange={(e) => setMobile(e.target.value)}
                                    className="block border border-blue-600 w-full p-2 rounded-md shadow-sm placeholde-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:border-2 sm:text-lg font-semibold text-blue-600"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full justify-center py-2 px-4 border border-transparent text-lg font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-500 mt-5"
                                onClick={() => setshowOtp(false)}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={""} className="space-y-4">
                        <div className="relative">
                            <label htmlFor="password" className="block text-lg font-semibold mb-2">
                                Password:
                            </label>
                            <input
                                type={visible ? "text" : "password"}
                                name="password"
                                autoComplete="password"
                                required
                                placeholder="Enter your password..."
                                //onChange={(e) => setPassword(e.target.value)}
                                className="block border border-blue-600 w-full p-2 rounded-md shadow-sm placeholde-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:border-2 sm:text-lg font-semibold text-blue-600"
                            />
                            {visible ? (
                                <AiOutlineEye
                                    size={25}
                                    className="text-blue-600 cursor-pointer absolute  sm:left-[18rem] sm:top-[3.2rem]"
                                    onClick={() => setVisible(false)}
                                />
                            ) : (
                                <AiOutlineEyeInvisible
                                    className="text-blue-600 cursor-pointer absolute left-[14rem] top-[3rem] sm:left-[18rem] sm:top-[3.2rem]"
                                    size={25}
                                    onClick={() => setVisible(true)}
                                />
                            )}
                        </div>
                        <div className="relative">
                            <label
                                htmlFor="confirmpass"
                                className="block text-lg font-semibold mb-2"
                            >
                                Confirm Password:
                            </label>
                            <input
                                type={visible ? "text" : "password"}
                                name="confirmpass"
                                placeholder="Confirm your password..."
                                autoComplete="confirmpass"
                                required
                                //onChange={(e) => setMobile(e.target.value)}
                                className="block border border-blue-600 w-full p-2 rounded-md shadow-sm placeholde-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:border-2 sm:text-lg font-semibold text-blue-600"
                            />
                            {visible ? (
                                <AiOutlineEye
                                    size={25}
                                    className="text-blue-600 cursor-pointer absolute left-[14rem] top-[3rem] sm:left-[18rem] sm:top-[3rem]"
                                    onClick={() => setVisible(false)}
                                />
                            ) : (
                                <AiOutlineEyeInvisible
                                    className="text-blue-600 cursor-pointer absolute left-[14rem] top-[3rem] sm:left-[18rem] sm:top-[3rem]"
                                    size={25}
                                    onClick={() => setVisible(true)}
                                />
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full justify-center py-2 px-4 border border-transparent text-lg font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-500 mt-5"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

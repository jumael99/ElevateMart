import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Axios from "axios";
import { useRouter } from "next/router";

export default function verify() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [showOtp, setshowOtp] = useState(true);
  const { email } = router.query;

  // Check if the user is verified and if the password is set
  // If the user is verified and the password is set, redirect the user to the home page
  // If the user is verified, show the password form
  // If the user is not verified, show the OTP form
  useEffect(() => {
    const fetchData = async () => {
      if (!email) return;
      try {
        const res = await Axios.get(
          `http://localhost:5001/api/v1/auth/verify/${email}`
        );

        if (res.data.status === "success") {
          if (res.data.message === "User Verified and Password Set") {
            alert("User verified and password set");
            router.push("/");
          }
          if (res.data.message === "User Verified") {
            setshowOtp(false);
          }
        }
      } catch (error) {
        console.log(error);
        alert(error.response?.data?.message || "An error occurred");
      }
    };

    fetchData();
  }, [email]);

  // Handle the OTP form submission
  const handleSubmitFormOne = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(e.target);
    const otp = formData.get("otp");
    console.log(email);

    const data = {
      otp,
    };

    try {
      const res = await Axios.post(
        `http://localhost:5001/api/v1/auth/verify/${email}`,
        data,
        { withCredentials: true }
      );
      alert("OTP verified successfully");
      console.log(res);
      form.reset();
      setshowOtp(false);
    } catch (error) {
      console.log(error);

      alert(error.response.data.message);
    }
  };

  // Handle the password form submission
  const handleSubmitFormTwo = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(e.target);
    const password = formData.get("password");
    const confirmpass = formData.get("confirmpass");

    if (password !== confirmpass) {
      alert("Passwords do not match");
      return;
    }

    const data = {
      password,
      confirmPassword: confirmpass,
    };

    try {
      const res = await Axios.post(
        `http://localhost:5001/api/v1/auth/verify/${email}/password`,
        data,
        { withCredentials: true }
      );
      alert("Password reset successfully");
      form.reset();
      router.push("/");
    } catch (error) {
      console.log(error);

      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center sm:px-6 lg:px-8 text-blue-600">
      <div className="sm:mx-auto ms:w-full sm:max-w-md mb-5">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          {showOtp ? "OTP" : "Set password to your account"}
        </h1>
      </div>

      <div className="bg-gray-200 shadow-lg w-80 sm:w-96 p-8 rounded-lg">
        {showOtp ? (
          <form onSubmit={handleSubmitFormOne} className="space-y-4">
            <div className="relative">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-lg font-semibold mb-2"
                >
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
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmitFormTwo} className="space-y-4">
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-lg font-semibold mb-2"
              >
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

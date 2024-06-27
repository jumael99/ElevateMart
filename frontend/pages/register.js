import React, { useState } from "react";
import Axios from "axios";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";

export default function register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formObject = validate(e, setError);
    if (!formObject) {
      return;
    }

    const url = "http://localhost:5001/api/auth/register";

    try {
      const res = await Axios.post(url, formObject);
      alert("User registered successfully");
      form.reset();
    } catch (error) {
      console.log(error);
      alert("An error occurred");
    }
  }

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://freepnglogo.com/images/all_img/1691819865alight-motion-logo-transparent.png"
            alt="elevateMart logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="string"
                  autoComplete="full-name"
                  placeholder="Enter your full name"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 focus:outline-none"
                />
              </div>

              {error.name && (
                <div className="px-4 py-2 text-xs text-red-800 rounded-lg bg-red-50">
                  Full name is required!
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 focus:outline-none"
                />
              </div>
              {error.email && (
                <div className="px-4 py-2 text-xs text-red-800 rounded-lg bg-red-50">
                  Input a valid Email Address.
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <div className="flex justify-between items-center px-3  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="password"
                    placeholder="Enter a password"
                    className="block focus:ring-transparent focus:outline-none w-full"
                  />
                  <div
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? <FaEye /> : <IoEyeOffSharp />}
                  </div>
                </div>
                {error.password && Object.keys(error.password).length > 0 && (
                  <div className="px-4 py-2 text-xs text-red-800 rounded-lg bg-red-50">
                    <ul className="list-disc list-inside">
                      {Object.values(error.password).map((err, index) => (
                        <li key={index} className="px-2">
                          {err}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password Confirm
              </label>
              <div className="mt-2">
                <div className="flex justify-between items-center px-3  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                  <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type={showConfirmPass ? "text" : "password"}
                    autoComplete="password"
                    placeholder="Enter a password"
                    className="block focus:ring-transparent focus:outline-none w-full"
                  />
                  <div
                    onClick={() => {
                      setShowConfirmPass(!showConfirmPass);
                    }}
                  >
                    {showConfirmPass ? <FaEye /> : <IoEyeOffSharp />}
                  </div>
                </div>
                {error.passwordConfirm && (
                  <div className="px-4 py-2 text-xs text-red-800 rounded-lg bg-red-50">
                    Password and confirm password do not match.
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="string"
                  autoComplete="mobile-number"
                  placeholder="Enter your your mobile number"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 focus:outline-none"
                />
              </div>
              {error.mobile && (
                <div className="px-4 py-2 text-xs text-red-800 rounded-lg bg-red-50">
                  Phone number is required!
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="address"
                  autoComplete="address"
                  placeholder="Enter your address"
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account? &nbsp;
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

const validate = (e, setError) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(e.target);
  const name = formData.get("name");
  const mobile = formData.get("phone");
  const email = formData.get("email");
  const address = formData.get("address");
  const password = formData.get("password");
  const passwordConfirm = formData.get("passwordConfirm");

  let errorObj = {};
  if (!name) {
    errorObj = { ...errorObj, name: "Full name is required" };
  }

  if (validateEmail(email) !== "") {
    errorObj = { ...errorObj, email: validateEmail(email) };
  }

  if (Object.keys(validatePassword(password)).length !== 0) {
    errorObj = { ...errorObj, password: validatePassword(password) };
  }

  if (!mobile) {
    errorObj = { ...errorObj, mobile: "Mobile number is required" };
  }

  if (password !== passwordConfirm) {
    errorObj = { ...errorObj, passwordConfirm: "Passwords do not match" };
  }

  if (Object.keys(errorObj).length > 0) {
    setError(errorObj);
    return;
  }

  setError({});
  const formObject = {
    name,
    phone: mobile,
    email,
    address,
    password,
  };
  return formObject;
};

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email.length === 0) {
    return "Email is required";
  }
  if (!emailRegex.test(email)) {
    return "Invalid email address";
  }
  return "";
};

const validatePassword = (password) => {
  let passwordError = {};
  const allowedSpecialCharacters = /[!@#$%^&*\-+?]+/;

  if (password.length === 0) {
    passwordError = { ...passwordError, main: "Password is required" };
    return passwordError;
  }
  if (password.length < 8) {
    passwordError = {
      ...passwordError,
      len: "Password must be atleast 8 characters long",
    };
  }
  if (!/[a-zA-Z]/.test(password)) {
    passwordError = {
      ...passwordError,
      letter: "Password must contain a letter",
    };
  }
  if (!/\d/.test(password)) {
    passwordError = {
      ...passwordError,
      number: "Password must contain a number",
    };
  }
  if (
    !allowedSpecialCharacters.test(password) ||
    /[^a-zA-Z0-9!@#$%^&*\-+?]/.test(password)
  ) {
    passwordError = {
      ...passwordError,
      special: "Password must contain a special character",
    };
  }
  return passwordError;
};

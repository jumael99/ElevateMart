import { useRouter } from "next/router";
import { React, useState } from "react";

const Profile = () => {
  const router = useRouter();

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/profile/view");
  };

  return (
    <div className="flex flex-col items-center px-10 py-6 bg-gray-100 min-h-screen">
      <h1 className="text-gray-700 text-3xl font-semibold pb-3 text-center">
        Edit Profile
      </h1>
      {/* form */}
      <form
        className="bg-white border rounded-lg p-8 max-w-lg"
        onSubmit={handleSubmit}
      >
        <h3 className="text-gray-600 text-lg font-bold pb-3">
          General Information
        </h3>
        <div className="flex gap-5 flex-wrap">
          <div className="flex-grow">
            <label htmlFor="fname" className="py-2 block text-gray-600">
              First Name
            </label>
            <input
              id="fname"
              name="fname"
              type="string"
              placeholder=" Enter your first name "
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="flex-grow">
            <label htmlFor="lname" className="py-2 block text-gray-600">
              Last Name
            </label>
            <input
              id="lname"
              name="lname"
              type="string"
              placeholder="Also your last name"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex gap-5 flex-wrap">
          <div className="flex-grow">
            <label htmlFor="bday" className="py-2 block text-gray-600">
              Birthday
            </label>
            <input
              id="bday"
              name="bday"
              type="date"
              className="text-black w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setBrithday(e.target.value)}
              required
            />
          </div>
          <div className="flex-grow">
            <label htmlFor="gender" className="py-2 block text-gray-600">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full py-2 px-8 text-black border border-gray-300 rounded"
              onChange={handleGenderChange}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="flex gap-5 flex-wrap">
          <div className="flex-grow">
            <label htmlFor="email" className="py-2 block text-gray-600">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex-grow">
            <label htmlFor="phone" className="py-2 block text-gray-600">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="number"
              placeholder="+8801*********"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
        </div>

        <h3 className="text-gray-600 text-lg font-bold pt-6">Address</h3>
        <div className="flex gap-5 flex-wrap">
          <div className="flex-grow">
            <label htmlFor="address" className="py-2 block text-gray-600">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="string"
              placeholder="  Enter your home address "
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className=" flex-wrap">
            <label htmlFor="number" className="py-2 block text-gray-600">
              Number
            </label>
            <input
              id="number"
              name="number"
              type="string"
              placeholder=" No. "
              className="w-full p-2 border border-gray-300 rounded text-black"
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex gap-5 flex-wrap">
          <div className="flex-grow">
            <label htmlFor="city" className="py-2 block text-gray-600">
              City
            </label>
            <input
              id="city"
              name="city"
              type="string"
              placeholder=" City "
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="flex-grow">
            <label htmlFor="zip" className="py-2 block text-gray-600">
              ZIP
            </label>
            <input
              id="zip"
              name="zip"
              type="number"
              placeholder="ZIP "
              className="w-full p-2  border border-gray-300 rounded"
              onChange={(e) => setZip(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="my-4 p-2 bg-gray-900 text-white font-bold rounded hover:bg-gray-600"
        >
          Save All
        </button>
      </form>
    </div>
  );
};

export default Profile;

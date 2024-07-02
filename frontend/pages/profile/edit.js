import { useRouter } from "next/router";
import {React, useEffect, useState} from "react";
import axios from "axios";

const Profile = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/profile');
        setUserData(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setAddress(response.data.address);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5001/api/profile', {
        name,
        email,
        phone,
        address
      });
      if (response.status === 200) {
        await router.push("/profile/view");
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/profile');
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
      <div className="text-black flex flex-col items-center px-10 py-6 bg-gray-100 min-h-screen">
        <h1 className="text-gray-700 text-3xl font-semibold pb-3 text-center">
          Edit Profile
        </h1>
        <form
            className="bg-white border rounded-lg p-8 max-w-lg w-full"
            onSubmit={handleSubmit}
        >
          <h3 className="text-gray-600 text-lg font-bold pb-3">
            General Information
          </h3>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 mb-2">
              Name
            </label>
            <input
                value={name}
                id="name"
                name="name"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setName(e.target.value)}
                required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email
            </label>
            <input
                value={email}
                id="email"
                name="email"
                type="email"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setEmail(e.target.value)}
                required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-600 mb-2">
              Phone
            </label>
            <input
                value={phone}
                id="phone"
                name="phone"
                type="tel"
                placeholder="+8801*********"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setPhone(e.target.value)}
                required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-600 mb-2">
              Address
            </label>
            <input
                value={address}
                id="address"
                name="address"
                type="text"
                placeholder="Enter your address"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button
              type="submit"
              className="w-full p-2 bg-gray-900 text-white font-bold rounded hover:bg-gray-700"
          >
            Save All
          </button>
        </form>
      </div>
  );
};

export default Profile;
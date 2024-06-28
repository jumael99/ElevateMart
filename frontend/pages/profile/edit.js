import { useRouter } from "next/router";
import { React, useState } from "react";

const Profile = () => {
  const router = useRouter();  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBrithday] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [picture, setpicture] = useState("/images/defaultUser.png");
  const [picturePreview, setpicturePreview] = useState(
    "/images/defaultUser.png"
  );

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/profile/view')
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
            <label className="py-2 block text-gray-600">First Name</label>
            <input
              placeholder=" Enter your first name "
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="flex-grow">
            <label className="py-2 block text-gray-600">Last Name</label>
            <input
              placeholder="Also your last name"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex gap-5 flex-wrap">
          <div className="flex-grow">
            <label className="py-2 block text-gray-600">Birthday</label>
            <input
              type="date"
              className="text-black w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setBrithday(e.target.value)}
              required
            />
          </div>
          <div className="flex-grow">
            <label className="py-2 block text-gray-600">Gender</label>
            <select
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
            <label className="py-2 block text-gray-600">Email</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex-grow">
            <label className="py-2 block text-gray-600">Phone</label>
            <input
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
            <label className="py-2 block text-gray-600">Address</label>
            <input
              placeholder="  Enter your home address "
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className=" flex-wrap">
            <label className="py-2 block text-gray-600">Number</label>
            <input
              placeholder=" No. "
              className="w-full p-2 border border-gray-300 rounded text-black"
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex gap-5 flex-wrap">
          <div className="flex-grow">
            <label className="py-2 block text-gray-600">City</label>
            <input
              placeholder=" City "
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="flex-grow">
            <label className="py-2 block text-gray-600">ZIP</label>
            <input
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
